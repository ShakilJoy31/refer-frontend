  import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  referredBy: string;
}

// Function to save token to cookie
export const saveTokenToCookie = (token: string): void => {
  Cookies.set(`token`, token, { 
    expires: 7, // 7 days expiration
    secure: true, 
    sameSite: 'strict',
    path: '/' // Available across the entire site
  });
};



export const getUserInfoFromToken = (): UserInfo | null => {
  const token = Cookies.get('token');
  if (!token) return null;
  
  try {
    const decoded: UserInfo = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};


export const removeTokenFromCookie = (): void => {
  Cookies.remove('token', { 
    path: '/',
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production'
  });
};