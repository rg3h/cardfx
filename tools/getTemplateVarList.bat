:: @fileoverview getTemplateVarList.bat gets the list of template variables
@echo off
clear
setlocal

:: %~d0 is the drive and %~p0 is the code's directory
:: pushd works for UNC paths (\\server\...) cd does not
pushd %~d0%~p0getTemplateVarList
cmd /c node .

endlocal
