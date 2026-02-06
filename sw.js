// Service Worker para Flor de Chocolate
// Versão 2.1.0

const CACHE_NAME = 'flor-chocolate-v2.1';
const STATIC_CACHE = 'flor-chocolate-static-v2.1';
const DYNAMIC_CACHE = 'flor-chocolate-dynamic-v2.1';

// Arquivos para cache estático
const STATIC_FILES = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/manifest.json',
    'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Poppins:wght@300;400;500;600;700&display=swap'
];

// Instalar Service Worker
self.addEventListener('install', event => {
    console.log('Service Worker: Instalando...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                console.log('Service Worker: Cache estático criado');
                return cache.addAll(STATIC_FILES);
            })
            .catch(error => {
                console.error('Erro ao criar cache estático:', error);
            })
    );
    
    // Força a ativação imediata
    self.skipWaiting();
});

// Ativar Service Worker
self.addEventListener('activate', event => {
    console.log('Service Worker: Ativando...');
    
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    // Remove caches antigos
                    if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                        console.log('Service Worker: Removendo cache antigo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    
    // Assume controle imediato
    self.clients.claim();
});

// Interceptar requisições
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Ignora requisições não HTTP
    if (!request.url.startsWith('http')) return;
    
    // Estratégia Cache First para arquivos estáticos
    if (STATIC_FILES.includes(request.url) || request.url.includes('fonts.googleapis.com')) {
        event.respondWith(cacheFirst(request));
        return;
    }
    
    // Estratégia Network First para APIs e conteúdo dinâmico
    if (request.url.includes('api') || request.url.includes('viacep')) {
        event.respondWith(networkFirst(request));
        return;
    }
    
    // Estratégia Stale While Revalidate para outros recursos
    event.respondWith(staleWhileRevalidate(request));
});

// Estratégia Cache First
async function cacheFirst(request) {
    try {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        const networkResponse = await fetch(request);
        const cache = await caches.open(STATIC_CACHE);
        cache.put(request, networkResponse.clone());
        
        return networkResponse;
    } catch (error) {
        console.error('Cache First falhou:', error);
        return new Response('Offline - Recurso não disponível', {
            status: 503,
            statusText: 'Service Unavailable'
        });
    }
}

// Estratégia Network First
async function networkFirst(request) {
    try {
        const networkResponse = await fetch(request);
        const cache = await caches.open(DYNAMIC_CACHE);
        cache.put(request, networkResponse.clone());
        
        return networkResponse;
    } catch (error) {
        console.log('Network First: Tentando cache para:', request.url);
        const cachedResponse = await caches.match(request);
        
        if (cachedResponse) {
            return cachedResponse;
        }
        
        return new Response(JSON.stringify({
            error: 'Offline',
            message: 'Recurso não disponível offline'
        }), {
            status: 503,
            statusText: 'Service Unavailable',
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

// Estratégia Stale While Revalidate
async function staleWhileRevalidate(request) {
    const cache = await caches.open(DYNAMIC_CACHE);
    const cachedResponse = await cache.match(request);
    
    const fetchPromise = fetch(request).then(networkResponse => {
        cache.put(request, networkResponse.clone());
        return networkResponse;
    }).catch(error => {
        console.log('Stale While Revalidate: Erro de rede:', error);
        return cachedResponse;
    });
    
    return cachedResponse || fetchPromise;
}

// Listener para mensagens do cliente
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'GET_VERSION') {
        event.ports[0].postMessage({ version: '2.1.0' });
    }
});

// Sincronização em background (quando disponível)
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

async function doBackgroundSync() {
    try {
        // Aqui você pode implementar sincronização de dados
        // Por exemplo, enviar pedidos pendentes quando voltar online
        console.log('Background sync executado');
    } catch (error) {
        console.error('Erro na sincronização em background:', error);
    }
}

// Notificações push (quando implementadas)
self.addEventListener('push', event => {
    if (!event.data) return;
    
    const data = event.data.json();
    const options = {
        body: data.body,
        icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🌺</text></svg>',
        badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🍫</text></svg>',
        vibrate: [200, 100, 200],
        data: data.data || {},
        actions: [
            {
                action: 'view',
                title: 'Ver Pedido',
                icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">👀</text></svg>'
            },
            {
                action: 'close',
                title: 'Fechar',
                icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">❌</text></svg>'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// Clique em notificação
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    if (event.action === 'view') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});