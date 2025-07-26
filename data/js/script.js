document.addEventListener('DOMContentLoaded', function() {
    const mainMediaContainer = document.querySelector('.main-media-container');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalMedia = document.getElementById('modal-media');
    const modalVideo = document.getElementById('modal-video');
    const modalIndicator = document.getElementById('modal-indicator');
    const modalClose = document.getElementById('modal-close');
    const modalPrev = document.getElementById('modal-prev');
    const modalNext = document.getElementById('modal-next');

    let currentMediaIndex = 0;
    let currentMediaType = 'image';

    const themeToggle = document.createElement('button');
    themeToggle.textContent = 'Сменить тему';
    themeToggle.className = 'theme-btn';
    themeToggle.style.position = 'fixed';
    themeToggle.style.bottom = '20px';
    themeToggle.style.right = '20px';
    themeToggle.style.zIndex = '1000';
    
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateCodeHighlighting();
    }
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
    
    const savedTheme = localStorage.getItem('theme');
    const preferDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(savedTheme || (preferDark ? 'dark' : 'light'));
    document.body.appendChild(themeToggle);

    document.querySelectorAll('.expand-btn').forEach(button => {
        button.addEventListener('click', function() {
            const description = this.closest('.project-card').querySelector('.project-description');
            description.classList.toggle('active');
            this.textContent = description.classList.contains('active') ? 'Свернуть' : 'Развернуть';
        });
    });

    if (typeof marked !== 'undefined' && typeof hljs !== 'undefined') {
        marked.setOptions({
            breaks: true,
            gfm: true,
            highlight: function(code, lang) {
                if (lang && hljs.getLanguage(lang)) {
                    return hljs.highlight(code, { language: lang }).value;
                }
                return hljs.highlightAuto(code).value;
            }
        });

        document.querySelectorAll('.markdown-content').forEach(element => {
            processMarkdownElement(element);
        });
    }

    function processMarkdownElement(element) {
        const rawContent = element.textContent.trim();
        element.innerHTML = marked.parse(rawContent);
        applyMarkdownStyles(element);
        updateCodeHighlighting(element);
    }

    function applyMarkdownStyles(container) {
        container.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
            heading.style.color = 'var(--primary)';
            heading.style.margin = '20px 0 15px';
        });

        container.querySelectorAll('ul, ol').forEach(list => {
            list.style.marginLeft = '25px';
            list.style.marginBottom = '15px';
        });

        container.querySelectorAll('a').forEach(link => {
            link.style.color = 'var(--primary)';
            link.style.textDecoration = 'none';
            link.addEventListener('mouseover', () => link.style.textDecoration = 'underline');
            link.addEventListener('mouseout', () => link.style.textDecoration = 'none');
        });

        container.querySelectorAll('code:not(pre code)').forEach(code => {
            code.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
            code.style.padding = '2px 4px';
            code.style.borderRadius = '3px';
        });
    }

    function updateCodeHighlighting() {
        if (typeof hljs !== 'undefined') {
            document.querySelectorAll('.hljs').forEach(el => {
                el.classList.remove('hljs');
            });

            document.querySelectorAll('pre code').forEach(block => {
                hljs.highlightElement(block);

                if (document.documentElement.getAttribute('data-theme') === 'dark') {
                    block.classList.add('dark-code');
                }
            });
        }
    }

    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (!localStorage.getItem('theme')) {
                applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    function updateModal(index) {
        const thumbnail = thumbnails[index];
        const mediaSrc = thumbnail.getAttribute('data-media');
        const mediaType = thumbnail.getAttribute('data-type');
        
        currentMediaIndex = index;
        currentMediaType = mediaType;
        
        if (mediaType === 'video') {
            modalMedia.style.display = 'none';
            modalVideo.style.display = 'block';
            modalVideo.src = mediaSrc;
            modalVideo.play();
        } else {
            modalVideo.style.display = 'none';
            modalMedia.style.display = 'block';
            modalMedia.src = mediaSrc;
            modalMedia.alt = thumbnail.alt;
        }
        
        modalIndicator.textContent = `${mediaType === 'image' ? 'Изображение' : 'Видео'} ${index + 1}/${thumbnails.length}`;
    }

    function openModal() {
        const activeThumbIndex = Array.from(thumbnails).findIndex(thumb => thumb.classList.contains('active'));
        if (activeThumbIndex >= 0) {
            currentMediaIndex = activeThumbIndex;
            updateModal(currentMediaIndex);
        }
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (currentMediaType === 'video') {
            modalVideo.pause();
        }
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', openModal);
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }

    if (modalPrev) {
        modalPrev.addEventListener('click', function(e) {
            e.stopPropagation();
            let newIndex = currentMediaIndex - 1;
            if (newIndex < 0) newIndex = thumbnails.length - 1;
            updateModal(newIndex);
        });
    }

    if (modalNext) {
        modalNext.addEventListener('click', function(e) {
            e.stopPropagation();
            let newIndex = currentMediaIndex + 1;
            if (newIndex >= thumbnails.length) newIndex = 0;
            updateModal(newIndex);
        });
    }

    document.addEventListener('keydown', function(e) {
        if (modalOverlay.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeModal();
            } else if (e.key === 'ArrowLeft') {
                let newIndex = currentMediaIndex - 1;
                if (newIndex < 0) newIndex = thumbnails.length - 1;
                updateModal(newIndex);
            } else if (e.key === 'ArrowRight') {
                let newIndex = currentMediaIndex + 1;
                if (newIndex >= thumbnails.length) newIndex = 0;
                updateModal(newIndex);
            }
        }
    });

    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', function() {
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            currentMediaIndex = index;

            const mediaSrc = this.getAttribute('data-media');
            const mediaType = this.getAttribute('data-type');

            mainMediaContainer.innerHTML = '';

            if (mediaType === 'video') {
                const video = document.createElement('video');
                video.src = mediaSrc;
                video.controls = true;
                video.autoplay = true;
                video.loop = true;
                video.muted = true;
                video.className = 'main-media';
                mainMediaContainer.appendChild(video);
            } else {
                const img = document.createElement('img');
                img.src = mediaSrc;
                img.className = 'main-media';
                img.alt = this.alt;
                mainMediaContainer.appendChild(img);
            }

            const fullscreenBtnClone = fullscreenBtn.cloneNode(true);
            const indicator = document.createElement('div');
            indicator.className = 'media-indicator';
            indicator.textContent = `${mediaType === 'image' ? 'Изображение' : 'Видео'} ${index + 1}/${thumbnails.length}`;
            
            mainMediaContainer.appendChild(indicator);
            mainMediaContainer.appendChild(fullscreenBtnClone);

            fullscreenBtnClone.addEventListener('click', openModal);

            if (modalOverlay.classList.contains('active')) {
                updateModal(index);
            }
        });
    });

    const versionHeaders = document.querySelectorAll('.version-header');
    versionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const card = this.closest('.version-card');
            card.classList.toggle('active');
        });
    });

    const updateHljsTheme = () => {
        const theme = document.documentElement.getAttribute('data-theme');
        const hljsLight = document.getElementById('hljs-light');
        const hljsDark = document.getElementById('hljs-dark');
        
        if (hljsLight && hljsDark) {
            hljsLight.disabled = theme === 'dark';
            hljsDark.disabled = theme !== 'dark';
        }
    };

    const observer = new MutationObserver(updateHljsTheme);
    observer.observe(document.documentElement, { 
        attributes: true, 
        attributeFilter: ['data-theme'] 
    });
    
    updateHljsTheme();
});
