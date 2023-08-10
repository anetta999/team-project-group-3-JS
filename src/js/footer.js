import github_svg from '../img/sprite.svg';
import linkedin_svg from '../img/sprite.svg';
import team_1 from '../img/team1.jpg';
import team_2 from '../img/team2.jpg';
import team_3 from '../img/team3.jpg';
import team_4 from '../img/team4.jpg';
import team_5 from '../img/team5.jpg';
import team_6 from '../img/team6.jpg';
import team_7 from '../img/team7.jpg';
import team_8 from '../img/team8.jpg';



const selectors = {
    modalTeam: document.querySelector('.modal-team'),
    openTeamModalBtn: document.querySelector('[data-modal-open]'),
    closeTeamModalBtn: document.querySelector('[data-modal-close]'),
    teamModal: document.querySelector('[data-modal]'),
    teamList: document.querySelector('.team-list'),
    body: document.querySelector('body'),
    backdrop: document.querySelector('.backdrop-team'),
  };

  const teamArray = [
    {
        name: 'Anna <br> Zubchenko',
        position: 'Team Leader',
        photo: team_1,
        github: 'https://github.com/anetta999',
        linkedin: 'https://www.linkedin.com/in/anna-zubchenko-b69560286/',
    },
    {
        name: 'Yana <br> Halaiko',
        position: 'Scrum Master',
        photo: team_2,
        github: 'https://github.com/YanaGalayko',
        linkedin: 'https://www.linkedin.com/',
    },
    
    {
        name: 'Volodymyr <br> Fetisov',
        position: 'Developer',
        photo: team_3,
        github: 'https://github.com/Fetivol',
        linkedin: 'https://www.linkedin.com/',
    },
    {
        name: 'Аnna <br> Kutsenko',
        position: 'Developer',
        photo: team_4,
        github: 'https://github.com/AnnaKutsenko',
        linkedin: 'https://www.linkedin.com/',
    },
    {
        name: 'Stanislav <br> Boychuk',
        position: 'Developer',
        photo: team_5,
        github: 'https://github.com/Fasten-belts',
        linkedin: ' https://www.linkedin.com/mwlite/in/stanislav-boychuk-577118285/',
    },
    {
        name: 'Serhii <br> Kozhanov',
        position: 'Developer',
        photo: team_6,
        github: 'https://github.com/LIGHT131313',
        linkedin: 'https://www.linkedin.com/in/serhii-kozhanov-164b57157/',
    },
    {
        name: 'Yulia <br> Mikulina',
        position: 'Developer',
        photo: team_7,
        github: 'https://github.com/Yulia503',
        linkedin: 'https://www.linkedin.com/',
    },
    {
        name: 'Roman <br> Chumak',
        position: 'Developer',
        photo: team_8,
        github: 'https://github.com/RomaChumak',
        linkedin: 'https://www.linkedin.com/',
    },
  ] 
  
function createGellaryTeam(array) {
    const markupTeam = array
    .map(item => `
  <li class="team-list-item list">
      <img src="${item.photo}" alt="${item.position}" width="50" class="team-photo">
      <h2 class="team-name">${item.name}</h2>
      <p class="team-position">${item.position}</p>
    <ul class="team-links">
      <li class="links-info list">
      <a href="${item.github}" class="icon-link" target="_blank">
          <svg class="icon-svg" width="25" height="25">
          <use class="icon-svg-team" href="${github_svg}#icon-github"></use>
           </svg>
        </a></li>
      <li class="links-info list">
      <a href="${item.linkedin}" class="icon-link" target="_blank">
          <svg class="icon-svg" width="25" height="25">
          <use class="icon-svg-team" href="${linkedin_svg}#icon-linkedin"></use>
          </svg>
        </a></li>
     </ul> 
      </li>`
    )
    .join('');
    selectors.teamList.insertAdjacentHTML('beforeend', markupTeam)
};

selectors.openTeamModalBtn.addEventListener('click', openTeamModal);
selectors.closeTeamModalBtn.addEventListener('click', closeTeamModal);

function openTeamModal() {
    selectors.body.classList.add('modal-open');
    selectors.teamModal.classList.remove('is-hidden');
    selectors.body.classList.add('no-scroll');
}

function closeTeamModal() {
    selectors.body.classList.remove('modal-open');
    selectors.teamModal.classList.add('is-hidden');
    selectors.body.classList.remove('no-scroll');
}

selectors.openTeamModalBtn.addEventListener('click', onTeamBtnClick);
selectors.body.addEventListener('keydown', onEscapeClick);
selectors.backdrop.addEventListener('click', onBackdropClick);

function onTeamBtnClick(event) {
    selectors.teamModal.classList.remove('is-hidden');
    selectors.teamList.innerHTML = '';
    createGellaryTeam(teamArray);
  }
  
  function onEscapeClick(event) {
    if (event.code === 'Escape') {
      closeTeamModal();
    }
  }
  
  function onBackdropClick(event) {
    if (event.target === event.currentTarget) {
      closeTeamModal();
    }
  }
