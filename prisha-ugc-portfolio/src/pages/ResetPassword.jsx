import { Link } from "react-router-dom";
import { Lock, AlertTriangle } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";

export default function ResetPassword() {
  return (
    <AuthLayout
      icon={AlertTriangle}
      title="Password reset disabled"
      subtitle="This standalone site does not support password reset"
      footer={
        <Link to="/" className="text-primary font-medium hover:underline">
          Back to home
        </Link>
      }
    >
      <p className="text-sm text-foreground leading-relaxed">
        Password reset is unavailable because this deployment does not include the Base44 auth backend.
      </p>
    </AuthLayout>
  );
}
