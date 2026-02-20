import { api } from "./api";

  interface ProductType {
    title: string;
  }
  interface ItemType {
    productId:string,
    price:string,
    quantity: number,
    product: ProductType
  }
export interface orderType {
id:string,
totalAmount: string,
createdAt: string,
items: ItemType[]
}


export async function fetchOrder():Promise<orderType[]> {
    const res = await api.get(`/order`)
    if (res.status!=200) {
    throw new Error("Failed to fetch wallet");
  }
  return res.data
}



export type OrderCreateType = {
  productId: string,
  quantity:  number
}

export async function createOrder(payload:OrderCreateType) {
  const res=await api.post("/orderItem",payload);
  if (res.status !== 200 && res.status !== 201 && res.status !== 400) {
    throw new Error("Failed to create credit transfer");
  }

  return res.data;
}