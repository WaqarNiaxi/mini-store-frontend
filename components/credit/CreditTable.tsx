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
import { CreditTransfer } from "./credit.type";

type Props = {
  title: string;
  data: CreditTransfer[];
  emptyText: string;
  showUser: "sender" | "recipient";
};

export function CreditTable({
  title,
  data,
  emptyText,
  showUser,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent>
        {data.length === 0 ? (
          <p className="p-6 text-sm text-muted-foreground text-center">
            {emptyText}
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.map((item) => {
                const user =
                  showUser === "sender" ? item.sender : item.recipient;

                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      {user ? (
                        <div className="text-sm">
                          <p className="font-medium">{user.name}</p>
                          <p className="text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      ) : (
                        "—"
                      )}
                    </TableCell>

                    <TableCell>
                      <Badge variant="secondary">${item.amount}</Badge>
                    </TableCell>

                    <TableCell>
                      {new Date(item.createdAt).toLocaleDateString()}
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
