
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/ui-custom/GlassCard";
import PageTransition from "@/components/transitions/PageTransition";
import { useLocation } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

const About = () => {
  const location = useLocation();

  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Election Commissioner",
      bio: "15+ years of experience in electoral processes and governance."
    },
    {
      name: "Priya Sharma",
      role: "Chief Technology Officer",
      bio: "Leading digital transformation of election systems."
    },
    {
      name: "Marcus Chen",
      role: "Voter Education Director",
      bio: "Dedicated to increasing voter participation through education."
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
            <h1 className="text-4xl font-bold mb-4">About ElectionCentral</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our mission is to strengthen democracy by making election information transparent, 
              accessible, and engaging for all citizens.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <GlassCard>
                <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                <p className="text-muted-foreground mb-4">
                  ElectionCentral envisions a democracy where every citizen has easy access to 
                  accurate information about elections, candidates, and voting processes. We believe 
                  that an informed electorate is essential for a healthy democratic system.
                </p>
                <p className="text-muted-foreground mb-4">
                  Established in 2020, our platform has grown to serve millions of voters, providing 
                  real-time election results, voter education resources, and tools to simplify the 
                  voting process. We work in partnership with election authorities across the country 
                  to ensure that our data is accurate and up-to-date.
                </p>
                <p className="text-muted-foreground">
                  Our team of dedicated professionals combines expertise in electoral systems, 
                  technology, and civic education to create a platform that empowers voters and 
                  strengthens democratic participation.
                </p>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:col-span-2"
            >
              <GlassCard className="h-full">
                <h2 className="text-2xl font-bold mb-4">Core Values</h2>
                <ul className="space-y-4">
                  <li>
                    <h3 className="font-medium">Transparency</h3>
                    <p className="text-muted-foreground">
                      We believe in complete transparency in the electoral process.
                    </p>
                  </li>
                  <li>
                    <h3 className="font-medium">Accessibility</h3>
                    <p className="text-muted-foreground">
                      Making election information accessible to everyone regardless of ability.
                    </p>
                  </li>
                  <li>
                    <h3 className="font-medium">Accuracy</h3>
                    <p className="text-muted-foreground">
                      Committed to providing accurate and verified election data.
                    </p>
                  </li>
                  <li>
                    <h3 className="font-medium">Impartiality</h3>
                    <p className="text-muted-foreground">
                      We remain politically neutral, focusing only on facilitating the democratic process.
                    </p>
                  </li>
                </ul>
              </GlassCard>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">Our Leadership Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {teamMembers.map((member, index) => (
                <GlassCard key={member.name} className="text-center">
                  <div className="h-20 w-20 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-xl font-bold">{member.name.charAt(0)}</span>
                  </div>
                  <h3 className="font-bold text-lg">{member.name}</h3>
                  <p className="text-primary mb-2">{member.role}</p>
                  <p className="text-muted-foreground">{member.bio}</p>
                </GlassCard>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <GlassCard>
              <h2 className="text-2xl font-bold mb-4">Our Partners</h2>
              <p className="text-muted-foreground mb-6">
                ElectionCentral works closely with government agencies, non-profit organizations,
                and technology partners to enhance the democratic process through innovation and
                collaboration.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-24 border border-border rounded-md flex items-center justify-center">
                    <span className="text-muted-foreground font-medium">Partner {i + 1}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </main>
      <Footer />
    </PageTransition>
  );
};

export default About;
