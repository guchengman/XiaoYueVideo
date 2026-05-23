# Bilibili upload credentials
# Copy to config.ps1 and fill in your values

$env:BILIBILI_SESSDATA = "your_sessdata_here"
$env:BILIBILI_BILI_JCT = "your_bili_jct_here"
$env:BILIBILI_DEDE_USERID = "your_userid_here"
$env:BILIBILI_AC_TIME_VALUE = "your_ac_time_value_here"

# Default upload category and settings
$env:BILIBILI_DEFAULT_TID = "21"      # 21=日常, see bilibili category docs
$env:BILIBILI_DEFAULT_COPYRIGHT = "1" # 1=original, 2=reprint
