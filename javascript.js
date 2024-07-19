document.addEventListener('DOMContentLoaded', function() {
    const itemsPerPage = 6; // Number of items per page (changed to 6)
    let currentPage = 1; // Current page
    const projects = document.querySelectorAll('.work'); // Select all project items

    function showPage(page) {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        projects.forEach((project, index) => {
            if (index >= startIndex && index < endIndex) {
                project.style.display = 'block';
            } else {
                project.style.display = 'none';
            }
        });
    }

    function goToNextPage() {
        currentPage++;
        if (currentPage > Math.ceil(projects.length / itemsPerPage)) {
            currentPage = Math.ceil(projects.length / itemsPerPage);
        }
        showPage(currentPage);
    }

    function goToPrevPage() {
        currentPage--;
        if (currentPage < 1) {
            currentPage = 1;
        }
        showPage(currentPage);
    }

    // Initial page load
    showPage(currentPage);

    // Pagination button event listeners
    document.getElementById('nextPage').addEventListener('click', goToNextPage);
    document.getElementById('prevPage').addEventListener('click', goToPrevPage);
});


// Typing animation for role text
const roleText = document.querySelector('.role-text');
const roles = ['Web Developer', 'UI/UX Designer'];

function startTypingAnimation() {
    let currentRoleIndex = 0;
    let currentRole = roles[currentRoleIndex];
    let currentCharIndex = 0;

    function typeNextChar() {
        if (currentCharIndex <= currentRole.length) {
            roleText.textContent = currentRole.slice(0, currentCharIndex);
            currentCharIndex++;
            setTimeout(typeNextChar, 100);
        } else {
            setTimeout(() => {
                currentCharIndex = 0;
                roleText.textContent = '';
                currentRoleIndex = (currentRoleIndex + 1) % roles.length;
                currentRole = roles[currentRoleIndex];
                setTimeout(typeNextChar, 500);
            }, 1500);
        }
    }

    typeNextChar();
}

// Smooth scrolling function
function smoothScroll(target, duration) {
    const targetElement = document.querySelector(target);
    const targetPosition = targetElement.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const scrollAmount = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, scrollAmount);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Adding smooth scrolling behavior to anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = link.getAttribute('href');
        smoothScroll(target, 1000); // Adjust duration as needed
    });
});

// Burger menu toggle
const burger = document.querySelector('.header-burger');
const nav = document.querySelector('.header-nav');
burger.addEventListener('click', () => {
    nav.classList.toggle('open');
});

// Intersection observer for fade-in effect
const fadeIns = document.querySelectorAll('.fade-in');
const fadeInObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            fadeInObserver.unobserve(entry.target);
        }
    });
});
fadeIns.forEach(item => {
    fadeInObserver.observe(item);
});

// Particle animation initialization
particlesJS("particles-js", {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800,
            },
        },
        color: {
            value: "#e91e63", // Color of the particles
        },
        shape: {
            type: "circle", // Shape of the particles (circle, edge, triangle, polygon, star, image)
            stroke: {
                width: 0,
                color: "#000000",
            },
            polygon: {
                nb_sides: 5,
            },
            image: {
                src: "Image/1331.jpg",
                width: 100,
                height: 100,
            },
        },
        opacity: {
            value: 0.5,
            random: false,
            anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false,
            },
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: false,
                speed: 40,
                size_min: 0.1,
                sync: false,
            },
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#e91e63", // Color of the lines connecting the particles
            opacity: 0.4,
            width: 1,
        },
        move: {
            enable: true,
            speed: 6,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200,
            },
        },
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "grab",
            },
            onclick: {
                enable: true,
                mode: "push",
            },
            resize: true,
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 1,
                },
            },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3,
            },
            repulse: {
                distance: 200,
                duration: 0.4,
            },
            push: {
                particles_nb: 4,
            },
            remove: {
                particles_nb: 2,
            },
        },
    },
    retina_detect: true
});

