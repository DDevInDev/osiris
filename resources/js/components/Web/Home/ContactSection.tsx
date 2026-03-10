import { motion } from "framer-motion";
import { useState } from "react";
import { Send, Mail, Phone, MapPin, CheckCircle2, Sparkles } from "lucide-react";

interface FormData {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const ContactSection = () => {
  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "El nombre es requerido";
    }

    if (!form.email.trim()) {
      newErrors.email = "El correo es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Formato de correo inválido";
    }

    if (!form.message.trim()) {
      newErrors.message = "El mensaje es requerido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSuccess(true);

    setTimeout(() => {
      setForm({ name: "", phone: "", email: "", subject: "", message: "" });
      setIsSuccess(false);
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Correo electrónico",
      value: "contacto@osirisdev.com",
      link: "mailto:contacto@osirisdev.com",
    },
    {
      icon: Phone,
      label: "Teléfono / WhatsApp",
      value: "+52 656 135 7929",
      link: "tel:+526561357929",
    },
    {
      icon: MapPin,
      label: "Ubicación",
      value: "México / Estados Unidos",
      link: "#",
    },
  ];

  return (
    <section id="contacto" className="relative py-32 overflow-hidden">

      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
              <p className="text-sm tracking-[0.3em] uppercase text-indigo-400">
                Contacto
              </p>
              <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Hablemos de tu{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                próximo proyecto
              </span>
            </h2>

            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              Cuéntanos qué necesitas y nuestro equipo te ayudará a construir
              una solución digital que impulse el crecimiento de tu negocio.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8">

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-6"
            >

              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;

                  return (
                    <motion.a
                      key={info.label}
                      href={info.link}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="block p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-indigo-500/50 hover:bg-white/10 transition-all group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-indigo-400" />
                        </div>

                        <div>
                          <div className="text-sm text-white/50 mb-1">
                            {info.label}
                          </div>

                          <div className="text-white font-medium">
                            {info.value}
                          </div>
                        </div>
                      </div>
                    </motion.a>
                  );
                })}
              </div>

              {/* Info box */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/10"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-indigo-400" />
                  <h3 className="font-semibold">Qué esperar</h3>
                </div>

                <ul className="space-y-3 text-sm text-white/70">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    Respuesta en menos de 24 horas
                  </li>

                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                    Consulta inicial gratuita
                  </li>

                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                    Propuesta personalizada
                  </li>
                </ul>
              </motion.div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10">

                <form onSubmit={handleSubmit} className="space-y-6">

                  <div className="grid md:grid-cols-2 gap-4">

                    <input
                      type="text"
                      placeholder="Nombre completo *"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/40 focus:border-indigo-500 outline-none"
                    />

                    <input
                      type="tel"
                      placeholder="Teléfono"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/40 focus:border-indigo-500 outline-none"
                    />

                  </div>

                  <input
                    type="email"
                    placeholder="Correo electrónico *"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/40 focus:border-indigo-500 outline-none"
                  />

                  <textarea
                    rows={6}
                    placeholder="Cuéntanos sobre tu proyecto *"
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/40 focus:border-indigo-500 outline-none resize-none"
                  />

                  <div className="flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium flex items-center gap-2"
                    >
                      Enviar mensaje
                      <Send className="w-5 h-5" />
                    </motion.button>
                  </div>

                </form>

              </div>
            </motion.div>

          </div>
        </div>
      </div>

      <div className="dotted-line mt-24 mx-6" />
    </section>
  );
};

export default ContactSection;