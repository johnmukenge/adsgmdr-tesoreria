const fs = require('fs');

const users = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);
const getAllUsers = (req, res) => {
    res.status(200).json({
        status:'success',
        results: users.length,
        data: {
            users: users,
        }
    });
};
const getUser = (req, res) => {
    const id = req.params.id * 1;
    if(id > users.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Non ci sono utenti con questo ID',
        });
    }
    const user = users.find(el => el.id === id);
    res.status(200).json({
        status: 'success',
        data: {
            user,
        },
    });
};
const createUser = (req, res) => {
    const newId = users[users.length - 1].id + 1;
    const newUser = { ...req.body, id: newId };
    users.push(newUser);
    res.status(201).json({
        status: 'success',
        data: {
            user: newUser,
        },
    });
};
const updateUser = (req, res) => {
    if(req.params.id * 1 > users.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Non ci sono utenti con questo ID',
        });
    }
    res.status(200).json({
        status: 'success',
        data: {
            user: '<Aggiorna utente qui...>',
        },
    });
};
const deleteUser = (req, res) => {
    if(req.params.id * 1 > users.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Non ci sono utenti con questo ID',
        });
    }
    res.status(204).json({
        status: 'success',
        data: null
    });
};

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
};