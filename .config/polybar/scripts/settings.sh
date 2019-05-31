#!/bin/bash
case "$1" in
    --config)
        code ~/.config/
        ;;
    *)
        .
        ;;
esac