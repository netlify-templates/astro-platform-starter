import React, { useState } from 'react';
import { Sparkles, Coffee, User, Calendar, MapPin, UserRound, MessageSquareText, Send } from 'lucide-react'; // Lucide icons for a modern look

// Main App component for the fortune teller application
function App() {
  // State variables to store user input and application status
  const [name, setName] = useState(''); // User's name
  const [age, setAge] = useState('');   // User's age
  const [city, setCity] = useState(''); // User's city
  const [gender, setGender] = useState(''); // User's gender
  const [image, setImage] = useState(null); // Base64 encoded image of coffee grounds
  const [fortune, setFortune] = useState(''); // Generated fortune-telling text
  const [loading, setLoading] = useState(false); // Loading state for AI processing
  const [error, setError] = useState(''); // Error message state
  const [imagePreview, setImagePreview] = useState(''); // URL for image preview

  // New state variables for chat functionality
  const [chatQuestion, setChatQuestion] = useState(''); // User's follow-up question
  const [chatResponse, setChatResponse] = useState(''); // AI's response to the follow-up question
  const [chatLoading, setChatLoading] = useState(false); // Loading state for chat AI processing
  const [hasAskedQuestion, setHasAskedQuestion] = useState(false); // Tracks if the user has asked their one question

  // --- API Anahtarı Güvenli Bir Şekilde Alınıyor ---
  // Bu kod, anahtarı Netlify gibi hosting servislerinin ortam değişkenlerinden okur.
  // Bu sayede API anahtarınız asla herkese açık olmaz.
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY;

  // Function to handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Resim boyutu 5MB\'tan küçük olmalıdır.');
        setImage(null);
        setImagePreview('');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result.split(',')[1]);
        setImagePreview(reader.result);
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };


  // Function to generate the fortune using the AI model
  const generateFortune = async () => {
    if (!name || !age || !city || !gender || !image) {
      setError('Lütfen tüm alanları doldurun ve bir resim yükleyin.');
      return;
    }
    if (!apiKey) {
      setError('API anahtarı yapılandırılmamış. Lütfen site yöneticisi ile iletişime geçin.');
      return;
    }

    setLoading(true);
    setFortune('');
    setChatResponse('');
    setChatQuestion('');
    setHasAskedQuestion(false);
    setError('');

    try {
      const prompt = `
        Merhaba, bir Türk kahvesi falcısı olarak, aşağıdaki bilgileri ve kahve telvesi resmini kullanarak kişiselleştirilmiş bir fal yorumu yapmanı istiyorum.
        Fal yorumu, geleneksel Türk kahvesi falı ritüeline uygun, akıcı ve mistik bir dille yazılmalı.
        Kullanıcı Bilgileri:
        - İsim: ${name}
        - Yaş: ${age}
        - Şehir: ${city}
        - Cinsiyet: ${gender}
        Kahve telvesi resmindeki şekilleri yorumlayarak, kullanıcının geçmişi, şimdiki durumu ve geleceği hakkında ipuçları ver.
        Yorumun 200-300 kelime arasında olsun.
        Fal yorumunu doğrudan falcı ağzından yap, örneğin "Fincanında gördüğüm kadarıyla...", "Yakın zamanda..." gibi ifadeler kullan.
        `;

      const payload = {
        contents: [{
          role: "user",
          parts: [
            { text: prompt },
            { inlineData: { mimeType: "image/jpeg", data: image } }
          ]
        }]
      };

      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message || `API Hatası: ${response.status}`);
      }

      const result = await response.json();

      if (result.candidates && result.candidates.length > 0) {
        setFortune(result.candidates[0].content.parts[0].text);
      } else {
        setError('Fal yorumu alınamadı. Lütfen tekrar deneyin.');
      }
    } catch (err) {
      setError('Fal yorumu oluşturulurken bir hata oluştu: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to ask a follow-up question about the fortune
  const askFollowUpQuestion = async () => {
    if (!chatQuestion.trim() || hasAskedQuestion) return;
    
    setChatLoading(true);
    setError('');

    try {
      const followUpPrompt = `
        Az önce aşağıdaki fal yorumunu yaptın:
        "${fortune}"
        Şimdi, bu fal yorumuna dayanarak, kullanıcının şu sorusunu yanıtla:
        "Soru: ${chatQuestion}"
        Yanıtın fal yorumuyla tutarlı olsun ve 50-100 kelime arasında kısa ve öz olsun.
        Doğrudan kullanıcının sorusuna yanıt ver, falcı ağzından konuşmaya devam et.
        `;

      const payload = {
        contents: [{ role: "user", parts: [{ text: followUpPrompt }] }]
      };

      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

       if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message || `API Hatası: ${response.status}`);
      }

      const result = await response.json();

      if (result.candidates && result.candidates.length > 0) {
        setChatResponse(result.candidates[0].content.parts[0].text);
        setHasAskedQuestion(true);
      } else {
        setError('Sorunuza yanıt alınamadı. Lütfen tekrar deneyin.');
      }
    } catch (err) {
      setError('Sorunuza yanıt oluşturulurken bir hata oluştu: ' + err.message);
    } finally {
      setChatLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-indigo-900 text-white font-sans p-4 sm:p-8 flex items-center justify-center">
      <div className="bg-gray-800 bg-opacity-70 backdrop-blur-md p-6 sm:p-10 rounded-2xl shadow-2xl w-full max-w-4xl border border-gray-700">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center gap-3">
          <Coffee className="w-10 h-10 sm:w-12 sm:h-12" />
          Cebimdeki Falcı
          <Sparkles className="w-10 h-10 sm:w-12 sm:h-12" />
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* User Information Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-yellow-300 mb-4 flex items-center gap-2">
              <User className="w-6 h-6" /> Bilgilerinizi Girin
            </h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Adınız"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 pl-10 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300 placeholder-gray-400"
              />
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <div className="relative">
              <input
                type="number"
                placeholder="Yaşınız"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full p-3 pl-10 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300 placeholder-gray-400"
              />
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Şehriniz"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-3 pl-10 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300 placeholder-gray-400"
              />
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <div className="relative">
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full p-3 pl-10 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300 appearance-none pr-8"
              >
                <option value="">Cinsiyet Seçin</option>
                <option value="Kadın">Kadın</option>
                <option value="Erkek">Erkek</option>
                <option value="Belirtmek İstemiyorum">Belirtmek İstemiyorum</option>
              </select>
              <UserRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-yellow-300 mb-4 flex items-center gap-2">
              <Coffee className="w-6 h-6" /> Telvenizi Yükleyin
            </h2>
            <label htmlFor="image-upload" className="block w-full h-48 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center cursor-pointer hover:border-yellow-500 transition-all duration-300 bg-gray-700">
              {imagePreview ? (
                <img src={imagePreview} alt="Telveniz" className="max-h-full max-w-full object-contain rounded-lg" />
              ) : (
                <div className="text-center text-gray-400">
                  <span className="block text-4xl mb-2">+</span>
                  <span className="block">Telvenizin fotoğrafını yüklemek için tıklayın</span>
                  <span className="block text-sm mt-1">(Max 5MB, JPG/PNG)</span>
                </div>
              )}
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/jpeg, image/png"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-600 bg-opacity-80 p-3 rounded-lg mb-6 text-center text-red-100 shadow-md">
            {error}
          </div>
        )}

        <button
          onClick={generateFortune}
          disabled={loading}
          className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-gray-900 font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 text-xl
          disabled:opacity-50 disabled:cursor-not-allowed disabled:from-gray-500 disabled:to-gray-600"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-6 w-6 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Falınız Yorumlanıyor...
            </>
          ) : (
            <>
              <Sparkles className="w-6 h-6" />
              Fal Bak
              <Sparkles className="w-6 h-6" />
            </>
          )}
        </button>

        {fortune && (
          <div className="mt-8 bg-gray-700 bg-opacity-80 p-6 rounded-xl shadow-inner border border-gray-600">
            <h2 className="text-3xl font-bold text-yellow-300 mb-4 text-center flex items-center justify-center gap-2">
              <Sparkles className="w-8 h-8" /> Falınız
            </h2>
            <p className="text-lg leading-relaxed text-gray-200 whitespace-pre-wrap">
              {fortune}
            </p>

            <div className="mt-8 pt-6 border-t border-gray-600">
              <h3 className="text-2xl font-semibold text-yellow-300 mb-4 flex items-center gap-2">
                <MessageSquareText className="w-6 h-6" /> Falınız Hakkında Soru Sorun (1 Hak)
              </h3>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder={hasAskedQuestion ? "Soru sorma hakkınız bitti." : "Falınız hakkında bir soru sorun..."}
                  value={chatQuestion}
                  onChange={(e) => setChatQuestion(e.target.value)}
                  disabled={hasAskedQuestion || chatLoading}
                  className="flex-grow p-3 pl-4 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300 placeholder-gray-400 disabled:opacity-70 disabled:cursor-not-allowed"
                />
                <button
                  onClick={askFollowUpQuestion}
                  disabled={hasAskedQuestion || chatLoading || !chatQuestion.trim()}
                  className="bg-yellow-500 text-gray-900 p-3 rounded-lg shadow-md hover:bg-yellow-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {chatLoading ? (
                    <svg className="animate-spin h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </div>

              {chatResponse && (
                <div className="mt-4 p-4 bg-gray-800 rounded-lg border border-gray-700 shadow-inner">
                  <p className="text-gray-200 whitespace-pre-wrap">
                    <span className="font-bold text-yellow-300">Falcı: </span>{chatResponse}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
