#!/usr/local/bin/python3

import os
import os.path
import config
from config import db
import commons

import controllers.customer_controller 
import controllers.certificate_controller 

app = config.app

if __name__ == '__main__':
    app.run(threaded=True, debug=False, use_reloader=False)
    