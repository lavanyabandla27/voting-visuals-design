
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Search, MapPin, Navigation, AlertTriangle, Calendar, Clock, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

export function PollingStation() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [searchMethod, setSearchMethod] = useState("voter-id");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<null | {
    pollingStation: string;
    address: string;
    district: string;
    openingHours: string;
    distance: string;
    directions: string;
    facilities: string[];
    wardenName: string;
    boothNumber: string;
    accessibility: string[];
    voterCount: number;
    expectedWaitTime: string;
  }>(null);
  const { toast } = useToast();

  const handleSearch = () => {
    setIsSearching(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsSearching(false);
      setSearchResults({
        pollingStation: "Polling Station #42B",
        address: "123 Democracy Avenue, Central District",
        district: "Central",
        openingHours: "7:00 AM - 6:00 PM",
        distance: "2.3 kilometers",
        directions: "https://maps.example.com/directions?to=polling-station-42b",
        facilities: ["Drinking Water", "Washrooms", "First Aid", "Help Desk", "Wheelchair Access"],
        wardenName: "Ms. Jane Smith",
        boothNumber: "B-42",
        accessibility: ["Wheelchair Ramp", "Braille Ballot Papers", "Priority Access for Seniors"],
        voterCount: 1250,
        expectedWaitTime: "15-20 minutes",
      });
      setStep(2);
      
      toast({
        title: "Polling Station Found",
        description: "We've located your designated polling station.",
      });
    }, 1500);
  };

  const resetDialog = () => {
    setStep(1);
    setSearchResults(null);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      resetDialog();
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} className="w-full">Find Location</Button>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[600px]">
          {step === 1 ? (
            <>
              <DialogHeader>
                <DialogTitle>Find Your Polling Station</DialogTitle>
                <DialogDescription>
                  Locate your designated polling station for upcoming elections.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <div className="space-y-4">
                  <RadioGroup 
                    defaultValue={searchMethod} 
                    onValueChange={setSearchMethod}
                    className="grid grid-cols-1 gap-4"
                  >
                    <div className="flex items-start space-x-3 border p-3 rounded-md">
                      <RadioGroupItem value="voter-id" id="voter-id" />
                      <div className="grid gap-1.5 w-full">
                        <Label htmlFor="voter-id" className="font-medium">Voter ID</Label>
                        <p className="text-sm text-muted-foreground">Search using your Voter ID card number</p>
                        {searchMethod === "voter-id" && (
                          <Input placeholder="Enter Voter ID number" className="mt-2" />
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 border p-3 rounded-md">
                      <RadioGroupItem value="address" id="address" />
                      <div className="grid gap-1.5 w-full">
                        <Label htmlFor="address" className="font-medium">Address</Label>
                        <p className="text-sm text-muted-foreground">Find polling station based on your residential address</p>
                        {searchMethod === "address" && (
                          <div className="space-y-2 mt-2">
                            <Input placeholder="Street Address" />
                            <div className="grid grid-cols-2 gap-2">
                              <Input placeholder="City" />
                              <Input placeholder="Postal Code" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 border p-3 rounded-md">
                      <RadioGroupItem value="constituency" id="constituency" />
                      <div className="grid gap-1.5 w-full">
                        <Label htmlFor="constituency" className="font-medium">Constituency</Label>
                        <p className="text-sm text-muted-foreground">Search by your electoral constituency</p>
                        {searchMethod === "constituency" && (
                          <div className="space-y-2 mt-2">
                            <Input placeholder="Enter constituency name" />
                            <div className="grid grid-cols-2 gap-2">
                              <Input placeholder="District" />
                              <Input placeholder="State" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 border p-3 rounded-md">
                      <RadioGroupItem value="geo" id="geo" />
                      <div className="grid gap-1.5 w-full">
                        <Label htmlFor="geo" className="font-medium">Current Location</Label>
                        <p className="text-sm text-muted-foreground">Find nearest polling station based on your current location</p>
                        {searchMethod === "geo" && (
                          <Button variant="outline" className="mt-2">
                            <MapPin className="mr-2 h-4 w-4" />
                            Use My Location
                          </Button>
                        )}
                      </div>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="mt-4 p-3 bg-muted rounded-md">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Important Notes:</p>
                      <ul className="text-sm list-disc pl-5 mt-1 space-y-1">
                        <li>Polling hours are 7:00 AM to 6:00 PM on election day</li>
                        <li>Bring your Voter ID and a valid photo identification</li>
                        <li>Locate your polling station in advance to avoid delays</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button type="submit" onClick={handleSearch} disabled={isSearching}>
                  {isSearching ? "Searching..." : "Search Location"}
                </Button>
              </DialogFooter>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Your Polling Station</DialogTitle>
                <DialogDescription>
                  We've found your designated polling station for the upcoming election.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                {searchResults && (
                  <div className="space-y-6">
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-semibold text-lg">{searchResults.pollingStation}</h3>
                          <p className="text-sm text-muted-foreground">{searchResults.address}</p>
                          <div className="pt-2 space-y-2">
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <span className="font-medium">District:</span>
                                <span className="ml-1">{searchResults.district}</span>
                              </div>
                              <div>
                                <span className="font-medium">Hours:</span>
                                <span className="ml-1">{searchResults.openingHours}</span>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <span className="font-medium">Distance:</span>
                                <span className="ml-1">{searchResults.distance}</span>
                              </div>
                              <div>
                                <span className="font-medium">Booth:</span>
                                <span className="ml-1">{searchResults.boothNumber}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Tabs defaultValue="details">
                      <TabsList className="w-full grid grid-cols-3">
                        <TabsTrigger value="details">Details</TabsTrigger>
                        <TabsTrigger value="facilities">Facilities</TabsTrigger>
                        <TabsTrigger value="waitTime">Wait Times</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="details" className="pt-4">
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <p className="text-sm font-medium flex items-center gap-1">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                Hours
                              </p>
                              <p className="text-sm">{searchResults.openingHours}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium flex items-center gap-1">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                Election Day
                              </p>
                              <p className="text-sm">January 15, 2025</p>
                            </div>
                          </div>
                          
                          <div className="border-t pt-3">
                            <p className="text-sm font-medium">Presiding Officer</p>
                            <p className="text-sm">{searchResults.wardenName}</p>
                          </div>
                          
                          <div className="border-t pt-3">
                            <p className="text-sm font-medium">Accessibility Features</p>
                            <ul className="text-sm mt-1 space-y-1">
                              {searchResults.accessibility.map((item, i) => (
                                <li key={i} className="flex items-center gap-1">
                                  <Check className="h-3.5 w-3.5 text-green-600" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="facilities" className="pt-4">
                        <div className="grid grid-cols-2 gap-3">
                          {searchResults.facilities.map((facility, i) => (
                            <div key={i} className="flex items-center gap-2 border rounded-md p-2">
                              <Check className="h-4 w-4 text-green-600" />
                              <span className="text-sm">{facility}</span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-4 p-3 bg-muted rounded-md">
                          <p className="text-sm">Additional facilities may be available on election day.</p>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="waitTime" className="pt-4">
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">Expected Wait Time:</span>
                              <span className="text-sm">{searchResults.expectedWaitTime}</span>
                            </div>
                            <Progress value={40} className="h-2" />
                          </div>
                          
                          <div className="border rounded-md p-3">
                            <p className="text-sm font-medium">Peak Hours</p>
                            <div className="mt-2 grid grid-cols-3 gap-2 text-sm">
                              <div className="text-center p-1 border rounded bg-red-50">
                                <p className="font-medium">8-10 AM</p>
                                <p className="text-muted-foreground">High</p>
                              </div>
                              <div className="text-center p-1 border rounded bg-yellow-50">
                                <p className="font-medium">12-2 PM</p>
                                <p className="text-muted-foreground">Medium</p>
                              </div>
                              <div className="text-center p-1 border rounded bg-green-50">
                                <p className="font-medium">4-6 PM</p>
                                <p className="text-muted-foreground">Low</p>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-sm font-medium">Total Registered Voters:</p>
                            <p className="text-sm">{searchResults.voterCount}</p>
                          </div>
                          
                          <div className="text-sm">
                            <p className="font-medium">Pro Tip:</p>
                            <p>Visit during non-peak hours to minimize waiting time.</p>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                    
                    <div className="p-3 border rounded-md">
                      <h4 className="text-sm font-medium mb-2">What to bring on Election Day</h4>
                      <ul className="text-sm space-y-1 list-disc pl-5">
                        <li>Voter ID card</li>
                        <li>Valid photo identification</li>
                        <li>Proof of address (if requested)</li>
                      </ul>
                    </div>
                    
                    <Button className="w-full" variant="outline">
                      <Navigation className="mr-2 h-4 w-4" />
                      Get Directions
                    </Button>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={resetDialog}>Search Again</Button>
                <DialogClose asChild>
                  <Button>Close</Button>
                </DialogClose>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