// Custom cursor functionality
const cursor = document.querySelector('.cursor');
let isMouseStopped = false;
let mouseStoppedTimer;
let isCursorVisible = false;

function updateCursorPosition(event) {
    cursor.style.left = event.clientX + 'px';
    cursor.style.top = event.clientY + 'px';
}

function customCursorHandler(event) {
    if (!isCursorVisible) {
        isCursorVisible = true;
        cursor.style.opacity = '1';
    }

    updateCursorPosition(event);

    if (!isMouseStopped) {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        clearTimeout(mouseStoppedTimer);
        isMouseStopped = true;
    }

    mouseStoppedTimer = setTimeout(() => {
        isMouseStopped = false;
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 100);

    cursorInteractionFeedback();
}

function cursorClickAnimation() {
    cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    setTimeout(() => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
    }, 100);
}

function cursorInteractionFeedback() {
    document.querySelectorAll('a, button, [role="button"]').forEach(element => {
        element.addEventListener('mouseover', () => {
            cursor.style.borderColor = '#00ff00';
        });
        element.addEventListener('mouseout', () => {
            cursor.style.borderColor = '#ff3333';
        });
    });
}

document.addEventListener('mousemove', event => {
    customCursorHandler(event);
    requestAnimationFrame(() => cursor.style.opacity = '0');
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;
    updateCursorPosition({
        clientX: event.clientX + scrollX,
        clientY: event.clientY + scrollY,
    });
});

document.addEventListener('click', cursorClickAnimation);

// Project popup functionality
document.addEventListener('DOMContentLoaded', () => {
    const projects = [{
            title: "Lens Supplier System",
            description: "A comprehensive e-commerce platform for a fictional lens supplier, providing opticians with an intuitive shopping experience. Designed and implemented a robust admin panel for efficient inventory management, order processing, and customer support.\n\n" +
                "• Comprehensive Inventory Management: Developed a robust inventory management system within the admin panel, allowing for accurate tracking and efficient management of product stock.\n" +
                "• Streamlined Order Processing: Designed an efficient admin panel that reduced order processing time by 30%, enhancing operational efficiency.\n" +
                "• User-Friendly Cart: Designed an intuitive shopping cart that streamlined the purchasing process, resulting in increased conversion rates.\n\n" +
                "Technologies: HTML, CSS, JavaScript, PHP, MySQL",
            image: "Image/Project 1.png",
            websiteLink: "https://example.com/project1",
            githubLink: "https://github.com/Aqours66/Project-FYP",
        },
        {
            title: "Book Store",
            description: "User Authentication and Profiles: Developed a secure user authentication system using . Users can create accounts, log in, and manage their profiles, including viewing their purchase history and wishlist. \n" +
                "Secure Payment Gateway: Integrated with leading payment gateways (e.g., Stripe, PayPal) to ensure secure and seamless transactions. The checkout process is streamlined for user convenience.\n" +
                "Admin Dashboard: Built an admin dashboard for managing inventory, orders, users, and reviews. The dashboard includes analytics and reporting tools to help administrators make informed decisions.\n" +
                "Technologies: HTML, CSS, JavaScript, PHP, MYSQL",
            image: "Image/Project 5.png",
            websiteLink: "",
            githubLink: "https://github.com/Aqours66/book-store",
        },
        {
            title: "React Chat App",
            description: "Technology: Built with React, styled with CSS, and powered by Firebase.  \n" +
                "Features:\n" +
                "User registration and login.\n" +
                "Real-time chat with multiple users.\n" +
                "Ability to add and block users.\n" +
                "Secure logout functionality.\n" +
                " Purpose: Facilitates seamless and secure communication, ideal for both personal and professional use cases.",
            image: "Image/Project 7.png",
            websiteLink: "https://example.com/newproject",
            githubLink: "https://github.com/Aqours66/ReactChatApp",
        },
        {
            title: "Click Game",
            description: "A Simple Click Game.\n" +
                "Technologies: Html, CSS, JavaScript",
            image: "Image/Project 2.png",
            websiteLink: "https://aqours66.github.io/Click-Game/",
            githubLink: "https://github.com/Aqours66/Click-Game",
        },
        {
            title: "Color-Picker-React",
            description: "A Simple Color Picker. \n" +
                "Technologies: React",
            image: "Image/Project 3.png",
            websiteLink: "https://color-picker-reacttesting.netlify.app/",
            githubLink: "https://github.com/Aqours66/Color-Picker-React",
        },
        {
            title: "Task Manager",
            description: "A Simple Task Manager. \n" +
                "Technologies: HTML, CSS, JavaScript",
            image: "Image/Project 4.png",
            websiteLink: "https://aqours66.github.io/Task-Management/",
            githubLink: "https://github.com/Aqours66/Task-Management",
        },

        {
            title: "QR Code Generator",
            description: "A QR Code generator using html css and javascript \n" +
                "",
            image: "Image/Project 6.png",
            websiteLink: "https://aqours66.github.io/Qr-code-generator/",
            githubLink: "https://github.com/Aqours66/Qr-code-generator",
        },

        // Add more projects as needed


    ];





    function handleWorkClick(event) {
        const index = event.currentTarget.dataset.index;
        const project = projects[index];
        const popupContainer = document.getElementById("popupContainer");
        const popupTitle = document.getElementById("popupTitle");
        const popupImage = document.getElementById("popupImage");
        const popupDescription = document.getElementById("popupDescription");
        const websiteButton = document.getElementById("websiteButton");
        const githubButton = document.getElementById("githubButton");

        websiteButton.href = project.websiteLink;
        githubButton.href = project.githubLink;

        popupTitle.innerText = project.title;
        popupDescription.innerText = project.description;
        popupImage.src = project.image;
        popupContainer.style.display = "block";
    }

    function handleCloseClick() {
        document.getElementById("popupContainer").style.display = "none";
    }

    document.querySelectorAll(".work").forEach((work, index) => {
        work.addEventListener("click", handleWorkClick);
        work.dataset.index = index;
    });

    document.getElementById("closeButton").addEventListener("click", handleCloseClick);
});

