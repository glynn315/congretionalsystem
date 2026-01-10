export interface Solicitation {
    name_solicitor: string,
    purpose: string,
    particular: string,
    amount: number | null,
    date_event?: Date | null,
    reveivedBy: number,
    dateCreated?: Date,
}
