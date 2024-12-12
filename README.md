<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rifa - Login</title>
    <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
        form { max-width: 300px; margin: 0 auto; text-align: left; }
        input { width: 100%; margin: 10px 0; padding: 10px; }
        button { width: 100%; padding: 10px; background-color: blue; color: white; border: none; cursor: pointer; }
        button:hover { background-color: darkblue; }
    </style>
</head>
<body>
    <h1>Bem-vindo à Rifa</h1>
    <form id="login-form">
        <h2>Login</h2>
        <label for="email">Email:</label>
        <input type="email" id="email" required>
        <label for="password">Senha:</label>
        <input type="password" id="password" required>
        <button type="submit">Entrar</button>
    </form>

    <form id="register-form" style="display: none;">
        <h2>Cadastro</h2>
        <label for="reg-email">Email:</label>
        <input type="email" id="reg-email" required>
        <label for="reg-password">Senha:</label>
        <input type="password" id="reg-password" required>
        <button type="submit">Cadastrar</button>
    </form>

    <p id="toggle-form" style="cursor: pointer; color: blue;">Ainda não tem conta? Cadastre-se</p>

    <script>
        const toggleForm = document.getElementById('toggle-form');
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');
        const adminEmail = "seu-email@exemplo.com"; // Seu email para acesso ao sorteio

        toggleForm.onclick = () => {
            loginForm.style.display = loginForm.style.display === "none" ? "block" : "none";
            registerForm.style.display = registerForm.style.display === "none" ? "block" : "none";
            toggleForm.textContent = loginForm.style.display === "none" ? "Já tem conta? Faça login" : "Ainda não tem conta? Cadastre-se";
        };

        // Login Simples (Exemplo)
        loginForm.onsubmit = (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Verificar email e senha localmente
            const user = JSON.parse(localStorage.getItem(email));
            if (user && user.password === password) {
                alert("Login realizado com sucesso!");
                if (email === adminEmail) {
                    window.location.href = "admin.html"; // Página do administrador
                } else {
                    window.location.href = "rifa.html"; // Página do usuário
                }
            } else {
                alert("Email ou senha incorretos.");
            }
        };

        // Cadastro Simples
        registerForm.onsubmit = (e) => {
            e.preventDefault();
            const email = document.getElementById('reg-email').value;
            const password = document.getElementById('reg-password').value;

            if (localStorage.getItem(email)) {
                alert("Este email já está cadastrado.");
            } else {
                localStorage.setItem(email, JSON.stringify({ email, password }));
                alert("Cadastro realizado com sucesso! Faça login.");
                toggleForm.click();
            }
        };
    </script>
</body>
</html>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin - Sorteio</title>
</head>
<body>
    <h1>Painel do Administrador</h1>
    <p>Somente o administrador pode realizar o sorteio.</p>
    <button id="draw-btn" style="display: none;">Realizar Sorteio</button>
    <div class="winner" id="winner" style="margin-top: 20px;"></div>

    <script>
        const drawButton = document.getElementById('draw-btn');
        const winnerDiv = document.getElementById('winner');

        // Permitir sorteio apenas em 25 de dezembro
        const today = new Date();
        if (today.getMonth() === 11 && today.getDate() === 25) {
            drawButton.style.display = "block";
        }

        // Realizar sorteio
        drawButton.onclick = () => {
            const winner = 5; // Número fixo
            winnerDiv.textContent = `O ganhador é o número ${winner}! Parabéns!`;
        };
    </script>
</body>
</html>
