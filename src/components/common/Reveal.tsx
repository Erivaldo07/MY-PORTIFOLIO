import  { motion} from 'framer-motion'
import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'

type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade'
type RevealEase = 'easeOut' | 'easeInOut' | 'easeIn' | 'spring' | 'anticipate'

type RevealProps = {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
  direction?: RevealDirection
  distance?: number
  ease?: RevealEase
  once?: boolean
  amount?: number
  stagger?: number
  staggerChildren?: number
  scale?: number
  rotate?: number
  blur?: boolean
  gradient?: boolean
  onComplete?: () => void
  threshold?: number
  rootMargin?: string
}

function Reveal({
  children,
  delay = 0,
  duration = 0.7,
  className = '',
  direction = 'up',
  distance = 40,
  ease = 'easeOut',
  once = true,
  amount = 0.15,
  stagger = 0,
  staggerChildren = 0,
  scale = 1,
  rotate = 0,
  blur = false,
  gradient = false,
  onComplete,
  threshold = 0.1,
  rootMargin = '0px'
}: RevealProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  // Configurações de animação baseadas na direção
  const getInitialPosition = (): MotionProps['initial'] => {
    const base = { opacity: 0, scale: scale !== 1 ? scale : undefined }

    switch (direction) {
      case 'up':
        return { ...base, y: distance }
      case 'down':
        return { ...base, y: -distance }
      case 'left':
        return { ...base, x: -distance }
      case 'right':
        return { ...base, x: distance }
      case 'scale':
        return { opacity: 0, scale: 0.8 }
      case 'fade':
        return { opacity: 0 }
      default:
        return { opacity: 0, y: distance }
    }
  }

  const getAnimationVariants = (): Variants => {
    const variants: Variants = {
      hidden: getInitialPosition(),
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
        blur: blur ? 0 : undefined,
        transition: {
          duration: duration,
          delay: delay / 1000,
          ease: ease === 'spring' ? [0.34, 1.56, 0.64, 1] :
                ease === 'anticipate' ? [0.6, -0.05, 0.01, 0.99] :
                ease === 'easeInOut' ? [0.65, 0, 0.35, 1] :
                [0.25, 0.46, 0.45, 0.94],
          ...(staggerChildren > 0 && {
            staggerChildren: staggerChildren / 1000,
            delayChildren: delay / 1000
          })
        }
      }
    }

    return variants
  }

  // Efeito para chamar onComplete
  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setHasAnimated(true)
      onComplete?.()
    }
  }, [isVisible, hasAnimated, onComplete])

  // Variants para stagger children
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerChildren > 0 ? staggerChildren / 1000 : undefined,
        delayChildren: delay / 1000
      }
    }
  }

  const childVariants: Variants = {
    hidden: getInitialPosition(),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        duration: duration,
        ease: ease === 'spring' ? [0.34, 1.56, 0.64, 1] :
              ease === 'anticipate' ? [0.6, -0.05, 0.01, 0.99] :
              ease === 'easeInOut' ? [0.65, 0, 0.35, 1] :
              [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  // Verifica se é um array de children para stagger
  const hasMultipleChildren = Array.isArray(children)

  // Componente principal
  const MotionComponent = motion.div

  // Configurações de viewport
  const viewportConfig = {
    once,
    amount: amount,
    ...(threshold && { margin: rootMargin })
  }

  // Se tiver stagger children
  if (staggerChildren > 0 && hasMultipleChildren) {
    return (
      <motion.div
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        variants={containerVariants}
        onViewportEnter={() => setIsVisible(true)}
      >
        {React.Children.map(children, (child) => (
          <motion.div variants={childVariants}>
            {child}
          </motion.div>
        ))}
      </motion.div>
    )
  }

  // Versão com efeito de blur
  if (blur) {
    return (
      <motion.div
        className={className}
        initial={{ ...getInitialPosition(), filter: 'blur(8px)' }}
        whileInView={{
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          rotate: 0,
          filter: 'blur(0px)'
        }}
        viewport={viewportConfig}
        transition={{
          duration: duration,
          delay: delay / 1000,
          ease: ease === 'spring' ? [0.34, 1.56, 0.64, 1] : [0.25, 0.46, 0.45, 0.94]
        }}
        onViewportEnter={() => setIsVisible(true)}
      >
        {children}
      </motion.div>
    )
  }

  // Versão com gradiente animado
  if (gradient) {
    return (
      <motion.div
        className={`relative ${className}`}
        initial={{
          ...getInitialPosition(),
          background: 'linear-gradient(135deg, transparent 0%, transparent 100%)'
        }}
        whileInView={{
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          rotate: 0,
          background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.05) 0%, rgba(124, 58, 237, 0.05) 100%)'
        }}
        viewport={viewportConfig}
        transition={{
          duration: duration * 1.2,
          delay: delay / 1000,
          ease: 'easeOut'
        }}
        onViewportEnter={() => setIsVisible(true)}
      >
        {children}
      </motion.div>
    )
  }

  // Versão padrão
  return (
    <motion.div
      className={className}
      initial={getInitialPosition()}
      whileInView="visible"
      viewport={viewportConfig}
      variants={getAnimationVariants()}
      onViewportEnter={() => setIsVisible(true)}
      style={{
        willChange: 'transform, opacity'
      }}
    >
      {children}
    </motion.div>
  )
}

// Componente auxiliar para revelar com efeito de linha
export function RevealLine({
  children,
  delay = 0,
  duration = 0.8,
  className = ''
}: Pick<RevealProps, 'children' | 'delay' | 'duration' | 'className'>) {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.1 }}
    >
      <motion.div
        initial={{ y: '100%' }}
        whileInView={{ y: '0%' }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{
          duration: duration,
          delay: delay / 1000,
          ease: [0.65, 0, 0.35, 1]
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

// Componente auxiliar para revelar com efeito de zoom
export function RevealZoom({
  children,
  delay = 0,
  scale = 1.2,
  className = ''
}: Pick<RevealProps, 'children' | 'delay' | 'className'> & { scale?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: scale }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.8,
        delay: delay / 1000,
        ease: [0.34, 1.56, 0.64, 1]
      }}
    >
      {children}
    </motion.div>
  )
}

// Componente auxiliar para revelar com rotação
export function RevealRotate({
  children,
  delay = 0,
  rotate = 15,
  className = ''
}: Pick<RevealProps, 'children' | 'delay' | 'className'> & { rotate?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, rotate: rotate, scale: 0.9 }}
      whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.8,
        delay: delay / 1000,
        ease: [0.34, 1.56, 0.64, 1]
      }}
    >
      {children}
    </motion.div>
  )
}

export default Reveal
