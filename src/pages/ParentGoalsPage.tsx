import { motion } from "framer-motion";
import { Target, Plus, CheckCircle2, Circle, Star, Users } from "lucide-react";
import AppNav from "@/components/AppNav";
import { Button } from "@/components/ui/button";

const kidsGoals = [
  {
    kid: "Emma",
    avatar: "👧",
    goals: [
      { title: "Play outside 5 days this week", progress: 3, total: 5, reward: "Extra 30 min screen time", completed: false },
      { title: "Try 3 new activities", progress: 2, total: 3, reward: "Choose a family outing", completed: false },
      { title: "Complete a nature journal entry", progress: 1, total: 1, reward: "Special badge", completed: true },
    ],
  },
  {
    kid: "Jake",
    avatar: "👦",
    goals: [
      { title: "Play outside 4 days this week", progress: 2, total: 4, reward: "New outdoor toy", completed: false },
      { title: "Earn 75 points", progress: 50, total: 75, reward: "Ice cream trip", completed: false },
    ],
  },
];

const suggestedGoals = [
  { title: "30 minutes of outdoor play daily", difficulty: "Easy", icon: "🏃" },
  { title: "Try 2 new activities this week", difficulty: "Medium", icon: "🌟" },
  { title: "Earn 100 points this week", difficulty: "Medium", icon: "⭐" },
  { title: "Complete a family hike", difficulty: "Hard", icon: "🥾" },
];

const ParentGoalsPage = () => {
  const totalGoals = kidsGoals.reduce((acc, k) => acc + k.goals.length, 0);
  const completedGoals = kidsGoals.reduce((acc, k) => acc + k.goals.filter(g => g.completed).length, 0);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <AppNav />

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold flex items-center gap-2">
              <Target size={28} className="text-primary" /> Manage Goals
            </h1>
            <p className="text-muted-foreground mt-1">
              {completedGoals} of {totalGoals} goals completed across all kids
            </p>
          </div>
          <Button className="rounded-full font-bold">
            <Plus size={18} className="mr-1" /> Assign Goal
          </Button>
        </motion.div>

        {/* Per-kid goals */}
        {kidsGoals.map((kidData, ki) => (
          <motion.div
            key={kidData.kid}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: ki * 0.15 }}
            className="bg-card rounded-2xl p-5 shadow-card"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-sunshine/20 flex items-center justify-center text-2xl">
                {kidData.avatar}
              </div>
              <div>
                <h2 className="text-lg font-display font-bold">{kidData.kid}'s Goals</h2>
                <p className="text-sm text-muted-foreground">
                  {kidData.goals.filter(g => g.completed).length}/{kidData.goals.length} completed
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {kidData.goals.map((goal, i) => {
                const pct = Math.round((goal.progress / goal.total) * 100);
                const done = goal.completed || pct >= 100;
                return (
                  <div
                    key={i}
                    className={`p-4 rounded-xl border ${done ? "border-primary/30 bg-primary/5" : "border-border bg-muted/30"}`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {done ? (
                        <CheckCircle2 size={18} className="text-primary shrink-0" />
                      ) : (
                        <Circle size={18} className="text-muted-foreground shrink-0" />
                      )}
                      <span className={`font-semibold text-sm flex-1 ${done ? "line-through text-muted-foreground" : ""}`}>
                        {goal.title}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden mb-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(pct, 100)}%` }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className={`h-full rounded-full ${done ? "bg-gradient-nature" : "bg-gradient-sunshine"}`}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {goal.progress}/{goal.total} {done && "· Complete!"}
                      </span>
                      <span className="text-xs font-semibold text-coral flex items-center gap-1">
                        <Star size={12} /> Reward: {goal.reward}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}

        {/* Suggested goals to assign */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="font-display font-bold text-lg mb-3 flex items-center gap-2">
            <Users size={20} className="text-primary" /> Suggested Goals to Assign
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {suggestedGoals.map((goal, i) => (
              <button
                key={i}
                className="flex items-center gap-3 p-4 bg-card rounded-xl shadow-card hover:shadow-playful transition-all hover:-translate-y-0.5 text-left"
              >
                <span className="text-2xl">{goal.icon}</span>
                <div className="flex-1">
                  <div className="font-semibold text-sm">{goal.title}</div>
                  <div className="text-xs text-muted-foreground">{goal.difficulty} difficulty</div>
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

export default ParentGoalsPage;
