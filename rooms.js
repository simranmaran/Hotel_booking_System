 <script src="https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.js"></script>

 
    // Initialize Hero Swiper
    new Swiper('.hero-swiper', {
      loop: true,
      autoplay: {
        delay: 4000,
      },
      effect: 'fade',
    });

    // Initialize all Room Swipers
    document.querySelectorAll('.room-swiper').forEach(swiperEl => {
      new Swiper(swiperEl, {
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      });
    });

    // Initialize Modal Swipers
    document.querySelectorAll('.modal-swiper').forEach(swiperEl => {
      new Swiper(swiperEl, {
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    });

    // Tab Switching
    const tabButtons = document.querySelectorAll('.tab-btn');
    const roomContainers = document.querySelectorAll('.room-container');

    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons and containers
        tabButtons.forEach(b => b.classList.remove('active'));
        roomContainers.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Show corresponding container
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
      });
    });

    // Modal functionality
    const viewDetailsButtons = document.querySelectorAll('.view-details');
    const modals = document.querySelectorAll('.modal');
    const closeModalBtns = document.querySelectorAll('.close-modal');

    // Open modal when clicking "Details" button
    viewDetailsButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const roomCard = btn.closest('.room-card');
        const roomType = roomCard.getAttribute('data-room');
        const modal = document.getElementById(`${roomType}-modal`);
        if (modal) {
          modal.style.display = 'flex';
        }
      });
    });

    // Close modal when clicking X button
    closeModalBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const modal = btn.closest('.modal');
        modal.style.display = 'none';
      });
    });

    // Close modal when clicking outside content
    window.addEventListener('click', e => {
      modals.forEach(modal => {
        if (e.target === modal) {
          modal.style.display = 'none';
        }
      });
    });

    // Book button in modal redirects to booking page
    document.querySelectorAll('.book-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        window.location.href = 'booking.html';
      });
    });
  