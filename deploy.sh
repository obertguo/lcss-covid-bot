set -e

git remote add origin git@github.com:obertguo/lcss-covid-bot.git

git add .
git commit -m "deploy"

git push origin master