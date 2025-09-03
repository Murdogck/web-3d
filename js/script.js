// Módulos principales para TechPrint3D

// Módulo de Navegación
class NavigationModule {
    constructor() {
        this.currentSection = 'empresas';
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sectionToggles = document.querySelectorAll('.section-toggle');
    }

    init() {
        this.setupSectionToggle();
        this.setupSmoothScroll();
        this.setupActiveNavigation();
    }

    setupSectionToggle() {
        this.sectionToggles.forEach(button => {
            button.addEventListener('click', (e) => {
                const section = e.target.dataset.section;
                this.toggleSection(section);
                this.updateActiveButton(e.target);
            });
        });
    }

    toggleSection(sectionId) {
        this.currentSection = sectionId;
        
        // Cambiar contenido del hero
        const heroSections = document.querySelectorAll('.hero-section');
        heroSections.forEach(section => {
            section.classList.add('hidden');
        });
        document.getElementById(`hero-${sectionId}`).classList.remove('hidden');
        
        // Cambiar servicios
        const serviceSections = document.querySelectorAll('.services-section');
        serviceSections.forEach(section => {
            section.classList.add('hidden');
        });
        document.getElementById(`services-${sectionId}`).classList.remove('hidden');
        
        // Añadir animación
        document.querySelector(`#hero-${sectionId}`).classList.add('fade-in-up');
        document.querySelector(`#services-${sectionId}`).classList.add('fade-in-up');
    }

    updateActiveButton(activeButton) {
        this.sectionToggles.forEach(button => {
            button.classList.remove('btn-primary', 'active');
            button.classList.add('btn-outline');
        });
        activeButton.classList.remove('btn-outline');
        activeButton.classList.add('btn-primary', 'active');
    }

    setupSmoothScroll() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
                
                this.updateActiveNavLink(link);
            });
        });
    }

    setupActiveNavigation() {
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section[id]');
            const scrollPos = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    this.updateActiveNavLink(document.querySelector(`a[href="#${sectionId}"]`));
                }
            });
        });
    }

    updateActiveNavLink(activeLink) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
        });
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
}

// Módulo de Galería
class GalleryModule {
    constructor() {
        this.images = [
            {
                src: 'images/impresion-industrial.png',
                title: 'Prototipos Industriales',
                description: 'Componentes técnicos de alta precisión'
            },
            {
                src: 'images/robot-prototipo.jpg',
                title: 'Robot de Grabado Láser',
                description: 'Prototipo funcional completo'
            },
            {
                src: 'images/impresion-3d-general.jpg',
                title: 'Proyectos Diversos',
                description: 'Variedad de aplicaciones y materiales'
            },
            {
                src: 'images/organizador-personal.jpg',
                title: 'Organizadores Personales',
                description: 'Soluciones de organización a medida'
            }
        ];
        this.currentImageIndex = 0;
        this.modal = document.getElementById('gallery-modal');
        this.modalImage = document.getElementById('modal-image');
    }

    init() {
        this.setupGalleryItems();
        this.setupModalControls();
    }

    setupGalleryItems() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                this.openModal(index);
            });
        });
    }

    setupModalControls() {
        const prevBtn = document.getElementById('prev-image');
        const nextBtn = document.getElementById('next-image');
        
        prevBtn.addEventListener('click', () => this.previousImage());
        nextBtn.addEventListener('click', () => this.nextImage());
        
        // Navegación con teclado
        document.addEventListener('keydown', (e) => {
            if (this.modal.classList.contains('modal-open')) {
                if (e.key === 'ArrowLeft') this.previousImage();
                if (e.key === 'ArrowRight') this.nextImage();
                if (e.key === 'Escape') this.closeModal();
            }
        });
    }

    openModal(imageIndex) {
        this.currentImageIndex = imageIndex;
        this.updateModalImage();
        this.modal.showModal();
    }

    closeModal() {
        this.modal.close();
    }

    nextImage() {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
        this.updateModalImage();
    }

    previousImage() {
        this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
        this.updateModalImage();
    }

    updateModalImage() {
        const image = this.images[this.currentImageIndex];
        this.modalImage.src = image.src;
        this.modalImage.alt = image.title;
    }
}

// Módulo Visualizador 3D
class Viewer3DModule {
    constructor() {
        this.currentModel = 'cube';
        this.isRotating = true;
        this.modelButtons = document.querySelectorAll('.model-btn');
        this.resetBtn = document.getElementById('reset-view');
        this.toggleBtn = document.getElementById('toggle-rotation');
    }

    init() {
        this.setupModelButtons();
        this.setupControls();
    }

