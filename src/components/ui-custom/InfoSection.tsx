
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface InfoSectionProps {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  centered?: boolean;
  topSpacing?: boolean;
  bottomSpacing?: boolean;
}

const InfoSection = ({
  children,
  className,
  title,
  subtitle,
  centered = false,
  topSpacing = true,
  bottomSpacing = true,
}: InfoSectionProps) => {
  return (
    <section
      className={cn(
        "w-full",
        topSpacing && "pt-16 md:pt-24",
        bottomSpacing && "pb-16 md:pb-24",
        className
      )}
    >
      <div className="container px-4 sm:px-6 mx-auto">
        {(title || subtitle) && (
          <div className={cn("mb-12", centered && "text-center")}>
            {title && (
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  type: "spring",
                  damping: 25,
                  stiffness: 100,
                }}
                className="text-balance text-3xl md:text-4xl font-medium tracking-tight mb-4"
              >
                {title}
              </motion.h2>
            )}
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  type: "spring",
                  damping: 25,
                  stiffness: 100,
                  delay: 0.1,
                }}
                className="text-balance text-lg text-muted-foreground max-w-3xl"
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        )}
        <div>{children}</div>
      </div>
    </section>
  );
};

export default InfoSection;
