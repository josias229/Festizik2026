// ===== GESTIONNAIRE DE NAVIGATION =====
let lastScrollTop = 0;
const nav = document.querySelector('nav');
const mouseIndicator = document.querySelector('.mouse-indicator');

window.addEventListener('scroll', function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Gestion de la barre de navigation
    if (scrollTop > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    // Gestion de la souris (disparaît quand on remonte)
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Défilement vers le bas
        mouseIndicator.classList.remove('hidden');
    } else if (scrollTop < lastScrollTop && scrollTop > 100) {
        // Défilement vers le haut
        mouseIndicator.classList.add('hidden');
    } else {
        // Haut de la page
        mouseIndicator.classList.remove('hidden');
    }

    lastScrollTop = scrollTop;
});

// ===== MENU HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', function () {
    navLinks.classList.toggle('active');

    // Changer l'icône
    const icon = hamburger.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Fermer le menu hamburger quand on clique sur un lien
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// ===== CARROUSEL DE TEXTE =====
document.addEventListener('DOMContentLoaded', function () {
    const textItems = document.querySelectorAll('.text-item');
    let currentIndex = 0;
    let carouselInterval;

    function changeText(index) {
        // Masquer tous les textes
        textItems.forEach(item => item.classList.remove('active'));

        // Afficher le texte à l'index spécifié
        textItems[index].classList.add('active');
        currentIndex = index;
    }

    function autoCarousel() {
        currentIndex = (currentIndex + 1) % textItems.length;
        changeText(currentIndex);
    }

    function startCarousel() {
        carouselInterval = setInterval(autoCarousel, 5000);
    }

    // Démarrer le carrousel automatique
    startCarousel();

    // Lecture de la vidéo
    const video = document.querySelector('video');
    video.play().catch(function (error) {
        console.log("La lecture automatique a été empêchée: ", error);
    });

    // Fonctionnalité de défilement vers le bas
    function scrollToNextSection() {
        const aboutSection = document.getElementById('about');
        aboutSection.scrollIntoView({ behavior: 'smooth' });
    }

    if (mouseIndicator) {
        mouseIndicator.addEventListener('click', scrollToNextSection);
    }
});

// ===== CHATBOT AMÉLIORÉ =====
const chatbotButton = document.getElementById('chatbotButton');
const chatbotWindow = document.getElementById('chatbotWindow');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');
const notificationBadge = document.getElementById('notificationBadge');

// Ouvrir/fermer le chatbot
chatbotButton.addEventListener('click', function () {
    chatbotWindow.classList.toggle('active');
    chatbotButton.classList.toggle('active');

    // Cacher la notification quand on ouvre le chat
    if (chatbotWindow.classList.contains('active')) {
        notificationBadge.style.display = 'none';
    }
});

chatbotClose.addEventListener('click', function () {
    chatbotWindow.classList.remove('active');
    chatbotButton.classList.remove('active');
});

