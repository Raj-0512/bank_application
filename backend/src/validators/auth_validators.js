function validateRegister(userData)
{
    if (!userData.first_name)
    {
        throw new Error("First name is required");
    }

    if (!userData.last_name)
    {
        throw new Error("Last name is required");
    }

    if (!userData.email)
    {
        throw new Error("Email is required");
    }

    if (!userData.phone)
    {
        throw new Error("Phone number is required");
    }

    if (!userData.password)
    {
        throw new Error("Password is required");
    }

    if (!userData.date_of_birth)
    {
        throw new Error("Date of birth is required");
    }

    if (!userData.address)
    {
        throw new Error("Address is required");
    }
}

module.exports = {
    validateRegister
};