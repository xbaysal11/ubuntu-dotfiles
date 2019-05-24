#! /bin/bash

IP=$(dig +short myip.opendns.com @resolver1.opendns.com)

if pgrep -x openvpn > /dev/null; then
    echo  $IP
else
    echo %{F#f00}%{F-}
fi