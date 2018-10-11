npm run build
rm -rf deploy/public
mkdir deploy/public
cp -R dist/* deploy/public
cd deploy
firebase deploy
