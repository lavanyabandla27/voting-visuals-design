
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
import { 
  Search, 
  CheckCircle, 
  AlertCircle, 
  FileText, 
  Calendar, 
  MapPin, 
  User, 
  Mail, 
  Phone, 
  Building,
  FileCheck,
  Download,
  Printer,
  Share2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export function ElectoralRoll() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [searchMethod, setSearchMethod] = useState("voter-id");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<null | {
    status: "found" | "not-found" | "pending";
    voterDetails?: {
      name: string;
      voterID: string;
      age: number;
      gender: string;
      constituency: string;
      pollingStation: string;
      serialNumber: string;
      status: string;
      address: string;
      email: string;
      phone: string;
      registrationDate: string;
      lastUpdated: string;
      district: string;
      electionHistory: { year: string; voted: boolean }[];
    };
  }>(null);
  const { toast } = useToast();

  const handleSearch = () => {
    setIsSearching(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsSearching(false);
      
      // For demonstration, randomly show found, not found, or pending
      const randomResult = Math.random();
      
      if (randomResult > 0.2) {
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
            address: "123 Democracy Street, Central District, Capital City",
            email: "jane.citizen@example.com",
            phone: "+91 98765 43210",
            registrationDate: "2019-05-15",
            lastUpdated: "2024-02-10",
            district: "Central",
            electionHistory: [
              { year: "2019", voted: true },
              { year: "2023", voted: true },
              { year: "2024", voted: true },
            ]
          }
        });
        
        toast({
          title: "Voter Found",
          description: "Your name is on the electoral roll.",
        });
      } else if (randomResult > 0.1) {
        setSearchResults({
          status: "not-found"
        });
        
        toast({
          title: "Voter Not Found",
          description: "Your name was not found on the electoral roll.",
          variant: "destructive",
        });
      } else {
        setSearchResults({
          status: "pending"
        });
        
        toast({
          title: "Registration Pending",
          description: "Your registration is currently being processed.",
          variant: "default",
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
        <DialogContent className="sm:max-w-[600px]">
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
                      <div className="grid gap-1.5 w-full">
                        <Label htmlFor="voter-id-check" className="font-medium">Voter ID</Label>
                        <p className="text-sm text-muted-foreground">Check using your Voter ID card number</p>
                        {searchMethod === "voter-id" && (
                          <Input placeholder="Enter Voter ID number" className="mt-2" />
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 border p-3 rounded-md">
                      <RadioGroupItem value="name-details" id="name-details" />
                      <div className="grid gap-1.5 w-full">
                        <Label htmlFor="name-details" className="font-medium">Name & Details</Label>
                        <p className="text-sm text-muted-foreground">Search by name and address details</p>
                        {searchMethod === "name-details" && (
                          <div className="space-y-2 mt-2">
                            <Input placeholder="Full Name" />
                            <div className="grid grid-cols-2 gap-2">
                              <Input placeholder="Date of Birth" type="date" />
                              <Input placeholder="Father's/Mother's Name" />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <Input placeholder="District" />
                              <Input placeholder="State" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 border p-3 rounded-md">
                      <RadioGroupItem value="mobile" id="mobile" />
                      <div className="grid gap-1.5 w-full">
                        <Label htmlFor="mobile" className="font-medium">Mobile Number</Label>
                        <p className="text-sm text-muted-foreground">Use your registered mobile number</p>
                        {searchMethod === "mobile" && (
                          <div className="space-y-2 mt-2">
                            <Input placeholder="Enter mobile number" />
                            <div className="grid grid-cols-1">
                              <Button variant="outline" size="sm" className="mt-1">
                                Send OTP
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 border p-3 rounded-md">
                      <RadioGroupItem value="epic" id="epic" />
                      <div className="grid gap-1.5 w-full">
                        <Label htmlFor="epic" className="font-medium">EPIC Number</Label>
                        <p className="text-sm text-muted-foreground">Search using your EPIC (Electoral Photo Identity Card) number</p>
                        {searchMethod === "epic" && (
                          <div className="space-y-2 mt-2">
                            <Input placeholder="Enter EPIC number" />
                          </div>
                        )}
                      </div>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="mt-4 p-3 bg-muted rounded-md flex gap-2 items-start">
                  <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Why check your status?</p>
                    <ul className="text-sm list-disc pl-5 mt-1 space-y-1">
                      <li>Verify your eligibility to vote in upcoming elections</li>
                      <li>Ensure your details are correct and up-to-date</li>
                      <li>Avoid issues on election day</li>
                    </ul>
                  </div>
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
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="details">Voter Details</TabsTrigger>
                        <TabsTrigger value="address">Address</TabsTrigger>
                        <TabsTrigger value="history">Voting History</TabsTrigger>
                      </TabsList>
                      <TabsContent value="details" className="space-y-4 pt-3">
                        <div className="rounded-md border p-4">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="font-semibold text-lg">{searchResults.voterDetails?.name}</h3>
                              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                <User className="h-3.5 w-3.5" />
                                {searchResults.voterDetails?.gender}, {searchResults.voterDetails?.age} years
                              </p>
                            </div>
                            <Badge variant="outline" className="bg-green-50">Active</Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <p className="text-sm text-muted-foreground">Voter ID</p>
                              <p className="font-medium">{searchResults.voterDetails?.voterID}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm text-muted-foreground">Serial Number</p>
                              <p className="font-medium">{searchResults.voterDetails?.serialNumber}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm text-muted-foreground">Constituency</p>
                              <p className="font-medium">{searchResults.voterDetails?.constituency}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm text-muted-foreground">District</p>
                              <p className="font-medium">{searchResults.voterDetails?.district}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm text-muted-foreground">Registration Date</p>
                              <p className="font-medium">{new Date(searchResults.voterDetails?.registrationDate || '').toLocaleDateString()}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm text-muted-foreground">Last Updated</p>
                              <p className="font-medium">{new Date(searchResults.voterDetails?.lastUpdated || '').toLocaleDateString()}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="rounded-md border p-4">
                          <h4 className="font-medium mb-2">Contact Information</h4>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <span>{searchResults.voterDetails?.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <span>{searchResults.voterDetails?.email}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="rounded-md border p-4">
                          <h4 className="font-medium mb-2">Polling Station</h4>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{searchResults.voterDetails?.pollingStation}</span>
                          </div>
                          <Button variant="outline" size="sm" className="mt-3 w-full">
                            View Polling Station Details
                          </Button>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="address" className="pt-3">
                        <div className="rounded-md border p-4 space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">Residential Address</h4>
                            <div className="flex items-start gap-2">
                              <Building className="h-4 w-4 text-muted-foreground mt-0.5" />
                              <p className="text-sm">{searchResults.voterDetails?.address}</p>
                            </div>
                          </div>
                          
                          <div className="pt-2 border-t">
                            <h4 className="font-medium mb-2">Update Address</h4>
                            <p className="text-sm text-muted-foreground mb-2">
                              If you've changed your residence, you need to update your address on the electoral roll.
                            </p>
                            <Button size="sm">Request Address Change</Button>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="history" className="pt-3">
                        <div className="rounded-md border p-4 space-y-4">
                          <h4 className="font-medium">Voting History</h4>
                          <div className="space-y-3">
                            {searchResults.voterDetails?.electionHistory.map((item, i) => (
                              <div key={i} className="flex items-center justify-between border-b pb-2">
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  <span className="font-medium">{item.year} Election</span>
                                </div>
                                {item.voted ? (
                                  <Badge variant="outline" className="bg-green-50">Voted</Badge>
                                ) : (
                                  <Badge variant="outline" className="bg-red-50">Not Voted</Badge>
                                )}
                              </div>
                            ))}
                          </div>
                          
                          <div className="mt-2">
                            <p className="text-sm font-medium">Upcoming Elections</p>
                            <div className="flex items-center justify-between mt-1 p-2 border rounded-md bg-primary/5">
                              <span>2025 General Election</span>
                              <Badge>Eligible</Badge>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                    
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" className="flex-1" size="sm">
                        <FileText className="mr-2 h-4 w-4" />
                        Download Voter Info
                      </Button>
                      <Button variant="outline" className="flex-1" size="sm">
                        <Printer className="mr-2 h-4 w-4" />
                        Print
                      </Button>
                      <Button variant="outline" className="flex-1" size="sm">
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                      </Button>
                    </div>
                  </div>
                ) : searchResults?.status === "pending" ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-amber-600 rounded-lg bg-amber-50 p-3">
                      <AlertCircle className="h-5 w-5" />
                      <span className="font-medium">Registration Pending</span>
                    </div>
                    
                    <div className="p-4 border rounded-md">
                      <h3 className="font-medium text-lg mb-3">Application Status</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Application Processing</span>
                            <span>60%</span>
                          </div>
                          <Progress value={60} className="h-2" />
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-green-600 text-white flex items-center justify-center text-xs mt-0.5">✓</div>
                            <div>
                              <p className="font-medium">Application Received</p>
                              <p className="text-sm text-muted-foreground">March 15, 2024</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-green-600 text-white flex items-center justify-center text-xs mt-0.5">✓</div>
                            <div>
                              <p className="font-medium">Document Verification</p>
                              <p className="text-sm text-muted-foreground">March 20, 2024</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs mt-0.5">⋯</div>
                            <div>
                              <p className="font-medium">Field Verification</p>
                              <p className="text-sm text-muted-foreground">In Progress</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-xs mt-0.5">4</div>
                            <div>
                              <p className="font-medium text-gray-500">Final Approval</p>
                              <p className="text-sm text-muted-foreground">Pending</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-muted rounded-md">
                      <h4 className="font-medium mb-2">What happens next?</h4>
                      <p className="text-sm">Your application is being processed. The Election Commission will verify your details and approve your registration. You will receive a notification once your name is added to the electoral roll.</p>
                    </div>
                    
                    <Button className="w-full">
                      <FileCheck className="mr-2 h-4 w-4" />
                      Track Application Status
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-red-600 rounded-lg bg-red-50 p-3">
                      <AlertCircle className="h-5 w-5" />
                      <span className="font-medium">Not Found on Electoral Roll</span>
                    </div>
                    
                    <div className="p-4 border rounded-md">
                      <h3 className="font-medium text-lg mb-3">Why you might not be found</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Your registration may be under a different name or details</li>
                        <li>Your application may be in process but not yet approved</li>
                        <li>You may not have registered to vote</li>
                        <li>Your name may have been removed due to relocation, duplication, or death record</li>
                      </ul>
                    </div>
                    
                    <div className="rounded-md border p-4">
                      <h4 className="font-medium mb-3">What you can do now</h4>
                      <div className="space-y-3">
                        <Button className="w-full" variant="default">
                          Register as a New Voter
                        </Button>
                        <Button className="w-full" variant="outline">
                          Submit a Query to Election Commission
                        </Button>
                        <div className="pt-2 border-t mt-2">
                          <p className="text-sm font-medium">Already registered?</p>
                          <p className="text-sm text-muted-foreground mt-1">Try searching with different details or contact your local election office.</p>
                        </div>
                      </div>
                    </div>
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
