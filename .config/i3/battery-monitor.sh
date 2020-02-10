

battery_level=`acpi -b | cut -d ' ' -f 4 | grep -o '[0-9]*'`
battery_state=$(acpi | grep 'Battery' | sed 's/Battery\s[0-9]*: //' | sed 's/, [0-9][0-9]*\%.*//')
battery_remaining=$(acpi | grep -oh '[0-9:]* remaining' | sed 's/:\w\w remaining$/ Minutes/'  | sed 's/00://' | sed 's/:/h /')

if [ ! -f "/tmp/.battery" ]; then
    echo "$battery_level" > /tmp/.battery
    echo "$battery_state" >> /tmp/.battery
    exit
fi

previous_battery_level=$(cat /tmp/.battery | head -n 1)
previous_battery_state=$(cat /tmp/.battery | tail -n 1)
echo "$battery_level" > /tmp/.battery
echo "$battery_state" >> /tmp/.battery

checkBatteryLevel() {
    if [ $battery_state != "Discharging" ] && [ $battery_level -eq 98 ]; then
        notify-send "Full Battery" "Disconnect from power." -u critical
    elif [ $battery_state != "Discharging" ] || [ "${battery_level}" == "${previous_battery_level}" ]; then
        exit
    fi

    if [ $battery_level -le 5 ]; then
        sudo systemctl suspend
    elif [ $battery_level -le 15 ]; then
        notify-send "Low Battery" "Your computer will suspend soon unless plugged into a power outlet." -u critical
    elif [ $battery_level -le 20 ]; then
        notify-send "Low Battery" "${battery_level}% (${battery_remaining}) of battery remaining." -u low
    fi
}

checkBatteryStateChange() {
    if [ "$battery_state" != "Discharging" ] && [ "$previous_battery_state" == "Discharging" ]; then
        notify-send "Charging" "Battery is plugged in." -u normal
    fi

    if [ "$battery_state" == "Discharging" ] && [ "$previous_battery_state" != "Discharging" ]; then
        notify-send "Power Unplugged" "Your computer has been disconnected from power." -u normal
    fi
}

checkBatteryStateChange
checkBatteryLevel