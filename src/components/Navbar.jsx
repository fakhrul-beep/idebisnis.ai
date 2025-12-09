import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 10 }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 2 }}
            >
              <Sparkles className="w-8 h-8 text-indigo-600" />
            </motion.div>
            <span className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              IdeBisnisAI
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">
              Beranda
            </Link>
            <Link to="/product" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">
              Produk & Harga
            </Link>
            
            {user ? (
              <Link to="/dashboard">
                <Button className="bg-indigo-600 hover:bg-indigo-700">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login">
                  <Button variant="ghost" className="hover:bg-indigo-50 text-indigo-600">
                    Masuk
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-indigo-600 hover:bg-indigo-700">
                    Daftar Gratis
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-white border-b"
        >
          <div className="container px-4 py-4 flex flex-col gap-4">
            <Link to="/" className="text-sm font-medium p-2 hover:bg-gray-50 rounded-md">
              Beranda
            </Link>
            <Link to="/product" className="text-sm font-medium p-2 hover:bg-gray-50 rounded-md">
              Produk & Harga
            </Link>
            {user ? (
              <Link to="/dashboard">
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <div className="flex flex-col gap-2">
                <Link to="/login">
                  <Button variant="ghost" className="w-full justify-start">
                    Masuk
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                    Daftar Gratis
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
}

export default Navbar;