const { createApp, ref, watch, onMounted, nextTick } = Vue;

createApp({
  setup() {
    const search = ref('');
    const sortOrder = ref('');
    const cardsContainer = ref(null);
    const cards = ref([]);


    function filterCards() {
      const q = search.value.trim().toLowerCase();
      cards.value.forEach(c => {
        c.el.style.display = c.zag.toLowerCase().includes(q) ? '' : 'none';
      });
    }

    function sortCards() {
      if (!['min', 'max'].includes(sortOrder.value)) return;

      const sorted = cards.value.slice().sort((a, b) => {
        const get = card => Math.min(...card.prices);
        return sortOrder.value === 'min' ? get(a) - get(b) : get(b) - get(a);
      });


      sorted.forEach(c => {
        cardsContainer.value.appendChild(c.el);
      });
    }


    function loadCards() {
      const savedCards = JSON.parse(localStorage.getItem('conditionerCards') || '[]');


      if (!savedCards.length) {
        cardsContainer.value.innerHTML = '<p style="text-align:center; width: 100%;">Карточек пока нет</p>';
        return;
      }

const existingCards = cardsContainer.value.querySelectorAll('.card');
cards.value = Array.from(existingCards).map(el => ({
  el,
  zag: el.querySelector('.zag2')?.textContent || '',
  prices: [parseFloat(el.querySelector('.cena')?.textContent.replace(/[^\d.]/g, '') || '0')]
}));

      savedCards.forEach(({ name, model, description, price, imageSrc }) => {
        const cardElem = document.createElement('div');
        cardElem.classList.add('card');
        cardElem.innerHTML = `
          <h3 class="zag2">${name}</h3>
          <label>${model}</label><br>
          <img style="width: 550px" src="${imageSrc}" alt="Фото кондиционера" />
          <p style="width:500px">${description || ''}</p>
          <h5 class="cena">${price}₽</h5>
        `;
        cardsContainer.value.appendChild(cardElem);

        cards.value.push({
          el: cardElem,
          zag: name,
          prices: [parseFloat(price.toString().replace(/[^\d.]/g, '')) || 0]
        });
      });
    }

    onMounted(async () => {
      cardsContainer.value = document.getElementById('cardsContainer');

      loadCards();

 
      await nextTick();
      sortCards();
      filterCards();

      const si = document.getElementById('search');
      const ss = document.getElementById('selectSort');

      watch(search, filterCards);
      watch(sortOrder, sortCards);

      si.addEventListener('input', e => search.value = e.target.value);
      ss.addEventListener('change', e => sortOrder.value = e.target.value);
    });

    return {};
  }
}).mount('#app');