import { useState } from 'react';
import { Marked } from 'marked';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const marked = new Marked();
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function App() {
  const [idea, setIdea] = useState('');
  const [report, setReport] = useState('');
  const [loading, setLoading] = useState(false);

  const generateReport = async (full = false) => {
    setLoading(true);
    setReport('');
    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: full ? 'gpt-4o' : 'gpt-4o-mini',
        messages: [{ role: 'user', content: full 
          ? `Analisis mendalam ide bisnis Indonesia: "${idea}". Buat laporan lengkap dalam bahasa Indonesia: Overview, SWOT, kompetitor lokal (Shopee, Tokopedia, Gojek), strategi TikTok/Instagram, peluang UMKM, panduan dana dari investor/KemenUMKM. Format Markdown.` 
          : `Ringkasan singkat validasi ide bisnis Indonesia: "${idea}". Berikan overview, peluang, risiko. Bahasa Indonesia.` 
        }],
        max_tokens: full ? 4000 : 500,
      }, {
        headers: { Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}` }
      });
      setReport(response.data.choices[0].message.content);
    } catch (err) {
      setReport('Error: Gagal generate report. Cek console.');
      console.error(err);
    }
    setLoading(false);
  };

  const checkoutFull = async () => {
    const stripe = await stripePromise;
    const { data } = await axios.post('/.netlify/functions/create-checkout', { idea }); // Nanti buat function ini kalau deploy Netlify, atau ganti ke backend lain
    // Sementara pakai Stripe langsung (butuh backend untuk security)
    // Alternatif cepat: Redirect ke pre-made Stripe link, atau setup proxy
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50 p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center text-blue-800 mb-4">IdeBisnis.ai</h1>
        <p className="text-center text-xl mb-8">Validasi Ide Bisnismu untuk Pasar Indonesia dalam Detik!</p>
        
        <textarea
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="Deskripsikan ide bisnismu, misal: 'Toko online batik modern via TikTok Shop'"
          className="w-full p-4 border-2 border-blue-300 rounded-lg mb-6 text-lg"
          rows={6}
        />

        <div className="flex gap-4 justify-center mb-8">
          <button onClick={() => generateReport(false)} disabled={loading || !idea} className="bg-green-600 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-green-700">
            {loading ? 'Generating...' : 'Teaser Gratis'}
          </button>
          <button onClick={() => generateReport(true)} disabled={loading || !idea} className="bg-blue-700 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-blue-800">
            Full Report (Test Mode)
          </button>
        </div>

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
