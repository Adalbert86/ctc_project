#!/usr/local/bin/python3

from flask import Flask, request, jsonify, Response
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from sqlalchemy.orm import relationship
import os


import config
from config import db
import commons

ma = config.ma
app = config.app

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
	
class CustomerSchema(ma.Schema):
	class Meta:
		# what to expose
		# no reason to expose password
		fields = ('id', 'name', 'email')
		
customer_schema = CustomerSchema()
customers_schema = CustomerSchema(many=True)



# endpoint to create new customer
@app.route("/customer", methods=["POST"])
def add_customer():
    name = request.json['name']
    email = request.json['email']
    password = commons.hashSaltPassword(request.json['password'])
    
    new_customer = Customer(name, email, password)

    db.session.add(new_customer)
    db.session.commit()

    response = new_customer.toJSON()
    response.status_code = 200
    return response


# endpoint to show all customers
@app.route("/customer", methods=["GET"])
def get_customer():
    all_customers = Customer.query.all()
    result = customers_schema.dump(all_customers)
    return jsonify(result.data)


# endpoint to get customer detail by id
@app.route("/customer/<id>", methods=["GET"])
def customer_detail(id):
    customer = Customer.query.get(id)
    return customer_schema.jsonify(customer)


# endpoint to update customer
@app.route("/customer/<id>", methods=["PUT"])
def customer_update(id):
    customer = Customer.query.get(id)
    name = request.json['name']
    email = request.json['email']

    customer.email = email
    customer.name = name

    db.session.commit()
    return customer_schema.jsonify(customer)


# endpoint to delete customer
@app.route("/customer/<id>", methods=["DELETE"])
def customer_delete(id):
    customer = Customer.query.get(id)

    db.session.delete(customer)
    db.session.commit()

    return customer_schema.jsonify(customer)

