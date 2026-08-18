import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Send,
  Clock,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Users,
  Coffee,
  Heart,
  ChevronDown,
} from 'lucide-react'
import Reveal, { RevealZoom } from '@/components/common/Reveal'
import { useTranslatedContact } from '@/hooks/useTranslatedContact'

function Contact() {
  const { t } = useTranslation('contact')
  const { contactMethods, socialLinks, metrics, faqs } = useTranslatedContact()

  const [activeFaq, setActiveFaq] = useState<number | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  // Ícones fixos das métricas rápidas, na mesma ordem do contact.json
  const metricIcons = [CheckCircle, Users, Coffee]
  const metricColors = ['text-green-500 bg-green-500/10', 'text-primary bg-primary/10', 'text-yellow-500 bg-yellow-500/10']

  return (
    <section className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-linear-to-bl from-primary/10 via-transparent to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-linear-to-tr from-primary/5 via-transparent to-transparent rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-8">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-primary/80 bg-primary/10 px-3 py-1 rounded-full">
                {t('badge')}
              </span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {t('availability')}
              </span>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Conteúdo da esquerda */}
            <div>
              <Reveal delay={100}>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                  {t('heroTitlePrefix')}{' '}
                  <span className="gradient-text">{t('heroTitleHighlight')}</span>{' '}
                  {t('heroTitleSuffix')}
                </h1>
              </Reveal>

              <Reveal delay={200}>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                  {t('heroDescription')}
                </p>
              </Reveal>

              <Reveal delay={300}>
                <button onClick={scrollToForm} className="btn-primary">
                  <Send size={18} />
                  {t('sendMessage')}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Reveal>

              {/* Métricas rápidas */}
              <Reveal delay={400} className="mt-8">
                <div className="flex flex-wrap gap-6 text-sm">
                  {metrics.map((metric, index) => {
                    const MetricIcon = metricIcons[index]
                    const [colorClass, bgClass] = metricColors[index].split(' ')
                    return (
                      <div key={metric.label} className="flex items-center gap-2">
                        <div className={`p-1.5 rounded-lg ${bgClass}`}>
                          <MetricIcon className={`w-4 h-4 ${colorClass}`} />
                        </div>
                        <div>
                          <span className="block font-medium">{metric.value}</span>
                          <span className="text-xs text-muted-foreground">
                            {metric.label}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </Reveal>
            </div>

            {/* Lado direito - Métodos de Contato */}
            <RevealZoom delay={200}>
              <div className="grid grid-cols-2 gap-4">
                {contactMethods.map((method, index) => (
                  <a
                    key={index}
                    href={method.href}
                    target={method.label === t('methods.3.label') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="group p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-center"
                  >
                    <div
                      className="flex justify-center mb-2"
                      style={{ color: method.color }}
                    >
                      <method.icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    </div>
                    <p className="text-xs font-medium text-foreground">{method.label}</p>
                    <p className="text-xs text-muted-foreground truncate">{method.value}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      {method.description}
                    </p>
                  </a>
                ))}
              </div>
            </RevealZoom>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <Reveal>
          <div className="text-center mb-12">
            <span className="text-xs font-mono uppercase tracking-wider text-primary/80 bg-primary/10 px-3 py-1 rounded-full">
              {t('faqBadge')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-4">
              {t('faqTitlePrefix')}{' '}
              <span className="gradient-text">{t('faqTitleHighlight')}</span>
            </h2>
          </div>
        </Reveal>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <Reveal key={index} delay={index * 50}>
              <motion.div
                className="bg-card/30 border border-border/50 rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-300"
                animate={{
                  boxShadow:
                    activeFaq === index ? '0 4px 20px rgba(79, 70, 229, 0.1)' : 'none',
                }}
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-muted/20 transition-colors"
                >
                  <span className="font-medium text-sm">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: activeFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {activeFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4 text-sm text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Social & CTA Final */}
      <div className="border-t border-border/50 bg-card/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 text-center">
          <Reveal>
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-2xl bg-primary/10">
                <Heart className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              {t('socialTitlePrefix')}{' '}
              <span className="gradient-text">{t('socialTitleHighlight')}</span>
            </h2>
            <p className="text-muted-foreground mb-6">{t('socialDescription')}</p>

            <div className="flex justify-center gap-3 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-muted/30 hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Sparkles className="w-3 h-3 text-primary" />
              <span>{t('availableNow')}</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
              <span>{t('responseTime')}</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default Contact
