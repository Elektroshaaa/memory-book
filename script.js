// Мобильное меню
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');

if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
            sidebar.classList.remove('open');
        }
    });
}

// Поиск и карточки (только на главной)
const studentInput = document.getElementById('student-search');
const veteranInput = document.getElementById('veteran-search');
const searchBtn = document.getElementById('search-btn');
if (searchBtn) {
    const cards = document.querySelectorAll('.card');
    function filterCards() {
        const s = studentInput.value.toLowerCase().trim();
        const v = veteranInput.value.toLowerCase().trim();
        cards.forEach(card => {
            const student = card.querySelector('.card-student-name')?.textContent?.toLowerCase() || '';
            const veteran = card.querySelector('.card-veteran-name')?.textContent?.toLowerCase() || '';
            card.style.display = ( (!s || student.includes(s)) && (!v || veteran.includes(v)) ) ? 'flex' : 'none';
        });
    }
    searchBtn.addEventListener('click', filterCards);
    studentInput.addEventListener('keypress', e => { if (e.key==='Enter') filterCards(); });
    veteranInput.addEventListener('keypress', e => { if (e.key==='Enter') filterCards(); });

    // Модальное окно
    const modal = document.getElementById('modal');
    const modalPhoto = document.getElementById('modal-photo');
    const modalStudent = document.getElementById('modal-student');
    const modalVeteran = document.getElementById('modal-veteran');
    const modalYears = document.getElementById('modal-years');
    const modalStory = document.getElementById('modal-story');
    const modalClose = document.querySelector('.modal-close');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const photo = card.getAttribute('data-photo') || '';
            modalPhoto.src = photo;
            modalPhoto.style.display = photo ? 'block' : 'none';
            modalStudent.textContent = card.querySelector('.card-student-name')?.textContent || '';
            modalVeteran.textContent = card.querySelector('.card-veteran-name')?.textContent || '';
            modalYears.textContent = card.querySelector('.card-years')?.textContent || '';
            modalStory.textContent = card.getAttribute('data-story') || '';
            modal.classList.add('active');
        });
    });
    modalClose.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', e => { if (e.target===modal) modal.classList.remove('active'); });
}

// Анимация появления карточек при прокрутке
if (document.getElementById('cards-grid')) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card').forEach(card => {
        observer.observe(card);
    });
}

// Отправка письма через Formspree (без сохранения на сайте)
const letterForm = document.getElementById('letter-form');
if (letterForm) {
    letterForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('letter-name');
        const classInput = document.getElementById('letter-class');
        const textInput = document.getElementById('letter-text');

        const name = nameInput.value.trim();
        const className = classInput.value.trim();
        const text = textInput.value.trim();

        if (!name || !className || !text) return;

        const formData = new FormData();
        formData.append('name', name);
        formData.append('class', className);
        formData.append('message', text);

        try {
            const response = await fetch('https://formspree.io/f/mnjwgpwp', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                alert('Спасибо! Ваше письмо отправлено и после проверки появится на сайте.');
                nameInput.value = '';
                classInput.value = '';
                textInput.value = '';
            } else {
                alert('Ошибка при отправке. Попробуйте ещё раз.');
            }
        } catch (error) {
            alert('Не удалось отправить письмо. Проверьте интернет.');
        }
    });
}
