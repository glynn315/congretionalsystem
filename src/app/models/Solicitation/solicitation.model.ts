export interface Solicitation {
    name_solicitor: string,
    purpose: string,
    particular: string,
    amount: number | null,
    reveivedBy: number,
    dateCreated?: Date,
}
