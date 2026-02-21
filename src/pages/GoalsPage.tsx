import { motion } from "framer-motion";
import { Target, Plus, CheckCircle2, Circle, Star, Sparkles } from "lucide-react";
import AppNav from "@/components/AppNav";
import { Button } from "@/components/ui/button";

const currentGoals = [
  {
    title: "Play outside 5 days this week",
    progress: 3,
    total: 5,
    reward: "Extra 30 min screen time",
    icon: "🏃",
  },
  {
    title: "Try 3 new activities",
    progress: 2,
    total: 3,
    reward: "Choose a family outing",
    icon: "🌟",
  },
  {
    title: "Earn 100 points",
    progress: 75,
    total: 100,
    reward: "New outdoor toy",
    icon: "⭐",
  },
  {
    title: "Complete a nature journal entry",
    progress: 1,
    total: 1,
    reward: "Special badge",
    icon: "📓",
    completed: true,
  },
];

const recommendedGoals = [
  { title: "Ride a bike for 20 minutes", icon: "🚲", points: 40 },
  { title: "Have a picnic outside", icon: "🧺", points: 25 },
  { title: "Plant something in the garden", icon: "🌱", points: 50 },
  { title: "Play catch for 15 minutes", icon: "⚾", points: 20 },
  { title: "Watch the sunset", icon: "🌅", points: 15 },
  { title: "Explore a new trail", icon: "🥾", points: 60 },
];

const GoalsPage = () => {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <AppNav />

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold flex items-center gap-2">
              <Target size={28} className="text-primary" /> Goals
            </h1>
            <p className="text-muted-foreground mt-1">
              Track progress and reach for the stars!
            </p>
          </div>
          <Button className="rounded-full font-bold">
            <Plus size={18} className="mr-1" /> New Goal
          </Button>
        </motion.div>

        {/* Current Goals */}
        <div className="space-y-4">
          <h2 className="font-display font-bold text-lg">Current Goals</h2>
          {currentGoals.map((goal, i) => {
            const pct = Math.round((goal.progress / goal.total) * 100);
            const done = goal.completed || pct >= 100;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`bg-card rounded-2xl p-5 shadow-card ${
                  done ? "border-2 border-primary/30" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl mt-1">{goal.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {done ? (
                        <CheckCircle2 size={18} className="text-primary shrink-0" />
                      ) : (
                        <Circle size={18} className="text-muted-foreground shrink-0" />
                      )}
                      <h3
                        className={`font-semibold ${
                          done ? "line-through text-muted-foreground" : ""
                        }`}
                      >
                        {goal.title}
                      </h3>
                    </div>
                    <div className="mt-2 w-full bg-muted rounded-full h-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(pct, 100)}%` }}
                        transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                        className={`h-full rounded-full ${
                          done ? "bg-gradient-nature" : "bg-gradient-sunshine"
                        }`}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-muted-foreground">
                        {goal.progress}/{goal.total}{" "}
                        {done && "✅ Complete!"}
                      </span>
                      <span className="text-xs font-semibold text-coral flex items-center gap-1">
                        <Star size={12} /> {goal.reward}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Recommended Goals */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
            <Sparkles size={20} className="text-sunshine" /> Recommended Goals
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {recommendedGoals.map((goal, i) => (
              <button
                key={i}
                className="flex items-center gap-3 p-4 bg-card rounded-xl shadow-card hover:shadow-playful transition-all hover:-translate-y-0.5 text-left"
              >
                <span className="text-2xl">{goal.icon}</span>
                <div className="flex-1">
                  <div className="font-semibold text-sm">{goal.title}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Star size={10} className="text-sunshine" /> {goal.points} pts
                  </div>
                </div>
                <Plus size={18} className="text-primary shrink-0" />
              </button>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default GoalsPage;
