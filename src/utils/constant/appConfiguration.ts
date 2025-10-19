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

// Development Url.........
// http://localhost:3000

// Production Url........
// https://e-commerce-template-olive-seven.vercel.app
export const baseUrl = 'https://e-commerce-template-olive-seven.vercel.app';