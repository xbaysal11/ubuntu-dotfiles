#!/bin/bash
echo >  ~/.config/polybar/scripts/upgradecheck 
/usr/lib/update-notifier/apt-check --human-readable >  ~/.config/polybar/scripts/upgradecheck 
if grep -q "0 packages can be updated." ~/.config/polybar/scripts/upgradecheck  ;
then
  echo "" &
else
  echo "" &
fi