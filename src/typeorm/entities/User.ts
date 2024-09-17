import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Bus } from "./Bus";
import { Driver } from "./Driver";
import { Schedule } from "./Schedule";
import { Customer } from "./Customer";
import { Booking } from "./Booking";
import { Payment } from "./Payment";

@Entity({ name: 'users' })
export class User
{
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column()
    full_name: string;

    @Column({ unique: true })
    contact_no: string;

    @Column({ unique: true })
    email_address: string;

    @Column({ unique: true })
    username: string;

    @Column()
    userpassword: string;

    @Column({ type: 'bigint', nullable: true })
    account_category: number;

    @Column({ type: 'bigint', nullable: true })
    account_status: number;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date;

    @Column()
    updated_at: Date;

    @OneToMany(() => Bus, bus => bus.user)
    buses: Bus[]

    @OneToMany(() => Driver, (driver) => driver.user)
    drivers: Driver[]

    @OneToMany(() => Schedule, (schedule) => schedule.user)
    schedules: Schedule[]

    @OneToMany(() => Customer, (customer) => customer.user)
    customers: Customer[]

    @OneToMany(() => Booking, (booking) => booking.user)
    bookings: Booking[]

    @OneToMany(() => Payment, (payment) => payment.user)
    payments: Payment[]
}
