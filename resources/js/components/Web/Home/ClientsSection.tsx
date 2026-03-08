import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { X, ArrowRight, TrendingUp, Target, Zap } from "lucide-react";

interface ClientCase {
  name: string;
  industry: string;
  description: string;
  challenge: string;
  solution: string;
  results: {
    metric: string;
    value: string;
    icon: "trending" | "target" | "zap";
  }[];
  tags: string[];
  photo: string;
  logo?: string;
  url?: string;
}

const clients: ClientCase[] = [
  {
    name: "TechNova",
    industry: "AI & SaaS",
    description: "AI-driven analytics platform transforming enterprise data intelligence.",
    challenge: "42% user drop-off during onboarding, retention crisis threatening growth trajectory.",
    solution: "Implemented intelligent onboarding flow with contextual AI guidance, automated user segmentation, and predictive engagement triggers.",
    results: [
      { metric: "Retention Rate", value: "+42%", icon: "trending" },
      { metric: "Onboarding Time", value: "-58%", icon: "zap" },
      { metric: "User Activation", value: "+67%", icon: "target" },
    ],
    tags: ["Product Strategy", "UX Optimization", "Automation"],
    photo: "/images/fondo.png",
  },
  {
    name: "UrbanFit",
    industry: "E-commerce & Fitness",
    description: "Direct-to-consumer fitness equipment and digital wellness platform.",
    challenge: "Inefficient ad spend with ROAS below 1.5x, struggling to scale profitably.",
    solution: "Rebuilt conversion funnel architecture, implemented dynamic pricing engine, and launched multi-touch attribution system.",
    results: [
      { metric: "ROAS", value: "2.4x", icon: "trending" },
      { metric: "CAC Reduction", value: "-34%", icon: "zap" },
      { metric: "AOV Growth", value: "+52%", icon: "target" },
    ],
    tags: ["Growth Marketing", "Conversion Rate", "Analytics"],
    photo: "/images/5486.png",
  },
  {
    name: "FinCore",
    industry: "Fintech",
    description: "Digital lending platform for underserved SME market segments.",
    challenge: "Zero organic presence, 100% paid acquisition dependency limiting growth velocity.",
    solution: "Developed thought leadership content engine, technical SEO infrastructure, and strategic partnership network.",
    results: [
      { metric: "Organic Traffic", value: "+312%", icon: "trending" },
      { metric: "Lead Quality", value: "+89%", icon: "target" },
      { metric: "CAC Reduction", value: "-45%", icon: "zap" },
    ],
    tags: ["Content Strategy", "SEO", "Authority Building"],
    photo: "/images/process-bg.jpg",
  },
];

const iconMap = {
  trending: TrendingUp,
  target: Target,
  zap: Zap,
};

const ClientsSection = () => {
  const [selectedClient, setSelectedClient] = useState<ClientCase | null>(null);

  useEffect(() => {
    if (selectedClient) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedClient]);

  return (
    <>
      <section id="clients" className="relative py-32 overflow-hidden">
        {/* Ambient Effects */}
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
              <p className="text-sm tracking-[0.3em] uppercase text-indigo-400">
                Case Studies
              </p>
              <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Engineered for{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Impact
              </span>
            </h2>

            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              Data-driven transformations that deliver measurable business outcomes
            </p>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {clients.map((client, index) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setSelectedClient(client)}
                className="group relative rounded-2xl overflow-hidden bg-white/[0.02] backdrop-blur-sm border border-white/10 hover:border-indigo-500/50 transition-all duration-500 cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${client.photo})` }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

                  {/* Floating tag */}
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs text-white/80">
                    {client.industry}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-indigo-400 transition-colors">
                      {client.name}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed line-clamp-2">
                      {client.description}
                    </p>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-2">
                    {client.results.slice(0, 3).map((result, i) => {
                      const Icon = iconMap[result.icon];
                      return (
                        <div
                          key={i}
                          className="text-center p-2 rounded-lg bg-white/5"
                        >
                          <Icon className="w-4 h-4 mx-auto mb-1 text-indigo-400" />
                          <div className="text-lg font-bold text-white">
                            {result.value}
                          </div>
                          <div className="text-[10px] text-white/50 uppercase">
                            {result.metric.split(" ")[0]}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {client.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <button className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-white/10 text-sm font-medium hover:bg-white/5 hover:border-indigo-500/50 transition-all group-hover:border-indigo-500/50">
                    View Full Case
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/10 to-transparent" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="dotted-line mt-24 mx-6" />
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedClient && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedClient(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-6"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-3xl shadow-2xl overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedClient(null)}
                className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              <div className="grid lg:grid-cols-2 min-h-[600px]">

                {/* LEFT COLUMN */}
                <div className="relative bg-black flex flex-col justify-between">
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-30"
                    style={{ backgroundImage: `url(${selectedClient.photo})` }}
                  />
                  <div className="relative p-10 space-y-6">
                    <div className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs text-white/80">
                      {selectedClient.industry}
                    </div>

                    <h3 className="text-4xl font-bold text-white">
                      {selectedClient.name}
                    </h3>

                    <p className="text-white/70 leading-relaxed">
                      {selectedClient.description}
                    </p>

                    <a
                      href={selectedClient.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      Visit Website
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="p-10 space-y-10 overflow-y-auto max-h-[80vh]">

                  {/* Metrics */}
                  <div>
                    <h4 className="text-sm uppercase tracking-wider text-indigo-400 mb-4">
                      Key Metrics
                    </h4>

                    <div className="grid grid-cols-3 gap-4">
                      {selectedClient.results.map((result, i) => {
                        const Icon = iconMap[result.icon];
                        return (
                          <div
                            key={i}
                            className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center"
                          >
                            <Icon className="w-6 h-6 mx-auto mb-3 text-indigo-400" />
                            <div className="text-3xl font-bold text-white mb-1">
                              {result.value}
                            </div>
                            <div className="text-sm text-white/60">
                              {result.metric}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Challenge */}
                  <div>
                    <h4 className="text-sm uppercase tracking-wider text-indigo-400 mb-3">
                      The Challenge
                    </h4>
                    <p className="text-white/80 leading-relaxed">
                      {selectedClient.challenge}
                    </p>
                  </div>

                  {/* Solution */}
                  <div>
                    <h4 className="text-sm uppercase tracking-wider text-purple-400 mb-3">
                      Our Approach
                    </h4>
                    <p className="text-white/80 leading-relaxed">
                      {selectedClient.solution}
                    </p>
                  </div>

                  {/* Tags */}
                  <div>
                    <h4 className="text-sm uppercase tracking-wider text-white/60 mb-3">
                      Services Applied
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedClient.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-4 py-2 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="pt-6">
                    <button className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:scale-[1.02] transition-transform">
                      Start Your Transformation
                    </button>
                  </div>

                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
};

export default ClientsSection;