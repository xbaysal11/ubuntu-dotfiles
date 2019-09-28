#!/bin/bash
sudo service network-manager stop; sleep 5
sudo ifconfig wlp3s0 down
sudo macchanger -b -a wlp3s0; sleep 5
sudo ifconfig wlp3s0 up; sleep 5
sudo service network-manager start; sleep 5
xdg-open 'https://free-wifi.beeline.kg/#/language'
