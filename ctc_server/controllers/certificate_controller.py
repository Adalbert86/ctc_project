#!/usr/local/bin/python3

from flask import Flask, request, jsonify, Response
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from sqlalchemy.orm import relationship
import os


import config
from config import db

import commons
import controllers.customer_controller

ma = config.ma
app = config.app

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


class CertificateSchema(ma.Schema):
	class Meta:
		fields = ('id', 'customer_id', 'status', 'privatekey', 'body')
		

certificate_schema = CertificateSchema()
certificates_schema = CertificateSchema(many=True)

# endpoint to show all certificates
@app.route("/certificate", methods=["GET"])
def get_certificate():
    all_certificates = Certificate.query.all()
    result = certificates_schema.dump(all_certificates)
    return jsonify(result.data)
    
# endpoint to show all certificates
@app.route("/certificateByCustomer/<id>", methods=["GET"])
def get_certificate_by_customer(id):
    all_certificates = Certificate.query.filter(Certificate.customer_id == id)
    result = certificates_schema.dump(all_certificates)
    return jsonify(result.data)


# endpoint to show all certificates
@app.route("/certificateToggle/<id>", methods=["PUT"])
def certificate_toggle(id):
    certificate = Certificate.query.get(id)
    
    if not certificate:
    	return Response("certificate not found", status=400)

 
    if certificate.status == 'active':
    	certificate.status = 'inactive'
    else:
    	certificate.status = 'active'
    	
    db.session.commit()
    
    response = certificate.toJSON()
    response.status_code = 200
    return response
    

# endpoint to create new certificate
@app.route("/certificate", methods=["POST"])
def add_certificate():
   
    customer_id = request.json['customer_id']
    status = request.json['status']
    privatekey = request.json['privatekey']
    body = request.json['body']
    
    if not controllers.customer_controller.Customer.query.get(customer_id):
    	return Response("customer does not exist, foreign key violation", status=400)

     
    new_certificate = Certificate(customer_id, privatekey, body, status)

    db.session.add(new_certificate)
    db.session.commit()

    response = new_certificate.toJSON()
    response.status_code = 200
    return response
   
    
# endpoint to delete a certificate
@app.route("/certificate/<id>", methods=["DELETE"])
def certificate_delete(id):
    certificate = Certificate.query.get(id)

    db.session.delete(certificate)
    db.session.commit()

    return certificate_schema.jsonify(certificate)
