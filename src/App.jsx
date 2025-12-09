import { useState } from 'react';
import { Marked } from 'marked';
import qrisImage from './assets/qris.jpg'; // Taruh gambar QRIS di src/assets

const marked = new Marked();

function App() {
  const [idea, setIdea] = useState('');
  const [report, setReport] = useState('');
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false); // Ganti jadi true setelah verifikasi payment
  const [proof, setProof] = useState(''); // Optional: input referensi/no transaksi

  const generateReport = async (full = false) => {
    if (full && !paid) {
      alert('Bayar dulu Rp25.000 via QRIS, lalu konfirmasi!');
      return;
    }

    setLoading(true);
    setReport('');
    try {
      // Call OpenAI client-side (hati-hati expose key—nanti proxy kalau live)
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: full ? 'gpt-4o' : 'gpt-4o-mini',
          messages: [{ role: 'user', content: full 
            ? `Analisis mendalam ide bisnis Indonesia: "${idea}". Laporan lengkap bahasa Indonesia: Overview, SWOT, kompetitor (Shopee, Tokopedia, Gojek), strategi TikTok/Instagram, peluang UMKM, panduan dana KemenUMKM/BPS. Format Markdown detail 200+ halaman konsep.`
            : `Ringkasan validasi ide bisnis Indonesia: "${idea}". Overview, peluang, risiko. Bahasa Indonesia.`
          }],
          max_tokens: full ? 4000 : 500,
        })
      });
      const data = await response.json();
      setReport(data.choices[0].message.content);
    } catch (err) {
      setReport('Error: Gagal generate. Cek API key OpenAI.');
      console.error(err);
    }
    setLoading(false);
  };

  const handlePaymentConfirm = () => {
    // Manual confirm: Cek proof/referensi di dashboard bankmu, lalu setPaid(true) atau tambah form admin sederhana
    if (proof) {
      alert('Terima kasih! Kami cek pembayaran secepatnya (manual). Report full akan aktif setelah confirm.');
      setPaid(true); // Untuk test, langsung true. Live: Kirim email ke kamu atau pakai form.
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50 p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center text-blue-800 mb-4">IdeBisnis.ai</h1>
        <p className="text-center text-xl mb-8">Validasi Ide Bisnismu untuk Pasar Indonesia dalam Detik!</p>
        
        <textarea
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="Deskripsikan ide bisnismu, misal: 'Warung kopi online delivery via Gojek'"
          className="w-full p-4 border-2 border-blue-300 rounded-lg mb-6 text-lg"
          rows={6}
        />

        <div className="flex gap-4 justify-center mb-8">
          <button onClick={() => generateReport(false)} disabled={loading || !idea} className="bg-green-600 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-green-700">
            {loading ? 'Generating...' : 'Teaser Gratis'}
          </button>
          <button onClick={() => generateReport(true)} disabled={loading || !idea || !paid} className="bg-blue-700 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-blue-800">
            Full Report (Rp25.000)
          </button>
        </div>

        {!paid && idea && (
          <div className="bg-white p-8 rounded-xl shadow-lg text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Bayar Rp25.000 untuk Full Report</h2>
            <img src={qrisImage} alt="QRIS Payment" className="mx-auto w-64 h-64 mb-4" />
            <p className="mb-4">Scan QRIS di atas dengan app e-wallet/banking mu (DANA, OVO, GoPay, dll)</p>
            <input 
              type="text" 
              placeholder="Masukkan nomor referensi/transaksi (optional)" 
              value={proof} 
              onChange={(e) => setProof(e.target.value)} 
              className="w-full p-4 border mb-4"
            />
            <button onClick={handlePaymentConfirm} className="bg-green-600 text-white px-8 py-4 rounded-lg">Konfirmasi Pembayaran</button>
            <p className="text-sm mt-4 text-gray-600">Kami cek manual & aktifkan full report dalam 5-10 menit.</p>
          </div>
        )}

        {report && (
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div dangerouslySetInnerHTML={{ __html: marked.parse(report) }} className="prose max-w-none" />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
