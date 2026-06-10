function validateRegister(userData)
{
    if (!userData.first_name || userData.first_name.trim() === "")
    {
        throw new Error("First name is required");
    }

    if (!userData.last_name || userData.last_name.trim() === "")
    {
        throw new Error("Last name is required");
    }

    if (!userData.email || userData.email.trim() === "")
    {
        throw new Error("Email is required");
    }

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if(!emailRegex.test(userData.email))
    {
        throw new Error("Invalid email");
    }



    if (!userData.phone || userData.phone.trim() === "")
    {
        throw new Error("Phone number is required");
    }

    const phone_regex = /^\d{10}$/;

    if(!phone_regex.test(userData.phone))
    {
        throw new Error("Invalid phone number");
    }

    if (!userData.password)
    {
        throw new Error("Password is required");
    }

    if(userData.password.length < 8)
    {
        throw new Error("Password must be at least 8 characters long");
    }

    const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

    if(!password_regex.test(userData.password))
    {
        throw new Error(
            "Password must contain at least one uppercase letter, one lowercase letter, and one digit"
        );
    }

    if (!userData.date_of_birth)
    {
        throw new Error("Date of birth is required");
    }

    if (!userData.address || userData.address.trim() === "")
    {
        throw new Error("Address is required");
    }
}

module.exports = {
    validateRegister
};