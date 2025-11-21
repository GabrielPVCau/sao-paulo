document.addEventListener('DOMContentLoaded', () => {
    console.log("Markant Growth - System Initialized");

    const leadForm = document.getElementById('leadForm');
    const modal = document.getElementById('lead-modal');
    const modalCloseBtn = document.querySelector('.modal-close');
    const navbar = document.getElementById('navbar');

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('border-brand-border', 'shadow-lg');
            navbar.querySelector('.absolute').classList.add('opacity-100');
            navbar.classList.remove('border-transparent');
        } else {
            navbar.classList.remove('border-brand-border', 'shadow-lg');
            navbar.querySelector('.absolute').classList.remove('opacity-100');
            navbar.classList.add('border-transparent');
        }
    });

    // Global Focus Form
    window.focusForm = function () {
        const nameInput = document.getElementById('name');
        const heroSection = document.getElementById('hero');

        heroSection.scrollIntoView({ behavior: 'smooth' });

        setTimeout(() => {
            if (nameInput) nameInput.focus();
        }, 800);
    };

    // Modal Logic
    function showModal() {
        if (!modal) return;
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function hideModal() {
        if (!modal) return;
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', hideModal);
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.querySelector('.absolute')) hideModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === "Escape" && modal.getAttribute('aria-hidden') === 'false') hideModal();
        });
    }

    // FAQ Toggle
    window.toggleFaq = function (button) {
        const content = button.nextElementSibling;
        const icon = button.querySelector('i');

        if (content.classList.contains('hidden')) {
            content.classList.remove('hidden');
            content.classList.add('faq-content-visible');
            icon.classList.add('rotate-180');
            button.classList.add('bg-white/5');
        } else {
            content.classList.add('hidden');
            content.classList.remove('faq-content-visible');
            icon.classList.remove('rotate-180');
            button.classList.remove('bg-white/5');
        }
    };

    // Form Submission
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = leadForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;

            // Loading State
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Analisando...';
            submitBtn.classList.add('opacity-75', 'cursor-not-allowed');

            const formData = new FormData(leadForm);
            const leadData = Object.fromEntries(formData.entries());
            leadData.timestamp = new Date().toLocaleString('pt-BR');

            // Simulate API Call
            setTimeout(() => {
                sendLeadToServices(leadData);

                // Reset
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                submitBtn.classList.remove('opacity-75', 'cursor-not-allowed');

                showModal();
                leadForm.reset();
            }, 1500);
        });
    }

    function sendLeadToServices(leadData) {
        console.log("Lead Captured:", leadData);

        // FormSubmit Integration
        const FORM_SUBMIT_URL = 'https://formsubmit.co/markantofc@gmail.com';
        const formData = new FormData();
        for (const key in leadData) {
            formData.append(key, leadData[key]);
        }
        formData.append('_subject', `🚀 Novo Lead Consultoria: ${leadData.name}`);
        formData.append('_captcha', 'false');
        formData.append('_template', 'table');

        fetch(FORM_SUBMIT_URL, {
            method: 'POST',
            body: formData
        }).catch(err => console.error('Erro envio email:', err));
    }
});