// Réponses prédéfinies du bot
const botResponses = {
    'salut': {
        message: "Bonjour ! 😊 Comment puis-je vous aider pour Festizik 2023?",
        quickReplies: ['Dates et horaires', 'Billetterie', 'Programme', 'Artistes']
    },
    'bonjour': {
        message: "Bonjour ! 😊 Comment puis-je vous aider pour Festizik 2023?",
        quickReplies: ['Dates et horaires', 'Billetterie', 'Programme', 'Artistes']
    },
    'coucou': {
        message: "Coucou ! 👋 Vous avez des questions sur Festizik?",
        quickReplies: ['Dates et horaires', 'Billetterie', 'Programme', 'Artistes']
    },
    'date': {
        message: "Festizik 2023 aura lieu du **15 au 17 Décembre** à Cotonou. Marquez vos calendriers! 📅",
        quickReplies: ['Horaires', 'Lieu', 'Billetterie']
    },
    'quand': {
        message: "Festizik 2023 se déroulera du **15 au 17 Décembre** à Cotonou. Préparez-vous! 🎉",
        quickReplies: ['Horaires', 'Lieu', 'Billetterie']
    },
    'horaires': {
        message: "Les horaires pour Festizik 2023: \n\n• Vendredi 15: 18h - 02h \n• Samedi 16: 16h - 04h \n• Dimanche 17: 14h - 00h \n\nVenez profiter au maximum! 🕺",
        quickReplies: ['Programme détaillé', 'Artistes', 'Billetterie']
    },
    'billet': {
        message: "Plusieurs options de billets sont disponibles: \n\n• Pass 1 jour: 5 000 FCFA \n• Pass 2 jours: 8 000 FCFA \n• Pass 3 jours: 12 000 FCFA \n• VIP: 20 000 FCFA \n\nAchetez-les en ligne ou aux points de vente partenaires! 🎫",
        quickReplies: ['Points de vente', 'Avantages VIP', 'Programme']
    },
    'prix': {
        message: "Voici les tarifs pour Festizik 2023: \n\n• Pass 1 jour: 5 000 FCFA \n• Pass 2 jours: 8 000 FCFA \n• Pass 3 jours: 12 000 FCFA \n• VIP: 20 000 FCFA \n\nDes réductions sont disponibles pour les groupes! 💰",
        quickReplies: ['Points de vente', 'Avantages VIP', 'Programme']
    },
    'tarif': {
        message: "Les tarifs pour Festizik 2023: \n\n• Pass 1 jour: 5 000 FCFA \n• Pass 2 jours: 8 000 FCFA \n• Pass 3 jours: 12 000 FCFA \n• VIP: 20 000 FCFA \n\nÉconomisez avec les passes multi-jours! 🎟️",
        quickReplies: ['Points de vente', 'Avantages VIP', 'Programme']
    },
    'programme': {
        message: "Le programme complet sera dévoilé très bientôt! 🎶 Restez connecté sur nos réseaux sociaux @festizik pour ne rien manquer. En attendant, je peux vous dire qu'il y aura des performances incroyables!",
        quickReplies: ['Artistes confirmés', 'Dates et horaires', 'Billetterie']
    },
    'artiste': {
        message: "Une belle sélection d'artistes locaux et internationaux sera présente! La programmation officielle sera annoncée sur nos réseaux sociaux dans les prochains jours. 👀",
        quickReplies: ['Dates et horaires', 'Billetterie', 'Scènes']
    },
    'contact': {
        message: "Vous pouvez nous contacter: \n\n• Téléphone: +229 12 34 56 78 \n• Email: info@festizik.com \n• Réseaux sociaux: @festizik \n\nNous répondons rapidement! 📞",
        quickReplies: ['Points de vente', 'Partenariat', 'Médias']
    },
    'email': {
        message: "Notre adresse email: info@festizik.com 📧 \nN'hésitez pas à nous écrire pour toute question!",
        quickReplies: ['Téléphone', 'Réseaux sociaux', 'Points de vente']
    },
    'téléphone': {
        message: "Notre numéro: +229 12 34 56 78 📱 \nAppelez-nous du lundi au vendredi de 9h à 18h!",
        quickReplies: ['Email', 'Réseaux sociaux', 'Points de vente']
    },
    'default': {
        message: "Désolé, je n'ai pas bien compris. 😅 Pouvez-vous reformuler? Je peux vous aider avec les dates, les billets, le programme, les artistes ou les contacts!",
        quickReplies: ['Dates et horaires', 'Billetterie', 'Programme', 'Contact']
    }
};

// Envoyer un message
function sendMessage() {
    const message = chatbotInput.value.trim();
    if (message) {
        // Ajouter le message de l'utilisateur
        addMessage(message, 'user');
        chatbotInput.value = '';

        // Simuler que le bot tape
        showTypingIndicator();

        // Réponse du bot après un court délai
        setTimeout(function () {
            removeTypingIndicator();
            botResponse(message);
        }, 1500);
    }
}

