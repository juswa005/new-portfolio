/**
 * PORTFOLIO WEBSITE JAVASCRIPT
 * Author: Amiel Josh Basug
 * Description: Interactive features for portfolio website
 */

// ============================================
// MATRIX RAIN ANIMATION
// Creates falling code effect in background
// ============================================

const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

// Set canvas size to window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Character set for matrix rain (Japanese katakana + alphanumeric)
const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = [];

// Initialize drops at random positions above screen
for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * -100;
}

/**
 * Draw matrix rain frame
 * Called repeatedly via setInterval
 */
function drawMatrix() {
    // Semi-transparent black to create trail effect
    ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Set text color and font
    ctx.fillStyle = '#00ff88';
    ctx.font = fontSize + 'px monospace';
    
    // Draw each column
    for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        // Reset drop to top when it reaches bottom (with randomness)
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

// Start matrix animation (35ms interval)
setInterval(drawMatrix, 35);

// Handle window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ============================================
// TYPEWRITER EFFECT
// Animated typing in terminal
// ============================================

const typeText = document.getElementById('type-text');
const phrases = [
    'whoami',
    'echo "Welcome to my portfolio"',
    'sudo apt-get install success',
    'ping ambition -c unlimited'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

/**
 * Typewriter animation function
 * Types and deletes text in loop
 */
function typeWriter() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        // Deleting text
        typeText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        // Typing text
        typeText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }
    
    // Pause at end of phrase
    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 2000; // 2 second pause
    } 
    // Move to next phrase when deleted
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500; // 0.5 second pause
    }
    
    setTimeout(typeWriter, typeSpeed);
}

// Start typewriter when page loads
window.addEventListener('load', typeWriter);

// ============================================
// MOBILE NAVIGATION
// Hamburger menu toggle
// ============================================

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when link clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ============================================
// SMOOTH SCROLLING
// For anchor links
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// NAVBAR BACKGROUND
// Change on scroll
// ============================================

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.8)';
        navbar.style.boxShadow = 'none';
    }
});

// ============================================
// SKILLS ANIMATION
// Progress bars and circular indicators
// ============================================

/**
 * Animate skill bars when section is visible
 */
function animateSkills() {
    // Animate linear progress bars
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
    });

    // Animate circular progress
    const circularSkills = document.querySelectorAll('.circular-skill');
    circularSkills.forEach(skill => {
        const percent = skill.getAttribute('data-percent');
        const circle = skill.querySelector('.circle-progress');
        const circumference = 2 * Math.PI * 45; // r=45
        const offset = circumference - (percent / 100) * circumference;
        
        // Set initial state
        circle.style.strokeDasharray = circumference;
        circle.style.strokeDashoffset = circumference;
        
        // Animate to final state after short delay
        setTimeout(() => {
            circle.style.strokeDashoffset = offset;
        }, 200);
    });
}

