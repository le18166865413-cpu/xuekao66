@echo off
echo ==========================================
echo   学考合一 - 阿里云香港 OSS 部署
echo   （无需备案，可绑国外域名）
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
echo   香港节点部署步骤
echo ==========================================
echo.
echo   步骤 1: 注册阿里云
echo   访问: https://www.aliyun.com
echo.
echo   步骤 2: 开通 OSS 服务
echo   搜索"对象存储 OSS"
echo.
echo   步骤 3: 创建 Bucket（重要！）
echo   地域: 中国（香港）^!^!^!
echo   名称: xuekao
echo   权限: 公共读
echo.
echo   步骤 4: 上传 dist 文件夹的所有文件
echo   在 OSS 文件管理中上传
echo.
echo   步骤 5: 开启静态网站托管
echo   数据管理 -^> 静态页面
echo   默认首页: index.html
echo   默认 404 页: index.html
echo.
echo   步骤 6: 测试访问
echo   使用阿里云提供的默认域名
echo.
echo   （可选）步骤 7: 绑定国外域名
echo   在域名管理中绑定
echo.
echo ==========================================
echo   无需备案，可绑定国外域名！
echo ==========================================
echo.

REM 打开阿里云
start https://www.aliyun.com

echo 正在打开阿里云...
echo.
echo 详细教程请查看: ALIYUN_HK_DEPLOY.md
echo.
pause
