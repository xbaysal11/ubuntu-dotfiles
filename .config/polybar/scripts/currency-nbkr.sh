#!/bin/sh
XML=$(curl -s https://www.nbkr.kg/XML/daily.xml  | grep '<Value>' | tr -d '</Value>' | tr ',' '.')
USD=$(echo "${XML}" | sed '2d;3d;4d')
RUB=$(echo "${XML}" | sed '2d;3d;1d')
echo ": "$USD  "  : "$RUB
