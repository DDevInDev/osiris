import { BarChart3, Cpu, MessageCircle, TrendingUp } from "lucide-react";

const services = [
  {
    icon: BarChart3,
    title: "Consumer Insights",
    description: "We provide market research to help you understand your target audience and identify opportunities for growth.",
  },
  {
    icon: Cpu,
    title: "Technology Consulting",
    description: "Expert guidance on leveraging cutting-edge technology solutions to streamline operations and drive innovation.",
  },
  {
    icon: MessageCircle,
    title: "Consulting Service",
    description: "Comprehensive consulting services tailored to your business needs, from strategy to operational improvements.",
  },
  {
    icon: TrendingUp,
    title: "Private Consulting",
    description: "Exclusive one-on-one consulting sessions designed for executives and decision-makers at the highest level.",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 mb-16">
          <div>
            <p className="text-sm tracking-widest uppercase text-muted-foreground mb-3">What We Do</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              Elevate Your Business With<br />
              <span className="text-gradient">Osiris developments Tailored Solutions</span>
            </h2>
          </div>
          <p className="absolute right-6 top-0 text-[8rem] md:text-[10rem] font-display font-bold watermark-text leading-none select-none hidden lg:block">
            SERVICES
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-card border border-border rounded-2xl p-6 hover:border-accent/40 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                <service.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-3">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="dotted-line mt-24 mx-6" />
    </section>
  );
};

export default ServicesSection;
