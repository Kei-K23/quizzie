"use client";

import { motion } from "framer-motion";

import Link from "next/link";
import {
  Beaker,
  BookOpen,
  Globe,
  History,
  Laptop,
  Music,
  Palette,
  Trophy,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const categories = [
  { icon: Globe, name: "General Knowledge", slug: "general" },
  { icon: Beaker, name: "Science", slug: "science" },
  { icon: History, name: "History", slug: "history" },
  { icon: Laptop, name: "Technology", slug: "tech" },
  { icon: Palette, name: "Arts", slug: "arts" },
  { icon: Music, name: "Entertainment", slug: "entertainment" },
  { icon: BookOpen, name: "Literature", slug: "literature" },
  { icon: Trophy, name: "Sports", slug: "sports" },
];

interface CategoriesProps {
  title: string;
}

export function Categories({ title }: CategoriesProps) {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12"
        >
          {title}
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/quiz/${category.slug}`}>
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <category.icon className="w-12 h-12 text-primary" />
                    <h3 className="text-xl font-semibold">{category.name}</h3>
                    <Button variant="secondary" className="w-full">
                      Start Quiz
                    </Button>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
