import User from '../models/user.model'
const responseModule = require('../../../../../config/response');
import winston from '../../../../../config/winston';


/**
 * Function to create a User
 * 
 * @param {Object} req 
 * @param {Object} res 
 */
export const createUser = async (req, res, next) => {
  const user = new User(req.body)
  try {
    await user.save((error, result) => {
      if (error) {
        if (error.name == 'ValidationError') {
          return res.status(400).json({
            success: 0,
            message: error.message,
            response: 400,
            data: {}
          });
        }
        return responseModule.errorResponse(res, {
          success: 0,
          message: "User creation failed",
          data: {
            error
          }
        });
      } else {
        return responseModule.successResponse(res, {
          success: 1,
          message: 'User created successfully',
          data: result
        });
      }
    })
  } catch (err) {
    winston.error(err);
    return next();
  }
}


/**
 * Function to login a User
 * 
 * @param {Object} req 
 * @param {Object} res 
 */
 export const loginUser = async (req, res, next) => {
  const user = new User(req.body.email)
  try {
    await User.find({
      $and: [{ email: req.body.email }, { password: req.body.password }]
    })
    .exec((error, result) => {
      if (error) {
        if (error.name == 'ValidationError') {
          return res.status(400).json({
            success: 0,
            message: error.message,
            response: 400,
            data: {}
          });
        }
        return responseModule.errorResponse(res, {
          success: 0,
          message: "User LOGIN failed",
          data: {
            error
          }
        });
      } else {
        return responseModule.successResponse(res, {
          success: 1,
          message: 'User LOGIN successfully',
          data: result
        });
      }
    });
  } catch (err) {
    winston.error(err);
    return next();
  }
}
