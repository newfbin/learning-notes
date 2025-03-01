chcp 65001
@echo off 
echo 正在检查是否存在特殊字符...
java  -Dfile.encoding=UTF-8  -jar checker.jar
pause

