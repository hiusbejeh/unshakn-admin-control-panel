
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="text-center max-w-2xl">
        <div className="w-16 h-16 bg-unshakn-gold rounded-md mx-auto mb-6 flex items-center justify-center">
          <span className="text-black text-2xl font-bold">U</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gold-gradient">UNSHAKN</h1>
        <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
          From Athletes, For Athletes
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild className="bg-unshakn-gold hover:bg-unshakn-dark-gold text-black">
            <Link to="/admin">
              Admin Dashboard
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/">
              Home Page
            </Link>
          </Button>
        </div>
        <p className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          This is a demo landing page for the Unshakn Admin Dashboard.
          Click "Admin Dashboard" to access the admin area.
        </p>
      </div>
    </div>
  );
};

export default Index;
