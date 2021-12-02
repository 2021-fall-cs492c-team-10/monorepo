import { ClassroomHash, DateNumber } from './common';

export namespace SocketNotification {
  export namespace Events {
    export interface Request {
      'notification/Read': (params: SocketNotification.Request.Read) => void;
    }

    export interface Response {
      'notification/Read': (params: SocketNotification.Response.Read) => void;
      'notification/ReceiveBroadcast': (params: SocketNotification.Response.ReceiveNotification) => void;
    }
  }

  export namespace Request {
    export type Read = ReadRequest;
  }

  export namespace Response {
    export type Read = ReadResponse;
  }

  export namespace Broadcast {
    export type ReceiveNotification = ReceiveBroadcast;
  }

  /* Whenever notification has been read */
  export interface ReadRequest {
    notificationId: string;
  }
  export type ReadResponse =
    | ReadGrantedResponse
    | ReadDeniedResponse;
  export interface ReadGrantedResponse {
    success: true;
    reason: string;
    ReceiveBroadcast
  }
  export interface ReadDeniedResponse {
    success: false;
    reason: typeof ReadDeniedReason[keyof typeof ReadDeniedReason];
  }
  export const ReadDeniedReason = {
    UNAUTHORIZED: -1 as -1,
  };
  export function readDeniedReasonAsMessage(
    reason: typeof ReadDeniedReason[keyof typeof ReadDeniedReason],
  ): string {
    return {
      [ReadDeniedReason.UNAUTHORIZED]: '현재 로그아웃 상태입니다.',
    }[reason];
  }

  /* Be broadcasted and subscribe voice chat state changes */
  export type ReceiveBroadcast =
    | ReceiveSuccessBroadcast
    | ReceiveFailedBroadcast;
  export interface ReceiveSuccessBroadcast {
    notificationId: string;
    notificationObject: NotificationObject;
  }
  export interface ReceiveFailedBroadcast {
    notificationId: string;
    reason: typeof ReceiveFailReason[keyof typeof ReceiveFailReason];
  }
  export const ReceiveFailReason = {
    UNAUTHORIZED: -1 as -1,
  };
  export function receiveFailedReasonAsMessage(
    reason: typeof ReceiveFailReason[keyof typeof ReceiveFailReason],
  ): string {
    return {
      [ReceiveFailReason.UNAUTHORIZED]: '현재 로그아웃 상태입니다.',
    }[reason];
  }

  export interface NotificationObject {
    hash: ClassroomHash;
    sentAt: DateNumber;
    content: string;
  }
}
