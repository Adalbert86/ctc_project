#!/usr/local/bin/python3

from sqlalchemy.orm import relationship

import config
from config import db



class Certificate(db.Model):
	__tablename__ = "certificate"
	
	id = db.Column(db.Integer, primary_key=True)
	customer_id = db.Column(db.Integer, db.ForeignKey('customer.id'))
	status = db.Column(db.String(10))
	privatekey = db.Column(db.Text)
	body = db.Column(db.Text)

	def __init__(self, customer_id, privatekey, body, status):
		self.customer_id = customer_id
		self.privatekey = privatekey
		self.body = body
		self.status = status
		
	def toJSON(self):
		return jsonify(id=self.id, privatekey=self.privatekey, body=self.body)