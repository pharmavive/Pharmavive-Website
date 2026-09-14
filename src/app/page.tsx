import HomeHero from "@/Components/Home/HomeHero";
import ChemicalTickerStrip from "@/Components/Home/ChemicalTickerStrip";
import CategoryGridSection from "@/Components/Home/CategoryGridSection";
import WhyChooseSection from "@/Components/Home/WhyChooseSection";
import CustomSolutionBanner from "@/Components/Home/CustomSolutionBanner";
import ReviewsSection from "@/Components/Home/ReviewsSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <HomeHero />
      <ChemicalTickerStrip />
      <CategoryGridSection />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-10 sm:space-y-12 w-full">
        <WhyChooseSection />
        <CustomSolutionBanner />
        <ReviewsSection />
      </div>
    </div>
  );
}