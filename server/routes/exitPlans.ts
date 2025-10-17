import type { Express } from "express";
import { supabase } from "../db";

export function setupExitPlansRoutes(app: Express) {
  app.get("/api/exit-plans/:holdingId", async (req, res) => {
    try {
      const { holdingId } = req.params;

      const { data, error } = await supabase
        .from("exit_plans")
        .select("*")
        .eq("holding_id", holdingId)
        .order("target_price", { ascending: true });

      if (error) throw error;

      res.json(data || []);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/exit-plans", async (req, res) => {
    try {
      const { holdingId, targetPrice, sellPercentage, notes } = req.body;

      const { data, error } = await supabase
        .from("exit_plans")
        .insert({
          holding_id: holdingId,
          target_price: targetPrice,
          sell_percentage: sellPercentage,
          notes: notes || null,
        })
        .select()
        .single();

      if (error) throw error;

      res.json(data);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.put("/api/exit-plans/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { targetPrice, sellPercentage, notes, isExecuted } = req.body;

      const updateData: any = {
        target_price: targetPrice,
        sell_percentage: sellPercentage,
        notes: notes || null,
        is_executed: isExecuted,
      };

      if (isExecuted) {
        updateData.executed_at = new Date().toISOString();
      }

      const { data, error } = await supabase
        .from("exit_plans")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      res.json(data);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.delete("/api/exit-plans/:id", async (req, res) => {
    try {
      const { id } = req.params;

      const { error } = await supabase
        .from("exit_plans")
        .delete()
        .eq("id", id);

      if (error) throw error;

      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
}
