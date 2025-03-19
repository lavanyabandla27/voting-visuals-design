
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQs() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} className="w-full">View FAQs</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Frequently Asked Questions</DialogTitle>
          </DialogHeader>
          <div className="py-2 max-h-[60vh] overflow-y-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Who can register as a voter?</AccordionTrigger>
                <AccordionContent>
                  Any citizen who is 18 years of age or above on the qualifying date (1st January of the year) can register as a voter. The person should not be disqualified under any law.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>How can I check if my name is on the voter list?</AccordionTrigger>
                <AccordionContent>
                  You can check your name on the voter list by visiting the Electoral Roll section on this website, by SMS, or by visiting your local Electoral Registration Office.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>What documents do I need for voter registration?</AccordionTrigger>
                <AccordionContent>
                  You will need proof of identity (Aadhar Card, Passport, Driving License, etc.), proof of address, age proof, and a recent passport-size photograph.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>How do I find my polling station?</AccordionTrigger>
                <AccordionContent>
                  You can find your polling station by checking your voter slip, using the "Find Polling Station" service on this website, or by sending an SMS to the designated number.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger>Can I vote if I've moved to a different city?</AccordionTrigger>
                <AccordionContent>
                  If you've moved to a different city, you'll need to apply for a transfer of your voter registration to your new address. You can do this online or by submitting Form 8A at your local Electoral Registration Office.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-6">
                <AccordionTrigger>What is EPIC?</AccordionTrigger>
                <AccordionContent>
                  EPIC (Electors Photo Identity Card) is the official voter ID card issued by the Election Commission. It serves as identity proof for voting in elections.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-7">
                <AccordionTrigger>How can I correct errors in my voter ID card?</AccordionTrigger>
                <AccordionContent>
                  You can apply for corrections in your voter ID card by submitting Form 8 along with supporting documents as proof for the correction requested.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <DialogClose asChild>
            <Button className="mt-2">Close</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
}
