"use client";
import React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";

export default function AuthDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Sign In</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome to Quizzie</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-y-3">
          <Button
            onClick={() => {
              signIn("google");
            }}
          >
            Continue with Google
          </Button>
          <Button
            onClick={() => {
              signIn("github");
            }}
          >
            Continue with GitHub
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
