document.addEventListener('DOMContentLoaded', () => {

    // --- Configuration ---
    const SLIDE_DURATION = 9000;
    const TEXT_TRANSITION_OUT_TIME = 800;

    // The images array is now provided by images.js as localImages
    const images = [...localImages].sort(() => 0.5 - Math.random());

    // Slide types: 'default', 'qr', 'instagram'
    const contents = [
        {
            title: "SOMOS <img src='assets/logo.png' class='inline-logo' alt='MMT'>",
            subtitle: "Más Mujeres en las TICs. Conoce más sobre nuestra visión y compromiso.",
            text: "Impulsando la innovación y el liderazgo femenino en STEM a través de un modelo colaborativo, integrador y en red que busca transformar nuestro futuro.",
            duration: 15000,
            type: 'default'
        },
        {
            title: "ESTRUCTURA <span>ORGANIZATIVA</span>",
            subtitle: "La organización del programa se gestiona a partir de un modelo en red que integra a toda la comunidad de Duoc UC.",
            text: "Desde la Dirección y Coordinación Central, hasta el Consejo y cada una de las Líderes y Embajadoras, trabajamos unidas en cada paso para guiar la tecnología de la información hacia una nueva era.",
            type: 'default'
        },
        {
            title: "DIRECTORA DEL <span>PROGRAMA</span>",
            subtitle: "Visión y estrategia para alcanzar nuestras ambiciosas metas.",
            text: "Liderar el camino significa desarrollar planes y métricas de éxito del programa, promoviendo de forma incansable nuestro propósito fundacional a lo largo de todo Duoc UC.",
            type: 'default'
        },
        {
            title: "ESCANEA NUESTRO <span>QR</span>",
            subtitle: "Accede directamente a nuestra plataforma y recursos escaneando el código en pantalla.",
            text: "Apunta la cámara de tu celular, descubre nuestro contenido exclusivo y súmate activamente a la comunidad en donde todas somos Más Tecnológicas.",
            image: "assets/qr.png",
            duration: 15000,
            type: 'qr'
        },
        {
            title: "COORDINACIÓN Y <span>CONSEJO</span>",
            subtitle: "El motor que asegura el avance y cumplimiento de los objetivos transversales.",
            text: "Equipos dedicados exclusivamente a guiar el desarrollo de la operación diaria y a definir y aprobar metas clave, brindando el soporte central a todos nuestros docentes.",
            type: 'default'
        },
        {
            title: "DOCENTES LÍDERES <span>POR SEDE</span>",
            subtitle: "El apoyo clave para acompañar a nuestras estudiantes a nivel local.",
            text: "Impulsores que facilitan recursos vitales y coordinan espacios, logrando que quienes desarrollan eventos y actividades cuenten en cada momento con el respaldo y difusión necesaria.",
            type: 'default'
        },
        {
            title: "SÍGUENOS EN <span>INSTAGRAM</span>",
            subtitle: "Mantente al día con nuestras actividades, talleres y eventos de nuestra sede en Puerto Montt.",
            text: "Encuéntranos como @mmt_puertomontt y etiquétanos usando nuestros hashtags para ser parte de esta gran red de aprendizaje activo online.",
            duration: 15000,
            type: 'instagram'
        },
        {
            title: "CONSEJO DE <span>LÍDERES</span>",
            subtitle: "Las voces principales y representantes directas de nuestra comunidad de estudiantes.",
            text: "Alumnas líderes que asumen la responsabilidad fundamental de coordinar e impulsar constantemente iniciativas transversales con el fin de guiar y motivar el rumbo de nuestro talento.",
            type: 'default'
        },
        {
            title: "LÍDERES Y <span>SUBLÍDERES</span>",
            subtitle: "El corazón y la energía de las actividades propulsoras en cada uno de nuestros campus.",
            text: "Voluntarias incansables dedicadas a proponer y ejecutar eventos locales que enriquecen a sus respectivas sedes, asegurándose a diario de mantener conectada e informada a su comunidad.",
            type: 'default'
        },
        {
            title: "NUESTRA <span>IMAGEN</span>",
            subtitle: "Saber más nos hace llegar más lejos.",
            text: "Observa fijamente los detalles en la pantalla que te rodea. La magia pura de la creación y la tecnología está hoy mismo al alcance de nuestras propias manos.",
            image: "assets/image.png",
            duration: 15000,
            type: 'featured'
        },
        {
            title: "VOLUNTARIAS Y <span>EMBAJADORES</span>",
            subtitle: "La fuerza motriz determinante detrás del cambio y de la colaboración mutua.",
            text: "Estudiantes, docentes y administrativos unidos en equipo, sumergidos en el aprendizaje colaborativo con la firme meta de expandir significativamente la participación de nuevas mujeres en STEM.",
            type: 'default'
        },
        {
            title: "ESCANEA NUESTRO <span>QR</span>",
            subtitle: "Más información al alcance de tu bolsillo.",
            text: "Simplemente escanea nuestro código QR disponible de inmediato en pantalla para acceder hoy mismo a los beneficios, recientes convocatorias e iniciativas enfocadas en las TIC.",
            image: "assets/qr.png",
            duration: 15000,
            type: 'qr'
        }
    ];

    // --- DOM References ---
    let currentIndex = 0;
    const tvGrid = document.getElementById('tv-grid');
    const textCard = document.getElementById('text-container');
    const titleEl = document.getElementById('main-title');
    const subtitleEl = document.getElementById('sub-title');
    const textEl = document.getElementById('main-text');
    const qrHero = document.getElementById('qr-hero');
    const igCard = document.getElementById('ig-card');
    const featuredHero = document.getElementById('featured-hero');
    const featuredImg = document.getElementById('featured-img');
    const footerQR = document.getElementById('footer-qr');
    const progressBar = document.getElementById('progress-bar');

    // --- TV Grid Generation ---
    const tvElements = [];
    const spans = ['', '', '', 'tv-span-2', 'tv-span-wide', 'tv-span-tall'];
    const totalTVs = 50;

    for (let i = 0; i < totalTVs; i++) {
        const tv = document.createElement('div');
        tv.classList.add('tv-item');

        if (Math.random() > 0.6) {
            const randomSpan = spans[Math.floor(Math.random() * spans.length)];
            if (randomSpan) tv.classList.add(randomSpan);
        }

        const img = document.createElement('img');
        img.classList.add('tv-inner-img');
        img.src = images[i % images.length];

        tv.appendChild(img);
        tvGrid.appendChild(tv);
        tvElements.push(tv);
    }

    let activeSlideIndex = -1;

    // --- Progress Bar ---
    let progressInterval = null;
    let progressStartTime = 0;
    let progressDuration = 0;

    function startProgressBar(duration) {
        progressBar.style.transition = 'none';
        progressBar.style.width = '0%';
        progressStartTime = Date.now();
        progressDuration = duration;

        if (progressInterval) clearInterval(progressInterval);
        progressInterval = setInterval(() => {
            const elapsed = Date.now() - progressStartTime;
            const ratio = Math.min(elapsed / progressDuration, 1);
            progressBar.style.width = `${ratio * 100}%`;
            if (ratio >= 1) clearInterval(progressInterval);
        }, 50);
    }

    // --- Slide Type Management ---
    function updateSlideType(type, content) {
        // Hide everything first
        qrHero.classList.add('hidden');
        igCard.classList.add('hidden');
        featuredHero.classList.add('hidden');
        footerQR.classList.remove('hidden');

        if (type === 'qr') {
            qrHero.classList.remove('hidden');
            footerQR.classList.add('hidden');
        } else if (type === 'instagram') {
            igCard.classList.remove('hidden');
            footerQR.classList.remove('hidden');
        } else if (type === 'featured') {
            featuredHero.classList.remove('hidden');
            if (content && content.image) {
                featuredImg.src = content.image;
            }
            footerQR.classList.remove('hidden');
        }
    }

    // --- Render Content ---
    function renderContent(index) {
        const item = contents[index];
        titleEl.innerHTML = item.title;
        subtitleEl.textContent = item.subtitle;
        textEl.textContent = item.text;

        // Update slide type visuals
        updateSlideType(item.type || 'default', item);
    }

    // Put initial text
    renderContent(0, true);

    let slideTimer;

    function scheduleNextSlide(duration) {
        clearTimeout(slideTimer);
        slideTimer = setTimeout(nextSlide, duration);
        startProgressBar(duration);
    }

    // --- Loop Logic ---
    function nextSlide() {
        // Remove active from old TV and reset transform
        if (activeSlideIndex !== -1 && tvElements[activeSlideIndex]) {
            tvElements[activeSlideIndex].classList.remove('active-tv');
            tvElements[activeSlideIndex].style.transform = '';
            tvGrid.style.animationPlayState = 'running';
            const oldImg = tvElements[activeSlideIndex].querySelector('.tv-inner-img');
            if (oldImg && oldImg.dataset.originalSrc) {
                oldImg.src = oldImg.dataset.originalSrc;
                oldImg.style.objectFit = 'cover';
                oldImg.style.backgroundColor = 'transparent';
            }
        }

        // Start fading out old text
        textCard.classList.add('switching');

        setTimeout(() => {
            // Pick a new random TV
            let nextTvIndex;
            do {
                nextTvIndex = Math.floor(Math.random() * tvElements.length);
            } while (nextTvIndex === activeSlideIndex && tvElements.length > 1);

            const nextContentIndex = (currentIndex + 1) % contents.length;
            const nextContent = contents[nextContentIndex];

            // Activate new TV
            const nextTv = tvElements[nextTvIndex];
            const nextTvImg = nextTv.querySelector('.tv-inner-img');

            // Allow setting a custom image
            if (!nextTvImg.dataset.originalSrc) {
                nextTvImg.dataset.originalSrc = nextTvImg.src;
            }
            if (nextContent.image) {
                nextTvImg.src = nextContent.image;
                nextTvImg.style.objectFit = 'contain';
                nextTvImg.style.backgroundColor = '#111';
            }

            // Calculate center translation
            const rect = nextTv.getBoundingClientRect();

            if (rect.width > 0 && rect.height > 0) {
                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2;
                const itemCenterX = rect.left + rect.width / 2;
                const itemCenterY = rect.top + rect.height / 2;
                const translateX = centerX - itemCenterX;
                const translateY = centerY - itemCenterY;

                const scale = Math.max(window.innerWidth / rect.width, window.innerHeight / rect.height) * 1.05;

                nextTv.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
            }

            tvGrid.style.animationPlayState = 'paused';
            nextTv.classList.add('active-tv');
            activeSlideIndex = nextTvIndex;

            // After zoom in finishes, change content and fade it back in
            setTimeout(() => {
                renderContent(nextContentIndex);
                textCard.classList.remove('switching');

                const colors = ['#7928CA', '#FF0080', '#00E5FF', '#10B981'];
                const activeColor = colors[nextContentIndex % colors.length];
                titleEl.style.textShadow = `0 4px 15px ${activeColor}90`;

                currentIndex = nextContentIndex;

                // Schedule the next slide
                const nextDuration = nextContent.duration || SLIDE_DURATION;
                scheduleNextSlide(nextDuration);
            }, 1000);
        }, 1000);
    }

    // Start the infinite loop
    setTimeout(() => {
        const firstDuration = contents[0].duration || SLIDE_DURATION;
        scheduleNextSlide(firstDuration);
        nextSlide();
    }, 500);

});
