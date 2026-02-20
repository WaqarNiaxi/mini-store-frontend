import {api} from "./api"
import { userType } from "./user.service";

export interface WalletType {
  id: number;
  balance: number;
  user:userType
}

export async function fetchWallet(): Promise<WalletType> {
  const res = await api.get(`/wallet`);
  if (res.status!=200) {
    throw new Error("Failed to fetch wallet");
  }

  return res.data;
}
