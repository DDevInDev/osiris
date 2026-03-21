import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  AnimatePresence,
} from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import TrailerText from '@/components/ui/TrailerText'
import { useLocale } from '@/contexts/LocaleContext'

interface Step {
  number: string
  letter: string
  code: string
  background?: string
}

const steps: Step[] = [
  {
    number: '01',
    letter: 'A',
    code: '01',
  },
  {
    number: '02',
    letter: 'B',
    code: '02',
  },
  {
    number: '03',
    letter: 'C',
    code: '03',
  },
  {
    number: '04',
    letter: 'D',
    code: '04',
  },
  {
    number: '05',
    letter: 'E',
    code: '05',
  },
]

interface ProcessSectionProps {
  videoBackground?: string
}

const ProcessSection = ({
  videoBackground = '/videos/home-shapes.mp4',
}: ProcessSectionProps) => {
  const { t } = useLocale()
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [activeIndex, setActiveIndex] = useState(-1)

  const totalSteps = steps.length
  const totalPanels = totalSteps + 1

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const snapPoints = Array.from({ length: totalPanels }, (_, i) => i / totalSteps)

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const closest = snapPoints.reduce((prev, curr) =>
      Math.abs(curr - latest) < Math.abs(prev - latest) ? curr : prev
    )
    const newIndex = snapPoints.indexOf(closest) - 1
    setActiveIndex(newIndex)
  })

  const currentStepHasBackground =
    activeIndex >= 0 && !!steps[activeIndex]?.background

  const snappedProgress = useSpring(
    useTransform(scrollYProgress, snapPoints, snapPoints),
    { stiffness: 120, damping: 30 }
  )

  const x = useTransform(
    snappedProgress,
    [0, 1],
    ['0vw', `-${totalSteps * 100}vw`]
  )

  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const cameraPush = useTransform(scrollYProgress, [0, 1], [1.15, 1])
  const trailerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const trailerScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const inView = rect.top <= 0 && rect.bottom >= window.innerHeight

      if (!inView) return

      if (e.key === 'ArrowRight') {
        scrollToIndex(Math.min(activeIndex + 1, totalSteps - 1))
      }

      if (e.key === 'ArrowLeft') {
        scrollToIndex(Math.max(activeIndex - 1, -1))
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [activeIndex, totalSteps])

  const scrollToIndex = (index: number) => {
    if (!sectionRef.current) return

    const sectionTop = sectionRef.current.offsetTop
    const sectionHeight = sectionRef.current.offsetHeight
    const adjustedIndex = index + 1
    const target = sectionTop + (sectionHeight / totalSteps) * adjustedIndex

    window.scrollTo({
      top: target,
      behavior: 'smooth',
    })
  }

  return (
    <div
      id="process"
      ref={sectionRef}
      className="relative"
      style={{ height: `${totalPanels * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-screen overflow-hidden bg-black">
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-800 ${
            currentStepHasBackground ? 'opacity-0' : 'opacity-100'
          }`}
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={videoBackground} type="video/mp4" />
        </video>

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

        <div className="absolute inset-0 bg-black/40" />

        <motion.div
          style={{ opacity: trailerOpacity, scale: trailerScale }}
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
        >
          <TrailerText
            text={t.process.trailer}
            className="text-center text-6xl font-bold text-white/50 md:text-8xl lg:text-9xl"
          />
        </motion.div>

        <div className="absolute bottom-10 left-20 right-20 z-20 h-[2px] bg-white/20">
          <motion.div style={{ width: progressWidth }} className="h-full bg-white" />
        </div>

        <div className="absolute bottom-20 left-20 z-20 flex gap-3">
          {steps.map((step, index) => (
            <button
              key={step.code}
              onClick={() => scrollToIndex(index)}
              className={`h-3 w-3 rounded-full transition-all ${
                index === activeIndex
                  ? 'scale-125 bg-white'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        <motion.div
          style={{ x, scale: cameraPush }}
          className="absolute top-0 left-0 z-10 flex h-full items-center"
        >
          <div className="h-screen w-screen flex-shrink-0" />

          {steps.map((step, index) => (
            <div
              key={step.code}
              className="flex h-screen w-screen flex-shrink-0 items-center justify-center px-20"
            >
              <motion.div
                animate={{
                  opacity: activeIndex === index ? 1 : 0.4,
                  scale: activeIndex === index ? 1 : 0.95,
                }}
                transition={{ duration: 0.4 }}
                className="max-w-2xl text-white"
              >
                <div className="mb-8 flex items-baseline gap-4">
                  <span className="text-sm text-white/40">{step.number}</span>
                  <span className="text-8xl font-bold leading-none">
                    {step.letter}-{step.code}
                  </span>
                </div>

                <h3 className="mb-4 text-2xl font-semibold uppercase">
                  {t.process.steps[index]?.title}
                </h3>

                <p className="text-base leading-relaxed text-white/70">
                  {t.process.steps[index]?.description}
                </p>
              </motion.div>
            </div>
          ))}
        </motion.div>

        <div className="absolute bottom-28 left-1/2 z-20 -translate-x-1/2">
          <a
            href="#contact"
            className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-4 font-medium text-white shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:scale-105"
          >
            {t.process.cta}
          </a>
        </div>
      </div>
    </div>
  )
}

export default ProcessSection