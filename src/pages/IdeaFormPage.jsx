import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { auth, db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

function IdeaFormPage() {
  const [ideaDescription, setIdeaDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const user = auth.currentUser;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ideaDescription.trim()) {
      toast({
        title: "Deskripsi Kosong",
        description: "Mohon masukkan deskripsi ide bisnis Anda",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const docRef = await addDoc(collection(db, 'reports'), {
        userId: user.uid,
        ideaDescription: ideaDescription.trim(),
        isPaid: false,
        createdAt: serverTimestamp(),
      });

      toast({
        title: "Laporan Dibuat!",
        description: "Laporan preview Anda telah berhasil dibuat",
      });
      
      navigate(`/report/${docRef.id}`);
    } catch (error) {
      toast({
        title: "Gagal Membuat Laporan",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Ide Bisnis Baru - IdeBisnisAI</title>
        <meta name="description" content="Masukkan deskripsi ide bisnis Anda untuk mendapatkan analisis lengkap dari AI." />
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

        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-8 h-8 text-indigo-600" />
                <h1 className="text-3xl font-bold text-gray-900">Deskripsikan Ide Bisnis Anda</h1>
              </div>

              <p className="text-gray-600 mb-8">
                Jelaskan ide bisnis Anda secara detail. Semakin lengkap deskripsi Anda, semakin akurat analisis yang akan kami berikan.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deskripsi Ide Bisnis
                  </label>
                  <textarea
                    value={ideaDescription}
                    onChange={(e) => setIdeaDescription(e.target.value)}
                    rows={10}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Contoh: Saya ingin membuka bisnis kopi kekinian dengan konsep drive-thru di area Jabodetabek. Target pasar adalah pekerja kantoran dan mahasiswa yang mencari kopi berkualitas dengan harga terjangkau..."
                    required
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Tip: Sertakan informasi tentang target pasar, lokasi, produk/layanan, dan keunikan bisnis Anda
                  </p>
                </div>

                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                  <h3 className="font-semibold text-indigo-900 mb-2">Yang Akan Anda Dapatkan:</h3>
                  <ul className="text-sm text-indigo-700 space-y-1">
                    <li>✓ Preview Analisis SWOT</li>
                    <li>✓ Ringkasan Analisis Kompetitor</li>
                    <li>✓ Strategi Dasar TikTok Marketing</li>
                    <li>✓ Upgrade ke Premium untuk laporan lengkap 200+ halaman</li>
                  </ul>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 py-4 text-lg"
                  disabled={loading}
                >
                  {loading ? 'Memproses...' : 'Generate Laporan'}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default IdeaFormPage;