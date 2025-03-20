
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
import { Search, CheckCircle, AlertCircle, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ElectoralRoll() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [searchMethod, setSearchMethod] = useState("voter-id");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<null | {
    status: "found" | "not-found";
    voterDetails?: {
      name: string;
      voterID: string;
      age: number;
      gender: string;
      constituency: string;
      pollingStation: string;
      serialNumber: string;
      status: string;
    };
  }>(null);
  const { toast } = useToast();

  const handleSearch = () => {
    setIsSearching(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsSearching(false);
      
      // For demonstration, randomly show found or not found
      const found = Math.random() > 0.3;
      
      if (found) {
        setSearchResults({
          status: "found",
          voterDetails: {
            name: "Jane Citizen",
            voterID: "ABC1234567",
            age: 32,
            gender: "Female",
            constituency: "Central District",
            pollingStation: "Public School #5",
            serialNumber: "45678",
            status: "Active",
          }
        });
        
        toast({
          title: "Voter Found",
          description: "Your name is on the electoral roll.",
        });
      } else {
        setSearchResults({
          status: "not-found"
        });
        
        toast({
          title: "Voter Not Found",
          description: "Your name was not found on the electoral roll.",
          variant: "destructive",
        });
      }
      
      setStep(2);
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
      <Button onClick={() => setOpen(true)} className="w-full">Check Status</Button>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[500px]">
          {step === 1 ? (
            <>
              <DialogHeader>
                <DialogTitle>Electoral Roll Check</DialogTitle>
                <DialogDescription>
                  Verify if your name appears on the electoral roll.
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
                      <RadioGroupItem value="voter-id" id="voter-id-check" />
                      <div className="grid gap-1.5">
                        <Label htmlFor="voter-id-check" className="font-medium">Voter ID</Label>
                        <p className="text-sm text-muted-foreground">Check using your Voter ID card number</p>
                        {searchMethod === "voter-id" && (
                          <Input placeholder="Enter Voter ID number" className="mt-2" />
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 border p-3 rounded-md">
                      <RadioGroupItem value="name-details" id="name-details" />
                      <div className="grid gap-1.5">
                        <Label htmlFor="name-details" className="font-medium">Name & Details</Label>
                        <p className="text-sm text-muted-foreground">Search by name and address details</p>
                        {searchMethod === "name-details" && (
                          <div className="space-y-2 mt-2">
                            <Input placeholder="Full Name" />
                            <div className="grid grid-cols-2 gap-2">
                              <Input placeholder="Age" type="number" min="18" />
                              <Input placeholder="District" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 border p-3 rounded-md">
                      <RadioGroupItem value="mobile" id="mobile" />
                      <div className="grid gap-1.5">
                        <Label htmlFor="mobile" className="font-medium">Mobile Number</Label>
                        <p className="text-sm text-muted-foreground">Use your registered mobile number</p>
                        {searchMethod === "mobile" && (
                          <Input placeholder="Enter mobile number" className="mt-2" />
                        )}
                      </div>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="mt-4 p-3 bg-muted rounded-md">
                  <p className="text-sm">If your name is not found, you'll need to register as a new voter.</p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button type="submit" onClick={handleSearch} disabled={isSearching}>
                  {isSearching ? "Searching..." : "Check Now"}
                </Button>
              </DialogFooter>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Electoral Roll Status</DialogTitle>
                <DialogDescription>
                  Results of your electoral roll check.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                {searchResults?.status === "found" ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-green-600 rounded-lg bg-green-50 p-3">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-medium">Found on Electoral Roll</span>
                    </div>
                    
                    <Tabs defaultValue="details">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="details">Voter Details</TabsTrigger>
                        <TabsTrigger value="instructions">Voting Instructions</TabsTrigger>
                      </TabsList>
                      <TabsContent value="details" className="space-y-4 pt-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Name</p>
                            <p className="font-medium">{searchResults.voterDetails?.name}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Voter ID</p>
                            <p className="font-medium">{searchResults.voterDetails?.voterID}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Age</p>
                            <p className="font-medium">{searchResults.voterDetails?.age}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Gender</p>
                            <p className="font-medium">{searchResults.voterDetails?.gender}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Constituency</p>
                            <p className="font-medium">{searchResults.voterDetails?.constituency}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Serial No.</p>
                            <p className="font-medium">{searchResults.voterDetails?.serialNumber}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Polling Station</p>
                            <p className="font-medium">{searchResults.voterDetails?.pollingStation}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Status</p>
                            <p className="font-medium">{searchResults.voterDetails?.status}</p>
                          </div>
                        </div>
                        
                        <Button variant="outline" className="w-full">
                          <FileText className="mr-2 h-4 w-4" />
                          Download Voter Information
                        </Button>
                      </TabsContent>
                      <TabsContent value="instructions" className="space-y-3 pt-3">
                        <h3 className="font-medium">What to bring on Election Day:</h3>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Voter ID card (original)</li>
                          <li>Valid photo identification</li>
                          <li>Arrive at your designated polling station</li>
                        </ul>
                        <div className="p-3 bg-muted rounded-md mt-3">
                          <p className="text-sm">Voting hours: 7:00 AM to 6:00 PM on Election Day</p>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-red-600 rounded-lg bg-red-50 p-3">
                      <AlertCircle className="h-5 w-5" />
                      <span className="font-medium">Not Found on Electoral Roll</span>
                    </div>
                    
                    <div className="p-4 border rounded-md">
                      <h3 className="font-medium mb-2">What you should do next:</h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Register as a new voter</li>
                        <li>Verify your details are correct</li>
                        <li>Check if your registration is pending</li>
                        <li>Contact your local electoral office</li>
                      </ul>
                    </div>
                    
                    <Button className="w-full">Register as a Voter</Button>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={resetDialog}>Check Another</Button>
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