// Afficher l'indicateur de frappe
function showTypingIndicator() {
    const typingElement = document.createElement('div');
    typingElement.classList.add('typing-indicator');
    typingElement.id = 'typingIndicator';
    typingElement.innerHTML = `
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            `;
    chatbotMessages.appendChild(typingElement);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Supprimer l'indicateur de frappe
function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Gestion des événements d'envoi
chatbotSend.addEventListener('click', sendMessage);
chatbotInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Ajouter un message à la conversation
function addMessage(text, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(sender + '-message');

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    messageElement.innerHTML = `
                ${text}
                <span class="message-time">${time}</span>
            `;

    chatbotMessages.appendChild(messageElement);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Ajouter une réponse avec des réponses rapides
function addBotResponse(text, quickReplies = []) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add('bot-message');

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    let quickRepliesHTML = '';
    if (quickReplies.length > 0) {
        quickRepliesHTML = '<div class="quick-replies">';
        quickReplies.forEach(reply => {
            quickRepliesHTML += `<div class="quick-reply" data-reply="${reply}">${reply}</div>`;
        });
        quickRepliesHTML += '</div>';
    }

    messageElement.innerHTML = `
                ${text}
                <span class="message-time">${time}</span>
                ${quickRepliesHTML}
            `;

    chatbotMessages.appendChild(messageElement);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

    // Ajouter des écouteurs d'événements aux réponses rapides
    const quickReplyElements = messageElement.querySelectorAll('.quick-reply');
    quickReplyElements.forEach(element => {
        element.addEventListener('click', function () {
            const replyText = this.getAttribute('data-reply');
            addMessage(replyText, 'user');

            showTypingIndicator();
            setTimeout(function () {
                removeTypingIndicator();
                botResponse(replyText);
            }, 1500);
        });
    });
}

// Réponse du bot
function botResponse(userMessage) {
    userMessage = userMessage.toLowerCase();
    let response = botResponses.default;

    // Vérifier les correspondances
    for (const [key, value] of Object.entries(botResponses)) {
        if (userMessage.includes(key)) {
            response = value;
            break;
        }
    }

    addBotResponse(response.message, response.quickReplies);
}

// Notification automatique après un délai
setTimeout(function () {
    if (!chatbotWindow.classList.contains('active')) {
        notificationBadge.style.display = 'flex';
    }
}, 10000);

// Animation pour la timeline
document.addEventListener('DOMContentLoaded', function () {
    const timelineItems = document.querySelectorAll('.timeline-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.3 });

    timelineItems.forEach(item => {
        item.style.opacity = 0;
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);
    });

    // Animation pour les flammes
    const flames = document.querySelectorAll('.flame');
    flames.forEach(flame => {
        flame.style.animationDuration = `${2 + Math.random() * 2}s`;
    });
});

// Animation pour la section dossier numérique
document.addEventListener('DOMContentLoaded', function () {
    const dossierSection = document.getElementById('dossier');
    const featureItems = document.querySelectorAll('.feature-item');
    const stats = document.querySelectorAll('.stat');

    if (dossierSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animation des éléments de fonctionnalités
                    featureItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = 1;
                            item.style.transform = 'translateX(0)';
                        }, index * 150);
                    });

                    // Animation des statistiques
                    stats.forEach((stat, index) => {
                        setTimeout(() => {
                            stat.style.opacity = 1;
                            stat.style.transform = 'translateY(0)';
                        }, 600 + (index * 200));
                    });

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        observer.observe(dossierSection);

        // Préparation des animations
        featureItems.forEach(item => {
            item.style.opacity = 0;
            item.style.transform = 'translateX(-20px)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });

        stats.forEach(stat => {
            stat.style.opacity = 0;
            stat.style.transform = 'translateY(20px)';
            stat.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
    }

    // Simulation de téléchargement
    const downloadBtn = document.querySelector('.btn-download');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function (e) {
            e.preventDefault();

            // Animation de téléchargement
            this.classList.add('downloading');
            const originalText = this.querySelector('span').textContent;
            this.querySelector('span').textContent = 'Téléchargement...';

            // Simulation du téléchargement
            setTimeout(() => {
                this.classList.remove('downloading');
                this.querySelector('span').textContent = 'Téléchargé !';

                // Retour à l'état initial après 2 secondes
                setTimeout(() => {
                    this.querySelector('span').textContent = originalText;
                }, 2000);
            }, 1500);
        });
    }

    // Simulation de prévisualisation
    const previewBtn = document.querySelector('.btn-preview');
    if (previewBtn) {
        previewBtn.addEventListener('click', function (e) {
            e.preventDefault();

            // Création d'une modal de prévisualisation
            const modal = document.createElement('div');
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100%';
            modal.style.height = '100%';
            modal.style.backgroundColor = 'rgba(0,0,0,0.8)';
            modal.style.display = 'flex';
            modal.style.justifyContent = 'center';
            modal.style.alignItems = 'center';
            modal.style.zIndex = '10000';

            modal.innerHTML = `
                <div style="background: white; padding: 30px; border-radius: 15px; text-align: center; max-width: 500px; width: 90%;">
                    <h3 style="color: #FF7B00; margin-bottom: 15px;">Prévisualisation</h3>
                    <p style="color: #666; margin-bottom: 20px;">Fonctionnalité de prévisualisation bientôt disponible!</p>
                    <div style="height: 200px; background: #f5f5f5; display: flex; justify-content: center; align-items: center; margin-bottom: 20px; border-radius: 10px;">
                        <i class="fas fa-file-pdf" style="font-size: 3rem; color: #FF7B00;"></i>
                    </div>
                    <button style="padding: 10px 20px; background: #FF7B00; color: white; border: none; border-radius: 5px; cursor: pointer;">
                        Fermer
                    </button>
                </div>
            `;

            document.body.appendChild(modal);

            // Fermer la modal
            modal.querySelector('button').addEventListener('click', () => {
                document.body.removeChild(modal);
            });
        });
    }
});

