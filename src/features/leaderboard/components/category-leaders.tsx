"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Crown } from "lucide-react";

interface CategoryLeader {
  id: string;
  name: string;
  image: string;
  score: number;
  category: string;
}

interface CategoryLeadersProps {
  categories: {
    name: string;
    leaders: CategoryLeader[];
  }[];
}

export function CategoryLeaders({ categories }: CategoryLeadersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category, index) => (
        <motion.div
          key={category.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 capitalize">
              {category.name}
            </h3>
            <div className="space-y-4">
              {category.leaders.slice(0, 3).map((leader, position) => (
                <div
                  key={leader.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 text-center font-medium">
                      {position === 0 && (
                        <Crown className="w-5 h-5 text-yellow-500" />
                      )}
                      {position > 0 && position + 1}
                    </div>
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={leader.image} />
                      <AvatarFallback>
                        {leader.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{leader.name}</span>
                  </div>
                  <span className="font-semibold">{leader.score}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
