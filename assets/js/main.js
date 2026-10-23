/*=============== MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
  navToggle = document.getElementById('nav-toggle');

/* Menu show - hidden */
navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('show-menu');
  navToggle.classList.toggle('animate-toggle');
});

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav-link');

const linkAction = () => {
  const navMenu = document.getElementById('nav-menu');

  navToggle.classList.remove('animate-toggle');
  navMenu.classList.remove('show-menu');
};

navLink.forEach((n) => n.addEventListener('click', linkAction));

/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () => {
  const header = document.getElementById('header');

  this.scrollY >= 20
    ? header.classList.add('bg-header')
    : header.classList.remove('bg-header');
};

window.addEventListener('scroll', scrollHeader);

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute('id'),
      sectionsClass = document.querySelector(
        '.nav-menu a[href*=' + sectionId + ']'
      );

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      sectionsClass.classList.add('active-link');
    } else {
      sectionsClass.classList.remove('active-link');
    }
  });
};

window.addEventListener('scroll', scrollActive);

/*=============== SECTORES SWIPER ===============*/
var sectoresSwiper = new Swiper('.sectores-swiper', {
  spaceBetween: 32,

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    1208: {
      slidesPerView: 3,
    },
  },
});

/*=============== MIXITUP FILTER PORTFOLIO ===============*/
var mixer = mixitup('.portfolio-container', {
  selectors: {
    target: '.mix',
  },
  animation: {
    duration: 300,
  },
});

/* Active portfolio */
const linkportfolio = document.querySelectorAll('.portfolio-item');

function activeportfolio() {
  linkportfolio.forEach((a) => {
    a.classList.remove('active-portfolio');
  });

  this.classList.add('active-portfolio');
}

linkportfolio.forEach((a) => a.addEventListener('click', activeportfolio));

