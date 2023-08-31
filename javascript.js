// Get the element containing the role text and the cursor
const roleText = document.querySelector('.role-text');


// Array of roles to loop through
const roles = ['Front-End Developer', 'Back-End Developer'];

// Function to start the typing animation
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
            // Text typing animation finished, wait for a pause and then clear the text
            setTimeout(() => {
                currentCharIndex = 0;
                roleText.textContent = '';
                currentRoleIndex = (currentRoleIndex + 1) % roles.length;
                currentRole = roles[currentRoleIndex];
                setTimeout(typeNextChar, 500); // Pause before typing the next text
            }, 1500); // Time to wait before clearing the text (1500 milliseconds = 1.5 seconds)
        }
    }

    typeNextChar();
}

// Start the typing animation when the page loads
startTypingAnimation();



function showSection(sectionId) {
    const allSections = document.querySelectorAll('.section-content');
    for (let i = 0; i < allSections.length; i++) {
        allSections[i].classList.remove('open');
    }

    const selectedSection = document.getElementById(sectionId);
    selectedSection.classList.add('open');
}


// Smooth scrolling function
function smoothScroll(target, duration) {
    var targetElement = document.querySelector(target);
    var targetPosition = targetElement.getBoundingClientRect().top;
    var startPosition = window.pageYOffset;
    var distance = targetPosition - startPosition;
    var startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;
        var scrollAmount = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, scrollAmount);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    // Easing function for smooth animation
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Add smooth scrolling behavior to anchor links
var anchorLinks = document.querySelectorAll('a[href^="#"]');
anchorLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        var target = this.getAttribute('href');
        var duration = 1000; // Set the desired duration for smooth scrolling (in milliseconds)
        smoothScroll(target, duration);
    });
});



const burger = document.querySelector('.header-burger');
const nav = document.querySelector('.header-nav');

burger.addEventListener('click', () => {
    nav.classList.toggle('open');
});


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


// Initialize particles
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
    retina_detect: true,
});


const cursor = document.querySelector('.cursor');
let isMouseStopped = false;
let mouseStoppedTimer;
let isCursorVisible = false;

// Update cursor position
function updateCursorPosition(event) {
    cursor.style.left = event.clientX + 'px';
    cursor.style.top = event.clientY + 'px';
}

// Custom cursor animation handler
function customCursorHandler(event) {
    if (!isCursorVisible) {
        isCursorVisible = true;
        cursor.style.opacity = '1';
    }

    updateCursorPosition(event);

    if (!isMouseStopped) {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)'; // Custom animation when mouse moves
        clearTimeout(mouseStoppedTimer);
        isMouseStopped = true;
    }

    mouseStoppedTimer = setTimeout(() => {
        isMouseStopped = false;
        cursor.style.transform = 'translate(-50%, -50%) scale(1)'; // Custom animation when mouse stops
    }, 100); // You can adjust the time (in milliseconds) for considering the mouse stopped

    cursorInteractionFeedback();
}

// Function to hide cursor after some idle time
function hideCursor() {
    cursor.style.opacity = '0';
    isCursorVisible = false;
}

// Custom animation for cursor click
function cursorClickAnimation() {
    cursor.style.transform = 'translate(-50%, -50%) scale(0.8)'; // Scale down on click
    setTimeout(() => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)'; // Restore to normal size after click
    }, 100);
}

function cursorInteractionFeedback() {
    const clickableElements = document.querySelectorAll('a, button, [role="button"]');
    clickableElements.forEach((element) => {
        element.addEventListener('mouseover', () => {
            cursor.style.borderColor = '#00ff00'; // Change border color on hover
        });
        element.addEventListener('mouseout', () => {
            cursor.style.borderColor = '#ff3333'; // Restore border color after hover
        });
    });
}


// Add the custom cursor event listener and position correction when the page loads
document.addEventListener('mousemove', (event) => {
    customCursorHandler(event);
    requestAnimationFrame(hideCursor); // Throttle cursor visibility with requestAnimationFrame

    // Correct the cursor position when scrolling
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;
    updateCursorPosition({
        clientX: event.clientX + scrollX,
        clientY: event.clientY + scrollY,
    });
});



// Add click event listener to trigger cursor click animation
document.addEventListener('click', cursorClickAnimation);


