import { motion } from "framer-motion";

/**
 * Wraps a section/element and gently fades + slides it up when scrolled into
 * view. Keeps existing layout/spacing untouched — only animates opacity/transform.
 */
export default function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}