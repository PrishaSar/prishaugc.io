import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";

export default function Login() {
  return (
    <AuthLayout
      icon={AlertTriangle}
      title="Authentication unavailable"
      subtitle="This site runs independently of Base44"
    >
      <p className="text-sm text-foreground leading-relaxed">
        Login is not supported in this standalone deployment. The portfolio content is served from local data and browser storage only.
      </p>
      <div className="mt-6 text-center">
        <Link to="/" className="text-primary font-medium hover:underline">
          Return to homepage
        </Link>
      </div>
    </AuthLayout>
  );
}
