chcp 65001
@echo off 
echo 1. 开始拉取
git pull
echo 2. 生成README与侧边栏
java -jar generator.jar
echo 3. 添加文件
git add *
echo 4. 提交
git commit -m "sync"
echo 5. 推送
git push