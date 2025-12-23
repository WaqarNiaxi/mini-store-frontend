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
import { useOrderQuery } from "@/app/hooks/queries/order/useOrderQuery";
import { Loader } from "@/components/common/loader";

export default function OrderPage() {
  const [openOrder, setOpenOrder] = useState<string | null>(null);
  const {data,isLoading,isError}=useOrderQuery();
 if (isLoading) {
    return <Loader/>;
  }

  if (isError) {
    return <p className="text-red-500 text-center py-10">Failed to load Order.</p>;
  }

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
              {data?.map((order) => (
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
                              key={item.productId}
                              className="flex justify-between text-sm"
                            >
                              <span>
                                {item.product.title} × {item.quantity}
                              </span>
                              <span className="font-medium">
                                ${Number(item.price) * item.quantity}
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
