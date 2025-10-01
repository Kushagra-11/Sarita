// script.js

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Header & Navigation Logic ---
    const navbar = document.getElementById('navbar');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    // Toggle Mobile Menu
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Add shadow/border to header on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('header-scrolled');
        } else {
            navbar.classList.remove('header-scrolled');
        }
    });

    // --- 2. Dynamic Footer Year ---
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // --- 3. Smart Booking Modal Logic ---
    const modal = document.getElementById('booking-modal');
    const closeModalButton = document.getElementById('close-modal');
    const bookingForm = document.getElementById('booking-form');
    const serviceSelection = document.getElementById('service-selection');
    const otherServiceField = document.getElementById('other-service-field');
    const customServiceInput = document.getElementById('custom-service');

    // Select all elements that should open the modal
    const modalTriggers = [
        document.getElementById('cta-button-desktop'),
        document.getElementById('cta-button-mobile'),
        document.getElementById('hero-whatsapp-button')
    ];

    // Function to SHOW the modal
    const showModal = () => {
        modal.classList.remove('hidden', 'modal-hide');
        // A small delay to ensure the browser registers 'display: block' before starting transition
        setTimeout(() => {
            modal.classList.add('modal-show');
            // Animate the content scale
            modal.querySelector('div').classList.remove('scale-95');
        }, 10);
        document.body.classList.add('overflow-hidden'); // Prevent scrolling behind the modal
    };

    // Function to HIDE the modal
    const hideModal = () => {
        modal.classList.remove('modal-show');
        modal.querySelector('div').classList.add('scale-95');
        // Delay setting display: none until transition is complete (300ms)
        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }, 300);
    };

    // Attach click listeners to all triggers
    modalTriggers.forEach(button => {
        if (button) {
            button.addEventListener('click', showModal);
        }
    });

    // Close Modal listeners
    closeModalButton.addEventListener('click', hideModal);
    // Close modal if user clicks outside of the form content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideModal();
        }
    });
    
    // Show/Hide custom service field based on selection
    serviceSelection.addEventListener('change', (e) => {
        if (e.target.value === 'Other') {
            otherServiceField.classList.remove('hidden');
            customServiceInput.setAttribute('required', 'required');
        } else {
            otherServiceField.classList.add('hidden');
            customServiceInput.removeAttribute('required');
            customServiceInput.value = ''; // Clear custom field
        }
    });

    // --- 4. WhatsApp Submission Logic ---
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // 1. Collect form data
        const customerName = document.getElementById('customer-name').value.trim();
        const phoneNumber = document.getElementById('phone-number').value.trim();
        let selectedService = serviceSelection.value;
        const customerAddress = document.getElementById('customer-address').value.trim() || 'N/A';
        const businessPhoneNumber = '8881095226'; // The receiving WhatsApp number

        // Check for 'Other' and use custom field value
        if (selectedService === 'Other') {
            selectedService = customServiceInput.value.trim() || 'Other (No Description Given)';
        }

        // 2. Format the pre-filled WhatsApp message
        // %0A is a newline character in URL encoding
        const message = `🔧 *New Service Request - Sarita Tailor's Enterprises*%0A%0A` +
                        `👤 *Name:* ${encodeURIComponent(customerName)}%0A` +
                        `📱 *Phone:* ${encodeURIComponent(phoneNumber)}%0A` +
                        `🛠️ *Service Required:* ${encodeURIComponent(selectedService)}%0A` +
                        `📍 *Address:* ${encodeURIComponent(customerAddress)}%0A%0A` +
                        `Hello, I want to book a service. Please confirm availability.`;

        // 3. Construct the WhatsApp API link
        const whatsappUrl = `https://wa.me/${businessPhoneNumber}?text=${message}`;

        // 4. Open the new WhatsApp window/tab
        window.open(whatsappUrl, '_blank');

        // Optional: Reset form and close modal after submission
        bookingForm.reset();
        hideModal();
        serviceSelection.value = ''; // Ensure dropdown resets cleanly
        otherServiceField.classList.add('hidden'); // Hide custom field
    });
});