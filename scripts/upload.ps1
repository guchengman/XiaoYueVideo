<#
.SYNOPSIS
    Batch upload videos from publish/ to target platforms.
.DESCRIPTION
    Scans publish/ for videos matching YYYYMMDD_title_platform.mp4 naming convention,
    uploads to configured platforms, and records results in logs/.
.PARAMETER PublishDir
    Path to publish directory. Default: ..\publish\
.PARAMETER Platform
    Filter: upload only to specific platform (e.g. "bilibili", "youtube").
.PARAMETER DryRun
    Show what would be uploaded without actually sending.
.PARAMETER File
    Upload a single file instead of scanning the directory.
.PARAMETER Config
    Path to config file with credentials.
.EXAMPLE
    .\upload.ps1
    .\upload.ps1 -Platform bilibili
    .\upload.ps1 -DryRun
    .\upload.ps1 -File ..\publish\20260520_vlog01_youtube.mp4
    .\upload.ps1 -Config .\config.prod.ps1
#>

param(
    [string]$PublishDir = (Join-Path $PSScriptRoot "..\publish"),
    [string]$Platform = "",
    [switch]$DryRun,
    [string]$File = "",
    [string]$Config = (Join-Path $PSScriptRoot "config.ps1")
)

$LogDir   = Join-Path $PSScriptRoot "..\logs"
$UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"

# Load config if exists
if (Test-Path $Config) { . $Config }

# ---------------------------------------------------------------
# Bilibili Uploader
# ---------------------------------------------------------------
$Uploaders = @{
    "bilibili" = {
        param($FilePath, $Title, $Metadata)

        # Validate credentials
        $sessdata   = $env:BILIBILI_SESSDATA
        $biliJct    = $env:BILIBILI_BILI_JCT
        $dedeUserID = $env:BILIBILI_DEDE_USERID
        $acTimeVal  = $env:BILIBILI_AC_TIME_VALUE

        if (-not $sessdata -or -not $biliJct) {
            return @{ Status = "FAIL"; Message = "Missing credentials. Copy config.example.ps1 to config.ps1 and fill in your Bilibili cookies." }
        }

        $tid       = if ($env:BILIBILI_DEFAULT_TID) { $env:BILIBILI_DEFAULT_TID } else { "21" }
        $copyright = if ($env:BILIBILI_DEFAULT_COPYRIGHT) { $env:BILIBILI_DEFAULT_COPYRIGHT } else { "1" }

        # Build web session with cookies
        $Session = New-Object Microsoft.PowerShell.Commands.WebRequestSession
        $Domain = ".bilibili.com"
        $Session.Cookies.Add((New-Object System.Net.Cookie("SESSDATA", $sessdata, "/", $Domain)))
        $Session.Cookies.Add((New-Object System.Net.Cookie("bili_jct", $biliJct, "/", $Domain)))
        $Session.Cookies.Add((New-Object System.Net.Cookie("DedeUserID", $dedeUserID, "/", $Domain)))
        if ($acTimeVal) {
            $Session.Cookies.Add((New-Object System.Net.Cookie("ac_time_value", $acTimeVal, "/", $Domain)))
        }
        $csrf = $biliJct

        $FileInfo  = Get-Item $FilePath
        $FileName  = $FileInfo.Name
        $FileSize  = $FileInfo.Length

        # ---- Step 1: Pre-upload init ----
        Write-Host "  [Bilibili] Pre-upload init ..." -ForegroundColor Cyan
        $InitBody = @{ name = $FileName; size = $FileSize } | ConvertTo-Json

        try {
            $InitResp = Invoke-RestMethod -Uri "https://member.bilibili.com/x/vupre/web/upload/init" `
                -Method Post -Body $InitBody -ContentType "application/json" `
                -WebSession $Session -UserAgent $UserAgent
        } catch {
            return @{ Status = "FAIL"; Message = "Pre-upload init failed: $($_.Exception.Message)" }
        }

        if ($InitResp.code -ne 0) {
            return @{ Status = "FAIL"; Message = "Pre-upload init error: code=$($InitResp.code) msg=$($InitResp.message)" }
        }

        $UploadUrl     = $InitResp.data.url
        $CompleteUrl   = $InitResp.data.complete
        $BizId         = $InitResp.data.biz_id
        $UpToken       = $InitResp.data.uptoken
        Write-Host "  [Bilibili] Got upload URL: $UploadUrl" -ForegroundColor DarkGray
        Write-Host "  [Bilibili] biz_id: $BizId" -ForegroundColor DarkGray

        # ---- Step 2: Upload file binary ----
        Write-Host "  [Bilibili] Uploading file ($([math]::Round($FileSize/1MB,2)) MB) ..." -ForegroundColor Cyan

        try {
            $UploadResp = Invoke-RestMethod -Uri $UploadUrl -Method Put `
                -InFile $FilePath -ContentType "video/mp4" `
                -WebSession $Session -UserAgent $UserAgent
        } catch {
            return @{ Status = "FAIL"; Message = "File upload failed: $($_.Exception.Message)" }
        }

        Write-Host "  [Bilibili] Upload OK" -ForegroundColor Green

        # ---- Step 3: Complete upload notification ----
        if ($CompleteUrl) {
            Write-Host "  [Bilibili] Notifying upload complete ..." -ForegroundColor Cyan
            $CompleteBody = @{ biz_id = $BizId } | ConvertTo-Json
            try {
                $CompResp = Invoke-RestMethod -Uri $CompleteUrl -Method Post `
                    -Body $CompleteBody -ContentType "application/json" `
                    -WebSession $Session -UserAgent $UserAgent
            } catch {
                Write-Host "  [Bilibili] Complete notification warning: $($_.Exception.Message)" -ForegroundColor Yellow
            }
        }

        # ---- Step 4: Submit video metadata ----
        Write-Host "  [Bilibili] Submitting video metadata ..." -ForegroundColor Cyan

        # Build a readable title from filename metadata
        $DisplayTitle = $Title -replace "_", " " -replace "-", " "
        $Description  = "$DisplayTitle`n`nUploaded via batch script | $($Metadata.Date)"
        $TagList      = $DisplayTitle.Split(' ') | Where-Object { $_ -and $_.Length -gt 1 }
        $Tags         = ($TagList -join ",") + ",vlog"

        $SubmitBody = @{
            title       = $DisplayTitle
            desc        = $Description
            tag         = $Tags
            tid         = $tid
            copyright   = $copyright
            biz_id      = $BizId
            csrf        = $csrf
        }

        try {
            $SubmitResp = Invoke-RestMethod -Uri "https://member.bilibili.com/x/v2/video/add" `
                -Method Post -Body $SubmitBody `
                -WebSession $Session -UserAgent $UserAgent
        } catch {
            return @{ Status = "WARN"; Message = "Upload OK but submit failed: $($_.Exception.Message)" }
        }

        if ($SubmitResp.code -eq 0) {
            $Aid = $SubmitResp.data.aid
            $Bvid = $SubmitResp.data.bvid
            Write-Host "  [Bilibili] Published! AID=$Aid BVID=$Bvid" -ForegroundColor Green
            return @{ Status = "success"; Message = "published: av$Aid (BV$Bvid)" }
        } else {
            return @{ Status = "WARN"; Message = "Submit error: code=$($SubmitResp.code) msg=$($SubmitResp.message)" }
        }
    }

    "youtube" = {
        param($FilePath, $Title, $Metadata)
        Write-Host "  [YouTube] Uploading: $Title ..." -ForegroundColor Cyan
        # TODO: implement YouTube Data API v3 upload
        @{ Status = "pending"; Message = "YouTube uploader not configured" }
    }
}

