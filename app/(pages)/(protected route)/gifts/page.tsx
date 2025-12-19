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



type GiftProduct = {
  title: string;
  price: string;
  thumbnail: string;
};

type GiftUser = {
  name: string;
  email: string;
};

export type Gift = {
  id: string;
  productId: string;
  senderId: string;
  recipientId: string;
  createdAt: string;
  product: GiftProduct;
  sender?: GiftUser;
  recipient?: GiftUser;
};

type GiftTableProps = {
  title: string;
  gifts: Gift[];
  emptyText: string;
  showUser?: "sender" | "recipient";
};



const giftsData: {
  senderList: Gift[];
  recipientList: Gift[];
} = {
  senderList: [
    {
      id: "0b4f17a1-8734-4108-a7a8-cf851d985de6",
      productId: "1",
      senderId: "THOprup01olqFwLhEANSisMG4cSgeNoD",
      recipientId: "NL062Atjqj474W35PhKPOObrr8OrmGLf",
      createdAt: "2025-12-18T09:39:04.283Z",
      recipient: {
        name: "Ali",
        email: "ali@gmail.com",
      },
      product: {
        title: "Essence Mascara Lash Princess",
        price: "9.99",
        thumbnail:
          "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
      },
    },
  ],
  recipientList: [
    {
      id: "1c9f17a1-8734-4108-a7a8-cf851d985abc",
      productId: "1",
      senderId: "THOprup01olqFwLhEANSisMG4cSgeNoD",
      recipientId: "NL062Atjqj474W35PhKPOObrr8OrmGLf",
      createdAt: "2025-12-18T09:39:04.283Z",
      sender: {
        name: "Ali",
        email: "ali@gmail.com",
      },
      product: {
        title: "Essence Mascara Lash Princess",
        price: "9.99",
        thumbnail:
          "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
      },
    },
  ],
};



export default function GiftsPage() {
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
            gifts={giftsData.senderList}
            showUser="recipient"
          />
        </TabsContent>

        {/* recieve gift */}
        <TabsContent value="received">
          <GiftTable
            title="Received Gifts"
            emptyText="No gifts received yet."
            gifts={giftsData.recipientList}
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
