import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../lib/queryClient";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

interface ExitPlanDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  holdingId: string;
  currentPrice: number;
}

export default function ExitPlanDialog({
  open,
  onOpenChange,
  holdingId,
  currentPrice,
}: ExitPlanDialogProps) {
  const [formData, setFormData] = useState({
    targetPrice: "",
    sellPercentage: "",
    notes: "",
  });

  const addExitPlanMutation = useMutation({
    mutationFn: async (data: typeof formData & { holdingId: string }) => {
      const response = await fetch("/api/exit-plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to add exit plan");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/exit-plans/${holdingId}`] });
      setFormData({
        targetPrice: "",
        sellPercentage: "",
        notes: "",
      });
      onOpenChange(false);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addExitPlanMutation.mutate({ ...formData, holdingId });
  };

  const targetPrice = parseFloat(formData.targetPrice) || 0;
  const priceIncrease = targetPrice > 0
    ? ((targetPrice - currentPrice) / currentPrice) * 100
    : 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Exit Plan</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="targetPrice">Target Price ($)</Label>
            <Input
              id="targetPrice"
              type="number"
              step="0.00000001"
              placeholder="0.00"
              value={formData.targetPrice}
              onChange={(e) => setFormData({ ...formData, targetPrice: e.target.value })}
              required
            />
            {targetPrice > 0 && (
              <p className={`text-sm mt-1 ${priceIncrease >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                {priceIncrease >= 0 ? '+' : ''}{priceIncrease.toFixed(2)}% from current price (${currentPrice.toFixed(2)})
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="sellPercentage">Sell Percentage (%)</Label>
            <Input
              id="sellPercentage"
              type="number"
              step="0.01"
              min="0.01"
              max="100"
              placeholder="25"
              value={formData.sellPercentage}
              onChange={(e) => setFormData({ ...formData, sellPercentage: e.target.value })}
              required
            />
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              How much of your holding to sell at this target
            </p>
          </div>

          <div>
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Strategy notes or reasons for this exit point..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={addExitPlanMutation.isPending}>
              {addExitPlanMutation.isPending ? "Adding..." : "Add Exit Plan"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
