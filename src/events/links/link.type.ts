// @Column({
//     nullable: true,
//     comment:
//         "If resource_type is mandates, this is the ID of the mandate which has been updated.",
// })
// mandate?: string | null;

// @Column({
//     nullable: true,
//     comment:
//         "This is only included for mandate transfer events, when it is the ID of the customer bank account which the mandate is being transferred to.",
// })
// new_customer_bank_account?: string | null;

// @Column({
//     nullable: true,
//     comment:
//         "This is only included for mandate replaced events, when it is the ID of the new mandate that replaces the existing mandate.",
// })
// new_mandate?: string | null;

// @Column({
//     nullable: true,
//     comment:
//         "If the event is included in a webhook to an OAuth app, this is the ID of the account to which it belongs.",
// })
// organization?: string | null;
export class LinkType {
  mandate?: string | null
  new_customer_bank_account?: string | null
  new_mandate?: string | null
  organization?: string | null
  parent_event?: string | null
  payment?: string | null
  payout?: string | null
  previous_customer_bank_account?: string | null
  refund?: string | null
  subscription?: string | null
}
