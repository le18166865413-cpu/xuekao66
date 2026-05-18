@echo off
echo ==========================================
echo   学考合一 - 一键部署到 Vercel
echo ==========================================
echo.

REM 检查构建产物
if not exist "dist" (
    echo [1/3] 正在构建生产版本...
    call npm run build
    if errorlevel 1 (
        echo 构建失败！
        pause
        exit /b 1
    )
) else (
    echo [1/3] dist 目录已存在，跳过构建
)

REM 检查 vercel.json
if not exist "vercel.json" (
    echo vercel.json 不存在！
    pause
    exit /b 1
) else (
    echo [2/3] vercel.json 配置已就绪
)

echo [3/3] 准备部署...
echo.
echo ==========================================
echo   部署方式：
echo ==========================================
echo.
echo   方式 A: GitHub 自动化部署
echo   - 需要 GitHub 账号
echo   - 推送到 GitHub，Vercel 自动部署
echo   - 网址: https://github.com/new
echo.
echo   方式 B: Vercel CLI 部署
echo   - 以管理员身份运行 PowerShell
echo   - npm install -g vercel
echo   - vercel --prod
echo.
echo   方式 C: 手动拖拽（最简单）
echo   - 访问: https://vercel.com/new
echo   - 选择 "Deploy Static Site"
echo   - 将 dist 文件夹拖拽到网页
echo.
echo ==========================================
echo   推荐：方式 C（手动拖拽）
echo   最简单，只需 30 秒！
echo ==========================================
echo.

REM 打开 Vercel 网站
start https://vercel.com/new

echo 正在打开 Vercel 部署页面...
echo.
pause
