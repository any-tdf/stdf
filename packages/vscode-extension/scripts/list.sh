# 复制 ../../demo/src/data/menuList.js 文件到 src 目录下
# Copy ../../demo/src/data/menuList.js file to src directory
cp ../../demo/src/data/menuList.js src

# 将 src/menuList.js 文件中的 export default 替换为 module.exports =
# Replace export default in src/menuList.js file with module.exports =
sed -i 's/export default/module.exports =/g' src/menuList.js