import children from '../img/save-the-children.png';
import hope from '../img/project-hope.png';
import united from '../img/united24.png';
import razom from '../img/razom.png';
import hunger from '../img/action-against-hunger.png';
import vision from '../img/word-vision.png';
import prytula from '../img/sergiy-prytula.png';
import corps from '../img//international-medical-corps.png';
import frontieres from '../img/medecans-sans-frontieres.png';


const suppurtImg = [
  {
    title: 'Save the Children',
    url: 'https://www.savethechildren.net/what-we-do/emergencies/ukraine-crisis',
    img: children,
  },
  {
    title: 'Project HOPE',
    url: 'https://www.projecthope.org/country/ukraine/',
    img: hope,
  },
  {
    title: 'UNITED24',
    url: 'https://u24.gov.ua/uk',
    img: united,
  },
  {
    title: 'International Medical Corps',
    url: 'https://internationalmedicalcorps.org/country/ukraine/',
    img: corps,
  },
  {
    title: 'Medicins Sans Frontieres',
    url: 'https://www.msf.org/ukraine',
    img: frontieres,
  },
  {
    title: 'RAZOM',
    url: 'https://www.razomforukraine.org/',
    img: razom,
  },
  {
    title: 'Action against hunger',
    url: 'https://www.actionagainsthunger.org/location/europe/ukraine/',
    img: hunger,
  },
  {
    title: 'World vision',
    url: 'https://www.wvi.org/emergencies/ukraine',
    img: vision,
  },
  {
    title: 'Serhiy Prytula Charity Foundation',
    url: 'https://prytulafoundation.org/en',
    img: prytula,
  },
];

const support = document.querySelector('.support-list-js');

const creatImg = suppurtImg
  .map(({ url, title, img,}, idx) => {
    return `<li class="support-item">
    <span class="support-span">0${idx + 1}</span>
    <a href="${url}" class="support-link" target="_blank"> 
          <img class="support-image"
          src="${img}" alt="${title}" 
          height="32"  
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