// Décompte jusqu'au festival
document.addEventListener('DOMContentLoaded', function () {
    // Date cible du festival (23 Juillet 2026 - premier jour du festival)
    const festivalDate = new Date('July 23, 2026 00:00:00').getTime();

    // Éléments du timer
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const progressCircle = document.querySelector('.progress-ring-circle');

    // Configuration de la circonférence du cercle de progression
    const circumference = 2 * Math.PI * 140;
    progressCircle.style.strokeDasharray = circumference;

    // Mise à jour du décompte chaque seconde
    const countdownTimer = setInterval(function () {
        // Date et heure actuelles
        const now = new Date().getTime();

        // Différence entre maintenant et la date du festival
        const distance = festivalDate - now;

        // Calculs pour les jours, heures, minutes et secondes
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Mise à jour des éléments HTML
        if (daysElement) daysElement.innerHTML = days.toString().padStart(2, '0');
        if (hoursElement) hoursElement.innerHTML = hours.toString().padStart(2, '0');
        if (minutesElement) minutesElement.innerHTML = minutes.toString().padStart(2, '0');
        if (secondsElement) secondsElement.innerHTML = seconds.toString().padStart(2, '0');

        // Mise à jour de la progression du cercle (basée sur les secondes)
        const secondsProgress = 60 - seconds;
        const progressOffset = circumference - (secondsProgress / 60) * circumference;
        progressCircle.style.strokeDashoffset = progressOffset;

        // Si le compte à rebours est terminé
        if (distance < 0) {
            clearInterval(countdownTimer);
            if (daysElement) daysElement.innerHTML = "00";
            if (hoursElement) hoursElement.innerHTML = "00";
            if (minutesElement) minutesElement.innerHTML = "00";
            if (secondsElement) secondsElement.innerHTML = "00";

            // Afficher un message
            const countdownContent = document.querySelector('.countdown-content');
            if (countdownContent) {
                const celebrationMsg = document.createElement('div');
                celebrationMsg.style.background = 'rgba(255, 123, 0, 0.1)';
                celebrationMsg.style.padding = '20px';
                celebrationMsg.style.borderRadius = '10px';
                celebrationMsg.style.marginTop = '20px';
                celebrationMsg.style.textAlign = 'center';
                celebrationMsg.innerHTML = `
                    <h3 style="color: #FF7B00; margin-bottom: 10px;">Le Festival a Commencé !</h3>
                    <p style="margin: 0;">Rendez-vous à la Plage de Fidjrossè pour vivre l'expérience Festizik !</p>
                    <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.8;">Du 23 Juillet au 02 Août 2026</p>
                `;
                countdownContent.appendChild(celebrationMsg);
            }
        }
    }, 1000);

    // Animation des éléments au défilement
    const countdownSection = document.getElementById('countdown');
    if (countdownSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animation des éléments flottants
                    const floatingElements = document.querySelectorAll('.floating-element');
                    floatingElements.forEach(el => {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    });

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        observer.observe(countdownSection);

        // Préparation des animations
        const floatingElements = document.querySelectorAll('.floating-element');
        floatingElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
    }

    // Interaction bouton "Me rappeler"
    const remindBtn = document.querySelector('.btn-primary');
    if (remindBtn) {
        remindBtn.addEventListener('click', function (e) {
            e.preventDefault();

            // Demander l'adresse email
            const email = prompt("Entrez votre email pour être notifié du festival:");
            if (email) {
                // Simulation d'enregistrement
                this.innerHTML = '<i class="fas fa-check"></i><span>Inscription confirmée!</span>';
                this.style.background = '#4CAF50';

                // Réinitialiser après 3 secondes
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-bell"></i><span>Me rappeler</span>';
                    this.style.background = '';
                }, 3000);
            }
        });
    }

    // Interaction bouton "Partager"
    const shareBtn = document.querySelector('.btn-secondary');
    if (shareBtn) {
        shareBtn.addEventListener('click', function (e) {
            e.preventDefault();

            // Vérifier si l'API Web Share est supportée
            if (navigator.share) {
                navigator.share({
                    title: 'Festizik Cotonou BBQ 2026',
                    text: 'Ne manquez pas le Festizik Cotonou BBQ 2026! Du 23 Juillet au 02 Août - Découvrez le festival de grillades et de musique le plus attendu du Bénin.',
                    url: window.location.href
                })
                    .catch(error => {
                        console.log('Erreur de partage:', error);
                    });
            } else {
                // Fallback pour les navigateurs qui ne supportent pas l'API Web Share
                alert("Utilisez la fonction de partage de votre navigateur pour partager cette page.");
            }
        });
    }
});

