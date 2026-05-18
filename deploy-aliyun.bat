@echo off
echo ==========================================
echo   学考合一 - 国内部署（阿里云 OSS）
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
echo   阿里云 OSS 部署步骤
echo ==========================================
echo.
echo   步骤 1: 注册阿里云
echo   访问: https://www.aliyun.com
echo.
echo   步骤 2: 开通 OSS 服务
echo   搜索"对象存储 OSS"
echo.
echo   步骤 3: 创建 Bucket
echo   名称: xuekao
echo   地域: 选择离您近的（广州/杭州/北京）
echo   权限: 公共读
echo.
echo   步骤 4: 上传 dist 文件夹的所有文件
echo   在 OSS 文件管理中上传
echo.
echo   步骤 5: 开启静态网站托管
echo   数据管理 -^> 静态页面
echo   默认首页: index.html
echo   默认 404 页: index.html（重要）
echo.
echo   步骤 6: 使用默认域名访问！
echo   无需备案，国内访问快！
echo.
echo ==========================================
echo   推荐直接使用默认域名
echo   无需备案，最简单！
echo ==========================================
echo.

REM 打开阿里云
start https://www.aliyun.com

echo 正在打开阿里云...
echo.
echo 详细教程请查看: ALIYUN_OSS_DEPLOY.md
echo.
pause
