export type CreateBookingParams = {
    
    user_id: number

    schedule_id: number

    customer_id: number

    number_of_seats: number

    fare_amount: number

    total_amount: number

    date_of_booking: Date

    booking_status: number
}

export type UpdateBookingParams = {
    
    user_id: number

    schedule_id: number

    customer_id: number

    number_of_seats: number

    fare_amount: number

    total_amount: number

    date_of_booking: Date

    booking_status: number
}
