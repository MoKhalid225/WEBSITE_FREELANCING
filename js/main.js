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
    if (!url) return null;
    
    // YouTube URL extraction
    if (url.includes('youtube.com/watch?v=')) {
        const match = url.match(/[?&]v=([^&]+)/);
        return match ? match[1] : null;
    }
    // YouTube short URL extraction
    if (url.includes('youtu.be/')) {
        const match = url.match(/youtu\.be\/([^?]+)/);
        return match ? match[1] : null;
    }
    // Google Drive file ID extraction
    if (url.includes('drive.google.com/file/d/')) {
        const match = url.match(/\/d\/([^\/]+)/);
        return match ? match[1] : null;
    }
    return null;
}

function convertToEmbedUrl(url) {
    if (!url) return null;
    
    // YouTube URL conversion
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
        const videoId = getVideoId(url);
        if (videoId) {
            return `https://www.youtube.com/embed/${videoId}`;
        }
    }
    
    // Google Drive URL conversion
    if (url.includes('drive.google.com')) {
        const fileId = getVideoId(url);
        if (fileId) {
            return `https://drive.google.com/file/d/${fileId}/preview`;
        }
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

// Use event delegation for better performance and to handle dynamically added videos
function initVideoGallery() {
    // Use document-level event delegation to handle all videos
    document.addEventListener('click', (e) => {
        // Find the closest video-wrapper
        const wrapper = e.target.closest('.video-wrapper');
        if (!wrapper) return;
        
        const videoUrl = wrapper.getAttribute('data-video-url');
        const videoType = wrapper.getAttribute('data-video-type');
        
        if (!videoUrl || !videoModal) return;
        
        let embedUrl = null;
        
        // Handle local videos
        if (videoType === 'local') {
            // For local videos, create a video player
            const modalContainer = document.querySelector('.video-modal-iframe-container');
            if (!modalContainer) return;
            
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
                if (!modalContainer) return;
                
                modalContainer.innerHTML = `<iframe id="videoFrame" src="${embedUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
                videoModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            } else {
                console.error('Invalid video URL:', videoUrl);
                alert('رابط الفيديو غير صحيح. يرجى استخدام رابط YouTube أو Google Drive.');
            }
        }
    });
}

// Initialize video gallery
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVideoGallery);
} else {
    initVideoGallery();
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

// News Fetching Function (Can be enhanced with backend API)
// Note: Direct scraping from browser is blocked by CORS
// This function can be used with a backend proxy/API
async function fetchNewsFromUrl(url) {
    try {
        // This would require a backend API endpoint
        // Example: const response = await fetch(`/api/fetch-news?url=${encodeURIComponent(url)}`);
        // For now, return null to indicate manual updates needed
        return null;
    } catch (error) {
        console.error('Error fetching news:', error);
        return null;
    }
}

// News data structure (can be updated manually or via API)
const newsData = [
    {
        title: "نقيب العاملين بالنظافة: طورنا أكبر مقلب قمامة بمنوف بدعم من محافظ المنوفية",
        date: "13 نوفمبر 2024",
        excerpt: "أكد المهندس أمين حسن، النقيب العام للعاملين بالنظافة وتحسين البيئة، أنه تم تنفيذ تجربة جديدة بمحافظة المنوفية بدعم من إحدى الشركات الاستثمارية التي لديها خبرة في مجال إدارة المخلفات الصلبة. وأشار إلى أنه تم استلام مصنع منوف منذ ستة أشهر من محافظة المنوفية، وكان المصنع مُعطل منذ عام 2019 ولا يوجد به أيه معدات ولا خطوط إنتاج.",
        image: "https://darelhilal.com/Images/News/2700522.jpg",
        link: "https://darelhilal.com/News/2700522.aspx"
    },
    {
        title: "نقيب العاملين بالنظافة: رصد 25 مليون جنيه لإعادة تدوير 500 طن يومياً",
        date: "19 نوفمبر 2024",
        excerpt: "أعلن المهندس أمين حسن، النقيب العام للعاملين بالنظافة وتحسين البيئة، عن رصد 25 مليون جنيه لإعادة تدوير 500 طن من المخلفات يومياً. وأكد أن هذا المشروع يعد من أكبر المشروعات البيئية في مصر.",
        image: "https://via.placeholder.com/400x250?text=صورة+الخبر",
        link: "https://www.youm7.com/story/2024/11/19/%D9%86%D9%82%D9%8A%D8%A8-%D8%A7%D9%84%D8%B9%D8%A7%D9%85%D9%84%D9%8A%D9%86-%D8%A8%D8%A7%D9%84%D9%86%D8%B8%D8%A7%D9%81%D8%A9-%D8%B1%D8%B5%D8%AF-25-%D9%85%D9%84%D9%8A%D9%88%D9%86-%D8%AC%D9%86%D9%8A%D9%87-%D9%84%D8%A5%D8%B9%D8%A7%D8%AF%D8%A9-%D8%AA%D8%AF%D9%88%D9%8A%D8%B1-500/6782326"
    },
    {
        title: "أخبار البيئة والمخلفات",
        date: "نوفمبر 2024",
        excerpt: "تابع آخر الأخبار والتطورات في مجال إدارة المخلفات الصلبة والبيئة في مصر والمنطقة العربية.",
        image: "https://via.placeholder.com/400x250?text=صورة+الخبر",
        link: "https://www.albawabhnews.com/5107148"
    }
];

// Function to update news cards (can be called when news data is fetched)
function updateNewsCards(newsArray) {
    const postsGrid = document.querySelector('.posts-grid');
    if (!postsGrid) return;
    
    postsGrid.innerHTML = newsArray.map(news => `
        <article class="post-card">
            <div class="post-image">
                <img src="${news.image}" alt="${news.title}" onerror="this.src='https://via.placeholder.com/400x250?text=صورة+الخبر'">
            </div>
            <div class="post-content">
                <div class="post-date">${news.date}</div>
                <h3>${news.title}</h3>
                <p>${news.excerpt}</p>
                <a href="${news.link}" target="_blank" class="read-more">اقرأ المزيد</a>
            </div>
        </article>
    `).join('');
}

// Photo Gallery - Initialize click handlers for static images
// Images are now loaded statically in HTML for better performance
function initGalleryImages() {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;
    
    // Get all gallery images and add click handlers
    const galleryImages = galleryGrid.querySelectorAll('.gallery-item img');
    galleryImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
            openImageLightbox(img.src);
        });
    });
}

// Image Lightbox Functions
function openImageLightbox(imageSrc) {
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImg = document.getElementById('lightboxImage');
    
    if (lightbox && lightboxImg) {
        lightboxImg.src = imageSrc;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeImageLightbox() {
    const lightbox = document.getElementById('imageLightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Initialize gallery when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        initGalleryImages();
        initImageLightbox();
        initAlbums();
    });
} else {
    initGalleryImages();
    initImageLightbox();
    initAlbums();
}

// Initialize image lightbox event listeners
function initImageLightbox() {
    const lightbox = document.getElementById('imageLightbox');
    const closeBtn = document.querySelector('.lightbox-close');
    
    // Close button click
    if (closeBtn) {
        closeBtn.addEventListener('click', closeImageLightbox);
    }
    
    // Click outside image to close
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeImageLightbox();
            }
        });
    }
    
    // Escape key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
            closeImageLightbox();
        }
    });
}

// Album (simple carousel) - used in Projects page (and reusable elsewhere)
function initAlbums() {
    const albums = document.querySelectorAll('.album');
    if (!albums.length) return;

    albums.forEach((album) => {
        const track = album.querySelector('.album-track');
        const slides = album.querySelectorAll('.album-slide');
        const prevBtn = album.querySelector('.album-prev');
        const nextBtn = album.querySelector('.album-next');
        const dotsContainer = album.querySelector('.album-dots');

        if (!track || slides.length === 0) return;

        let index = 0;

        function update() {
            track.style.transform = `translateX(-${index * 100}%)`;
            if (dotsContainer) {
                const dots = dotsContainer.querySelectorAll('.album-dot');
                dots.forEach((d, i) => d.classList.toggle('active', i === index));
            }
        }

        function setIndex(i) {
            const max = slides.length - 1;
            index = Math.max(0, Math.min(i, max));
            update();
        }

        function next() {
            setIndex(index + 1);
        }

        function prev() {
            setIndex(index - 1);
        }

        // Build dots
        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            slides.forEach((_, i) => {
                const dot = document.createElement('button');
                dot.type = 'button';
                dot.className = 'album-dot' + (i === 0 ? ' active' : '');
                dot.setAttribute('aria-label', `انتقل إلى الصورة ${i + 1}`);
                dot.addEventListener('click', () => setIndex(i));
                dotsContainer.appendChild(dot);
            });
        }

        if (nextBtn) nextBtn.addEventListener('click', next);
        if (prevBtn) prevBtn.addEventListener('click', prev);

        // Click image to zoom (uses existing lightbox if present on the page)
        slides.forEach((slide) => {
            const img = slide.querySelector('img');
            if (!img) return;
            img.addEventListener('click', () => {
                if (typeof openImageLightbox === 'function') {
                    openImageLightbox(img.src);
                }
            });
        });

        update();
    });
}
