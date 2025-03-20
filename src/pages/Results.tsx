
import { motion } from "framer-motion";
import {
  BarChart3,
  Calendar,
  ChevronDown,
  Download,
  Filter,
  Map as MapIcon,
  PieChart,
  TrendingUp,
} from "lucide-react";
import { useState, useEffect } from "react";
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
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RPieChart,
  Pie,
  Cell,
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Mock data for charts
const partyColors = {
  PartyA: "#4361ee",
  PartyB: "#ef476f",
  PartyC: "#06d6a0",
  PartyD: "#ffd166",
  Others: "#8d99ae",
};

// Historical turnout data
const historicalTurnoutData = [
  { year: "2009", turnout: 58.2 },
  { year: "2014", turnout: 66.4 },
  { year: "2019", turnout: 67.4 },
  { year: "2025", turnout: null }, // Upcoming election
];

// Party performance history
const partyPerformanceData = [
  { year: "2009", PartyA: 110, PartyB: 206, PartyC: 98, PartyD: 60, Others: 69 },
  { year: "2014", PartyA: 180, PartyB: 146, PartyC: 72, PartyD: 37, Others: 108 },
  { year: "2019", PartyA: 190, PartyB: 158, PartyC: 84, PartyD: 42, Others: 69 },
  { year: "2025", PartyA: null, PartyB: null, PartyC: null, PartyD: null, Others: null }, // Upcoming election
];

// Mock state-specific election data
const stateElectionData = {
  all: {
    turnout: 67.2,
    turnoutChange: 2.4,
    seatsDeclared: 543,
    totalSeats: 543,
    voteShare: {
      PartyA: 37,
      PartyB: 29,
      PartyC: 18,
      PartyD: 9,
      Others: 7,
    },
    partyResults: [
      { party: "PartyA", seatsWon: 200, voteShare: 37, change: 3 },
      { party: "PartyB", seatsWon: 155, voteShare: 29, change: -2 },
      { party: "PartyC", seatsWon: 95, voteShare: 18, change: 5 },
      { party: "PartyD", seatsWon: 45, voteShare: 9, change: -4 },
      { party: "Others", seatsWon: 48, voteShare: 7, change: -2 },
    ],
  },
  ap: {
    turnout: 79.8,
    turnoutChange: 3.6,
    seatsDeclared: 25,
    totalSeats: 25,
    voteShare: {
      PartyA: 22,
      PartyB: 48,
      PartyC: 15,
      PartyD: 10,
      Others: 5,
    },
    partyResults: [
      { party: "PartyA", seatsWon: 5, voteShare: 22, change: -3 },
      { party: "PartyB", seatsWon: 14, voteShare: 48, change: 6 },
      { party: "PartyC", seatsWon: 4, voteShare: 15, change: 1 },
      { party: "PartyD", seatsWon: 2, voteShare: 10, change: -2 },
      { party: "Others", seatsWon: 0, voteShare: 5, change: -2 },
    ],
  },
  ar: {
    turnout: 71.2,
    turnoutChange: 1.2,
    seatsDeclared: 2,
    totalSeats: 2,
    voteShare: {
      PartyA: 55,
      PartyB: 15,
      PartyC: 20,
      PartyD: 8,
      Others: 2,
    },
    partyResults: [
      { party: "PartyA", seatsWon: 2, voteShare: 55, change: 1 },
      { party: "PartyB", seatsWon: 0, voteShare: 15, change: 0 },
      { party: "PartyC", seatsWon: 0, voteShare: 20, change: -1 },
      { party: "PartyD", seatsWon: 0, voteShare: 8, change: 0 },
      { party: "Others", seatsWon: 0, voteShare: 2, change: 0 },
    ],
  },
  as: {
    turnout: 82.5,
    turnoutChange: 5.7,
    seatsDeclared: 14,
    totalSeats: 14,
    voteShare: {
      PartyA: 42,
      PartyB: 33,
      PartyC: 12,
      PartyD: 5,
      Others: 8,
    },
    partyResults: [
      { party: "PartyA", seatsWon: 8, voteShare: 42, change: 2 },
      { party: "PartyB", seatsWon: 4, voteShare: 33, change: -1 },
      { party: "PartyC", seatsWon: 1, voteShare: 12, change: -1 },
      { party: "PartyD", seatsWon: 0, voteShare: 5, change: 0 },
      { party: "Others", seatsWon: 1, voteShare: 8, change: 0 },
    ],
  },
  br: {
    turnout: 62.9,
    turnoutChange: -1.8,
    seatsDeclared: 40,
    totalSeats: 40,
    voteShare: {
      PartyA: 38,
      PartyB: 36,
      PartyC: 12,
      PartyD: 8,
      Others: 6,
    },
    partyResults: [
      { party: "PartyA", seatsWon: 18, voteShare: 38, change: -2 },
      { party: "PartyB", seatsWon: 16, voteShare: 36, change: 3 },
      { party: "PartyC", seatsWon: 3, voteShare: 12, change: -1 },
      { party: "PartyD", seatsWon: 2, voteShare: 8, change: 0 },
      { party: "Others", seatsWon: 1, voteShare: 6, change: 0 },
    ],
  },
};

