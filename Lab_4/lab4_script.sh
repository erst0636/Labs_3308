#!/bin/bash
# Authors : Erik Stolz
# Date: 09/24/2020

sudo cp /var/log/syslog ~/Documents/lab_4
sudo grep -w 'error|ERROR|Error|' ~/Documents/lab_4/syslog |  tee ~/Documents/lab_4/error_log.txt
mail -s 'Error log' -A ~/Documents/lab_4/error_log.txt erst0636@colorado.edu < ~/Documents/lab_4/error_log.txt

