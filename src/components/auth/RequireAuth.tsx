import { Navigate } from "react-router-dom";
import { useAuth, UserRole } from "@/hooks/useAuth";

interface RequireAuthProps {
  children: React.ReactNode;
  allowedRole?: UserRole;
}

export const RequireAuth = ({ children, allowedRole }: RequireAuthProps) => {
  const { user, role, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Not authenticated - redirect to role selection
  if (!user) {
    return <Navigate to="/user-select" replace />;
  }

  // Check role-based access
  if (allowedRole && role !== allowedRole) {
    // If promoter tries to access donor routes, redirect to studio
    if (role === "promoter") {
      return <Navigate to="/studio" replace />;
    }
    // If donor tries to access promoter routes, redirect to donor dashboard
    if (role === "donor") {
      return <Navigate to="/donor-dashboard" replace />;
    }
    // No role set - redirect to role selection
    return <Navigate to="/user-select" replace />;
  }

  return <>{children}</>;
};
