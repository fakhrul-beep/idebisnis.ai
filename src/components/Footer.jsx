import React from 'react';
import { Link } from 'react-router-dom';
import { Youtube, Instagram, Facebook, Globe, Send, MessageCircle } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">IdeBisnisAI</h3>
            <p className="mb-6 opacity-80">
              Platform validasi ide bisnis #1 di Indonesia dengan teknologi AI canggih untuk membantu UMKM naik kelas.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors"><Youtube className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Globe className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Menu</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-indigo-400 transition-colors">Beranda</Link></li>
              <li><Link to="/product" className="hover:text-indigo-400 transition-colors">Produk & Harga</Link></li>
              <li><Link to="/login" className="hover:text-indigo-400 transition-colors">Masuk</Link></li>
              <li><Link to="/register" className="hover:text-indigo-400 transition-colors">Daftar</Link></li>
            </ul>
          </div>

          {/* Legal & Info */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Informasi</h4>
            <ul className="space-y-2">
              <li><Link to="/product" className="hover:text-indigo-400 transition-colors">Blog Ide Bisnis</Link></li>
              <li><Link to="/product" className="hover:text-indigo-400 transition-colors">Aturan Penggunaan</Link></li>
              <li><Link to="/product" className="hover:text-indigo-400 transition-colors">Kebijakan Privasi</Link></li>
              <li><Link to="/product" className="hover:text-indigo-400 transition-colors">Update Terbaru</Link></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Komunitas</h4>
            <div className="space-y-4">
              <a href="#" className="flex items-center gap-2 hover:text-indigo-400 transition-colors">
                <Send className="w-5 h-5" />
                <span>Join Telegram Group</span>
              </a>
              <a href="#" className="flex items-center gap-2 hover:text-indigo-400 transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span>Join WhatsApp Group</span>
              </a>
              <p className="text-sm opacity-60 mt-4">
                Dapatkan update ide bisnis harian dan networking dengan sesama pengusaha.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; 2025 IdeBisnisAI. Dibuat dengan ❤️ untuk Indonesia.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;