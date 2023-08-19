const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const JWT_SECRET = "3]p]oi590ekj*$#@IJEKJJS#(*#u#)0jd'U((#)i)ruosjfo";

const mongourl = "mongodb+srv://Admin:Kanu%407162@clusterlogin.bm9jmdr.mongodb.net/";

mongoose.connect(mongourl, {
    useNewUrlParser: true,
    useUnifiedTopology: true, // Added to fix deprecation warning
}).then(() => {
    console.log("connected to database");
}).catch(e => console.log(e));

app.listen(5000, () => {
    console.log("server started");
});

require("./userdetail");
const User = mongoose.model("Studentinfo");

app.post("/post", async (req, res) => {
    console.log(req.body);
    const { data } = req.body;

    try {
        if (data === "krishna") {
            res.send({ status: "ok" });
        } else {
            res.send({ status: "User NotFound" });
        }

    } catch (error) {
        res.send({ status: "Something went wrong" });
    }
});

app.post("/register", async (req, res) => {

    const { Email, Name, RollNo, FatherName, Batch, MobileNo, password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    try {
        const oldUser = await User.findOne({ Email });

        if (oldUser) {
            return res.send({ error: "User Exist" });
        }
        await User.create({
            Email: Email,
            Name: Name,
            RollNo: RollNo,
            FatherName: FatherName,
            Batch: Batch,
            PhoneNo: MobileNo,
            password: encryptedPassword

        });
        res.send({ status: "ok" });
    } catch (error) {
        res.send({ status: "error" });
    }
});

app.post("/login-user", async (req, res) => {
    const { Email, password } = req.body;
    const user = await User.findOne({ Email });
    if (!user) { // Changed "User" to "user"
        return res.json({ error: "User Not Exist" });
    }
    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({}, JWT_SECRET); // You might want to add payload and options here
        res.json({ status: "ok", token: token });
    } else {
        res.json({ status: "error", error: "Invalid Password" });
    }
});
