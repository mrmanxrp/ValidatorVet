import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "../lib/queryClient";
import HoldingCard from "../components/HoldingCard";
import AddHoldingDialog from "../components/AddHoldingDialog";
import { Button } from "../components/ui/button";
import { PlusCircle } from "lucide-react";

interface Holding {
  id: string;
  token_name: string;
  token_symbol: string;
  purchase_price: string;
  current_price: string;
  amount: string;
  created_at: string;
  updated_at: string;
}

export default function Dashboard() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const { data: holdings = [], isLoading } = useQuery<Holding[]>({
    queryKey: ["/api/holdings"],
  });

  const deleteHoldingMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/holdings/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/holdings"] });
    },
  });

  const totalValue = holdings.reduce((sum, h) => {
    return sum + parseFloat(h.current_price) * parseFloat(h.amount);
  }, 0);

  const totalInvested = holdings.reduce((sum, h) => {
    return sum + parseFloat(h.purchase_price) * parseFloat(h.amount);
  }, 0);

  const totalProfitLoss = totalValue - totalInvested;
  const totalProfitLossPercent = totalInvested > 0
    ? ((totalProfitLoss / totalInvested) * 100)
    : 0;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
          Crypto Exit Planner
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Plan your exits strategically to maximize profits
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Total Portfolio Value</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">
            ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Total Invested</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">
            ${totalInvested.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Profit/Loss</p>
          <p className={`text-3xl font-bold ${totalProfitLoss >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
            ${totalProfitLoss.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className={`text-sm ${totalProfitLoss >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
            {totalProfitLoss >= 0 ? '+' : ''}{totalProfitLossPercent.toFixed(2)}%
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
          Your Holdings
        </h2>
        <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
          <PlusCircle className="w-4 h-4" />
          Add Holding
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-slate-600 dark:text-slate-400">
          Loading holdings...
        </div>
      ) : holdings.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-12 text-center border border-slate-200 dark:border-slate-700">
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            No holdings yet. Add your first crypto holding to start planning your exits.
          </p>
          <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
            <PlusCircle className="w-4 h-4" />
            Add Your First Holding
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {holdings.map((holding) => (
            <HoldingCard
              key={holding.id}
              holding={holding}
              onDelete={() => deleteHoldingMutation.mutate(holding.id)}
            />
          ))}
        </div>
      )}

      <AddHoldingDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />
    </div>
  );
}
