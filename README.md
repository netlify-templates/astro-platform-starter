<!DOCTYPE html>  
<html lang="ru">  
<head>  
<meta charset="UTF-8">  
<meta name="viewport" content="width=device-width, initial-scale=1.0">  
<title>kitwwwx_16</title>  
  
<style>  
body {  
    margin: 0;  
    font-family: 'Arial', sans-serif;  
    background: linear-gradient(270deg, #ffd6e0, #ff8fa3, #ff4d6d);  
    background-size: 600% 600%;  
    animation: gradientMove 12s ease infinite;  
    display: flex;  
    justify-content: center;  
    align-items: center;  
    height: 100vh;  
    overflow: hidden;  
}  
  
@keyframes gradientMove {  
    0% {background-position: 0% 50%;}  
    50% {background-position: 100% 50%;}  
    100% {background-position: 0% 50%;}  
}  
  
/* ✨ ПРОКАЧАННЫЙ SHIMMER */  
.shimmer {  
    font-size: 26px;  
    font-weight: bold;  
    background: linear-gradient(  
        120deg,  
        #ffffff 0%,  
        #ffccd5 20%,  
        #ff4d6d 40%,  
        #ffffff 60%,  
        #ff4d6d 80%,  
        #ffffff 100%  
    );  
    background-size: 300% auto;  
    color: transparent;  
    -webkit-background-clip: text;  
    animation: shimmer 4s linear infinite;  
    text-shadow: 0 0 15px rgba(255, 77, 109, 0.6);  
}  
  
@keyframes shimmer {  
    0% { background-position: -300% center; }  
    100% { background-position: 300% center; }  
}  
  
/* карточка */  
.container {  
    background: rgba(255,255,255,0.25);  
    backdrop-filter: blur(15px);  
    border-radius: 25px;  
    padding: 30px;  
    width: 330px;  
    text-align: center;  
    box-shadow: 0 10px 40px rgba(0,0,0,0.3);  
    z-index: 2;  
    animation: float 4s ease-in-out infinite;  
}  
  
@keyframes float {  
    0% {transform: translateY(0);}  
    50% {transform: translateY(-10px);}  
    100% {transform: translateY(0);}  
}  
  
.avatar {  
    width: 130px;  
    height: 130px;  
    border-radius: 50%;  
    object-fit: cover;  
    border: 3px solid white;  
}  
  
/* кнопки */  
.socials a {  
    display: block;  
    margin: 10px 0;  
    padding: 12px;  
    border-radius: 20px;  
    text-decoration: none;  
    color: white;  
    background: #ff4d6d;  
    transition: 0.3s;  
}  
  
.socials a:hover {  
    background: #c9184a;  
    transform: scale(1.07);  
}  
  
/* текст печатается */  
.typing {  
    overflow: hidden;  
    border-right: 2px solid;  
    white-space: nowrap;  
    width: 0;  
    animation: typing 3s steps(40, end) forwards, blink 0.7s infinite;  
}  
  
@keyframes typing {  
    to { width: 100%; }  
}  
  
@keyframes blink {  
    50% { border-color: transparent; }  
}  
  
/* сердечки при клике */  
.click-heart {  
    position: absolute;  
    color: red;  
    animation: pop 1s forwards;  
}  
  
@keyframes pop {  
    0% {transform: scale(0); opacity: 1;}  
    100% {transform: scale(2); opacity: 0;}  
}  
</style>  
</head>  
  
<body>  
  
<script>  
document.addEventListener("click", function(e) {  
    const heart = document.createElement("div");  
    heart.className = "click-heart";  
    heart.innerHTML = "❤";  
    heart.style.left = e.clientX + "px";  
    heart.style.top = e.clientY + "px";  
    document.body.appendChild(heart);  
    setTimeout(() => heart.remove(), 1000);  
});  
</script>  
  
<div class="container">  
  
    <!-- ВСТАВЬ СВОЁ ФОТО -->  
    <img src="PASTE_YOUR_PHOTO_LINK_HERE" class="avatar">  
  
    <!-- ИМЯ -->  
    <div class="shimmer">kitwwwx_16</div>  
  
    <!-- ОПИСАНИЕ -->  
    <div class="typing">  
        просто девочка с чувствами 💔 люблю музыку и ночи  
    </div>  
  
    <!-- ССЫЛКИ -->  
    <div class="socials">  
        <a href="PASTE_INSTAGRAM_LINK">Instagram</a>  
        <a href="PASTE_TELEGRAM_LINK">Telegram</a>  
        <a href="PASTE_TIKTOK_LINK">TikTok</a>  
    </div>  
  
    <!-- МУЗЫКА -->  
    <div style="margin-top:15px;">  
        <iframe width="100%" height="80"  
        src="https://www.youtube.com/embed/susvAU-KNMw"  
        frameborder="0"  
        allow="autoplay; encrypted-media">  
        </iframe>  
    </div>  
  
    <!-- ЦИТАТА -->  
    <div style="margin-top:15px; font-style:italic;">  
        "я чувствую слишком много, чтобы быть спокойной"  
    </div>  
  
</div>  
  
</body>  
</html>  
