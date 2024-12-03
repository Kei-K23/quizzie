"use client";

import { motion } from "framer-motion";
import { Award, Brain, Crown, Zap } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Diverse Categories",
    description: "Choose from multiple categories to test your knowledge",
  },
  {
    icon: Crown,
    title: "Competitive Leaderboard",
    description: "Compete with others and climb the global rankings",
  },
  {
    icon: Award,
    title: "Achievements & Badges",
    description: "Earn unique badges and unlock special achievements",
  },
  {
    icon: Zap,
    title: "Daily Streaks",
    description: "Maintain your streak by playing daily quizzes",
  },
];

export function Features() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12"
        >
          Features
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center p-6 rounded-lg bg-card"
            >
              <feature.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
