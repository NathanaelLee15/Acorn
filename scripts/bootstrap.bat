@echo off
if not exist "bin" mkdir bin
if not exist "bin\acorn.bat" copy scripts\acorn.bat.example bin\acorn.bat
if not exist "bin\acorn" copy scripts\acorn.bat.example bin\acorn