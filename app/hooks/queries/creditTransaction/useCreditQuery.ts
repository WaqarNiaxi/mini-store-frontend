import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCreditTransfer,
  CreateCreditTransferPayload,
  CreditTransactionType,
  fetchCreditTransaction,
} from "@/app/services/creditTransfer.service";

// Fetch Tansaction
export function useCreatedTransactionQuery() {
  return useQuery<CreditTransactionType>({
    queryKey: ["creditTransaction"],
    queryFn: fetchCreditTransaction,
    staleTime: 1000 * 60 * 5,
  });
}

// create transaction
export function useCreateCreditTransferMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateCreditTransferPayload) =>
      createCreditTransfer(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["creditTransaction"] });
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
    },
  });
}
