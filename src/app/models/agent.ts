import { Device } from './device';
export interface Agent {
    id: number;
    tillNumber: string;
    msisdn: string;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
    devices: Device[];
}
