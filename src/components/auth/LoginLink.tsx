
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const LoginLink = () => {
  return (
    <Link to="/login">
      <Button variant="outline" size="sm">Log In</Button>
    </Link>
  );
};
