import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Schedule } from "./Schedule";
import { Customer } from "./Customer";
import { Payment } from "./Payment";

const name = 'bookings'

@Entity({ name: name })
export class Booking
{
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @Column({ name: 'user_id', type: 'bigint' })
    user_id: number

    @Column({ name: 'schedule_id', type: 'bigint' })
    schedule_id: number

    @Column({ name: 'customer_id', type: 'bigint' })
    customer_id: number

    @Column()
    number_of_seats: number

    @Column({ type: 'double' })
    fare_amount: number

    @Column({ type: 'double' })
    total_amount: number

    @Column({ type: 'date' })
    date_of_booking: Date

    @Column({ type: 'int', default: 0 })
    booking_status: number

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false })
    created_at: Date

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
    updated_at: Date

    @ManyToOne(() => User, (user) => user.bookings, { eager: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User

    @ManyToOne(() => Schedule, (schedule) => schedule.bookings, { eager: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'schedule_id' })
    schedule: Schedule

    @ManyToOne(() => Customer, (customer) => customer.bookings, { eager: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'customer_id' })
    customer: Customer

    @OneToMany(() => Payment, (payment) => payment.booking)
    payments: Payment[]

}
