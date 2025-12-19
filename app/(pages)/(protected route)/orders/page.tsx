"use client";

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
import { Button } from "@/components/ui/button";
import { Fragment, useState } from "react";


type OrderItem = {
  id: string;
  productName: string;
  price: number;
  quantity: number;
};

type Order = {
  id: string;
  totalAmount: number;
  createdAt: string;
  items: OrderItem[];
};

const MOCK_ORDERS: Order[] = [
  {
    id: "ORD-1001",
    totalAmount: 120,
    createdAt: "2025-01-10",
    items: [
      { id: "1", productName: "Shoes", price: 60, quantity: 1 },
      { id: "2", productName: "Cap", price: 30, quantity: 2 },
    ],
  },
  {
    id: "ORD-1002",
    totalAmount: 80,
    createdAt: "2025-01-12",
    items: [{ id: "3", productName: "Bag", price: 80, quantity: 1 }],
  },
];

export default function OrderPage() {
  const [openOrder, setOpenOrder] = useState<string | null>(null);

  return (
    <section className="max-w-6xl mx-auto px-4 py-12 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Orders</h1>

      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {MOCK_ORDERS.map((order) => (
                <Fragment key={order.id}>
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>

                    <TableCell>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>

                    <TableCell>
                      <Badge variant="secondary">${order.totalAmount}</Badge>
                    </TableCell>

                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        className="hover:cursor-pointer"
                        onClick={() =>
                          setOpenOrder(openOrder === order.id ? null : order.id)
                        }
                      >
                        {openOrder === order.id ? "Hide" : "View"}
                      </Button>
                    </TableCell>
                  </TableRow>

                  {/* Order Items */}
                  {openOrder === order.id && (
                    <TableRow className="bg-muted/50">
                      <TableCell colSpan={4}>
                        <div className="space-y-2">
                          {order.items.map((item) => (
                            <div
                              key={item.id}
                              className="flex justify-between text-sm"
                            >
                              <span>
                                {item.productName} × {item.quantity}
                              </span>
                              <span className="font-medium">
                                ${item.price * item.quantity}
                              </span>
                            </div>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
}
