export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface UserData {
  isPurchased?: boolean;
  id: string;
  name: string;
  email: string;
  referredBy?: string;
  myRefers?: string[];
}

export interface UpdateUserData {
  name?: string;
  email?: string;
}
