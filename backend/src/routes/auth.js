const express = require("express");
const authRouter = express.Router();
const connection = require("../database");
const jwt = require("jsonwebtoken");

// SIGNUP
authRouter.post("/signup", async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password,
    };

    if (
        data.name.length < 3 ||
        !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(data.password)
    )
        return res.sendStatus(422);

    connection.query(
        "SELECT * FROM users WHERE username = ?",
        [data.name],
        (err, result) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }
            if (result.length == 0) {
                connection.query(
                    "INSERT INTO users (username, password) VALUES (?, ?)",
                    [data.name, data.password],
                    (err, result) => {
                        res.sendStatus(200);
                        return;
                    },
                );
            } else {
                res.sendStatus(409);
                return;
            }
        },
    );
});

// LOGIN
authRouter.post("/login", async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password,
    };

    connection.query(
        "SELECT * FROM users WHERE username = ? AND password = ?",
        [data.name, data.password],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500);
                return;
            }
            if (result.length == 0) {
                return res.status(400).json({
                    message: "Invalid credentials",
                });
            } else {
                const id = result[0].id;
                const username = result[0].username;

                const user = {
                    id: id,
                    name: username,
                };
                const token = jwt.sign(user, process.env.ACCESS_TOKEN);

                res.status(200).json({
                    token: token,
                });
                return;
            }
        },
    );
});

module.exports = authRouter;
