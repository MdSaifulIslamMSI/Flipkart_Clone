// Generates a JWT for the given user, sets it as an HTTP-only cookie,
// and sends the user data back in the response.

const sendAuthCookie = (user, statusCode, res) => {
    const token = user.generateAuthToken();

    // Cookie settings — httpOnly prevents JavaScript access for security
    const cookieOptions = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: "lax",
    };

    // Only send cookies over HTTPS in production
    if (process.env.NODE_ENV === "production") {
        cookieOptions.secure = true;
    }

    res.status(statusCode)
        .cookie("token", token, cookieOptions)
        .json({ success: true, user, token });
};

module.exports = sendAuthCookie;