import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import TrailerText from "@/components/ui/TrailerText";

interface Step {
  number: string;
  letter: string;
  code: string;
  title: string;
  description: string;
  background?: string;
}

const steps: Step[] = [
  {
    number: "01",
    letter: "A",
    code: "01",
    title: "Assessment",
    description:
      "We begin by conducting a thorough assessment of your current business landscape, identifying key pain points and opportunities for growth.",
    background: "/images/fondo.png",
  },
  {
    number: "02",
    letter: "B",
    code: "02",
    title: "Development",
    description:
      "Based on our assessment, we develop a customized strategy and roadmap tailored to your business goals and market conditions.",
  },
  {
    number: "03",
    letter: "C",
    code: "03",
    title: "Implementation",
    description:
      "Our team works alongside yours to implement the recommended solutions, ensuring seamless integration and minimal disruption.",
  },
  {
    number: "04",
    letter: "D",
    code: "04",
    title: "Monitoring and Adjustments",
    description:
      "We continuously monitor progress, measure results, and make adjustments to ensure sustained growth and maximum impact.",
  },
];

interface ProcessSectionProps {
  videoBackground?: string;
}

const ProcessSection = ({
  videoBackground = "/videos/home-shapes.mp4",
}: ProcessSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1); // -1 = trailer, 0-3 = steps

  const totalSteps = steps.length;
  // Add 1 for the trailer "step"
  const totalPanels = totalSteps + 1;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Create snap points including the trailer
  const snapPoints = Array.from({ length: totalPanels }, (_, i) => i / totalSteps);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const closest = snapPoints.reduce((prev, curr) =>
      Math.abs(curr - latest) < Math.abs(prev - latest) ? curr : prev
    );
    const newIndex = snapPoints.indexOf(closest) - 1; // -1 for trailer, 0-3 for steps
    setActiveIndex(newIndex);
  });

  const currentStepHasBackground =
    activeIndex >= 0 && !!steps[activeIndex]?.background;

  const snappedProgress = useSpring(
    useTransform(scrollYProgress, snapPoints, snapPoints),
    { stiffness: 120, damping: 30 }
  );

  const x = useTransform(
    snappedProgress,
    [0, 1],
    ["0vw", `-${totalSteps * 100}vw`]
  );

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const cameraPush = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  // Fade out trailer text as we scroll
  const trailerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const trailerScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const inView = rect.top <= 0 && rect.bottom >= window.innerHeight;

      if (!inView) return;

      if (e.key === "ArrowRight") {
        scrollToIndex(Math.min(activeIndex + 1, totalSteps - 1));
      }

      if (e.key === "ArrowLeft") {
        scrollToIndex(Math.max(activeIndex - 1, -1));
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex]);

  const scrollToIndex = (index: number) => {
    if (!sectionRef.current) return;

    const sectionTop = sectionRef.current.offsetTop;
    const sectionHeight = sectionRef.current.offsetHeight;

    // Adjust for trailer being index -1
    const adjustedIndex = index + 1;
    const target = sectionTop + (sectionHeight / totalSteps) * adjustedIndex;

    window.scrollTo({
      top: target,
      behavior: "smooth",
    });
  };

  return (
    <div
      ref={sectionRef}
      className="relative"
      style={{ height: `${totalPanels * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-screen overflow-hidden bg-black">
        {/* Background Video */}
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-800 ${
            currentStepHasBackground ? "opacity-0" : "opacity-100"
          }`}
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={videoBackground} type="video/mp4" />
        </video>

        {/* Dynamic Background Images */}
        <AnimatePresence mode="wait">
          {activeIndex >= 0 && steps[activeIndex]?.background && (
            <motion.div
              key={steps[activeIndex].background}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${steps[activeIndex].background})`,
              }}
            />
          )}
        </AnimatePresence>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Trailer Text - Shows at start */}
        <motion.div
          style={{
            opacity: trailerOpacity,
            scale: trailerScale,
          }}
          className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
        >
          <TrailerText
            text="The Process"
            className="text-6xl md:text-8xl lg:text-9xl font-bold text-center text-white"
          />
        </motion.div>

        {/* Progress Bar */}
        <div className="absolute bottom-10 left-20 right-20 h-[2px] bg-white/20 z-20">
          <motion.div
            style={{ width: progressWidth }}
            className="h-full bg-white"
          />
        </div>

        {/* Step Indicators */}
        <div className="absolute bottom-20 left-20 flex gap-3 z-20">
          {steps.map((step, index) => (
            <button
              key={step.code}
              onClick={() => scrollToIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === activeIndex
                  ? "bg-white scale-125"
                  : "bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to step ${step.number}`}
            />
          ))}
        </div>

        {/* Horizontal Scrolling Content Panels */}
        <motion.div
          style={{ x, scale: cameraPush }}
          className="absolute top-0 left-0 h-full flex items-center z-10"
        >
          {/* Spacer for trailer text (empty first panel) */}
          <div className="h-screen w-screen flex-shrink-0" />

          {/* Step Panels */}
          {steps.map((step, index) => (
            <div
              key={step.code}
              className="h-screen w-screen flex items-center justify-center px-20 flex-shrink-0"
            >
              <motion.div
                animate={{
                  opacity: activeIndex === index ? 1 : 0.4,
                  scale: activeIndex === index ? 1 : 0.95,
                }}
                transition={{ duration: 0.4 }}
                className="max-w-2xl text-white"
              >
                <div className="flex items-baseline gap-4 mb-8">
                  <span className="text-white/40 text-sm">{step.number}</span>
                  <span className="text-8xl font-bold leading-none">
                    {step.letter}-{step.code}
                  </span>
                </div>

                <h3 className="text-2xl font-semibold uppercase mb-4">
                  {step.title}
                </h3>

                <p className="text-white/70 text-base leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            </div>
          ))}
        </motion.div>

        {/* Navigation Hints */}
        <div className="absolute bottom-10 right-20 text-white/40 text-sm z-20">
          Use ← → arrows to navigate
        </div>
      </div>
    </div>
  );
};

export default ProcessSection;