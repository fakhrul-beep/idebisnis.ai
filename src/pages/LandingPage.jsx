import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, TrendingUp, Users, Shield, CheckCircle, ArrowRight, 
  Share2, Mail, MessageCircle, Star, Zap 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

function LandingPage() {
  const { toast } = useToast();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    toast({
      title: "Berhasil Subscribe! 🎉",
      description: "Terima kasih telah berlangganan newsletter IdeBisnisAI.",
    });
    setEmail('');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Disalin! 🔗",
      description: "Link IdeBisnisAI telah disalin ke clipboard. Bagikan ke temanmu!",
    });
  };

  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI Business Generator",
      description: "Masukkan prompt sederhana, dapatkan model bisnis lengkap."
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Analisis Pasar Lokal",
      description: "Data tren pasar Indonesia terkini dari sumber terpercaya."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Kompetitor Check",
      description: "Intip strategi Shopee & TikTok Shop kompetitor Anda."
    }
  ];

  return (
    <>
      <Helmet>
        <title>IdeBisnisAI - Validasi Ide Bisnis & Generator AI Indonesia</title>
        <meta name="description" content="Platform AI nomor 1 di Indonesia untuk mencari dan memvalidasi ide bisnis cuan. Gabung sekarang!" />
      </Helmet>
      
      <div className="min-h-screen bg-white">
        <Navbar />

        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-32 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full font-medium text-sm mb-6">
                <Zap className="w-4 h-4 fill-indigo-700" />
                #1 Platform Validasi Bisnis di Indonesia
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight leading-tight">
                Beri Aku Ide Bisnis <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                  Cuanable & Gratis
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                Bingung mau bisnis apa? Biarkan AI kami menganalisis potensi pasar, kompetitor, dan strategi cuan untuk Anda dalam hitungan detik.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/register">
                  <Button size="lg" className="h-14 px-8 text-lg bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-200">
                    Mulai Generate Ide Sekarang
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/product">
                  <Button variant="outline" size="lg" className="h-14 px-8 text-lg border-2">
                    Lihat Contoh Report
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-0 pointer-events-none">
            <div className="absolute top-20 left-10 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute top-20 right-10 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          </div>
        </section>

        {/* Social Proof Stats */}
        <section className="py-12 bg-white border-y border-gray-100">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <h3 className="text-4xl font-bold text-gray-900 mb-2">10.000+</h3>
                <p className="text-gray-500">Pengguna Aktif</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-gray-900 mb-2">50.000+</h3>
                <p className="text-gray-500">Report Generated</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-gray-900 mb-2">Rp 5M+</h3>
                <p className="text-gray-500">Potensi Hemat Riset</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-gray-900 mb-2">4.9/5</h3>
                <p className="text-gray-500">Rating Kepuasan</p>
              </div>
            </div>
          </div>
        </section>

        {/* Who We Are & Media */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Siapa Kami?</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                IdeBisnisAI adalah startup teknologi yang berfokus mendemokratisasi akses data riset pasar untuk UMKM Indonesia. Kami menggabungkan Big Data lokal dan Generative AI untuk memberikan wawasan bisnis setara konsultan mahal, dengan harga traktir kopi.
              </p>
            </div>

            <div className="text-center">
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-8">Diliput Oleh Media Ternama</p>
              <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                <img alt="TechCrunch Logo" className="h-8 object-contain" src="https://images.unsplash.com/photo-1603678610745-e67e8223b697" />
                <img alt="Forbes Logo" className="h-8 object-contain" src="https://images.unsplash.com/photo-1485531865381-286666aa80a9" />
                <img alt="Kompas Logo" className="h-8 object-contain" src="https://images.unsplash.com/photo-1691964657287-da5f3117827c" />
                <img alt="DailySocial Logo" className="h-8 object-contain" src="https://images.unsplash.com/photo-1576071574325-77b9333188b0" />
              </div>
            </div>
          </div>
        </section>

        {/* Features & Prompt Examples */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Fitur Canggih dengan Prompt Sederhana</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Cukup ketik ide kasar Anda, AI kami akan mengubahnya menjadi rencana bisnis komprehensif.
                </p>
                
                <div className="space-y-6">
                  {features.map((feature, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 shrink-0">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{feature.title}</h4>
                        <p className="text-gray-600 text-sm">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-900 rounded-2xl p-8 shadow-2xl relative">
                <div className="absolute top-4 left-4 flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="mt-8 space-y-4 font-mono text-sm">
                  <div className="text-gray-400 border-b border-gray-800 pb-2 mb-4">Contoh Prompt:</div>
                  <div className="bg-gray-800 p-4 rounded-lg text-green-400">
                    "Saya ingin buka usaha dessert box modal 5 juta di Jakarta Selatan, target mahasiswa."
                  </div>
                  <div className="flex justify-center text-gray-500 py-2">
                    <Sparkles className="w-4 h-4 animate-spin" /> Processing...
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg text-indigo-300">
                    <strong>Hasil Analisis AI:</strong><br/>
                    1. Potensi Pasar: Tinggi (Tren TikTok Dessert)<br/>
                    2. Kompetitor: Bittersweet by Najla<br/>
                    3. Strategi: Fokus pada varian 'Low Sugar' & Affiliate Marketing...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Us Grid */}
        <section className="py-20 bg-indigo-900 text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16">Kenapa Harus IdeBisnisAI?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                "Data Real-time Pasar Indonesia",
                "Integrasi Strategi TikTok & Shopee",
                "Panduan Funding Pemerintah",
                "Biaya 100x Lebih Murah dari Konsultan",
                "Akses Seumur Hidup ke Report",
                "Support Komunitas Pengusaha"
              ].map((reason, i) => (
                <div key={i} className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-colors">
                  <CheckCircle className="w-8 h-8 text-green-400 mb-4" />
                  <h3 className="text-xl font-semibold">{reason}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16 text-gray-900">Apa Kata Mereka?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: "Andi S.", role: "Owner Coffee Shop", text: "Gila sih, analisis kompetitornya detail banget. Jadi tau harus jual harga berapa." },
                { name: "Rina M.", role: "Dropshipper", text: "Fitur strategi TikTok-nya daging semua! Langsung praktek dan view naik." },
                { name: "Budi W.", role: "Startup Founder", text: "Membantu banget buat validasi ide sebelum bakar duit buat develop produk." }
              ].map((testi, i) => (
                <div key={i} className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm">
                  <div className="flex gap-1 mb-4 text-yellow-400">
                    {[1,2,3,4,5].map(star => <Star key={star} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-gray-600 mb-6">"{testi.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center font-bold text-indigo-600">
                      {testi.name[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{testi.name}</h4>
                      <p className="text-xs text-gray-500">{testi.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Pertanyaan Umum (FAQ)</h2>
            <div className="space-y-4">
              {[
                { q: "Apakah ini benar-benar menggunakan AI?", a: "Ya, kami menggunakan model bahasa besar (LLM) yang telah dilatih khusus dengan data bisnis dan tren pasar Indonesia." },
                { q: "Apakah saya bisa refund?", a: "Kami memberikan garansi kepuasan. Jika report tidak memberikan insight baru, hubungi kami dalam 24 jam." },
                { q: "Bagaimana cara bayarnya?", a: "Sangat mudah! Kami menerima pembayaran via QRIS yang support semua e-wallet (GoPay, OVO, Dana) dan Mobile Banking." }
              ].map((faq, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Subscribe & Community */}
        <section className="py-20 bg-indigo-600 text-white relative overflow-hidden">
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl font-bold mb-6">Jangan Ketinggalan Peluang Cuan!</h2>
            <p className="mb-8 opacity-90 max-w-xl mx-auto">
              Dapatkan update mingguan tentang ide bisnis yang lagi tren dan tips marketing gratis langsung ke emailmu.
            </p>
            
            <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex gap-2 mb-12">
              <input 
                type="email" 
                placeholder="Alamat email Anda..." 
                className="flex-1 px-6 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" variant="secondary" className="rounded-full px-6">
                Subscribe
              </Button>
            </form>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <Button onClick={handleShare} variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-indigo-600 gap-2">
                <Share2 className="w-4 h-4" />
                Share Ide ke Teman
              </Button>
              <Button className="bg-green-500 hover:bg-green-600 text-white gap-2 border-none">
                <MessageCircle className="w-4 h-4" />
                Gabung Grup WhatsApp
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

export default LandingPage;