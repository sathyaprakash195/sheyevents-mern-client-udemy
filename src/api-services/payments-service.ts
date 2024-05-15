import axios from "axios";

export const getClientSecret = async (amount: number) => {
  const response = await axios.post("/api/payments/create-payment-intent", {
    amount,
  });
  return response.data;
};
