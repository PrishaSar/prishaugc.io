import { Link } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";

export default function ForgotPassword() {
  return (
    <AuthLayout
      icon={Mail}
      title="Password reset disabled"
      subtitle="This standalone site does not support password recovery"
      footer={
        <Link to="/" className="text-primary font-medium hover:underline">
          <ArrowLeft className="w-3 h-3 inline mr-1" />Back to home
        </Link>
      }
    >
      <p className="text-sm text-foreground leading-relaxed">
        Password reset is only available in the Base44-managed version. This GitHub Pages deployment runs without backend authentication.
      </p>
    </AuthLayout>
  );
}
