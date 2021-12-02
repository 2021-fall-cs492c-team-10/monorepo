import { SocketChat } from '@team-10/lib';
import { Server as IOServer } from 'socket.io';
import { CannotAttachTreeChildrenEntityError } from 'typeorm';

import Server from '../server';
import { UserSocket } from '../types/socket';

const ioVoiceHandler = (
  io: IOServer<SocketChat.Events.Request, SocketChat.Events.Response>,
  server: Server,
) => {
  type Socket = UserSocket<SocketChat.Events.Request, SocketChat.Events.Response>;

  io.on('connection', (socket: Socket) => {
    socket.on('chat/Send', async ({ hash, speaking }) => {
      // 로그인 상태가 아닐 시
      if (!socket.request.user) {
        socket.emit('chat/Send', {
          success: false,
          reason: SocketChat.SendDeniedReason.UNAUTHORIZED,
        });
        return;
      }

      // 없는 수업일 때
      if (!await server.managers.classroom.isPresent(hash)) {
        socket.emit('chat/Send', {
          success: false,
          reason: SocketChat.SendDeniedReason.NOT_MEMBER,
        });
        return;
      }

      // 유저가 교실에 들어있지 않을 때
      const userId: string = socket.request.user.stringId;
      const classroom = server.managers.classroom.getRaw(hash)!;

      if (!classroom.hasMember(userId)) {
        socket.emit('chat/Send', {
          success: false,
          reason: SocketChat.SendDeniedReason.NOT_MEMBER,
        });
        return;
      }

      // 요청 수락
      socket.emit('chat/Send', {
        success: true,
      });
    });

    socket.on('chat/ReceiveBroadcast', async ({ hash, message }) => {
      const classroom = server.managers.classroom.getRaw(hash)!;
      const chatId: string = chatId; //TO DO

      classroom.broadcastMainExcept('chat/ReceiveBroadcast', [chatId], {
        chatId,
        message,
      });
    });
  });
};

export default ioVoiceHandler;
