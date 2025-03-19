
import { cn } from "@/lib/utils";
import { motion, MotionProps } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps extends MotionProps {
  children: ReactNode;
  className?: string;
  animateOnScroll?: boolean;
  delayMultiplier?: number;
}

const GlassCard = ({
  children,
  className,
  animateOnScroll = true,
  delayMultiplier = 0,
  ...motionProps
}: GlassCardProps) => {
  return (
    <motion.div
      initial={animateOnScroll ? { opacity: 0, y: 20 } : false}
      whileInView={animateOnScroll ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        type: "spring",
        damping: 25,
        stiffness: 100,
        delay: delayMultiplier * 0.1,
      }}
      whileHover={{ translateY: -5 }}
      className={cn(
        "glass rounded-2xl px-6 py-6 transition-all duration-300 hover:shadow-md",
        className
      )}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
