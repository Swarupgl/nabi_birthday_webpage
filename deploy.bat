@echo off
echo ========================================================
echo   Birthday Website Vercel Deployment Tool
echo ========================================================
echo.
echo First, let's log into your Vercel account. 
echo A browser window will open for you to log in.
echo.
call npx vercel login

echo.
echo ========================================================
echo Great! Now let's deploy the website online.
echo IMPORTANT: When it asks questions, just press ENTER to accept all defaults!
echo ========================================================
echo.
call npx vercel --prod

echo.
echo ========================================================
echo If everything went well, your website is now LIVE!
echo Copy the "Production" link above and share it with her!
echo ========================================================
pause
