#!/usr/local/bin/python3

import os

def main():
	from ctc_server import db
	db.create_all()
	
		
if __name__ == "__main__":
	main()
    