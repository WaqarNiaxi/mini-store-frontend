"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default function WalletPage() {
  const user = {
    name: "Waqar",
    email: "waqar@example.com",
    balance: 1250.75,
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-12 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        Wallet
      </h1>

      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="flex-1">
            <CardTitle className="text-lg">{user.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>

          <div className="text-right">
            <p className="text-sm text-muted-foreground">Balance</p>
            <p className="text-2xl font-bold text-primary">
              ${user.balance.toFixed(2)}
            </p>
          </div>
        </CardHeader>
      </Card>
    </section>
  );
}
