
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { requestNotificationPermission, scheduleNotification } from "@/utils/notifications";

export const BookingForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const enableNotifications = async () => {
    const granted = await requestNotificationPermission();
    setNotificationsEnabled(granted);
    if (granted) {
      toast({
        title: "Notifications Enabled",
        description: "You'll receive reminders about your service appointment.",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Get the selected date from the form
    const formData = new FormData(e.currentTarget);
    const serviceDate = formData.get('date') as string;

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (notificationsEnabled && serviceDate) {
      await scheduleNotification(new Date(serviceDate));
    }

    toast({
      title: "Booking Submitted",
      description: "We'll contact you shortly to confirm your appointment.",
    });

    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section className="py-24 bg-gray-50" id="book-service">
      <div className="container px-4">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-12 animate-fade-up">
            <h2 className="text-3xl font-bold mb-4">Book a Service</h2>
            <p className="text-gray-600">
              Schedule your annual boiler service or request a general plumbing consultation.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6 animate-fade-up">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" required placeholder="Enter your name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" type="tel" required placeholder="Enter your phone number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required placeholder="Enter your email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Preferred Date</Label>
              <Input id="date" name="date" type="date" required className="w-full" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="service">Service Type</Label>
              <select
                id="service"
                name="service"
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                required
              >
                <option value="">Select a service</option>
                <option value="boiler">Annual Boiler Service</option>
                <option value="general">General Plumbing</option>
                <option value="emergency">Emergency Repair</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Additional Details</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Please provide any additional details about the service you need"
                className="min-h-[100px]"
              />
            </div>
            {!notificationsEnabled && (
              <Button 
                type="button" 
                variant="outline" 
                className="w-full"
                onClick={enableNotifications}
              >
                Enable Appointment Reminders
              </Button>
            )}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Book Now"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
