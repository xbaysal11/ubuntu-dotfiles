#!/bin/bash
echo >  ~/.config/polybar/scripts/upgradecheck 
/usr/lib/update-notifier/apt-check --human-readable >  ~/.config/polybar/scripts/upgradecheck 
if grep -q "0 packages can be updated." ~/.config/polybar/scripts/upgradecheck  ;
then
  num=`/usr/lib/update-notifier/apt-check 2>&1 | cut -d ';' -f 1`
  icon=""
  res="$icon: $num"
  echo $res
else
  num=`/usr/lib/update-notifier/apt-check 2>&1 | cut -d ';' -f 1`
  icon=""
  res="$icon: $num"
  echo $res
fi