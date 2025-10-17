// ====================================
// NAVEGAÇÃO
// ====================================

// Navegação suave entre seções
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        // Remove active de todos os links
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

        // Adiciona active ao link clicado
        this.classList.add('active');

        // Pega o ID da seção
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        // Scroll suave para a seção
        if (targetSection) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }

        // Fecha o menu mobile se estiver aberto
        if (window.innerWidth <= 768) {
            navMenu.classList.remove('active');
        }
    });
});

// Menu mobile toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Fecha o menu ao clicar fora dele
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    }
});

// ====================================
// SCROLL EFFECTS
// ====================================

// Adiciona classe ao header quando rola a página
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Atualiza link ativo baseado na seção visível
    updateActiveNavOnScroll();
});

// Atualiza navegação baseada na posição do scroll
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';
    const scrollPosition = window.scrollY + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ====================================
// FORMULÁRIO DE CONTATO
// ====================================

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Pega os valores do formulário
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const assunto = document.getElementById('assunto').value;
    const mensagem = document.getElementById('mensagem').value;

    // Validação básica
    if (!nome || !email || !assunto || !mensagem) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    // Aqui você pode adicionar lógica para enviar o formulário
    // Por exemplo, usando EmailJS, Formspree, ou seu próprio backend

    // Por enquanto, apenas mostra uma mensagem de sucesso
    alert(`Obrigada pelo contato, ${nome}! Sua mensagem foi enviada com sucesso. Responderei em breve!`);

    // Limpa o formulário
    contactForm.reset();

    // Exemplo de como seria com EmailJS (você precisa configurar o serviço):
    /*
    emailjs.send("seu_service_id", "seu_template_id", {
        from_name: nome,
        from_email: email,
        subject: assunto,
        message: mensagem
    }).then(
        function(response) {
            alert('Mensagem enviada com sucesso!');
            contactForm.reset();
        },
        function(error) {
            alert('Erro ao enviar mensagem. Tente novamente.');
        }
    );
    */
});

// ====================================
// ANIMAÇÕES AO SCROLL (Intersection Observer)
// ====================================

// Observa elementos quando entram na tela
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Elementos para animar
const animateElements = document.querySelectorAll('.projeto-card, .video-card, .evento-card, .aulas-card');

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ====================================
// SMOOTH SCROLL PARA BOTÕES HERO
// ====================================

document.querySelectorAll('.hero-buttons a').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ====================================
// UTILIDADES
// ====================================

// Previne FOUC (Flash of Unstyled Content)
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Adiciona transição suave ao body
document.body.style.transition = 'opacity 0.3s ease';

// ====================================
// INTEGRAÇÃO COM YOUTUBE (OPCIONAL)
// ====================================

// Se você quiser substituir os placeholders por vídeos reais do YouTube,
// use esta função:

function loadYouTubeVideos() {
    // Exemplo de IDs de vídeos do YouTube
    const videoIds = [
        'SEU_VIDEO_ID_1',  // Substitua pelos seus IDs de vídeo
        'SEU_VIDEO_ID_2',
        'SEU_VIDEO_ID_3'
    ];

    const videoPlaceholders = document.querySelectorAll('.video-placeholder');

    videoPlaceholders.forEach((placeholder, index) => {
        if (videoIds[index]) {
            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube.com/embed/${videoIds[index]}`;
            iframe.width = '100%';
            iframe.height = '200';
            iframe.frameBorder = '0';
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            iframe.allowFullscreen = true;

            // Substitui o placeholder pelo iframe
            placeholder.parentElement.replaceChild(iframe, placeholder);
        }
    });
}

// Descomente a linha abaixo quando tiver os IDs dos vídeos do YouTube
// loadYouTubeVideos();

// ====================================
// GALERIA DE IMAGENS (OPCIONAL)
// ====================================

// Função para criar um lightbox simples ao clicar nas imagens
function initImageLightbox() {
    const images = document.querySelectorAll('.projeto-image, .sobre-image');

    images.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                cursor: pointer;
            `;

            const imgClone = this.cloneNode(true);
            imgClone.style.maxWidth = '90%';
            imgClone.style.maxHeight = '90%';

            lightbox.appendChild(imgClone);
            document.body.appendChild(lightbox);

            lightbox.addEventListener('click', function() {
                document.body.removeChild(lightbox);
            });
        });
    });
}

