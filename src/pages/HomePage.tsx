import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Star, TreePine, Sun, Heart, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import heroImage from "@/assets/hero-kids-outdoor.jpg";

const promises = [
  { icon: Sun, text: "Get kids outside and moving", color: "text-sunshine" },
  { icon: Star, text: "Turn outdoor play into rewards", color: "text-coral" },
  { icon: Heart, text: "Track progress without nagging", color: "text-primary" },
];

const features = [
  {
    icon: Activity,
    title: "Fun Activities",
    desc: "Curated outdoor activities kids actually want to do",
    bg: "bg-secondary",
  },
  {
    icon: TreePine,
    title: "Nature Goals",
    desc: "Set achievable goals that build healthy habits",
    bg: "bg-nature-light",
  },
  {
    icon: Star,
    title: "Earn Rewards",
    desc: "Celebrate milestones with fun rewards and badges",
    bg: "bg-sunshine/20",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Nav */}
      <header className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <Logo size="md" />
        <Link to="/profiles">
          <Button variant="default" size="sm" className="rounded-full font-bold">
            Get Started <ArrowRight size={16} className="ml-1" />
          </Button>
        </Link>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-8 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight"
            >
              Make going{" "}
              <span className="text-gradient-nature">outside</span>{" "}
              the best part of their day
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-lg text-muted-foreground max-w-md"
            >
              Outside Today helps parents inspire kids to explore, play, and
              grow — with fun activities, goals, and rewards.
            </motion.p>

            {/* Promises */}
            <motion.div variants={fadeUp} className="space-y-3">
              {promises.map((p, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`p-2 rounded-full bg-card shadow-card`}>
                    <p.icon size={20} className={p.color} />
                  </div>
                  <span className="font-semibold">{p.text}</span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="flex gap-3 pt-2">
              <Link to="/profiles">
                <Button size="lg" className="rounded-full font-bold text-base px-8">
                  Explore Activities
                </Button>
              </Link>
              <a href="#features">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full font-bold text-base px-8"
                >
                  Learn More
                </Button>
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-playful">
              <img
                src={heroImage}
                alt="Happy kids playing outside in nature"
                className="w-full h-auto"
              />
            </div>
            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 bg-card rounded-2xl shadow-playful p-4 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-sunshine/20 flex items-center justify-center">
                <Star size={20} className="text-sunshine" />
              </div>
              <div>
                <div className="text-sm font-bold">+150 points</div>
                <div className="text-xs text-muted-foreground">earned this week!</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
            Everything your family needs
          </h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            Simple tools that make outdoor time fun, trackable, and rewarding.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl p-6 shadow-card hover:shadow-playful transition-shadow"
            >
              <div
                className={`w-14 h-14 rounded-xl ${f.bg} flex items-center justify-center mb-4`}
              >
                <f.icon size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-display font-bold mb-2">{f.title}</h3>
              <p className="text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-nature rounded-3xl p-10 md:p-16 text-center text-primary-foreground"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Ready to go outside? 🌿
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-md mx-auto">
            Start your family's outdoor adventure today. It's free, fun, and
            your kids will love it.
          </p>
          <Link to="/profiles">
            <Button
              size="lg"
              variant="secondary"
              className="rounded-full font-bold text-base px-10"
            >
              Get Started <ArrowRight size={18} className="ml-2" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-6 py-8 text-center text-muted-foreground text-sm">
        <Logo size="sm" />
        <p className="mt-3">© 2026 Outside Today. Making every day an adventure.</p>
      </footer>
    </div>
  );
};

export default HomePage;
