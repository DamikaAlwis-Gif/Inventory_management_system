import db from "../dataBase/db.js";
import {jest} from '@jest/globals';
import { checkInLogic } from "../src/checkin-controller.js";

jest.mock('../dataBase/db.js');

describe('checkInLogic', () => {
    it('should verify the functionality of checking in', async () => {
      // Mock request and response objects
      const req = {
        body: {
          userId:'123',
          resourceId:'456',
          checkinDatetime:'2023-1-1 12:36:00'
        },
      };
      const res = {
        status: jest.fn(() => res), // Create a mock function to capture the response data
        json: jest.fn(),
      };

       // Mock the behavior of db.query
    db.query=jest.fn().mockImplementationOnce((query, values, callback) => {
        callback(null, []); // Simulate no checkouts
       })
      .mockImplementationOnce((query, values, callback) => {
        callback(null, [{status:'Checked-in'}]); // Simulate not checked out by status 'checked-out'
      })
      .mockImplementationOnce((query, values, callback) => {
        callback(null, [{status:'Not Overdue'}]); // Simulate not checked out by status 'Overdue'
      })
      .mockImplementationOnce((query, values, callback) => {
        callback(null, [{status:'Checked-out',user_id:'456'}]); // Simulate userid mismatch
      })
    .mockImplementationOnce((query, values, callback) => {
        callback(new Error('Database error'), undefined); // Simulate unsuccessful database query
      });

      await checkInLogic(req, res);
      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith({message: 'There are no checkouts recorded for the given Resource ID.'});

       res.json.mockReset();
      res.status.mockReset();
      
      await checkInLogic(req, res);
      expect(res.status).toHaveBeenCalledWith(409);
      //expect(res.json).toHaveBeenCalledWith({message: 'This item is currently not checked-out.'});

     res.status.mockReset();
     res.json.mockReset();
      await checkInLogic(req, res);
      expect(res.status).toHaveBeenCalledWith(409);
    //   expect(res.json).toHaveBeenCalledWith({message: 'This item is currently not checked-out.'});

      res.status.mockReset();
       res.json.mockReset();
      await checkInLogic(req, res);
      expect(res.status).toHaveBeenCalledWith(490);

      res.status.mockReset();
      res.json.mockReset();
      await checkInLogic(req, res);
      expect(res.status).toHaveBeenCalledWith(500);

      


    });
  
   
}); 