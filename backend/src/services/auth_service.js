const bcrypt = require('bcrypt');
const authRepository = require('../repositories/auth_repository');
const {validateRegister} = require('../validators/auth_validators');

async function register(userData)
{
    validateRegister(userData);

    const existingUser = await authRepository.findUserByEmail(userData.email);

    if (existingUser)
    {
        throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = await authRepository.createUser({
        ...userData,
        password: hashedPassword
    });

    return user;
}

module.exports = {register};