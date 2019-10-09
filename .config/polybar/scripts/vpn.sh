#! /bin/bash
ip=$(curl -s https://ipinfo.io/ip)
IP=$(curl -s https://ipvigilante.com/$ip | jq ' .data.ipv4, "",.data.country_name,"-",.data.subdivision_1_name,"-", .data.city_name' | tr -d '"') 

if pgrep -x openvpn > /dev/null; then
    echo  $IP 
else
    echo %{F#f00}%{F-}
fi
