import { ClassroomHash, DateNumber } from './common';

export namespace SocketChat {
  export namespace Events {
    export interface Request {
      'chat/Send': (params: SocketChat.Request.Send) => void;
    }

    export interface Response {
    'chat/Send': (params: SocketChat.Request.Send) => void;
    'chat/ReceiveBroadcast': (params: SocketChat.Broadcast.ChatReceive) => void;
    }
  }

  export namespace Request {
    export type Send = SendRequest;
  }

  export namespace Response {
    export type Send = SendResponse;
  }

  export namespace Broadcast {
    export type ChatReceive = ReceiveBroadcast;
  }

  /* Request to send a chat message */
  export interface SendRequest {
    hash: ClassroomHash;
    message: ChatObject;
  }
  export type SendResponse =
    | SendGrantedResponse
    | SendDeniedResponse;
  export interface SendGrantedResponse {
    success: true;
  }
  export interface SendDeniedResponse {
    success: false;
    reason: typeof SendDeniedReason[keyof typeof SendDeniedReason];
  }
  export const SendDeniedReason = {
    UNAUTHORIZED: -1 as -1,
    NOT_MEMBER: -2 as -2,
  };
  export function sendDeniedReasonAsMessage(
    reason: typeof SendDeniedReason[keyof typeof SendDeniedReason],
  ): string {
    return {
      [SendDeniedReason.UNAUTHORIZED]: '현재 로그아웃 상태입니다.',
      [SendDeniedReason.NOT_MEMBER]: '이 수업을 가르치거나 듣는 사람이 아닙니다.',
    }[reason];
  }

  /* Received chat messages */
  export interface ReceiveBroadcast {
    chatId: string;
    message: ChatObject;
  }
  export interface ChatObject {
    userId: string;
    message: string;
    sentAt: DateNumber;
  }
}
