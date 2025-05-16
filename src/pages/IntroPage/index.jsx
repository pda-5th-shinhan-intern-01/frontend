import IntroSection from "./components/IntroSection";
import ProblemSection from "./components/ProblemSection";
import ChartSection from "./components/ChartSection";
import FeatureSection from "./components/FeatureSection";
import FeaturesSection from "./components/FeaturesSection";
import CTASection from "./components/CTASection";

export default function IntroPage() {
  return (
    <div className="flex flex-col w-full items-center justify-center">
      <IntroSection />
      <ProblemSection />
      <ChartSection />
      <FeatureSection />
      <FeaturesSection />
      <CTASection />
    </div>
  );
}
