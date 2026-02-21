-- seed.sql
-- Sample data for Outside Today

-- USERS (Parents)
INSERT INTO users (first_name, last_name, email, password_hash)
VALUES
  ('Alex', 'Christiansen', 'alex@example.com', 'demo_hash_1'),
  ('Jamie', 'Rivera', 'jamie@example.com', 'demo_hash_2');

-- CHILDREN
INSERT INTO children (parent_id, first_name, last_name, age, profile_picture_url, pin, total_points)
VALUES
  (1, 'Milo', 'Christiansen', '2016-05-14', 'https://pics.example/milo.png', 1234, 20),
  (1, 'Luna', 'Christiansen', '2014-09-02', 'https://pics.example/luna.png', 4321, 55),
  (2, 'Sage', 'Rivera', '2015-11-22', NULL, 2468, 10);

-- ACTIVITIES
INSERT INTO activities (created_by, name, description, category, default_duration_minutes, difficulty_level)
VALUES
  (1, 'Backyard Scavenger Hunt', 'Find 10 nature items: leaf, rock, flower, etc.', 'nature', 20, 2),
  (1, 'Sidewalk Chalk Challenge', 'Draw a hopscotch + a mural together.', 'creative', 25, 1),
  (2, 'Park Sprint + Play', '5-minute warmup, then sprint to 5 landmarks.', 'fitness', 15, 3),
  (NULL, 'Jump Rope Streak', 'Try to beat yesterday’s streak.', 'outdoor_play', 10, 2),
  (NULL, 'Soccer Dribble Course', 'Set up cones and dribble through.', 'sport', 20, 3);

-- GOALS
-- Mix of activity-based goals + custom goals
INSERT INTO goals (child_id, activity_id, custom_activity_name, target_duration_minutes, points_value, status, created_by)
VALUES
  (1, 1, NULL, 20, 15, 'active', 'parent'),
  (1, 4, NULL, 10, 8, 'active', 'system'),
  (2, 5, NULL, 20, 20, 'active', 'parent'),
  (2, NULL, 'Go on a sunset walk', 30, 25, 'active', 'parent'),
  (3, 2, NULL, 25, 12, 'paused', 'parent');

-- COMPLETED ACTIVITIES
INSERT INTO completed_activities (goal_id, child_id, completed_at, duration_minutes, points_earned, verification_method)
VALUES
  (1, 1, NOW() - INTERVAL '2 days', 22, 15, 'parent_confirm'),
  (2, 1, NOW() - INTERVAL '1 day', 10, 8, 'honor'),
  (3, 2, NOW() - INTERVAL '3 days', 18, 20, 'photo');

-- REWARDS
INSERT INTO rewards (child_id, name, description, points_required, status)
VALUES
  (1, 'Sticker Pack', 'Pick a fun sticker pack next time we’re at the store.', 30, 'available'),
  (2, 'Movie Night', 'Family movie night with popcorn.', 60, 'available'),
  (2, 'Ice Cream Trip', 'Go get ice cream together.', 80, 'locked'),
  (3, 'Pick Dinner', 'You pick dinner tonight!', 25, 'available');

-- ACTIVITY SUGGESTIONS
INSERT INTO activity_suggestions (child_id, activity_id, reason, suggested_at, accepted)
VALUES
  (1, 1, 'goal_related', NOW() - INTERVAL '1 day', TRUE),
  (1, 2, 'random', NOW() - INTERVAL '6 hours', FALSE),
  (2, 5, 'high_screen_time', NOW() - INTERVAL '2 hours', FALSE),
  (3, 3, 'weather', NOW() - INTERVAL '3 hours', FALSE);

-- SCREEN TIME
INSERT INTO screen_time (child_id, date, total_minutes, source)
VALUES
  (1, CURRENT_DATE - 2, 75, 'manual'),
  (1, CURRENT_DATE - 1, 40, 'manual'),
  (2, CURRENT_DATE - 2, 110, 'device'),
  (2, CURRENT_DATE - 1, 95, 'device'),
  (3, CURRENT_DATE - 1, 60, 'manual');

-- OPTIONAL: sync children.total_points based on completed_activities
-- (If your app will calculate points dynamically, you can remove this.)
UPDATE children c
SET total_points = sub.points_sum
FROM (
  SELECT child_id, COALESCE(SUM(points_earned), 0) AS points_sum
  FROM completed_activities
  GROUP BY child_id
) sub
WHERE c.child_id = sub.child_id;