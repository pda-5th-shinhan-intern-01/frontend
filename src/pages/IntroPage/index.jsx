import IntroSection from "./components/IntroSection";
import ProblemSection from "./components/ProblemSection";
import ChartSection from "./components/ChartSection";
import FeaturesSection from "./components/FeaturesSection";
import FOMCSection from "./components/FOMCSection";
import CTASection from "./components/CTASection";

export default function IntroPage() {
  return (
    <div>
      <IntroSection />
      <ProblemSection />
      <ChartSection />
      <FeaturesSection />
      <FOMCSection />
      <CTASection />
    </div>
  );
}
