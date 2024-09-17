import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Schedule } from "./Schedule";


@Entity({ name: 'buses' })
export class Bus
{
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @Column({ name: 'user_id' })
    user_id: number

    @Column()
    bus_number: number

    //@Column({ type: 'varchar', length: 300 })
    //bus_numbe: number

    @Column({ unique: true })
    bus_plate_number: string

    @Column({ type: 'bigint' })
    bus_type: number

    @Column({ type: 'bigint' })
    capacity: number

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', nullable: false })
    public created_at: Date

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    public updated_at: Date

    @ManyToOne(() => User, (user) => user.buses, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User

    @OneToMany(() => Schedule, (schedule) => schedule.bus)
    schedules: Schedule[]
}
