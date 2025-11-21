document.addEventListener('DOMContentLoaded', () => {
    console.log("Markant Growth Page Loaded - V2.0");

    const leadForm = document.getElementById('leadForm');
    const modal = document.getElementById('lead-modal');
    const modalCloseBtn = document.querySelector('.modal-close');
    const navbar = document.getElementById('navbar');

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-lg');
            navbar.querySelector('div.absolute').classList.add('opacity-100');
        } else {
            navbar.classList.remove('shadow-lg');
            navbar.querySelector('div.absolute').classList.remove('opacity-100');
        }
    });

    // Modal Functions
    function showModal() {
        if (!modal) return;
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function hideModal() {
        if (!modal) return;
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    // Close Modal Events
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', hideModal);

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.querySelector('.absolute')) hideModal();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === "Escape" && modal.getAttribute('aria-hidden') === 'false') {
                hideModal();
            }
        });
    }

    // Form Submission
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const websiteInput = document.getElementById('website');

            // Basic Validation
            if (!nameInput.value.trim() || !emailInput.value.trim()) {
                alert('Por favor, preencha os campos obrigatórios.');
                return;
            }

            const leadData = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                website: websiteInput ? websiteInput.value.trim() : '',
                timestamp: new Date().toLocaleString('pt-BR')
            };

            // Simulate API Call / Send Data
            sendLeadToServices(leadData);

            // Show Success
            showModal();
            leadForm.reset();
        });
    }

    function sendLeadToServices(leadData) {
        console.log("Processing Lead:", leadData);

        // 1. FormSubmit (Email)
        const FORM_SUBMIT_URL = 'https://formsubmit.co/markantofc@gmail.com';
        const formData = new FormData();
        for (const key in leadData) {
            formData.append(key, leadData[key]);
        }
        formData.append('_subject', `🔥 Novo Lead Growth: ${leadData.name}`);
        formData.append('_captcha', 'false');

        fetch(FORM_SUBMIT_URL, {
            method: 'POST',
            body: formData
        }).catch(err => console.error('Erro ao enviar email', err));

        // 2. Google Sheets (Optional - Add your URL if needed)
        // const SHEET_URL = 'YOUR_GOOGLE_SCRIPT_URL';
        // fetch(SHEET_URL, { method: 'POST', mode: 'no-cors', body: JSON.stringify(leadData) });
    }
});
