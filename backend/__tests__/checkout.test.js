import db from "../dataBase/db.js";
import { checkOutLogic } from '../src/checkout-controller';
import {jest} from '@jest/globals';

describe('checkOutLogic', () => {
  it('should indicate unavialability for a check-out due to a maintenance', async () => {
    // Mock request and response objects
    const req = {
      body: {
        userId: 1,
        resourceId: 123,
        checkoutDatetime: '2023-10-01 14:00:00',
        dueDatetime: '2023-10-02 14:00:00',
        retDatetime: '2023-10-03 14:00:00',
        purpose: 'Testing',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the behavior of db.query for the item not being checked out
    db.query=jest.fn().mockImplementation((sql, values, callback) => {
      // Simulate no previous checkouts for the resource
      callback(null, [{status:'Checked-out'}]);
    });

    // Call the function to be tested
    await checkOutLogic(req, res);

    // Assert that the response indicates a successful check-out
    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({ message: `Item with the Resource ID you entered is currently checked out.` });
  });

  it('should handle an item currently checked out', async () => {
    // Mock request and response objects
    const req = {
      body: {
        userId: 1,
        resourceId: 123,
        checkoutDatetime: '2023-10-01 14:00:00',
        dueDatetime: '2023-10-02 14:00:00',
        retDatetime: '2023-10-03 14:00:00',
        purpose: 'Testing',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the behavior of db.query to simulate the item being checked out
    db.query=jest.fn().mockImplementation((sql, values, callback) => {
      // Simulate previous checkouts for the resource
      callback(null, [{ user_id: 1, resource_id: 123, status: 'Checked-out' }]);
    });

    // Call the function to be tested
    await checkOutLogic(req, res);

    // Assert that the response indicates the item is currently checked out
    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Item with the Resource ID you entered is currently checked out.',
    });
  });

  // You can write more test cases to cover other scenarios, such as maintenance, reservation, and errors.
});
