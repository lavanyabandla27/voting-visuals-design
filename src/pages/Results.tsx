
import { motion } from "framer-motion";
import {
  BarChart3,
  Calendar,
  ChevronDown,
  Download,
  Filter,
  Map as MapIcon,
  PieChart,
} from "lucide-react";
import { useState } from "react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ElectionMap from "@/components/ui-custom/ElectionMap";
import GlassCard from "@/components/ui-custom/GlassCard";
import InfoSection from "@/components/ui-custom/InfoSection";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// Mock data for charts
const partyColors = {
  PartyA: "#4361ee",
  PartyB: "#ef476f",
  PartyC: "#06d6a0",
  PartyD: "#ffd166",
  Others: "#8d99ae",
};

const Results = () => {
  const [selectedState, setSelectedState] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("2024");

  const states = [
    { value: "all", label: "All States" },
    { value: "ap", label: "Andhra Pradesh" },
    { value: "ar", label: "Arunachal Pradesh" },
    { value: "as", label: "Assam" },
    { value: "br", label: "Bihar" },
  ];

  const years = [
    { value: "2024", label: "2024" },
    { value: "2019", label: "2019" },
    { value: "2014", label: "2014" },
    { value: "2009", label: "2009" },
  ];

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <HeroSection />
        <ResultsSection
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          states={states}
          years={years}
        />
        <MapSection />
        <TrendsSection />
      </main>
      <Footer />
    </>
  );
};

const HeroSection = () => {
  return (
    <section className="relative bg-primary/5 py-16 md:py-24 overflow-hidden">
      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-bold mb-6"
          >
            Election Results
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-muted-foreground mb-8 max-w-2xl"
          >
            Explore comprehensive election results with interactive visualizations.
            Filter by state, year, and view detailed statistics.
          </motion.p>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-full md:w-1/2 h-full opacity-10 pointer-events-none">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 800 800"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="dotPattern"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="2" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dotPattern)" />
        </svg>
      </div>
    </section>
  );
};

interface ResultsSectionProps {
  selectedState: string;
  setSelectedState: (state: string) => void;
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  states: { value: string; label: string }[];
  years: { value: string; label: string }[];
}

