const { authenticateUser, verifyJWT } = require('../../src/controllers/auth');
jest.mock('../../src/services/auth.js');
let services = require('../../src/services/auth.js');
const jwt = require('jsonwebtoken');
const config = require('config');


describe('authenticateUser', ()=>{

  it('should give 400 status when token is not generated', async ()=>{
    const mockReq = {
      body:{

      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    services.authenticateUser.mockImplementation(()=>{
      return 'Invalid id or password.';
    });
      
    await authenticateUser(mockReq, mockRes);
    expect(mockRes.status).toBeCalledWith(400);
  });
 
  it('should give 200 status when token is generated', async ()=>{
    const mockReq = {
      body:{

      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      cookie: jest.fn()
    };

    services.authenticateUser.mockImplementation(()=>{

      return jwt.sign({ username: 'abc' }, config.get('jwtPrivateKey'), {expiresIn: '20m'});
    });
  
    await authenticateUser(mockReq, mockRes);
    expect(mockRes.status).toBeCalledWith(200);
  });
});

describe('verifyJWT', ()=>{
  it('should return 401 when token is not provided', ()=>{
    const mockReq = {
      header: jest.fn().mockReturnValue(undefined)
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    const next = jest.fn();
    
    verifyJWT(mockReq, mockRes, next);
    expect(mockRes.status).toBeCalledWith(401);
  });

  it('should return 400 when wrong token is provided', ()=>{
    const mockReq = {
      body: {token: 'abcd'}
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    const next = jest.fn();
    
    verifyJWT(mockReq, mockRes, next);
    expect(mockRes.status).toBeCalledWith(400);
  });

  it('should call next when valid token is provided', ()=>{
    const mockReq = {
      body: {
        token: jwt.sign({ username: 'abcd' }, config.get('jwtPrivateKey'), {expiresIn: '20m'})
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    const next = jest.fn();
    
    verifyJWT(mockReq, mockRes, next);
    expect(mockRes.status).toBeCalledWith(200);
  });
});