"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Brain, Trophy } from "lucide-react";

import { ThemeToggle } from "./theme-toggle";
import AuthDialog from "./auth-dialog";
import UserDropdown from "./user-dropdown";
import { Button } from "./ui/button";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Brain className="w-6 h-6" />
          <span className="font-bold text-xl">Quizzie</span>
        </Link>

        <div className="flex items-center gap-4">
          {session ? (
            <>
              <Link href="/quiz">
                <Button size="sm" variant="ghost" className="gap-2">
                  <Brain className="w-5 h-5" />
                  <span className="hidden md:block">Quiz</span>
                </Button>
              </Link>
              <Link href="/leaderboard">
                <Button size="sm" variant="ghost" className="gap-2">
                  <Trophy className="w-5 h-5" />
                  <span className="hidden md:block">Leaderboard</span>
                </Button>
              </Link>
              <UserDropdown />
            </>
          ) : (
            <AuthDialog />
          )}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
