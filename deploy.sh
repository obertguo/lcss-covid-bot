set -e

git add .
git commit -m "deploy"

git push --set-upstream git@github.com:obertguo/lcss-covid-bot.git.master master
