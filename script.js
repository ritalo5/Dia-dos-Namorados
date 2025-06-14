// Variáveis globais
let startDate = null;
let counterInterval = null;

// Função para adicionar fotos
function addPhoto() {
  const url = prompt("Cole aqui a URL da foto (use um link direto da internet):");
  if (url && url.trim()) {
    const gallery = document.getElementById("photoGallery");
    
    // Criar container da imagem
    const imgContainer = document.createElement("div");
    imgContainer.style.position = "relative";
    imgContainer.style.aspectRatio = "1";
    imgContainer.style.borderRadius = "20px";
    imgContainer.style.overflow = "hidden";
    imgContainer.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.15)";
    imgContainer.style.transition = "all 0.3s ease";
    
    // Criar imagem
    const img = document.createElement("img");
    img.src = url;
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";
    img.style.transition = "all 0.3s ease";
    
    // Adicionar efeito hover
    imgContainer.addEventListener("mouseenter", () => {
      imgContainer.style.transform = "scale(1.05) rotate(2deg)";
      imgContainer.style.boxShadow = "0 15px 35px rgba(0, 0, 0, 0.25)";
    });
    
    imgContainer.addEventListener("mouseleave", () => {
      imgContainer.style.transform = "scale(1) rotate(0deg)";
      imgContainer.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.15)";
    });
    
    // Botão de remover
    const removeBtn = document.createElement("button");
    removeBtn.innerHTML = "×";
    removeBtn.style.position = "absolute";
    removeBtn.style.top = "10px";
    removeBtn.style.right = "10px";
    removeBtn.style.background = "rgba(255, 0, 0, 0.8)";
    removeBtn.style.color = "white";
    removeBtn.style.border = "none";
    removeBtn.style.borderRadius = "50%";
    removeBtn.style.width = "30px";
    removeBtn.style.height = "30px";
    removeBtn.style.cursor = "pointer";
    removeBtn.style.fontSize = "18px";
    removeBtn.style.display = "none";
    removeBtn.style.zIndex = "10";
    
    removeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      imgContainer.remove();
    });
    
    // Mostrar botão de remover no hover
    imgContainer.addEventListener("mouseenter", () => {
      removeBtn.style.display = "block";
    });
    
    imgContainer.addEventListener("mouseleave", () => {
      removeBtn.style.display = "none";
    });
    
    imgContainer.appendChild(img);
    imgContainer.appendChild(removeBtn);
    
    // Inserir antes do primeiro placeholder
    const firstPlaceholder = gallery.querySelector(".photo-placeholder");
    if (firstPlaceholder) {
      gallery.insertBefore(imgContainer, firstPlaceholder);
    } else {
      gallery.appendChild(imgContainer);
    }
    
    // Animação de entrada
    imgContainer.style.opacity = "0";
    imgContainer.style.transform = "scale(0.5)";
    setTimeout(() => {
      imgContainer.style.opacity = "1";
      imgContainer.style.transform = "scale(1)";
    }, 100);
  }
}

// Função para adicionar datas
function addDate() {
  const input = document.getElementById("newDate");
  const text = input.value.trim();
  
  if (text) {
    const dateList = document.getElementById("dateList");
    
    // Verificar formato básico (DD/MM/AAAA - Evento)
    const parts = text.split(" - ");
    if (parts.length < 2) {
      alert("Por favor, use o formato: DD/MM/AAAA - Descrição do evento");
      return;
    }
    
    const dateStr = parts[0].trim();
    const eventStr = parts.slice(1).join(" - ").trim();
    
    // Criar novo item
    const li = document.createElement("li");
    li.className = "date-item";
    li.style.opacity = "0";
    li.style.transform = "translateX(-50px)";
    
    li.innerHTML = `
      <span class="date">${dateStr}</span>
      <span class="event">${eventStr}</span>
      <button onclick="removeDate(this)" style="background: #ff6b6b; color: white; border: none; border-radius: 50%; width: 25px; height: 25px; cursor: pointer; margin-left: 10px;">×</button>
    `;
    
    dateList.appendChild(li);
    
    // Animação de entrada
    setTimeout(() => {
      li.style.opacity = "1";
      li.style.transform = "translateX(0)";
    }, 100);
    
    input.value = "";
  }
}

