-- schema.sql
-- Outside Today - Postgres schema matching the ERD

-- (Optional) start fresh
DROP TABLE IF EXISTS activity_suggestions CASCADE;
DROP TABLE IF EXISTS screen_time CASCADE;
DROP TABLE IF EXISTS completed_activities CASCADE;
DROP TABLE IF EXISTS rewards CASCADE;
DROP TABLE IF EXISTS goals CASCADE;
DROP TABLE IF EXISTS activities CASCADE;
DROP TABLE IF EXISTS children CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Enums based on the ERD's "enum" fields
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'activity_category') THEN
    CREATE TYPE activity_category AS ENUM (
      'outdoor_play', 'sport', 'nature', 'creative', 'fitness', 'family', 'other'
    );
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'goal_status') THEN
    CREATE TYPE goal_status AS ENUM ('active', 'paused', 'completed', 'cancelled');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'created_by_type') THEN
    CREATE TYPE created_by_type AS ENUM ('parent', 'child', 'system');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'verification_method') THEN
    CREATE TYPE verification_method AS ENUM ('parent_confirm', 'photo', 'timer', 'location', 'honor');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'reward_status') THEN
    CREATE TYPE reward_status AS ENUM ('available', 'redeemed', 'expired', 'locked');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'suggestion_reason') THEN
    CREATE TYPE suggestion_reason AS ENUM ('low_screen_time', 'high_screen_time', 'goal_related', 'weather', 'random', 'other');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'screen_time_source') THEN
    CREATE TYPE screen_time_source AS ENUM ('manual', 'device', 'app', 'other');
  END IF;
END $$;

-- USERS (Parents)
CREATE TABLE users (
  user_id        SERIAL PRIMARY KEY,
  first_name     VARCHAR(50) NOT NULL,
  last_name      VARCHAR(50) NOT NULL,
  email          VARCHAR(100) UNIQUE NOT NULL,
  password_hash  TEXT NOT NULL,
  date_created   TIMESTAMP NOT NULL DEFAULT NOW()
);

-- CHILDREN
CREATE TABLE children (
  child_id             SERIAL PRIMARY KEY,
  parent_id            INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  first_name           VARCHAR(50) NOT NULL,
  last_name            VARCHAR(50) NOT NULL,
  age                  DATE, -- ERD shows "age date" (interpretable as DOB)
  profile_picture_url  VARCHAR(500),
  pin                  INT,
  total_points         INT NOT NULL DEFAULT 0,
  date_created         TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ACTIVITIES
CREATE TABLE activities (
  activity_id              SERIAL PRIMARY KEY,
  created_by               INT REFERENCES users(user_id) ON DELETE SET NULL, -- ERD: FK created_by int
  name                     VARCHAR(100) NOT NULL,
  description              TEXT,
  category                 activity_category NOT NULL DEFAULT 'other',
  default_duration_minutes INT,
  difficulty_level         INT
);

-- GOALS
CREATE TABLE goals (
  goal_id                SERIAL PRIMARY KEY,
  child_id               INT NOT NULL REFERENCES children(child_id) ON DELETE CASCADE,
  activity_id            INT REFERENCES activities(activity_id) ON DELETE SET NULL,
  custom_activity_name   VARCHAR(100),
  target_duration_minutes INT NOT NULL,
  points_value           INT NOT NULL DEFAULT 0,
  status                 goal_status NOT NULL DEFAULT 'active',
  created_by             created_by_type NOT NULL DEFAULT 'parent',
  created_at             TIMESTAMP NOT NULL DEFAULT NOW(),
  -- if no activity_id, you should provide a custom name
  CONSTRAINT goal_activity_or_custom_chk
    CHECK (activity_id IS NOT NULL OR custom_activity_name IS NOT NULL)
);

-- COMPLETED ACTIVITIES
CREATE TABLE completed_activities (
  completion_id        SERIAL PRIMARY KEY,
  goal_id              INT REFERENCES goals(goal_id) ON DELETE SET NULL,
  child_id             INT NOT NULL REFERENCES children(child_id) ON DELETE CASCADE,
  completed_at         TIMESTAMP NOT NULL DEFAULT NOW(),  -- ERD typo "compleated_at" - corrected
  duration_minutes     INT NOT NULL,
  points_earned        INT NOT NULL DEFAULT 0,
  verification_method  verification_method NOT NULL DEFAULT 'honor'
);

-- REWARDS
CREATE TABLE rewards (
  reward_id        SERIAL PRIMARY KEY,
  child_id         INT NOT NULL REFERENCES children(child_id) ON DELETE CASCADE,
  name             VARCHAR(100) NOT NULL,
  description      TEXT,
  points_required  INT NOT NULL,
  status           reward_status NOT NULL DEFAULT 'available',
  created_at       TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ACTIVITY SUGGESTIONS
CREATE TABLE activity_suggestions (
  suggestion_id  SERIAL PRIMARY KEY,
  child_id       INT NOT NULL REFERENCES children(child_id) ON DELETE CASCADE,
  activity_id    INT NOT NULL REFERENCES activities(activity_id) ON DELETE CASCADE,
  reason         suggestion_reason NOT NULL DEFAULT 'other',
  suggested_at   TIMESTAMP NOT NULL DEFAULT NOW(), -- ERD says datetime
  accepted       BOOLEAN NOT NULL DEFAULT FALSE
);

-- SCREEN TIME
CREATE TABLE screen_time (
  screen_time_id  SERIAL PRIMARY KEY,
  child_id        INT NOT NULL REFERENCES children(child_id) ON DELETE CASCADE,
  date            DATE NOT NULL,
  total_minutes   INT NOT NULL DEFAULT 0,
  source          screen_time_source NOT NULL DEFAULT 'manual',
  CONSTRAINT screen_time_unique_per_day UNIQUE (child_id, date)
);

-- Helpful indexes
CREATE INDEX idx_children_parent_id ON children(parent_id);
CREATE INDEX idx_goals_child_id ON goals(child_id);
CREATE INDEX idx_completed_child_id ON completed_activities(child_id);
CREATE INDEX idx_suggestions_child_id ON activity_suggestions(child_id);
CREATE INDEX idx_screen_time_child_date ON screen_time(child_id, date);