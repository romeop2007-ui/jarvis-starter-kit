# Etat du watcher creas : compte les VRAIES instances (lanceur -File, pas les
# requetes -Command) et affiche les dernieres lignes du log.
$real = @(Get-CimInstance Win32_Process -Filter "Name='powershell.exe'" |
  Where-Object { $_.CommandLine -like '*watch.ps1*' -and $_.CommandLine -notlike '*-Command*' })
Write-Output ("Watchers actifs : " + $real.Count + "  (1 = parfait, 0 = a demarrer, >1 = doublon)")
$real | Select-Object ProcessId, CreationDate | Format-Table -AutoSize | Out-String | Write-Output
Write-Output "--- 3 dernieres lignes du log ---"
$log = Join-Path (Split-Path -Parent $MyInvocation.MyCommand.Path) 'watcher.log'
if (Test-Path $log) { Get-Content $log -Tail 3 } else { Write-Output "(pas encore de log)" }
