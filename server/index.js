import "dotenv/config";
import express from "express";
import cors from "cors";
import { query, withTransaction } from "./db.js";

const app = express();
const port = Number(process.env.PORT || 3001);

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/activities", async (_req, res) => {
  try {
    const result = await query(
      `
      SELECT
        activity_id AS id,
        name,
        description,
        category,
        COALESCE(default_duration_minutes, 20) AS duration_minutes,
        COALESCE(difficulty_level * 10, 20) AS points
      FROM activities
      ORDER BY activity_id
      `
    );

    res.json({ activities: result.rows });
  } catch (error) {
    res.status(500).json({ error: "Failed to load activities" });
  }
});

app.get("/api/children/:childId/points", async (req, res) => {
  const childId = Number(req.params.childId);
  if (!Number.isInteger(childId) || childId <= 0) {
    return res.status(400).json({ error: "Invalid child id" });
  }

  try {
    const result = await query(
      "SELECT child_id, first_name, total_points FROM children WHERE child_id = $1",
      [childId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Child not found" });
    }

    res.json(result.rows[0]);
  } catch (_error) {
    res.status(500).json({ error: "Failed to load child points" });
  }
});

app.post("/api/children/:childId/completions", async (req, res) => {
  const childId = Number(req.params.childId);
  const activityId = Number(req.body?.activityId);
  const durationMinutes = Number(req.body?.durationMinutes ?? 20);
  const pointsEarned = Number(req.body?.pointsEarned ?? 10);

  if (!Number.isInteger(childId) || childId <= 0) {
    return res.status(400).json({ error: "Invalid child id" });
  }

  if (!Number.isInteger(activityId) || activityId <= 0) {
    return res.status(400).json({ error: "Invalid activity id" });
  }

  if (!Number.isInteger(durationMinutes) || durationMinutes <= 0) {
    return res.status(400).json({ error: "Invalid duration" });
  }

  if (!Number.isInteger(pointsEarned) || pointsEarned < 0) {
    return res.status(400).json({ error: "Invalid points" });
  }

  try {
    const data = await withTransaction(async (client) => {
      const childResult = await client.query(
        "SELECT child_id FROM children WHERE child_id = $1",
        [childId]
      );

      if (childResult.rowCount === 0) {
        return { status: 404, body: { error: "Child not found" } };
      }

      const activityResult = await client.query(
        "SELECT activity_id FROM activities WHERE activity_id = $1",
        [activityId]
      );

      if (activityResult.rowCount === 0) {
        return { status: 404, body: { error: "Activity not found" } };
      }

      const completionResult = await client.query(
        `
        INSERT INTO completed_activities (goal_id, child_id, duration_minutes, points_earned, verification_method)
        VALUES (NULL, $1, $2, $3, 'honor')
        RETURNING completion_id, completed_at
        `,
        [childId, durationMinutes, pointsEarned]
      );

      const pointsResult = await client.query(
        `
        UPDATE children
        SET total_points = total_points + $1
        WHERE child_id = $2
        RETURNING child_id, first_name, total_points
        `,
        [pointsEarned, childId]
      );

      return {
        status: 201,
        body: {
          completion: completionResult.rows[0],
          child: pointsResult.rows[0],
        },
      };
    });

    return res.status(data.status).json(data.body);
  } catch (_error) {
    return res.status(500).json({ error: "Failed to save completion" });
  }
});

app.listen(port, () => {
  console.log(`Backend API running on http://localhost:${port}`);
});
