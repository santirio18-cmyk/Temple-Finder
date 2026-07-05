import { useState } from 'react';
import { fetchChennaiTemples, formatTemplesForDataFile, type GoogleTemple } from '@/services/googlePlacesService';
import PageHeader from '@/components/PageHeader';
import { useNavigate } from 'react-router-dom';

export default function AdminPanel() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [temples, setTemples] = useState<GoogleTemple[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [formattedData, setFormattedData] = useState<string>('');
  
  const handleFetch = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Starting to fetch Chennai temples...');
      const results = await fetchChennaiTemples();
      
      if (results.length === 0) {
        setError('No temples found. Check your API key and console for errors.');
        return;
      }
      
      setTemples(results);
      
      // Format for easy copying to data.ts
      const formatted = formatTemplesForDataFile(results);
      setFormattedData(formatted);
      
      console.log('✅ Successfully fetched', results.length, 'temples!');
      console.log('📋 Formatted data ready to copy!');
      
    } catch (err) {
      console.error('Error fetching temples:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(formattedData);
    alert('Copied to clipboard! Paste this into your data.ts file.');
  };
  
  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Admin Panel"
        onBack={() => navigate('/')}
      />
      
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            🏛️ Fetch Real Chennai Temples
          </h2>
          <p className="text-gray-600 mb-6">
            This will fetch real temple data from Google Places API with photos, ratings, and locations.
          </p>
          
          <button
            onClick={handleFetch}
            disabled={loading}
            className={`px-8 py-4 rounded-xl font-semibold text-white transition-all ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl'
            }`}
          >
            {loading ? (
              <span className="flex items-center gap-3">
                <span className="inline-block w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></span>
                Fetching temples... (this may take 1-2 minutes)
              </span>
            ) : (
              '🚀 Fetch Chennai Temples from Google'
            )}
          </button>
          
          {error && (
            <div className="mt-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
              <p className="text-red-800 font-semibold">❌ Error:</p>
              <p className="text-red-600 mt-1">{error}</p>
            </div>
          )}
        </div>
        
        {temples.length > 0 && (
          <>
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 mb-6">
              <h3 className="text-xl font-bold text-green-900 mb-2">
                ✅ Success! Found {temples.length} temples
              </h3>
              <p className="text-green-700">
                Real temple data with photos and ratings from Google Maps!
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  📋 Formatted Data (Copy to data.ts)
                </h3>
                <button
                  onClick={handleCopy}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                >
                  📋 Copy to Clipboard
                </button>
              </div>
              <pre className="bg-gray-900 text-green-400 p-6 rounded-xl overflow-auto max-h-96 text-sm">
                {formattedData}
              </pre>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                🏛️ Preview: {temples.length} Temples
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-auto">
                {temples.map((temple, idx) => (
                  <div key={temple.id} className="border-2 border-gray-200 rounded-xl p-4 hover:border-orange-400 transition-colors">
                    {temple.image && (
                      <img
                        src={temple.image}
                        alt={temple.name}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                    )}
                    <p className="font-bold text-gray-900 text-sm mb-1">
                      {idx + 1}. {temple.name}
                    </p>
                    <p className="text-xs text-orange-600 font-semibold mb-1">
                      {temple.deity}
                    </p>
                    <p className="text-xs text-gray-600 mb-1">
                      📍 {temple.address}
                    </p>
                    <p className="text-xs text-gray-500">
                      ⭐ {temple.rating} {temple.userRatingsTotal && `(${temple.userRatingsTotal} reviews)`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
