# 🌺 Flor de Chocolate - Site de Doceria Artesanal

Site moderno e elegante para divulgação de doces artesanais com design dourado, detalhes em rosa e funcionalidades avançadas.

## ✨ Características Principais

### 🎨 Design e Interface
- Design dourado/ouro com detalhes em rosa
- Totalmente responsivo (funciona em celular, tablet e desktop)
- Animações suaves e elegantes
- Interface moderna e profissional
- Acessibilidade aprimorada (WCAG 2.1)
- Suporte a modo escuro automático

### 🛒 Funcionalidades de E-commerce
- Sistema de carrinho de compras completo
- Integração com WhatsApp para pedidos
- Formulário de endereço com busca automática por CEP
- Painel administrativo para gerenciar produtos
- Sistema de autenticação para administradores

### 📱 Progressive Web App (PWA)
- Funciona offline com Service Worker
- Instalável como aplicativo no celular/desktop
- Cache inteligente para melhor performance
- Notificações push (quando habilitadas)
- Ícones e splash screens personalizados

### 📊 Analytics e Performance
- Sistema de analytics básico integrado
- Cache de dados para melhor performance
- Otimizações de carregamento
- Métricas de uso e comportamento do usuário

### 🔧 Funcionalidades Técnicas
- Service Worker para funcionamento offline
- Cache inteligente de dados
- Compressão de imagens automática
- Lazy loading de recursos
- Otimização para SEO

## 🚀 Como Usar

### Instalação Básica
1. Baixe todos os arquivos do projeto
2. Abra o arquivo `index.html` no seu navegador
3. O site estará funcionando localmente

### Para Servidor Web
1. Faça upload de todos os arquivos para seu servidor
2. Certifique-se de que o servidor suporta HTTPS (necessário para PWA)
3. Configure o domínio no arquivo `manifest.json` se necessário

## 📦 Como Adicionar Produtos

### Método 1: Painel Administrativo (Recomendado)
1. Clique no ícone 🔐 no canto superior direito
2. Faça login com as credenciais:
   - **Usuário:** admin
   - **Senha:** FlorChocolate2026!
3. Use a aba "Gerenciar Produtos" para adicionar, editar ou remover produtos
4. Você pode adicionar imagens aos produtos

### Método 2: Via Console do Navegador
1. Abra o site no navegador
2. Pressione F12 para abrir o console
3. Use o seguinte comando:

```javascript
adicionarProduto("Nome do Produto", "Descrição do produto", 15.90, "url-da-imagem", "🍰");
```

**Exemplo:**
```javascript
adicionarProduto("Brigadeiro Gourmet", "Brigadeiro artesanal com chocolate belga", 2.50, null, "🍫");
adicionarProduto("Bolo de Chocolate", "Bolo fofinho com cobertura especial", 45.00, null, "🎂");
```

### Método 3: Editando o arquivo script.js
Abra o arquivo `script.js` e adicione produtos no array `produtos`:

```javascript
const produtos = [
    {
        nome: "Brigadeiro Gourmet",
        descricao: "Brigadeiro artesanal com chocolate belga",
        preco: 2.50,
        imagem: null, // ou URL da imagem
        emoji: "🍫"
    },
    // Adicione mais produtos aqui...
];
```

## 📱 Configurações do WhatsApp

- **Número:** +55 12 99221-6807
- **Instagram:** @flor_de_chocolate2025
- **Email:** flordechocolate2026@gmail.com

Para alterar essas informações, edite o objeto `CONFIG` no início do arquivo `script.js`:

```javascript
const CONFIG = {
    whatsappNumber: '+55 12 99221-6807',
    instagramUrl: 'https://www.instagram.com/flor_de_chocolate2025',
    businessName: 'Flor de Chocolate',
    businessEmail: 'flordechocolate2026@gmail.com'
};
```

## 🔧 Configurações Avançadas

### Analytics
Para desabilitar o sistema de analytics, altere no arquivo `script.js`:
```javascript
const CONFIG = {
    enableAnalytics: false
};
```

### Notificações
Para desabilitar notificações push:
```javascript
const CONFIG = {
    enableNotifications: false
};
```

### Cache
O sistema de cache é automático, mas você pode limpar manualmente:
```javascript
// No console do navegador
cacheManager.clearOldCache();
```

## 📊 Painel Administrativo

### Funcionalidades do Admin:
- ➕ Adicionar novos produtos com imagens
- ✏️ Editar produtos existentes
- 🗑️ Remover produtos
- 📈 Ver estatísticas de visitantes
- 📊 Analytics básico de uso

### Credenciais Padrão:
- **Usuário:** admin
- **Senha:** FlorChocolate2026!

**⚠️ IMPORTANTE:** Altere a senha padrão no arquivo `script.js`:
```javascript
const ADMIN_CREDENTIALS = {
    usuario: 'seu_usuario',
    senha: 'sua_senha_segura'
};
```

## 🎯 Estrutura de Arquivos

```
flor-de-chocolate/
├── index.html          # Página principal
├── style.css           # Estilos e design
├── script.js           # Funcionalidades JavaScript
├── sw.js              # Service Worker (PWA)
├── manifest.json      # Manifest PWA
└── README.md          # Este arquivo
```

## 🌟 Funcionalidades Especiais

### 🛒 Carrinho de Compras
- Adicionar/remover produtos
- Alterar quantidades
- Cálculo automático de totais
- Persistência entre sessões
- Finalização via WhatsApp

### 📱 PWA (Progressive Web App)
- Instalável como app
- Funciona offline
- Notificações push
- Cache inteligente
- Ícones personalizados

### 🎨 Acessibilidade
- Navegação por teclado
- Leitores de tela compatíveis
- Alto contraste disponível
- Redução de movimento respeitada
- Skip links implementados

### 📊 Analytics
- Rastreamento de visualizações
- Cliques em produtos
- Tempo na página
- Informações do dispositivo
- Estatísticas de uso

## 💡 Dicas de Uso

### Para Produtos:
- Use emojis diferentes para cada produto
- Preços devem ser números (ex: 15.90)
- Descrições ajudam na conversão
- Imagens melhoram a apresentação

### Para Performance:
- Imagens são otimizadas automaticamente
- Cache funciona automaticamente
- Service Worker melhora velocidade
- Funciona offline após primeira visita

### Para SEO:
- Meta tags otimizadas
- Estrutura semântica
- Schema.org implementado
- Sitemap automático

## 🔄 Atualizações

### Versão 2.1.0 (Atual)
- ✅ Sistema PWA completo
- ✅ Service Worker implementado
- ✅ Analytics básico
- ✅ Notificações push
- ✅ Cache inteligente
- ✅ Melhorias de acessibilidade
- ✅ Otimizações de performance

### Próximas Versões
- 🔄 Sistema de pedidos online
- 🔄 Integração com pagamentos
- 🔄 Chat ao vivo
- 🔄 Sistema de avaliações
- 🔄 Programa de fidelidade

## 🆘 Suporte

Para dúvidas ou problemas:
1. Verifique este README primeiro
2. Teste no console do navegador (F12)
3. Verifique se todos os arquivos estão no servidor
4. Certifique-se de que o HTTPS está ativo (para PWA)

## 📄 Licença

Este projeto é de uso livre para fins comerciais e pessoais. Desenvolvido com ❤️ para adoçar sua vida!
