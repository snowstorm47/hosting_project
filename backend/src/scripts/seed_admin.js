const { connect } = require('../db/db')
const UserModel = require('../models/user')

const seedAdmin = async ()=>{
    const username = "abebe"
    const password = "password"
    await UserModel.create({
        username,
        password,
        role: 'admin'
    })
}

const init = async ()=>{
    await connect();
    await seedAdmin()
}

init()