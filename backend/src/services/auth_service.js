const bcrypt = require('bcrypt');
const authRepository = require('../repositories/auth_repository');
const {validateRegister , validateLogin} = require('../validators/auth_validators');

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

async function login(userData)
{
    validateLogin(userData);

    const user = await authRepository.findUserByEmail(userData.email);

    if(!user)
    {
        const error = new Error("Your credentials do not match in our system");
        error.status = 401;
        throw error;
    }

    const isPasswordCorrect = await bcrypt.compare(userData.password , user.password_hash);

    if(!isPasswordCorrect)
    {
        const error = new Error("Your credentials do not match in our system");
        error.status = 401;
        throw error;
    }

    return user;
}

module.exports = {register , login};