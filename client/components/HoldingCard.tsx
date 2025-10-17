import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Trash2, TrendingUp, TrendingDown, Target } from "lucide-react";
import ExitPlanDialog from "./ExitPlanDialog";
import ExitPlansList from "./ExitPlansList";

interface Holding {
  id: string;
  token_name: string;
  token_symbol: string;
  purchase_price: string;
  current_price: string;
  amount: string;
}

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

interface HoldingCardProps {
  holding: Holding;
  onDelete: () => void;
}

export default function HoldingCard({ holding, onDelete }: HoldingCardProps) {
  const [isExitPlanDialogOpen, setIsExitPlanDialogOpen] = useState(false);

  const { data: exitPlans = [] } = useQuery<ExitPlan[]>({
    queryKey: [`/api/exit-plans/${holding.id}`],
  });

  const purchasePrice = parseFloat(holding.purchase_price);
  const currentPrice = parseFloat(holding.current_price);
  const amount = parseFloat(holding.amount);

  const invested = purchasePrice * amount;
  const currentValue = currentPrice * amount;
  const profitLoss = currentValue - invested;
  const profitLossPercent = invested > 0 ? (profitLoss / invested) * 100 : 0;
  const isProfit = profitLoss >= 0;

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 border-b border-slate-200 dark:border-slate-600">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">
              {holding.token_name}
            </CardTitle>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
              {holding.token_symbol}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onDelete}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          <div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Amount Held</p>
            <p className="text-lg font-semibold text-slate-900 dark:text-white">
              {amount.toLocaleString(undefined, { maximumFractionDigits: 8 })}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Purchase Price</p>
            <p className="text-lg font-semibold text-slate-900 dark:text-white">
              ${purchasePrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Current Price</p>
            <p className="text-lg font-semibold text-slate-900 dark:text-white">
              ${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Current Value</p>
            <p className="text-lg font-semibold text-slate-900 dark:text-white">
              ${currentValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        <div className={`flex items-center gap-2 p-4 rounded-lg mb-6 ${
          isProfit
            ? 'bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800'
            : 'bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800'
        }`}>
          {isProfit ? (
            <TrendingUp className="w-5 h-5 text-emerald-600" />
          ) : (
            <TrendingDown className="w-5 h-5 text-red-600" />
          )}
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Profit/Loss</p>
            <p className={`text-xl font-bold ${isProfit ? 'text-emerald-600' : 'text-red-600'}`}>
              {isProfit ? '+' : ''}${profitLoss.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              <span className="text-sm ml-2">
                ({isProfit ? '+' : ''}{profitLossPercent.toFixed(2)}%)
              </span>
            </p>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <Target className="w-5 h-5" />
              Exit Strategy
            </h3>
            <Button onClick={() => setIsExitPlanDialogOpen(true)} size="sm">
              Add Exit Plan
            </Button>
          </div>

          <ExitPlansList exitPlans={exitPlans} holding={holding} />
        </div>
      </CardContent>

      <ExitPlanDialog
        open={isExitPlanDialogOpen}
        onOpenChange={setIsExitPlanDialogOpen}
        holdingId={holding.id}
        currentPrice={currentPrice}
      />
    </Card>
  );
}
