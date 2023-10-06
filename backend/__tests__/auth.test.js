import { fetchUserFromLabAccess, fetchUserListFromLabAccess, getNameRoleWithDb, loginWithdb, registerUsrWithDb } from '../src/auth-controller.js';
import db from "../dataBase/db.js";
import {jest} from '@jest/globals';


jest.mock('bcrypt');
import bcrypt from "bcrypt";
jest.mock('../dataBase/db.js');

describe('registerUsrWithDb', () => {
    it('should register a user with the database', async () => {
      // Mock request and response objects
      const req = {
        body: {
          name: 'Test User',
          user_name: 'testuser',
          password: 'password123',
          email: 'test@example.com',
          user_id: '123',
          phone_number: '1234567890',
          role: 'user',
        },
      };
      const res = {
        json: jest.fn(), // Create a mock function to capture the response data
      };

       // Mock the behavior of bcrypt.hash using jest.fn()
    bcrypt.hash = jest.fn().mockImplementation((password, saltRounds, callback) => {
        callback(null, 'hashedPassword'); // Simulate a successful hash
      });


      // Mock the behavior of db.query
    db.query=jest.fn().mockImplementationOnce((query, values, callback) => {
        callback(null, { status: 'ok' }); // Simulate a successful database query
      })

    .mockImplementationOnce((query, values, callback) => {
        callback(new Error('Database error'), null); // Simulate an unsuccessful database query
      });



      // Call the function to be tested
      await registerUsrWithDb(req, res);

      // Assert that the response is as expected
      expect(res.json).toHaveBeenCalledWith({ status: 'ok' });

      res.json.mockReset();
      await registerUsrWithDb(req, res);
      expect(res.json).toHaveBeenCalledWith({ status: "error" })

    });
  
   
}); 


describe('loginWithDb',()=>{
    it('Should get user data from the database ', async ()=>{
        // Mock request and response objects
      const req = {
        body: {
          name: 'Test User',
          user_name: 'testuser',
          password: 'password123',
        },
      };
      const res = {
        json: jest.fn(), // Create a mock function to capture the response data
        cookie: jest.fn()
      };

      // Mock the behavior of db.query
    db.query=jest.fn().mockImplementation((query, values, callback) => {
        callback(null,[{
            name: 'Test User',
            user_name: 'testuser',
            password: 'password123',
            email: 'test@example.com',
            user_id: '123',
            phone_number: '1234567890',
            role: 'user',
          }]); // Simulate a successful database query
      });

   

      // Mock the behavior of bcrypt.hash using jest.fn()
    bcrypt.compare = jest.fn().mockImplementationOnce((password, password2, callback) => {
        callback(null, true); // Simulate a successful password comparison
      })

    .mockImplementationOnce((password, password2, callback) => {
        callback(null, false); // Simulate unmatching password comparison
      })

    .mockImplementationOnce((password, password2, callback) => {
        callback(new Error('pwd comparison error'), false); // Simulate an unsuccessful password comparison
      });

        
    await loginWithdb(req, res);
    expect(res.json).toHaveBeenCalledWith({ status: 'ok' });
    // expect(res.cookie).toHaveBeenCalledWith("token",undefined);

      // Reset the response mock function
   
    res.json.mockReset();
    await loginWithdb(req, res);
    expect(res.json).toHaveBeenCalledWith({err: "Wrong password"})

    res.json.mockReset();
    await loginWithdb(req, res);
    expect(res.json).toHaveBeenCalledWith({err: "Password compare error"})

    });
    
    it('should represent user not found situation',async()=>{
         // Mock request and response objects
      const req = {
        body: {
          name: 'Test User',
          user_name: 'testuser',
          password: 'password123',
        },
      };
      const res = {
        json: jest.fn(), // Create a mock function to capture the response data
        cookie: jest.fn()
      };

        db.query=jest.fn().mockImplementation((query, values, callback) => {
            callback(null,[]); // Simulate user not found!
          });

         // Mock the behavior of bcrypt.hash using jest.fn()
    bcrypt.compare = jest.fn().mockImplementationOnce((password, password2, callback) => {
        callback(null, true); // Simulate a successful password comparison
      })

      await loginWithdb(req, res);
      expect(res.json).toHaveBeenCalledWith({ err: "User not found" });
  

    });
});

//next function (getVerifiedWithDb) is also same; no test case needed

describe('getNameRoleWithDb', () => {
  it('should return user info by referring jwt secret', async () =>{
    // Mock request and response objects
    const req = {
        name: 'Test User',
        user_name: 'testuser',
        password: 'password123',
        email: 'test@example.com',
        user_id: '123',
        phone_number: '1234567890',
        role: 'user',
      
    };
    const res = {
      json: jest.fn(), // Create a mock function to capture the response data
    };

    await getNameRoleWithDb(req,res);
    expect(res.json).toHaveBeenCalledWith({ status: 'ok',name:'Test User',role: 'user' });

  });

});

describe('fetchUserFromLabAccess', () => {
  it('should return lab that user has access to', async () =>{
    // Mock request and response objects
    const req = {
        name: 'Test User',
        user_name: 'testuser',
        password: 'password123',
        email: 'test@example.com',
        user_id: '123',
        phone_number: '1234567890',
        role: 'user',
      
    };
    const res = {
      json: jest.fn(), // Create a mock function to capture the response data
    };

    db.query=jest.fn().mockImplementationOnce((query, values, callback) => {
      callback(null,[{name: 'name1'}]); // Simulate succesful db query
    }).mockImplementationOnce((query, values, callback) => {
      callback(new Error('DB error'),null); // Simulate unsuccesful db query
    });

    await fetchUserFromLabAccess(req,res);
    expect(res.json).toHaveBeenCalledWith([{name: 'name1'}]);

    res.json.mockReset();
    await fetchUserFromLabAccess(req,res);
    expect(res.json).toHaveBeenCalledWith(Error('DB error'));

  });

});

describe('fetchUserListFromLabAccess', () => {
  it('should return lab that user has access to', async () =>{
    // Mock request and response objects
    const req = {
        name: 'Test User',
        user_name: 'testuser',
        password: 'password123',
        email: 'test@example.com',
        user_id: '123',
        phone_number: '1234567890',
        role: 'user',
      
    };
    const res = {
      json: jest.fn(), // Create a mock function to capture the response data
    };

    db.query=jest.fn().mockImplementationOnce((query, values, callback) => {
      callback(null,[{name: 'name1',user_name:'usr_name1'},{name: 'name2',user_name:'usr_name2'}]); // Simulate succesful db query
    }).mockImplementationOnce((query, values, callback) => {
      callback(new Error('DB error'),null); // Simulate unsuccesful db query
    });

    await fetchUserListFromLabAccess(req,res);
    expect(res.json).toHaveBeenCalledWith({list:['name1','name2'],role:'user'});

    res.json.mockReset();
    await fetchUserListFromLabAccess(req,res);
    expect(res.json).toHaveBeenCalledWith(Error('DB error'));

  });

});


