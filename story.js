const slides = document.querySelector('.slides');
const images = document.querySelectorAll('.slides img');

let index = 0;

let startX = 0;
let endX = 0;

function showNextSlide() {
    index = (index + 1) % images.length;
    slides.style.transform = `translateX(-${index * 100}%)`;
}

function showPrevSlide() {
    index = (index - 1 + images.length) % images.length;
    slides.style.transform = `translateX(-${index * 100}%)`;
}

// Função para detectar o movimento de toque
function handleTouchStart(event) {
    startX = event.touches[0].clientX;
}

function handleTouchEnd(event) {
    endX = event.changedTouches[0].clientX;

    if (startX - endX > 50) {
        showNextSlide(); // Deslizou para a esquerda
    } else if (endX - startX > 50) {
        showPrevSlide(); // Deslizou para a direita
    }
}

slides.addEventListener('touchstart', handleTouchStart);
slides.addEventListener('touchend', handleTouchEnd);

// Seleciona o elemento onde a contagem será exibida
const liveCountElement = document.getElementById('live-count');

// Define a data de início (10 de julho de 2024)
const startDate = new Date('2024-07-10');

// Função para atualizar a contagem
function updateLiveCount() {
    const now = new Date(); // Obtém a data e hora atuais
    const differenceInMilliseconds = now - startDate; // Calcula a diferença em milissegundos

    // Converte a diferença para dias, horas, minutos e segundos
    const days = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    const hours = Math.floor((differenceInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((differenceInMilliseconds % (1000 * 60)) / 1000);

    // Atualiza o texto do elemento com os valores
    liveCountElement.textContent = `Estamos juntos há ${days} dias, ${hours} horas, ${minutes} minutos e ${seconds} segundos.`;
}

// Atualiza a contagem a cada segundo
setInterval(updateLiveCount, 1000);

// Chama a função imediatamente para exibir a contagem ao carregar a página
updateLiveCount();
