<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>النمور السعودية – منصة المستقبل</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            turquoise: {
              100: '#e6f7f7',
              200: '#b3e8e8',
              300: '#80d9d9',
              400: '#4dcaca',
              500: '#1abbbb',
              600: '#149696',
              700: '#0e7171',
              800: '#094b4b',
              900: '#032626',
            }
          },
          fontFamily: {
            sans: ['Tajawal', 'sans-serif'],
          }
        }
      }
    }
  </script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;900&display=swap');
    body { font-family: 'Tajawal', sans-serif; }

    .futuristic-card {
      background: transparent;
      border: 1px solid rgba(26,187,187,0.4);
      border-radius: 1rem;
      padding: 1.5rem;
      transition: transform .3s, box-shadow .3s;
    }
    .futuristic-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(26,187,187,0.3);
    }
  </style>
</head>
<body class="text-white min-h-screen flex flex-col items-center bg-transparent">

  <!-- شعار البرنامج -->
  <header class="py-8">
    <!-- النمر الكبير -->
    <svg class="w-24 h-24 fill-turquoise-500" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(40,40)">
        <path d="M20 20 C30 10,50 10,60 20 L65 25 L60 30 C50 40,30 40,20 30 Z"
              fill="currentColor" stroke="white" stroke-width="2"/>
      </g>
    </svg>
  </header>

  <!-- محتوى البطاقات -->
  <main class="w-full flex-1 px-6">
    <div class="dashboard-grid grid grid-cols-1 md:grid-cols-3 gap-6">

      <!-- بطاقة 1: المصنع الذكي -->
      <div class="futuristic-card flex flex-col gap-4">
        <i class="fas fa-industry fa-2x text-turquoise-500"></i>
        <h3 class="text-xl font-bold">المصنع الذكي</h3>
        <p>حلول أتمتة متكاملة لرفع كفاءة الإنتاج وتقليل الهدر.</p>
      </div>

      <!-- بطاقة 2: تحليل السوق -->
      <div class="futuristic-card flex flex-col gap-4">
        <i class="fas fa-chart-line fa-2x text-turquoise-500"></i>
        <h3 class="text-xl font-bold">تحليل السوق</h3>
        <p>بيانات وتحليلات مستقبلية لاتخاذ قرارات سريعة.</p>
      </div>

      <!-- بطاقة 3: شعار النمر بدل الروبوت -->
      <div class="futuristic-card flex flex-col items-center gap-4">
        <!-- النمر الصغير -->
        <svg class="w-12 h-12 fill-turquoise-500" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(40,40)">
            <path d="M20 20 C30 10,50 10,60 20 L65 25 L60 30 C50 40,30 40,20 30 Z"
                  fill="currentColor" stroke="white" stroke-width="2"/>
          </g>
        </svg>
        <h3 class="text-xl font-bold">التفاعل الذكي</h3>
        <p>نظام تفاعلي متطور يربط بين الأجهزة والعمليات أوتوماتيكياً.</p>
      </div>

    </div>
  </main>

</body>
</html>
