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
            // Берём текст прямо из div'ов на карточке
            const studentName = card.querySelector('.card-student-name')?.textContent?.toLowerCase() || '';
            const veteranName = card.querySelector('.card-veteran-name')?.textContent?.toLowerCase() || '';
            card.style.display = ( (!s || studentName.includes(s)) && (!v || veteranName.includes(v)) ) ? 'flex' : 'none';
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
            // Фото
            const photo = card.getAttribute('data-photo') || '';
            modalPhoto.src = photo;
            modalPhoto.style.display = photo ? 'block' : 'none';
            // Текстовые данные
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

// Заглушка для формы письма
const letterForm = document.getElementById('letter-form');
if (letterForm) {
    letterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Спасибо! Письма скоро будут отправляться. (Пока в разработке)');
        letterForm.reset();
    });
}