const ResultsSection = ({
  selectedState,
  setSelectedState,
  selectedYear,
  setSelectedYear,
  states,
  years,
}: ResultsSectionProps) => {
  return (
    <InfoSection>
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl md:text-3xl font-semibold">
          {selectedYear} Election Results
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-3">
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year.value} value={year.value}>
                    {year.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent>
                {states.map((state) => (
                  <SelectItem key={state.value} value={state.value}>
                    {state.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button variant="outline" size="icon">
            <Filter size={16} />
          </Button>

          <Button variant="outline" className="gap-2">
            <Download size={16} />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <GlassCard>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-medium">Overall Turnout</h3>
            <span className="text-2xl font-semibold">67.2%</span>
          </div>
          <div className="h-4 bg-secondary rounded-full mt-4 overflow-hidden">
            <div
              className="h-full bg-primary rounded-full"
              style={{ width: "67.2%" }}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            +2.4% compared to 2019
          </p>
        </GlassCard>

        <GlassCard delayMultiplier={1}>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-medium">Seats Declared</h3>
            <span className="text-2xl font-semibold">543/543</span>
          </div>
          <div className="h-4 bg-secondary rounded-full mt-4 overflow-hidden">
            <div
              className="h-full bg-primary rounded-full"
              style={{ width: "100%" }}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            100% results declared
          </p>
        </GlassCard>

        <GlassCard delayMultiplier={2}>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-medium">Vote Share</h3>
          </div>
          <div className="grid grid-cols-5 gap-1 mt-4">
            {Object.entries(partyColors).map(([party, color], i) => (
              <div
                key={party}
                className="h-4 rounded-full"
                style={{ backgroundColor: color, width: "100%" }}
              />
            ))}
          </div>
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>PartyA: 37%</span>
            <span>PartyB: 29%</span>
            <span>Others: 34%</span>
          </div>
        </GlassCard>
      </div>

      <Tabs defaultValue="parties">
        <TabsList className="w-full grid grid-cols-2 mb-6">
          <TabsTrigger value="parties">Party-wise Results</TabsTrigger>
          <TabsTrigger value="constituency">Constituency Results</TabsTrigger>
        </TabsList>
        <TabsContent value="parties">
          <GlassCard animateOnScroll={false}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4">Party</th>
                    <th className="text-center py-3 px-4">Seats Won</th>
                    <th className="text-center py-3 px-4">Vote Share %</th>
                    <th className="text-center py-3 px-4">Change</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(partyColors).map(([party, color], i) => (
                    <tr key={party} className="border-b border-border/50">
                      <td className="py-3 px-4 flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                        {party}
                      </td>
                      <td className="text-center py-3 px-4">
                        {200 - i * 45 > 0 ? 200 - i * 45 : 15}
                      </td>
                      <td className="text-center py-3 px-4">
                        {40 - i * 8 > 0 ? 40 - i * 8 : 5}%
                      </td>
                      <td className="text-center py-3 px-4">
                        <span
                          className={cn(
                            i % 2 === 0
                              ? "text-green-600"
                              : "text-red-600"
                          )}
                        >
                          {i % 2 === 0 ? "+" : "-"}
                          {3 + i}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </TabsContent>
        <TabsContent value="constituency">
          <GlassCard animateOnScroll={false}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4">Constituency</th>
                    <th className="text-left py-3 px-4">State</th>
                    <th className="text-left py-3 px-4">Winning Party</th>
                    <th className="text-center py-3 px-4">Margin</th>
                    <th className="text-center py-3 px-4">Turnout</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      constituency: "New Delhi",
                      state: "Delhi",
                      party: "PartyA",
                      margin: "125,750",
                      turnout: "62.5%",
                    },
                    {
                      constituency: "Mumbai North",
                      state: "Maharashtra",
                      party: "PartyB",
                      margin: "98,346",
                      turnout: "56.7%",
                    },
                    {
                      constituency: "Chennai Central",
                      state: "Tamil Nadu",
                      party: "PartyC",
                      margin: "112,982",
                      turnout: "59.8%",
                    },
                    {
                      constituency: "Kolkata North",
                      state: "West Bengal",
                      party: "PartyA",
                      margin: "75,639",
                      turnout: "72.3%",
                    },
                    {
                      constituency: "Hyderabad",
                      state: "Telangana",
                      party: "PartyD",
                      margin: "44,463",
                      turnout: "53.9%",
                    },
                  ].map((item, i) => (
                    <tr key={i} className="border-b border-border/50">
                      <td className="py-3 px-4">{item.constituency}</td>
                      <td className="py-3 px-4">{item.state}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{
                              backgroundColor:
                                partyColors[
                                  item.party as keyof typeof partyColors
                                ],
                            }}
                          />
                          {item.party}
                        </div>
                      </td>
                      <td className="text-center py-3 px-4">{item.margin}</td>
                      <td className="text-center py-3 px-4">{item.turnout}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center mt-6">
              <Button variant="outline" className="gap-1">
                Load More <ChevronDown size={16} />
              </Button>
            </div>
          </GlassCard>
        </TabsContent>
      </Tabs>
    </InfoSection>
  );
};

const MapSection = () => {
  return (
    <InfoSection
      title="Geographical Distribution"
      subtitle="Explore election results on the interactive map."
      className="bg-primary/5"
    >
      <Tabs defaultValue="map" className="mb-6">
        <TabsList className="w-full grid grid-cols-3 mb-6">
          <TabsTrigger value="map" className="gap-2">
            <MapIcon size={16} />
            Map View
          </TabsTrigger>
          <TabsTrigger value="chart" className="gap-2">
            <BarChart3 size={16} />
            Chart View
          </TabsTrigger>
          <TabsTrigger value="pie" className="gap-2">
            <PieChart size={16} />
            Distribution
          </TabsTrigger>
        </TabsList>
        <TabsContent value="map">
          <ElectionMap />
          <div className="flex flex-wrap gap-3 justify-center mt-6">
            {Object.entries(partyColors).map(([party, color]) => (
              <div key={party} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="text-sm">{party}</span>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="chart">
          <GlassCard animateOnScroll={false}>
            <div className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">
                Bar chart visualization would be displayed here <br />
                (Requires chart.js or recharts integration)
              </p>
            </div>
          </GlassCard>
        </TabsContent>
        <TabsContent value="pie">
          <GlassCard animateOnScroll={false}>
            <div className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">
                Pie chart visualization would be displayed here <br />
                (Requires chart.js or recharts integration)
              </p>
            </div>
          </GlassCard>
        </TabsContent>
      </Tabs>
    </InfoSection>
  );
};

const TrendsSection = () => {
  return (
    <InfoSection
      title="Historical Election Trends"
      subtitle="Analyze how voting patterns have evolved over the years."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard>
          <h3 className="text-xl font-medium mb-4 flex items-center gap-2">
            <Calendar size={20} />
            Voter Turnout Trends
          </h3>
          <div className="h-[250px] flex items-center justify-center border border-border/50 rounded-md">
            <p className="text-muted-foreground text-center">
              Historical turnout chart would be displayed here <br />
              (Requires chart.js or recharts integration)
            </p>
          </div>
        </GlassCard>

        <GlassCard delayMultiplier={1}>
          <h3 className="text-xl font-medium mb-4 flex items-center gap-2">
            <BarChart3 size={20} />
            Party Performance Comparison
          </h3>
          <div className="h-[250px] flex items-center justify-center border border-border/50 rounded-md">
            <p className="text-muted-foreground text-center">
              Party performance chart would be displayed here <br />
              (Requires chart.js or recharts integration)
            </p>
          </div>
        </GlassCard>
      </div>

      <div className="mt-12">
        <GlassCard>
          <h3 className="text-xl font-medium mb-4">Key Insights</h3>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                1
              </div>
              <div>
                <p className="font-medium">Increased Voter Participation</p>
                <p className="text-muted-foreground">
                  Voter turnout has shown a steady increase over the last three
                  election cycles, with a 4.2% rise since 2014.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                2
              </div>
              <div>
                <p className="font-medium">Shift in Regional Dynamics</p>
                <p className="text-muted-foreground">
                  Southern states have shown significant shifts in voting
                  patterns, with traditional strongholds being challenged.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                3
              </div>
              <div>
                <p className="font-medium">Urban-Rural Divide</p>
                <p className="text-muted-foreground">
                  The gap between urban and rural voting preferences has
                  narrowed compared to previous elections.
                </p>
              </div>
            </li>
          </ul>
        </GlassCard>
      </div>
    </InfoSection>
  );
};

export default Results;
