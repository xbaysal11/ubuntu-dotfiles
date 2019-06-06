#!/bin/sh

case "$1" in
    --night)
        echo "234"
        redshift -O 3000
        ;;
    --day)
        redshift -x
        echo "1111"
        ;;
    *)
        echo  ""
        ;;
esac