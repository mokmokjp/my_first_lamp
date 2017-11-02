'========================================
' NAME  :zip_kaitou.vbs
' DATE  :2013/03/31
' Version :001.00
' Author :Uzushio seisakusyo
' (C)2013 Uzushio seisakusyo
'========================================
Dim objArgs
Dim zipfile
Dim unzipfile

Set objArgs = WScript.Arguments
Set objWShell = CreateObject("WScript.Shell")
zipfile = objArgs(0)
unzipdir = objArgs(1)

With CreateObject("Shell.Application")
 .NameSpace(unzipdir).CopyHere .NameSpace(zipfile).Items
End With

Set objArgs = Nothing
WScript.Quit(0)
