export class Payment {
    categoryId : number;
    memberId : number;
    groupId : number;
    paymentDate : string;
    paymentType : string;
    amount: number;
    notes : string;

    constructor(cid:number, mid : number, gid : number, paymentDt : string, type: string, amount : number, notes : string){
        this.categoryId = cid;
        this.memberId = mid;
        this.groupId = gid;
        this.paymentDate = paymentDt;
        this.paymentType = type;
        this.amount = amount;
        this.notes = notes;
    }
}