#!/bin/bash

mac=`macchanger --show wlp3s0 |grep -o '[^ ,]\+'| sed '3q;d'`
echo '' $mac