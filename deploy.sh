set -e

git init 
git add -A
git commit -m "deploy"

git push -f git@github.com:obertguo/lcss-covid-bot.git