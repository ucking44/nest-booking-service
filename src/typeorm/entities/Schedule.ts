import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Bus } from "./Bus";
import { Driver } from "./Driver";
import { Booking } from "./Booking";

@Entity({ name: 'schedules' })
export class Schedule
{
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @Column({ name: 'user_id', type: 'bigint' })
    user_id: number

    @Column({ name: 'bus_id', type: 'bigint' })
    bus_id: number

    @Column({ name: 'driver_id', type: 'bigint' })
    driver_id: number

    @Column({ type: 'varchar', length: 300 })
    starting_point: string

    @Column({ type: 'varchar', length: 300 })
    destination: string

    @Column({ type: 'date' })
    schedule_date: Date

    @Column({ type: 'time' })
    departure_time: string

    @Column({ type: 'time' })
    estimated_arrival_time: string

    @Column({ type: 'float' })
    fare_amount: number

    @Column({ type: 'varchar' })
    remarks: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false })
    created_at: Date

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
    updated_at: Date

    @ManyToOne(() => User, (user) => user.schedules, { eager: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User

    @ManyToOne(() => Bus, (bus) => bus.schedules, { eager: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'bus_id' })
    bus: Bus

    @ManyToOne(() => Driver, (driver) => driver.schedules, { eager: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'driver_id'})
    driver: Driver

    @OneToMany(() => Booking, (booking) => booking.schedule)
    bookings: Booking[]
}
