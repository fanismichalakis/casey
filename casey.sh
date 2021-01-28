#!/bin/bash
if [[ $# -eq 0 ]] ; then
    echo 'missing input parameters'
    exit 1
fi
if [ $1 = "stats" ]
then
    ./getStats.sh
elif [ $1 = "centrality" ]
then
    lncli getnodemetrics | cat > data/betweenessCentrality.json
    node scripts/betweenessCentrality.js $2
else
    echo "Display help"
fi