// Intersection observer for work items
const workItems = document.querySelectorAll(".work");
const workObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });
workItems.forEach(work => {
    workObserver.observe(work);
});
workObserver.observe(workItems[0]);

// Popup appearance based on intersection
const popupContainer = document.getElementById("popupContainer");
const popupObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            popupContainer.classList.add("popup-appear");
        }
    });
}, { threshold: 0.2 });
popupObserver.observe(popupContainer);

// Download resume popup
document.querySelector('.download-button').addEventListener('click', event => {
    event.preventDefault();
    document.querySelector('.resume-popup').style.display = 'block';
});

// Close button functionality for resume popup
document.querySelector('.resume-popup .close-button').addEventListener('click', () => {
    document.querySelector('.resume-popup').style.display = 'none';
});

// Function to open project website in new tab
document.getElementById("websiteButton").addEventListener("click", event => {
    event.preventDefault();
    window.open(event.target.href, "_blank");
});

// Function to open GitHub repository in new tab
document.getElementById("githubButton").addEventListener("click", event => {
    event.preventDefault();
    window.open(event.target.href, "_blank");
});

function showSection(sectionId) {
    const sections = document.querySelectorAll('.section-content');
    sections.forEach(section => {
        if (section.id === sectionId) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
}

// Initially show the Skills section
showSection('skills-content');

// Add event listeners for the navigation items
const navItems = document.querySelectorAll('.unique-about-nav-item');
navItems.forEach(item => {
    item.addEventListener('click', function() {
        showSection(this.getAttribute('onclick').replace('showSection(\'', '').replace('\')', ''));
    });
});