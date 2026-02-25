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
  ownerName: string;
};

export type AuctionForm = {
  title: string;
  description: string;
  startPrice: string;
  imageUrl: string;
  isCreate: boolean;
  auctionId?: number;
  hasBids?: boolean;
};
