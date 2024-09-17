export type CreateUserParams = {
    full_name: string;

    contact_no: string;

    email_address: string;

    username: string;

    userpassword: string;

    account_category: number;

    account_status: number;

    created_at?: Date;

    updated_at?: Date;
}

export type UpdateUserParams = {
    full_name: string;

    contact_no: string;

    email_address: string;

    username: string;

    userpassword: string;

    account_category: number;

    account_status: number;

    created_at?: Date;

    updated_at?: Date;
}
