document.addEventListener("DOMContentLoaded", () => {
    const startScreen = document.getElementById("start-screen")
    const startButton = document.getElementById("start-button")
    const mainContent = document.querySelector(".container")
    const audio = document.getElementById("song")
    const floatingHearts = document.getElementById("floating-hearts")
    const emojiContainer = document.getElementById("emoji-container")
    const musicPlayer = document.querySelector(".music-player")
    let isPlaying = false
  
    // Mostra a tela inicial e esconde o conteúdo principal
    startScreen.style.display = "flex"
    mainContent.style.display = "none"
  
    // Esconde o player de música e o container de emojis inicialmente
    if (musicPlayer) {
      musicPlayer.style.visibility = "hidden"
    }
    if (emojiContainer) {
      emojiContainer.style.visibility = "hidden"
    }
  
    // Cria corações flutuantes
    function createFloatingHearts() {
      const numberOfHearts = 30 // Número de corações flutuantes
      for (let i = 0; i < numberOfHearts; i++) {
        const heart = document.createElement("div")
        heart.className = "heart"
        heart.innerHTML = "🤍" // Coração branco
        heart.style.left = Math.random() * 100 + "vw"
        heart.style.top = Math.random() * 100 + "vh"
        heart.style.fontSize = Math.random() * 8 + 14 + "px" // Tamanho variado entre 14-22px
        heart.style.animationDuration = Math.random() * 6 + 4 + "s" // Duração aleatória
        heart.style.animationDelay = Math.random() * 3 + "s" // Atraso aleatório para movimento mais natural
        floatingHearts.appendChild(heart)
      }
    }
  
    // Quando o botão é clicado
    startButton.addEventListener("click", () => {
      // Esconde a tela inicial
      startScreen.style.display = "none"
  
      // Mostra o conteúdo principal
      mainContent.style.display = "block"
  
      // Mostra e inicia a animação do player de música com um atraso maior
      if (musicPlayer) {
        setTimeout(() => {
          musicPlayer.style.visibility = "visible"
          // Força um reflow para garantir que a animação seja aplicada
          void musicPlayer.offsetWidth
          musicPlayer.classList.add("animate-in")
        }, 1500) // Atraso de 1.5 segundos antes de iniciar a animação
      }
  
      // Mostra o container de emojis e inicia a chuva de emojis
      if (emojiContainer) {
        emojiContainer.style.visibility = "visible"
        startEmojiRain()
      }
  
      // Toca a música automaticamente
      audio.play().catch((error) => {
        console.log("Playback prevented:", error)
      })
  
      // Ativa a animação de onda no botão de play
      isPlaying = true
      playPauseBtn.classList.add("playing")
    })
  
    // Cria os corações flutuantes ao carregar a página
    createFloatingHearts()
  
    // Carrossel de imagens
    const slides = document.querySelectorAll(".carousel-slide")
    let currentSlide = 0
  
    function updateSlides() {
      slides.forEach((slide, index) => {
        if (index === currentSlide) {
          slide.style.opacity = "0"
          slide.style.zIndex = "1"
          // Use requestAnimationFrame for smoother transitions
          requestAnimationFrame(() => {
            setTimeout(() => {
              slide.style.opacity = "1"
              slide.classList.add("active")
            }, 50)
          })
        } else {
          slide.classList.remove("active")
          slide.style.zIndex = "0"
        }
      })
    }
  
    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length
      updateSlides()
    }
  
    // Auto avançar slides a cada 5 segundos
    setInterval(nextSlide, 5000)
  
    // Atualizar contador
    function updateTimer() {
      const startDate = new Date("2025-02-13T00:00:00") // Data de início do relacionamento
      const now = new Date()
      const timeDiff = now - startDate
  
      const months = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30)) // Aproximação de 30 dias por mês
      const days = Math.floor((timeDiff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24))
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000)
  
      const timeElement = document.querySelector(".time")
      timeElement.textContent = `${months} Meses, ${days} Dias, ${hours.toString().padStart(2, "0")} Horas, ${minutes.toString().padStart(2, "0")} Minutos, ${seconds.toString().padStart(2, "0")} Segundos`
  
      // Verifica se completou 1 mês
      if (months > 0 && days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
        startHeartRain() // Inicia a chuva de corações
      }
    }
  
    // Atualizar o contador a cada segundo
    setInterval(updateTimer, 1000)
    updateTimer() // Atualização inicial do contador
  
    // Emoji rain
    const emojis = ["🤍", "🤍", "🤍", "🤍", "🤍", "🤍"]
    const numberOfEmojis = 50
  
    function createEmoji() {
      const emoji = document.createElement("div")
      emoji.className = "emoji"
      emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)]
      emoji.style.left = Math.random() * 100 + "vw"
      emoji.style.animationDuration = Math.random() * 3 + 2 + "s"
      emoji.style.transform = `scale(${Math.random() * 0.5 + 0.8}) rotate(${Math.random() * 40 - 20}deg)` // Adiciona escala e rotação aleatórias
      emojiContainer.appendChild(emoji)
  
      emoji.addEventListener("animationend", () => {
        emoji.remove()
      })
    }
  
    // Função para iniciar a chuva de emojis
    function startEmojiRain() {
      // Criar emojis com um pequeno atraso entre cada um
      for (let i = 0; i < numberOfEmojis; i++) {
        setTimeout(() => {
          createEmoji()
        }, i * 100)
      }
    }
  
    // Função para iniciar a chuva de corações
    function startHeartRain() {
      const heartEmojis = ["🤍", "🤍", "🤍", "🤍", "🤍", "🤍"]
      const numberOfHearts = 70 // Quantidade de corações caindo
  
      for (let i = 0; i < numberOfHearts; i++) {
        setTimeout(() => {
          const heart = document.createElement("div")
          heart.className = "emoji"
          heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)]
          heart.style.left = Math.random() * 100 + "vw"
          heart.style.animationDuration = Math.random() * 3 + 2 + "s"
          heart.style.transform = `scale(${Math.random() * 0.5 + 0.8}) rotate(${Math.random() * 40 - 20}deg)` // Adiciona escala e rotação aleatórias
          emojiContainer.appendChild(heart)
  
          heart.addEventListener("animationend", () => {
            heart.remove()
          })
        }, i * 100) // Intervalo de 100ms entre cada coração
      }
    }
  
    // Music player functionality
    const playPauseBtn = document.createElement("div") // Botão de play/pause
  
    // Initialize audio
    audio.volume = 0.5
  
    // Adicionar botão de play/pause
    playPauseBtn.className = "play-pause-btn"
    playPauseBtn.innerHTML = `
          <div class="wave-animation">
              <span></span>
              <span></span>
              <span></span>
          </div>
      `
  
    // Adicionar o botão ao player (lado direito)
    if (musicPlayer) {
      musicPlayer.querySelector(".music-info").appendChild(playPauseBtn)
    }
  
    // Função para tocar/pausar a música
    function togglePlay() {
      if (isPlaying) {
        audio.pause()
        playPauseBtn.classList.remove("playing") // Remove a animação de onda
      } else {
        audio.play().catch((error) => {
          console.log("Playback prevented:", error)
        })
        playPauseBtn.classList.add("playing") // Ativa a animação de onda
      }
      isPlaying = !isPlaying
    }
  
    // Reiniciar a música quando acabar
    audio.addEventListener("ended", () => {
      audio.currentTime = 0 // Reinicia a música
      audio.play() // Toca novamente
    })
  
    // Atualizar barra de progresso
    audio.addEventListener("timeupdate", () => {
      const progress = (audio.currentTime / audio.duration) * 100
      document.querySelector(".progress").style.width = `${progress}%`
    })
  
    // Controle de play/pause pelo botão
    playPauseBtn.addEventListener("click", (e) => {
      e.stopPropagation() // Impede que o clique no botão afete o player
      togglePlay()
    })
  
    // Controle de play/pause pelo player
    if (musicPlayer) {
      musicPlayer.addEventListener("click", (e) => {
        // Ignorar cliques na barra de progresso
        if (e.target.classList.contains("progress-bar") || e.target.classList.contains("progress")) return
  
        togglePlay()
      })
    }
  })
  
  