    setupModelButtons() {
        this.modelButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const modelType = e.target.dataset.model;
                this.loadModel(modelType);
                this.updateActiveButton(e.target);
            });
        });
    }

    setupControls() {
        this.resetBtn.addEventListener('click', () => this.resetView());
        this.toggleBtn.addEventListener('click', () => this.toggleRotation());
    }

    loadModel(modelType) {
        this.currentModel = modelType;
        
        // Ocultar todos los modelos
        const modelDisplays = document.querySelectorAll('.model-display');
        modelDisplays.forEach(display => {
            display.classList.add('hidden');
        });
        
        // Mostrar el modelo seleccionado
        const targetModel = document.getElementById(`model-${modelType}`);
        targetModel.classList.remove('hidden');
        
        // Añadir animación de entrada
        targetModel.style.animation = 'none';
        setTimeout(() => {
            targetModel.style.animation = '';
        }, 10);
    }

    updateActiveButton(activeButton) {
        this.modelButtons.forEach(button => {
            button.classList.remove('btn-primary', 'active');
            button.classList.add('btn-outline');
        });
        activeButton.classList.remove('btn-outline');
        activeButton.classList.add('btn-primary', 'active');
    }

    resetView() {
        const currentModelElement = document.getElementById(`model-${this.currentModel}`);
        const modelContent = currentModelElement.firstElementChild;
        
        // Reset animation
        modelContent.style.animation = 'none';
        setTimeout(() => {
            modelContent.style.animation = '';
        }, 10);
    }

    toggleRotation() {
        this.isRotating = !this.isRotating;
        const currentModelElement = document.getElementById(`model-${this.currentModel}`);
        const modelContent = currentModelElement.firstElementChild;
        
        if (this.isRotating) {
            modelContent.style.animationPlayState = 'running';
            this.toggleBtn.innerHTML = '<i class="fas fa-pause mr-2"></i>Pausar Rotación';
        } else {
            modelContent.style.animationPlayState = 'paused';
            this.toggleBtn.innerHTML = '<i class="fas fa-play mr-2"></i>Reanudar Rotación';
        }
    }
}

// Módulo de Formulario de Contacto
class ContactFormModule {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.toast = document.getElementById('toast');
        this.toastMessage = document.getElementById('toast-message');
    }

    init() {
        this.setupFormSubmission();
    }

    setupFormSubmission() {
        this.form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(this.form);
            const isValid = this.validateForm(formData);
            
            if (isValid) {
                const success = await this.submitForm(formData);
                if (success) {
                    this.showSuccessMessage();
                    this.form.reset();
                } else {
                    this.showErrorMessage('Error al enviar el formulario. Inténtelo de nuevo.');
                }
            }
        });
    }

    validateForm(formData) {
        const requiredFields = ['name', 'email', 'projectType', 'message'];
        const missingFields = [];
        
        requiredFields.forEach(field => {
            if (!formData.get(field) || formData.get(field).trim() === '') {
                missingFields.push(field);
            }
        });
        
        // Validar email
        const email = formData.get('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            this.showErrorMessage('Por favor, introduce un email válido.');
            return false;
        }
        
        if (missingFields.length > 0) {
            this.showErrorMessage('Por favor, completa todos los campos obligatorios.');
            return false;
        }
        
        return true;
    }

    async submitForm(formData) {
        try {
            // Simular envío del formulario
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // En una implementación real, aquí se enviaría a un servidor
            console.log('Datos del formulario:', Object.fromEntries(formData));
            
            return true;
        } catch (error) {
            console.error('Error al enviar formulario:', error);
            return false;
        }
    }

    showSuccessMessage() {
        this.toastMessage.textContent = '¡Solicitud enviada correctamente! Te contactaremos pronto.';
        this.toast.querySelector('.alert').classList.remove('alert-error');
        this.toast.querySelector('.alert').classList.add('alert-success');
        this.showToast();
    }

    showErrorMessage(message) {
        this.toastMessage.textContent = message;
        this.toast.querySelector('.alert').classList.remove('alert-success');
        this.toast.querySelector('.alert').classList.add('alert-error');
        this.showToast();
    }

    showToast() {
        this.toast.classList.remove('hidden');
        setTimeout(() => {
            this.toast.classList.add('hidden');
        }, 5000);
    }
}

// Aplicación Principal
class MainApp {
    constructor() {
        this.navigation = new NavigationModule();
        this.gallery = new GalleryModule();
        this.viewer3D = new Viewer3DModule();
        this.contactForm = new ContactFormModule();
    }

    init() {
        // Esperar a que el DOM esté completamente cargado
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.initializeModules();
            });
        } else {
            this.initializeModules();
        }
    }

    initializeModules() {
        try {
            this.navigation.init();
            this.gallery.init();
            this.viewer3D.init();
            this.contactForm.init();
            
            // Efectos adicionales
            this.setupScrollEffects();
            this.setupThemeToggle();
            
            console.log('TechPrint3D: Todos los módulos inicializados correctamente');
        } catch (error) {
            console.error('Error al inicializar módulos:', error);
        }
    }

    setupScrollEffects() {
        // Intersection Observer para animaciones al hacer scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);

        // Observar elementos que necesitan animación
        const animatedElements = document.querySelectorAll('.card, .hero-content, .stats');
        animatedElements.forEach(el => observer.observe(el));
    }

    setupThemeToggle() {
        // Detectar preferencia del sistema
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const currentTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
        
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        // Escuchar cambios en la preferencia del sistema
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
            }
        });
    }
}

// Inicializar la aplicación
const app = new MainApp();
app.init();

// Exportar para uso en otros scripts si es necesario
export { MainApp, NavigationModule, GalleryModule, Viewer3DModule, ContactFormModule };