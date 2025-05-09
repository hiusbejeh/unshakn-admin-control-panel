
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/providers/AuthProvider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate a loading state
    setTimeout(() => {
      const success = login(password);
      
      if (success) {
        toast.success("Login successful");
        navigate("/admin/dashboard");
      } else {
        setError("Invalid password. Please try again.");
        toast.error("Login failed");
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="bg-card border border-border rounded-lg shadow-lg p-8">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 rounded-xl bg-unshakn-gold flex items-center justify-center">
              <span className="text-black font-bold text-3xl">U</span>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-center mb-2">UNSHAKN Admin</h2>
          <p className="text-muted-foreground text-center mb-6">Enter your password to continue</p>
          
          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`bg-background ${error ? 'border-destructive' : ''}`}
                />
                {error && (
                  <motion.p
                    className="text-sm text-destructive mt-1"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {error}
                  </motion.p>
                )}
              </div>
              
              <div>
                <Button 
                  type="submit" 
                  className="w-full bg-unshakn-gold hover:bg-unshakn-dark-gold text-black"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Logging in...
                    </div>
                  ) : "Login to Dashboard"}
                </Button>
              </div>
            </div>
          </form>
          
          <p className="text-xs text-muted-foreground text-center mt-8">
            Secured UNSHAKN Administrative Portal
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
