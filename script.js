// ===================================
// SCROLL ANIMATIONS
// ===================================

// Intersection Observer for scroll-triggered animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            // Unobserve after animation to improve performance
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with animation classes
document.addEventListener('DOMContentLoaded', () => {
    // Observe cards
    const cards = document.querySelectorAll('.card, .feature-item, .work-card');
    cards.forEach(card => {
        observer.observe(card);
    });

    // Add smooth scroll behavior for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add parallax effect to hero section (optional)
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            hero.style.opacity = 1 - (scrolled / 800);
        }
    });

    // Header background on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(10, 10, 15, 0.95)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(10, 10, 15, 0.8)';
            header.style.boxShadow = 'none';
        }
    });
});

// ===================================
// PERFORMANCE OPTIMIZATIONS
// ===================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===================================
// UTILITY FUNCTIONS
// ===================================

// Add loading state management
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Console message for developers
console.log('%c🎮 Crontor - Servidor de Hytale en Español', 'color: #8b5cf6; font-size: 20px; font-weight: bold;');
console.log('%c¡Únete a nuestra comunidad en Discord!', 'color: #a78bfa; font-size: 14px;');
console.log('%chttps://discord.gg/6cc8HaNAQk', 'color: #60a5fa; font-size: 12px;');

// ===================================
// SERVER ADDRESS COPY FUNCTION
// ===================================

function copyServerAddress() {
    const serverAddress = 'play.crontor.com:6906';

    // Copy to clipboard
    navigator.clipboard.writeText(serverAddress).then(() => {
        // Show feedback
        const feedback = document.getElementById('copy-feedback');
        if (feedback) {
            feedback.style.opacity = '1';

            // Hide after 2 seconds
            setTimeout(() => {
                feedback.style.opacity = '0';
            }, 2000);
        }
    }).catch(err => {
        console.error('Error al copiar:', err);
        // Fallback for older browsers
        alert('Dirección copiada: ' + serverAddress);
    });
}

function copyServerAddressIP() {
    const serverAddressIP = '147.185.221.25:6906';

    // Copy to clipboard
    navigator.clipboard.writeText(serverAddressIP).then(() => {
        // Show feedback
        const feedback = document.getElementById('copy-feedback');
        if (feedback) {
            feedback.style.opacity = '1';

            // Hide after 2 seconds
            setTimeout(() => {
                feedback.style.opacity = '0';
            }, 2000);
        }
    }).catch(err => {
        console.error('Error al copiar:', err);
        // Fallback for older browsers
        alert('Dirección IP copiada: ' + serverAddressIP);
    });
}

// ===================================
// MODAL FUNCTIONS
// ===================================

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function switchToRegister() {
    closeModal('login-modal');
    openModal('register-modal');
}

function switchToLogin() {
    closeModal('register-modal');
    openModal('login-modal');
}

// ===================================
// AUTHENTICATION FUNCTIONS
// ===================================

function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    // Get stored users from localStorage
    const users = JSON.parse(localStorage.getItem('crontor_users') || '{}');

    // Check if user exists and password matches
    if (users[username] && users[username] === password) {
        // Store logged in user
        localStorage.setItem('crontor_current_user', username);

        // Close modal
        closeModal('login-modal');

        // Show success message
        alert('¡Bienvenido de vuelta, ' + username + '!');

        // Reload page to update UI
        window.location.reload();
    } else {
        alert('Usuario o contraseña incorrectos');
    }
}

function handleRegister(event) {
    event.preventDefault();

    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const confirm = document.getElementById('register-confirm').value;

    // Validate passwords match
    if (password !== confirm) {
        alert('Las contraseñas no coinciden');
        return;
    }

    // Get stored users from localStorage
    const users = JSON.parse(localStorage.getItem('crontor_users') || '{}');

    // Check if username already exists
    if (users[username]) {
        alert('Este nombre de usuario ya está en uso');
        return;
    }

    // Store new user
    users[username] = password;
    localStorage.setItem('crontor_users', JSON.stringify(users));

    // Auto login
    localStorage.setItem('hyspain_current_user', username);

    // Close modal
    closeModal('register-modal');

    // Show success message
    alert('¡Cuenta creada exitosamente! Bienvenido, ' + username + '!');

    // Reload page to update UI
    window.location.reload();
}

