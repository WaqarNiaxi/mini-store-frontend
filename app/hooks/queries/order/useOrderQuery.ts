"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createOrder, fetchOrder, OrderCreateType, orderType } from "@/app/services/order.service";

export function useOrderQuery() {
  return useQuery<orderType[]>({
    queryKey: ["order"],
    queryFn: fetchOrder,
    staleTime: 1000 * 60 * 5,
  });
}



export function useOrderCreateMutation(){
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn:(payload:OrderCreateType)=>
      createOrder(payload),

    onSuccess:()=>{
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
      queryClient.invalidateQueries({ queryKey: ["order"] });
    }
  })
}