import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Booking } from "./Booking";

const name = 'payments'

@Entity({ name: name })
export class Payment
{
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @Column({ name: 'user_id', type: 'bigint' })
    user_id:number

    @Column({ name: 'booking_id', type: 'bigint' })
    booking_id: number

    @Column({ type: 'double' })
    amount_paid: number

    @Column({ type: 'date' })
    payment_date: Date

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false })
    created_at: Date

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
    updated_at: Date

    @ManyToOne(() => User, (user) => user.payments, { eager: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User

    @ManyToOne(() => Booking, (booking) => booking.payments, { eager: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'booking_id' })
    booking: Booking
}
