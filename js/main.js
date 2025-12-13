// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const dropdowns = document.querySelectorAll('.dropdown');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Dropdown Menu for Mobile
dropdowns.forEach(dropdown => {
    const dropdownLink = dropdown.querySelector('a');
    dropdownLink.addEventListener('click', (e) => {
        if (window.innerWidth <= 968) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        }
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Search Toggle
const searchToggle = document.querySelector('.search-toggle');
const searchBar = document.querySelector('.search-bar');

if (searchToggle) {
    searchToggle.addEventListener('click', (e) => {
        e.preventDefault();
        searchBar.classList.toggle('active');
    });
}

// Hero Slider
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// RTL: Swap prev/next for RTL layout
if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });
}

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

// Auto-slide
setInterval(() => {
    showSlide(currentSlide + 1);
}, 5000);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Form submissions with Arabic messages
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('شكراً لاشتراككم في نشرتنا الإخبارية!');
        newsletterForm.reset();
    });
}

const footerContactForm = document.querySelector('.footer-contact-form');
if (footerContactForm) {
    footerContactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('شكراً لرسالتكم! سنتواصل معكم قريباً.');
        footerContactForm.reset();
    });
}

// Contact Form
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('شكراً للتواصل معنا! سنرد عليكم في أقرب وقت ممكن.');
        contactForm.reset();
    });
}

// Application Form
const applicationForm = document.querySelector('.application-form');
if (applicationForm) {
    applicationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('شكراً لتقديم طلبكم! سنراجعه ونتواصل معكم قريباً.');
        applicationForm.reset();
    });
}

// Video Gallery Functionality
function getVideoId(url) {
    // YouTube URL extraction
    if (url.includes('youtube.com/watch?v=')) {
        return url.split('v=')[1].split('&')[0];
    }
    // YouTube short URL extraction
    if (url.includes('youtu.be/')) {
        return url.split('youtu.be/')[1].split('?')[0];
    }
    // Google Drive file ID extraction
    if (url.includes('drive.google.com/file/d/')) {
        return url.split('/d/')[1].split('/')[0];
    }
    return null;
}

function convertToEmbedUrl(url) {
    const videoId = getVideoId(url);
    if (!videoId) return null;
    
    // YouTube URL conversion
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
        return `https://www.youtube.com/embed/${videoId}`;
    }
    // Google Drive URL conversion
    if (url.includes('drive.google.com')) {
        return `https://drive.google.com/file/d/${videoId}/preview`;
    }
    // If already an embed URL, return as is
    if (url.includes('youtube.com/embed/') || (url.includes('drive.google.com/file/d/') && url.includes('/preview'))) {
        return url;
    }
    return null;
}

// Video Modal
const videoModal = document.getElementById('videoModal');
const videoFrame = document.getElementById('videoFrame');
const videoModalClose = document.querySelector('.video-modal-close');
const videoWrappers = document.querySelectorAll('.video-wrapper');

if (videoWrappers.length > 0) {
    videoWrappers.forEach(wrapper => {
        wrapper.addEventListener('click', () => {
            const videoUrl = wrapper.getAttribute('data-video-url');
            const videoType = wrapper.getAttribute('data-video-type');
            
            if (videoUrl) {
                let embedUrl = null;
                
                // Handle local videos
                if (videoType === 'local') {
                    // For local videos, create a video player
                    const modalContainer = document.querySelector('.video-modal-iframe-container');
                    modalContainer.innerHTML = `
                        <video id="localVideoPlayer" controls autoplay style="width:100%; height:100%; border-radius:10px; background:#000;">
                            <source src="${videoUrl}" type="video/mp4">
                            متصفحك لا يدعم تشغيل الفيديو.
                        </video>
                    `;
                    videoModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                    
                    // Ensure video plays
                    setTimeout(() => {
                        const videoPlayer = document.getElementById('localVideoPlayer');
                        if (videoPlayer) {
                            videoPlayer.play().catch(e => console.log('Autoplay prevented:', e));
                        }
                    }, 100);
                } else {
                    // Handle YouTube and Google Drive
                    embedUrl = convertToEmbedUrl(videoUrl);
                    if (embedUrl) {
                        const modalContainer = document.querySelector('.video-modal-iframe-container');
                        modalContainer.innerHTML = `<iframe id="videoFrame" src="${embedUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
                        videoModal.classList.add('active');
                        document.body.style.overflow = 'hidden';
                    } else {
                        alert('رابط الفيديو غير صحيح. يرجى استخدام رابط YouTube أو Google Drive.');
                    }
                }
            }
        });
    });
}

// Function to close modal and stop all videos
function closeVideoModal() {
    videoModal.classList.remove('active');
    const modalContainer = document.querySelector('.video-modal-iframe-container');
    
    // Stop local video if playing
    const localVideo = document.getElementById('localVideoPlayer');
    if (localVideo) {
        localVideo.pause();
        localVideo.src = '';
    }
    
    // Clear container
    modalContainer.innerHTML = '<iframe id="videoFrame" src="" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    document.body.style.overflow = '';
}

// Close modal
if (videoModalClose) {
    videoModalClose.addEventListener('click', closeVideoModal);
}

// Close modal when clicking outside
if (videoModal) {
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            closeVideoModal();
        }
    });
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal && videoModal.classList.contains('active')) {
        closeVideoModal();
    }
});
