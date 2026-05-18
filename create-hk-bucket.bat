@echo off
echo ==========================================
echo   ⚠️ ⚠️ ⚠️ 重要提醒 ⚠️ ⚠️ ⚠️
echo   创建香港地域 Bucket 详细指南
echo ==========================================
echo.
echo   【最关键的一步！】
echo.
echo   地域必须选择：
echo.
echo       ✅✅✅ 中国（香港）✅✅✅
echo.
echo   不要选其他地域！
echo.
echo ==========================================
echo.
echo   创建步骤：
echo.
echo   1. 点击"创建 Bucket"
echo.
echo   2. 填写信息：
echo      - Bucket 名称: xuekao
echo      - 地域: [中国（香港）] ⬅️ 最重要！
echo      - 存储类型: 标准存储
echo      - 读写权限: 公共读
echo.
echo   3. 点击"确定"
echo.
echo ==========================================
echo.
echo   打开阿里云 OSS 控制台...
echo.

start https://oss.console.aliyun.com

echo.
echo 详细图文指南请查看: CREATE_HK_BUCKET.md
echo.
pause
