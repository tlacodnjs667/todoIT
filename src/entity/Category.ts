import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Todo } from './Todo';
import { User } from './User';

@Entity({ name: 'category' })
export class Category {
	@PrimaryGeneratedColumn({ type: 'int' })
	id: number;

	@Column({ type: 'varchar', nullable: false })
	name: string;

	@Column({ type: 'bool', nullable: false, default: false })
	isDefault: boolean;

	@ManyToOne(() => User, (user) => user.id, {
		onDelete: 'CASCADE',
		nullable: false,
	})
	user: User;

	@JoinColumn()
	@OneToMany(() => Todo, (todo) => todo.category)
	todo: Todo[];
}
