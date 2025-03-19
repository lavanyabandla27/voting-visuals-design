
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import GlassCard from "@/components/ui-custom/GlassCard";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard className="text-center py-10" animateOnScroll={false}>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-6 mx-auto"
              >
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <span className="text-3xl font-bold">404</span>
                </div>
              </motion.div>
              <h1 className="text-2xl font-bold mb-3">Page Not Found</h1>
              <p className="text-muted-foreground mb-6">
                The page you are looking for doesn't exist or has been moved.
              </p>
              <Button asChild className="gap-2">
                <Link to="/">
                  <ArrowLeft size={16} />
                  Return to Home
                </Link>
              </Button>
            </GlassCard>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default NotFound;