// Check if user is logged in on page load
document.addEventListener('DOMContentLoaded', () => {
    const currentUser = localStorage.getItem('crontor_current_user');

    if (currentUser) {
        // User is logged in - show profile
        showUserProfile(currentUser);
    }
});

// Show user profile in header
function showUserProfile(username) {
    const userProfile = document.getElementById('user-profile');
    const loginBtn = document.getElementById('login-btn');
    const userName = document.getElementById('user-name');
    const userRank = document.querySelector('.user-rank');

    if (userProfile && loginBtn && userName) {
        userName.textContent = username;

        // Load saved rank from localStorage
        const savedRank = localStorage.getItem('crontor_user_rank');
        if (userRank && savedRank) {
            userRank.textContent = savedRank;
        }

        userProfile.style.display = 'flex';
        loginBtn.style.display = 'none';
    }
}

// Hide user profile in header
function hideUserProfile() {
    const userProfile = document.getElementById('user-profile');
    const loginBtn = document.getElementById('login-btn');

    if (userProfile && loginBtn) {
        userProfile.style.display = 'none';
        loginBtn.style.display = 'inline-flex';
    }
}

// Logout function
function logout() {
    if (confirm('¿Estás seguro que deseas cerrar sesión?')) {
        localStorage.removeItem('crontor_current_user');
        hideUserProfile();
        alert('Sesión cerrada exitosamente');
    }
}

// ===================================
// STORE PAGE FUNCTIONS
// ===================================

// Filter products by category
function filterCategory(category) {
    const products = document.querySelectorAll('.product-card');
    const buttons = document.querySelectorAll('.category-btn');

    // Update active button
    buttons.forEach(btn => btn.classList.remove('active'));

    // If called from click event, use event.target, otherwise find button by category
    if (typeof event !== 'undefined' && event.target) {
        event.target.classList.add('active');
    } else {
        // Find the button for this category and make it active
        const targetBtn = Array.from(buttons).find(btn =>
            btn.getAttribute('onclick')?.includes(`'${category}'`)
        );
        if (targetBtn) {
            targetBtn.classList.add('active');
        }
    }

    // Filter products
    products.forEach(product => {
        if (category === 'all') {
            product.classList.remove('hidden');
        } else {
            if (product.dataset.category === category) {
                product.classList.remove('hidden');
            } else {
                product.classList.add('hidden');
            }
        }
    });
}

