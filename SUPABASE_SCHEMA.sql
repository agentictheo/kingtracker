-- Create tischtennis_games table
CREATE TABLE IF NOT EXISTS tischtennis_games (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  player1 TEXT NOT NULL DEFAULT 'Nicola',
  player2 TEXT NOT NULL DEFAULT 'Janis',
  score1 INT NOT NULL,
  score2 INT NOT NULL,
  winner TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_tischtennis_games_created_at 
  ON tischtennis_games (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_tischtennis_games_winner 
  ON tischtennis_games (winner);

-- Enable Row Level Security
ALTER TABLE tischtennis_games ENABLE ROW LEVEL SECURITY;

-- Allow public read/write (you can restrict this later)
CREATE POLICY "Enable insert for all users" ON tischtennis_games
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable select for all users" ON tischtennis_games
  FOR SELECT USING (true);

CREATE POLICY "Enable delete for all users" ON tischtennis_games
  FOR DELETE USING (true);
