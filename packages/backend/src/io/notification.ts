import { SocketNotification } from '@team-10/lib';
import { Server as IOServer } from 'socket.io';

import Server from '../server';
import { UserSocket } from '../types/socket';

const ioNotificationHandler = (
  io: IOServer<SocketNotification.Events.Request, SocketNotification.Events.Response>,
  server: Server,
) => {
  type Socket = UserSocket<SocketNotification.Events.Request, SocketNotification.Events.Response>;

  io.on('connection', (socket: Socket) => {
    socket.on('notification/Read', async ({ hash, notificationId, notification }) => {
      // 로그인 상태가 아닐 시
      if (!socket.request.user) {
        socket.emit('notification/Read', {
          success: false,
          reason: SocketNotification.ReadDeniedReason.UNAUTHORIZED,
        });
        return;
      }

      // 로그인한 유저이면 수락
      if (socket.request.user) {
        socket.emit('notification/Read', {
          success: true,
        });
        server.managers.user.broadcast('notification/ReceiveBroadcast', {
          hash,
          sentAt: Date.now(),
        });
        // Main socket으로 업데이트
        server.managers.user.makeSocketMain(, socket.id);
        return;
      }
  });
  };
};

export default ioNotificationHandler;
