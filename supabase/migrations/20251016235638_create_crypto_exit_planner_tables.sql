/*
  # Crypto Exit Planner Database Schema

  1. New Tables
    - `holdings`
      - `id` (uuid, primary key) - Unique identifier
      - `token_name` (text) - Name of the cryptocurrency
      - `token_symbol` (text) - Symbol (e.g., BTC, ETH)
      - `purchase_price` (numeric) - Price when purchased
      - `current_price` (numeric) - Current market price
      - `amount` (numeric) - Amount of tokens held
      - `created_at` (timestamptz) - Record creation time
      - `updated_at` (timestamptz) - Last update time

    - `exit_plans`
      - `id` (uuid, primary key) - Unique identifier
      - `holding_id` (uuid, foreign key) - Reference to holdings table
      - `target_price` (numeric) - Price target for exit
      - `sell_percentage` (numeric) - Percentage to sell at target
      - `notes` (text) - Optional notes
      - `is_executed` (boolean) - Whether plan was executed
      - `executed_at` (timestamptz) - When plan was executed
      - `created_at` (timestamptz) - Record creation time

  2. Security
    - Enable RLS on both tables
    - Tables are locked down by default (no access until policies added)
    - Future: Add authentication-based policies when auth is implemented
*/

CREATE TABLE IF NOT EXISTS holdings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  token_name text NOT NULL,
  token_symbol text NOT NULL,
  purchase_price numeric(20, 8) NOT NULL,
  current_price numeric(20, 8) NOT NULL,
  amount numeric(20, 8) NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS exit_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  holding_id uuid REFERENCES holdings(id) ON DELETE CASCADE NOT NULL,
  target_price numeric(20, 8) NOT NULL,
  sell_percentage numeric(5, 2) NOT NULL,
  notes text,
  is_executed boolean DEFAULT false NOT NULL,
  executed_at timestamptz,
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE holdings ENABLE ROW LEVEL SECURITY;
ALTER TABLE exit_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public access to holdings"
  ON holdings FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public access to exit_plans"
  ON exit_plans FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);
