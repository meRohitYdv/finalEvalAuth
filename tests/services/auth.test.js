const { authenticateUser } = require('../../src/services/auth.js');
const UserAuth = require('../../src/models').Credential;
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');


describe('authenticateUser', () => {
  it('should return JWT when correct credentials are given.', async () => {
    const mockReqBody = {
      username: 'abc',
      password: 'xyz'
    };

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(mockReqBody.password, salt);
    const returnValue = {
      dataValues: {
        username: 'abc',
        password: hashedPassword
      }
    };

    jest.spyOn(UserAuth, 'findOne').mockResolvedValue(returnValue);
    // jest.spyOn(User, 'findOne').mockResolvedValue({dataValues: {role:'admin'}});

    const tokens = await authenticateUser(mockReqBody);
    const decodedAccessToken = jwt.verify(tokens.accessToken, config.get('jwtPrivateKey'));
    

    expect(decodedAccessToken.username).toBe(mockReqBody.username);
  });

  it('should not return JWT when wrong password is given.', async () => {
    const mockReqBody = {
      username: 'abc',
      password: 'xyz'
    };

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('123', salt);

    const returnValue = {
      dataValues:{
        username: 'abc',
        password: hashedPassword
      }
    };

    jest.spyOn(UserAuth, 'findOne').mockResolvedValue(returnValue);

    const token = await authenticateUser(mockReqBody);
    expect(token).toBe('Invalid id or password.');
  });

  it('should not return JWT when user is not registered.', async () => {
    const mockReqBody = {
      username: 'abc',
      password: 'xyz'
    };

    const returnValue = null;

    jest.spyOn(UserAuth, 'findOne').mockResolvedValue(returnValue);

    const token = await authenticateUser(mockReqBody);
    expect(token).toBe('Invalid id or password.');
  });
});