// Descomente a linha abaixo se quiser ativar o lightbox
// initImageLightbox();

// ====================================
// GOOGLE CALENDAR INTEGRATION
// ====================================

// Credenciais da API do Google Calendar
const CALENDAR_ID = '6f3cddf2c741b7604697f640ab2854162c14db1b8bcdb4271a96d2be463296e8@group.calendar.google.com';
const API_KEY = 'AIzaSyBydLJSqnibj4RiohrxZCVp1au6hJoOWo8';

// Função para carregar eventos do Google Calendar
function loadGoogleCalendarEvents() {
    const agendaList = document.getElementById('agenda-list');

    // Data de hoje (início)
    const now = new Date();
    const timeMin = now.toISOString();

    // Data máxima (3 meses a partir de hoje)
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    const timeMax = maxDate.toISOString();

    // URL da API do Google Calendar
    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events?key=${API_KEY}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime&maxResults=10`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar eventos');
            }
            return response.json();
        })
        .then(data => {
            agendaList.innerHTML = ''; // Limpa mensagem de carregamento

            if (!data.items || data.items.length === 0) {
                agendaList.innerHTML = `
                    <div class="no-events-message">
                        <p>Nenhum evento agendado no momento. Fique atento às redes sociais para novidades!</p>
                    </div>
                `;
                return;
            }

            // Cria um card para cada evento
            data.items.forEach(event => {
                const eventCard = createEventCard(event);
                agendaList.appendChild(eventCard);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar eventos do Google Calendar:', error);
            agendaList.innerHTML = `
                <div class="error-message">
                    <p>Não foi possível carregar os eventos. Tente novamente mais tarde.</p>
                </div>
            `;
        });
}

// Função para criar um card de evento
function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'evento-card';

    // Data do evento
    const startDate = event.start.dateTime ? new Date(event.start.dateTime) : new Date(event.start.date);
    const dia = startDate.getDate();
    const meses = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
    const mes = meses[startDate.getMonth()];

    // Horário (se disponível)
    let horaHtml = '';
    if (event.start.dateTime) {
        const hora = startDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        horaHtml = `<p class="evento-hora">🕒 ${hora}</p>`;
    }

    // Local (se disponível)
    let localHtml = '';
    if (event.location) {
        localHtml = `<p class="evento-local">📍 ${event.location}</p>`;
    }

    // Descrição (se disponível)
    let descricaoHtml = '';
    if (event.description) {
        // Limita a descrição a 150 caracteres
        const descricao = event.description.length > 150
            ? event.description.substring(0, 150) + '...'
            : event.description;
        descricaoHtml = `<p class="evento-descricao">${descricao}</p>`;
    }

    // Link "Mais Info" (se houver link no evento ou descrição)
    let actionHtml = '';
    if (event.htmlLink) {
        actionHtml = `
            <div class="evento-action">
                <a href="${event.htmlLink}" target="_blank" class="btn btn-small">Mais Info</a>
            </div>
        `;
    }

    // Monta o HTML do card
    card.innerHTML = `
        <div class="evento-data">
            <span class="dia">${dia}</span>
            <span class="mes">${mes}</span>
        </div>
        <div class="evento-info">
            <h3>${event.summary || 'Evento sem título'}</h3>
            ${localHtml}
            ${horaHtml}
            ${descricaoHtml}
        </div>
        ${actionHtml}
    `;

    return card;
}

// Carrega eventos quando a página é carregada
window.addEventListener('load', () => {
    loadGoogleCalendarEvents();
});

// ====================================
// CONSOLE MESSAGE
// ====================================

console.log('%c🎸 Portfólio Musical ', 'color: #8B4513; font-size: 20px; font-weight: bold;');
console.log('%cSite desenvolvido com paixão pela música!', 'color: #D2691E; font-size: 14px;');
