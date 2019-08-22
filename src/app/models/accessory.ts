export interface Accessory {
    id: number;
    serialno: string;
    model: string;
    issued: boolean;
    attachmentHistory: string;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
    deviceId: number;
}
