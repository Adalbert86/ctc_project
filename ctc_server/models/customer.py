#!/usr/local/bin/python3

from sqlalchemy.orm import relationship

import config
from config import db

class Customer(db.Model):
	__tablename__ = "customer"
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(250))
	email = db.Column(db.String(250))
	password = db.Column(db.String(250))
	
	certificates = relationship("Certificate", cascade="all, delete-orphan")
	
	def __init__(self, name, email, password):
		self.name = name
		self.email = email
		self.password = password
		
	def toJSON(self):
		return jsonify(id=self.id, name=self.name, email=self.email, password=self.password)