document.addEventListener('DOMContentLoaded', () => {

    // --- State and Config ---
    const SLIDE_DURATION = 10000; // 10 seconds per slide
    const slides = document.querySelectorAll('.slide');
    const progressBar = document.getElementById('progress-bar');
    let currentSlide = 0;
    
    // --- Background Slideshow ---
    const allImages = [
        "nuevas imagenes/WhatsApp Image 2025-12-10 at 14.52.24.jpeg",
        "nuevas imagenes/WhatsApp Image 2026-03-04 at 17.01.01.jpeg",
        "nuevas imagenes/WhatsApp Image 2026-03-04 at 17.01.02.jpeg",
        "nuevas imagenes/WhatsApp Image 2026-03-04 at 18.50.03.jpeg",
        "nuevas imagenes/WhatsApp Image 2026-03-04 at 18.50.06.jpeg",
        "nuevas imagenes/WhatsApp Image 2026-03-04 at 18.50.07.jpeg",
        "nuevas imagenes/WhatsApp Image 2026-03-25 at 15.28.52.jpeg",
        "nuevas imagenes/WhatsApp Image 2026-03-25 at 15.28.53.jpeg",
        "nuevas imagenes/WhatsApp Image 2026-03-27 at 16.32.33 (1).jpeg",
        "nuevas imagenes/WhatsApp Image 2026-03-27 at 16.32.33 (2).jpeg",
        "nuevas imagenes/WhatsApp Image 2026-03-27 at 16.32.33.jpeg",
        "nuevas imagenes/WhatsApp Image 2026-03-28 at 09.31.43.jpeg",
        "nuevas imagenes/WhatsApp Image 2026-03-28 at 09.31.45.jpeg",
        "nuevas imagenes/WhatsApp Image 2026-03-28 at 09.31.48.jpeg",
        "nuevas imagenes/WhatsApp Image 2026-04-01 at 15.49.37.jpeg",
        "nuevas imagenes/WhatsApp Image 2026-04-01 at 15.49.45 (1).jpeg",
        "nuevas imagenes/WhatsApp Image 2026-04-01 at 15.49.45.jpeg",
        "nuevas imagenes/WhatsApp Image 2026-04-01 at 15.49.47.jpeg",
        "assets/f_IMG_1167.JPG", "assets/f_IMG_1171.JPG", "assets/f_IMG_1174.JPG", 
        "assets/f_IMG_1184.JPG", "assets/f_IMG_1194.JPG", "assets/f_IMG_1195.JPG", 
        "assets/f_IMG_1197.JPG", "assets/f_IMG_1199.JPG", "assets/f_IMG_1223.JPG", 
        "assets/f_IMG_1231.JPG", "assets/f_IMG_1239.JPG", "assets/f_IMG_1241.JPG", 
        "assets/f_IMG_1253.JPG", "assets/f_IMG_1256.JPG", "assets/f_IMG_1257.JPG", 
        "assets/f_IMG_1259.JPG", "assets/f_IMG_1263.JPG", "assets/f_IMG_1273.JPG", 
        "assets/f_IMG_1274.JPG", "assets/f_IMG_1279.JPG", "assets/f_IMG_1281.JPG", 
        "assets/f_IMG_1294.JPG", "assets/f_IMG_1296.JPG", "assets/f_IMG_1298.JPG", 
        "assets/f_IMG_1304.JPG", "assets/f_IMG_1313.JPG", "assets/f_IMG_1316.JPG", 
        "assets/f_IMG_1334.JPG", "assets/f_IMG_1335.JPG", "assets/f_IMG_1337.JPG"
    ];
    
    // Shuffle images for variety
    allImages.sort(() => Math.random() - 0.5);

    // Testimonials Data
    const testimonials = [
        { text: "Entré sin saber programar y ahora construyo el futuro.", author: "Estudiante DuocUC" },
        { text: "Nunca pensé que la tecnología era para mí, hasta que lo intenté.", author: "Participante MMT" },
        { text: "Encontré una red de apoyo increíble que me impulsó a seguir.", author: "Alumna de primer año" },
        { text: "Aquí descubrí que el liderazgo femenino en la industria sí es posible.", author: "Ex-alumna MMT" }
    ];
    let testimonialIndex = 0;
    const testimonialEl = document.getElementById('dynamic-testimonial');
    const authorEl = document.getElementById('dynamic-author');

    // --- Core Logic ---

    let presentationInterval;
    let triviaActive = false;

    function startPresentation() {
        // Initialize Background Gallery
        initBackgroundGallery();

        // Initialize first slide
        showSlide(currentSlide);
        startProgress();

        // Start the rotation interval
        presentationInterval = setInterval(() => {
            if (!triviaActive) nextSlide();
        }, SLIDE_DURATION);
    }

    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active-slide');
            slide.classList.add('hidden-slide');
        });

        // Show the target slide
        slides[index].classList.remove('hidden-slide');
        // Small delay to allow display to apply before opacity transition
        setTimeout(() => {
            slides[index].classList.add('active-slide');
        }, 50);

        // Special handling for Testimonial Slide
        if (slides[index].id === 'slide-3') {
            updateTestimonial();
        }

        // Special handling for gap counter slides
        if (slides[index].id === 'slide-data-global') {
            animateCounter('counter-global');
        }
        if (slides[index].id === 'slide-data-chile') {
            animateCounter('counter-chile');
        }
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
        resetProgress();
    }

    function updateTestimonial() {
        testimonialIndex = (testimonialIndex + 1) % testimonials.length;
        testimonialEl.style.opacity = '0';
        authorEl.style.opacity = '0';
        
        setTimeout(() => {
            testimonialEl.textContent = testimonials[testimonialIndex].text;
            authorEl.textContent = "- " + testimonials[testimonialIndex].author;
            testimonialEl.style.opacity = '1';
            authorEl.style.opacity = '1';
            testimonialEl.style.transition = 'opacity 0.5s ease';
            authorEl.style.transition = 'opacity 0.5s ease';
        }, 500); // Wait for fade out
    }

    // --- Counter Logic ---
    function animateCounter(elementId) {
        const counterEl = document.getElementById(elementId);
        if(!counterEl) return;
        
        let target = parseFloat(counterEl.getAttribute('data-target')) || 0;
        const duration = 2500; // 2.5 seconds animation
        const steps = 50; 
        const stepTime = Math.abs(Math.floor(duration / steps));
        let current = 0;
        
        counterEl.textContent = '0';
        
        const timer = setInterval(() => {
            current += target / steps;
            if (current >= target) {
                // Formatting for decimal if needed
                counterEl.textContent = Number.isInteger(target) ? target : target.toFixed(1);
                clearInterval(timer);
            } else {
                counterEl.textContent = Math.floor(current);
            }
        }, stepTime);
    }

    // --- Progress Bar ---
    let progressAnim;
    
    function startProgress() {
        progressBar.style.transition = `width ${SLIDE_DURATION}ms linear`;
        progressBar.style.width = '100%';
    }

    function resetProgress() {
        progressBar.style.transition = 'none';
        progressBar.style.width = '0%';
        // Force reflow
        void progressBar.offsetWidth;
        startProgress();
    }

    // --- Global Background Gallery Logic ---
    function initBackgroundGallery() {
        const bgContainer = document.getElementById('bg-slideshow');
        if(!bgContainer) return;

        let bgIndex = 0;
        
        // Create first image
        const img1 = document.createElement('div');
        img1.className = 'bg-slide active';
        img1.style.backgroundImage = `url('${allImages[bgIndex]}')`;
        bgContainer.appendChild(img1);

        // Change background every 6 seconds (faster than text slide to feel dynamic)
        setInterval(() => {
            bgIndex = (bgIndex + 1) % allImages.length;
            
            const nextImg = document.createElement('div');
            nextImg.className = 'bg-slide';
            nextImg.style.backgroundImage = `url('${allImages[bgIndex]}')`;
            bgContainer.appendChild(nextImg);
            
            // Trigger reflow
            void nextImg.offsetWidth;
            nextImg.classList.add('active');

            // Cleanup old images
            setTimeout(() => {
                const slides = bgContainer.querySelectorAll('.bg-slide');
                if (slides.length > 2) {
                    slides[0].remove();
                }
            }, 2000); // Wait for fade transition

        }, 6000);
    }

    // --- Init ---
    startPresentation();

    // --- Trivia Logic ---
    let currentTriviaIndex = 0;
    let triviaScore = 0;
    let inputBuffer = "";
    const MAGIC_KEY = "123456789";
    let isAnswering = false;

    const triviaQuestions = [
        {
            q: "¿Qué significa MMT?",
            options: [
                { id: 'A', text: "Más Mujeres en Tecnología" },
                { id: 'B', text: "Mujeres Modelando Tecnología" },
                { id: 'C', text: "Más Mujeres en las TIC" },
                { id: 'D', text: "Muchas Mujeres Trabajando" }
            ],
            correct: 'c'
        },
        {
            q: "¿Cuál es el objetivo principal de la Iniciativa MMT?",
            options: [
                { id: 'A', text: "Organizar torneos" },
                { id: 'B', text: "Visibilizar talento femenino" },
                { id: 'C', text: "Reparar infraestructura" },
                { id: 'D', text: "Dictar cursos de ofimática" }
            ],
            correct: 'b'
        },
        {
            q: "¿Quién es considerada la primera programadora de la historia?",
            options: [
                { id: 'A', text: "Marie Curie" },
                { id: 'B', text: "Ada Lovelace" },
                { id: 'C', text: "Grace Hopper" },
                { id: 'D', text: "Margaret Hamilton" }
            ],
            correct: 'b'
        },
        {
            q: "(Lógica) Si la Caja A pesa más que B, y B pesa más que C, ¿Cuál pesa menos?",
            options: [
                { id: 'A', text: "La Caja C" },
                { id: 'B', text: "La Caja A" },
                { id: 'C', text: "La Caja B" },
                { id: 'D', text: "Pesan igual" }
            ],
            correct: 'a'
        },
        {
            q: "(Lógica) Si la secuencia es: 2, 4, 8, 16... ¿Cuál sigue?",
            options: [
                { id: 'A', text: "24" },
                { id: 'B', text: "30" },
                { id: 'C', text: "32" },
                { id: 'D', text: "64" }
            ],
            correct: 'c'
        }
    ];

    const triviaOverlay = document.getElementById('trivia-overlay');
    const triviaQuestionEl = document.getElementById('trivia-question');
    const triviaOptionsEl = document.getElementById('trivia-options');
    const triviaFeedbackEl = document.getElementById('trivia-feedback');

    // Global Key Listener
    document.addEventListener('keydown', (e) => {
        // Track magic key
        inputBuffer += e.key;
        if (inputBuffer.length > MAGIC_KEY.length) {
            inputBuffer = inputBuffer.slice(-MAGIC_KEY.length);
        }

        if (inputBuffer === MAGIC_KEY && !triviaActive) {
            startTrivia();
            inputBuffer = ""; // reset
        }

        // Options listener if active
        if (triviaActive && !isAnswering) {
            const key = e.key.toLowerCase();
            if (['a', 'b', 'c', 'd'].includes(key)) {
                handleTriviaAnswer(key);
            }
        }
    });

    function startTrivia() {
        triviaActive = true;
        currentTriviaIndex = 0;
        triviaScore = 0;
        triviaOverlay.classList.remove('hidden-trivia');
        // Pause progress animation
        progressBar.style.transition = 'none';
        
        loadTriviaQuestion();
    }

    function loadTriviaQuestion() {
        isAnswering = false;
        triviaFeedbackEl.textContent = "";
        triviaFeedbackEl.style.color = "var(--text-primary)";
        
        const qData = triviaQuestions[currentTriviaIndex];
        triviaQuestionEl.textContent = qData.q;
        triviaOptionsEl.innerHTML = "";

        qData.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'trivia-option';
            btn.innerHTML = `<span class="key-hint">${opt.id}</span> ${opt.text}`;
            btn.onclick = () => {
                if (!isAnswering) handleTriviaAnswer(opt.id.toLowerCase());
            };
            // Assign custom attribute to easily select later
            btn.dataset.letter = opt.id.toLowerCase();
            triviaOptionsEl.appendChild(btn);
        });
    }

    function handleTriviaAnswer(selectedLetter) {
        isAnswering = true;
        const qData = triviaQuestions[currentTriviaIndex];
        const isCorrect = selectedLetter === qData.correct;

        // Visual feedback
        const buttons = triviaOptionsEl.querySelectorAll('.trivia-option');
        buttons.forEach(btn => {
            if (btn.dataset.letter === selectedLetter) {
                if (isCorrect) {
                    btn.classList.add('correct');
                    triviaFeedbackEl.textContent = "¡Respuesta Correcta! ✨";
                    triviaFeedbackEl.style.color = "#22c55e"; // green
                    triviaScore++;
                } else {
                    btn.classList.add('wrong');
                    triviaFeedbackEl.textContent = "Ups... incorrecto 💔";
                    triviaFeedbackEl.style.color = "#ef4444"; // red
                }
            } else if (btn.dataset.letter === qData.correct) {
                // Highlight the correct one as well if they chose wrong
                btn.classList.add('correct');
            }
        });

        // Delay before next question
        setTimeout(() => {
            currentTriviaIndex++;
            if (currentTriviaIndex < triviaQuestions.length) {
                loadTriviaQuestion();
            } else {
                endTrivia();
            }
        }, 2000);
    }

    function endTrivia() {
        triviaQuestionEl.innerHTML = `¡Trivia Terminada!<br><br><span style="font-size: 2.5rem; font-weight: 500; color: #ec4899;">¡No olvides retirar tu premio! 🎁</span>`;
        triviaOptionsEl.innerHTML = `<div style="grid-column: span 2; font-size: 3rem; color: #22c55e; margin-top: 1rem; text-shadow: 0 0 20px rgba(34, 197, 94, 0.5);">Puntaje Final: ${triviaScore} / ${triviaQuestions.length}</div>`;
        triviaFeedbackEl.textContent = "Regresando a la presentación en breve...";
        triviaFeedbackEl.style.color = "var(--text-secondary)";

        // Celebración con confeti
        if (typeof confetti === 'function') {
            const duration = 4000;
            const end = Date.now() + duration;

            (function frame() {
                confetti({
                    particleCount: 5,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: ['#8b5cf6', '#ec4899', '#3b82f6', '#22c55e'],
                    zIndex: 2000
                });
                confetti({
                    particleCount: 5,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: ['#8b5cf6', '#ec4899', '#3b82f6', '#22c55e'],
                    zIndex: 2000
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            }());
        }

        setTimeout(() => {
            triviaOverlay.classList.add('hidden-trivia');
            triviaActive = false;
            // Resume progress bar
            resetProgress();
            // Move to next slide to trigger visual refresh
            nextSlide();
        }, 6000);
    }

});
