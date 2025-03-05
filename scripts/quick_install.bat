@echo off

echo Acorn Quick Install


echo cloning Acorn
git clone https://github.com/NathanaelLee15/Acorn.git C:/Users/%USERNAME%/repos/Acorn
git pull C:/Users/%USERNAME%/repos/Acorn

echo cloning acorn-plugins
git clone https://github.com/NathanaelLee15/acorn-plugins.git C:/Users/%USERNAME%/repos/acorn-plugins
git pull C:/Users/%USERNAME%/repos/acorn-plugins

echo setting user env ACORN_PATH
@REM use /m for system-wide
setx ACORN_PATH C:/Users/%USERNAME%/repos/Acorn
set ACORN_PATH=C:/Users/%USERNAME%/repos/Acorn

echo adding Acorn/bin to PATH
echo %PATH%|findstr "Acorn" >nul
if errorlevel 1 (setx PATH "%ACORN_PATH%/bin;")

@REM cd to Acorn
cd %ACORN_PATH%

echo installing bun
call scripts/install_bun.bat

echo running bun install
call bun i

echo bootstrapping repo
call scripts/bootstrap.bat

code .