/*=============== PORTFOLIO POPUP MODAL ===============*/
(() => {
  const portfolioContainer = document.querySelector('.portfolio-container'),
    portfolioItems = document.querySelectorAll('.portfolio-container .mix'),
    popup = document.getElementById('portfolio-popup'),
    popupOverlay = document.getElementById('pp-overlay'),
    closeBtn = document.getElementById('pp-close'),
    detailsBtn = document.getElementById('pp-details-btn'),
    detailsIcon = document.getElementById('pp-details-icon'),
    detailsContainer = document.getElementById('pp-details'),
    prevBtn = document.getElementById('pp-prev'),
    nextBtn = document.getElementById('pp-next'),
    popupImg = document.getElementById('pp-img'),
    popupLoader = document.getElementById('pp-loader'),
    popupCounter = document.getElementById('pp-counter'),
    popupTitle = document.getElementById('pp-title'),
    popupCategory = document.getElementById('pp-category'),
    popupDesc = document.getElementById('pp-description'),
    popupInfo = document.getElementById('pp-info-content');

  if (!popup || !portfolioContainer) return;

  let currentItemIndex = 0;
  let slideIndex = 0;
  let screenshots = [];

  function bodyScrollToggle(disable) {
    if (disable) {
      document.body.classList.add('hidden-scrolling');
    } else {
      document.body.classList.remove('hidden-scrolling');
    }
  }

  function openPopup(index) {
    currentItemIndex = index;
    const item = portfolioItems[currentItemIndex];
    if (!item) return;

    // Obtener capturas de pantalla de data-screenshots o img src
    const imgEl = item.querySelector('.portfolio-img');
    const screenshotsAttr = imgEl ? imgEl.getAttribute('data-screenshots') : '';
    if (screenshotsAttr) {
      screenshots = screenshotsAttr.split(',').map((s) => s.trim());
    } else if (imgEl && imgEl.src) {
      screenshots = [imgEl.src];
    } else {
      screenshots = [];
    }

    // Mostrar/ocultar botones de navegación si hay más de 1 imagen
    if (screenshots.length <= 1) {
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'none';
    } else {
      prevBtn.style.display = 'flex';
      nextBtn.style.display = 'flex';
    }

    slideIndex = 0;
    updatePopupImage();
    updatePopupDetails();

    popup.classList.add('open');
    bodyScrollToggle(true);
  }

  function closePopup() {
    popup.classList.remove('open');
    bodyScrollToggle(false);

    // Si los detalles estaban abiertos, cerrarlos
    if (detailsContainer.classList.contains('active')) {
      toggleDetails(false);
    }
  }

  function updatePopupImage() {
    if (!screenshots.length) return;
    const src = screenshots[slideIndex];

    popupLoader.classList.add('active');
    popupImg.style.opacity = '0';

    const tempImg = new Image();
    tempImg.src = src;
    tempImg.onload = () => {
      popupImg.src = src;
      popupLoader.classList.remove('active');
      popupImg.style.opacity = '1';
    };
    tempImg.onerror = () => {
      popupImg.src = src;
      popupLoader.classList.remove('active');
      popupImg.style.opacity = '1';
    };

    // Actualizar contador
    popupCounter.textContent = `${slideIndex + 1} de ${screenshots.length}`;
  }

  function updatePopupDetails() {
    const item = portfolioItems[currentItemIndex];
    if (!item) return;

    const titleEl = item.querySelector('.portfolio-title');
    const categoryEl = item.querySelector('.portfolio-category');
    const descEl = item.querySelector('.portfolio-description');
    const detailsEl = item.querySelector('.portfolio-item-details');

    popupTitle.textContent = titleEl ? titleEl.textContent : 'Detalles del Proyecto';
    popupCategory.textContent = categoryEl ? categoryEl.textContent : '';
    popupDesc.textContent = descEl ? descEl.textContent : '';

    if (detailsEl) {
      popupInfo.innerHTML = detailsEl.innerHTML;
    } else {
      const category = categoryEl ? categoryEl.textContent : 'General';
      popupInfo.innerHTML = `
        <p><strong>Sector:</strong> ${category}</p>
        <p><strong>Mis redes sociales:</strong> <a href="https://www.instagram.com/jorgeatl19/" target="_blank">Instagram (@jorgeatl19)</a> y <a href="https://es.linkedin.com/in/jorge-alexander" target="_blank">Linkedin</a></p>
      `;
    }

    // Si ya está abierto, ajustar altura para que nunca corte texto de proyectos largos
    if (detailsContainer.classList.contains('active')) {
      detailsContainer.style.maxHeight = 'none';
    }
  }

  function toggleDetails(forceState) {
    const shouldOpen =
      forceState !== undefined
        ? forceState
        : !detailsContainer.classList.contains('active');

    if (shouldOpen) {
      detailsContainer.classList.add('active');
      detailsBtn.querySelector('span').textContent = 'Detalles';
      detailsIcon.className = 'ri-subtract-line';
      detailsContainer.style.maxHeight = detailsContainer.scrollHeight + 60 + 'px';

      // Tras la transición, pasar a 'none' para ajuste automático a cualquier tamaño de pantalla
      setTimeout(() => {
        if (detailsContainer.classList.contains('active')) {
          detailsContainer.style.maxHeight = 'none';
        }
      }, 420);
    } else {
      detailsContainer.style.maxHeight = detailsContainer.scrollHeight + 'px';
      detailsContainer.offsetHeight; // Forzar reflow para animación suave
      detailsContainer.classList.remove('active');
      detailsBtn.querySelector('span').textContent = 'Detalles';
      detailsIcon.className = 'ri-add-line';
      detailsContainer.style.maxHeight = '0px';
    }
  }

  // Recalcular altura en redimensionado de pantalla
  window.addEventListener('resize', () => {
    if (detailsContainer && detailsContainer.classList.contains('active')) {
      detailsContainer.style.maxHeight = 'none';
    }
  });

  // Evento al tocar los contenedores con clase .mix
  portfolioItems.forEach((item, index) => {
    item.addEventListener('click', (e) => {
      // Prevenir el salto de enlace al hacer clic en "Ver más"
      if (e.target.closest('.link')) {
        e.preventDefault();
      }
      openPopup(index);
    });
  });

  // Botón detalles
  detailsBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleDetails();
  });

  // Botones anterior y siguiente
  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (slideIndex === screenshots.length - 1) {
      slideIndex = 0;
    } else {
      slideIndex++;
    }
    updatePopupImage();
  });

  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (slideIndex === 0) {
      slideIndex = screenshots.length - 1;
    } else {
      slideIndex--;
    }
    updatePopupImage();
  });

  // Cerrar popup
  closeBtn.addEventListener('click', closePopup);
  popupOverlay.addEventListener('click', closePopup);

  // Cerrar con Escape y navegar con flechas del teclado
  document.addEventListener('keydown', (e) => {
    if (!popup.classList.contains('open')) return;
    if (e.key === 'Escape') {
      closePopup();
    } else if (e.key === 'ArrowRight' && screenshots.length > 1) {
      nextBtn.click();
    } else if (e.key === 'ArrowLeft' && screenshots.length > 1) {
      prevBtn.click();
    }
  });
})();

