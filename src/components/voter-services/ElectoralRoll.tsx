
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

export function ElectoralRoll() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} className="w-full">Check Status</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Electoral Roll Check</DialogTitle>
            <DialogDescription>
              Verify if your name appears on the electoral roll.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="mb-4">To check your name on the electoral roll, you can:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Enter your Voter ID number</li>
              <li>Search by name and address details</li>
              <li>Use your mobile number (if registered)</li>
            </ul>
            <div className="mt-4 p-3 bg-muted rounded-md">
              <p className="text-sm">If your name is not found, you'll need to register as a new voter.</p>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setOpen(false)} variant="outline">Close</Button>
            <Button type="submit">Check Now</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
