export interface Firmware {
    version ?: string;
    model: string;
    tag: string;
    md5sum ?: string;
    base64 ?: any;
    release_notes: string;
    previous_version: string;
    id ?: number;
    createdAt ?: Date;
    updatedAt ?: Date;
}
