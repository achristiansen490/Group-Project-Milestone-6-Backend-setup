import { motion } from "framer-motion";
import { Clock, Star, ChevronRight, TreePine, Sun, Wind, Droplets } from "lucide-react";
import AppNav from "@/components/AppNav";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const categories = ["All", "Active", "Creative", "Explore", "Chill"];

const activities = [
  {
    id: 1,
    name: "Nature Scavenger Hunt",
    desc: "Find 10 items from the list — a pinecone, a feather, a cool rock, and more!",
    time: "30 min",
    points: 40,
    category: "Explore",
    icon: "🔍",
    difficulty: "Easy",
    steps: [
      "Print or write a list of 10 nature items to find",
      "Head to your backyard or a nearby park",
      "Search for each item and check it off",
      "Bonus: draw or photograph what you find!",
    ],
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
      "Put on your helmet and check your tires",
      "Pick a route around your neighborhood",
      "Ride for at least 20 minutes",
      "Track how far you went!",
    ],
  },
  {
    id: 3,
    name: "Cloud Watching",
    desc: "Lie on the grass and find shapes in the clouds. What do you see?",
    time: "15 min",
    points: 15,
    category: "Chill",
    icon: "☁️",
    difficulty: "Easy",
    steps: [
      "Find a comfy spot on the grass",
      "Lie down and look up at the sky",
      "Find shapes in the clouds — animals, faces, castles!",
      "Tell a story about what you see",
    ],
  },
  {
    id: 4,
    name: "Obstacle Course",
    desc: "Build your own obstacle course with things you find outside!",
    time: "25 min",
    points: 45,
    category: "Active",
    icon: "🏅",
    difficulty: "Medium",
    steps: [
      "Gather items: sticks, rocks, buckets, cones",
      "Design your course with jumping, crawling, and running sections",
      "Time yourself going through it",
      "Challenge a friend or family member!",
    ],
  },
  {
    id: 5,
    name: "Nature Art",
    desc: "Create a masterpiece using only things you find in nature!",
    time: "20 min",
    points: 30,
    category: "Creative",
    icon: "🎨",
    difficulty: "Easy",
    steps: [
      "Collect leaves, flowers, sticks, and stones",
      "Find a flat area to work on",
      "Arrange your items into a picture or pattern",
      "Take a photo of your creation!",
    ],
  },
  {
    id: 6,
    name: "Bug Safari",
    desc: "Go on a bug hunt! See how many different insects you can spot.",
    time: "20 min",
    points: 30,
    category: "Explore",
    icon: "🐛",
    difficulty: "Easy",
    steps: [
      "Grab a magnifying glass if you have one",
      "Look under rocks, logs, and leaves",
      "Count how many different bugs you find",
      "Draw your favorite one in your journal",
    ],
  },
];

const ActivitiesPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedActivity, setSelectedActivity] = useState<number | null>(null);

  const filtered =
    activeCategory === "All"
      ? activities
      : activities.filter((a) => a.category === activeCategory);

  const selected = activities.find((a) => a.id === selectedActivity);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <AppNav />

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl md:text-3xl font-display font-bold">
            🌿 Activities
          </h1>
          <p className="text-muted-foreground mt-1">
            Fun things to do outside today!
          </p>
        </motion.div>

        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-card shadow-card text-muted-foreground hover:bg-muted"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Activity detail overlay */}
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
                  <h2 className="text-xl font-display font-bold">
                    {selected.name}
                  </h2>
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
                ✕
              </button>
            </div>
            <p className="text-muted-foreground mb-4">{selected.desc}</p>
            <div>
              <h3 className="font-display font-bold mb-3">How to Play:</h3>
              <ol className="space-y-2">
                {selected.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-sm">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="mt-5">
              <Button className="rounded-full font-bold w-full">
                Start Activity ⭐
              </Button>
            </div>
          </motion.div>
        )}

        {/* Activity cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((act, i) => (
            <motion.button
              key={act.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              onClick={() => setSelectedActivity(act.id)}
              className={`text-left bg-card rounded-2xl p-5 shadow-card hover:shadow-playful transition-all hover:-translate-y-0.5 ${
                selectedActivity === act.id ? "ring-2 ring-primary" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl">{act.icon}</span>
                <div className="flex-1">
                  <h3 className="font-display font-bold mb-1">{act.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {act.desc}
                  </p>
                  <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {act.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star size={12} className="text-sunshine" /> {act.points} pts
                    </span>
                    <span className="px-2 py-0.5 bg-muted rounded-full font-semibold">
                      {act.category}
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