// Mock constituency data by state
const constituencyData = {
  all: [
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
  ],
  ap: [
    {
      constituency: "Vijayawada",
      state: "Andhra Pradesh",
      party: "PartyB",
      margin: "87,321",
      turnout: "78.2%",
    },
    {
      constituency: "Guntur",
      state: "Andhra Pradesh",
      party: "PartyB",
      margin: "64,532",
      turnout: "76.5%",
    },
    {
      constituency: "Visakhapatnam",
      state: "Andhra Pradesh",
      party: "PartyA",
      margin: "32,145",
      turnout: "81.3%",
    },
    {
      constituency: "Rajahmundry",
      state: "Andhra Pradesh",
      party: "PartyB",
      margin: "52,876",
      turnout: "79.8%",
    },
    {
      constituency: "Tirupati",
      state: "Andhra Pradesh",
      party: "PartyC",
      margin: "43,257",
      turnout: "82.1%",
    },
  ],
  ar: [
    {
      constituency: "Arunachal West",
      state: "Arunachal Pradesh",
      party: "PartyA",
      margin: "24,657",
      turnout: "71.5%",
    },
    {
      constituency: "Arunachal East",
      state: "Arunachal Pradesh",
      party: "PartyA",
      margin: "19,834",
      turnout: "70.9%",
    },
  ],
  as: [
    {
      constituency: "Guwahati",
      state: "Assam",
      party: "PartyA",
      margin: "45,632",
      turnout: "83.2%",
    },
    {
      constituency: "Dibrugarh",
      state: "Assam",
      party: "PartyA",
      margin: "37,984",
      turnout: "84.5%",
    },
    {
      constituency: "Silchar",
      state: "Assam",
      party: "PartyB",
      margin: "28,765",
      turnout: "80.7%",
    },
    {
      constituency: "Jorhat",
      state: "Assam",
      party: "PartyA",
      margin: "31,492",
      turnout: "82.1%",
    },
    {
      constituency: "Tezpur",
      state: "Assam",
      party: "PartyB",
      margin: "22,354",
      turnout: "81.9%",
    },
  ],
  br: [
    {
      constituency: "Patna Sahib",
      state: "Bihar",
      party: "PartyA",
      margin: "67,243",
      turnout: "64.3%",
    },
    {
      constituency: "Muzaffarpur",
      state: "Bihar",
      party: "PartyB",
      margin: "54,321",
      turnout: "62.7%",
    },
    {
      constituency: "Gaya",
      state: "Bihar",
      party: "PartyB",
      margin: "48,765",
      turnout: "59.8%",
    },
    {
      constituency: "Darbhanga",
      state: "Bihar",
      party: "PartyA",
      margin: "41,296",
      turnout: "63.5%",
    },
    {
      constituency: "Purnia",
      state: "Bihar",
      party: "PartyC",
      margin: "35,872",
      turnout: "64.2%",
    },
  ],
};

