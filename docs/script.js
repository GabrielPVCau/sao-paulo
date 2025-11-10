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

            // Simulação de envio para um CRM/Backend
            console.log('Lead enviado (simulado):', {
                name: name.value.trim(),
                email: email.value.trim(),
                company: document.getElementById('company').value.trim(),
            });

            // Mostra o modal de confirmação e limpa o formulário
            showModal();
            leadForm.reset();
        });
    }
});