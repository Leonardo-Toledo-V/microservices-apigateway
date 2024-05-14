import { v4 as uuidv4 } from 'uuid';

interface Status{
    status: 'paid' | 'created' | 'sent';
}

export class Order {
    public uuid: string;
    public total: number;
    public date: Date;
    public status: Status;

    constructor(total: number, status: Status) {
        this.uuid = uuidv4();
        this.total = total;
        this.date = new Date();
        this.status = status;
    }
}