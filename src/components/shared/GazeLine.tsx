import { motion } from "framer-motion";

interface GazeLineProps {
  className?: string;
  width?: number;
}
export default function GazeLine({ className = "", width = 120 }: GazeLineProps) {
  return (
    <motion.svg
      width={width}
      height={width * 0.28}
      viewBox="0 0 120 34"
      fill="none"
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6 }}
    >
      <motion.path
        d="M2 26 C 30 2, 90 2, 118 26"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.svg>
  );
}
