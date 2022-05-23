const bcrypt = require('bcrypt')

const saltRounds = 12;

const hashPassword = (password)=>{
    return new Promise((resolve, reject)=>{
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return reject(err);
            bcrypt.hash(password, salt, function(err, hash) {
                if(err) return reject(err);
                resolve(hash)
            });
        });        
    })
}


const verifyPassword = (password, hashedPassword)=>{
    return new Promise((resolve, reject)=>{
        bcrypt.compare(password, hashedPassword, function(err, result) {
            if(err) return reject(err);
            resolve(result)
        });
    })
    
}

module.exports.hashPassword = hashPassword;
module.exports.verifyPassword = verifyPassword;