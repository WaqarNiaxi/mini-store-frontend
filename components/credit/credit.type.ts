export type CreditUser = {
  name: string;
  email: string;
};

export type CreditTransfer = {
  id: string;
  senderId: string;
  recipientId: string;
  amount: string;
  createdAt: string;
  sender?: CreditUser;
  recipient?: CreditUser;
};

export type CreditResponse = {
  senderList: CreditTransfer[];
  recipientList: CreditTransfer[];
};
