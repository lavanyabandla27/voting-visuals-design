
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
import { Search, MapPin, Navigation } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
        <DialogContent className="sm:max-w-[500px]">
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
                      <div className="grid gap-1.5">
                        <Label htmlFor="voter-id" className="font-medium">Voter ID</Label>
                        <p className="text-sm text-muted-foreground">Search using your Voter ID card number</p>
                        {searchMethod === "voter-id" && (
                          <Input placeholder="Enter Voter ID number" className="mt-2" />
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 border p-3 rounded-md">
                      <RadioGroupItem value="address" id="address" />
                      <div className="grid gap-1.5">
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
                      <div className="grid gap-1.5">
                        <Label htmlFor="constituency" className="font-medium">Constituency</Label>
                        <p className="text-sm text-muted-foreground">Search by your electoral constituency</p>
                        {searchMethod === "constituency" && (
                          <Input placeholder="Enter constituency name" className="mt-2" />
                        )}
                      </div>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="mt-4 p-3 bg-muted rounded-md">
                  <p className="text-sm">Note: On voting day, please bring your Voter ID card and a valid photo identification.</p>
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
                  <div className="space-y-4">
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
                            <div className="text-sm">
                              <span className="font-medium">Distance:</span>
                              <span className="ml-1">{searchResults.distance} from your location</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
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
