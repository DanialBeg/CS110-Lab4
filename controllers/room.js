// Controller handler to handle functionality in room page
const Chat = require('../models/Chat');
const roomGenerator = require('../util/roomIdGenerator.js');

// Example for handle a get request at '/:roomName' endpoint.
function getChat(request, response){
    Chat.find({room: request.params.roomName}).lean().then(items =>{
        response.render('room', {title: 'chatroom', chats: items, roomName: request.params.roomName, newRoomId: roomGenerator.roomIdGenerator(), isAvailable: true});
    });
}

module.exports = {
    getChat
};