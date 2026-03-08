import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

interface Props {
  children: ReactNode;
  backgroundImage?: string;
  fullScreen?: boolean;

  fade?: boolean;
  scaleEffect?: boolean;
  cameraPush?: boolean;
  blurEffect?: boolean;
  parallaxIntensity?: number; // default 40
}

const CinematicSection = ({
  children,
  backgroundImage,
  fullScreen = false,
  fade = false,
  scaleEffect = false,
  cameraPush = false,
  blurEffect = false,
  parallaxIntensity = 40,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // 🎥 Parallax fondo
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [-parallaxIntensity, parallaxIntensity]
  );

  // 🎬 Fade
  const opacity = fade
    ? useTransform(scrollYProgress, [0, 0.50], [0, 1])
    : 1;

  // 🔍 Scale suave
  const scale = scaleEffect
    ? useTransform(scrollYProgress, [0, 0.3], [0.96, 1])
    : 1;

  // 🎥 Camera Push (zoom progresivo tipo trailer)
  const cameraScale = cameraPush
    ? useTransform(scrollYProgress, [0, 1], [1.1, 1])
    : 1;

  // 🌫 Blur dinámico
  const blur = 0;

  return (
    <section
      ref={ref}
      className={`relative w-full overflow-hidden ${fullScreen ? "min-h-screen flex items-center" : "min-h-screen flex items-center"

        }`}
    >
      {backgroundImage && (
        <motion.div
          style={{ y, scale: cameraScale }}
          className="absolute inset-0 will-change-transform"
        >
          <motion.div
            className="absolute -top-32 -bottom-32 left-0 right-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              filter: blur
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </motion.div>
      )}

      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 w-full will-change-transform"
      >
        {children}
      </motion.div>
    </section>
  );
};

export default CinematicSection;
