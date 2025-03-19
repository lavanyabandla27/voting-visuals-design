
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedHeroProps {
  children: ReactNode;
  className?: string;
  backgroundImage?: string;
  overlay?: boolean;
}

const AnimatedHero = ({
  children,
  className,
  backgroundImage,
  overlay = true,
}: AnimatedHeroProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={cn(
        "relative w-full min-h-[85vh] flex flex-col items-center justify-center px-6",
        backgroundImage ? "overflow-hidden" : "",
        className
      )}
    >
      {backgroundImage && (
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 w-full h-full z-0"
        >
          <div
            className="absolute inset-0 w-full h-full bg-center bg-cover"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          {overlay && (
            <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
          )}
        </motion.div>
      )}
      <div className="z-10 container">{children}</div>
      <div className="absolute bottom-0 left-0 right-0 h-20 hero-gradient" />
    </motion.div>
  );
};

export default AnimatedHero;
