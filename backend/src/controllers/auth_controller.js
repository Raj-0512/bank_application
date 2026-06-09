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

module.exports = {register};