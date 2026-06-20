# native-openfile.ps1 — remplit le dialogue "Ouvrir" Windows deja ouvert et valide.
# A appeler juste APRES native-click.ps1 sur la zone d'upload (le dialogue doit etre a l'ecran).
# Methode robuste aux accents/dispo clavier : on passe le chemin par le presse-papiers
# puis Ctrl+V + Entree dans le champ "Nom du fichier" (focus par defaut du dialogue).
# Usage : powershell -File native-openfile.ps1 -Path "C:\chemin\vers\crea.mp4"
param(
  [Parameter(Mandatory=$true)][string]$Path
)
$ErrorActionPreference = "Stop"
if (-not (Test-Path -LiteralPath $Path)) { Write-Output "ERREUR: fichier introuvable: $Path"; exit 2 }
$full = (Resolve-Path -LiteralPath $Path).Path

Add-Type @"
using System;
using System.Text;
using System.Collections.Generic;
using System.Runtime.InteropServices;
public class Win32Dlg {
  public delegate bool EnumProc(IntPtr hWnd, IntPtr lParam);
  [DllImport("user32.dll")] public static extern bool EnumWindows(EnumProc cb, IntPtr p);
  [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr hWnd);
  [DllImport("user32.dll")] public static extern bool IsWindowVisible(IntPtr hWnd);
  [DllImport("user32.dll")] public static extern int GetWindowText(IntPtr hWnd, StringBuilder s, int n);
  [DllImport("user32.dll")] public static extern int GetClassName(IntPtr hWnd, StringBuilder s, int n);
  [DllImport("user32.dll")] public static extern IntPtr GetForegroundWindow();

  public static IntPtr FindDialog() {
    IntPtr found = IntPtr.Zero;
    EnumWindows(delegate(IntPtr h, IntPtr p) {
      if (!IsWindowVisible(h)) return true;
      StringBuilder cn = new StringBuilder(64);
      GetClassName(h, cn, 64);
      if (cn.ToString() != "#32770") return true;
      StringBuilder tt = new StringBuilder(256);
      GetWindowText(h, tt, 256);
      string t = tt.ToString();
      if (t == "Ouvrir" || t == "Open" || t.StartsWith("Ouvrir") || t.StartsWith("Open")) {
        found = h; return false;
      }
      return true;
    }, IntPtr.Zero);
    return found;
  }
}
"@

# Attendre le dialogue (visible, classe #32770, titre Ouvrir/Open) jusqu'a 8 s.
$hwnd = [IntPtr]::Zero
for ($i = 0; $i -lt 40; $i++) {
  $h = [Win32Dlg]::FindDialog()
  if ($h -ne [IntPtr]::Zero) { $hwnd = $h; break }
  Start-Sleep -Milliseconds 200
}
# repli ultime : la fenetre au premier plan si c'est un #32770
if ($hwnd -eq [IntPtr]::Zero) {
  $fg = [Win32Dlg]::GetForegroundWindow()
  $cn = New-Object System.Text.StringBuilder 64
  [Win32Dlg]::GetClassName($fg, $cn, 64) | Out-Null
  if ($cn.ToString() -eq "#32770") { $hwnd = $fg }
}
if ($hwnd -eq [IntPtr]::Zero) { Write-Output "ERREUR: aucun dialogue Ouvrir/Open visible detecte"; exit 3 }

$sb = New-Object System.Text.StringBuilder 256
[Win32Dlg]::GetWindowText($hwnd, $sb, 256) | Out-Null
Write-Output "DIALOGUE: '$($sb.ToString())'"

# Mettre au premier plan, coller le chemin, valider.
[Win32Dlg]::SetForegroundWindow($hwnd) | Out-Null
Start-Sleep -Milliseconds 300
Set-Clipboard -Value $full
Start-Sleep -Milliseconds 200
Add-Type -AssemblyName System.Windows.Forms
[System.Windows.Forms.SendKeys]::SendWait("^v")
Start-Sleep -Milliseconds 500
[System.Windows.Forms.SendKeys]::SendWait("{ENTER}")
Write-Output "OK: chemin colle + Entree -> $full"
