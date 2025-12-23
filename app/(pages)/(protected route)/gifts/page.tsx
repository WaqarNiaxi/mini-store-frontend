"use client";

import Image from "next/image";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useGiftQuery } from "@/app/hooks/queries/gift/useGiftQuery";
import { Loader } from "lucide-react";
import { GiftListType } from "@/app/services/gift.service";


type GiftTableProps = {
  title: string;
  gifts: GiftListType[];
  emptyText: string;
  showUser?: "sender" | "recipient";
};


export default function GiftsPage() {

    const {data:giftsData,isLoading,isError}=useGiftQuery();
   if (isLoading) {
      return <Loader/>;
    }
  
    if (isError) {
      return <p className="text-red-500 text-center py-10">Failed to load Gift.</p>;
    }

  return (
    <section className="max-w-6xl mx-auto px-4 py-12 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Gifts</h1>
      <Tabs defaultValue="sent" className="w-full">
        <TabsList>
          <TabsTrigger value="sent">Sent Gifts</TabsTrigger>
          <TabsTrigger value="received">Received Gifts</TabsTrigger>
        </TabsList>

       {/* send gift */}
        <TabsContent value="sent">
          <GiftTable
            title="Sent Gifts"
            emptyText="You haven’t sent any gifts yet."
            gifts={giftsData?.senderList||[]}
            showUser="recipient"
          />
        </TabsContent>

        {/* recieve gift */}
        <TabsContent value="received">
          <GiftTable
            title="Received Gifts"
            emptyText="No gifts received yet."
            gifts={giftsData?.recipientList ||[]}
            showUser="sender"
          />
        </TabsContent>
      </Tabs>
    </section>
  );
}



function GiftTable({
  title,
  gifts,
  emptyText,
  showUser,
}: GiftTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        {gifts.length === 0 ? (
          <p className="p-6 text-sm text-muted-foreground text-center">
            {emptyText}
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                {showUser && <TableHead>User</TableHead>}
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {gifts.map((gift) => {
                const user =
                  showUser === "recipient"
                    ? gift.recipient
                    : gift.sender;

                return (
                  <TableRow key={gift.id}>
                    <TableCell className="flex items-center gap-3">
                      <Image
                        src={gift.product.thumbnail}
                        alt={gift.product.title}
                        width={40}
                        height={40}
                        className="rounded-md border"
                      />
                      <span className="text-sm font-medium">
                        {gift.product.title}
                      </span>
                    </TableCell>

                    <TableCell>
                      <Badge variant="secondary">
                        ${gift.product.price}
                      </Badge>
                    </TableCell>

                    {showUser && (
                      <TableCell>
                        {user ? (
                          <div className="text-sm">
                            <p className="font-medium">{user.name}</p>
                            <p className="text-muted-foreground">
                              {user.email}
                            </p>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                    )}

                    <TableCell>
                      {new Date(gift.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
