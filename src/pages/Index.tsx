
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  CheckCircle,
  ChevronDown,
  Map,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import AnimatedHero from "@/components/ui-custom/AnimatedHero";
import GlassCard from "@/components/ui-custom/GlassCard";
import InfoSection from "@/components/ui-custom/InfoSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <StatisticsSection />
        <UpcomingElectionsSection />
        <VoterServicesSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
};

const HeroSection = () => {
  return (
    <AnimatedHero className="pt-20">
      <div className="max-w-3xl mx-auto text-center pt-10 md:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-1.5 bg-primary/10 border border-primary/20 px-3 py-1 rounded-full text-sm font-medium mb-6"
        >
          <span className="flex h-2 w-2 rounded-full bg-primary" />
          <span>Elections 2024</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-balance"
        >
          Your Voice, Your{" "}
          <span className="text-primary underline decoration-4 underline-offset-2 decoration-primary/30">
            Vote
          </span>
          , Your Future
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-muted-foreground mb-8 mx-auto max-w-2xl text-balance"
        >
          Empowering citizens with accessible, accurate election information.
          Register to vote, find your polling station, and stay informed about
          the electoral process.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 justify-center"
        >
          <Link to="/login">
            <Button size="lg" className="rounded-full px-6 gap-2">
              Register to Vote
              <ArrowRight size={16} />
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-6"
            asChild
          >
            <Link to="/results">View Results</Link>
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-16 md:mt-20 w-full max-w-3xl mx-auto"
      >
        <GlassCard className="overflow-hidden" animateOnScroll={false}>
          <Tabs defaultValue="voter-id" className="w-full">
            <TabsList className="grid grid-cols-3 w-full mb-6">
              <TabsTrigger value="voter-id">Find Voter ID</TabsTrigger>
              <TabsTrigger value="polling">Polling Station</TabsTrigger>
              <TabsTrigger value="status">Application Status</TabsTrigger>
            </TabsList>
            <TabsContent value="voter-id" className="px-1">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <Input
                    placeholder="Enter your EPIC number or mobile"
                    className="h-11"
                  />
                </div>
                <Button className="h-11 px-6">Search</Button>
              </div>
            </TabsContent>
            <TabsContent value="polling" className="px-1">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <Input
                    placeholder="Enter your address or postal code"
                    className="h-11"
                  />
                </div>
                <Button className="h-11 px-6">Locate</Button>
              </div>
            </TabsContent>
            <TabsContent value="status" className="px-1">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <Input
                    placeholder="Enter your Reference ID"
                    className="h-11"
                  />
                </div>
                <Button className="h-11 px-6">Check Status</Button>
              </div>
            </TabsContent>
          </Tabs>
        </GlassCard>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="flex justify-center mt-16"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          <ChevronDown className="text-muted-foreground/70" />
        </motion.div>
      </motion.div>
    </AnimatedHero>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Voter Registration",
      description:
        "Quick and easy voter registration process with real-time status updates.",
    },
    {
      icon: <Map className="h-6 w-6" />,
      title: "Polling Station Locator",
      description:
        "Find your nearest polling station with directions and accessibility information.",
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Election Calendar",
      description:
        "Stay updated with important dates and events in the election cycle.",
    },
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      title: "Secure Voting",
      description:
        "Advanced security measures to ensure the integrity of your vote.",
    },
  ];

  return (
    <InfoSection
      title="Empowering Democracy"
      subtitle="Our platform provides essential tools and information to make your electoral participation seamless and informed."
      centered
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <GlassCard key={index} delayMultiplier={index}>
            <div className="p-2 mb-4 rounded-full bg-primary/10 w-fit">
              {feature.icon}
            </div>
            <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </GlassCard>
        ))}
      </div>
    </InfoSection>
  );
};