// Função para remover data
function removeDate(button) {
  const li = button.parentElement;
  li.style.opacity = "0";
  li.style.transform = "translateX(-50px)";
  setTimeout(() => {
    li.remove();
  }, 300);
}

// Função para definir data de início do relacionamento
function setStartDate() {
  const dateInput = document.getElementById("startDate");
  const selectedDate = dateInput.value;
  
  if (selectedDate) {
    startDate = new Date(selectedDate);
    localStorage.setItem("relationshipStartDate", selectedDate);
    startCounter();
    
    // Feedback visual
    const button = event.target;
    const originalText = button.innerHTML;
    button.innerHTML = '<span class="btn-icon">✓</span>Data Definida!';
    button.style.background = "linear-gradient(135deg, #4CAF50, #45a049)";
    
    setTimeout(() => {
      button.innerHTML = originalText;
      button.style.background = "linear-gradient(135deg, #ff6b6b, #ff8e8e)";
    }, 2000);
  }
}

// Função para iniciar o contador
function startCounter() {
  if (counterInterval) {
    clearInterval(counterInterval);
  }
  
  if (!startDate) return;
  
  counterInterval = setInterval(updateCounter, 1000);
  updateCounter();
}

// Função para atualizar o contador
function updateCounter() {
  if (!startDate) return;
  
  const now = new Date();
  const diff = now - startDate;
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  document.getElementById("days").textContent = days.toString().padStart(3, "0");
  document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
  document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
}

// Função para criar corações flutuantes
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = (Math.random() * 4 + 6) + "s";
  heart.style.animationDelay = Math.random() * 2 + "s";
  
  // Cores variadas para os corações
  const colors = ["#ff6b6b", "#ff8e8e", "#ffa8a8", "#ff9999", "#ffb3b3"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  heart.style.background = randomColor;
  
  // Tamanhos variados
  const size = Math.random() * 15 + 10;
  heart.style.width = size + "px";
  heart.style.height = size + "px";
  
  const beforeAfter = `
    .heart::before, .heart::after {
      width: ${size}px;
      height: ${size}px;
      background: ${randomColor};
    }
    .heart::before {
      top: -${size/2}px;
    }
    .heart::after {
      left: -${size/2}px;
    }
  `;
  
  document.getElementById("hearts").appendChild(heart);
  
  setTimeout(() => {
    if (heart.parentNode) {
      heart.remove();
    }
  }, 10000);
}

// Função para criar estrelas cintilantes
function createSparkle() {
  const sparkle = document.createElement("div");
  sparkle.classList.add("sparkle");
  sparkle.style.left = Math.random() * 100 + "vw";
  sparkle.style.top = Math.random() * 100 + "vh";
  sparkle.style.animationDelay = Math.random() * 3 + "s";
  
  document.getElementById("sparkles").appendChild(sparkle);
  
  setTimeout(() => {
    if (sparkle.parentNode) {
      sparkle.remove();
    }
  }, 3000);
}

// Função para criar elementos flutuantes (emojis)
function createFloatingElement() {
  const elements = ["💕", "💖", "💗", "💘", "💝", "💞", "💟", "❤️", "🧡", "💛", "💚", "💙", "💜", "🤍", "🖤", "🤎"];
  const element = document.createElement("div");
  element.textContent = elements[Math.random() * elements.length | 0];
  element.style.position = "absolute";
  element.style.left = Math.random() * 100 + "vw";
  element.style.fontSize = (Math.random() * 20 + 15) + "px";
  element.style.animation = `floatUp ${Math.random() * 4 + 8}s infinite ease-in`;
  element.style.animationDelay = Math.random() * 3 + "s";
  element.style.pointerEvents = "none";
  element.style.zIndex = "-1";
  
  document.getElementById("floatingElements").appendChild(element);
  
  setTimeout(() => {
    if (element.parentNode) {
      element.remove();
    }
  }, 12000);
}

