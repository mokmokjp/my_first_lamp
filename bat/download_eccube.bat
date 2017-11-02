cd /d %~dp0

IF EXIST "temp" (
    rmdir /s /q temp
)
mkdir temp

bitsadmin /RawReturn /TRANSFER dleccube http://downloads.ec-cube.net/src/eccube-2.13.5.zip %~dp0temp\eccube-2.13.5.zip

CScript unzip_eccube.vbs %~dp0temp\eccube-2.13.5.zip %~dp0temp\

cd temp\eccube-2.13.5\
del /s /q .coveralls.yml
del /s /q build.xml
del /s /q composer.json
del /s /q COPYING
del /s /q Gruntfile.js
del /s /q package.json
del /s /q phpunit.xml.dist
move /-y data ../../../
move /-y docs ../../../
move /-y html ../../../

cd ../../
rmdir /s /q temp
