/**
 * DELIRIUM Estilistas - Main JavaScript
 * Configuración editable y funcionalidades
 */

// ============================================
// CONFIGURACIÓN EDITABLE
// ============================================

// Número de WhatsApp (incluir código de país, sin + ni espacios)
const WHATSAPP_NUMBER = "51999999999";

// Lista de servicios (se usa en Home y Catálogo)
const SERVICES = [
    {
        id: "corte-mujer",
        name: "Corte de dama",
        duration: "45 min",
        features: [
            "Consulta de estilo personalizado",
            "Lavado con productos premium",
            "Corte a medida",
            "Peinado de finalización"
        ],
        image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80"
    },
    {
        id: "corte-hombre",
        name: "Corte de caballero",
        duration: "30 min",
        features: [
            "Asesoramiento de imagen",
            "Lavado revitalizante",
            "Corte preciso",
            "Acabado con productos"
        ],
        image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&q=80"
    },
    {
        id: "coloracion",
        name: "Coloración completa",
        duration: "2 hrs",
        features: [
            "Diagnóstico de color",
            "Aplicación de tinte premium",
            "Tratamiento post-color",
            "Secado y peinado"
        ],
        image: "https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=600&q=80"
    },
    {
        id: "mechas",
        name: "Mechas / Balayage",
        duration: "2.5 hrs",
        features: [
            "Diseño de mechas personalizado",
            "Decoloración controlada",
            "Tonalización",
            "Tratamiento de hidratación"
        ],
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80"
    },
    {
        id: "tratamiento",
        name: "Tratamiento capilar",
        duration: "1 hr",
        features: [
            "Diagnóstico del cabello",
            "Tratamiento específico",
            "Vapor terapéutico",
            "Masaje capilar"
        ],
        image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=600&q=80"
    },
    {
        id: "peinado",
        name: "Peinado de ocasión",
        duration: "1 hr",
        features: [
            "Lavado y acondicionamiento",
            "Peinado a elección",
            "Fijación duradera",
            "Toques finales"
        ],
        image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&q=80"
    }
];

// ============================================
// FUNCIONES UTILITARIAS
// ============================================

// Generar enlace de WhatsApp con mensaje
function generateWhatsAppLink(message) {
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

// Formatear fecha
function formatDate(dateString) {
    if (!dateString) return '';
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
}

// ============================================
// GENERADORES DE CONTENIDO
// ============================================

// Generar dropdown de servicios
function generateServicesDropdown() {
    const select = document.getElementById('servicio');
    if (!select) return;
    
    SERVICES.forEach(service => {
        const option = document.createElement('option');
        option.value = service.id;
        option.textContent = service.name;
        select.appendChild(option);
    });
}

// Generar cards de servicios para catálogo
function generateServiceCards() {
    const container = document.getElementById('servicesGrid');
    if (!container) return;
    
    SERVICES.forEach(service => {
        const card = document.createElement('div');
        card.className = 'service-card reveal';
        card.innerHTML = `
            <div class="service-image">
                <img src="${service.image}" alt="${service.name}" loading="lazy">
            </div>
            <div class="service-content">
                <h3>${service.name}</h3>
                <div class="service-duration">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    ${service.duration}
                </div>
                <ul class="service-features">
                    ${service.features.map(f => `<li>${f}</li>`).join('')}
                </ul>
                <div class="service-price">
                    PRECIO: <span class="placeholder">________</span>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// ============================================
// MANEJO DE FORMULARIOS
// ============================================

// Manejar envío del formulario de reserva
function handleBookingForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Obtener nombre del servicio
    const service = SERVICES.find(s => s.id === data.servicio);
    const serviceName = service ? service.name : data.servicio;
    
    // Construir mensaje
    const message = `¡Hola! Me gustaría reservar una cita en DELIRIUM Estilistas.

*Nombre:* ${data.nombre}
*Contacto:* ${data.contacto}
*Fecha:* ${formatDate(data.fecha)}
*Servicio:* ${serviceName}
*Viene con niños:* ${data.ninos === 'si' ? 'Sí' : 'No'}

Quedo atento/a a su confirmación. ¡Gracias!`;
    
    // Abrir WhatsApp
    window.open(generateWhatsAppLink(message), '_blank');
}

// Configurar botones de WhatsApp
function setupWhatsAppButtons() {
    // Botón en catálogo
    const catalogBtn = document.getElementById('whatsappCatalogBtn');
    if (catalogBtn) {
        catalogBtn.href = generateWhatsAppLink('¡Hola! Vi su catálogo de servicios y me gustaría recibir más información. ¿Podrían ayudarme?');
    }
    
    // Botón en contacto
    const contactBtn = document.getElementById('whatsappContactBtn');
    if (contactBtn) {
        contactBtn.href = generateWhatsAppLink('¡Hola! Me gustaría contactar con DELIRIUM Estilistas.');
    }
}

// ============================================
// NAVEGACIÓN MÓVIL
// ============================================

function setupMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.nav-menu');
    
    if (!toggle || !menu) return;
    
    toggle.addEventListener('click', () => {
        menu.classList.toggle('active');
        
        // Animar hamburguesa
        const spans = toggle.querySelectorAll('span');
        if (menu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Cerrar menú al hacer click en un link
    const links = menu.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            const spans = toggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

// ============================================
// ANIMACIONES SCROLL
// ============================================

function setupScrollAnimations() {
    const reveals = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;
        
        reveals.forEach((reveal, index) => {
            const elementTop = reveal.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - elementVisible) {
                // Añadir delay escalonado
                setTimeout(() => {
                    reveal.classList.add('active');
                }, index * 100);
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Ejecutar al cargar
}

// ============================================
// HEADER SCROLL EFFECT
// ============================================

function setupHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
}

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Generar contenido dinámico
    generateServicesDropdown();
    generateServiceCards();
    
    // Configurar formularios
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingForm);
    }
    
    // Configurar botones
    setupWhatsAppButtons();
    
    // Configurar navegación
    setupMobileNav();
    
    // Configurar animaciones
    setupScrollAnimations();
    
    // Configurar header
    setupHeaderScroll();
    
    // Establecer fecha mínima en date picker (hoy)
    const dateInput = document.getElementById('fecha');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
});

// ============================================
// EXPORTAR PARA USO EXTERNO (opcional)
// ============================================

// Estas variables y funciones están disponibles globalmente si se necesitan
window.DELIRIUM = {
    WHATSAPP_NUMBER,
    SERVICES,
    generateWhatsAppLink,
    formatDate
};