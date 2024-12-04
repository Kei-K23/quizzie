import { Features } from "@/features/home/components/features";
import { HeroSection } from "@/features/home/components/hero-section";
import { Categories } from "@/features/quiz/components/categories";

export default function Home() {
  return (
    <div className="space-y-20">
      <HeroSection />
      <Features />
      <Categories title="Quiz Categories" />
    </div>
  );
}