document.addEventListener("DOMContentLoaded", function() {
    const projects = [{
            title: "Project Title 1",
            description: "This is the description for Project 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            image: "Image/1331.jpg",
            websiteLink: "https://example.com/project1",
            githubLink: "https://github.com/user/repo1"
        },
        {
            title: "Project Title 2",
            description: "This is the description for Project 2. Vestibulum aliquet lobortis libero at pellentesque.",
            image: "path/to/project2-image.jpg",
        },
        {
            title: "Project Title 3",
            description: "This is the description for Project 3. Ut tincidunt felis non purus tristique scelerisque.",
            image: "path/to/project3-image.jpg",
        },
        {
            title: "Project Title 4",
            description: "This is the description for Project 4. Sed auctor libero in ex iaculis, non egestas tellus dictum.",
            image: "path/to/project4-image.jpg",
        },
        // Add more projects as needed
    ];

    function handleWorkClick(event) {
        const index = event.currentTarget.dataset.index;
        const project = projects[index];

        // Show the popup with the project details
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
        popupImage.src = project.image; // Set the image source
        popupContainer.style.display = "block"; // Show the popup
    }

    // Function to close the popup when the "Close" button is clicked
    function handleCloseClick() {
        const popupContainer = document.getElementById("popupContainer");
        popupContainer.style.display = "none"; // Hide the popup
    }

    // Attach the click event listener to each .work element and store the project index as a data attribute
    const workItems = document.querySelectorAll(".work");
    workItems.forEach((work, index) => {
        work.addEventListener("click", handleWorkClick);
        work.dataset.index = index;
    });

    // Attach the click event listener to the close button of the popup
    const closeButton = document.getElementById("closeButton");
    closeButton.addEventListener("click", handleCloseClick);

    // Function to toggle the visibility of additional projects
    function toggleAdditionalProjects() {
        const additionalProjects = document.querySelector(".additional-projects");
        additionalProjects.classList.toggle("hidden");
    }

    // Attach the click event listener to the "See More" button
    const seeMoreButton = document.querySelector(".see-more-button");
    seeMoreButton.addEventListener("click", toggleAdditionalProjects);
});

// Function to handle the click event on the work items
function handleWorkClick(event) {
    const index = event.currentTarget.dataset.index;
    const project = projects[index];

    // Show the popup with the project details
    const popupContainer = document.getElementById("popupContainer");
    const popupTitle = document.getElementById("popupTitle");
    const popupDescription = document.getElementById("popupDescription");

    popupTitle.innerText = project.title;
    popupDescription.innerText = project.description;
    popupContainer.style.display = "block";
}

// Function to close the popup when the "Close" button is clicked
function handleCloseClick() {
    const popupContainer = document.getElementById("popupContainer");
    popupContainer.style.display = "none"; // Hide the popup
}

// Attach the click event listener to each .work element and store the project index as a data attribute
const workItems = document.querySelectorAll(".work");
workItems.forEach((work, index) => {
    work.addEventListener("click", handleWorkClick);
    work.dataset.index = index;
});

// Attach the click event listener to the close button of the popup
const closeButton = document.getElementById("closeButton");
closeButton.addEventListener("click", handleCloseClick);

// Function to handle the intersection of work items with the viewport
function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            observer.unobserve(entry.target);
        }
    });
}


// Create an Intersection Observer instance
const workObserver = new IntersectionObserver(handleIntersection, {
    root: null,
    rootMargin: "0px",
    threshold: 0.2 // Adjust this threshold value based on your preference
});

// Observe each .work element
workItems.forEach(work => {
    workObserver.observe(work);
});

// Trigger the handleIntersection function once on page load to check if any work items are already in view
workObserver.observe(workItems[0]);


// JavaScript code to handle popup appearance
const popupContainer = document.getElementById("popupContainer");

const popupObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                popupContainer.classList.add("popup-appear");
            }
        });
    }, { threshold: 0.2 } // Adjust the threshold as needed
);

popupObserver.observe(popupContainer);

const downloadButton = document.querySelector('.download-button');
const resumePopup = document.querySelector('.resume-popup');

downloadButton.addEventListener('click', function(event) {
    event.preventDefault();
    resumePopup.style.display = 'block';
});

// JavaScript code for the close button functionality
const popup = document.querySelector('.resume-popup');

function openPopup() {
    popup.style.display = 'block';
}

function closePopup() {
    popup.style.display = 'none';
}

// Attach the openPopup function to the "Download Resume/CV" link outside the popup
const resumeLink = document.querySelector('.download-button');
resumeLink.addEventListener('click', openPopup);