import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
            <p className="text-sm tracking-[0.3em] uppercase text-indigo-400 font-medium">
              About Us
            </p>
            <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
            Transforming Vision
            <br />
            Into{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Reality
            </span>
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-stretch gap-8">
          
          {/* LEFT: Main Content Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex-[2] relative"
          >
            <div className="relative h-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden">
              {/* Decorative corner gradients */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-500/20 to-transparent rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-full blur-3xl" />

              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-display font-bold mb-6">
                  Comprehensive Business
                  <br />
                  Management Consulting
                </h3>

                <p className="text-white/70 leading-relaxed text-lg mb-8">
                  Based in the US, we bring cutting-edge strategies and industry expertise to unlock potential growth avenues. Our diverse and experienced team is dedicated to actionable solutions that transform your business.
                </p>

                <div className="space-y-4">
                  {[
                    {
                      title: "Strategic Excellence",
                      description: "Tailored strategies that align with your business goals and market dynamics",
                    },
                    {
                      title: "Proven Track Record",
                      description: "Decades of combined experience delivering measurable results",
                    },
                    {
                      title: "Client-Centric Approach",
                      description: "Your success is our priority—we're committed to long-term partnerships",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 * index }}
                      viewport={{ once: true }}
                      className="flex gap-4 items-start"
                    >
                      <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 mt-2" />
                      <div>
                        <h4 className="font-semibold mb-1">{item.title}</h4>
                        <p className="text-sm text-white/60">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Stats Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex-1 flex flex-col gap-6"
          >
            {/* Stat Card 1 */}
            <div className="relative bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-sm border border-white/10 rounded-3xl p-8 overflow-hidden group hover:scale-[1.02] transition-transform">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="text-5xl md:text-6xl font-display font-bold bg-gradient-to-br from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  10+
                </div>
                <p className="text-white/80 font-medium">Years of Excellence</p>
                <p className="text-sm text-white/50 mt-2">
                  Delivering innovative solutions across industries
                </p>
              </div>
            </div>

            {/* Stat Card 2 */}
            <div className="relative bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-white/10 rounded-3xl p-8 overflow-hidden group hover:scale-[1.02] transition-transform">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="text-5xl md:text-6xl font-display font-bold bg-gradient-to-br from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  500+
                </div>
                <p className="text-white/80 font-medium">Projects Completed</p>
                <p className="text-sm text-white/50 mt-2">
                  From startups to Fortune 500 companies
                </p>
              </div>
            </div>

            {/* Stat Card 3 */}
            <div className="relative bg-gradient-to-br from-pink-500/10 to-indigo-500/10 backdrop-blur-sm border border-white/10 rounded-3xl p-8 overflow-hidden group hover:scale-[1.02] transition-transform">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="text-5xl md:text-6xl font-display font-bold bg-gradient-to-br from-pink-400 to-indigo-400 bg-clip-text text-transparent mb-2">
                  98%
                </div>
                <p className="text-white/80 font-medium">Client Satisfaction</p>
                <p className="text-sm text-white/50 mt-2">
                  Built on trust and exceptional results
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Dotted line separator */}
      <div className="dotted-line mt-24 mx-6" />
    </section>
  );
};

export default AboutSection;