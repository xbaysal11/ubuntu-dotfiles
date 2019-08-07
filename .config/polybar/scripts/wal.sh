#!/bin/sh
case "$1" in
    --wal)
        wal -i ~/Pictures/Wallpapers/
        ;;
    *)
        .
        ;;
esac
echo ""