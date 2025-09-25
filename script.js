// -------- Corações lilás --------
function createHearts() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.style.left = Math.random() * window.innerWidth + 'px';
  heart.style.bottom = '0px';
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 5000);
}
setInterval(createHearts, 1000);

// -------- Flores lilás --------
function createFlower(){
  const flower = document.createElement('div');
  flower.className = 'flower';

  const size = Math.round(Math.random() * 80 + 40); 
  flower.style.width = size + 'px';
  flower.style.height = size + 'px';

  flower.style.left = Math.random() * (window.innerWidth - size) + 'px';
  flower.style.top  = Math.random() * (window.innerHeight - size) + 'px';

  const petals = 6;
  const petalW = size * 0.45;
  const petalH = size * 0.75;
  for(let i=0;i<petals;i++){
    const pet = document.createElement('div');
    pet.className = 'petala';
    pet.style.width = petalW + 'px';
    pet.style.height = petalH + 'px';
    pet.style.transform = `translate(-50%,-100%) rotate(${i * (360/petals)}deg)`;
    flower.appendChild(pet);
  }

  const center = document.createElement('div');
  center.className = 'centro';
  const centerSize = size * 0.22;
  center.style.width = centerSize + 'px';
  center.style.height = centerSize + 'px';
  flower.appendChild(center);

  document.body.appendChild(flower);

  setTimeout(() => {
    flower.style.transition = 'opacity 0.6s, transform 0.6s';
    flower.style.opacity = '0';
    flower.style.transform = 'scale(0.8)';
    setTimeout(() => flower.remove(), 600);
  }, 6000);
}
setInterval(createFlower, 1500);

// -------- Confetes extras no modal --------
function createModalConfetti() {
  for(let i = 0; i < 30; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = Math.random() * 400 + 'px';
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 80%)`;
    confetti.style.width = confetti.style.height = Math.random() * 8 + 4 + 'px';
    confetti.style.top = '0px';
    confetti.style.animationDuration = 2 + Math.random() * 2 + 's';
    document.getElementById('modalContent').appendChild(confetti);
    setTimeout(() => confetti.remove(), 3000);
  }
}

// -------- Modal --------
const modal = document.getElementById('modal');
const openModal = document.getElementById('openModal');
const closeModal = document.getElementById('closeModal');
const typedText = document.getElementById('typedText');
const modalContent = document.getElementById('modalContent');

const message = "queria que vc soubesse o quanto você significa para mim. você alegra minha vida de maneiras que eu nem consigo explicar. cada brincadeirinha, cada beijo, cada abraço, cada sorriso, faz meu coração bater tão forte que parece que ele pode explodir a qualquer momento. sou imensamente grato por ter te conhecido e por tudo o que vivemos, apesar das nossas discussões e o tempo ruim que tivemos. sei que não fui o melhor parceiro que você poderia ter mas quero que saiba que eu me esforço todos os dias para poder voltar a ser o seu amor, mesmo errando e sendo falho. espero muito pelo dia que poderei dizer que vc é minha e só minha. eu te amo muito mesmo... com muito amor, do seu ratinho a milanesa";

let typingInterval;
function typeText(text, element, speed = 60) {
  let index = 0;
  element.innerHTML = '';
  clearInterval(typingInterval);
  typingInterval = setInterval(() => {
    element.innerHTML += text[index];
    index++;
    if (index >= text.length) clearInterval(typingInterval);
  }, speed);
}

function closeModalAction() {
  modal.classList.remove('show');
  clearInterval(typingInterval);
  typedText.innerHTML = '';
}

const trackAuto = document.querySelector('.carousel-track-auto');
let slidesAuto = Array.from(trackAuto.children);

// Duplica as fotos para criar loop infinito
slidesAuto.forEach(slide => {
  const clone = slide.cloneNode(true);
  trackAuto.appendChild(clone);
});

// Configurações
let speed = 1; // pixels por frame, ajuste para mais rápido ou mais lento
let position = 0;

// Função para animar
function animateCarousel() {
  position -= speed;
  if (Math.abs(position) >= trackAuto.scrollWidth / 2) {
    position = 0; // reinicia quando metade das fotos duplicadas passar
  }
  trackAuto.style.transform = `translateX(${position}px)`;
  requestAnimationFrame(animateCarousel);
}

// Inicia a animação
animateCarousel();

// -------- Eventos do modal --------
openModal.addEventListener('click', () => {
  modal.classList.add('show');
  modalContent.style.animation = 'modalShow 0.5s ease forwards';
  createModalConfetti();
  typeText(message, typedText);
});

closeModal.addEventListener('click', closeModalAction);
window.addEventListener('click', (e) => {
  if(e.target === modal) closeModalAction();
});