// Filtrage des exposants par catégorie
document.addEventListener('DOMContentLoaded', function() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const mainCards = document.querySelectorAll('.category-main-card');
    const subcategoryCards = document.querySelectorAll('.subcategory-card');
    const reserveButtons = document.querySelectorAll('.btn-reserve-square');

    // Fonction pour afficher la vue "Tous" (EXACTEMENT 5 catégories principales)
function showMainView() {
    mainCards.forEach((card, index) => {
        if (index < 5) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
    subcategoryCards.forEach(card => {
        card.style.display = 'none';
    });
}

    // Fonction pour afficher les sous-catégories d'une catégorie spécifique
    function showSubcategories(category) {
        mainCards.forEach(card => {
            card.style.display = 'none';
        });
        subcategoryCards.forEach(card => {
            if (card.getAttribute('data-category') === category) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Gestion des clics sur les boutons de filtre
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Retirer la classe active de tous les boutons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');

            const category = this.getAttribute('data-category');

            if (category === 'all') {
                showMainView();
            } else {
                showSubcategories(category);
            }
        });
    });

    // Gestion des clics sur les boutons "Voir les options" / "Réserver"
    reserveButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Empêcher la propagation du clic
            
            const category = this.getAttribute('data-category');
            
            // Mettre à jour le filtre actif
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelector(`.category-btn[data-category="${category}"]`).classList.add('active');
            
            // Afficher les sous-catégories
            showSubcategories(category);
        });
    });

    // Afficher la vue principale au chargement
    showMainView();
});

// Animation pour la section USP
document.addEventListener('DOMContentLoaded', function () {
    const uspSection = document.querySelector('.usp-section');

    if (uspSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const uspCards = document.querySelectorAll('.usp-card');

                    // Animer chaque carte avec un délai
                    uspCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animated');
                        }, index * 200);
                    });

                    // Arrêter d'observer après l'animation
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        observer.observe(uspSection);
    }
});

