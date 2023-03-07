import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	JoinColumn,
} from 'typeorm';
import { Diary } from './Diary';
import { Todo } from './Todo';

@Entity('user')
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: '200', nullable: false })
	name: string;

	@Column({ type: 'varchar', length: '200', nullable: false, unique: true })
	email: string;

	@Column({ type: 'varchar', length: '200', nullable: false })
	password: string;

	@JoinColumn()
	@OneToMany(() => Diary, (diary) => diary.user)
	diaries: Diary[];

	@JoinColumn()
	@OneToMany(() => Todo, (todo) => todo.user)
	todos: Todo[];
}
