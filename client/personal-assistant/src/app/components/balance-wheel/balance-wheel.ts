export class BalanceWheel {
  date: string;
  id?: string;
  sectors: Array<{
    name: string;
    value: number;
  }>;
}