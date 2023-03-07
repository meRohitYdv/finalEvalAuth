const {validateRequest} = require('../../src/middlewares/auth');

const jwt = require('jsonwebtoken');
const config = require('config');

describe('validateRequest', ()=>{
    it('should return bad request when username is not provided', ()=>{
      const mockReq={
        body:{
          password:'1234'
        }
      };
      const mockRes={
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };
      const next = jest.fn();
  
      validateRequest(mockReq, mockRes, next);
  
      expect(mockRes.status).toBeCalledWith(400);
    });
    
    it('should return bad request when password is not provided', ()=>{
      const mockReq={
        body:{
          username: 'abc'
        }
      };
      const mockRes={
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };
      const next = jest.fn();
  
      validateRequest(mockReq, mockRes, next);
  
      expect(mockRes.status).toBeCalledWith(400);
    });
    
    it('should call next when username and password are provided', ()=>{
      const mockReq={
        body:{
          username: 'abc',
          password: '123'
        }
      };
      const mockRes={
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };
      const next = jest.fn();
  
      validateRequest(mockReq, mockRes, next);
  
      expect(next).toBeCalledWith();
    });
  });
  