const Results = () => {
  const [selectedState, setSelectedState] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("2025");
  const [currentData, setCurrentData] = useState(stateElectionData.all);
  const [currentConstituencyData, setCurrentConstituencyData] = useState(constituencyData.all);

  // Update data when state selection changes
  useEffect(() => {
    const stateData = stateElectionData[selectedState as keyof typeof stateElectionData] || stateElectionData.all;
    const stateConstituencyData = constituencyData[selectedState as keyof typeof constituencyData] || constituencyData.all;
    
    setCurrentData(stateData);
    setCurrentConstituencyData(stateConstituencyData);
  }, [selectedState]);

  const states = [
    { value: "all", label: "All States" },
    { value: "ap", label: "Andhra Pradesh" },
    { value: "ar", label: "Arunachal Pradesh" },
    { value: "as", label: "Assam" },
    { value: "br", label: "Bihar" },
  ];

  const years = [
    { value: "2025", label: "2025" },
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
          currentData={currentData}
          currentConstituencyData={currentConstituencyData}
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
  currentData: any;
  currentConstituencyData: any[];
}

const ResultsSection = ({
  selectedState,
  setSelectedState,
  selectedYear,
  setSelectedYear,
  states,
  years,
  currentData,
  currentConstituencyData,
}: ResultsSectionProps) => {
  return (
    <InfoSection>
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl md:text-3xl font-semibold">
          {selectedYear} Election Results
          {selectedState !== "all" && (
            <span className="ml-2 text-primary">
              - {states.find(s => s.value === selectedState)?.label}
            </span>
          )}
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
            <span className="text-2xl font-semibold">{currentData.turnout}%</span>
          </div>
          <div className="h-4 bg-secondary rounded-full mt-4 overflow-hidden">
            <div
              className="h-full bg-primary rounded-full"
              style={{ width: `${currentData.turnout}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {currentData.turnoutChange > 0 ? "+" : ""}{currentData.turnoutChange}% compared to 2019
          </p>
        </GlassCard>

        <GlassCard delayMultiplier={1}>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-medium">Seats Declared</h3>
            <span className="text-2xl font-semibold">{currentData.seatsDeclared}/{currentData.totalSeats}</span>
          </div>
          <div className="h-4 bg-secondary rounded-full mt-4 overflow-hidden">
            <div
              className="h-full bg-primary rounded-full"
              style={{ width: `${(currentData.seatsDeclared / currentData.totalSeats) * 100}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {Math.round((currentData.seatsDeclared / currentData.totalSeats) * 100)}% results declared
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
            <span>PartyA: {currentData.voteShare.PartyA}%</span>
            <span>PartyB: {currentData.voteShare.PartyB}%</span>
            <span>Others: {currentData.voteShare.PartyC + currentData.voteShare.PartyD + currentData.voteShare.Others}%</span>
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
                  {currentData.partyResults.map((result: any) => (
                    <tr key={result.party} className="border-b border-border/50">
                      <td className="py-3 px-4 flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: partyColors[result.party as keyof typeof partyColors] }}
                        />
                        {result.party}
                      </td>
                      <td className="text-center py-3 px-4">
                        {result.seatsWon}
                      </td>
                      <td className="text-center py-3 px-4">
                        {result.voteShare}%
                      </td>
                      <td className="text-center py-3 px-4">
                        <span
                          className={cn(
                            result.change > 0
                              ? "text-green-600"
                              : result.change < 0
                              ? "text-red-600"
                              : "text-gray-600"
                          )}
                        >
                          {result.change > 0 ? "+" : ""}{result.change}%
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
                  {currentConstituencyData.map((item, i) => (
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
            <div className="h-[400px] p-4">
              <h3 className="text-lg font-medium mb-4">Vote Share by Party (%)</h3>
              <ResponsiveContainer width="100%" height="90%">
                <BarChart
                  data={[
                    { name: "PartyA", value: 37 },
                    { name: "PartyB", value: 29 },
                    { name: "PartyC", value: 18 },
                    { name: "PartyD", value: 9 },
                    { name: "Others", value: 7 },
                  ]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" name="Vote Share (%)">
                    {[
                      { name: "PartyA", value: 37 },
                      { name: "PartyB", value: 29 },
                      { name: "PartyC", value: 18 },
                      { name: "PartyD", value: 9 },
                      { name: "Others", value: 7 },
                    ].map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={partyColors[entry.name as keyof typeof partyColors]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </TabsContent>
        <TabsContent value="pie">
          <GlassCard animateOnScroll={false}>
            <div className="h-[400px] p-4">
              <h3 className="text-lg font-medium mb-4">Seat Distribution</h3>
              <ResponsiveContainer width="100%" height="90%">
                <RPieChart>
                  <Pie
                    data={[
                      { name: "PartyA", value: 200 },
                      { name: "PartyB", value: 155 },
                      { name: "PartyC", value: 95 },
                      { name: "PartyD", value: 45 },
                      { name: "Others", value: 48 },
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {[
                      { name: "PartyA", value: 200 },
                      { name: "PartyB", value: 155 },
                      { name: "PartyC", value: 95 },
                      { name: "PartyD", value: 45 },
                      { name: "Others", value: 48 },
                    ].map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={partyColors[entry.name as keyof typeof partyColors]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} seats`, 'Seats Won']} />
                </RPieChart>
              </ResponsiveContainer>
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
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={historicalTurnoutData}
                margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="year" />
                <YAxis domain={[50, 80]} />
                <Tooltip
                  formatter={(value) => [value ? `${value}%` : 'Upcoming', 'Turnout']}
                  labelFormatter={(label) => `Year: ${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="turnout"
                  stroke="#4361ee"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Voter Turnout (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard delayMultiplier={1}>
          <h3 className="text-xl font-medium mb-4 flex items-center gap-2">
            <BarChart3 size={20} />
            Party Performance Comparison
          </h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={partyPerformanceData}
                margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="PartyA"
                  name="Party A"
                  fill={partyColors.PartyA}
                  stackId="a"
                  barSize={24}
                />
                <Bar
                  dataKey="PartyB"
                  name="Party B"
                  fill={partyColors.PartyB}
                  stackId="a"
                />
                <Bar
                  dataKey="PartyC"
                  name="Party C"
                  fill={partyColors.PartyC}
                  stackId="a"
                />
                <Bar
                  dataKey="PartyD"
                  name="Party D"
                  fill={partyColors.PartyD}
                  stackId="a"
                />
                <Bar
                  dataKey="Others"
                  name="Others"
                  fill={partyColors.Others}
                  stackId="a"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>
    </InfoSection>
  );
};

export default Results;
