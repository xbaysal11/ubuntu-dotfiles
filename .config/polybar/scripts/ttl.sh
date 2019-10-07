#!/bin/sh

case "$1" in
    --change)
        tilix -e sudo sysctl net.ipv4.ip_default_ttl=65
        ;;
    *)
        res=`cat /proc/sys/net/ipv4/ip_default_ttl`
        echo $res
        ;;
esac