/*
  # Prompt Practice Platform Schema

  ## Overview
  This migration creates the complete database schema for a prompt engineering practice platform
  with user progress tracking, prompt challenges, AI tools directory, and legends leaderboard.

  ## New Tables

  ### 1. `prompts`
  Stores all practice prompt challenges with evaluation criteria
  - `id` (uuid, primary key)
  - `title` (text) - Challenge title
  - `description` (text) - Full challenge description
  - `difficulty` (text) - Easy, Medium, or Hard
  - `category` (text) - Text Processing, Programming, Marketing, etc.
  - `technique` (text) - Zero-Shot, Few-Shot, Chain-of-Thought, etc.
  - `expected_output` (text) - Expected result
  - `keywords` (jsonb) - Required keywords for evaluation
  - `patterns` (jsonb) - Required patterns for evaluation
  - `max_tokens` (integer) - Maximum token limit
  - `example_output` (text) - Example output to show users
  - `hints` (jsonb) - Array of hints
  - `created_at` (timestamptz)

  ### 2. `user_progress`
  Tracks user attempts and progress on prompts
  - `id` (uuid, primary key)
  - `user_id` (uuid) - Reference to auth.users
  - `prompt_id` (uuid) - Reference to prompts
  - `attempt_text` (text) - User's prompt attempt
  - `score` (integer) - Evaluation score (0-100)
  - `passed` (boolean) - Whether attempt passed
  - `feedback` (jsonb) - Detailed evaluation feedback
  - `submitted` (boolean) - True if submitted, false if just run
  - `created_at` (timestamptz)

  ### 3. `ai_tools`
  Directory of AI tools and platforms
  - `id` (uuid, primary key)
  - `name` (text) - Tool name
  - `description` (text) - Tool description
  - `category` (text) - Tool category
  - `url` (text) - Tool website URL
  - `logo_url` (text) - Tool logo
  - `is_featured` (boolean) - Featured tools
  - `created_at` (timestamptz)

  ### 4. `prompt_legends`
  Hall of fame for top prompt engineers
  - `id` (uuid, primary key)
  - `name` (text) - Legend name
  - `region` (text) - Geographic region
  - `competition` (text) - Competition name
  - `achievement` (text) - Achievement description
  - `strategy_snippet` (text) - Brief strategy tip
  - `rank` (integer) - Ranking position
  - `avatar_url` (text) - Profile image
  - `created_at` (timestamptz)

  ### 5. `tutorial_sections`
  Tutorial content organized by sections
  - `id` (uuid, primary key)
  - `title` (text) - Section title
  - `slug` (text) - URL-friendly identifier
  - `content` (text) - Tutorial content (markdown)
  - `order_index` (integer) - Display order
  - `category` (text) - Beginner, Intermediate, Advanced
  - `created_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Public read access for prompts, ai_tools, prompt_legends, tutorial_sections
  - Authenticated users can create/read their own user_progress
  - Admin-only write access for content tables
*/

-- Create prompts table
CREATE TABLE IF NOT EXISTS prompts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  difficulty text NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  category text NOT NULL,
  technique text NOT NULL,
  expected_output text NOT NULL,
  keywords jsonb DEFAULT '[]'::jsonb,
  patterns jsonb DEFAULT '[]'::jsonb,
  max_tokens integer DEFAULT 500,
  example_output text,
  hints jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create user_progress table
CREATE TABLE IF NOT EXISTS user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  prompt_id uuid REFERENCES prompts(id) ON DELETE CASCADE,
  attempt_text text NOT NULL,
  score integer DEFAULT 0,
  passed boolean DEFAULT false,
  feedback jsonb DEFAULT '{}'::jsonb,
  submitted boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create ai_tools table
CREATE TABLE IF NOT EXISTS ai_tools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  url text NOT NULL,
  logo_url text,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create prompt_legends table
CREATE TABLE IF NOT EXISTS prompt_legends (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  region text NOT NULL,
  competition text NOT NULL,
  achievement text NOT NULL,
  strategy_snippet text,
  rank integer NOT NULL,
  avatar_url text,
  created_at timestamptz DEFAULT now()
);

-- Create tutorial_sections table
CREATE TABLE IF NOT EXISTS tutorial_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  content text NOT NULL,
  order_index integer NOT NULL,
  category text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE prompt_legends ENABLE ROW LEVEL SECURITY;
ALTER TABLE tutorial_sections ENABLE ROW LEVEL SECURITY;

-- Prompts policies (public read)
CREATE POLICY "Anyone can view prompts"
  ON prompts FOR SELECT
  TO anon, authenticated
  USING (true);

-- User progress policies (users can manage their own)
CREATE POLICY "Users can view own progress"
  ON user_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own progress"
  ON user_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON user_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- AI tools policies (public read)
CREATE POLICY "Anyone can view AI tools"
  ON ai_tools FOR SELECT
  TO anon, authenticated
  USING (true);

-- Prompt legends policies (public read)
CREATE POLICY "Anyone can view legends"
  ON prompt_legends FOR SELECT
  TO anon, authenticated
  USING (true);

-- Tutorial sections policies (public read)
CREATE POLICY "Anyone can view tutorials"
  ON tutorial_sections FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_prompts_difficulty ON prompts(difficulty);
CREATE INDEX IF NOT EXISTS idx_prompts_category ON prompts(category);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_prompt_id ON user_progress(prompt_id);
CREATE INDEX IF NOT EXISTS idx_tutorial_sections_order ON tutorial_sections(order_index);
CREATE INDEX IF NOT EXISTS idx_prompt_legends_rank ON prompt_legends(rank);