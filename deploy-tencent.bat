@echo off
echo ==========================================
echo   学考合一 - 国内部署（腾讯云 COS）
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
echo   腾讯云 COS 部署步骤
echo ==========================================
echo.
echo   步骤 1: 注册腾讯云
echo   访问: https://cloud.tencent.com
echo.
echo   步骤 2: 开通 COS 服务
echo   搜索"对象存储 COS"
echo.
echo   步骤 3: 创建存储桶
echo   名称: xuekao
echo   地域: 选择离您近的（广州/北京/上海）
echo   权限: 公有读私有写
echo.
echo   步骤 4: 上传 dist 文件夹的所有文件
echo   在 COS 文件管理中上传
echo.
echo   步骤 5: 开启静态网站托管
echo   基础配置 -^> 静态网站
echo   索引文档: index.html
echo   错误文档: index.html（重要）
echo.
echo ==========================================
echo   国内访问最快，无需备案
echo ==========================================
echo.

REM 打开腾讯云
start https://cloud.tencent.com

echo 正在打开腾讯云...
echo.
echo 详细教程请查看: TENCENT_COS_DEPLOY.md
echo.
pause
