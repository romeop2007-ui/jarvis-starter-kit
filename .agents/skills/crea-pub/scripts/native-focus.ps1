# native-focus.ps1 — ramene au premier plan la fenetre Chrome dont le titre contient -TitleLike,
# la restaure/maximise, et imprime son rectangle ecran (pixels physiques, DPI-aware).
# Indispensable AVANT un clic natif : le clic atterrit sur la fenetre au premier plan.
# Usage : powershell -File native-focus.ps1 -TitleLike "Vmake"
param(
  [Parameter(Mandatory=$true)][string]$TitleLike
)
Add-Type @"
using System;
using System.Text;
using System.Runtime.InteropServices;
public struct RECT { public int Left, Top, Right, Bottom; }
public class Win32Focus {
  [DllImport("user32.dll")] public static extern bool SetProcessDPIAware();
  [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr hWnd);
  [DllImport("user32.dll")] public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
  [DllImport("user32.dll")] public static extern bool GetWindowRect(IntPtr hWnd, out RECT r);
  [DllImport("user32.dll")] public static extern IntPtr GetForegroundWindow();
  public const int SW_RESTORE = 9;
  public const int SW_MAXIMIZE = 3;
}
"@
[Win32Focus]::SetProcessDPIAware() | Out-Null

$proc = Get-Process chrome -ErrorAction SilentlyContinue |
  Where-Object { $_.MainWindowHandle -ne 0 -and $_.MainWindowTitle -like "*$TitleLike*" } |
  Select-Object -First 1
if (-not $proc) {
  # repli : n'importe quelle fenetre chrome avec un handle visible
  $proc = Get-Process chrome -ErrorAction SilentlyContinue |
    Where-Object { $_.MainWindowHandle -ne 0 -and $_.MainWindowTitle } |
    Select-Object -First 1
}
if (-not $proc) { Write-Output "ERREUR: aucune fenetre Chrome trouvee"; exit 4 }

$h = $proc.MainWindowHandle
[Win32Focus]::ShowWindow($h, [Win32Focus]::SW_MAXIMIZE) | Out-Null
Start-Sleep -Milliseconds 200
[Win32Focus]::SetForegroundWindow($h) | Out-Null
Start-Sleep -Milliseconds 300
$r = New-Object RECT
[Win32Focus]::GetWindowRect($h, [ref]$r) | Out-Null
$fg = [Win32Focus]::GetForegroundWindow()
Write-Output "TITLE=$($proc.MainWindowTitle)"
Write-Output "RECT=$($r.Left),$($r.Top),$($r.Right),$($r.Bottom)"
Write-Output "FOREGROUND_OK=$($fg -eq $h)"