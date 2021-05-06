'use strict';
const app = require('../index');
const request = require('supertest');
const assert = require('chai').assert;
const baseAuthPath = '/api/v1/auth';
const baseUserPath = '/api/v1/users';
let email = 'somename' + Math.floor(Date.now() / 1000) + '@yam.co';
const base64 = require('base-64');
let username = 'page@yahoo.com';
let password = '123456';

describe('User registration', () => {
	it('Should register a new user and return user information including token', (done) => {
		request(app)
			.post(`${baseAuthPath}/registration`)
			.send({ first_name: 'aseye', last_name: 'aseye', email: email, password: password })
			.expect(200, done)
			.then((data) => {
				console.log(data);
				assert(data.body);
			});
	}),
		it('should return an error bad request if email is already registered', (done) => {
			request(app)
				.post(`${baseAuthPath}/registration`)
				.send({ first_name: 'aseye', last_name: 'aseye', email: email, password: password })
				.expect(400, done);
		}),
		it('should return an error bad request when email is taken out', (done) => {
			request(app)
				.post(`${baseAuthPath}/registration`)
				.send({ first_name: 'aseye', last_name: 'aseye', password: password })
				.expect(400, done);
		}),
		it('should return an error bad request when email value is not passed', (done) => {
			request(app)
				.post(`${baseAuthPath}/registration`)
				.send({ first_name: 'aseye', last_name: 'aseye', password: password, email: '' })
				.expect(400, done);
		}),
		it('should return an error bad request when password value is not passed', (done) => {
			request(app)
				.post(`${baseAuthPath}/registration`)
				.send({ first_name: 'aseye', last_name: 'aseye', password: '', email: email })
				.expect(400, done);
		}),
		it('should return an error bad request when password is taken out', (done) => {
			request(app)
				.post(`${baseAuthPath}/registration`)
				.send({ first_name: 'aseye', last_name: 'aseye', email: email })
				.expect(400, done);
		}),
		it('should return an error bad request when first_name  is taken out', (done) => {
			request(app)
				.post(`${baseAuthPath}/registration`)
				.send({ last_name: 'aseye', email: email, password: password })
				.expect(400, done);
		}),
		it('should return an error bad request when first_name value is not passed', (done) => {
			request(app)
				.post(`${baseAuthPath}/registration`)
				.send({ first_name: '', last_name: 'aseye', email: email, password: password })
				.expect(400, done);
		}),
		it('should return an error bad request when last_name  is taken out', (done) => {
			request(app)
				.post(`${baseAuthPath}/registration`)
				.send({ first_name: 'aseye', email: email, password: password })
				.expect(400, done);
		}),
		it('should return an error bad request when last_name value is not passed', (done) => {
			request(app)
				.post(`${baseAuthPath}/registration`)
				.send({ first_name: 'aseye', last_name: '', email: email, password: password })
				.expect(400, done);
		});
});


describe('User login', () => {
	it('should fetch the profile info of existing user', (done) => {
		request(app)
			.post(`${baseAuthPath}/login`)
			.set('Authorization', `Basic ` + base64.encode(email + ':' + password).toString())
			.expect(200,done)
    });
    let emailNotExist='yyyyy@mail.com';
    it('should return not found if user name is not found',(done)=>{
        request(app)
			.post(`${baseAuthPath}/login`)
			.set('Authorization', `Basic ` + base64.encode(emailNotExist + ':' + password).toString())
			.expect(404,done)

    });
    let emailEmpty='';
    it('should return bad request  if user name is  empty',(done)=>{
        request(app)
			.post(`${baseAuthPath}/login`)
			.set('Authorization', `Basic ` + base64.encode(emailEmpty + ':' + password).toString())
			.expect(400,done)

	});
    let passwordEmpty=""
	it('should return bad request  if password is empty',(done)=>{
        request(app)
			.post(`${baseAuthPath}/login`)
			.set('Authorization', `Basic ` + base64.encode(emailEmpty + ':' + passwordEmpty).toString())
			.expect(400,done)

    })
});

