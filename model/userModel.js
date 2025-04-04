let users = [];
let nextId = 1;

function getAllUsers() {
    return users;
}

function getUserById(id) {
    return users.find(user => user.id === id);
}

function createUser(data) {
    const newUser = {
        id: nextId++,
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role || 'user' // default: 'user'
    };
    users.push(newUser);
    return newUser;
}

function updateUser(id, data) {
    const user = users.find(u => u.id === id);
    if (!user) return null;

    Object.assign(user, data);
    return user;
}

function deleteUser(id) {
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return null;

    const deleted = users.splice(index, 1);
    return deleted[0];
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
