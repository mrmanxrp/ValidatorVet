import type { Express } from "express";
import { supabase } from "../db";

export function setupHoldingsRoutes(app: Express) {
  app.get("/api/holdings", async (req, res) => {
    try {
      const { data, error } = await supabase
        .from("holdings")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      res.json(data || []);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/holdings", async (req, res) => {
    try {
      const { tokenName, tokenSymbol, purchasePrice, currentPrice, amount } = req.body;

      const { data, error } = await supabase
        .from("holdings")
        .insert({
          token_name: tokenName,
          token_symbol: tokenSymbol,
          purchase_price: purchasePrice,
          current_price: currentPrice,
          amount: amount,
        })
        .select()
        .single();

      if (error) throw error;

      res.json(data);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.put("/api/holdings/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { tokenName, tokenSymbol, purchasePrice, currentPrice, amount } = req.body;

      const { data, error } = await supabase
        .from("holdings")
        .update({
          token_name: tokenName,
          token_symbol: tokenSymbol,
          purchase_price: purchasePrice,
          current_price: currentPrice,
          amount: amount,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      res.json(data);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.delete("/api/holdings/:id", async (req, res) => {
    try {
      const { id } = req.params;

      const { error } = await supabase
        .from("holdings")
        .delete()
        .eq("id", id);

      if (error) throw error;

      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
}
