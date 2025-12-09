import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ArrowLeft, CheckCircle, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

function PaymentPage() {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
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
        if (data.isPaid) {
          navigate(`/report/${id}`);
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

  const handleCopyQris = () => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const handleConfirmPayment = async () => {
    try {
      const docRef = doc(db, 'reports', id);
      await updateDoc(docRef, {
        isPaid: true,
        paidAt: new Date(),
      });
      
      setPaymentConfirmed(true);
      
      toast({
        title: "Pembayaran Berhasil!",
        description: "Terima kasih! Laporan premium Anda sudah siap.",
      });
      
      setTimeout(() => {
        navigate(`/report/${id}`);
      }, 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal mengkonfirmasi pembayaran",
        variant: "destructive",
      });
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
        <title>Pembayaran - IdeBisnisAI</title>
        <meta name="description" content="Selesaikan pembayaran untuk mendapatkan akses penuh ke laporan premium Anda." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <nav className="bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <button
              onClick={() => navigate(`/report/${id}`)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Kembali ke Laporan
            </button>
          </div>
        </nav>

        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            {!paymentConfirmed ? (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Upgrade ke Premium</h1>
                <p className="text-gray-600 mb-8">Selesaikan pembayaran untuk mendapatkan laporan lengkap</p>

                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-semibold text-gray-900">Total Pembayaran</span>
                    <span className="text-3xl font-bold text-indigo-600">Rp25.000</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>✓ Laporan Premium 200+ halaman</p>
                    <p>✓ Analisis lengkap dan mendalam</p>
                    <p>✓ Akses selamanya</p>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Metode Pembayaran</h2>
                  
                  <div className="border-2 border-indigo-600 rounded-xl p-6 bg-indigo-50">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">QRIS Payment</h3>
                      <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm">
                        Recommended
                      </span>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 mb-4">
                      <div className="aspect-square max-w-[300px] mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
                        <p className="text-gray-500 text-center">
                          QR Code akan muncul di sini<br/>
                          <span className="text-sm">(Demo mode)</span>
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Button
                        onClick={handleCopyQris}
                        variant="outline"
                        className="w-full"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Salin Link Pembayaran
                      </Button>
                      
                      <div className="text-sm text-gray-600 bg-white rounded-lg p-4">
                        <p className="font-semibold mb-2">Cara Pembayaran:</p>
                        <ol className="list-decimal list-inside space-y-1">
                          <li>Buka aplikasi e-wallet Anda (GoPay, OVO, DANA, dll)</li>
                          <li>Scan QR code di atas atau gunakan link pembayaran</li>
                          <li>Konfirmasi pembayaran sebesar Rp25.000</li>
                          <li>Klik tombol "Konfirmasi Pembayaran" di bawah</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleConfirmPayment}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 py-4 text-lg"
                >
                  Konfirmasi Pembayaran
                </Button>

                <p className="text-sm text-gray-500 text-center mt-4">
                  Dengan melakukan pembayaran, Anda menyetujui syarat dan ketentuan kami
                </p>
              </div>
            ) : (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-2xl shadow-xl p-12 text-center"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Pembayaran Berhasil!</h2>
                <p className="text-gray-600 mb-6">
                  Terima kasih! Anda akan diarahkan ke laporan premium dalam beberapa detik...
                </p>
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default PaymentPage;