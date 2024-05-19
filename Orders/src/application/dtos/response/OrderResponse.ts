interface Status{
    status: 'paid' | 'created' | 'sent';
}

export class OrderResponse {
    public uuid: string;
    public total: number;
    public date: Date;
    public status: Status;

    constructor(uuid: string, total: number, date: Date, status: Status) {
        this.uuid = uuid;
        this.total = total;
        this.date = date;
        this.status = status;
    }
}