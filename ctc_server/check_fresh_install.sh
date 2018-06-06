#!/bin/bash

if ! [ -f /media/myvol1/ctc_primary_db.sqlite ]
then
    cp /home/ctc_server/empty_db.sqlite /media/myvol1/ctc_primary_db.sqlite
    echo "Fresh install DB moved to VOLUME"
else
    echo "Not fresh install"
fi

ln -s /media/myvol1/ctc_primary_db.sqlite /home/ctc_server/ctc_primary_db.sqlite


