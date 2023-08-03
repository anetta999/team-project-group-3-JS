const suppurtImg = [
  {
    title: 'Save the Children',
    url:
      'https://www.savethechildren.net/what-we-do/emergencies/ukraine-crisis',
    img: './image/save-the-children.png',
  },
  {
    title: 'Project HOPE',
    url: 'https://www.projecthope.org/country/ukraine/',
    img: './image/project-hope.png',
  },
//   {
//     title: 'UNITED24',
//     url: 'https://u24.gov.ua/uk',
//     img: '../image/',
//   },
  {
    title: 'International Medical Corps',
    url: 'https://internationalmedicalcorps.org/country/ukraine/',
    img: './image/international-medical-corps.png',
  },
//   {
//     title: 'Medicins Sans Frontieres',
//     url: 'https://www.msf.org/ukraine',
//     img: '../image/',
//   },
  {
    title: 'RAZOM',
    url: 'https://www.razomforukraine.org/',
    img: './image/razom.png',
  },
  {
    title: 'Action against hunger',
    url: 'https://www.actionagainsthunger.org/location/europe/ukraine/',
    img: './image/action-against-hunger.png',
  },
//   {
//     title: 'World vision',
//     url: 'https://www.wvi.org/emergencies/ukraine',
//     img: '../image/',
//   },
  {
    title: 'Serhiy Prytula Charity Foundation',
    url: 'https://prytulafoundation.org/en',
    img: './image/sergiy-prytula.png',
  },
]

const support = document.querySelector('.support-list-js')

const creatImg = suppurtImg.map(({ url, title, img }, idx) => 
    `<li class="support-item">
    <span class="support-span">0${idx + 1}</span>
    <a href="${url}">
    <img src="${img}" alt="${title}"></a>
    </li>
    </li> `).join('')


support.insertAdjacentHTML('beforeend', creatImg);

