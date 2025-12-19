"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { CreditTable } from "./CreditTable";
import { CreditResponse } from "./credit.type";

const MOCK_DATA: CreditResponse = {
  senderList: [
    {
      id: "1",
      senderId: "a",
      recipientId: "b",
      amount: "100",
      createdAt: "2025-12-18T09:57:34.025Z",
      recipient: { name: "Ali", email: "ali@gmail.com" },
    },
    {
      id: "2",
      senderId: "a",
      recipientId: "b",
      amount: "100",
      createdAt: "2025-12-18T09:57:34.025Z",
      recipient: { name: "Ali", email: "ali@gmail.com" },
    },
    {
      id: "3",
      senderId: "a",
      recipientId: "b",
      amount: "100",
      createdAt: "2025-12-18T09:57:34.025Z",
      recipient: { name: "Ali", email: "ali@gmail.com" },
    },
  ],
  recipientList: [
    {
      id: "1",
      senderId: "a",
      recipientId: "b",
      amount: "100",
      createdAt: "2025-12-18T09:57:34.025Z",
      sender: { name: "Ali", email: "ali@gmail.com" },
    },
    {
      id: "2",
      senderId: "a",
      recipientId: "b",
      amount: "100",
      createdAt: "2025-12-18T09:57:34.025Z",
      sender: { name: "Ali", email: "ali@gmail.com" },
    },
    {
      id: "3",
      senderId: "a",
      recipientId: "b",
      amount: "100",
      createdAt: "2025-12-18T09:57:34.025Z",
      sender: { name: "Ali", email: "ali@gmail.com" },
    },
  ],
};

export function CreditTabs() {
  return (
    <Tabs defaultValue="sent">
      <TabsList>
        <TabsTrigger value="sent">Sent</TabsTrigger>
        <TabsTrigger value="received">Received</TabsTrigger>
      </TabsList>

      <TabsContent value="sent">
        <CreditTable
          title="Sent Credits"
          data={MOCK_DATA.senderList}
          emptyText="No credits sent yet."
          showUser="recipient"
        />
      </TabsContent>

      <TabsContent value="received">
        <CreditTable
          title="Received Credits"
          data={MOCK_DATA.recipientList}
          emptyText="No credits received yet."
          showUser="sender"
        />
      </TabsContent>
    </Tabs>
  );
}
