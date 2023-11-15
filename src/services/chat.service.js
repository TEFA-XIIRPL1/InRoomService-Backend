const { prisma } = require('../configs/prisma.config');
// const { errorResponse, successResponse } = require('../utils/helper.util');

function setupChat(io) {
  io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('join', (room) => {
      socket.join(room);
    });
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on('chat message', async (data) => {
      const { room, message } = data;

      await prisma.message.create({
        data: {
          user: 'mamat',
          message,
          room,
        },
      });

      io.to(room).emit('chat message', { user: 'mamat', message });
    });
  });
}

module.exports = { setupChat };
