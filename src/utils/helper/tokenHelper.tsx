  import Cookies from 'js-cookie';
// import { jwtDecode } from 'jwt-decode';

// Function to save token to cookie
export const saveTokenToCookie = (token: string): void => {
  Cookies.set('token', token, { 
    expires: 7, // 7 days expiration
    secure: true, 
    sameSite: 'strict',
    path: '/' // Available across the entire site
  });
};