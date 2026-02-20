import { SendCreditCard } from "@/components/credit/SendCreditCard";
import { CreditTabs } from "@/components/credit/CreditTabs";

export default function CreditPage() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12 space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Credit</h1>

      <SendCreditCard />

      <CreditTabs />
    </section>
  );
}
