const jwt = require('../utils/jwt')
const UserModel = require('../models/user')
const AppError = require('../utils/app_error')
const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.autorization
    const { id } = await jwt.verifyToken(
      token,
      process.env.SECRET || 'ZhanValZhan'
    )
    const user = await UserModel.findById(id)
    if (!user) return next(new AppError('unauthenticated access call', 401))
    req.user = user
    next()
  } catch (e) {
    next(e)
  }
}

const is = (role) => (req, res, next) => {
  if (role !== req.user.role)
    return next(new AppError('unauthorized access call', 401))
  next()
}

module.exports.authenticate = authenticate
module.exports.is = is
