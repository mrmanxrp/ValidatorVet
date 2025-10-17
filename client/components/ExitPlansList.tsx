import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../lib/queryClient";
import { Button } from "./ui/button";
import { Trash2, CheckCircle2, Circle, DollarSign } from "lucide-react";

interface ExitPlan {
  id: string;
  holding_id: string;
  target_price: string;
  sell_percentage: string;
  notes: string | null;
  is_executed: boolean;
  executed_at: string | null;
  created_at: string;
}

interface Holding {
  id: string;
  amount: string;
  current_price: string;
}

interface ExitPlansListProps {
  exitPlans: ExitPlan[];
  holding: Holding;
}

export default function ExitPlansList({ exitPlans, holding }: ExitPlansListProps) {
  const deleteExitPlanMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/exit-plans/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/exit-plans/${holding.id}`] });
    },
  });

  const toggleExecutedMutation = useMutation({
    mutationFn: async ({ id, isExecuted }: { id: string; isExecuted: boolean }) => {
      const exitPlan = exitPlans.find(ep => ep.id === id);
      if (!exitPlan) throw new Error("Exit plan not found");

      const response = await fetch(`/api/exit-plans/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetPrice: exitPlan.target_price,
          sellPercentage: exitPlan.sell_percentage,
          notes: exitPlan.notes,
          isExecuted: !isExecuted,
        }),
      });
      if (!response.ok) throw new Error("Failed to update");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/exit-plans/${holding.id}`] });
    },
  });

  if (exitPlans.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 rounded-lg">
        <p>No exit plans yet. Add one to start planning your strategy.</p>
      </div>
    );
  }

  const currentPrice = parseFloat(holding.current_price);
  const totalAmount = parseFloat(holding.amount);

  return (
    <div className="space-y-3">
      {exitPlans.map((plan) => {
        const targetPrice = parseFloat(plan.target_price);
        const sellPercentage = parseFloat(plan.sell_percentage);
        const sellAmount = (totalAmount * sellPercentage) / 100;
        const valueAtTarget = sellAmount * targetPrice;
        const priceChange = ((targetPrice - currentPrice) / currentPrice) * 100;
        const isTargetReached = currentPrice >= targetPrice;

        return (
          <div
            key={plan.id}
            className={`p-4 rounded-lg border transition-all ${
              plan.is_executed
                ? 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600 opacity-75'
                : isTargetReached
                ? 'bg-emerald-50 dark:bg-emerald-950 border-emerald-300 dark:border-emerald-700'
                : 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600'
            }`}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-start gap-3 flex-1">
                <button
                  onClick={() => toggleExecutedMutation.mutate({ id: plan.id, isExecuted: plan.is_executed })}
                  className="mt-1"
                >
                  {plan.is_executed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-400" />
                  )}
                </button>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                    <span className="font-semibold text-slate-900 dark:text-white">
                      ${targetPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span className={`text-sm font-medium ${priceChange >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      ({priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%)
                    </span>
                    {isTargetReached && !plan.is_executed && (
                      <span className="text-xs bg-emerald-600 text-white px-2 py-0.5 rounded-full font-medium">
                        TARGET REACHED
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-600 dark:text-slate-400">Sell: </span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        {sellPercentage}% ({sellAmount.toLocaleString(undefined, { maximumFractionDigits: 8 })} tokens)
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-600 dark:text-slate-400">Value at Target: </span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        ${valueAtTarget.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                  {plan.notes && (
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 italic">
                      {plan.notes}
                    </p>
                  )}
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteExitPlanMutation.mutate(plan.id)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
