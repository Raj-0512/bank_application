const authService = require('../services/auth_service');

async function register(req , res)
{
    try
    {
        const user = await authService.register(req.body);
        res.status(201).json({
            success:true ,
            message:"User registered successfully",
            userId: user.user_id
        });
    }
    catch(err)
    {
        res.status(500).json({
            message:err.message
        });
    }
}

async function login(req , res)
{
    try
    {
        const user = await authService.login(req.body);
        res.status(200).json({
            success:true ,
            message:"User login successful",
            token:token
        });
    }
    catch(err)
    {
        res.status(err.status || 500).json({
            message:err.message
        });
    }
}

module.exports = {register , login};