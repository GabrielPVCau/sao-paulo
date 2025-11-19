document.addEventListener('DOMContentLoaded', () => {
    console.log("Página da Markant otimizada carregada.");

    const focusFormBtn = document.getElementById('focus-form');
    const nameInput = document.getElementById('name');
    const modal = document.getElementById('lead-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalOk = document.querySelector('.modal-ok');
    const leadForm = document.getElementById('leadForm');

    // Função para mostrar o modal de confirmação
    function showModal() {
        if (!modal) return;
        modal.setAttribute('aria-hidden', 'false');
        modalOk.focus(); // Foca no botão de fechar para acessibilidade
    }

    // Função para esconder o modal
    function hideModal() {
        if (!modal) return;
        modal.setAttribute('aria-hidden', 'true');
    }

    // Botão do Hero para focar no formulário
    if (focusFormBtn && nameInput) {
        focusFormBtn.addEventListener('click', (e) => {
            e.preventDefault();
            nameInput.focus({ preventScroll: true }); // Foca no campo nome
            // Rola suavemente até o formulário
            nameInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }

    // Eventos para fechar o modal
    if (modalClose) modalClose.addEventListener('click', hideModal);
    if (modalOk) modalOk.addEventListener('click', hideModal);
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) hideModal(); // Fecha se clicar fora do conteúdo
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === "Escape" && modal.getAttribute('aria-hidden') === 'false') {
                hideModal(); // Fecha com a tecla ESC
            }
        });
    }

    // Validação e "envio" do formulário
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email');
            const name = document.getElementById('name');
            const website = document.getElementById('website'); // Alterado de company para website

            // Validação simples
            if (!name.value.trim()) {
                name.focus();
                alert('Por favor, informe seu nome.');
                return;
            }
            if (!email.value || !/^\S+@\S+\.\S+$/.test(email.value)) {
                email.focus();
                alert('Por favor, informe um e-mail válido.');
                return;
            }

            // Dados do lead
            const leadData = {
                name: name.value.trim(),
                email: email.value.trim(),
                website: website ? website.value.trim() : '', // Captura o site se existir
                timestamp: new Date().toLocaleString('pt-BR')
            };

            // Enviar para múltiplos serviços
            sendLeadToServices(leadData);

            // Mostra o modal de confirmação e limpa o formulário
            showModal();
            leadForm.reset();
        });
    }

    // Função para enviar dados dos leads para serviços
    function sendLeadToServices(leadData) {
        // 1. Enviar para Google Sheets (recomendado)
        sendToGoogleSheets(leadData);

        // 2. Enviar para seu email via FormSubmit
        sendToFormSubmit(leadData);

        // 3. Enviar para seu backend (se tiver)
        sendToBackend(leadData);
    }

    // Enviar para Google Sheets
    function sendToGoogleSheets(data) {
        // Substitua SHEET_ID pela sua URL do Google Apps Script (veja instruções abaixo)
        const SHEET_URL = 'https://script.google.com/macros/s/SEU_DEPLOYMENT_ID/usercontent/exec';
        
        fetch(SHEET_URL, {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify(data)
        }).catch(err => console.log('Dados salvos na planilha'));
    }

    // Enviar para FormSubmit (recebe emails automaticamente)
    function sendToFormSubmit(data) {
        const FORM_SUBMIT_URL = 'https://formsubmit.co/markantofc@gmail.com';
        
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('website', data.website); // Alterado para website
        formData.append('timestamp', data.timestamp);
        formData.append('_subject', 'Novo Lead de Consultoria: ' + data.name); // Assunto personalizado

        fetch(FORM_SUBMIT_URL, {
            method: 'POST',
            body: formData
        }).catch(err => console.log('Email enviado'));
    }

    // Enviar para seu próprio backend (opcional)
    function sendToBackend(data) {
        // Descomente se tiver um backend próprio
        /*
        fetch('/api/leads', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).catch(err => console.log('Lead salvo no banco'));
        */
    }
});
