set -e

git add .
git commit -m "deploy"

git push -f git@github.com:obertguo/lcss-covid-bot.git.master