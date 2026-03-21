import { motion } from 'framer-motion'
import { useState } from 'react'
import { Send, Mail, Phone, MapPin, Sparkles } from 'lucide-react'
import { useLocale } from '@/contexts/LocaleContext'

interface FormData {
  name: string
  phone: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  phone?: string
  email?: string
  subject?: string
  message?: string
}

const ContactSection = () => {
  const { t } = useLocale()

  const [form, setForm] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!form.name.trim()) {
      newErrors.name = t.contact.form.errors.nameRequired
    }

    if (!form.email.trim()) {
      newErrors.email = t.contact.form.errors.emailRequired
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = t.contact.form.errors.emailInvalid
    }

    if (!form.message.trim()) {
      newErrors.message = t.contact.form.errors.messageRequired
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSuccess(true)

    setTimeout(() => {
      setForm({
        name: '',
        phone: '',
        email: '',
        subject: '',
        message: '',
      })
      setIsSuccess(false)
    }, 3000)
  }

  const contactInfo = [
    {
      icon: Mail,
      label: t.contact.info.emailLabel,
      value: 'contacto@osirisdev.com',
      link: 'mailto:contacto@osirisdev.com',
    },
    {
      icon: Phone,
      label: t.contact.info.phoneLabel,
      value: '+52 656 135 7929',
      link: 'tel:+526561357929',
    },
    {
      icon: MapPin,
      label: t.contact.info.locationLabel,
      value: t.contact.info.locationValue,
      link: '#',
    },
  ]

  return (
    <section id="contact" className="relative overflow-hidden py-32">
      <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[150px]" />
      <div className="absolute right-1/4 bottom-1/4 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[150px]" />

      <div className="relative z-10 container mx-auto px-6">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <div className="mb-4 inline-flex items-center gap-2">
              <div className="h-[2px] w-12 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
              <p className="text-sm uppercase tracking-[0.3em] text-indigo-400">
                {t.contact.badge}
              </p>
              <div className="h-[2px] w-12 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
            </div>

            <h2 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
              {t.contact.title}{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {t.contact.highlight}
              </span>
            </h2>

            <p className="mx-auto max-w-2xl text-lg text-white/60">
              {t.contact.description}
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-5">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6 lg:col-span-2"
            >
              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon

                  return (
                    <motion.a
                      key={info.label}
                      href={info.link}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="group block rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-indigo-500/50 hover:bg-white/10"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10">
                          <Icon className="h-5 w-5 text-indigo-400" />
                        </div>

                        <div>
                          <div className="mb-1 text-sm text-white/50">
                            {info.label}
                          </div>

                          <div className="font-medium text-white">
                            {info.value}
                          </div>
                        </div>
                      </div>
                    </motion.a>
                  )
                })}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-6"
              >
                <div className="mb-4 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-indigo-400" />
                  <h3 className="font-semibold">{t.contact.expectations.title}</h3>
                </div>

                <ul className="space-y-3 text-sm text-white/70">
                  {t.contact.expectations.items.map((item, index) => (
                    <li key={item} className="flex items-center gap-2">
                      <div
                        className={[
                          'h-1.5 w-1.5 rounded-full',
                          index === 0
                            ? 'bg-indigo-400'
                            : index === 1
                              ? 'bg-purple-400'
                              : 'bg-pink-400',
                        ].join(' ')}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <input
                        type="text"
                        placeholder={t.contact.form.namePlaceholder}
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none placeholder:text-white/40 focus:border-indigo-500"
                      />
                      {errors.name && (
                        <p className="mt-2 text-sm text-red-400">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <input
                        type="tel"
                        placeholder={t.contact.form.phonePlaceholder}
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none placeholder:text-white/40 focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder={t.contact.form.emailPlaceholder}
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none placeholder:text-white/40 focus:border-indigo-500"
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-400">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <textarea
                      rows={6}
                      placeholder={t.contact.form.messagePlaceholder}
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none placeholder:text-white/40 focus:border-indigo-500"
                    />
                    {errors.message && (
                      <p className="mt-2 text-sm text-red-400">{errors.message}</p>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isSubmitting}
                      className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-4 font-medium text-white disabled:opacity-70"
                    >
                      {isSubmitting
                        ? t.contact.form.submitting
                        : t.contact.form.submit}
                      <Send className="h-5 w-5" />
                    </motion.button>
                  </div>

                  {isSuccess && (
                    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                      {t.contact.form.success}
                    </div>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="dotted-line mx-6 mt-24" />
    </section>
  )
}

export default ContactSection