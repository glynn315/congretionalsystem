export interface RequestForms {
    request_form_id? : string,
    control_number : number,
    patients_name? : string,
    representative_name? : string,
    address? : string,
    contact_number? : number | null,
    provider_id? : number,
    account_id? : number,
    amount? : number | null,
}
