#!/bin/sh

case "$1" in
    --night)
        redshift -O 3000
        echo ""
        ;;
    --day)
        redshift -O 6500
        echo ""
        ;;
    *)
        echo ""
        ;;
esac