// Use Intersection Observer to trigger animation when visible
const skillsSection = document.querySelector('.skills');
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
            skillsObserver.unobserve(entry.target); // Only animate once
        }
    });
}, { threshold: 0.3 });

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// ============================================
// SCROLL REVEAL ANIMATION
// Fade in elements on scroll
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for fade-in
document.querySelectorAll('.project-card, .contact-item, .skill-bar-container, .circular-skill, .exposure-card, .certificate-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ============================================
// 3D TILT EFFECT
// For project cards
// ============================================

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ============================================
// GLITCH EFFECT RANDOMIZER
// Random glitch on name
// ============================================

setInterval(() => {
    const glitch = document.querySelector('.glitch');
    if (glitch && Math.random() > 0.95) {
        glitch.style.animation = 'none';
        setTimeout(() => {
            glitch.style.animation = '';
        }, 10);
    }
}, 3000);

// ============================================
// CERTIFICATE MODAL
// Lightbox for viewing certificates - FIXED VERSION
// ============================================

/**
 * Certificate data object
 * Add your actual certificate details here
 */
const certificateData = {
    'cert1': {
        title: 'Introduction to Cybersecurity',
        issuer: 'Cisco',
        date: 'Issued: 2026',
        image: 'images/certs/Intro-to-Cybersec.jpg',
        description: 'Fundamentals of cyber threats, security principles, and defensive strategies.',
        verifyLink: 'https://www.credly.com/badges/85ef00ac-bd00-4ad8-accf-d537ebbe4bfb/public_url'
    },
    'cert2': {
        title: 'Operating Systems Basics',
        issuer: 'Cisco',
        date: 'Issued: 2025',
        image: 'images/certs/OS-Basics.jpg',
        description: 'Core concepts of operating systems, processes, memory, and system management.',
        verifyLink: 'https://www.credly.com/badges/282c243b-03f1-49fa-ab6c-2fad7cfdb45d/public_url'
    },
    'cert3': {
        title: 'Python Essentials 1',
        issuer: 'Cisco',
        date: 'Issued: 2025',
        image: 'images/certs/Py-Ess1.jpg',
        description: 'Foundational Python programming concepts, syntax, and problem-solving.',
        verifyLink: 'https://www.credly.com/badges/215abba6-467d-4309-b5c8-f3135a1d896a/public_url'
    },
    'cert4': {
        title: 'Python Essentials 2',
        issuer: 'Cisco',
        date: 'Issued: 2025',
        image: 'images/certs/Py-Ess2.jpg',
        description: 'Intermediate Python skills including OOP, modules, and data handling.',
        verifyLink: 'https://www.credly.com/badges/72a64fa4-e3e5-44d9-862d-f361cc876d64/public_url'
    },
    'cert5': {
        title: 'Civil Service Eligibility (Professional)',
        issuer: 'Civil Service Commission ',
        date: 'Issued: 2025',
        image: 'images/certs/CSE.jpg',
        description: 'Certified eligibility for professional positions in Philippine government service.',
        verifyLink: 'https://csevs.csc.gov.ph/user/eligibility'
    },
    'cert6': {
        title: 'NC-II Certificate',
        issuer: 'Tesda',
        date: 'Issued: 2024',
        image: 'images/certs/NC2.jpg',
        description: 'National certification validating technical and vocational competency in the assigned specialization.',
        verifyLink: 'https://t2mis.tesda.gov.ph/Learners/S/78004C00580031004C004100390033003000320051005000680037004D0058004F005600730049004E0038002F0057004B0038006F005800570066004500360032004A003900480046005800440053007100700049003D00'
    },
    'cert7': {
        title: 'Hack4Gov 2025',
        issuer: 'DICT',
        date: 'Issued: 2025',
        image: 'images/certs/h4g.jpeg',
        description: 'Participated in a government-focused CTF covering cybersecurity, forensics, and problem-solving challenges.',
        verifyLink: 'no-verify.html'
    },
    'cert8': {
        title: 'Trend Micro University Capture the Flag Participant',
        issuer: 'Trend Micro',
        date: 'Issued: 2025',
        image: 'images/certs/uctf.jpg',
        description: 'Engaged in hands-on security challenges involving threat analysis, networking, and defensive techniques.',
        verifyLink: 'no-verify.html'
    },
    'cert9': {
        title: 'Kaspersky CTF Participant',
        issuer: 'Kaspersky',
        date: 'Issued: 2025',
        image: 'images/certs/Kasp.jpg',
        description: 'Competed in cybersecurity challenges emphasizing malware analysis, cryptography, and system security.',
        verifyLink: 'no-verify.html'
    },
    'cert10': {
        title: 'RegCon 2025 – Certificate of Achievement (SUMOBOT)',
        issuer: 'ICPEP Region 2',
        date: 'Issued: 2026',
        image: 'images/certs/sumo.jpeg',
        description: 'Recognized for competitive performance in a robotics sumobot competition.',
        verifyLink: 'no-verify.html'
    },
    'cert11': {
        title: 'RegCon 2024 – Certificate of Participation(1)',
        issuer: 'ICPEP Region 2',
        date: 'Issued: 2025',
        image: 'images/certs/regcon241.jpeg',
        description: 'Active participation in ICPEP Regional Convention technical activities and seminars.',
        verifyLink: 'no-verify.html'
    },
     'cert12': {
        title: 'RegCon 2024 – Certificate of Participation(2)',
        issuer: 'ICPEP Region 2',
        date: 'Issued: 2025',
        image: 'images/certs/regcon242.jpeg',
        description: 'Active participation in ICPEP Regional Convention technical activities and seminars.',
        verifyLink: 'no-verify.html'
    },
     'cert13': {
        title: 'RegCon 2025 – Certificate of Participation(1)',
        issuer: 'ICPEP Region 2',
        date: 'Issued: 2026',
        image: 'images/certs/regcon251.jpeg',
        description: 'Continued engagement in regional engineering events and skill-building sessions.',
        verifyLink: 'no-verify.html'
    },
    'cert14': {
        title: 'RegCon 2025 – Certificate of Participation(2)',
        issuer: 'ICPEP Region 2',
        date: 'Issued: 2026',
        image: 'images/certs/regcon252.jpeg',
        description: 'Continued engagement in regional engineering events and skill-building sessions.',
        verifyLink: 'no-verify.html'
    }
};

// Global variable to track current certificate
let currentCertId = null;

/**
 * Open certificate modal
 * @param {string} certId - ID of certificate to display
 */
function openCertificate(certId) {
    console.log('=== OPENING CERTIFICATE ===');
    console.log('Certificate ID:', certId);
    
    currentCertId = certId;
    const modal = document.getElementById('certificateModal');
    const cert = certificateData[certId];
    
    if (!cert) {
        console.error('Certificate not found:', certId);
        return;
    }
    
    console.log('Certificate data:', cert);
    
    // Populate modal with certificate data
    document.getElementById('modalTitle').textContent = cert.title;
    document.getElementById('modalIssuer').textContent = cert.issuer + ' | ' + cert.date;
    document.getElementById('modalImage').src = cert.image;
    document.getElementById('modalImage').alt = cert.title;
    document.getElementById('modalDescription').textContent = cert.description;
    
    // Get verify button and set properties
    const verifyBtn = document.getElementById('modalVerify');
    
    // CRITICAL FIX: Use setAttribute for all properties
    verifyBtn.setAttribute('href', cert.verifyLink);
    verifyBtn.setAttribute('target', '_blank');
    verifyBtn.setAttribute('rel', 'noopener noreferrer');
    
    // CRITICAL FIX: Remove any existing click listeners to prevent duplicates
    verifyBtn.replaceWith(verifyBtn.cloneNode(true));
    
    // Get the fresh button reference after clone
    const newVerifyBtn = document.getElementById('modalVerify');
    
    // CRITICAL FIX: Add click event listener with explicit window.open
    newVerifyBtn.addEventListener('click', function(e) {
        console.log('=== VERIFY BUTTON CLICKED ===');
        console.log('Link:', cert.verifyLink);
        
        // Prevent default to handle manually
        e.preventDefault();
        e.stopPropagation();
        
        // Open in new tab using window.open
        const newWindow = window.open(cert.verifyLink, '_blank');
        
        // Check if popup was blocked
        if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
            alert('Popup blocked! Please allow popups for this site or click the link manually.');
            // Fallback: try location.href
            window.location.href = cert.verifyLink;
        }
        
        return false;
    });
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    console.log('Modal opened successfully');
    console.log('Verify link set to:', cert.verifyLink);
}

