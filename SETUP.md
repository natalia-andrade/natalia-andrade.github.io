# 🔐 Configuração de Secrets do GitHub

Este site usa GitHub Actions para fazer deploy no GitHub Pages de forma segura, mantendo as credenciais da API privadas.

## 📋 Passo a Passo

### 1. Configurar Secrets no GitHub

Acesse seu repositório no GitHub:

```
Repositório → Settings → Secrets and variables → Actions
```

Clique em **"New repository secret"** e adicione os seguintes secrets:

#### Secret 1:
- **Name**: `GOOGLE_CALENDAR_ID`
- **Secret**: `6f3cddf2c741b7604697f640ab2854162c14db1b8bcdb4271a96d2be463296e8@group.calendar.google.com`

#### Secret 2:
- **Name**: `GOOGLE_API_KEY`
- **Secret**: Sua Google API Key (obtenha em https://console.cloud.google.com/apis/credentials)

### 2. Configurar GitHub Pages

No seu repositório:

```
Settings → Pages
```

Configure:
- **Source**: GitHub Actions
- Aguarde o primeiro deploy completar

### 3. Como Funciona

1. Quando você faz `git push` para a branch `main`
2. O GitHub Actions é acionado automaticamente (`.github/workflows/deploy.yml`)
3. O workflow gera o arquivo `config.js` usando os secrets
4. Faz deploy do site completo para GitHub Pages
5. Os secrets nunca aparecem no código público ✅

### 4. Fazer Deploy

Basta fazer commit e push das suas alterações:

```bash
git add .
git commit -m "Sua mensagem de commit"
git push origin main
```

O deploy acontece automaticamente!

## 🔒 Segurança

- ✅ As credenciais ficam **privadas** nos Secrets do GitHub
- ✅ O `config.js` é gerado apenas durante o deploy
- ✅ O arquivo `config.js` local está no `.gitignore` e não é commitado
- ✅ Para mais segurança, adicione restrições de domínio na API Key do Google Cloud Console

## 🛠️ Para Desenvolvimento Local

1. Copie `config.example.js` para `config.js`:
   ```bash
   cp config.example.js config.js
   ```

2. Edite `config.js` e adicione suas credenciais reais

3. O arquivo `config.js` não será commitado (está no `.gitignore`)

## 🌐 URL do Site

Após o primeiro deploy, seu site estará disponível em:
- https://natalia-andrade.github.io/natalia-andrade/

## ❓ Problemas?

Se o deploy falhar:
1. Verifique se os secrets estão configurados corretamente
2. Vá em `Actions` no GitHub para ver os logs do workflow
3. Certifique-se de que GitHub Pages está configurado para usar "GitHub Actions" como source
