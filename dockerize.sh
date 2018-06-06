#!/bin/bash

# by Vojtech Novak
# will dockerize and run the image

docker build -t ctc_project_20180606 .

#run
docker run -p 3000:3000 --mount source=ctc_project_20180606_myvol1,target=/media/myvol1/ ctc_project_20180606

