export interface ReferredUser {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface User {
  isPurchased: boolean;
  id: string;
  name: string;
  email: string;
  referredBy: string;
}

export interface ReferralStats {
  totalConverted: number;
  totalReferrals: number;
  totalEarned: number;
}

export interface IConvertedUser {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
}


export interface DashboardResponse {
  status: string;
  data: {
    convertedUsers: IConvertedUser[];
    user: User;
    referredUsers: ReferredUser[];
    referralStats: ReferralStats;
  };
}
