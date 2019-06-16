const Users = require('./../models/Users');
const md5 = require('md5');
const jwt = require('jsonwebtoken');

module.exports = {

    async login(req, res, next) {
        try {
            let { email, password } = req.body;
            password = md5(password);

            const user = await Users.find({
                $and: [
                    { "email": email },
                    { "password": password },
                    { "active": 1 }
                ]
            });

            if (user.length === 1) {
                const token = jwt.sign(user, process.env.SECRET_KEY, {
                    expiresIn: "1 day"
                });

                return res.status(200).json({ "token": token });
            }

            return res.status(400).json({ "token": null });

        } catch (error) {
            res.status(500).json(error);
        }
    },

    async validateToken(req, res, next) {
        const token = req.body.token || ''

        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            res.status(200).json({ valid: !err });
        });
    }

}