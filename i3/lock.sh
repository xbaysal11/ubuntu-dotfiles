#!/bin/bash 
IMAGE=/tmp/i3lock.png

BLURTYPE="2x8"

scrot $IMAGE 
convert $IMAGE -level 0%,100%,0.9 -blur - $IMAGE 
i3lock -i $IMAGE 
rm $IMAGE
