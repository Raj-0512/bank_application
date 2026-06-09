const pool = require('../config/db');

async function findUserByEmail(email)
{
    const result = await pool.query(`select * from users where email = $1` , [email]);

    return result.rows[0];
}

async function createUser(userData)
{
    const result = await pool.query(`
       insert into users
       (
        first_name,
        last_name,
        email,
        phone,
        password_hash,
        date_of_birth,
        address,
        is_active
       ) 
       values 
       (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8
       )
       returning *
       ` , [userData.first_name ,
            userData.last_name ,
            userData.email ,
            userData.phone_number ,
            userData.password,
            userData.date_of_birth ,
            userData.address,
            true
            ]);



    return result.rows[0];
}

module.exports = {findUserByEmail , createUser};