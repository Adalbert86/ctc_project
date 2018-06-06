#!/bin/bash

apt-get update
apt-get install -y supervisor
apt-get install -y nodejs
apt-get install -y build-essential npm
apt-get -y install python3 python3-pip
pip3 install flask && pip3 install flask_sqlalchemy && pip3 install flask_marshmallow && pip3 install marshmallow-sqlalchemy