/**
 * Close certificate modal
 */
function closeCertificate() {
    console.log('=== CLOSING MODAL ===');
    const modal = document.getElementById('certificateModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    currentCertId = null;
}

// Close modal when clicking outside content
window.addEventListener('click', function(event) {
    const modal = document.getElementById('certificateModal');
    if (event.target === modal) {
        closeCertificate();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeCertificate();
    }
});

// CRITICAL FIX: Prevent modal content clicks from closing modal
document.addEventListener('DOMContentLoaded', function() {
    const modalContent = document.querySelector('.modal-content');
    if (modalContent) {
        modalContent.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // Also prevent clicks on modal body from closing
    const modalBody = document.querySelector('.modal-body');
    if (modalBody) {
        modalBody.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
});

// ============================================
// TERMINAL COMMAND SIMULATION
// In contact section
// ============================================

const terminalCommands = [
    'ls -la skills/',
    'cat about.txt',
    'ssh root@success',
    'nmap -A opportunities'
];

let commandIndex = 0;

// Add random commands to terminal every 5 seconds
setInterval(() => {
    const terminalBody = document.querySelector('.terminal-contact .terminal-body');
    if (terminalBody && Math.random() > 0.7) {
        const newLine = document.createElement('p');
        newLine.innerHTML = `<span class="prompt">$</span> ${terminalCommands[commandIndex]}`;
        newLine.style.color = '#00ff88';
        newLine.style.margin = '0.5rem 0';
        newLine.style.fontFamily = 'JetBrains Mono, monospace';
        
        // Insert before the typing animation
        const typingAnim = terminalBody.querySelector('.typing-animation');
        if (typingAnim) {
            terminalBody.insertBefore(newLine, typingAnim);
        }
        
        // Cycle through commands
        commandIndex = (commandIndex + 1) % terminalCommands.length;
        
        // Keep only last 5 commands (remove old ones)
        const lines = terminalBody.querySelectorAll('p');
        if (lines.length > 7) {
            lines[1].remove(); // Keep first line, remove oldest command
        }
    }
}, 5000);

// ============================================
// DYNAMIC YEAR IN FOOTER
// Auto-update copyright year
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const yearSpan = document.querySelector('.footer-copyright');
    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.innerHTML = `© ${currentYear} All rights reserved. | Made with ❤️ and lots of ☕`;
    }
});

// ============================================
// HOVER EFFECTS
// Enhanced interactions
// ============================================

// Tech tag hover
document.querySelectorAll('.tech-tag-large').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) translateY(-3px)';
        this.style.boxShadow = '0 10px 20px rgba(0, 255, 136, 0.2)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateY(0)';
        this.style.boxShadow = 'none';
    });
});

// Photo hover effects
document.querySelectorAll('.photo-container').forEach(photo => {
    photo.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    photo.addEventListener('mouseleave', function() {
        setTimeout(() => {
            this.style.zIndex = '';
        }, 300);
    });
});

// ============================================
// EASTER EGG
// Konami code activation
// ============================================

let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    document.body.style.filter = 'hue-rotate(180deg)';
    setTimeout(() => {
        document.body.style.filter = '';
        alert('🎉 You found the secret! Matrix mode activated briefly.');
    }, 1000);
}

// ============================================
// DEBUGGING HELPERS
// Log to console for troubleshooting
// ============================================

console.log('=== PORTFOLIO SCRIPT LOADED ===');
console.log('Certificate data available:', Object.keys(certificateData));
console.log('To test certificate modal, type in console: openCertificate("cert1")');

// Test function for debugging
window.testCertificate = function() {
    console.log('Testing certificate modal...');
    openCertificate('cert1');
};