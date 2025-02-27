if [[ $1 == "pre" ]]; then
  tag=${2:-"beta"}
  echo "doing prepublish"
  echo "tagName and preid is $tag"
  npm version --no-commit-hooks prerelease --preid $tag -m "bump to %s"
  # https://www.linuxidc.com/Linux/2018-11/155618.htm
  npm publish --tag $tag
elif [[ $1 == "prod" ]]; then
  level=${2:-"patch"}
  if ! [[ $level =~ ^(major|minor|patch)$ ]]; then
    echo "$level 变量不属于major, minor, patch"
    exit
  fi
  echo "publish prod and version level is $level"
  npm version --no-commit-hooks $level -m "bump to %s"
  npm publish
else
  echo "[INVALID] You can only do {pre,prod} publish"
fi
