# Enregistre (ou met a jour) la tache planifiee qui lance le watcher creas
# en arriere-plan, invisible, a chaque ouverture de session Windows de Romeo.
# Aucun droit admin requis (tache au niveau utilisateur courant).

$ErrorActionPreference = 'Stop'
$TaskName = 'Zooryn-CreaWatcher'
$Watch    = Join-Path (Split-Path -Parent $MyInvocation.MyCommand.Path) 'watch.ps1'

$action  = New-ScheduledTaskAction -Execute 'powershell.exe' `
  -Argument "-NoProfile -NonInteractive -WindowStyle Hidden -ExecutionPolicy Bypass -File `"$Watch`""
$trigger = New-ScheduledTaskTrigger -AtLogOn
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries `
  -StartWhenAvailable -RestartCount 3 -RestartInterval (New-TimeSpan -Minutes 1) `
  -ExecutionTimeLimit ([TimeSpan]::Zero)
$principal = New-ScheduledTaskPrincipal -UserId $env:USERNAME -LogonType Interactive -RunLevel Limited

Register-ScheduledTask -TaskName $TaskName -Action $action -Trigger $trigger `
  -Settings $settings -Principal $principal -Force | Out-Null

Write-Output "Tache '$TaskName' enregistree (demarrage a l'ouverture de session)."
