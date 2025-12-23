import { api } from "./api";

 export type GiftListType = {
  id: string;
  productId: string;
  senderId: string;
  recipientId: string;
  createdAt: string;
  product: GiftProduct;
  sender?: GiftUser;
  recipient?: GiftUser;
};

type GiftProduct = {
  title: string;
  price: string;
  thumbnail: string;
};

type GiftUser = {
  name: string;
  email: string;
};

export type GiftResType={
    senderList: GiftListType[];
    recipientList: GiftListType[];
}



export async function fetchGift():Promise<GiftResType>{
    const res= await api.get(`/gift`)
if (res.status!=200) {
    throw new Error("Failed to fetch products");
  }
  return res.data;
}







export type CreateGiftPayload = {
  recipientId: string;
  productId: string;
};

export async function creategift(
  payload: CreateGiftPayload
) {
  const res = await api.post(`/gift`, payload);

  if (res.status !== 200 && res.status !== 201 && res.status !== 400) {
    throw new Error("Failed to create gift transfer");
  }

  return res.data;
}
