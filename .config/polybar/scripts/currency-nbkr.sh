#!/bin/sh

USD=$(curl -s https://www.nbkr.kg/XML/daily.xml | grep '<Value>' | tr -d '</Value>' | sed '2d;3d;4d' | tr ',' '.')
RUB=$(curl -s https://www.nbkr.kg/XML/daily.xml | grep '<Value>' | tr -d '</Value>' | sed '2d;3d;1d' | tr ',' '.')
echo ": "$USD  "  : "$RUB