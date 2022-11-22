const Role = require("../models/Role");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const dotenv = require('dotenv');
dotenv.config();

const verifySignupRequest = (request) => {
    if (request.email && request.username && request.password && request.nom && request.prenom && request.roles) {
        return true;
    }
    return false;
}

const verifyUserExists = async (username, email) => {
    let user = await User.findOne({ 
        where: {
        [Sequelize.Op.or]: [
            { username: username },
            { email: email },
        ]
        }
    });
    if (user != null) {
        return true;
    }
    return false;
}

const signup = async (req, res) => {

    if (verifySignupRequest(req.body)) {
        let user = {
            username: req.body.username,
            email: req.body.email,
            nom: req.body.nom,
            prenom: req.body.prenom,
        };

        const roles = await Role.findAll({
            where:
            {
                nom: {
                    [Sequelize.Op.in]: req.body.roles
                }
            }
        });

        if (!(await verifyUserExists(user.username, user.email))) {

            let password = req.body.password
            password = bcrypt.hashSync(password, 8);
            user.password = password;

                try {
                    user = await User.create(user);

                    user.setRoles(roles.map((role) => role.id)).then(() => {
                        console.log("Utilisateur créé avec succès!");
                    }).catch((error) => {
                        console.log("error", error);
                    });

                    return res.send({ message: "User was registered successfully" });
                } catch (error) {
                    return res.status(500).send({ message: error });
                }
            
        } else {
            return res.status(500).send({ message: "Utilisateur existant" });
        }

    } else {
        return res.status(400).send({ message: "Vous devez remplir tous les champs" });
    }
};

const verifySigninRequest = (request) => {
    if ((request.email || request.username) && request.password) {
        return true;
    }
    return false;
}

const signin = async (req, res) => {
    if (verifySigninRequest(req.body)) {
        let user = await User.findOne({ 
            where: {
                [Sequelize.Op.or]: [
                    { username: req.body.username },
                    { email: req.body.username },
                ]
            }
        });

        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
    
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
    
        if (!passwordIsValid) {
            return res.status(401).send({
                message: "Invalid Password!"
            });
        }
    
        var authorities = [];
        const roles = await user.getRoles();
    
        for (let i = 0; i < roles.length; i++) {
            authorities.push("ROLE_" + roles[i].dataValues.nom.toUpperCase());
        }
    
        var token = jwt.sign({ id: user.id, roles: authorities }, process.env.JWT_KEY, {
            expiresIn: 43200
        });
    
        req.session.token = token;
        res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token
        });
        
        
    } else {
        return res.status(400).send({ message: "Vous devez remplir tous les champs" });
    }
}

exports.signup = signup;
exports.signin = signin;