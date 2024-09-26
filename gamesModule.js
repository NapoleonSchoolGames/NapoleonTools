function loadGames() {
  const gameSelectionDiv = document.getElementById('game-selection');
  fetch('./json/games.json')
    .then(response => response.json())
    .then(games => {
      games.forEach(game => {
        const img = document.createElement('img');
        img.className = 'game-button';
        img.src = `./games/images/${game.name}.jpg`;
        img.alt = `${game.name}`;
        img.addEventListener('click', () => {
          if (game.prompt) {
            prompt(game.promptMsg, game.promptBox);
          }
          if (game.externalUrl & game.replace) {
            window.location.replace(game.url);
          } else if (game.externalUrl) {
            loadGame(game.url);
          } else {
            game.flash ? loadGame(`./games/flash.html?swf=${swf}`) : loadGame(game.externalUrl ? game.url : `./games/gamefiles/${game.name}/index.html`);
          }
        });
        gameSelectionDiv.appendChild(img);
      });
    })
    .catch(error => alert('Error fetching games:', error));
}

function loadGame(url) {
  const popups = [
    {
      title: "AD",
      text: "You can have THIS ad space for as low as $5 a month! Email me for more info",
      icon: "success",
      confirmButtonText: "Example link button!",
      urlToOpen: "https://www.youtube.com/@dragonterror"
    }
  ];

  const popup = popups[Math.floor(Math.random() * popups.length)];
  Swal.fire({
    title: popup.title,
    text: `${popup.text} (This popup will close after 8 seconds)`,
    icon: popup.icon,
    showConfirmButton: true,
    confirmButtonText: popup.confirmButtonText,
    timer: 8000,
    timerProgressBar: true,
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = popup.urlToOpen;
    } else {
      const iframe = document.getElementById('iframe');
      const currentSrc = new URL(iframe.src, window.location).href;
      const targetSrc = new URL(url, window.location).href;
      if (currentSrc !== targetSrc) {
        iframe.src = url;
      }
    }
  });
}

function searchGames() {
  const input = document.getElementById('search-bar');
  const filter = input.value.toLowerCase().replace(/\s+/g, '');
  const gameButtons = document.getElementsByClassName("game-button");
  Array.from(gameButtons).forEach(button => {
    button.style.display = button.src.includes(filter) ? '' : 'none';
  });
}

function fullscreen() {
  const buttons = document.getElementById('game-selection');
  buttons.style.display = 'none';
  const iframe = document.getElementById('iframe');
  iframe.requestFullscreen();
}

function fullscreenchanged() {
  const buttons = document.getElementById('game-selection');
  buttons.style.display = document.fullscreenElement ? 'none' : 'block';
}