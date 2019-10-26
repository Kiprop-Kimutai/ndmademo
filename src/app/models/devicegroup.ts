export interface DeviceGroup {
    name: string;
    model: string;
    firmware: string;
    firmwareHistory: string;
    id ?: number;
    regionId ?: number;
    createdAt ?: Date;
    updatedAt ?: Date;
}
