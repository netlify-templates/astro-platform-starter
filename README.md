<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LussoRare - Premium Saffron</title>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700;900&family=Raleway:wght@300;500;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Raleway', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #1a1a1a;
            color: #f8f8f8;
        }
        header {
            background-color: #b8860b;
            color: white;
            padding: 40px;
            text-align: center;
            font-size: 36px;
            font-weight: 900;
            font-family: 'Playfair Display', serif;
            text-transform: uppercase;
            letter-spacing: 3px;
            text-shadow: 4px 4px 10px rgba(0, 0, 0, 0.3);
        }
        nav {
            display: flex;
            justify-content: center;
            gap: 30px;
            padding: 15px;
            background: #333;
        }
        nav a {
            color: white;
            text-decoration: none;
            font-size: 20px;
            font-weight: 700;
            transition: color 0.3s ease;
        }
        nav a:hover {
            color: #b8860b;
        }
        .container {
            max-width: 1200px;
            margin: auto;
            padding: 50px;
            text-align: center;
        }
        .shop-button {
            display: inline-block;
            padding: 15px 30px;
            background: #b8860b;
            color: white;
            text-decoration: none;
            font-size: 22px;
            font-weight: 700;
            border-radius: 10px;
            margin-top: 20px;
            transition: background 0.3s ease;
        }
        .shop-button:hover {
            background: #a1740b;
        }
        .content-section {
            background: #222;
            padding: 40px;
            margin-top: 30px;
            border-radius: 10px;
        }
        footer {
            background: #b8860b;
            color: white;
            text-align: center;
            padding: 20px;
            margin-top: 40px;
            font-weight: 700;
        }
    </style>
</head>
<body>
    <header>LussoRare</header>
    <nav>
        <a href="index.html">Home</a>
        <a href="about.html">About Us</a>
        <a href="shop.html">Shop</a>
        <a href="contact.html">Contact</a>
    </nav>
    
    <section id="home" class="container">
        <h1>Welcome to LussoRare</h1>
        <p>Discover the world's finest saffron, harvested with tradition and expertise.</p>
        <a href="shop.html" class="shop-button">Shop Now</a>
    </section>
    
    <section id="about" class="container content-section">
        <h2>About Us</h2>
        <p>At LussoRare, we are passionate about bringing you the most luxurious saffron in the world. Sourced from the finest fields, our saffron is handpicked, carefully dried, and packed with care to maintain its deep aroma and rich flavor.</p>
    </section>
    
    <section id="shop" class="container content-section">
        <h2>Shop Premium Saffron</h2>
        <p>Enhance your culinary creations with the highest-quality saffron. Our saffron is tested for purity and is used by top chefs worldwide.</p>
        <a href="#" class="shop-button">Explore Products</a>
    </section>
    
    <section id="contact" class="container content-section">
        <h2>Contact Us</h2>
        <p>For more information, wholesale inquiries, or collaborations, contact us:</p>
        <p>Email: <a href="mailto:info@lussorare.com" style="color: #b8860b;">info@lussorare.com</a></p>
        <p>Based in Madrid, Spain</p>
    </section>
    
    <footer>
        <p>&copy; 2025 LussoRare. All rights reserved.</p>
    </footer>
</body>
</html>
