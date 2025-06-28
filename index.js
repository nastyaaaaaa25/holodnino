

//создание заявки
    document.getElementById('otp').addEventListener('click', function () {
      const data = {
        date: new Date().toLocaleString(),
        fio: document.getElementById('fio').value.trim(),
        tel: document.getElementById('tel').value.trim(),
        kond: document.getElementById('kondiz').value.trim(),
        adr: document.getElementById('adr').value.trim(),
        sogl: document.getElementById('sogl').checked,
      };

      if (!data.fio || !data.tel || !data.kond || !data.adr) {
        alert('Пожалуйста, заполните все поля.');
        return;
      }
      if (!data.sogl) {
        alert('Пожалуйста, дайте согласие на обработку персональных данных.');
        return;
      }

      let applications = JSON.parse(localStorage.getItem('applications')) || [];
      applications.push(data);
      localStorage.setItem('applications', JSON.stringify(applications));

      alert('Заявка отправлена!');

      // Очистка формы
      document.getElementById('fio').value = '';
      document.getElementById('tel').value = '';
      document.getElementById('kondiz').value = '';
      document.getElementById('adr').value = '';
      document.getElementById('sogl').checked = false;
    });
 

