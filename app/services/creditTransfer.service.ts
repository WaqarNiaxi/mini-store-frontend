import { api } from "./api";

 export type CreditTransferListType = {
  id: string;
  senderId: string;
  recipientId: string;
  amount: string;
  createdAt: string;
  sender?: User;
  recipient?: User;
};



type User = {
  name: string;
  email: string;
};

export type CreditTransactionType={
    senderList: CreditTransferListType[];
    recipientList: CreditTransferListType[];
}

export async function fetchCreditTransaction():Promise<CreditTransactionType> {
    const res = await api.get(`/creditTransfer`);
  if (res.status!=200) {
    throw new Error("Failed to fetch products");
  }
  return res.data;
}





export type CreateCreditTransferPayload = {
  recipientId: string;
  amount: number;
};

export async function createCreditTransfer(
  payload: CreateCreditTransferPayload
) {
  const res = await api.post(`/creditTransfer`, payload);

  if (res.status !== 200 && res.status !== 201 && res.status !== 400) {
    throw new Error("Failed to create credit transfer");
  }

  return res.data;
}
