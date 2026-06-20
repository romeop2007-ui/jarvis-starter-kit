# ============================================================================
#  Watcher creas Zooryn  -  "deuxieme cerveau" event-driven, zero token au repos
# ----------------------------------------------------------------------------
#  Surveille "ressources creas avant modifs". Des qu'un dossier y est cree ou
#  modifie, attend que la copie se stabilise, puis reveille Claude en headless
#  pour appliquer la consigne (skill crea-pub) et ecrire A-COLLER-<LOT>.txt.
#  Ne consomme AUCUN token tant que rien ne bouge (Wait-Event = sommeil reel).
# ============================================================================

$ErrorActionPreference = 'Stop'

# --- Chemins (repo racine = 4 niveaux au-dessus de ce script) ---------------
$WatcherDir = Split-Path -Parent $MyInvocation.MyCommand.Path          # ..._watcher
$CreasDir   = Split-Path -Parent $WatcherDir                            # ...creas
$RepoRoot   = (Resolve-Path (Join-Path $CreasDir '..\..\..')).Path      # jarvis-starter-kit
$SourceDir  = Join-Path $CreasDir 'ressources créas avant modifs'
$Consigne   = 'livrables/ecommerce/creas/watcher-consigne.md'
$LogFile    = Join-Path $WatcherDir 'watcher.log'
$LockFile   = Join-Path $WatcherDir '.running.lock'

function Log($msg) {
  $line = "{0}  {1}" -f (Get-Date -Format 'yyyy-MM-dd HH:mm:ss'), $msg
  Add-Content -Path $LogFile -Value $line -Encoding utf8
}

function Notify($title, $text) {
  try {
    Add-Type -AssemblyName System.Windows.Forms
    $ni = New-Object System.Windows.Forms.NotifyIcon
    $ni.Icon = [System.Drawing.SystemIcons]::Information
    $ni.BalloonTipTitle = $title
    $ni.BalloonTipText = $text
    $ni.Visible = $true
    $ni.ShowBalloonTip(8000)
    Start-Sleep -Seconds 9
    $ni.Dispose()
  } catch { Log "Notify a echoue: $($_.Exception.Message)" }
}

function Process-NewLots {
  if (Test-Path $LockFile) { Log 'Deja en cours, on ignore ce reveil.'; return }
  # Y a-t-il vraiment un nouveau lot ?
  Push-Location $RepoRoot
  try {
    $new = & node 'livrables/ecommerce/creas/watcher-nouveaux.mjs' 2>$null | Where-Object { $_ -ne '' }
  } finally { Pop-Location }
  if (-not $new) { Log 'Reveil sans nouveau lot, rien a faire.'; return }

  New-Item -ItemType File -Path $LockFile -Force | Out-Null
  $lots = ($new -join ', ')
  Log "Nouveau(x) lot(s) detecte(s): $lots  -> reveil de Claude (headless)."
  Notify 'Crea-pub' "Nouveau lot detecte ($lots). Le cerveau travaille..."

  $prompt = 'Lis et applique a la lettre livrables/ecommerce/creas/watcher-consigne.md. ' +
            'Traite TOUS les nouveaux lots detectes. Tu es 100% autonome et headless : ' +
            'ne pose aucune question, ne demande aucune validation, va jusqu au bout.'
  Push-Location $RepoRoot
  try {
    & claude -p $prompt --permission-mode bypassPermissions 2>&1 |
      ForEach-Object { Add-Content -Path $LogFile -Value ("    claude| " + $_) -Encoding utf8 }
  } catch {
    Log "Erreur pendant l appel claude: $($_.Exception.Message)"
  } finally { Pop-Location }

  # Resultat : fichiers A-COLLER produits ?
  $aColler = Get-ChildItem -Path $CreasDir -Filter 'A-COLLER-*.txt' -File -ErrorAction SilentlyContinue |
             Sort-Object LastWriteTime -Descending | Select-Object -First 5
  if ($aColler) {
    $noms = ($aColler.Name -join ', ')
    Log "Pret. Fichier(s) a coller: $noms"
    Notify 'Crea-pub - PRET a coller' "Ouvre $noms dans le dossier creas et colle la commande."
  } else {
    Log 'Fin de traitement mais aucun A-COLLER produit (voir log claude ci-dessus).'
    Notify 'Crea-pub' 'Traitement termine, mais rien a coller. Verifie le watcher.log.'
  }
  Remove-Item $LockFile -Force -ErrorAction SilentlyContinue
}

# --- Demarrage --------------------------------------------------------------
if (-not (Test-Path $SourceDir)) { New-Item -ItemType Directory -Path $SourceDir -Force | Out-Null }
Remove-Item $LockFile -Force -ErrorAction SilentlyContinue
Log "===== Watcher demarre. Surveillance de: $SourceDir ====="

# Rattrapage : traiter un lot eventuellement depose pendant que le watcher etait arrete.
Process-NewLots

$fsw = New-Object System.IO.FileSystemWatcher
$fsw.Path = $SourceDir
$fsw.IncludeSubdirectories = $true
$fsw.NotifyFilter = [System.IO.NotifyFilters]'FileName, DirectoryName, LastWrite'

try {
  while ($true) {
    # WaitForChanged = blocage synchrone fiable (0 CPU au repos, reveil garanti).
    $res = $fsw.WaitForChanged([System.IO.WatcherChangeTypes]::All, 3600000)  # timeout 1h
    if (-not $res.TimedOut) {
      Start-Sleep -Seconds 20               # anti-rebond : laisse la copie finir
      Process-NewLots
    }
  }
} finally {
  $fsw.Dispose()
  Log '===== Watcher arrete. ====='
}
