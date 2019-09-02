export interface Beneficiary {
    id: number;
    firstname: string;
    middlename: string;
    lastname: string;
    phone: string;
    idnumber: string;
    county: string;
    status: boolean;
    cardnumber: string;
    programvalidity: Date;
    createdAt: Date;
    updatedAt: Date;
}
