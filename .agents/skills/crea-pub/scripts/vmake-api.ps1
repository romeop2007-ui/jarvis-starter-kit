param([Parameter(ValueFromRemainingArguments = $true)] $RestArgs)
$ErrorActionPreference = "Stop"
$root = "C:\Users\franv\Desktop\jarvis-starter-kit"
$envf = Join-Path $root ".env"
$py   = "C:\Users\franv\AppData\Local\Programs\Python\Python312\python.exe"
$cli  = Join-Path $root "vendor\vmake-sdk\sdk\cli.py"
if (-not (Test-Path $cli)) { throw "SDK Vmake introuvable : $cli" }
$ak = ((Select-String "^VMAKE_API_KEY="    $envf).Line -replace "^VMAKE_API_KEY=","").Trim()
$sk = ((Select-String "^VMAKE_API_SECRET=" $envf).Line -replace "^VMAKE_API_SECRET=","").Trim()
if (-not $ak -or -not $sk) { throw "Cles Vmake manquantes dans le .env" }
$env:MT_AK = $ak; $env:MT_SK = $sk; $env:PYTHONUTF8 = "1"
& $py $cli @RestArgs
exit $LASTEXITCODE
