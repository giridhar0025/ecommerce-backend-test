const SignupModel = require('./models/usermodel')
const bcrypt = require('bcryptjs')


async function checkExistingUser(email) {
    let existingUser = false;
    await SignupModel.find({email: email}).then((userData)=> {
        if(userData.length) {
            existingUser = true;
        }
    }).catch((err) => {
        console.log(err)
    });
    return existingUser;
}

const generateHash = async (password) =>  {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    return hashedPass;
}


module.exports = {checkExistingUser, generateHash};