// Função para adicionar efeitos de hover aos botões
function addButtonEffects() {
  const buttons = document.querySelectorAll(".heart-btn");
  buttons.forEach(button => {
    button.addEventListener("mouseenter", () => {
      button.style.transform = "translateY(-3px) scale(1.05)";
    });
    
    button.addEventListener("mouseleave", () => {
      button.style.transform = "translateY(0) scale(1)";
    });
    
    button.addEventListener("click", () => {
      button.style.transform = "scale(0.95)";
      setTimeout(() => {
        button.style.transform = "translateY(-3px) scale(1.05)";
      }, 150);
    });
  });
}

// Função para animar elementos quando entram na viewport
function animateOnScroll() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  });
  
  const elements = document.querySelectorAll(".photo-section, .moments-section, .dates-section, .love-messages, .counter-section");
  elements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.8s ease-out";
    observer.observe(el);
  });
}

// Função para adicionar efeito de digitação ao título
function typewriterEffect() {
  const title = document.querySelector(".main-title");
  const text = title.textContent;
  title.textContent = "";
  
  let i = 0;
  const timer = setInterval(() => {
    title.textContent += text[i];
    i++;
    if (i >= text.length) {
      clearInterval(timer);
    }
  }, 100);
}

// Função para adicionar partículas de amor no clique
function addClickEffect(event) {
  const x = event.clientX;
  const y = event.clientY;
  
  for (let i = 0; i < 6; i++) {
    const particle = document.createElement("div");
    particle.textContent = "💖";
    particle.style.position = "fixed";
    particle.style.left = x + "px";
    particle.style.top = y + "px";
    particle.style.pointerEvents = "none";
    particle.style.zIndex = "1000";
    particle.style.fontSize = "20px";
    particle.style.animation = `particleExplosion 1s ease-out forwards`;
    particle.style.animationDelay = (i * 0.1) + "s";
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
      if (particle.parentNode) {
        particle.remove();
      }
    }, 1000);
  }
}

