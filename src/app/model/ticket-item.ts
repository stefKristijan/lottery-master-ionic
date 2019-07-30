export class TicketItem {
    static readonly TICKET_1 = new TicketItem("1 LotteryMaster Generator TicketItem", 50,1)
    static readonly TICKET_10 = new TicketItem("10 LotteryMaster Generator Tickets", 400, 10)
    static readonly TICKET_20 = new TicketItem("20 LotteryMaster Generator Tickets", 700, 20)
    static readonly TICKET_50 = new TicketItem("50 LotteryMaster Generator Tickets", 1500, 50)
    static readonly TICKET_100 = new TicketItem("100 LotteryMaster Generator Tickets", 2500, 100)

    // private to disallow creating other instances of this type
    private constructor(private description: string, public readonly amount: number, public readonly tickets: number) {
    }

}