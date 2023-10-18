"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniqueEmail = exports.check = void 0;
const check = (req, res, next) => {
    const { name } = req.body;
    if (name.length < 4) {
        res.status(400).send({ error: 'Name be at least 4 characters long' });
        return;
    }
    next();
};
exports.check = check;
const uniqueEmail = (req, res, next) => {
    const { email } = req.body;
    if (email === email) {
        res.status(400).send({ error: 'This user is not avaible' });
        return;
    }
    next();
};
exports.uniqueEmail = uniqueEmail;
