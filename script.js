document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.carousel-slide');
    let currentSlide = 0;

    function updateSlides() {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[currentSlide].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlides();
    }

    // Auto advance slides every 5 seconds
    setInterval(nextSlide, 5000);

    // Update countdown timer
    function updateTimer() {
        const startDate = new Date('2025-02-13T00:00:00');
        const now = new Date();
        const timeDiff = now - startDate;

        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        const timeElement = document.querySelector('.time');
        timeElement.textContent = `${days} Dias, ${hours.toString().padStart(2, '0')} Horas, ${minutes.toString().padStart(2, '0')} Minutos, ${seconds.toString().padStart(2, '0')} Segundos`;
    }

    // Update timer every second
    setInterval(updateTimer, 1000);
    updateTimer(); // Initial timer update

    // Emoji rain
    const emojis = ['🤍', '🤍', '🤍', '🤍', '🤍', '🤍'];
    const emojiContainer = document.getElementById('emoji-container');
    const numberOfEmojis = 50;

    function createEmoji() {
        const emoji = document.createElement('div');
        emoji.className = 'emoji';
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = Math.random() * 100 + 'vw';
        emoji.style.animationDuration = (Math.random() * 3 + 2) + 's';
        emojiContainer.appendChild(emoji);

        emoji.addEventListener('animationend', () => {
            emoji.remove();
        });
    }

    // Create emojis with slight delay between each
    for (let i = 0; i < numberOfEmojis; i++) {
        setTimeout(() => {
            createEmoji();
        }, i * 100);
    }

    // Music player functionality
    const musicPlayer = document.querySelector('.music-player');
    const audio = document.getElementById('song');
    const playPauseBtn = document.createElement('div'); // Botão de play/pause
    let isPlaying = false;

    // Initialize audio
    audio.volume = 0.5;

    // Adicionar botão de play/pause
    playPauseBtn.className = 'play-pause-btn';
    playPauseBtn.innerHTML = `
        <div class="wave-animation">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;

    // Adicionar o botão ao player (lado direito)
    musicPlayer.querySelector('.music-info').appendChild(playPauseBtn);

    // Função para tocar/pausar a música
    function togglePlay() {
        if (isPlaying) {
            audio.pause();
            playPauseBtn.classList.remove('playing'); // Remove a animação de onda
        } else {
            audio.play().catch(error => {
                console.log('Playback prevented:', error);
            });
            playPauseBtn.classList.add('playing'); // Ativa a animação de onda
        }
        isPlaying = !isPlaying;
    }

    // Reiniciar a música quando acabar
    audio.addEventListener('ended', () => {
        audio.currentTime = 0; // Reinicia a música
        audio.play(); // Toca novamente
    });

    // Atualizar barra de progresso
    audio.addEventListener('timeupdate', () => {
        const progress = (audio.currentTime / audio.duration) * 100;
        document.querySelector('.progress').style.width = `${progress}%`;
    });

    // Controle de play/pause pelo botão
    playPauseBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Impede que o clique no botão afete o player
        togglePlay();
    });

    // Controle de play/pause pelo player
    musicPlayer.addEventListener('click', (e) => {
        // Ignorar cliques na barra de progresso
        if (e.target.classList.contains('progress-bar') || e.target.classList.contains('progress')) return;

        togglePlay();
    });

    // Tentar tocar a música quando o usuário interagir com a página
    document.addEventListener('click', () => {
        if (!isPlaying) {
            togglePlay();
        }
    }, { once: true });
});