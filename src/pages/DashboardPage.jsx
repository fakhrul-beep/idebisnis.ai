import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { auth, db } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { Sparkles, Plus, FileText, LogOut, MessageCircle, DollarSign, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import ChatBot from '@/components/ChatBot';
import Navbar from '@/components/Navbar';

function DashboardPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadReports();
  }, [user]);

  const loadReports = async () => {
    try {
      const q = query(
        collection(db, 'reports'),
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const reportsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setReports(reportsData);
    } catch (error) {
      console.error('Error loading reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Logout Berhasil",
        description: "Sampai jumpa lagi!",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Logout Gagal",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleCopyReferral = () => {
    const code = `IDE-${user.uid.substring(0, 6).toUpperCase()}`;
    navigator.clipboard.writeText(`https://idebisnisai.com/ref/${code}`);
    toast({
      title: "Link Affiliate Disalin!",
      description: "Bagikan link ini dan dapatkan komisi 20%!",
    });
  };

  return (
    <>
      <Helmet>
        <title>Dashboard Membership - IdeBisnisAI</title>
        <meta name="description" content="Dashboard IdeBisnisAI - Kelola laporan dan program affiliate Anda." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <Navbar />

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Halo, {user?.displayName || 'Partner'}! 👋</h1>
              <p className="text-gray-600">Selamat datang di dashboard membership Anda.</p>
            </motion.div>
            
            <Button variant="ghost" onClick={handleLogout} className="text-red-600 hover:bg-red-50">
              <LogOut className="w-4 h-4 mr-2" />
              Keluar
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column: Reports */}
            <div className="lg:col-span-2 space-y-8">
               {/* Create New Action */}
               <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-indigo-600 rounded-2xl p-6 text-white shadow-lg flex items-center justify-between"
              >
                <div>
                  <h3 className="text-xl font-bold mb-1">Punya Ide Baru?</h3>
                  <p className="text-indigo-100 text-sm">Validasi sekarang sebelum keduluan orang lain.</p>
                </div>
                <Link to="/new-idea">
                  <Button size="lg" className="bg-white text-indigo-600 hover:bg-indigo-50 border-none">
                    <Plus className="w-5 h-5 mr-2" />
                    Buat Laporan Baru
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Riwayat Laporan
                </h2>
                
                {loading ? (
                  <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                  </div>
                ) : reports.length === 0 ? (
                  <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-100">
                    <p className="text-gray-500 mb-4">Belum ada laporan yang dibuat.</p>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {reports.map((report, index) => (
                      <motion.div
                        key={report.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link to={`/report/${report.id}`}>
                          <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100 h-full flex flex-col">
                            <div className="flex items-start justify-between mb-3">
                              <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                                <Sparkles className="w-5 h-5" />
                              </div>
                              {report.isPaid ? (
                                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">Premium</span>
                              ) : (
                                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full font-medium">Draft</span>
                              )}
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-auto line-clamp-2">
                              {report.ideaDescription.substring(0, 50)}...
                            </h3>
                            <p className="text-xs text-gray-400 mt-4">
                              {new Date(report.createdAt?.toDate()).toLocaleDateString('id-ID', {
                                day: 'numeric', month: 'short', year: 'numeric'
                              })}
                            </p>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>

            {/* Right Column: Affiliate & Profile */}
            <div className="space-y-8">
              {/* Affiliate Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg"
              >
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign className="w-6 h-6 text-yellow-300" />
                  <h3 className="text-lg font-bold">Program Affiliate</h3>
                </div>
                <p className="text-sm text-indigo-100 mb-6">
                  Ajak teman menggunakan IdeBisnisAI dan dapatkan komisi 20% (Rp 5.000) per transaksi!
                </p>
                
                <div className="bg-white/10 rounded-lg p-4 mb-4 backdrop-blur-sm">
                  <div className="text-xs text-indigo-200 mb-1">Total Komisi Anda</div>
                  <div className="text-2xl font-bold">Rp 0</div>
                </div>

                <Button onClick={handleCopyReferral} className="w-full bg-white text-indigo-600 hover:bg-gray-100 border-none">
                  <Copy className="w-4 h-4 mr-2" />
                  Salin Link Referral
                </Button>
              </motion.div>

              {/* Support Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">Butuh Bantuan?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Tim support kami siap membantu kendala teknis atau pertanyaan seputar report.
                </p>
                <Button variant="outline" className="w-full" onClick={() => setShowChat(true)}>
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat Support
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Floating Chat Button */}
        <button
          onClick={() => setShowChat(!showChat)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 z-50"
        >
          <MessageCircle className="w-6 h-6" />
        </button>

        {/* ChatBot */}
        {showChat && <ChatBot onClose={() => setShowChat(false)} />}
      </div>
    </>
  );
}

export default DashboardPage;