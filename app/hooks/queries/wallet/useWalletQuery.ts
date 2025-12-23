"use client"

import { fetchWallet, WalletType } from "@/app/services/wallet.services"
import { useQuery } from "@tanstack/react-query"


export function useWalletQuery(){
    return useQuery<WalletType>({
        queryKey:["wallet"],
        queryFn: fetchWallet,
        staleTime: 1000*60*5,
    })
}