(skipeachsecond=1
i=0
inotifywait -mrq -e modify -e attrib --format %w%f /home/aik/prj/tile.ts/src/tile.ts | while read FILE; do
  if [ $i = 1 ] || [ $skipeachsecond = 0 ]; then
    echo '=>'
    i=0
    /home/aik/prj/tile.ts/node_modules/.bin/webpack > webpack.log 2>&1
    timeout 1 flash-primary-screen > /dev/null 2>&1
    echo "================================================="
    echo "webpack-done -- "$(date +%s)
    echo "================================================="
  else
    echo -
    i=1
  fi
done ) &
livereload -d /home/aik/prj/tile.ts/dist > livereload.log  2>&1
