
        // Hotel data with real images
        const hotelsData = [
            {
                name: "Luxury Beach Resort",
                price: 8999,
                image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=250&fit=crop",
                rating: 4.8,
                reviews: 245,
                features: ["Beach Access", "Spa", "Pool", "WiFi"],
                description: "Beautiful oceanfront resort with stunning views and world-class amenities."
            },
            {
                name: "Mountain View Lodge",
                price: 5999,
                image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&h=250&fit=crop",
                rating: 4.6,
                reviews: 189,
                features: ["Mountain View", "Hiking", "Restaurant", "WiFi"],
                description: "Cozy mountain lodge perfect for nature lovers and adventure seekers."
            },
            {
                name: "Grand City Hotel",
                price: 7999,
                image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=250&fit=crop",
                rating: 4.7,
                reviews: 312,
                features: ["City Center", "Business Center", "Gym", "WiFi"],
                description: "Modern city hotel in the heart of downtown with premium facilities."
            },
            {
                name: "Tropical Paradise Resort",
                price: 12999,
                image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=250&fit=crop",
                rating: 4.9,
                reviews: 456,
                features: ["Private Beach", "Water Sports", "Spa", "All Inclusive"],
                description: "Exclusive tropical resort with private beach and luxury amenities."
            },
            {
                name: "Historic Heritage Hotel",
                price: 6999,
                image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
                rating: 4.5,
                reviews: 167,
                features: ["Historic Building", "Restaurant", "Garden", "WiFi"],
                description: "Charming heritage hotel with rich history and elegant architecture."
            },
            {
                name: "Modern Business Hotel",
                price: 4999,
                image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=250&fit=crop",
                rating: 4.4,
                reviews: 203,
                features: ["Business Center", "Conference Rooms", "Gym", "WiFi"],
                description: "Contemporary business hotel with state-of-the-art facilities."
            },
            {
                name: "Countryside Retreat",
                price: 3999,
                image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=250&fit=crop",
                rating: 4.6,
                reviews: 134,
                features: ["Nature Views", "Peaceful", "Restaurant", "WiFi"],
                description: "Peaceful countryside retreat away from the hustle and bustle."
            },
            {
                name: "Luxury Spa Resort",
                price: 15999,
                image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=400&h=250&fit=crop",
                rating: 4.9,
                reviews: 389,
                features: ["Full Spa", "Wellness Center", "Pool", "Gourmet Dining"],
                description: "Ultimate luxury spa resort for relaxation and rejuvenation."
            },
            {
                name: "Boutique Design Hotel",
                price: 8499,
                image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=250&fit=crop",
                rating: 4.7,
                reviews: 278,
                features: ["Unique Design", "Art Gallery", "Rooftop Bar", "WiFi"],
                description: "Stylish boutique hotel with unique design and artistic flair."
            },
            {
                name: "Family Fun Resort",
                price: 9999,
                image: "https://images.unsplash.com/photo-1559508551-44bff1de756b?w=400&h=250&fit=crop",
                rating: 4.5,
                reviews: 445,
                features: ["Kids Club", "Water Park", "Family Rooms", "Entertainment"],
                description: "Perfect family resort with activities for all ages."
            }
        ];

        // Simple in-memory database simulation
        let users = [
            { id: 1, name: "Demo User", email: "demo@hotel.com", phone: "1234567890", password: "123456" }
        ];
        let bookings = [];
        let currentUser = null;
        let selectedHotelData = null;
        let swiper = null;

        // Initialize the app
        document.addEventListener('DOMContentLoaded', function() {
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('checkinDate').min = today;
            document.getElementById('checkoutDate').min = today;
            
            // Add event listeners for date calculation
            document.getElementById('checkinDate').addEventListener('change', calculateTotal);
            document.getElementById('checkoutDate').addEventListener('change', calculateTotal);
            document.getElementById('rooms').addEventListener('change', calculateTotal);
            
            // Initialize scroll animations
            initScrollAnimations();
        });

        // Scroll animations
        function initScrollAnimations() {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                    }
                });
            }, observerOptions);

            // Observe elements for animation
            document.querySelectorAll('.fade-in-up, .hotel-card, .section-title, .stat-card').forEach(el => {
                observer.observe(el);
            });
        }

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Load hotels
        function loadHotels() {
            const hotelsGrid = document.getElementById('hotelsGrid');
            hotelsGrid.innerHTML = hotelsData.map((hotel, index) => `
                <div class="hotel-card fade-in-up" style="animation-delay: ${index * 0.1}s">
                    <div class="hotel-image" style="background-image: url('${hotel.image}')"></div>
                    <div class="hotel-info">
                        <h3>${hotel.name}</h3>
                        <div class="hotel-rating">
                            <div class="stars">${'★'.repeat(Math.floor(hotel.rating))}${'☆'.repeat(5-Math.floor(hotel.rating))}</div>
                            <div class="rating-text">${hotel.rating} (${hotel.reviews} reviews)</div>
                        </div>
                        <p>${hotel.description}</p>
                        <div class="hotel-features">
                            ${hotel.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
                        </div>
                        <div class="price">₹${hotel.price.toLocaleString()}/night</div>
                        <button class="btn" onclick="selectHotel('${hotel.name}', ${hotel.price})">Book Now</button>
                    </div>
                </div>
            `).join('');
            
            // Re-initialize scroll animations for new elements
            setTimeout(() => {
                initScrollAnimations();
            }, 100);
        }

        // Initialize Swiper
        function initSwiper() {
            if (swiper) {
                swiper.destroy(true, true);
            }
            
            swiper = new Swiper('.about-swiper', {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: true,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                effect: 'fade',
                fadeEffect: {
                    crossFade: true
                }
            });
        }

        // Page navigation
        function showPage(pageName) {
            const pages = document.querySelectorAll('.page');
            pages.forEach(page => page.classList.remove('active'));
            
            if (pageName === 'login') {
                document.getElementById('loginPage').classList.add('active');
            } else if (pageName === 'signup') {
                document.getElementById('signupPage').classList.add('active');
            } else {
                document.getElementById(pageName + 'Page').classList.add('active');
                
                if (pageName === 'home') {
                    setTimeout(() => {
                        loadHotels();
                    }, 100);
                } else if (pageName === 'about') {
                    setTimeout(() => {
                        initSwiper();
                        initScrollAnimations();
                    }, 100);
                } else if (pageName === 'myBookings') {
                    loadMyBookings();
                }
            }
        }

        // Login functionality
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                currentUser = user;
                document.getElementById('currentUserName').textContent = user.name;
                document.getElementById('navbar').style.display = 'block';
                showPage('home');
                alert('Login successful! Welcome ' + user.name + '! 🎉');
            } else {
                alert('Invalid email or password! Try: demo@hotel.com / 123456');
            }
        });

        // Signup functionality
        document.getElementById('signupForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const phone = document.getElementById('signupPhone').value;
            const password = document.getElementById('signupPassword').value;
            
            if (users.find(u => u.email === email)) {
                alert('Email already exists!');
                return;
            }
            
            const newUser = {
                id: users.length + 1,
                name: name,
                email: email,
                phone: phone,
                password: password
            };
            
            users.push(newUser);
            alert('Account created successfully! Please login now. 🎉');
            showPage('login');
        });

        // Hotel selection
        function selectHotel(hotelName, price) {
            selectedHotelData = { name: hotelName, price: price };
            document.getElementById('selectedHotel').value = hotelName;
            showPage('booking');
            calculateTotal();
        }

        // Calculate total amount
        function calculateTotal() {
            if (!selectedHotelData) return;
            
            const checkin = new Date(document.getElementById('checkinDate').value);
            const checkout = new Date(document.getElementById('checkoutDate').value);
            const rooms = parseInt(document.getElementById('rooms').value) || 1;
            
            if (checkin && checkout && checkout > checkin) {
                const nights = Math.ceil((checkout - checkin) / (1000 * 60 * 60 * 24));
                const total = selectedHotelData.price * nights * rooms;
                document.getElementById('totalAmount').textContent = total.toLocaleString();
            }
        }

        // Booking form submission
        document.getElementById('hotelBookingForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const booking = {
                id: bookings.length + 1,
                userId: currentUser.id,
                hotel: selectedHotelData.name,
                checkin: document.getElementById('checkinDate').value,
                checkout: document.getElementById('checkoutDate').value,
                guests: document.getElementById('guests').value,
                rooms: document.getElementById('rooms').value,
                specialRequests: document.getElementById('specialRequests').value,
                totalAmount: document.getElementById('totalAmount').textContent,
                bookingDate: new Date().toLocaleDateString(),
                status: 'Confirmed'
            };
            
            bookings.push(booking);
            alert('Booking confirmed successfully! 🎉');
            showPage('myBookings');
        });

        // Load user bookings
        function loadMyBookings() {
            const userBookings = bookings.filter(b => b.userId === currentUser.id);
            const bookingsList = document.getElementById('bookingsList');
            
            if (userBookings.length === 0) {
                bookingsList.innerHTML = '<div class="no-bookings">No bookings found. <a href="#" onclick="showPage(\'home\')" style="color: #667eea;">Book your first hotel!</a></div>';
                return;
            }
            
            bookingsList.innerHTML = userBookings.map(booking => `
                <div class="booking-item">
                    <div class="booking-details">
                        <h4>🏨 ${booking.hotel}</h4>
                        <p><strong>Check-in:</strong> ${booking.checkin} | <strong>Check-out:</strong> ${booking.checkout}</p>
                        <p><strong>Guests:</strong> ${booking.guests} | <strong>Rooms:</strong> ${booking.rooms}</p>
                        <p><strong>Total Amount:</strong> ₹${booking.totalAmount}</p>
                        <p><strong>Status:</strong> <span style="color: green;">${booking.status}</span></p>
                        <p><strong>Booked on:</strong> ${booking.bookingDate}</p>
                    </div>
                    <div class="booking-actions">
                        <button onclick="cancelBooking(${booking.id})">Cancel Booking</button>
                    </div>
                </div>
            `).join('');
        }

        // Cancel booking
        function cancelBooking(bookingId) {
            if (confirm('Are you sure you want to cancel this booking?')) {
                bookings = bookings.filter(b => b.id !== bookingId);
                loadMyBookings();
                alert('Booking cancelled successfully!');
            }
        }

        // Logout functionality
        function logout() {
            if (confirm('Are you sure you want to logout?')) {
                currentUser = null;
                selectedHotelData = null;
                document.getElementById('navbar').style.display = 'none';
                showPage('login');
                
                // Reset forms
                document.getElementById('loginForm').reset();
                document.getElementById('signupForm').reset();
                document.getElementById('hotelBookingForm').reset();
                
                alert('Logged out successfully!');
            }
        }
   