// Adicionar CSS para animação de partículas
const particleStyle = document.createElement("style");
particleStyle.textContent = `
  @keyframes particleExplosion {
    0% {
      transform: scale(0) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: scale(1) rotate(360deg) translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(particleStyle);

// Inicialização quando a página carrega
document.addEventListener("DOMContentLoaded", function() {
  // Carregar data salva
  const savedDate = localStorage.getItem("relationshipStartDate");
  if (savedDate) {
    startDate = new Date(savedDate);
    document.getElementById("startDate").value = savedDate;
    startCounter();
  }

  // Carregar fotos e datas salvas
  loadPageState();

  // Iniciar animações
  setInterval(createHeart, 800);
  setInterval(createSparkle, 1500);
  setInterval(createFloatingElement, 2000);

  // Adicionar efeitos
  addButtonEffects();
  animateOnScroll();

  // Efeito de digitação no título (com delay)
  setTimeout(typewriterEffect, 1000);

  // Adicionar efeito de clique em toda a página
  document.addEventListener("click", addClickEffect);

  // Adicionar listener para Enter nos inputs
  document.getElementById("newDate").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
      addDate();
    }
  });

  // Efeito de pulsação nos placeholders de foto
  const placeholders = document.querySelectorAll(".photo-placeholder");
  placeholders.forEach((placeholder, index) => {
    setTimeout(() => {
      placeholder.style.animation = "pulse 2s infinite";
    }, index * 200);
  });

  // Mensagem de boas-vindas
  setTimeout(() => {
    console.log("💖 Site do Dia dos Namorados carregado com amor! 💖");
  }, 2000);
});

// Função para salvar o estado da página
function savePageState() {
  const photos = [];
  const images = document.querySelectorAll(".photo-gallery img");
  images.forEach(img => {
    photos.push(img.src);
  });
  
  const dates = [];
  const dateItems = document.querySelectorAll(".date-item");
  dateItems.forEach(item => {
    const date = item.querySelector(".date").textContent;
    const event = item.querySelector(".event").textContent;
    dates.push({ date, event });
  });
  
  localStorage.setItem("valentinesPhotos", JSON.stringify(photos));
  localStorage.setItem("valentinesDates", JSON.stringify(dates));
}

// Função para carregar o estado da página
function loadPageState() {
  const savedPhotos = localStorage.getItem("valentinesPhotos");
  const savedDates = localStorage.getItem("valentinesDates");
  
  if (savedPhotos) {
    const photos = JSON.parse(savedPhotos);
    photos.forEach(photoUrl => {
      // Simular adição de foto sem prompt
      const gallery = document.getElementById("photoGallery");
      const imgContainer = document.createElement("div");
      imgContainer.style.position = "relative";
      imgContainer.style.aspectRatio = "1";
      imgContainer.style.borderRadius = "20px";
      imgContainer.style.overflow = "hidden";
      imgContainer.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.15)";
      
      const img = document.createElement("img");
      img.src = photoUrl;
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.objectFit = "cover";
      
      imgContainer.appendChild(img);
      
      const firstPlaceholder = gallery.querySelector(".photo-placeholder");
      if (firstPlaceholder) {
        gallery.insertBefore(imgContainer, firstPlaceholder);
      }
    });
  }
  
  if (savedDates) {
    const dates = JSON.parse(savedDates);
    const dateList = document.getElementById("dateList");
    
    dates.forEach(dateObj => {
      const li = document.createElement("li");
      li.className = "date-item";
      li.innerHTML = `
        <span class="date">${dateObj.date}</span>
        <span class="event">${dateObj.event}</span>
        <button onclick="removeDate(this)" style="background: #ff6b6b; color: white; border: none; border-radius: 50%; width: 25px; height: 25px; cursor: pointer; margin-left: 10px;">×</button>
      `;
      dateList.appendChild(li);
    });
  }
}

// Salvar estado antes de sair da página
window.addEventListener("beforeunload", savePageState);

// Corrija o carregamento inicial unificando tudo em um só DOMContentLoaded
document.addEventListener("DOMContentLoaded", function() {
  // Carregar data salva
  const savedDate = localStorage.getItem("relationshipStartDate");
  if (savedDate) {
    startDate = new Date(savedDate);
    document.getElementById("startDate").value = savedDate;
    startCounter();
  }

  // Carregar fotos e datas salvas
  loadPageState();

  // Iniciar animações
  setInterval(createHeart, 800);
  setInterval(createSparkle, 1500);
  setInterval(createFloatingElement, 2000);

  // Adicionar efeitos
  addButtonEffects();
  animateOnScroll();

  // Efeito de digitação no título (com delay)
  setTimeout(typewriterEffect, 1000);

  // Adicionar efeito de clique em toda a página
  document.addEventListener("click", addClickEffect);

  // Adicionar listener para Enter nos inputs
  document.getElementById("newDate").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
      addDate();
    }
  });

  // Efeito de pulsação nos placeholders de foto
  const placeholders = document.querySelectorAll(".photo-placeholder");
  placeholders.forEach((placeholder, index) => {
    setTimeout(() => {
      placeholder.style.animation = "pulse 2s infinite";
    }, index * 200);
  });

  // Mensagem de boas-vindas
  setTimeout(() => {
    console.log("💖 Site do Dia dos Namorados carregado com amor! 💖");
  }, 2000);
});

