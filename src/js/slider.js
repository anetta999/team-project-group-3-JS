import children from '../img/save-the-children.png';
import hope from '../img/project-hope.png';
import united from '../img/united24.png';
import razom from '../img/razom.png';
import hunger from '../img/action-against-hunger.png';
import vision from '../img/word-vision.png';
import prytula from '../img/sergiy-prytula.png';
import corps from '../img/medecans-sans-frontieres.png';
import frontieres from '../img/medecans-sans-frontieres.png';
import children2x from '../img/save-the-children-2x.png';
import hope2x from '../img/project-hope-2x.png';
import united2x from '../img/united24-2x.png';
import razom2x from '../img/razom-2x.png';
import hunger2x from '../img/action-against-hunger-2x.png';
import vision2x from '../img/word-vision-2x.png';
import prytula2x from '../img/sergiy-prytula-2x.png';
import corps2x from '../img/international-medical-corps-2x.png';
import frontieres2x from '../img/medecsns-sans-frontieres-2x.png';

const suppurtImg = [
  {
    title: 'Save the Children',
    url: 'https://www.savethechildren.net/what-we-do/emergencies/ukraine-crisis',
    img: children,
    img2x: children2x,
  },
  {
    title: 'Project HOPE',
    url: 'https://www.projecthope.org/country/ukraine/',
    img: hope,
    img2x: hope2x,
  },
  {
    title: 'UNITED24',
    url: 'https://u24.gov.ua/uk',
    img: united,
    img2x: united2x,
  },
  {
    title: 'International Medical Corps',
    url: 'https://internationalmedicalcorps.org/country/ukraine/',
    img: corps,
    img2x: corps2x,
  },
  {
    title: 'Medicins Sans Frontieres',
    url: 'https://www.msf.org/ukraine',
    img: frontieres,
    img2x: frontieres2x,
  },
  {
    title: 'RAZOM',
    url: 'https://www.razomforukraine.org/',
    img: razom,
    img2x: razom2x,
  },
  {
    title: 'Action against hunger',
    url: 'https://www.actionagainsthunger.org/location/europe/ukraine/',
    img: hunger,
    img2x: hunger2x,
  },
  {
    title: 'World vision',
    url: 'https://www.wvi.org/emergencies/ukraine',
    img: vision,
    img2x: vision2x,
  },
  {
    title: 'Serhiy Prytula Charity Foundation',
    url: 'https://prytulafoundation.org/en',
    img: prytula,
    img2x: prytula2x,
  },
];

const support = document.querySelector('.support-list-js');

const creatImg = suppurtImg
  .map(({ url, title, img, img2x }, idx) => {
    return `<li class="support-item">
    <span class="support-span">0${idx + 1}</span>
    <a href="${url}" class="support-link"> <picture>
          <img class="support-image"
          src="${img}" alt="${title}" 
          height="32" 
          srcset="
          ${img} 1x
          ${img2x} 2x"/>
        </picture>
    </a>
    </li> `;
  })
  .join('');

console.log(creatImg);
support.insertAdjacentHTML('afterbegin', creatImg);

const btnBottom = document.querySelector('.support-btn-js');
const btnTop = document.querySelector('.support-btn-top-js');

function goBottom() {
  support.scrollTo(0, 300);
  btnBottom.style.display = 'none';
  btnTop.style.display = 'flex';
}

btnBottom.addEventListener('click', goBottom);

function goTop() {
  support.scroll(0, 1);
  btnTop.style.display = 'none';
  btnBottom.style.display = 'flex';
}
btnTop.addEventListener('click', goTop);
