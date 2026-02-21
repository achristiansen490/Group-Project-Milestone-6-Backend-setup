import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Clock, Star, ChevronRight } from "lucide-react";
import AppNav from "@/components/AppNav";
import { Button } from "@/components/ui/button";

type Activity = {
  id: number;
  name: string;
  desc: string;
  time: string;
  points: number;
  category: string;
  icon: string;
  difficulty: string;
  steps: string[];
  durationMinutes: number;
};

type ApiActivity = {
  id: number;
  name: string;
  description: string | null;
  category: string;
  duration_minutes: number;
  points: number;
};

const fallbackActivities: Activity[] = [
  {
    id: 1,
    name: "Nature Scavenger Hunt",
    desc: "Find 10 items from the list - a pinecone, a feather, a cool rock, and more!",
    time: "30 min",
    points: 40,
    category: "Explore",
    icon: "🔍",
    difficulty: "Easy",
    steps: [
      "Make a short list of nature items to find",
      "Head to your backyard or a nearby park",
      "Search for each item and check it off",
      "Take a photo of your best find",
    ],
    durationMinutes: 30,
  },
  {
    id: 2,
    name: "Bike Ride Challenge",
    desc: "Ride your bike around the neighborhood. How far can you go?",
    time: "20 min",
    points: 35,
    category: "Active",
    icon: "🚲",
    difficulty: "Medium",
    steps: [
      "Put on your helmet",
      "Pick a safe route",
      "Ride for at least 20 minutes",
      "Share how far you went",
    ],
    durationMinutes: 20,
  },
];

const icons = ["🌿", "⚽", "🚲", "🐛", "🌤", "🧺", "🏕"];

const toTitleCase = (value: string) =>
  value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const mapDifficulty = (points: number) => {
  if (points <= 20) {
    return "Easy";
  }

  if (points <= 35) {
    return "Medium";
  }

  return "Hard";
};

const toActivity = (activity: ApiActivity, index: number): Activity => ({
  id: activity.id,
  name: activity.name,
  desc: activity.description ?? "Try this fun outside activity.",
  time: `${activity.duration_minutes} min`,
  points: activity.points,
  category: toTitleCase(activity.category),
  icon: icons[index % icons.length],
  difficulty: mapDifficulty(activity.points),
  steps: [
    "Read the activity details together",
    "Head outside and complete the challenge",
    "Track your time and effort",
    "Press Start Activity to save it",
  ],
  durationMinutes: activity.duration_minutes,
});

const ActivitiesPage = () => {
  const [activities, setActivities] = useState<Activity[]>(fallbackActivities);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedActivity, setSelectedActivity] = useState<number | null>(null);
  const [childPoints, setChildPoints] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [activitiesResponse, pointsResponse] = await Promise.all([
          fetch("/api/activities"),
          fetch("/api/children/1/points"),
        ]);

        if (activitiesResponse.ok) {
          const activitiesData = await activitiesResponse.json();
          const mapped = (activitiesData.activities as ApiActivity[]).map(toActivity);
          if (mapped.length > 0) {
            setActivities(mapped);
          }
        }

        if (pointsResponse.ok) {
          const pointsData = await pointsResponse.json();
          setChildPoints(pointsData.total_points);
        }
      } catch {
        setStatusMessage("Backend is not connected yet. Showing prototype data.");
      }
    };

    void loadData();
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = new Set(activities.map((activity) => activity.category));
    return ["All", ...uniqueCategories];
  }, [activities]);

  const filtered =
    activeCategory === "All"
      ? activities
      : activities.filter((activity) => activity.category === activeCategory);

  const selected = activities.find((activity) => activity.id === selectedActivity);

  const handleStartActivity = async () => {
    if (!selected) {
      return;
    }

    setIsSaving(true);
    setStatusMessage(null);

    try {
      const response = await fetch("/api/children/1/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          activityId: selected.id,
          durationMinutes: selected.durationMinutes,
          pointsEarned: selected.points,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to save completion");
      }

      const payload = await response.json();
      setChildPoints(payload.child.total_points);
      setStatusMessage(
        `Saved "${selected.name}". Total points in database: ${payload.child.total_points}.`
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to save completion";
      setStatusMessage(message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <AppNav />

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center justify-between gap-3"
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold">🌿 Activities</h1>
            <p className="text-muted-foreground mt-1">Fun things to do outside today!</p>
          </div>
          <div className="px-4 py-2 rounded-full bg-card shadow-card text-sm font-semibold">
            DB Points: {childPoints ?? "--"}
          </div>
        </motion.div>

        {statusMessage && (
          <div className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm">
            {statusMessage}
          </div>
        )}

        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-card shadow-card text-muted-foreground hover:bg-muted"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl p-6 shadow-playful border-2 border-primary/20"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{selected.icon}</span>
                <div>
                  <h2 className="text-xl font-display font-bold">{selected.name}</h2>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <Clock size={14} /> {selected.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star size={14} className="text-sunshine" /> {selected.points} pts
                    </span>
                    <span className="px-2 py-0.5 bg-nature-light text-primary rounded-full text-xs font-semibold">
                      {selected.difficulty}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedActivity(null)}
                className="text-muted-foreground hover:text-foreground text-xl font-bold"
              >
                X
              </button>
            </div>
            <p className="text-muted-foreground mb-4">{selected.desc}</p>
            <div>
              <h3 className="font-display font-bold mb-3">How to Play:</h3>
              <ol className="space-y-2">
                {selected.steps.map((step, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-sm">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="mt-5">
              <Button
                className="rounded-full font-bold w-full"
                onClick={handleStartActivity}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Start Activity ⭐"}
              </Button>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((activity, index) => (
            <motion.button
              key={activity.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              onClick={() => setSelectedActivity(activity.id)}
              className={`text-left bg-card rounded-2xl p-5 shadow-card hover:shadow-playful transition-all hover:-translate-y-0.5 ${
                selectedActivity === activity.id ? "ring-2 ring-primary" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl">{activity.icon}</span>
                <div className="flex-1">
                  <h3 className="font-display font-bold mb-1">{activity.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{activity.desc}</p>
                  <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {activity.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star size={12} className="text-sunshine" /> {activity.points} pts
                    </span>
                    <span className="px-2 py-0.5 bg-muted rounded-full font-semibold">
                      {activity.category}
                    </span>
                  </div>
                </div>
                <ChevronRight size={18} className="text-muted-foreground mt-1 shrink-0" />
              </div>
            </motion.button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ActivitiesPage;
