interface IConfigurationProps {
  appName: string;
  appCode: string;
  baseUrl: string;
}

//////////// BETA VERSION ////////////

export const appConfiguration: IConfigurationProps = {
  appName: "Refer",
  appCode: "__t_beta__",
  baseUrl:"https://refer-server.onrender.com/api/v1/filesure-assignment",
};



// I am fetching the book data from public/products.json file to make the user purchase the book 

// Development Url.........
// http://localhost:3000

// Production Url........
// https://refer-frontend-nu.vercel.app
export const baseUrl = 'https://refer-frontend-nu.vercel.app';