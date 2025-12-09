import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { ArrowLeft, Lock, Sparkles, TrendingUp, Users, Target, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

function ReportPage() {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const user = auth.currentUser;

  useEffect(() => {
    loadReport();
  }, [id]);

  const loadReport = async () => {
    try {
      const docRef = doc(db, 'reports', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.userId !== user.uid) {
          toast({
            title: "Akses Ditolak",
            description: "Anda tidak memiliki akses ke laporan ini",
            variant: "destructive",
          });
          navigate('/dashboard');
          return;
        }
        setReport({ id: docSnap.id, ...data });
      } else {
        toast({
          title: "Laporan Tidak Ditemukan",
          description: "Laporan yang Anda cari tidak ada",
          variant: "destructive",
        });
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error loading report:', error);
      toast({
        title: "Error",
        description: "Gagal memuat laporan",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Laporan Validasi - IdeBisnisAI</title>
        <meta name="description" content="Lihat hasil analisis validasi ide bisnis Anda dengan teknologi AI." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <nav className="bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Kembali ke Dashboard
            </button>
          </div>
        </nav>

        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            {/* Report Header */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-8 h-8 text-indigo-600" />
                  <h1 className="text-3xl font-bold text-gray-900">Laporan Validasi Bisnis</h1>
                </div>
                {report?.isPaid ? (
                  <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
                    Premium
                  </span>
                ) : (
                  <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-semibold">
                    Preview
                  </span>
                )}
              </div>
              
              <div className="bg-indigo-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-indigo-900 mb-2">Ide Bisnis Anda:</h3>
                <p className="text-indigo-700">{report?.ideaDescription}</p>
              </div>

              <p className="text-sm text-gray-500">
                Dibuat pada {new Date(report?.createdAt?.toDate()).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>

            {/* Preview Content */}
            <div className="space-y-6">
              {/* SWOT Analysis Preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-6 h-6 text-indigo-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Analisis SWOT</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-50 rounded-lg p-4">
                    <h3 className="font-semibold text-green-900 mb-2">Kekuatan (Strengths)</h3>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Konsep bisnis yang inovatif</li>
                      <li>• Potensi pasar yang besar</li>
                      {report?.isPaid && <li>• Target segmen yang jelas</li>}
                      {!report?.isPaid && (
                        <li className="flex items-center gap-2 text-gray-400">
                          <Lock className="w-4 h-4" />
                          5+ poin lainnya di versi premium
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="bg-red-50 rounded-lg p-4">
                    <h3 className="font-semibold text-red-900 mb-2">Kelemahan (Weaknesses)</h3>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• Persaingan yang ketat</li>
                      <li>• Membutuhkan modal awal</li>
                      {!report?.isPaid && (
                        <li className="flex items-center gap-2 text-gray-400">
                          <Lock className="w-4 h-4" />
                          5+ poin lainnya di versi premium
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 mb-2">Peluang (Opportunities)</h3>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Pertumbuhan pasar digital</li>
                      <li>• Tren konsumsi lokal</li>
                      {!report?.isPaid && (
                        <li className="flex items-center gap-2 text-gray-400">
                          <Lock className="w-4 h-4" />
                          5+ poin lainnya di versi premium
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="bg-yellow-50 rounded-lg p-4">
                    <h3 className="font-semibold text-yellow-900 mb-2">Ancaman (Threats)</h3>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Kompetitor besar seperti Shopee</li>
                      <li>• Perubahan regulasi</li>
                      {!report?.isPaid && (
                        <li className="flex items-center gap-2 text-gray-400">
                          <Lock className="w-4 h-4" />
                          5+ poin lainnya di versi premium
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Competitor Analysis Preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-6 h-6 text-indigo-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Analisis Kompetitor</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="border-l-4 border-indigo-600 pl-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Shopee</h3>
                    <p className="text-gray-600 text-sm">
                      Platform e-commerce terbesar dengan jutaan seller aktif...
                    </p>
                    {!report?.isPaid && (
                      <p className="text-gray-400 text-sm mt-2 flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        Analisis lengkap tersedia di versi premium
                      </p>
                    )}
                  </div>

                  <div className="border-l-4 border-purple-600 pl-4">
                    <h3 className="font-semibold text-gray-900 mb-2">TikTok Shop</h3>
                    <p className="text-gray-600 text-sm">
                      Platform social commerce yang sedang berkembang pesat...
                    </p>
                    {!report?.isPaid && (
                      <p className="text-gray-400 text-sm mt-2 flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        Analisis lengkap tersedia di versi premium
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* TikTok Strategy Preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-6 h-6 text-indigo-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Strategi TikTok Scaling</h2>
                </div>
                
                <p className="text-gray-600 mb-4">
                  Panduan lengkap untuk memanfaatkan TikTok sebagai channel pertumbuhan bisnis Anda
                </p>
                
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Preview Strategi:</h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>✓ Membuat konten viral yang engaging</li>
                    <li>✓ Memanfaatkan TikTok Shop dan affiliate</li>
                    {!report?.isPaid && (
                      <li className="flex items-center gap-2 text-gray-400">
                        <Lock className="w-4 h-4" />
                        20+ strategi detail di versi premium
                      </li>
                    )}
                  </ul>
                </div>
              </motion.div>

              {/* KemenUKM Funding Preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign className="w-6 h-6 text-indigo-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Panduan Funding KemenUKM</h2>
                </div>
                
                <p className="text-gray-600 mb-4">
                  Informasi lengkap tentang program pendanaan dari Kementerian UMKM
                </p>
                
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Program Tersedia:</h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>✓ KUR (Kredit Usaha Rakyat)</li>
                    <li>✓ Program Inkubasi Bisnis</li>
                    {!report?.isPaid && (
                      <li className="flex items-center gap-2 text-gray-400">
                        <Lock className="w-4 h-4" />
                        10+ program funding di versi premium
                      </li>
                    )}
                  </ul>
                </div>
              </motion.div>

              {/* Upgrade CTA */}
              {!report?.isPaid && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white text-center"
                >
                  <Sparkles className="w-12 h-12 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold mb-2">Unlock Laporan Lengkap</h2>
                  <p className="text-lg mb-6 opacity-90">
                    Dapatkan akses ke 200+ halaman analisis mendalam hanya Rp25.000
                  </p>
                  
                  <div className="bg-white/10 rounded-lg p-4 mb-6 max-w-md mx-auto">
                    <h3 className="font-semibold mb-2">Yang Akan Anda Dapatkan:</h3>
                    <ul className="text-sm space-y-1 text-left">
                      <li>✓ Analisis SWOT lengkap dengan 20+ poin</li>
                      <li>✓ Riset kompetitor mendalam (10+ kompetitor)</li>
                      <li>✓ Strategi TikTok scaling step-by-step</li>
                      <li>✓ Panduan lengkap funding KemenUKM</li>
                      <li>✓ Proyeksi keuangan 3 tahun</li>
                      <li>✓ Strategi marketing digital</li>
                      <li>✓ Template business plan</li>
                    </ul>
                  </div>
                  
                  <Link to={`/payment/${report.id}`}>
                    <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 text-lg px-8">
                      Upgrade ke Premium - Rp25.000
                    </Button>
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default ReportPage;