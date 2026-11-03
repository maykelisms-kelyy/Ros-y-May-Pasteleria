/**
 * ROS & MAY ATELIER DULCE - PASTELERÍA & REPOSTERÍA ARTESANAL
 * Interacciones, filtros de galería, lightbox y cotizador para WhatsApp
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. AÑO ACTUAL DINÁMICO EN FOOTER
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. NAVBAR SCROLL EFFECT
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  // 3. MENÚ MÓVIL (HAMBURGUESA)
  const navToggleBtn = document.querySelector('.nav-toggle-btn');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggleBtn && navMenu) {
    navToggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = navToggleBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('bi-list');
        icon.classList.toggle('bi-x-lg');
      }
    });

    // Cerrar al hacer clic en un enlace
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = navToggleBtn.querySelector('i');
        if (icon) {
          icon.classList.add('bi-list');
          icon.classList.remove('bi-x-lg');
        }
      });
    });
  }

  // 4. FILTROS DE LA GALERÍA DE FOTOS
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remover clase active de todos los botones
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');

        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // 5. LIGHTBOX / MODAL DE DETALLE DE PASTEL
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxCat = document.getElementById('lightbox-cat');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxPortions = document.getElementById('lightbox-portions');
  const lightboxFlavors = document.getElementById('lightbox-flavors');
  const lightboxOrderBtn = document.getElementById('lightbox-order-btn');
  const lightboxCloseBtn = document.querySelector('.lightbox-close-btn');

  // Datos detallados de los pasteles para el lightbox
  const cakesData = {
    'wedding-luxury': {
      title: 'Torta Nupcial Majestic Gold',
      category: 'Bodas & Eventos Especiales',
      desc: 'Diseño arquitectónico de 3 niveles con bordes en encaje de azúcar, filigranas de pan de oro comestible de 24k y una cascada de rosas inglesas modeladas a mano pétalo a pétalo por la Chef Roscelis.',
      portions: '40 - 60 personas',
      flavors: 'Bizcocho húmedo de Vainilla Bourbon con ganache de chocolate blanco y reducción artesanal de frambuesas.',
      img: 'assets/images/cake-wedding-luxury.svg',
      unsplash: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=1000&q=80'
    },
    'vintage-pink': {
      title: 'Pastel Vintage Coquette Dreams',
      category: 'Cumpleaños Soñados',
      desc: 'Inspiración clásica victoriana en suave buttercream rosa pastel, bordes ondeados estilo Lambeth, lazos de azúcar y cerezas silvestres glaseadas. El favorito para sesiones de fotos y cumpleaños inolvidables.',
      portions: '15 - 20 personas',
      flavors: 'Masa suave de fresas naturales con capas de crema diplomata y coulis de frutos del bosque.',
      img: 'assets/images/cake-vintage-pink.svg',
      unsplash: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=1000&q=80'
    },
    'drip-chocolate': {
      title: 'Drip Cake Chocolate Belga & Frutos Rojos',
      category: 'Pasteles Temáticos & Autor',
      desc: 'Una tentación suprema cubierta con suave ganache de chocolate belga 70%, coronada con macarons franceses de frambuesa, higos frescos, moras y delicadas hojuelas doradas.',
      portions: '20 - 25 personas',
      flavors: 'Bizcocho húmedo de cacao holandés intenso, relleno de crema trufada y dulce de leche artesanal.',
      img: 'assets/images/cake-drip-chocolate.svg',
      unsplash: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=80'
    },
    'berries-cream': {
      title: 'Torta Semi-Naked Floral & Berries',
      category: 'Bodas & Eventos Especiales',
      desc: 'Estética rústica y sofisticada donde el bizcocho artesanal asoma delicadamente tras finas capas de crema chantilly de vainilla, decorada con flores comestibles y frutos frescos del huerto.',
      portions: '25 - 30 personas',
      flavors: 'Vainilla con semillas de Madagascar, relleno de mousse de mascarpone y frutillas maceradas.',
      img: 'assets/images/cake-berries-cream.svg',
      unsplash: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1000&q=80'
    },
    'bento-sweet': {
      title: 'Bento Cake Romántico Personalizado',
      category: 'Minipostres & Bento',
      desc: 'El detalle perfecto para celebraciones íntimas y aniversarios de pareja. Presentado en su encantadora cajita ecológica con mensaje caligrafiado a mano y detalles perlados.',
      portions: '2 - 4 personas',
      flavors: 'Red velvet suave con relleno de queso crema y esencia de azahar.',
      img: 'assets/images/cake-bento-sweet.svg',
      unsplash: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=1000&q=80'
    },
    'macaron-tower': {
      title: 'Torre Gourmet de Macarons & Rosas',
      category: 'Minipostres & Bento',
      desc: 'Una pirámide festiva de auténticos macarons franceses con textura crocante por fuera y suave corazón cremoso, intercalados con rosas naturales y perlas doradas.',
      portions: '35 piezas de macarons',
      flavors: 'Pistacho siciliano, Vainilla suave, Frambuesa ácida y Caramelo salado.',
      img: 'assets/images/cake-macaron-tower.svg',
      unsplash: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=1000&q=80'
    },
    'velvet-gold': {
      title: 'Torta Red Velvet Imperial & Pan de Oro',
      category: 'Cumpleaños Soñados',
      desc: 'Color rubí profundo y textura aterciopelada incomparable. Coronada con rosetones de frosting de queso crema Philadelphia, delicados toques de oro comestible y corona decorativa.',
      portions: '20 - 30 personas',
      flavors: 'Auténtico Red Velvet con cacao natural y frosting sedoso de queso crema aromatizado con limón Meyer.',
      img: 'assets/images/cake-velvet-gold.svg',
      unsplash: 'https://images.unsplash.com/photo-1557925923-cd4648e211a0?auto=format&fit=crop&w=1000&q=80'
    },
    'citrus-meringue': {
      title: 'Tarta de Limón Meyer & Merengue Tostado',
      category: 'Pasteles Temáticos & Autor',
      desc: 'Base crocante de masa sablée de almendras, crema cuajada de limón fresco y picos voluptuosos de merengue suizo dorado al soplete con flores de pensamiento comestibles.',
      portions: '12 - 16 personas',
      flavors: 'Crema ácida y dulce de limones seleccionados con merengue sedoso de azúcar orgánico.',
      img: 'assets/images/cake-citrus-meringue.svg',
      unsplash: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=1000&q=80'
    }
  };

  const openLightbox = (cakeKey) => {
    const data = cakesData[cakeKey];
    if (!data || !lightboxModal) return;

    if (lightboxImg) {
      lightboxImg.src = data.unsplash;
      lightboxImg.onerror = () => {
        lightboxImg.src = data.img;
      };
      lightboxImg.alt = data.title;
    }

    if (lightboxTitle) lightboxTitle.textContent = data.title;
    if (lightboxCat) lightboxCat.textContent = data.category;
    if (lightboxDesc) lightboxDesc.textContent = data.desc;
    if (lightboxPortions) lightboxPortions.textContent = data.portions;
    if (lightboxFlavors) lightboxFlavors.textContent = data.flavors;

    if (lightboxOrderBtn) {
      const message = encodeURIComponent(`¡Hola Maykelis! Me encantó la ${data.title} de su portafolio y quisiera solicitar información y cotización para mi evento.`);
      lightboxOrderBtn.href = `https://wa.me/584120000000?text=${message}`;
    }

    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    if (lightboxModal) {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  };

  // Asignar listeners a los botones de la galería
  document.querySelectorAll('.gallery-view-btn, .gallery-inquire-link').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const parentItem = trigger.closest('.gallery-item');
      if (parentItem) {
        const cakeKey = parentItem.getAttribute('data-cake-key');
        if (cakeKey) openLightbox(cakeKey);
      }
    });
  });

  // Cerrar lightbox
  if (lightboxCloseBtn) {
    lightboxCloseBtn.addEventListener('click', closeLightbox);
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal?.classList.contains('active')) {
      closeLightbox();
    }
  });

  // 6. FORMULARIO INTERACTIVO DE COTIZACIÓN PARA WHATSAPP
  const orderForm = document.getElementById('custom-order-form');
  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('client-name')?.value || 'Cliente';
      const eventType = document.getElementById('event-type')?.value || 'Celebración';
      const portions = document.getElementById('portions-count')?.value || '15-20 personas';
      const eventDate = document.getElementById('event-date')?.value || 'Por definir';
      const flavor = document.getElementById('flavor-choice')?.value || 'A recomendar por la Chef';
      const notes = document.getElementById('order-notes')?.value || 'Sin notas adicionales';

      const whatsappMessage = `¡Hola Maykelis! Vengo del sitio web de Ros & May Atelier Dulce y me gustaría cotizar un pastel personalizado:
      
🎂 *Tipo de evento:* ${eventType}
👤 *Nombre:* ${name}
👥 *Porciones estimadas:* ${portions}
📅 *Fecha del evento:* ${eventDate}
🍰 *Sabor o relleno preferido:* ${flavor}
✨ *Detalles / Ideas:* ${notes}

Quedo atento(a) a tu asesoría y presupuesto. ¡Muchas gracias!`;

      const encodedMsg = encodeURIComponent(whatsappMessage);
      const whatsappUrl = `https://wa.me/584120000000?text=${encodedMsg}`;
      window.open(whatsappUrl, '_blank');
    });
  }
});

