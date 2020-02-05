#! /bin/bash
IP=$(curl -s  http://ip-api.com/json/\?fields\=query,country,city,regionName | jq -r ' .query, "",.city,"-",.regionName,"-",.country' | tr -d '"') 

if pgrep -x openvpn > /dev/null; then
    echo  $IP 
else
    echo %{F#f00}%{F-}
fi
