export type Bid = {
  id: number;
  bidAmount: number;
  bidDate: string;
  userId: number;
  username?: string | null;
};
