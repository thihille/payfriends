export interface IPaymentAccount {
  id?: number;
  name: string;
  amount: number;
  debit_date: string;
  category?: string;
  paid: boolean;
  user: string;
  disabled?: boolean;
}
