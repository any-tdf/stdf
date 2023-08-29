
# 将 ../../doc/components 目录下 api.md 和 api_en.md 文件按照相同结构复制到 src/doc 目录下
# Let ../../doc/components/api.md and api_en.md files be copied to src/doc directory in the same structure
mkdir -p src/doc
cp -r ../../doc/components src/doc

# 删除 ../src/doc/components 目录以及子目录的所有 FAQ.md FAQ_en.md guide.md guide_en.md version.md version_en.md 文件
# Delete all FAQ.md FAQ_en.md guide.md guide_en.md version.md version_en.md files in ../src/doc/components directory and its subdirectories
rm -rf src/doc/components/*/FAQ.md
rm -rf src/doc/components/*/FAQ_en.md
rm -rf src/doc/components/*/guide.md
rm -rf src/doc/components/*/guide_en.md
rm -rf src/doc/components/*/version.md
rm -rf src/doc/components/*/version_en.md

# 成功提示
# Success prompt
echo "doc.sh success!"