// Check for hash on page load (for donation links)
window.addEventListener('DOMContentLoaded', () => {
    if (window.location.hash === '#donaciones') {
        // Find and click the donations button
        const donationsBtn = Array.from(document.querySelectorAll('.category-btn')).find(btn =>
            btn.textContent.includes('Donaciones')
        );
        if (donationsBtn) {
            donationsBtn.click();
            // Scroll to products section
            setTimeout(() => {
                const productsSection = document.querySelector('.products-grid');
                if (productsSection) {
                    productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        }
    } else if (document.querySelector('.category-filter')) {
        // If we're on the store page and no hash, default to rangos
        setTimeout(() => {
            filterCategory('rangos');
        }, 100);
    }
});

// Open checkout modal
function openCheckout(productName, price) {
    const currentUser = localStorage.getItem('crontor_current_user');

    if (!currentUser) {
        alert('Debes iniciar sesión para realizar una compra');
        openModal('login-modal');
        return;
    }

    document.getElementById('checkout-product').textContent = productName;
    document.getElementById('checkout-price').textContent = '$' + price.toLocaleString();
    document.getElementById('checkout-user').textContent = currentUser;

    // Reset checkbox
    const checkbox = document.getElementById('purchase-confirm-checkbox');
    if (checkbox) {
        checkbox.checked = false;
    }

    const warningDiv = document.getElementById('rank-warning');
    const warningText = document.getElementById('rank-warning-text');
    let showWarning = false;
    let warningMessage = '';

    // Check if purchasing a rank
    const ranks = ['Caballero', 'Conde', 'Duque', 'Soberano'];
    const rankHierarchy = { 'Caballero': 1, 'Conde': 2, 'Duque': 3, 'Soberano': 4 };
    const purchasingRank = ranks.find(rank => productName.includes(rank));

    if (purchasingRank) {
        const currentRank = localStorage.getItem('crontor_user_rank') || 'Aldeano';
        const currentRankLevel = rankHierarchy[currentRank] || 0;
        const purchasingRankLevel = rankHierarchy[purchasingRank] || 0;

        if (currentRank === purchasingRank) {
            // Same rank
            showWarning = true;
            warningMessage = '⚠️ Ya tienes este rango. Esta compra no te dará beneficios adicionales.';
        } else if (purchasingRankLevel < currentRankLevel) {
            // Inferior rank
            showWarning = true;
            warningMessage = `⚠️ Ya tienes el rango "${currentRank}" que es superior a "${purchasingRank}". Esta compra no te dará beneficios adicionales.`;
        }
    }

    // Check if purchasing an accessory
    const accessories = ['Conjunto Místico', 'Conjunto Legendario', 'Conjunto de Aventurero'];
    const purchasingAccessory = accessories.find(acc => productName.includes(acc));

    if (purchasingAccessory) {
        // Get user's purchased accessories from localStorage
        const userAccessories = JSON.parse(localStorage.getItem('crontor_user_accessories') || '[]');

        if (userAccessories.includes(purchasingAccessory)) {
            showWarning = true;
            warningMessage = '⚠️ Ya tienes este accesorio. Esta compra no te dará beneficios adicionales.';
        }
    }

    // Show or hide warning
    if (warningDiv && warningText) {
        if (showWarning) {
            warningDiv.style.display = 'block';
            warningText.textContent = warningMessage;
        } else {
            warningDiv.style.display = 'none';
        }
    }

    openModal('checkout-modal');
}

// Confirm purchase
function confirmPurchase() {
    const product = document.getElementById('checkout-product').textContent;
    const price = document.getElementById('checkout-price').textContent;

    alert(`¡Compra confirmada!\n\nProducto: ${product}\nPrecio: ${price}\n\nEsta es una demostración. En producción, aquí se procesaría el pago real.`);

    closeModal('checkout-modal');
}

// ===================================
// GIFT FUNCTIONS
// ===================================

let currentGiftData = {};

// Open gift modal
function openGiftModal(productName, price) {
    const currentUser = localStorage.getItem('crontor_current_user');

    if (!currentUser) {
        alert('Debes iniciar sesión para regalar un producto');
        openModal('login-modal');
        return;
    }

    // Store gift data
    currentGiftData = { productName, price };

    // Update modal content
    document.getElementById('gift-product-name').textContent = productName;
    document.getElementById('gift-product').textContent = productName;
    document.getElementById('gift-price').textContent = '$' + price.toLocaleString();

    // Clear previous input
    document.getElementById('gift-recipient').value = '';

    openModal('gift-modal');
}

// Handle gift form submission
function handleGift(event) {
    event.preventDefault();

    const recipient = document.getElementById('gift-recipient').value.trim();
    const currentUser = localStorage.getItem('crontor_current_user');

    // Validate recipient
    if (recipient === currentUser) {
        alert('No puedes regalarte un producto a ti mismo');
        return;
    }

    // In production, validate recipient exists on server
    // For demo, we'll just check if it's not empty
    if (recipient.length < 3) {
        alert('Por favor ingresa un nombre de usuario válido');
        return;
    }

    // Store recipient for payment
    currentGiftData.recipient = recipient;

    // Close gift modal and open payment modal
    closeModal('gift-modal');
    openPaymentModal();
}

// ===================================
// PAYMENT FUNCTIONS
// ===================================

// Open payment method selection modal
function openPaymentModal() {
    // Check if checkbox is checked (only for checkout modal, not for gifts)
    const checkoutModal = document.getElementById('checkout-modal');
    const checkbox = document.getElementById('purchase-confirm-checkbox');

    if (checkoutModal && checkoutModal.style.display !== 'none' && checkbox && !checkbox.checked) {
        alert('Debes aceptar la compra marcando la casilla de confirmación');
        return;
    }

    openModal('payment-modal');
}

// Select payment method
function selectPaymentMethod(method) {
    const methodNames = {
        'paypal': 'PayPal',
        'card': 'Tarjeta de Crédito/Débito',
        'mercadopago': 'Mercado Pago',
        'webpay': 'WebPay'
    };

    const methodName = methodNames[method] || method;

    closeModal('payment-modal');

    // Check if it's a gift or regular purchase
    if (currentGiftData.recipient) {
        alert(`¡Regalo confirmado!\n\nProducto: ${currentGiftData.productName}\nPrecio: $${currentGiftData.price.toLocaleString()}\nDestinatario: ${currentGiftData.recipient}\nMétodo de pago: ${methodName}\n\nEsta es una demostración. En producción, aquí se procesaría el pago real y se enviaría el regalo al usuario.`);
        currentGiftData = {}; // Reset
    } else {
        const product = document.getElementById('checkout-product').textContent;
        const price = document.getElementById('checkout-price').textContent;

        // Check if the purchased product is a rank
        const ranks = ['Caballero', 'Conde', 'Duque', 'Soberano'];
        const purchasedRank = ranks.find(rank => product.includes(rank));

        if (purchasedRank) {
            // Update user's rank in localStorage
            const currentUser = localStorage.getItem('crontor_current_user');
            if (currentUser) {
                localStorage.setItem('crontor_user_rank', purchasedRank);

                // Update the rank display in the navigation
                const userRankElement = document.querySelector('.user-rank');
                if (userRankElement) {
                    userRankElement.textContent = purchasedRank;
                }
            }
        }

        // Check if the purchased product is an accessory
        const accessories = ['Conjunto Místico', 'Conjunto Legendario', 'Conjunto de Aventurero'];
        const purchasedAccessory = accessories.find(acc => product.includes(acc));

        if (purchasedAccessory) {
            // Add accessory to user's collection in localStorage
            const userAccessories = JSON.parse(localStorage.getItem('crontor_user_accessories') || '[]');
            if (!userAccessories.includes(purchasedAccessory)) {
                userAccessories.push(purchasedAccessory);
                localStorage.setItem('crontor_user_accessories', JSON.stringify(userAccessories));
            }
        }

        alert(`¡Compra confirmada!\n\nProducto: ${product}\nPrecio: ${price}\nMétodo de pago: ${methodName}\n\nEsta es una demostración. En producción, aquí se procesaría el pago real.`);
    }

    // Close checkout modal if open
    closeModal('checkout-modal');
}

// ===================================
// DONATION FUNCTIONS
// ===================================

// Set donation amount from quick buttons
function setDonationAmount(amount) {
    document.getElementById('donation-amount').value = amount;
}

// Process donation
function processDonation() {
    const currentUser = localStorage.getItem('crontor_current_user');

    if (!currentUser) {
        alert('Debes iniciar sesión para realizar una donación');
        openModal('login-modal');
        return;
    }

    const amountInput = document.getElementById('donation-amount');
    const amount = parseInt(amountInput.value);

    // Validate amount
    if (!amount || isNaN(amount)) {
        alert('Por favor ingresa un monto válido');
        amountInput.focus();
        return;
    }

    if (amount < 500) {
        alert('El monto mínimo de donación es $500');
        amountInput.focus();
        return;
    }

    // Store donation data
    currentGiftData = {
        productName: 'Donación al Servidor',
        price: amount,
        isDonation: true
    };

    // Open payment modal directly
    openPaymentModal();
}
