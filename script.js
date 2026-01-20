const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const proposalContainer = document.getElementById('proposalContainer');
const thankYouContainer = document.getElementById('thankYouContainer');

let yesScale = 1;
let noClickCount = 0;

// Funzione per gestire il click su "No"
noBtn.addEventListener('click', function() {
    noClickCount++;
    yesScale += 0.3;
    
    // Aumenta la dimensione del bottone "Sì"
    yesBtn.style.transform = `scale(${yesScale})`;
    yesBtn.style.padding = `${15 * yesScale}px ${40 * yesScale}px`;
    yesBtn.style.fontSize = `${1.5 * yesScale}rem`;
    
    // Effetto scuotimento per il bottone "No"
    noBtn.style.animation = 'shake 0.5s';
    setTimeout(() => {
        noBtn.style.animation = '';
    }, 500);
    
    // Se il bottone "Sì" riempie lo schermo, lo facciamo cliccabile ovunque
    if (yesScale > 15) {
        // Il bottone "Sì" è abbastanza grande da ricoprire tutto
        yesBtn.style.position = 'fixed';
        yesBtn.style.width = '100vw';
        yesBtn.style.height = '100vh';
        yesBtn.style.borderRadius = '0';
        yesBtn.style.padding = '0';
        yesBtn.style.fontSize = '3rem';
        yesBtn.style.top = '0';
        yesBtn.style.left = '0';
        yesBtn.style.zIndex = '150';
        
        // Nascondi il bottone "No"
        noBtn.style.display = 'none';
        proposalContainer.style.pointerEvents = 'none';
    }
});

// Aggiungi animazione shake nel CSS dinamicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);

// Funzione per gestire il click su "Sì"
yesBtn.addEventListener('click', function() {
    // Nascondi la proposta
    proposalContainer.style.opacity = '0';
    proposalContainer.style.pointerEvents = 'none';
    
    // Mostra il messaggio di ringraziamento
    setTimeout(() => {
        thankYouContainer.classList.remove('hidden');
        confetti();
    }, 300);
});

// Funzione per creare effetto coriandoli
function confetti() {
    const confettiPieces = 50;
    const colors = ['#ff1493', '#ff69b4', '#ffb6c1', '#ffc0cb', '#fff0f5'];
    
    for (let i = 0; i < confettiPieces; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = '50%';
        confetti.style.zIndex = '300';
        confetti.style.pointerEvents = 'none';
        
        document.body.appendChild(confetti);
        
        // Animazione del coriandolo
        const duration = Math.random() * 3 + 2;
        const xMove = (Math.random() - 0.5) * 200;
        
        confetti.style.animation = `fall ${duration}s linear forwards`;
        
        // Crea l'animazione
        const keyframes = `
            @keyframes fall {
                to {
                    transform: translateY(100vh) translateX(${xMove}px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        
        if (!document.querySelector('style[data-confetti]')) {
            const confettiStyle = document.createElement('style');
            confettiStyle.setAttribute('data-confetti', 'true');
            confettiStyle.textContent = keyframes;
            document.head.appendChild(confettiStyle);
        }
        
        // Rimuovi l'elemento dopo l'animazione
        setTimeout(() => {
            confetti.remove();
        }, duration * 1000);
    }
}
