
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

export function VoterRegistration() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} className="w-full">Register Now</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Voter Registration</DialogTitle>
            <DialogDescription>
              Register as a new voter or update your existing registration details.
            </DialogDescription>
          </DialogHeader>
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
            <Button type="submit">Continue to Registration</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
