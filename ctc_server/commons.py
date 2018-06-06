#!/usr/local/bin/python3

import hashlib, uuid
import os


def hashSaltPassword(plain):
	salt = "mybitpieceofsalt1"
	hashed_password = hashlib.sha512(plain.encode('utf-8') + salt.encode('utf-8')).hexdigest()
	return hashed_password