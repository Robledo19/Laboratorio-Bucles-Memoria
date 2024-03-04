const startGameButton = document.getElementById('startGameButton') as HTMLDivElement;
const container = document.getElementById('container') as HTMLDivElement;

interface InfoCarta {
    idFoto: number;
    imagen: string;
  }
  
  const cards = [
    {
      idFoto: 1,
      imagen: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/1.png",
    },
    {
      idFoto: 2,
      imagen: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/2.png",
    },
    {
      idFoto: 3,
      imagen: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/3.png",
    },
    {
      idFoto: 4,
      imagen: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/4.png",
    },
    {
      idFoto: 5,
      imagen: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/5.png",
    },
    {
      idFoto: 6,
      imagen: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/6.png",
    }
  ]
  
  document.addEventListener('DOMContentLoaded', () => {
    startGameButton.addEventListener('click', prepareGame);
  });
  
  function prepareGame() {
    startGameButton.classList.add('hide');
    container.innerHTML = ''; 
    createAndDisplayCards();
  }
  
  function createAndDisplayCards() {
    const duplicatedCards = [...cards, ...cards];
    const shuffledCards = shuffleArray(duplicatedCards);
  
    shuffledCards.forEach((card: InfoCarta, index: number) => {
      const cardElement = createCardElement(card, index);
      container.appendChild(cardElement);
    });
  }
  
  function createCardElement(card: InfoCarta, index: number): HTMLDivElement {
    const cardElement = document.createElement('div');
    cardElement.setAttribute('class', 'container-img');
    cardElement.setAttribute('data-indice-id', index.toString());
    cardElement.setAttribute('data-id-foto', card.idFoto.toString());
  
    const imgElement = document.createElement('img');
    imgElement.setAttribute('data-indice-id', index.toString());
    cardElement.appendChild(imgElement);
  
    cardElement.addEventListener('click', () => handleCardClick(card, imgElement));
  
    return cardElement;
  }
  
  let firstCard: InfoCarta | null = null;
  let firstCardImgElement: HTMLImageElement | null = null;
  let lockBoard: boolean = false;
  
  function handleCardClick(card: InfoCarta, imgElement: HTMLImageElement): void {
    if (lockBoard || imgElement === firstCardImgElement) return;
    
    flipCard(card, imgElement);
  
    if (!firstCard) {
      firstCard = card;
      firstCardImgElement = imgElement;
    } else {
      checkForMatch(card, imgElement);
    }
  }
  
  function flipCard(card: InfoCarta, imgElement: HTMLImageElement): void {
    imgElement.src = card.imagen;
  }
  
  function checkForMatch(card: InfoCarta, imgElement: HTMLImageElement): void {
    if (firstCard && firstCard.idFoto === card.idFoto) {
      firstCard = null;
      firstCardImgElement = null;
    } else {
      lockBoard = true;
      setTimeout(() => {
        resetOrLockBoard(imgElement);
      }, 1000);
    }
  }
  
  function resetOrLockBoard(imgElement: HTMLImageElement): void {
    if (imgElement.src && firstCardImgElement) {
      imgElement.src = '';
      firstCardImgElement.src = '';
    }
    firstCard = null;
    firstCardImgElement = null;
    lockBoard = false;
  }
  

  function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      let randomNumber = Math.floor(Math.random() * (i + 1));
      [array[i], array[randomNumber]] = [array[randomNumber], array[i]];
    }
    return array;
  }
