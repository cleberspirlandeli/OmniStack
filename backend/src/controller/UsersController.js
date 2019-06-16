const md5 = require('md5');
const Users = require('../models/Users');
const Email = require('./../config/emails');

module.exports = {
    
    // GET - users
    async index(req, res) {
        const users = await Users.find().sort('-createdAt');

        return res.status(200).json(users);
    },

    // POST - register
    async register(req, res) {

        try {
            let { name, email, password } = req.body;
            password = md5(password);

            const userValid = await Users.find({ "email": email });

            if (userValid.length === 0) {
                const user = await Users.create({
                    name,
                    email,
                    password
                });

                // send email
                Email.send(user);

                return res.status(201).json(user);
            }

            return res.status(400).json(userValid);

        } catch (error) {
            return res.status(500).json(error);
        }
    },

    // POST - authentication
    async authentication(req, res) {

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
                return res.status(200).json(user);
            } else {
                return res.status(401).json({ "email": email, "password": password });
            }

        } catch (error) {
            return res.status(500).json(error);
        }
    },

    // GET - active
    async active(req, res) {
        try {
            const iduser = req.query.user || null;

            if (iduser !== null) {
                let user = await Users.findById(iduser);

                user.active = 1;

                await user.save(user);

                return res.status(200).json(user);
            } else {
                return res.status(400).json({ "sucess": false });
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    }
};