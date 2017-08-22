export class Order {

    id: string;
    companyName: string;
    customerAddress: string;
    orderedItem: string;

    constructor() {
        this.companyName = '';
        this.customerAddress = '';
    }
}
