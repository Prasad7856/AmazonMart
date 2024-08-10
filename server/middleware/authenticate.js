const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const keysecret = process.env.KEY;

const authenticate = async (req, resp, next) => {
    try {
        const token = req.cookies.Amazonweb;

        if (!token) {
            return resp.status(401).json({ error: "Unauthorized: No token provided" });
        }

        const verifyToken = jwt.verify(token, keysecret);
        // console.log("verifyToken : " + verifyToken);

        const rootUser = await User.findOne({ _id: verifyToken._id});
        if (!rootUser) { throw new Error("User Not Found") };

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();
    } catch (error) {

        resp.status(401).send("Unauthorized:No token provided");
        console.log(error);

    }
}

module.exports = authenticate;
