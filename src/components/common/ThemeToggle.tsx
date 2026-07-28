import { Sun, Moon, Sparkles } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import {
  motion,
  AnimatePresence,
  type Variants,
  type TargetAndTransition,
} from "framer-motion";
import { useEffect, useState } from "react";

type ThemeToggleVariant = "icon" | "button" | "pill" | "full";

type ThemeToggleProps = {
  variant?: ThemeToggleVariant;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  withAnimation?: boolean;
  withSound?: boolean;
  withParticles?: boolean;
};

type Particle = {
  id: number;
  size: number;
};

function ThemeToggle({
  variant = "icon",
  showLabel = false,
  size = "md",
  className = "",
  withAnimation = true,
  withSound = false,
  withParticles = false,
}: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  const [isHovered, setIsHovered] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  const isDark = theme === "dark";

  // Tamanho dos elementos
  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
  };

  const iconSizes = {
    sm: 14,
    md: 18,
    lg: 22,
  };

  // Sistema de partículas
  useEffect(() => {
    if (!withParticles || !isToggling) return;

    const generatedParticles = Array.from({ length: 12 }, (_, index) => ({
      id: index,
      size: Math.random() * 6 + 2,
    }));

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setParticles(generatedParticles);

    const timer = setTimeout(() => setParticles([]), 800);
    return () => clearTimeout(timer);
  }, [isToggling, withParticles]);

  // Som da troca de tema
  const playSound = () => {
    if (!withSound) return;

    const AudioContext =
      window.AudioContext ||
      (window as typeof window & { webkitAudioContext: typeof window.AudioContext })
        .webkitAudioContext;

    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = isDark ? 440 : 880;
    oscillator.type = "sine";

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.2);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.2);
  };

  // Troca de tema
  const handleToggle = () => {
    if (isToggling) return;

    setIsToggling(true);
    playSound();
    toggleTheme();

    setTimeout(() => setIsToggling(false), 600);
  };

  // Animação do botão
  const buttonVariants: Variants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2, ease: "easeOut" },
    },
    tap: {
      scale: 0.92,
      transition: { duration: 0.1, ease: "easeOut" },
    },
    toggle: {
      rotate: isDark ? 360 : -360,
      transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
    },
  };

  // Animação do ícone
  const iconVariants: Variants = {
    initial: { rotate: 0, scale: 1 },
    toggle: {
      rotate: isDark ? 360 : -360,
      scale: [1, 1.2, 1],
      transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
    },
  };

  // Animação das partículas
  const particleVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: (index: number): TargetAndTransition => ({
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      x: [0, (Math.random() - 0.5) * 200],
      y: [0, (Math.random() - 0.5) * 200],
      transition: {
        duration: 0.8,
        delay: index * 0.05,
        ease: [0.42, 0, 0.58, 1],
      },
    }),
  };

  // Renderização das variantes
  const renderVariant = () => {
    const animationEnabled = withAnimation && true;

    switch (variant) {
      case "button":
        return (
          <motion.button
            onClick={handleToggle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`
              relative flex items-center gap-2
              px-4 py-2 rounded-xl
              font-medium
              bg-card border border-border
              hover:border-primary/50
              text-foreground hover:text-primary
              transition-all duration-300
              ${className}
            `}
            variants={animationEnabled ? buttonVariants : undefined}
            initial="initial"
            whileHover={animationEnabled ? "hover" : undefined}
            whileTap={animationEnabled ? "tap" : undefined}
            animate={animationEnabled && isToggling ? "toggle" : "initial"}
            aria-label="Alternar tema"
          >
            <motion.div variants={iconVariants} animate={isToggling ? "toggle" : "initial"}>
              {isDark ? (
                <Sun size={iconSizes[size]} className="text-yellow-500" />
              ) : (
                <Moon size={iconSizes[size]} className="text-indigo-500" />
              )}
            </motion.div>

            {showLabel && (
              <span className="text-sm">{isDark ? "Claro" : "Escuro"}</span>
            )}
          </motion.button>
        );

      case "pill":
        return (
          <motion.button
            onClick={handleToggle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`
              relative flex items-center gap-3
              px-3 py-1.5 rounded-full
              bg-card border border-border
              hover:border-primary/50
              text-foreground
              transition-all duration-300
              ${className}
            `}
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            animate={isToggling ? "toggle" : "initial"}
          >
            <div className="relative">
              <motion.div
                className={`
                  absolute inset-0 rounded-full
                  ${isDark ? "bg-yellow-500/20" : "bg-indigo-500/20"}
                `}
                animate={{
                  scale: isHovered ? 1.5 : 1,
                  opacity: isHovered ? 1 : 0.5,
                }}
              />

              <motion.div variants={iconVariants} animate={isToggling ? "toggle" : "initial"}>
                {isDark ? (
                  <Sun size={iconSizes[size]} className="text-yellow-500" />
                ) : (
                  <Moon size={iconSizes[size]} className="text-indigo-500" />
                )}
              </motion.div>
            </div>

            <div className="flex flex-col items-start">
              <span className="text-xs font-medium">
                {isDark ? "Modo Escuro" : "Modo Claro"}
              </span>
              <span className="text-[10px] text-muted-foreground">
                {isDark ? "Ativado" : "Desativado"}
              </span>
            </div>

            <div className={`w-8 h-4 rounded-full relative ${isDark ? "bg-primary" : "bg-muted"}`}>
              <motion.div
                className="absolute top-0.5 w-3 h-3 rounded-full bg-white shadow-md"
                animate={{ x: isDark ? 18 : 2 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </div>
          </motion.button>
        );

      case "full":
        return (
          <motion.button
            onClick={handleToggle}
            className={`
              relative flex items-center justify-between
              w-full px-4 py-3
              rounded-xl
              bg-card border border-border
              text-foreground
              ${className}
            `}
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            animate={isToggling ? "toggle" : "initial"}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isDark ? "bg-yellow-500/10" : "bg-indigo-500/10"}`}>
                <motion.div variants={iconVariants} animate={isToggling ? "toggle" : "initial"}>
                  {isDark ? (
                    <Sun size={iconSizes[size]} className="text-yellow-500" />
                  ) : (
                    <Moon size={iconSizes[size]} className="text-indigo-500" />
                  )}
                </motion.div>
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-medium">
                  {isDark ? "Modo Escuro" : "Modo Claro"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {isDark ? "Ativado" : "Desativado"}
                </span>
              </div>
            </div>

            <div
              className={`
                flex items-center gap-2
                px-2 py-1
                rounded-full text-xs
                ${isDark ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}
              `}
            >
              <Sparkles className="w-3 h-3" />
              <span>{isDark ? "Dark" : "Light"}</span>
            </div>
          </motion.button>
        );

      default:
        return (
          <motion.button
            onClick={handleToggle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`
              relative flex items-center justify-center
              rounded-full border border-border
              ${sizeClasses[size]}
              ${className}
            `}
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            animate={isToggling ? "toggle" : "initial"}
          >
            {withParticles &&
              particles.map((particle, index) => (
                <motion.div
                  key={particle.id}
                  className="absolute rounded-full bg-primary"
                  style={{
                    width: particle.size,
                    height: particle.size,
                    left: "50%",
                    top: "50%",
                  }}
                  variants={particleVariants}
                  initial="initial"
                  animate="animate"
                  custom={index}
                />
              ))}

            <motion.div
              className="relative z-10"
              variants={iconVariants}
              animate={isToggling ? "toggle" : "initial"}
            >
              {isDark ? (
                <Sun size={iconSizes[size]} className="text-yellow-500" />
              ) : (
                <Moon size={iconSizes[size]} className="text-indigo-500" />
              )}
            </motion.div>

            {showLabel && isHovered && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="
                  absolute -top-8 left-1/2 -translate-x-1/2
                  px-2 py-1 rounded text-xs
                  bg-foreground text-background
                  whitespace-nowrap
                "
              >
                {isDark ? "Claro" : "Escuro"}
              </motion.div>
            )}
          </motion.button>
        );
    }
  };

  return <AnimatePresence mode="wait">{renderVariant()}</AnimatePresence>;
}

export default ThemeToggle;
