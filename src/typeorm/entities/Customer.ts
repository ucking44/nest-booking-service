import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Booking } from "./Booking";

const name = 'customers'

@Entity({ name: name})
export class Customer
{
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @Column({ name: 'user_id', type: 'bigint' })
    user_id: number

    @Column({ type: 'varchar', length: 300, nullable: false })
    customer_name: string

    @Column({ type: 'varchar', length: 300 })
    customer_contact: string

    @Column({ type: 'varchar', length: 300, nullable: false, unique: true })
    customer_email: string

    @Column({ unique: true })
    username: string

    @Column()
    password: string

    @Column({ type: 'int' })
    account_status: number

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false })
    created_at: Date

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
    updated_at: Date

    @ManyToOne(() => User, (user) => user.customers, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User

    @OneToMany(() => Booking, (booking) => booking.customer)
    bookings: Booking[]
}
