param(
  [Parameter(Mandatory=$true)][string]$Lot,
  [string]$Task = "videoscreenclear"
)
$ErrorActionPreference = "Stop"
$root     = "C:\Users\franv\Desktop\jarvis-starter-kit"
$wrapper  = Join-Path $root ".claude\skills\crea-pub\scripts\vmake-api.ps1"
$creasDir = Join-Path $root "livrables\ecommerce\creas"
$srcBase  = (Get-ChildItem $creasDir -Directory | Where-Object { $_.Name -like "*avant modifs*" }).FullName
$outBase  = (Get-ChildItem $creasDir -Directory | Where-Object { $_.Name -like "*apr*s modifs*" }).FullName
$srcDir   = Join-Path $srcBase $Lot
$outDir   = Join-Path $outBase $Lot
if (-not (Test-Path $srcDir)) { throw "Dossier source introuvable: $srcDir" }
$videos = Get-ChildItem $srcDir -Filter *.mp4 | Sort-Object Name
if (-not $videos) { throw "Aucune video .mp4 dans $srcDir" }
Write-Host "Lot $Lot : $($videos.Count) video(s) a detourer (tache=$Task)" -ForegroundColor Cyan
$n = 0
$report = @()
foreach ($v in $videos) {
  $n++
  $ad = "AD$n"
  $adDir = Join-Path $outDir $ad
  New-Item -ItemType Directory -Force -Path $adDir | Out-Null
  $dest = Join-Path $adDir "video-sans-soustitres.mp4"
  Write-Host "[$ad] $($v.Name) -> Vmake (patiente, async)..." -ForegroundColor Yellow
  try {
    $raw = & $wrapper run-task --task $Task --input $v.FullName | Out-String
    $res = $raw | ConvertFrom-Json
    $url = $res.output_urls[0]
    if (-not $url) { throw "pas d'output_urls" }
    Invoke-WebRequest -Uri $url -OutFile $dest
    Write-Host "[$ad] OK -> $dest" -ForegroundColor Green
    $report += [pscustomobject]@{ AD=$ad; Source=$v.Name; Statut="OK" }
  } catch {
    Write-Host "[$ad] ECHEC: $($_.Exception.Message)" -ForegroundColor Red
    $report += [pscustomobject]@{ AD=$ad; Source=$v.Name; Statut="ECHEC" }
  }
}
Write-Host ""
Write-Host "=== Recapitulatif lot $Lot ===" -ForegroundColor Cyan
$report | Format-Table -AutoSize
if (Test-Path $outDir) { Start-Process explorer.exe $outDir }
