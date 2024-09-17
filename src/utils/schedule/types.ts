export type CreateScheduleParams = {
    user_id: number

    bus_id: number

    driver_id: number

    starting_point: string

    destination: string

    schedule_date: Date

    departure_time: string

    estimated_arrival_time: string

    fare_amount: number

    remarks: string
}

export type UpdateScheduleParams = {
    user_id: number

    bus_id: number

    driver_id: number

    starting_point: string

    destination: string

    schedule_date: Date

    departure_time: string

    estimated_arrival_time: string

    fare_amount: number

    remarks: string
}