/*=============== CV TEXTO ===============*/
const cvGroups = document.querySelectorAll('.cvtexto-group');

cvGroups.forEach((group) => {
  const title = group.querySelector('.cvtexto-title');
  const items = group.querySelectorAll('.cvtexto-item');

  // Función para desplegar o contraer un elemento
  const toggleItem = (item, forceOpen = null) => {
    const content = item.querySelector('.cvtexto-content'),
      icon = item.querySelector('.cvtexto-icon i');

    const isOpen =
      forceOpen !== null
        ? forceOpen
          ? (item.classList.add('accordion-open'), true)
          : (item.classList.remove('accordion-open'), false)
        : item.classList.toggle('accordion-open');

    content.style.height = isOpen ? content.scrollHeight + 'px' : '0';
    if (icon) {
      icon.className = isOpen ? 'ri-subtract-line' : 'ri-add-line';
    }
  };

  // Clic en cada elemento individual: abre/cierra de forma independiente
  // permitiendo que varios o todos estén desplegados a la vez
  items.forEach((item) => {
    const header = item.querySelector('.cvtexto-header');
    header.addEventListener('click', () => {
      toggleItem(item);
    });
  });

  // Clic en el título de la sección ("Educación" / "Experiencia Profesional"):
  // permite desplegar todos o contraer todos los elementos de esa sección a la vez
  if (title) {
    title.style.cursor = 'pointer';
    title.setAttribute('title', 'Haz clic para desplegar o contraer todos');

    title.addEventListener('click', () => {
      const anyClosed = Array.from(items).some(
        (item) => !item.classList.contains('accordion-open')
      );
      items.forEach((item) => toggleItem(item, anyClosed));
    });
  }
});

// Reajustar altura si se redimensiona la ventana con elementos abiertos
window.addEventListener('resize', () => {
  document.querySelectorAll('.cvtexto-item.accordion-open').forEach((item) => {
    const content = item.querySelector('.cvtexto-content');
    if (content) {
      content.style.height = content.scrollHeight + 'px';
    }
  });
});

/*=============== CV IMPRESOS SWIPER ===============*/
var sectoresSwiper = new Swiper('.cvimpresos-swiper', {
  spaceBetween: 32,

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    1208: {
      slidesPerView: 3,
    },
  },
});

/*=============== STYLE SWITCHER ===============*/
const styleSwitcher = document.getElementById('style-switcher'),
  switcherToggle = document.getElementById('switcher-toggle'),
  switcherClose = document.getElementById('switcher-close');

/* Switcher show */
switcherToggle.addEventListener('click', () => {
  styleSwitcher.classList.add('show-switcher');
});

/* Switcher hidden */
switcherClose.addEventListener('click', () => {
  styleSwitcher.classList.remove('show-switcher');
});

/*=============== THEME COLORS ===============*/
const colors = document.querySelectorAll('.style-switcher-color');

colors.forEach((color) => {
  color.onclick = () => {
    const activeColor = color.style.getPropertyValue('--hue');

    colors.forEach((c) => c.classList.remove('active-color'));
    color.classList.add('active-color');

    document.documentElement.style.setProperty('--hue', activeColor);
  };
});

/*=============== LIGHT/DARK MODE ===============*/
const themeToggle = document.getElementById('theme-toggle-input');
const themeText = document.getElementById('theme-toggle-text');
const themeRadios = document.querySelectorAll('input[name="body-theme"]');

// Cargar preferencia guardada o usar 'light' por defecto
const savedTheme = localStorage.getItem('selected-theme') || 'light';

function applyTheme(theme) {
  document.body.className = theme;
  localStorage.setItem('selected-theme', theme);

  if (themeToggle) {
    themeToggle.checked = theme === 'dark';
  }
  if (themeText) {
    themeText.textContent = theme === 'dark' ? 'Oscuro' : 'Claro';
  }
  if (themeRadios.length) {
    themeRadios.forEach((radio) => {
      radio.checked = radio.value === theme;
    });
  }
}

// Aplicar tema inicial
applyTheme(savedTheme);

// Evento para el nuevo switch toggle
if (themeToggle) {
  themeToggle.addEventListener('change', () => {
    applyTheme(themeToggle.checked ? 'dark' : 'light');
  });
}

// Compatibilidad en caso de restaurar los inputs de radio
if (themeRadios.length) {
  themeRadios.forEach((radio) => {
    radio.addEventListener('change', () => {
      applyTheme(radio.value);
    });
  });
}
