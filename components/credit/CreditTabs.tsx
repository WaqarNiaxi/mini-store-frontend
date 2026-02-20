"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { CreditTable } from "./CreditTable";
// import { CreditResponse } from "./credit.type";
import { Loader } from "../common/loader";
import { useCreatedTransactionQuery } from "@/app/hooks/queries/creditTransaction/useCreditQuery";



export function CreditTabs() {

  const { data, isLoading, isError } = useCreatedTransactionQuery();
  
    if (isLoading) {
      return <Loader/>;
    }
  
    if (isError) {
      return <p className="text-red-500 text-center py-10">Failed to load products.</p>;
    }

  return (
    <Tabs defaultValue="sent">
      <TabsList>
        <TabsTrigger value="sent">Sent</TabsTrigger>
        <TabsTrigger value="received">Received</TabsTrigger>
      </TabsList>

      <TabsContent value="sent">
        <CreditTable
          title="Sent Credits"
          data={data?.senderList || []}
          emptyText="No credits sent yet."
          showUser="recipient"
        />
      </TabsContent>

      <TabsContent value="received">
        <CreditTable
          title="Received Credits"
          data={data?.recipientList || []}
          emptyText="No credits received yet."
          showUser="sender"
        />
      </TabsContent>
    </Tabs>
  );
}