# --- Helpers ---
function Parse-Filename {
    param([string]$Name)
    $Base = [System.IO.Path]::GetFileNameWithoutExtension($Name)
    if ($Base -match '^(\d{8})_(.+)_(\w+)$') {
        return @{
            Date     = $matches[1]
            Title    = $matches[2]
            Platform = $matches[3]
            Valid    = $true
        }
    }
    return @{ Valid = $false }
}

function Write-Log {
    param([string]$Entry)
    $LogFile = Join-Path $LogDir "upload_$(Get-Date -Format 'yyyyMM').csv"
    $Line = "{0}|{1}" -f (Get-Date -Format "yyyy-MM-dd HH:mm:ss"), $Entry
    Add-Content -Path $LogFile -Value $Line -Encoding UTF8
    Write-Host "  [log] $Entry" -ForegroundColor DarkGray
}

# --- Main ---
Write-Host "=== Video Batch Upload ===" -ForegroundColor Green

if (-not (Test-Path $LogDir)) { New-Item -ItemType Directory -Path $LogDir -Force | Out-Null }

$Files = @()
if ($File) {
    if (Test-Path $File) { $Files = @(Get-Item $File) } else { Write-Warning "File not found: $File"; exit 1 }
} else {
    if (-not (Test-Path $PublishDir)) { Write-Warning "Publish directory not found: $PublishDir"; exit 1 }
    $Files = Get-ChildItem $PublishDir -Include *.mp4,*.mov -Recurse
}

if ($Files.Count -eq 0) { Write-Host "No video files found." -ForegroundColor Yellow; exit 0 }

foreach ($F in $Files) {
    $Info = Parse-Filename $F.Name
    Write-Host "`n[$($F.Name)]" -ForegroundColor Yellow

    if (-not $Info.Valid) {
        Write-Host "  Skipped: filename does not match YYYYMMDD_title_platform.mp4" -ForegroundColor Red
        continue
    }

    $TargetPlatform = $Info.Platform
    if ($Platform -and $TargetPlatform -ne $Platform) {
        Write-Host "  Skipped: filtered by platform" -ForegroundColor DarkGray
        continue
    }

    if (-not $Uploaders.ContainsKey($TargetPlatform)) {
        Write-Host "  Skipped: no uploader for platform '$TargetPlatform'" -ForegroundColor DarkGray
        Write-Log "SKIP|$($F.Name)|$TargetPlatform|unknown platform"
        continue
    }

    if ($DryRun) {
        Write-Host "  [DRY-RUN] Would upload to $TargetPlatform as '$($Info.Title)'" -ForegroundColor Magenta
        Write-Log "DRYRUN|$($F.Name)|$TargetPlatform|$($Info.Title)"
        continue
    }

    $Result = & $Uploaders[$TargetPlatform] $F.FullName $Info.Title $Info
    $Status = $Result.Status
    $Message = $Result.Message

    if ($Status -eq "success") {
        Write-Host "  OK: $Message" -ForegroundColor Green
    } else {
        Write-Host "  $($Status): $Message" -ForegroundColor Yellow
    }
    Write-Log "$Status|$($F.Name)|$TargetPlatform|$Message"
}

Write-Host "`n=== Done ===" -ForegroundColor Green
