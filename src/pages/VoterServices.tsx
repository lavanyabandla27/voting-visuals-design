
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/ui-custom/GlassCard";
import PageTransition from "@/components/transitions/PageTransition";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  MapPin, 
  FileCheck, 
  HelpCircle, 
  Calendar, 
  UserCheck, 
  ExternalLink,
  BarChart4,
  Clock
} from "lucide-react";
import { VoterRegistration } from "@/components/voter-services/VoterRegistration";
import { PollingStation } from "@/components/voter-services/PollingStation";
import { ElectoralRoll } from "@/components/voter-services/ElectoralRoll";
import { FAQs } from "@/components/voter-services/FAQs";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";

const VoterServices = () => {
  const location = useLocation();
  const [nextElection, setNextElection] = useState({ days: 0, date: "January 15, 2025" });
  
  useEffect(() => {
    // Calculate days to next election (simulated)
    const today = new Date();
    const electionDate = new Date("2025-01-15");
    const timeDiff = electionDate.getTime() - today.getTime();
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    setNextElection({ days: dayDiff, date: "January 15, 2025" });
  }, []);

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
            <div className="inline-block mb-2">
              <Badge variant="outline" className="rounded-full px-4 py-1 text-sm font-medium border-primary/30 bg-primary/5">
                <Clock className="mr-1 h-4 w-4" />
                Next Election: {nextElection.days} Days to Go
              </Badge>
            </div>
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
            className="mt-16 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <GlassCard>
              <h2 className="text-2xl font-bold mb-4">Election Timeline</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Voter Registration Deadline</p>
                    <p className="text-sm text-muted-foreground">November 15, 2024</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <UserCheck className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Voter List Publication</p>
                    <p className="text-sm text-muted-foreground">December 1, 2024</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <BarChart4 className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">General Election</p>
                    <p className="text-sm text-muted-foreground">January 15, 2025</p>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Full Election Calendar
              </Button>
            </GlassCard>
            
            <GlassCard>
              <h2 className="text-2xl font-bold mb-4">Need Assistance?</h2>
              <p className="text-muted-foreground mb-4">
                Our support team is ready to help with any questions or issues related to voter services.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-md border">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </div>
                  <div>
                    <p className="font-medium">Helpline</p>
                    <p className="text-sm">1800-XXX-XXXX (Toll Free)</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 rounded-md border">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  </div>
                  <div>
                    <p className="font-medium">Email Support</p>
                    <p className="text-sm">support@election-commission.gov</p>
                  </div>
                </div>
              </div>
              <Button className="w-full mt-4">Contact Support</Button>
            </GlassCard>
          </motion.div>
        </div>
      </main>
      <Footer />
    </PageTransition>
  );
};

export default VoterServices;
