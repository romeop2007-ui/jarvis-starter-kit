param(
  [Parameter(Mandatory=$true)][string]$Lot,
  [string]$Task = "videoscreenclear",
  [string]$Voice = "EXAVITQu4vr4xnSDxMaL",
  [double]$Tolerance = 1.0
)
$ErrorActionPreference = "Stop"
$root     = "C:\Users\franv\Desktop\jarvis-starter-kit"
$wrapper  = Join-Path $root ".claude\skills\crea-pub\scripts\vmake-api.ps1"
$scripts  = Join-Path $root ".claude\skills\crea-pub\scripts"
$creasDir = Join-Path $root "livrables\ecommerce\creas"
$srcBase  = (Get-ChildItem $creasDir -Directory | Where-Object { $_.Name -like "*avant modifs*" }).FullName
$outBase  = (Get-ChildItem $creasDir -Directory | Where-Object { $_.Name -like "*apr*s modifs*" }).FullName
$srcDir   = Join-Path $srcBase $Lot
$outDir   = Join-Path $outBase $Lot
if (-not (Test-Path $srcDir)) { throw "Dossier source introuvable: $srcDir" }
$videos = Get-ChildItem $srcDir -Filter *.mp4 | Sort-Object Name
if (-not $videos) { throw "Aucune video .mp4 dans $srcDir" }
function Get-Dur($p) { return [double]((& node (Join-Path $scripts "duration.mjs") $p | Select-Object -Last 1).ToString().Trim()) }
Write-Host "Lot $Lot : $($videos.Count) video(s)" -ForegroundColor Cyan
$n = 0
$report = @()
foreach ($v in $videos) {
  $n++
  $ad = "AD$n"
  $adDir = Join-Path $outDir $ad
  New-Item -ItemType Directory -Force -Path $adDir | Out-Null
  $destVid = Join-Path $adDir "video-sans-soustitres.mp4"
  $vidState = "-"
  if (Test-Path $destVid) {
    $vidState = "deja fait"
    Write-Host "[$ad] detourage deja fait, on saute (pas de credit)" -ForegroundColor DarkGray
  } else {
    Write-Host "[$ad] $($v.Name) -> Vmake (async)..." -ForegroundColor Yellow
    try {
      $raw = & $wrapper run-task --task $Task --input $v.FullName | Out-String
      $res = $raw | ConvertFrom-Json
      $url = $res.output_urls[0]
      if (-not $url) { throw "pas d'output_urls" }
      Invoke-WebRequest -Uri $url -OutFile $destVid
      $vidState = "OK"
      Write-Host "[$ad] video OK" -ForegroundColor Green
    } catch {
      $vidState = "ECHEC"
      Write-Host "[$ad] video ECHEC: $($_.Exception.Message)" -ForegroundColor Red
    }
  }
  $voState = "-"; $dSrc = $null; $dVo = $null; $verdict = "-"
  $scriptFr = Join-Path $adDir "script-fr.txt"
  if (Test-Path $scriptFr) {
    try {
      $dSrc = Get-Dur $v.FullName
      Write-Host "[$ad] voix off (cible $([math]::Round($dSrc,1))s)..." -ForegroundColor Yellow
      & node (Join-Path $scripts "tts.mjs") --voice $Voice --target $dSrc --out $adDir --text-file $scriptFr | Out-Null
      $voPath = Join-Path $adDir "voix-off.mp3"
      if (Test-Path $voPath) {
        $voState = "OK"
        $dVo = Get-Dur $voPath
        $ecart = [math]::Round($dVo - $dSrc, 1)
        if ([math]::Abs($ecart) -le $Tolerance) {
          $verdict = "OK ($ecart s)"
          Write-Host "[$ad] voix off OK (ecart $ecart s)" -ForegroundColor Green
        } elseif ($ecart -lt 0) {
          $verdict = "A REFAIRE trop courte ($ecart s)"
          Write-Host "[$ad] TROP COURTE (ecart $ecart s) -> allonger script-fr.txt" -ForegroundColor Red
        } else {
          $verdict = "A REFAIRE trop longue (+$ecart s)"
          Write-Host "[$ad] TROP LONGUE (ecart +$ecart s) -> raccourcir script-fr.txt" -ForegroundColor Red
        }
      } else { $voState = "ECHEC" }
    } catch {
      $voState = "ECHEC"
      Write-Host "[$ad] voix off ECHEC: $($_.Exception.Message)" -ForegroundColor Red
    }
  } elseif (Test-Path (Join-Path $adDir "accroches-fr.md")) {
    $voState = "accroches"
  }
  $report += [pscustomobject]@{ AD=$ad; Source=$v.Name; Video=$vidState; Cible=$(if($dSrc){[math]::Round($dSrc,1)}else{"-"}); Voix=$(if($dVo){[math]::Round($dVo,1)}else{"-"}); Verdict=$verdict }
}
Write-Host ""
Write-Host "=== Recapitulatif lot $Lot ===" -ForegroundColor Cyan
$report | Format-Table -AutoSize
if (Test-Path $outDir) { Start-Process explorer.exe $outDir }
