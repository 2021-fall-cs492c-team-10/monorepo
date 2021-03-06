/* eslint-disable max-classes-per-file */
import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  TableInheritance,
  ManyToOne,
  ChildEntity,
} from 'typeorm';

import Classroom from './classroom';
import UserEntity from './user';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export default class ChatEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  uuid: string;

  @ManyToOne(() => UserEntity, (user) => user.chats, { nullable: true })
  author: UserEntity;

  @Column()
  sentAt: Date;

  @ManyToOne(() => Classroom, (classroom) => classroom.chats, { onDelete: 'CASCADE' })
  classroom: Classroom;
}

@ChildEntity()
export class TextChatEntity extends ChatEntity {
  @Column()
  text: string;
}

@ChildEntity()
export class PhotoChatEntity extends ChatEntity {
  @Column()
  photo: string;

  @Column({ nullable: true })
  alt: string;
}

@ChildEntity()
export class FeedChatEntity extends ChatEntity {
  @Column()
  json: string;
}
