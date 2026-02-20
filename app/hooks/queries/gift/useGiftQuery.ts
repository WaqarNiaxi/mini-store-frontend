"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { CreateGiftPayload, GiftResType, creategift, fetchGift } from "@/app/services/gift.service"


export function useGiftQuery() {
    return useQuery<GiftResType>({
        queryKey:['gifts'],
        queryFn: fetchGift,
        staleTime: 1000 * 60 * 5
    })
}



export function useCreateCreditTransferMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateGiftPayload) =>
      creategift(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gifts"] });
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
    },
  });
}
