export class UpdateStatusRequest {
    public orderId: string;
    public newStatus: 'paid' | 'created' | 'sent';

    constructor(orderId: string, newStatus: 'paid' | 'created' | 'sent') {
        this.orderId = orderId;
        this.newStatus = newStatus;
    }
}
