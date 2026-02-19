export type Auction = {
  auctionId: number;
  title: string;
  description: string;
  imageUrl: string;
  startPrice: number;
  highestBid: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  userId: number;
};
