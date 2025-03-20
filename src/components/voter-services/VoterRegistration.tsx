
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";

export function VoterRegistration() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: "male",
      dob: "",
      idType: "aadhar",
      idNumber: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      mobile: "",
      email: "",
    }
  });

  const handleContinue = () => {
    setStep(2);
  };

  const handleSubmit = (data: any) => {
    console.log("Form data submitted:", data);
    toast({
      title: "Registration submitted successfully",
      description: "Your voter registration has been submitted. You'll receive a confirmation shortly.",
    });
    setStep(1);
    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} className="w-full">Register Now</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Voter Registration</DialogTitle>
            <DialogDescription>
              Register as a new voter or update your existing registration details.
            </DialogDescription>
          </DialogHeader>

          {step === 1 ? (
            <>
              <div className="py-4">
                <p className="mb-4">To register as a voter, please provide the following:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Proof of identity (Aadhar Card, Passport, etc.)</li>
                  <li>Proof of address (Utility bill, Rental agreement, etc.)</li>
                  <li>Recent passport-sized photograph</li>
                  <li>Age proof (must be 18 years or above)</li>
                </ul>
              </div>
              <DialogFooter>
                <Button onClick={() => setOpen(false)} variant="outline">Cancel</Button>
                <Button onClick={handleContinue}>Continue to Registration</Button>
              </DialogFooter>
            </>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name*</Label>
                    <Input 
                      id="firstName" 
                      placeholder="Enter first name" 
                      {...form.register("firstName")}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name*</Label>
                    <Input 
                      id="lastName" 
                      placeholder="Enter last name" 
                      {...form.register("lastName")}
                      required 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Gender*</Label>
                  <RadioGroup 
                    defaultValue="male" 
                    className="flex gap-4"
                    {...form.register("gender")}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">Female</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other">Other</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth*</Label>
                  <Input 
                    id="dob" 
                    type="date" 
                    {...form.register("dob")}
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="idType">ID Type*</Label>
                  <RadioGroup 
                    defaultValue="aadhar" 
                    className="flex flex-wrap gap-4"
                    {...form.register("idType")}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="aadhar" id="aadhar" />
                      <Label htmlFor="aadhar">Aadhar Card</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="passport" id="passport" />
                      <Label htmlFor="passport">Passport</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="drivingLicense" id="drivingLicense" />
                      <Label htmlFor="drivingLicense">Driving License</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="idNumber">ID Number*</Label>
                  <Input 
                    id="idNumber" 
                    placeholder="Enter your ID number" 
                    {...form.register("idNumber")}
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Full Address*</Label>
                  <Input 
                    id="address" 
                    placeholder="Enter your complete address" 
                    {...form.register("address")}
                    required 
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City*</Label>
                    <Input 
                      id="city" 
                      placeholder="Enter city" 
                      {...form.register("city")}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State*</Label>
                    <Input 
                      id="state" 
                      placeholder="Enter state" 
                      {...form.register("state")}
                      required 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode*</Label>
                  <Input 
                    id="pincode" 
                    placeholder="Enter pincode" 
                    {...form.register("pincode")}
                    required 
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="mobile">Mobile Number*</Label>
                    <Input 
                      id="mobile" 
                      type="tel" 
                      placeholder="+91 xxxxxxxxxx" 
                      {...form.register("mobile")}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="example@mail.com" 
                      {...form.register("email")}
                    />
                  </div>
                </div>
                
                <div className="space-y-2 pt-2">
                  <Label>Upload Documents</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" type="button" className="w-full">
                      Upload ID Proof
                    </Button>
                    <Button variant="outline" type="button" className="w-full">
                      Upload Photo
                    </Button>
                  </div>
                </div>
                
                <DialogFooter className="pt-4">
                  <Button onClick={() => setStep(1)} variant="outline">Back</Button>
                  <Button type="submit">Submit Registration</Button>
                </DialogFooter>
              </form>
            </Form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
