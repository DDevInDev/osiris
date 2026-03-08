import { motion } from "framer-motion";

const BlackTransition = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      whileInView={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      viewport={{ once: true }}
      className="h-40 bg-black"
    />
  );
};

export default BlackTransition;
