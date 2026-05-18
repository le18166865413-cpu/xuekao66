@echo off
echo ==========================================
echo   学考合一 - Cloudflare Pages 部署
echo ==========================================
echo.

REM 检查 dist 目录
if not exist "dist" (
    echo [1/3] 正在构建生产版本...
    call npm run build
    if errorlevel 1 (
        echo 构建失败！
        pause
        exit /b 1
    )
) else (
    echo [1/3] dist 目录已就绪
)

echo.
echo ==========================================
echo   Cloudflare Pages 部署方式
echo ==========================================
echo.
echo   方式 A: 直接上传（最简单，无需 Git）
echo   -------------------------------------
echo   1. 打开 https://pages.cloudflare.com
echo   2. 登录/注册 Cloudflare
echo   3. 点击 "Create a project" -^> "Direct Upload"
echo   4. 将 dist 文件夹拖拽到网页
echo   5. 输入项目名称，点击 "Deploy Site"
echo.
echo   方式 B: GitHub 自动部署（推荐）
echo   -------------------------------------
echo   1. 先安装 Git: https://git-scm.com/download/win
echo   2. 创建 GitHub 仓库: https://github.com/new
echo   3. 运行 setup-git.bat（我为您创建的脚本）
echo   4. 推送代码到 GitHub
echo   5. 在 Cloudflare Pages 连接 GitHub
echo.
echo ==========================================
echo   推荐使用方式 A（直接上传）
echo   最快 30 秒完成部署！
echo ==========================================
echo.

REM 打开 Cloudflare Pages 网站
start https://pages.cloudflare.com

echo 正在打开 Cloudflare Pages...
echo.
pause
