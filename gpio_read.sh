#! /bin/bash
control_c()
# run if user hits control-c
{
  echo -en "\n*** Ouch! Exiting ***\n"
  # clean-up
  gpio unexport 24
  exit $?
}

# trap Ctrl+C so that we can cleanup before closing
trap control_c SIGINT
# export the GPIO port
gpio export 24 in
# enable the pull-up
gpio -g mode 24 up
while (true); do
	# read
	if [[ `gpio -g read 24` == 0 ]]
	   then
	    # if the button has been pressed, send an HTTP request
	    # to the software
	    curl http://localhost/api/token # debounce the button
	    sleep 1
	fi
done
