# native-click.ps1 — clic souris Windows NATIF a des coordonnees ecran (pixels physiques).
# Sert a ouvrir le dialogue "Ouvrir" natif sur la zone d'upload Vmake :
# un clic CDP (browser-use) n'ouvre PAS le dialogue Windows, un vrai clic OS si.
# Usage : powershell -File native-click.ps1 -X 960 -Y 540 [-Double]
param(
  [Parameter(Mandatory=$true)][int]$X,
  [Parameter(Mandatory=$true)][int]$Y,
  [switch]$Double
)
Add-Type @"
using System;
using System.Runtime.InteropServices;
public class Win32Mouse {
  [DllImport("user32.dll")] public static extern bool SetProcessDPIAware();
  [DllImport("user32.dll")] public static extern bool SetCursorPos(int x, int y);
  [DllImport("user32.dll")] public static extern void mouse_event(uint dwFlags, uint dx, uint dy, uint dwData, UIntPtr dwExtraInfo);
  public const uint LEFTDOWN = 0x0002;
  public const uint LEFTUP   = 0x0004;
}
"@
[Win32Mouse]::SetProcessDPIAware() | Out-Null
[Win32Mouse]::SetCursorPos($X, $Y) | Out-Null
Start-Sleep -Milliseconds 150
function Click {
  [Win32Mouse]::mouse_event([Win32Mouse]::LEFTDOWN, 0, 0, 0, [UIntPtr]::Zero)
  Start-Sleep -Milliseconds 40
  [Win32Mouse]::mouse_event([Win32Mouse]::LEFTUP, 0, 0, 0, [UIntPtr]::Zero)
}
Click
if ($Double) { Start-Sleep -Milliseconds 80; Click }
Write-Output "CLICKED $X,$Y"
