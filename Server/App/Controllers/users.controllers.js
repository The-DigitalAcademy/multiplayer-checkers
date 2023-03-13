const users = [];

const addUser = (id, name) => {
    const user = {
        id: id,
        name: name,
        room: "",
    }

    users.push(user);

    return { user };
}

const getUser = (id) => {
    return users.find((user) => user.id === id);
}

const getUsersInRoom = (room) => {
    return users.filter((user) => user.room === room);
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if(index !== -1) {
        return users.splice(index, 1)[0];
    }
}

const createRoom = (id, roomName) => {
    var roomOwner = users.filter((user) => user.room === roomName);

    if(roomOwner === undefined || roomOwner.length === 0){
        var user = users.find((user) => user.id === id);
        user.room = roomName;
        return user;
    } else {
        return false;
    }
    
}

const joinRoom = (id, roomName) => {
    var user = users.find((user) => user.id === id);
    user.room = roomName;

    return user;
}

const leaveRoom = (id) => {
    var foundIndex = users.findIndex(x => x.id === id);
    users[foundIndex].room = "";
}

const logUsers = () => {
    console.log(users);
}

module.exports = { addUser, createRoom, joinRoom, leaveRoom, getUser, removeUser, getUsersInRoom, logUsers}