
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

export function PollingStation() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} className="w-full">Find Location</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Find Your Polling Station</DialogTitle>
            <DialogDescription>
              Locate your designated polling station for upcoming elections.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="mb-4">You can find your polling station by:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Entering your Voter ID number</li>
              <li>Providing your address details</li>
              <li>Searching by constituency</li>
            </ul>
            <div className="mt-4 p-3 bg-muted rounded-md">
              <p className="text-sm">Note: On voting day, please bring your Voter ID card and a valid photo identification.</p>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setOpen(false)} variant="outline">Close</Button>
            <Button type="submit">Search Location</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
