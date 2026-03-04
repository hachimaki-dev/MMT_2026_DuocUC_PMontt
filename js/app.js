document.addEventListener('DOMContentLoaded', () => {

    // --- Configuration ---
    const SLIDE_DURATION = 9000;
    const TEXT_TRANSITION_OUT_TIME = 800;

    // The images array is now provided by images.js as localImages
    const images = [...localImages].sort(() => 0.5 - Math.random());

    // Slide types: 'default', 'qr', 'instagram'
    const contents = [
        {
            title: "¿QUÉ ES <img src='assets/logo.png' class='inline-logo' alt='MMT'>?",
            subtitle: "Programa institucional Más Mujeres en las TIC de Duoc UC.",
            text: "MMT es una iniciativa de la Escuela de Informática y Telecomunicaciones de Duoc UC que busca aumentar la participación femenina en las Tecnologías de la Información y carreras STEM. Promueve liderazgo estudiantil, redes de apoyo y actividades formativas en todas sus sedes.",
            duration: 15000,
            type: 'default'
        },
        {
            title: "PROGRAMA CON <span>ESTRUCTURA</span>",
            subtitle: "Organización clara, impacto real.",
            text: "MMT cuenta con Directora del programa, Consejo Duoc UC, Coordinación Central, Docentes Líderes por sede y un Consejo de Líderes estudiantiles. Esta estructura permite planificar, ejecutar y evaluar actividades con objetivos y resultados definidos.",
            type: 'default'
        },
        {
            title: "LIDERAZGO <span>ESTUDIANTIL</span>",
            subtitle: "Las alumnas impulsan el cambio.",
            text: "Las Líderes y Sublíderes por sede proponen y desarrollan actividades locales, coordinan iniciativas y representan a sus comunidades. Son el motor activo del programa en cada campus.",
            type: 'default'
        },
        {
            title: "CONSEJO DE <span>LÍDERES</span>",
            subtitle: "Representación y articulación entre sedes.",
            text: "El Consejo de Líderes está conformado por estudiantes representantes de distintas sedes. Difunden el programa, coordinan acciones transversales y actúan como enlace entre la comunidad estudiantil y la Coordinación Central.",
            type: 'default'
        },
        {
            title: "DOCENTES <span>LÍDERES</span>",
            subtitle: "Acompañamiento y respaldo institucional.",
            text: "Cada sede cuenta con Docentes Líderes que apoyan la organización de actividades, facilitan recursos y aseguran la articulación con la Dirección de Carrera. Su rol es garantizar que las iniciativas estudiantiles cuenten con soporte académico y administrativo.",
            type: 'default'
        },
        {
            title: "VOLUNTARIAS Y <span>EMBAJADORAS</span>",
            subtitle: "La base activa de la comunidad.",
            text: "Estudiantes, docentes y administrativos pueden registrarse como voluntarias o embajadoras. Participan en actividades, proponen iniciativas y contribuyen al objetivo común de fortalecer la presencia femenina en el ámbito tecnológico.",
            type: 'default'
        },
        {
            title: "RED ENTRE <span>SEDES</span>",
            subtitle: "Trabajo colaborativo a nivel institucional.",
            text: "MMT articula sedes como Alameda, Maipú, Antonio Varas y Plaza Norte, promoviendo la colaboración y el intercambio de experiencias. Las buenas prácticas locales pueden escalar y replicarse en toda la comunidad.",
            type: 'default'
        },
        {
            title: "FORMACIÓN Y <span>ACTIVIDADES</span>",
            subtitle: "Aprendizaje aplicado en comunidad.",
            text: "El programa impulsa talleres, charlas técnicas, mentorías, encuentros y proyectos colaborativos. Estas actividades buscan fortalecer habilidades técnicas, liderazgo y sentido de pertenencia en las estudiantes.",
            type: 'default'
        },
        {
            title: "GESTIÓN Y <span>RESULTADOS</span>",
            subtitle: "Medición e indicadores de impacto.",
            text: "MMT registra información sobre sus actividades e indicadores de participación. La evaluación constante permite mejorar la planificación y asegurar el cumplimiento de los objetivos estratégicos del programa.",
            type: 'default'
        },
        {
            title: "COMUNIDAD <span>MMT</span>",
            subtitle: "Red de apoyo en el mundo tecnológico.",
            text: "Más que un conjunto de actividades, MMT es una comunidad organizada que busca transformar la experiencia académica de las estudiantes en tecnología, promoviendo liderazgo, colaboración y proyección profesional.",
            image: "assets/image.png",
            duration: 15000,
            type: 'featured'
        },
        {
            title: "SÚMATE AL <span>PROGRAMA</span>",
            subtitle: "Participa y forma parte de la red.",
            text: "Escanea el código QR en pantalla para acceder a información oficial, convocatorias vigentes y actividades del programa Más Mujeres en las TIC. Tu participación fortalece esta comunidad.",
            image: "assets/qr.png",
            duration: 15000,
            type: 'qr'
        },
        {
            title: "SIGUENOS EN <span>INSTAGRAM</span>",
            subtitle: "Mantente informada de nuestras actividades.",
            text: "Síguenos en Instagram @mmt_puertomontt para conocer eventos recientes, convocatorias abiertas y noticias del programa en tu sede.",
            duration: 15000,
            type: 'instagram'
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
