

    const buttons = document.querySelectorAll('.sidebar button');
    const contents = document.querySelectorAll('.content > div');

    buttons.forEach(button => {
      button.addEventListener('click', () => {

        buttons.forEach(btn => btn.classList.remove('active'));
        contents.forEach(content => content.classList.remove('active'));


        button.classList.add('active');
        const targetId = button.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
      });
    });

    const fileInput = document.getElementById('fileInput');
  const fileNameDisplay = document.getElementById('fileName');

  fileInput.addEventListener('change', () => {
    if(fileInput.files.length > 0){
      fileNameDisplay.textContent = 'Выбран файл: ' + fileInput.files[0].name;
    } else {
      fileNameDisplay.textContent = 'Файл не выбран';
    }
  });


//отображение заявки в админке на кондеи и услуги а так же их удаление 
   document.addEventListener('DOMContentLoaded', () => {
      const tbody1 = document.querySelector('#applications-table1 tbody');
      const tbodyMain = document.querySelector('#applications-table tbody');
      const cartTbody = document.querySelector('#delete tbody');

      let applications1 = JSON.parse(localStorage.getItem('applications1')) || [];
      let applications = JSON.parse(localStorage.getItem('applications')) || [];
      let cartApplications = JSON.parse(localStorage.getItem('cartApplications')) || [];

      function renderTable1() {
        tbody1.innerHTML = '';
        if (applications1.length === 0) {
          tbody1.innerHTML = `<tr><td colspan="6" style="text-align:center;">Заявок нет</td></tr>`;
          return;
        }
        for (let i = applications1.length - 1; i >= 0; i--) {
          const item = applications1[i];
          const tr = document.createElement('tr');
          tr.dataset.index = i;
          tr.innerHTML = `
            <td>${item.date}</td>
            <td>${item.fio}</td>
            <td>${item.tel}</td>
            <td>${item.uslugi}</td>
            <td>${item.adr}</td>
            <td id="none"><button class="delete-btn" data-index="${i}">❌</button></td>
          `;
          tbody1.appendChild(tr);
        }
      }

      function renderTables() {
        // Основная таблица
        tbodyMain.innerHTML = '';
        if (applications.length === 0) {
          tbodyMain.innerHTML = '<tr><td colspan="6" style="text-align:center;">Заявок нет</td></tr>';
        } else {
          for (let i = applications.length - 1; i >= 0; i--) {const item = applications[i];
            const tr = document.createElement('tr');
            tr.dataset.index = i;
            tr.innerHTML = `
              <td>${item.date}</td>
              <td>${item.fio}</td>
              <td>${item.tel}</td>
              <td>${item.kond}</td>
              <td>${item.adr}</td>
              <td><button class="to-cart-btn">❌</button></td>
            `;
            tbodyMain.appendChild(tr);
          }
        }

        // Корзина
        cartTbody.innerHTML = '';
        if (cartApplications.length === 0) {
          cartTbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">Корзина пуста</td></tr>';
        } else {
          for (let i = cartApplications.length - 1; i >= 0; i--) {
            const item = cartApplications[i];
            const tr = document.createElement('tr');
            tr.dataset.index = i;
            tr.innerHTML = `
              <td>${item.date}</td>
              <td>${item.fio}</td>
              <td>${item.tel}</td>
              <td>${item.kond || item.uslugi || ''}</td>
              <td>${item.adr}</td>
              <td><button class="remove-btn">❌</button></td>
            `;
            cartTbody.appendChild(tr);
          }
        }
      }

      function saveAndRender() {
        localStorage.setItem('applications1', JSON.stringify(applications1));
        localStorage.setItem('applications', JSON.stringify(applications));
        localStorage.setItem('cartApplications', JSON.stringify(cartApplications));
        renderTable1();
        renderTables();
      }

      function moveToCart(event) {
        const btn = event.target;

        if (btn.classList.contains('to-cart-btn') || btn.classList.contains('delete-btn')) {
          const row = btn.closest('tr');

          if (row.closest('#applications-table tbody')) {
            const index = +row.dataset.index;
            const movedItem = applications.splice(index, 1)[0];
            cartApplications.push(movedItem);
          } else if (row.closest('#applications-table1 tbody')) {
            const index = +row.dataset.index;
            const movedItem = applications1.splice(index, 1)[0];
            cartApplications.push(movedItem);
          }

          saveAndRender();
        } else if (btn.classList.contains('remove-btn')) {
          const row = btn.closest('tr');
          const index = +row.dataset.index;
          cartApplications.splice(index, 1);
          saveAndRender();
        }
      }

      saveAndRender();

      // Делегируем событие клика по кнопкам в таблицах
      document.querySelector('.content').addEventListener('click', moveToCart);
    });