const StatisticsSection = () => {
  const stats = [
    { value: "900M+", label: "Registered Voters" },
    { value: "543", label: "Parliamentary Constituencies" },
    { value: "4120", label: "Assembly Constituencies" },
    { value: "1.1M", label: "Polling Stations" },
  ];

  return (
    <section className="bg-primary/5 py-16 md:py-24">
      <div className="container px-4 sm:px-6 mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 100,
                delay: index * 0.1,
              }}
              className="text-center"
            >
              <p className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
                {stat.value}
              </p>
              <p className="text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const UpcomingElectionsSection = () => {
  const elections = [
    {
      state: "General Elections",
      date: "April - May 2024",
      status: "Upcoming",
    },
    {
      state: "Maharashtra",
      date: "November 2024",
      status: "Scheduled",
    },
    {
      state: "Haryana",
      date: "October 2024",
      status: "Scheduled",
    },
    {
      state: "Jharkhand",
      date: "December 2024",
      status: "Scheduled",
    },
  ];

  return (
    <InfoSection
      title="Upcoming Elections"
      subtitle="Stay informed about upcoming elections across the country."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {elections.map((election, index) => (
          <GlassCard
            key={index}
            className="flex justify-between items-center"
            delayMultiplier={index}
          >
            <div>
              <h3 className="text-xl font-medium">{election.state}</h3>
              <p className="text-muted-foreground">{election.date}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-primary" />
              <span className="text-sm font-medium">{election.status}</span>
            </div>
          </GlassCard>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Button variant="outline" className="rounded-full px-6">
          View All Elections
        </Button>
      </div>
    </InfoSection>
  );
};

const VoterServicesSection = () => {
  const services = [
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "New Voter Registration",
      description: "Register as a new voter and get your Voter ID.",
      link: "#",
    },
    {
      icon: <Search className="h-6 w-6" />,
      title: "Search Your Name",
      description: "Check if your name is in the electoral roll.",
      link: "#",
    },
    {
      icon: <Map className="h-6 w-6" />,
      title: "Track Application",
      description: "Track the status of your application.",
      link: "#",
    },
  ];

  return (
    <InfoSection
      title="Voter Services"
      subtitle="Access a range of services to make your voting experience hassle-free."
      className="bg-primary/5"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <GlassCard
            key={index}
            className="flex flex-col h-full"
            delayMultiplier={index}
          >
            <div className="p-2 mb-4 rounded-full bg-primary/10 w-fit">
              {service.icon}
            </div>
            <h3 className="text-xl font-medium mb-2">{service.title}</h3>
            <p className="text-muted-foreground mb-4">{service.description}</p>
            <div className="mt-auto">
              <Link
                to={service.link}
                className="text-primary flex items-center gap-1 font-medium hover:underline"
              >
                Access Service
                <ArrowRight size={16} />
              </Link>
            </div>
          </GlassCard>
        ))}
      </div>
    </InfoSection>
  );
};

const FAQSection = () => {
  return (
    <InfoSection title="Frequently Asked Questions" centered>
      <div className="max-w-3xl mx-auto">
        <GlassCard className="mb-4">
          <h3 className="text-lg font-medium mb-2">
            How do I register as a voter?
          </h3>
          <p className="text-muted-foreground">
            You can register as a voter online through our portal or by visiting
            your nearest Election Commission office. Follow the simple steps and
            submit the required documents to complete your registration.
          </p>
        </GlassCard>

        <GlassCard className="mb-4" delayMultiplier={1}>
          <h3 className="text-lg font-medium mb-2">
            What documents are required for voter registration?
          </h3>
          <p className="text-muted-foreground">
            You'll need proof of identity (Aadhar, passport, driving license),
            proof of address, and a recent passport-sized photograph. Additional
            documents may be required based on your specific situation.
          </p>
        </GlassCard>

        <GlassCard className="mb-4" delayMultiplier={2}>
          <h3 className="text-lg font-medium mb-2">
            How can I find my polling station?
          </h3>
          <p className="text-muted-foreground">
            You can find your polling station by entering your Voter ID or
            address in the "Polling Station Locator" tool on our website. We
            also send this information through SMS to registered mobile numbers.
          </p>
        </GlassCard>

        <div className="text-center mt-10">
          <Button className="rounded-full px-6">View All FAQs</Button>
        </div>
      </div>
    </InfoSection>
  );
};

export default Index;
