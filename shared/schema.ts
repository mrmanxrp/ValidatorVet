import { pgTable, text, integer, decimal, timestamp, uuid, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const holdings = pgTable("holdings", {
  id: uuid("id").defaultRandom().primaryKey(),
  tokenName: text("token_name").notNull(),
  tokenSymbol: text("token_symbol").notNull(),
  purchasePrice: decimal("purchase_price", { precision: 20, scale: 8 }).notNull(),
  currentPrice: decimal("current_price", { precision: 20, scale: 8 }).notNull(),
  amount: decimal("amount", { precision: 20, scale: 8 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const exitPlans = pgTable("exit_plans", {
  id: uuid("id").defaultRandom().primaryKey(),
  holdingId: uuid("holding_id").references(() => holdings.id, { onDelete: "cascade" }).notNull(),
  targetPrice: decimal("target_price", { precision: 20, scale: 8 }).notNull(),
  sellPercentage: decimal("sell_percentage", { precision: 5, scale: 2 }).notNull(),
  notes: text("notes"),
  isExecuted: boolean("is_executed").default(false).notNull(),
  executedAt: timestamp("executed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertHoldingSchema = createInsertSchema(holdings);
export const selectHoldingSchema = createSelectSchema(holdings);
export const insertExitPlanSchema = createInsertSchema(exitPlans);
export const selectExitPlanSchema = createSelectSchema(exitPlans);

export type InsertHolding = typeof holdings.$inferInsert;
export type SelectHolding = typeof holdings.$inferSelect;
export type InsertExitPlan = typeof exitPlans.$inferInsert;
export type SelectExitPlan = typeof exitPlans.$inferSelect;
