import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Category } from './Category';
import { User } from './User';

@Entity()
export class Todo {
	@PrimaryGeneratedColumn({ type: 'int' })
	id: number;

	@Column({ type: 'varchar', length: 100, nullable: false })
	todo: string;

	@Column({ type: 'varchar', length: 300, nullable: true })
	memo: string;

	@Column({ type: 'bool', nullable: false, default: false })
	isFinished: boolean;

	@Column({ nullable: true, type: 'date' })
	progressDate: Date;

	@ManyToOne(() => User, (user) => user.id, {
		onDelete: 'CASCADE',
		nullable: false,
	})
	user: User;

	@ManyToOne(() => Category, (category) => category.id, {
		onDelete: 'CASCADE',
		nullable: false,
	})
	category: Category;
}
