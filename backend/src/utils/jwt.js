const jwt = require("jsonwebtoken");
const createToken = (payload, secret) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, function (err, token) {
      if (err) return reject(err);
      resolve(`Bearer ${token}`);
    });
  });
};

const verifyToken = (token, secret) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token.split(' ')[1], secret, function (err, decoded) {
      if (err) return reject(err);
      resolve(decoded);
    });
  });
};

module.exports.createToken = createToken;
module.exports.verifyToken = verifyToken;
