import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Schedule } from "./Schedule";

@Entity({ name: 'drivers' })
export class Driver
{
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @Column({ name: 'user_id', type: 'bigint' })
    user_id: number

    @Column({ unique: true, type: 'varchar', length: 250 })
    driver_name: string

    @Column({ type: 'varchar', length: 250 })
    driver_contact: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false })
    created_at: Date

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
    updated_at: Date

    @ManyToOne(() => User, (user) => user.drivers, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User

    @OneToMany(() => Schedule, (schedule) => schedule.driver)
    schedules: Schedule[]
}
