const express = require("express");
const router = new express.Router();
const Products = require('../models/productsSchema');
const USER = require('../models/userSchema');
const bcrypt = require("bcryptjs");
const authenticate = require('../middleware/authenticate');


// get the products data
router.get('/getproducts', async (req, resp) => {
    try {
        const productdata = await Products.find();
        // console.log("get data -------------------> "+productdata);
        resp.status(201).json(productdata);
    } catch (error) {
        console.log("error " + error.message);
    }
})

// get single data

router.get('/getproductsone/:id', async (req, resp) => {

    try {
        const { id } = req.params;
        const individualdata = await Products.findOne({ id: id });
        // console.log(individualdata);
        resp.status(201).json(individualdata);

    } catch (error) {
        resp.status(401).json(error);
    }

});

// register user

router.post('/register', async (req, resp) => {

    const { fname, email, mobile, password, cpassword } = req.body;

    if (!fname || !email || !mobile || !password || !cpassword) {
        resp.status(422).json({ error: "filll the all details" });
        // console.log("bhai nathi present badhi details");
    };

    try {

        const preuser = await USER.findOne({ email: email });
        if (preuser) {
            resp.status(422).json({ error: "This email is already exist" });
        } else if (password !== cpassword) {
            resp.status(422).json({ error: "password are not matching" });;
        } else {

            const finaluser = new USER({
                fname, email, mobile, password, cpassword
            });

            // here we hassing the password before store it into db - we are not decrypt the password , directly compare it at the login time 

            const storedata = await finaluser.save();
            // console.log(storedata + "user successfully added");
            resp.status(201).json(storedata);
        }

    } catch (error) {
        // console.log("error the bhai catch ma for registratoin time" + error.message);
        resp.status(422).send(error);

    }
});


// login user api

router.post('/login', async (req, resp) => {
    const { email, password } = req.body;

    if (!email || !password) {
        resp.status(400).json({ error: "Fill all details" });

    }

    try {
        const userLogin = await USER.findOne({ email: email });
        // console.log(userLogin);

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);
            // console.log(isMatch);

            if (!isMatch) {
                resp.status(400).json({ error: "invalid details" });

            }
            else {
                // token generate
                const token = await userLogin.generateAuthToken();
                console.log("token is : " + token);

                // genearting cookie

                resp.cookie("Amazonweb", token, {
                    expires: new Date(Date.now() + 600000), // 10 min
                    httpOnly: true
                })
                resp.status(201).json(userLogin);
            }
        }
        else {
            resp.status(400).json({ error: "invalid details" });
        }
    } catch (error) {
        resp.status(400).json({ error: "invalid details catch" });
    }
});

router.post('/addcart/:id', authenticate, async (req, resp) => {
    try {
        const { id } = req.params;
        const cart = await Products.findOne({ id: id });
        // console.log("cart "+cart);

        const UserContact = await USER.findOne({ _id: req.userID });
        // console.log("UserContact : "+UserContact);

        if (UserContact) {
            const cartData = await UserContact.addcartdata(cart);
            await UserContact.save();
            // console.log("cartData : "+cartData);
            resp.status(201).json(req.rootUser);
        }
        else {
            resp.status(401).json({ error: "Invalid user cart page" });
        }

    } catch (error) {

        resp.status(401).json({ error: "Invalid user cart page" });
    }
});

// get cart details 

router.get("/cartdetails", authenticate, async (req, resp) => {

    try {
        const buyuser = await USER.findOne({ _id: req.userID });
        resp.status(201).json(buyuser);
    } catch (error) {
        console.log("error in getting cart details : " + error);
    }
});

// get valid user

router.get("/validuser", authenticate, async (req, resp) => {

    try {
        const validuserone = await USER.findOne({ _id: req.userID });
        resp.status(201).json(validuserone);
    } catch (error) {
        console.log("error in getting valid user: " + error);
    }
});

// remove item from cart

router.delete("/remove/:id", authenticate, async (req, resp) => {
    try {
        const { id } = req.params;
        req.rootUser.carts = req.rootUser.carts.filter((currid) => {
            return currid.id != id;

        });
        req.rootUser.save();
        resp.status(201).json(req.rootUser);
        console.log("item removed");

    } catch (error) {
        console.log("error in delete : " + error);
        resp.status(400).json(req.rootUser);
    }

});

// logout user

router.get("/logout", authenticate, async (req, resp) => {

    try {
        resp.clearCookie("Amazonweb", { path: "/" });
        resp.status(201).json({ message: "user logout" });

    } catch (error) {
        console.log("error in logout");

    }

})

module.exports = router;