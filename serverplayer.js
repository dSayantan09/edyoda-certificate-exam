let RenderPlayer = () => {
    let DOM = document.querySelector("#main");
    let playerDOM = DOM.querySelector("#player");
  
    let players = JSON.parse(localStorage.getItem("players-list"));
    let player = players.filter(
        (player) => player.playerName === decodeURI(location.search.split("=")[1])
        )[0];

    document.title = `IPLT20 | ${player.playerName}`;
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = player.photo;
  
    RenderPlayerDetails(
      player,
      playerDOM
    );
  
  };
  
  let RenderPlayerDetails = (player, teamDOM) => {
    let teamDOMFragment = document.createDocumentFragment();
    let teamDOMElement = document.createElement("div");
    teamDOMElement.classList.add("team");
    teamDOMElement.innerHTML = `
          <div class="team__name">
              <h1>${player.playerName.toUpperCase()}</h1>
          </div>
          <div class="detailsteam">
          <div class="logodetails">
              <img src="${player.photo}" alt="${
      player.playerName
    }" id="logodetails_img" />
          </div>
          <div class="statsdetail">
          <div class="team__count">
              <h2>${player.from}</h2>
          </div>
          <div class="team__count">
              <h3>Players: ${player.price}</h3>
          </div>
          <div class="team__count">
              <h3>Top Batsman: ${player.isPlaying}</h3>
          </div>
          <div class="team__count">
              <h3>Top Bowler: ${player.description}</h3>
          </div>
          </div>
          </div>
          `;
  
    teamDOMFragment.appendChild(teamDOMElement);
    teamDOM.appendChild(teamDOMFragment);
  };
  
  document.onload = RenderPlayer();
  