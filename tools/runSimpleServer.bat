:: @fileoverview runSimpleServer.bat runs a local node web server for public/
@echo off
clear
setlocal
color 1F

:: pushd works for UNC paths (\\server\); %~d0 is drive and %~p0 is code's dir
pushd %~d0%~p0simpleServer
pwd
set NO_COLOR=1
cmd /c node . --webroot ../../public
popd
endlocal
