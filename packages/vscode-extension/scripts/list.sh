# 复制 ../../demo/src/data/menuList.js 文件到 src 目录下
# Copy ../../demo/src/data/menuList.js file to src directory
cp ../../demo/src/data/menuList.js src

# 将 src/menuList.js 文件中的第一行替换为 module.exports = [
# Replace the first line of the src/menuList.js file with module.exports = [
sed -i '1s/.*/module.exports = [/' src/menuList.js

# 成功提示
# Success prompt
echo "🎉 list.sh success!"