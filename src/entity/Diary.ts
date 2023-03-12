import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Diary {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: '100', nullable: false })
	title: string;

	@Column({ type: 'varchar', length: '1000', nullable: false })
	content: string;

	@Column({ type: 'datetime', nullable: false, default: 'current timestamp' })
	date: Date;

	@ManyToOne(() => User, (user) => user.diaries, {
		nullable: false,
		onDelete: 'CASCADE',
	})
	user: User;
}
