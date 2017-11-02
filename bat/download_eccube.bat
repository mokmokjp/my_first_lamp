cd /d %~dp0
IF EXIST "temp" (
    rmdir /s /q temp
)
mkdir temp
cd temp
git clone https://github.com/EC-CUBE/eccube-2_13.git
cd eccube-2_13
rmdir /s /q .git
rmdir /s /q ctests
rmdir /s /q patches
rmdir /s /q templates
rmdir /s /q test
rmdir /s /q tests
del /s /q .coveralls.yml
del /s /q .gitignore
del /s /q .travis.yml
del /s /q appveyor.yml
del /s /q build.xml
del /s /q codeception.yml
del /s /q composer.json
del /s /q composer.lock
del /s /q COPYING
del /s /q Gruntfile.js
del /s /q LICENSE.txt
del /s /q package.json
del /s /q php.ini
del /s /q phpinicopy.sh
del /s /q phpinidel.sh
del /s /q phpunit.xml.dist
del /s /q README.md
del /s /q setup.sh
del /s /q svn_propset.sh
move /-y data ../../../
move /-y docs ../../../
move /-y html ../../../
move /-y eccube_install.sh ../../../
cd ../../
rmdir /s /q temp
