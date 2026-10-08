import { motion } from "framer-motion";
import TextGround from "./TextGround";

/** Small numbered index mark that sits above a section heading */
const SectionMarker = ({ index }: { index: string }) => (
  <TextGround className="mb-4">
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="flex items-center gap-3"
    >
      <span className="h-px w-6 bg-border" />
      <span className="font-body text-xs tracking-[0.35em] text-muted-foreground">{index}</span>
    </motion.div>
  </TextGround>
);

export default SectionMarker;
