import Lottie from "lottie-react";
import animationData from "../../../../../public/assets/ai-lotie.json";

const HeroLottie = () => {
  return (
    <div className="w-full mx-auto">
      <Lottie
        animationData={animationData}
        autoplay
      />
    </div>
  );
};

export default HeroLottie;
