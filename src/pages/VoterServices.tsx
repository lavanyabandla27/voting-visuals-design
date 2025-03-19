
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/ui-custom/GlassCard";
import PageTransition from "@/components/transitions/PageTransition";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, MapPin, FileCheck, HelpCircle } from "lucide-react";
import { VoterRegistration } from "@/components/voter-services/VoterRegistration";
import { PollingStation } from "@/components/voter-services/PollingStation";
import { ElectoralRoll } from "@/components/voter-services/ElectoralRoll";
import { FAQs } from "@/components/voter-services/FAQs";

const VoterServices = () => {
  const location = useLocation();

  const services = [
    {
      title: "Voter Registration",
      description: "Register to vote or update your existing registration details.",
      icon: <CheckCircle className="h-8 w-8 text-primary" />,
      action: <VoterRegistration />
    },
    {
      title: "Find Polling Station",
      description: "Locate your designated polling station for upcoming elections.",
      icon: <MapPin className="h-8 w-8 text-primary" />,
      action: <PollingStation />
    },
    {
      title: "Electoral Roll",
      description: "Check if your name appears on the electoral roll.",
      icon: <FileCheck className="h-8 w-8 text-primary" />,
      action: <ElectoralRoll />
    },
    {
      title: "Frequently Asked Questions",
      description: "Find answers to common questions about voting and elections.",
      icon: <HelpCircle className="h-8 w-8 text-primary" />,
      action: <FAQs />
    }
  ];

  return (
    <PageTransition location={location.pathname}>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-4">Voter Services</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Access essential voter services to ensure your participation in the democratic process.
              We're here to help you exercise your right to vote.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlassCard className="h-full">
                  <div className="flex flex-col h-full">
                    <div className="mb-4">{service.icon}</div>
                    <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
                    <p className="text-muted-foreground mb-6 flex-grow">{service.description}</p>
                    {service.action}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 max-w-3xl mx-auto"
          >
            <GlassCard>
              <h2 className="text-2xl font-bold mb-4">Need Assistance?</h2>
              <p className="text-muted-foreground mb-4">
                Our support team is ready to help with any questions or issues related to voter services.
                Contact us via email or phone for prompt assistance.
              </p>
              <Button variant="outline" className="w-full sm:w-auto">Contact Support</Button>
            </GlassCard>
          </motion.div>
        </div>
      </main>
      <Footer />
    </PageTransition>
  );
};

export default VoterServices;
