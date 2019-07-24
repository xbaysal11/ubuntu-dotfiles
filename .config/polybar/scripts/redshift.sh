#!/bin/sh

case "$1" in
    --night)
        redshift -O 3000
        ;;
    --day)
        redshift -x
        ;;
    *)
        echo  ""
        ;;
esac
