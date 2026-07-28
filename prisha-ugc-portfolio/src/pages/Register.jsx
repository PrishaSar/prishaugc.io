import { Link } from "react-router-dom";
import { UserPlus } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";

export default function Register() {
  return (
    <AuthLayout
      icon={UserPlus}
      title="Signup unavailable"
      subtitle="This site runs independently of Base44"
    >
      <p className="text-sm text-foreground leading-relaxed">
        Registration is not supported in this standalone deployment. All content is loaded from the site and browser storage only.
      </p>
      <div className="mt-6 text-center">
        <Link to="/" className="text-primary font-medium hover:underline">
          Return to homepage
        </Link>
      </div>
    </AuthLayout>
  );
}
