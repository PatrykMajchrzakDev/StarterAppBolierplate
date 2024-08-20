// This component functionality is to get url from backend
// and provide url to redirect user to stripe checkout

import { api } from "@/lib/api-client";

// A function to construct the URL with the necessary parameters for redirection
export const getRedirectLinkToCheckout = (
  linkToCheckout: string,
  userId: string
): Promise<string | any> => {
  const urlWithParams = `${linkToCheckout}&userId=${userId}`;
  return api.get<string>(urlWithParams);
};
