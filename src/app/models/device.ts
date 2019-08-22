import { Accessory } from './accessory';
export interface Device {
    id: number;
    serialno: string;
    model: string;
    kernel: string;
    group: string;
    firmware: string;
    assigned_firmware: string;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
    agentId: number;
    accessories: Accessory [];
}
