// Import necessary modules
import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../index.js'; // Replace with the actual path
import mongoose from 'mongoose';
import Post from '../model/post.js'; // Replace with the actual path
import Comment from '../model/comment.js'; // Replace with the actual path
import User from '../model/user.js'; 
chai.use(chaiHttp);
const expect = chai.expect;

describe('POST /register', () => {
    beforeEach(async () => {
        await User.deleteMany({});
    });

    it('should register a new user and return status 200', async () => {
        const newUser = {
            name: 'John Doe',
            username: 'john_doe',
            password: 'password123',
        };

        const response = await chai.request(app)
            .post('/register')
            .send(newUser);

        expect(response).to.have.status(200);
        expect(response.body.status).to.equal('ok');
    });

    it('should return an error if the username already exists', async () => {
        const existingUser = {
            name: 'Jane Doe',
            username: 'jane_doe',
            password: 'password456',
        };

        await User.create(existingUser);

        const response = await chai.request(app)
            .post('/register')
            .send(existingUser);

        expect(response).to.have.status(200);
        expect(response.body.error).to.equal('Username Already Exists');
    });

    it('should handle registration errors and return status 500', async () => {
        const invalidUser = {
            name: 'Invalid User',
            username: 'sample_user',
            password: 'x',
        };

        const response = await chai.request(app)
            .post('/register')
            .send(invalidUser);

        expect(response).to.have.status(500);
        expect(response.body.error).to.equal('error');
    });
});
describe('DELETE /deletePost', () => {

    before((done) => {
        // Connect to the test database or set up your database connection
        mongoose.connect('mongodb://localhost/testDB', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
        done();
        });
    });

    after((done) => {
        // Disconnect from the test database after all tests are done
        mongoose.connection.close(() => {
        done();
        });
    });
    it('should delete a post and return 200 if post exists',  (done) => {

        const postId = '6561925987bccd76a3a13bd2';
        chai.request(app)
        .delete('/deletePost')
        .query({ id: postId })
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message').equal('Post deleted successfully');
            done(); // Call done() to signal the completion of the test
        });
    });
  
    it('should return 404 if post does not exist', (done) => {
        const nonExistentPostId = '6561925987bccd76a3a13bd2';

        chai.request(app)
        .delete('/deletePost')
        .query({ id: nonExistentPostId })
        .end((err, res) => {
            expect(res).to.have.status(404);
            expect(res.body).to.have.property('message').equal('Post not found');
            done();
        });
    });
});

describe('Login Endpoint', () => {

    it('should login a user and return a token', (done) => {
      const userCredentials = {
        username: 'john_doe', 
        password: 'password123',  
      };
  
      chai.request(app)
        .post('/login')
        .send(userCredentials)
        .end((err, res) => {
          expect(res).to.have.status(200);
        //   expect(res.body).to.have.property('token').to.be.a('string');
          expect(res.body).to.have.property('username').to.be.a('string');
        //   expect(res).to.have.cookie('token');
          done();
        });
    });
  
    it('should return 401 for invalid credentials', (done) => {
      const invalidCredentials = {
        username: 'user1', 
        password: 'password123',  
      };
  
      chai.request(app)
        .post('/login')
        .send(invalidCredentials)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('error').equal('Invalid credentials');
          done();
        });
    });
  
  });