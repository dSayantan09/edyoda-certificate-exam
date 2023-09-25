    let teamsLocal = JSON.parse(JSON.stringify(Teams));
    localStorage.setItem('teams-list', JSON.stringify(teamsLocal));
    let playersLocal = JSON.parse(JSON.stringify(Players));
    localStorage.setItem('players-list', JSON.stringify(playersLocal));

    let RenderHome = () => {
    let DOM = document.querySelector('#main');
    let teamsDOM = DOM.querySelector('#cards');

    teamsDOM.innerHTML = '';

    let teams = JSON.parse(localStorage.getItem('teams-list'));
    let players = JSON.parse(localStorage.getItem('players-list'));

    let teamsDOMFragment = document.createDocumentFragment();

    teams.forEach(team => {
        let teamPlayers = players.filter(player => player.from === team.shortName);
        teamsDOMFragment.appendChild(createTeamCard({
            ...team,
            count: teamPlayers.length,
            topBatsman: [...teamPlayers].sort((a, b) => b.runs - a.runs)[0],
            topBowler: [...teamPlayers].sort((a, b) => b.wickets - a.wickets)[0],
        }));
    }
    );

    teamsDOM.appendChild(teamsDOMFragment);
}

let createTeamCard = (team) => {
    let teamDOM = document.createElement('div');
    teamDOM.classList.add('card');

    teamDOM.innerHTML = `
        <div class="namecard">${team.name}</div>
        <div class="logocard"> <img src="${team.logo}" alt="${team.name} logo" id="logocard_img"> </div>
        <div class="count">Player Count: ${team.count}</div>
        <div class="batsman">Top Batsman: ${team.topBatsman?.playerName || '-'}</div>
        <div class="bowler">Top Bowler: ${team.topBowler?.playerName || '-'}</div>
        <div class="champ">Championships Won: ${team.championships}</div>
        `;
    
    teamDOM.addEventListener('click', () => {
        document.location.href = `team.html?team=${team.shortName}`;
    });
        return teamDOM;
}

document.onload = RenderHome();

document.onload = function () {

document.querySelector('.searchbox_term').addEventListener('blur', (e) => {
    let teamShortName = e.target.value;
    let DOM = document.querySelector('#main');
    let teamsDOM = DOM.querySelector('#cards');

    let teams = JSON.parse(localStorage.getItem('teams-list'));
    let players = JSON.parse(localStorage.getItem('players-list'));

    let selectedTeamPlayers = players.filter(player => player.from === teamShortName.toUpperCase());
    
    let teamsDOMFragment = document.createDocumentFragment();
    teamShortName === '' ? RenderHome() : RenderPlayers(selectedTeamPlayers, teamsDOM);

});

let RenderPlayers = (players, playersDOM) => {
    let playersDOMFragment = document.createDocumentFragment();
    players.forEach((player) => {
      let playerDOMElement = document.createElement("div");
      playerDOMElement.classList.add("card");
      playerDOMElement.innerHTML = `
          <div class="namecard">
              <h1>${player.playerName}</h1>
          </div>
          <div class="details">
          <div class="logocard">
              <img src="${player.photo}" alt="${player.playerName}" id="logocard_img" />
          </div>
          <div>
          <div class="card__stats">
          <div class="player__team">
              <h2>${player.from}</h2>
          </div>
          <div class="player__price">
              <h3>Price: ${player.price}</h3>
          </div>
          <div class="player__description">
              <h3>${player.description}</h3>
          </div>
          <div class="player__playing">
              <h3>Playing Status: ${player.isPlaying ? 'Playing' : 'On-bench' }</h3>
          </div>
          </div>
          </div>
          `;
    
      playersDOMFragment.appendChild(playerDOMElement);
      playerDOMElement.addEventListener("click", () => {
        document.location.href = `player.html?player=${player.playerName}`;
      });
    });
    playersDOM.innerHTML = "";
    playersDOM.appendChild(playersDOMFragment);
    if (players.length === 0) {
      playersDOM.innerHTML = `<h1 class="no__players">No Players Found</h1>`;
    }
  };
}();

document.onload = function () {
    document.querySelector('#player-form').addEventListener('submit', (e) => {
        e.preventDefault();
        let playerName = e.target.elements[0].value;
        let playerPhoto = e.target.elements[1].value;
        let playerFrom = e.target.elements[2].value;
        let playerPrice = e.target.elements[3].value;
        let playerIsPlaying = e.target.elements[4].value;
        let playerDescription = e.target.elements[5].value;
        let playerRuns = e.target.elements[6].value;
        let playerWickets = e.target.elements[7].value;
        
        let players = JSON.parse(localStorage.getItem('players-list'));
        
        let newPlayer = {
            playerName,
            price: playerPrice,
            description: playerDescription,
            photo: playerPhoto,
            from: playerFrom,
            isPlaying: !!(playerIsPlaying === 'true'),
            runs: playerRuns,
            wickets: playerWickets,
            id: players.length + 1,
        };

        players.push(newPlayer);
        localStorage.setItem('players-list', JSON.stringify(players));
    });

    document.querySelector('#team-form').addEventListener('submit', (e) => {
            e.preventDefault();
            let teamName = e.target.elements[0].value;
            let teamLogo = e.target.elements[1].value;
            let teamShortName = e.target.elements[2].value;
            let teamChampionships = parseInt(e.target.elements[3].value);

            let teams = JSON.parse(localStorage.getItem('teams-list'));

            let newTeam = {
                id: teams.length + 1,
                name: teamName,
                shortName: teamShortName,
                logo: teamLogo,
                championships: teamChampionships,
            };

            teams.push(newTeam);

            localStorage.setItem('teams-list', JSON.stringify(teams));
    });
}();