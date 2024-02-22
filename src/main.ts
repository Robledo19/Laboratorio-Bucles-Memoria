const startGameButton = document.getElementById('container') as HTMLDivElement;

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
    startGameButton.addEventListener('click', initializeGame);
  });
  
  function initializeGame() {
    const container = document.getElementById('container') as HTMLDivElement;
    startGameButton.classList.add('hide')
    container.innerHTML = ''; 
    let firstCard: InfoCarta | null = null;
    let firstCardImgElement: HTMLImageElement | null = null;
    let lockBoard = false;
  
    const duplicatedCards = [...cards, ...cards];
    const shuffledCards = shuffleArray(duplicatedCards);
  
    shuffledCards.forEach((card, index) => {
      const cardElement = document.createElement('div');
      cardElement.setAttribute('class', 'container-img');
      cardElement.setAttribute('data-indice-id', index.toString());
      cardElement.setAttribute('data-id-foto', card.idFoto.toString());
  
      const imgElement = document.createElement('img');
      imgElement.setAttribute('data-indice-id', index.toString());
      cardElement.appendChild(imgElement);
  
      cardElement.addEventListener('click', () => {
        if (lockBoard || imgElement === firstCardImgElement) return;
        imgElement.src = card.imagen;
  
        if (!firstCard) {
          firstCard = card;
          firstCardImgElement = imgElement;
        } else {
          if (firstCard.idFoto === card.idFoto) {
            firstCard = null;
            firstCardImgElement = null;
          } else {
            lockBoard = true;
            setTimeout(() => {
              if (imgElement.src && firstCardImgElement) {
                imgElement.src = '';
                firstCardImgElement.src = '';
              }
              firstCard = null;
              firstCardImgElement = null;
              lockBoard = false;
            }, 1000);
          }
        }
      });
  
      container.appendChild(cardElement);
    });
  }
  
  function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      let randomNumber = Math.floor(Math.random() * (i + 1));
      [array[i], array[randomNumber]] = [array[randomNumber], array[i]];
    }
    return array;
  }
  