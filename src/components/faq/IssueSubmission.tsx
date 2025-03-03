
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import IssueSubmissionForm from "./IssueSubmissionForm";

const IssueSubmission = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <>
      {/* Floating Submit Issue Button */}
      <Button 
        onClick={() => setIsSheetOpen(true)}
        className="fixed bottom-20 right-6 md:bottom-6 md:right-6 z-40 rounded-full shadow-lg"
        size="lg"
      >
        <Plus className="mr-2" />
        Submit Issue
      </Button>

      {/* Submit Issue Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="overflow-y-auto scrollbar-hide">
          <SheetHeader className="mb-6">
            <SheetTitle>Submit Your Plumbing Issue</SheetTitle>
            <SheetDescription>
              Upload photos or videos of the issue to help us diagnose the problem more accurately. Our team will review your submission and contact you with next steps.
            </SheetDescription>
          </SheetHeader>
          
          <IssueSubmissionForm onClose={() => setIsSheetOpen(false)} />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default IssueSubmission;
