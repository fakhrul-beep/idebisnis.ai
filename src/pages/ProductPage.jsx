import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { CheckCircle, Shield, X, HelpCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

function ProductPage() {
  const packages = [
    {
      name: "BASIC BUSINESS OVERVIEW",
      price: "GRATIS",
      originalPrice: null,
      description: "Validasi ide awal tanpa biaya.",
      features: [
        "Maksimal 500 kata output",
        "Peluang Market & Revenue",
        "Potensi Resiko",
        "Problem Pelanggan",
        "Gabung Whatsapp Group"
      ],
      cta: "Coba Gratis",
      ctaLink: "/new-idea",
      highlight: false
    },
    {
      name: "MARKET RESEARCH",
      price: "Rp 50.000",
      originalPrice: "Rp 150.000",
      description: "Analisis pasar & kompetitor mendalam.",
      features: [
        "Semua fitur Paket Basic",
        "Max 2.500 input / 7.500 output",
        "Trend Industry Terkini",
        "Analisa Kompetitor Lengkap",
        "Potensi Growth Bisnis"
      ],
      cta: "Beli Paket",
      ctaLink: "/payment/market-research",
      highlight: true
    },
    {
      name: "TAKE ACTION",
      price: "Rp 300.000",
      originalPrice: "Rp 750.000",
      description: "Panduan eksekusi langkah demi langkah.",
      features: [
        "Semua fitur Paket Market Research",
        "Max 2.500 input / 7.500 output",
        "Analisis Perilaku Konsumen",
        "Timeline Action Plan (Kapan Harus Action)",
        "Step by Step Guide (Bulan 1-3)",
        "Analisis Lingkungan Pendukung",
        "Branding Strategy",
        "Strategi Monetize"
      ],
      cta: "Beli Paket",
      ctaLink: "/payment/take-action",
      highlight: false
    },
    {
      name: "BUSINESS MODEL CANVAS (BMC)",
      price: "Rp 500.000",
      originalPrice: "Rp 1.250.000",
      description: "Kerangka bisnis profesional lengkap.",
      features: [
        "Semua fitur Paket Take Action",
        "Max 2.500 input / 7.500 output",
        "Business Model Canvas (11 Komponen)",
        "Value Propositions",
        "Revenue Streams & Cost Structure",
        "Akses Grup WA Platinum"
      ],
      cta: "Beli Paket",
      ctaLink: "/payment/bmc",
      highlight: false
    },
    {
      name: "MEET THE INVESTOR",
      price: "Rp 10.000.000",
      originalPrice: null,
      description: "Persiapan lengkap untuk fundraising & IPO.",
      features: [
        "Semua fitur Paket BMC",
        "Pitch Deck Profesional",
        "Proyeksi Keuangan Detail",
        "Marketing Plan (3-6 Bulan)",
        "Operational & Business Development Plan",
        "Human Capital Strategy",
        "IPO Strategy Roadmap",
        "1-on-1 Consultation Session",
        "Join Inkubator Bisnis Eksklusif"
      ],
      cta: "Hubungi Sales",
      ctaLink: "#contact",
      highlight: false
    }
  ];

  return (
    <>
      <Helmet>
        <title>Produk & Harga - IdeBisnisAI</title>
        <meta name="description" content="Pilih paket validasi bisnis yang sesuai. Mulai dari Basic Overview gratis hingga paket Investor lengkap dengan Pitch Deck." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <Navbar />

        {/* Header */}
        <div className="bg-indigo-900 text-white py-20 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Investasi Cerdas untuk Bisnis Anda</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Daripada rugi jutaan karena salah strategi, validasi ide bisnis Anda sekarang dengan data akurat berbasis AI.
            </p>
          </div>
        </div>

        {/* Pricing Comparison */}
        <section className="py-20 container mx-auto px-4" id="pricing">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pilih Paket Kesuksesan Anda</h2>
            <p className="text-gray-600">Sesuaikan dengan tahap bisnis Anda saat ini</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {packages.map((pkg, index) => (
              <div 
                key={index} 
                className={`flex flex-col rounded-2xl p-6 relative bg-white border ${pkg.highlight ? 'border-indigo-600 shadow-xl scale-105 z-10' : 'border-gray-200 shadow-sm hover:shadow-md'} transition-all`}
              >
                {pkg.highlight && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                    Paling Laris
                  </div>
                )}
                
                <div className="mb-6 text-center">
                  <h3 className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-2 h-10 flex items-center justify-center">{pkg.name}</h3>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {pkg.originalPrice && (
                      <span className="text-sm text-gray-400 line-through decoration-red-500">{pkg.originalPrice}</span>
                    )}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{pkg.price}</div>
                  <p className="text-xs text-gray-500 min-h-[40px]">{pkg.description}</p>
                </div>

                <div className="flex-grow space-y-3 mb-8">
                  {pkg.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      <span className="leading-tight">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto">
                  <Link to={pkg.ctaLink}>
                    <Button 
                      className={`w-full ${pkg.highlight ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-900 hover:bg-gray-800'}`}
                      variant={pkg.highlight ? 'default' : 'outline'}
                    >
                      {pkg.cta}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Feature Comparison Table (Optional Detail) */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 overflow-x-auto">
             <h3 className="text-2xl font-bold text-center mb-10">Perbandingan Fitur Detail</h3>
             <table className="w-full min-w-[800px] border-collapse text-sm">
               <thead>
                 <tr className="bg-gray-50">
                   <th className="p-4 text-left border">Fitur</th>
                   <th className="p-4 text-center border font-bold text-gray-900">Basic</th>
                   <th className="p-4 text-center border font-bold text-indigo-600">Market Research</th>
                   <th className="p-4 text-center border font-bold text-gray-900">Take Action</th>
                   <th className="p-4 text-center border font-bold text-gray-900">BMC</th>
                   <th className="p-4 text-center border font-bold text-gray-900">Investor</th>
                 </tr>
               </thead>
               <tbody>
                 {[
                   { name: "Output Words (Max)", v1: "500", v2: "7.500", v3: "7.500", v4: "7.500", v5: "Unlimited" },
                   { name: "Peluang & Resiko", v1: true, v2: true, v3: true, v4: true, v5: true },
                   { name: "Analisa Kompetitor", v1: false, v2: true, v3: true, v4: true, v5: true },
                   { name: "Action Plan 3 Bulan", v1: false, v2: false, v3: true, v4: true, v5: true },
                   { name: "Business Model Canvas", v1: false, v2: false, v3: false, v4: true, v5: true },
                   { name: "Pitch Deck & Financials", v1: false, v2: false, v3: false, v4: false, v5: true },
                   { name: "Konsultasi 1-on-1", v1: false, v2: false, v3: false, v4: false, v5: true },
                 ].map((row, i) => (
                   <tr key={i} className="hover:bg-gray-50">
                     <td className="p-3 border font-medium text-gray-700">{row.name}</td>
                     <td className="p-3 border text-center">{typeof row.v1 === 'boolean' ? (row.v1 ? <CheckCircle className="w-5 h-5 text-green-500 mx-auto"/> : <X className="w-5 h-5 text-gray-300 mx-auto"/>) : row.v1}</td>
                     <td className="p-3 border text-center bg-indigo-50/30">{typeof row.v2 === 'boolean' ? (row.v2 ? <CheckCircle className="w-5 h-5 text-green-500 mx-auto"/> : <X className="w-5 h-5 text-gray-300 mx-auto"/>) : row.v2}</td>
                     <td className="p-3 border text-center">{typeof row.v3 === 'boolean' ? (row.v3 ? <CheckCircle className="w-5 h-5 text-green-500 mx-auto"/> : <X className="w-5 h-5 text-gray-300 mx-auto"/>) : row.v3}</td>
                     <td className="p-3 border text-center">{typeof row.v4 === 'boolean' ? (row.v4 ? <CheckCircle className="w-5 h-5 text-green-500 mx-auto"/> : <X className="w-5 h-5 text-gray-300 mx-auto"/>) : row.v4}</td>
                     <td className="p-3 border text-center">{typeof row.v5 === 'boolean' ? (row.v5 ? <CheckCircle className="w-5 h-5 text-green-500 mx-auto"/> : <X className="w-5 h-5 text-gray-300 mx-auto"/>) : row.v5}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
          </div>
        </section>

        {/* Payment Info */}
        <section className="bg-gray-50 pb-20">
          <div className="max-w-3xl mx-auto text-center px-4">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold mb-6 flex items-center justify-center gap-2">
                <Shield className="w-6 h-6 text-green-600" />
                Pembayaran Aman & Instan via QRIS
              </h3>
              <p className="text-gray-600 mb-6">
                Kami menerima pembayaran dari semua E-Wallet dan Mobile Banking di Indonesia.
              </p>
              <div className="flex justify-center gap-4 mb-8 grayscale opacity-70">
                <div className="h-8 bg-gray-200 rounded w-16 flex items-center justify-center text-xs font-bold text-gray-500">GoPay</div>
                <div className="h-8 bg-gray-200 rounded w-16 flex items-center justify-center text-xs font-bold text-gray-500">OVO</div>
                <div className="h-8 bg-gray-200 rounded w-16 flex items-center justify-center text-xs font-bold text-gray-500">Dana</div>
                <div className="h-8 bg-gray-200 rounded w-16 flex items-center justify-center text-xs font-bold text-gray-500">BCA</div>
              </div>
              <div className="text-sm text-gray-500 border-t pt-4">
                <Link to="#" className="hover:text-indigo-600 mx-2">Kebijakan Privasi</Link> • 
                <Link to="#" className="hover:text-indigo-600 mx-2">Hubungi Kami</Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

export default ProductPage;