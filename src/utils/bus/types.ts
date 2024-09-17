export type CreateBusParams = {
    user_id: number

    bus_number: number

    bus_plate_number: string

    bus_type?: number

    capacity: number
}

export type UpdateBusParams = {
    user_id: number

    bus_number: number

    bus_plate_number: string

    bus_type: number

    capacity: number
}
