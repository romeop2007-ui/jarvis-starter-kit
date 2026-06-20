# Installe le demarrage automatique du watcher SANS droits admin :
# depose un lanceur invisible (.vbs) dans le dossier Demarrage de l'utilisateur.
# Le watcher se lancera alors a chaque ouverture de session Windows, en tache de
# fond, sans fenetre. Pour desinstaller : supprimer le .vbs du dossier Demarrage.

$ErrorActionPreference = 'Stop'
$Watch   = Join-Path (Split-Path -Parent $MyInvocation.MyCommand.Path) 'watch.ps1'
$Startup = [Environment]::GetFolderPath('Startup')
$Vbs     = Join-Path $Startup 'Zooryn-CreaWatcher.vbs'

$cmd = 'powershell.exe -NoProfile -NonInteractive -WindowStyle Hidden -ExecutionPolicy Bypass -File ""' + $Watch + '""'
$vbsContent = @"
' Lanceur invisible du watcher creas Zooryn (genere automatiquement)
Set sh = CreateObject("WScript.Shell")
sh.Run "$cmd", 0, False
"@
Set-Content -Path $Vbs -Value $vbsContent -Encoding ASCII

Write-Output "Demarrage auto installe : $Vbs"
Write-Output "(Pour desactiver plus tard : supprimer ce fichier.)"