// Gestion du modal partenariat
document.addEventListener('DOMContentLoaded', function() {
    const openModalBtn = document.getElementById('openPartnershipModal');
    const closeModalBtn = document.getElementById('closePartnershipModal');
    const modal = document.getElementById('partnershipModal');

    // Ouvrir le modal
    openModalBtn.addEventListener('click', function() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Fermer le modal
    closeModalBtn.addEventListener('click', function() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Fermer en cliquant en dehors
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Gestion du formulaire
    const partnerForm = document.getElementById('partner-form');
    partnerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Ici vous ajouterez la logique d'envoi du formulaire
        alert('Demande de partenariat envoyée ! Nous vous contacterons rapidement.');
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});
// ===== FONCTIONNALITÉS SPÉCIFIQUES À LA PAGE PROGRAMME =====

// Filtrage du programme
document.addEventListener('DOMContentLoaded', function() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const programmeCards = document.querySelectorAll('.programme-card');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Mettre à jour le bouton actif
            filterTabs.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrer les cartes
            programmeCards.forEach(card => {
                const cardCategories = card.getAttribute('data-category').split(' ');
                
                if (category === 'all' || cardCategories.includes(category)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
});

// Animation spécifique à la page programme
function animateProgrammePage() {
    const programmeSection = document.querySelector('.programme-section');
    
    if (programmeSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animation des éléments de filtre
                    const filterTabs = document.querySelectorAll('.filter-tab');
                    filterTabs.forEach((tab, index) => {
                        setTimeout(() => {
                            tab.style.opacity = '1';
                            tab.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                    
                    // Animation des cartes artistes
                    const artistCards = document.querySelectorAll('.artist-card');
                    artistCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 300 + (index * 100));
                    });
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(programmeSection);
        
        // Préparation des animations
        const filterTabs = document.querySelectorAll('.filter-tab');
        const artistCards = document.querySelectorAll('.artist-card');
        
        filterTabs.forEach(tab => {
            tab.style.opacity = '0';
            tab.style.transform = 'translateY(-20px)';
            tab.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        artistCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
    }
}

// Initialiser les fonctionnalités de la page programme
document.addEventListener('DOMContentLoaded', function() {
    // Vérifier si on est sur la page programme
    if (document.body.classList.contains('programme-page')) {
        initProgrammeFilters();
        animateProgrammePage();
    }
});


// ===== FONCTIONNALITÉS SPÉCIFIQUES À LA PAGE DÉTAIL ARTISTE =====

// Initialisation de la page détail artiste
function initArtisteDetail() {
    // Gestion des boutons favoris
    const favoriteBtn = document.querySelector('.btn-primary');
    if (favoriteBtn) {
        favoriteBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            if (this.classList.contains('active')) {
                this.innerHTML = '<i class="fas fa-heart"></i> Retirer des favoris';
                showNotification('Artiste ajouté à vos favoris');
            } else {
                this.innerHTML = '<i class="fas fa-heart"></i> Ajouter à mes favoris';
            }
        });
    }

    // Gestion du bouton partager
    const shareBtn = document.querySelector('.btn-outline');
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            if (navigator.share) {
                navigator.share({
                    title: document.title,
                    url: window.location.href
                }).catch(console.error);
            } else {
                // Fallback pour les navigateurs qui ne supportent pas l'API Web Share
                copyToClipboard(window.location.href);
                showNotification('Lien copié dans le presse-papiers');
            }
        });
    }

    // Gestion des boutons de lecture
    const playButtons = document.querySelectorAll('.play-btn');
    playButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const isPlaying = this.classList.contains('playing');
            
            // Réinitialiser tous les autres boutons
            playButtons.forEach(b => {
                b.classList.remove('playing');
                b.innerHTML = '<i class="fas fa-play"></i>';
            });
            
            if (!isPlaying) {
                this.classList.add('playing');
                this.innerHTML = '<i class="fas fa-pause"></i>';
                // Ici, vous intégreriez votre lecteur audio réel
                simulateAudioPlayback();
            }
        });
    });

    // Animation d'entrée des éléments
    animateArtistePage();
}

// Simulation de lecture audio (à remplacer par un vrai lecteur)
function simulateAudioPlayback() {
    console.log("Lecture audio simulée - Intégrez un vrai lecteur audio ici");
}

// Copier du texte dans le presse-papiers
function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

// Afficher une notification
function showNotification(message) {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #FF7B00;
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: fadeIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Supprimer la notification après 3 secondes
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Animation de la page artiste
function animateArtistePage() {
    const artisteSection = document.querySelector('.artiste-detail-section');
    
    if (artisteSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animation de l'image
                    const artisteImage = document.querySelector('.artiste-image');
                    if (artisteImage) {
                        artisteImage.style.opacity = '1';
                        artisteImage.style.transform = 'translateY(0)';
                    }
                    
                    // Animation des informations
                    const artisteInfo = document.querySelector('.artiste-info');
                    if (artisteInfo) {
                        setTimeout(() => {
                            artisteInfo.style.opacity = '1';
                            artisteInfo.style.transform = 'translateY(0)';
                        }, 300);
                    }
                    
                    // Animation du contenu
                    const contentElements = document.querySelectorAll('.artiste-bio, .artiste-media, .sidebar-card');
                    contentElements.forEach((el, index) => {
                        setTimeout(() => {
                            el.style.opacity = '1';
                            el.style.transform = 'translateY(0)';
                        }, 500 + (index * 100));
                    });
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(artisteSection);
        
        // Préparer les animations
        const artisteImage = document.querySelector('.artiste-image');
        const artisteInfo = document.querySelector('.artiste-info');
        const contentElements = document.querySelectorAll('.artiste-bio, .artiste-media, .sidebar-card');
        
        if (artisteImage) {
            artisteImage.style.opacity = '0';
            artisteImage.style.transform = 'translateY(30px)';
            artisteImage.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        }
        
        if (artisteInfo) {
            artisteInfo.style.opacity = '0';
            artisteInfo.style.transform = 'translateY(30px)';
            artisteInfo.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        }
        
        contentElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        });
    }
}

// Ajouter les animations CSS pour les notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(20px); }
    }
`;
document.head.appendChild(style);

// Initialiser la page lorsque le DOM est chargé
document.addEventListener('DOMContentLoaded', function() {
    if (document.body.classList.contains('artiste-detail-page')) {
        initArtisteDetail();
    }
});

