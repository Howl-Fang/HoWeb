import { motion } from "framer-motion";

/** Small numbered index mark that sits above a section heading */
const SectionMarker = ({ index }: { index: string }) => (
  <motion.div
    aria-hidden="true"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6 }}
    className="mb-4 flex items-center gap-3"
  >
    <span className="h-px w-6 bg-highlight-line" />
    <span className="font-body text-xs tracking-[0.35em] text-highlight">{index}</span>
  </motion.div>
);

export default SectionMarker;
