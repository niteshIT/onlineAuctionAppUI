

export interface Product {

  id: number;
  name: string;
  description: string;
  startingPrice: number;
  auctionDuration: number;
  category: string;
  reservedPrice: number;
  endTime: string;
  highestBid?: number;
  boughtBy?: number;
  highestBidderId?: number;
  sellerId?: number
}


export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string; // 'admin' or 'user'
  isBaned: boolean
}


export interface Bid {
  id: number;
  productId: number;
  bidderId: number;
  bidAmount: number;
  bidTime: string;
}
