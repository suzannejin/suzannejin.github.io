document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    const body = document.body;
    const html = document.documentElement;

    // Check for saved user preference, if any, on load of the website
    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

    function setTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }

    if (currentTheme) {
        setTheme(currentTheme);
    } else {
        // Default to dark
        setTheme('dark');
    }

    themeToggleBtn.addEventListener('click', () => {
        let theme = html.getAttribute('data-theme');
        if (theme === 'dark') {
            theme = 'light';
        } else {
            theme = 'dark';
        }
        setTheme(theme);
    });

    // Typing Animation
    const cmd1 = document.getElementById('cmd1');
    const cursor1 = document.getElementById('cursor1');
    const output1 = document.getElementById('output1');

    const line2 = document.getElementById('line2');
    const cmd2 = document.getElementById('cmd2');
    const cursor2 = document.getElementById('cursor2');
    const output2 = document.getElementById('output2');

    const line3 = document.getElementById('line3');
    const cmd3 = document.getElementById('cmd3');
    const cursor3 = document.getElementById('cursor3');
    const output3 = document.getElementById('output3');

    const line4 = document.getElementById('line4');
    const cmd4 = document.getElementById('cmd4');
    const cursor4 = document.getElementById('cursor4');
    const output4 = document.getElementById('output4');

    const line5 = document.getElementById('line5');

    async function typeText(element, text, delay = 100) {
        for (let i = 0; i < text.length; i++) {
            element.textContent += text.charAt(i);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }

    async function runSequence() {
        if (sessionStorage.getItem('terminalAnimationRun')) {
            // Skip animation
            cmd1.textContent = 'cat intro.txt';
            cursor1.style.display = 'none';
            output1.classList.remove('hidden');

            line2.classList.remove('hidden');
            cmd2.textContent = 'ls links/';
            cursor2.style.display = 'none';
            output2.classList.remove('hidden');

            line3.classList.remove('hidden');
            cmd3.textContent = 'ls functions/';
            cursor3.style.display = 'none';
            output3.classList.remove('hidden');

            line4.classList.remove('hidden');
            cmd4.textContent = 'ls other/';
            cursor4.style.display = 'none';
            output4.classList.remove('hidden');

            line5.classList.remove('hidden');
        } else {
            // Run animation
            // Initial delay
            await new Promise(resolve => setTimeout(resolve, 500));

            // Type first command
            cursor1.classList.add('typing');
            await typeText(cmd1, 'cat intro.txt', 50);
            cursor1.classList.remove('typing');
            cursor1.style.display = 'none'; // Hide cursor after typing

            // Show output 1
            await new Promise(resolve => setTimeout(resolve, 200));
            output1.classList.remove('hidden');

            // Show line 2
            await new Promise(resolve => setTimeout(resolve, 200));
            line2.classList.remove('hidden');

            // Type second command
            await new Promise(resolve => setTimeout(resolve, 300));
            cursor2.classList.add('typing');
            await typeText(cmd2, 'ls links/', 50);
            cursor2.classList.remove('typing');
            cursor2.style.display = 'none';

            // Show output 2
            await new Promise(resolve => setTimeout(resolve, 200));
            output2.classList.remove('hidden');

            // Show line 3
            await new Promise(resolve => setTimeout(resolve, 200));
            line3.classList.remove('hidden');

            // Type third command
            await new Promise(resolve => setTimeout(resolve, 300));
            cursor3.classList.add('typing');
            await typeText(cmd3, 'ls functions/', 50);
            cursor3.classList.remove('typing');
            cursor3.style.display = 'none';

            // Show output 3
            await new Promise(resolve => setTimeout(resolve, 200));
            output3.classList.remove('hidden');

            // Show line 4
            await new Promise(resolve => setTimeout(resolve, 200));
            line4.classList.remove('hidden');

            // Type fourth command
            await new Promise(resolve => setTimeout(resolve, 300));
            cursor4.classList.add('typing');
            await typeText(cmd4, 'ls other/', 50);
            cursor4.classList.remove('typing');
            cursor4.style.display = 'none';

            // Show output 4
            await new Promise(resolve => setTimeout(resolve, 200));
            output4.classList.remove('hidden');

            // Show line 5 (final prompt)
            await new Promise(resolve => setTimeout(resolve, 200));
            line5.classList.remove('hidden');

            // Set flag
            sessionStorage.setItem('terminalAnimationRun', 'true');
        }
    }

    runSequence();

    // Navigation Logic
    const terminalContainer = document.querySelector('.terminal-container');
    const links = document.querySelectorAll('#output3 .link-item');
    const homeBtns = document.querySelectorAll('.home-btn');
    const pages = document.querySelectorAll('.full-page');

    function showPage(pageId) {
        if (!terminalContainer) return;
        terminalContainer.style.display = 'none';
        pages.forEach(page => {
            if (page.id === pageId) {
                page.classList.remove('hidden');
                if (pageId === 'page-gallery') {
                    setTimeout(initGallery, 100);
                }
            } else {
                page.classList.add('hidden');
            }
        });
    }

    function showTerminal() {
        if (!terminalContainer) return;
        pages.forEach(page => page.classList.add('hidden'));
        terminalContainer.style.display = 'block';
    }

    function handleHashChange() {
        if (!terminalContainer) return;
        const hash = window.location.hash.substring(1); // Remove #
        if (hash) {
            const targetPageId = 'page-' + hash;
            if (document.getElementById(targetPageId)) {
                showPage(targetPageId);
            } else {
                showTerminal();
            }
        } else {
            showTerminal();
        }
    }

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('data-target');
            if (!targetId) return; // Allow normal links to work

            e.preventDefault();
            const hash = targetId.replace('page-', '');
            history.pushState({
                page: targetId
            }, '', '#' + hash);
            showPage(targetId);
        });
    });

    homeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (terminalContainer) {
                history.pushState({
                    page: 'terminal'
                }, '', window.location.pathname);
                showTerminal();
            } else {
                window.location.href = '/';
            }
        });
    });

    // Menu Logic
    const menuBtns = document.querySelectorAll('.menu-btn');
    const menuLinks = document.querySelectorAll('.menu-link');

    menuBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent click from closing immediately
            const dropdown = btn.nextElementSibling;
            // Close other dropdowns first
            document.querySelectorAll('.menu-dropdown').forEach(d => {
                if (d !== dropdown) d.classList.add('hidden');
            });
            dropdown.classList.toggle('hidden');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.menu-container')) {
            document.querySelectorAll('.menu-dropdown').forEach(d => {
                d.classList.add('hidden');
            });
        }
    });

    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('data-target');
            if (!targetId) return; // Allow normal links to work

            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault();
                const hash = targetId.replace('page-', '');
                history.pushState({
                    page: targetId
                }, '', '#' + hash);
                showPage(targetId);
            } else {
                // If target doesn't exist on this page, go to home page with hash
                e.preventDefault();
                const hash = targetId.replace('page-', '');
                window.location.href = '/#' + hash;
            }

            // Close all dropdowns
            document.querySelectorAll('.menu-dropdown').forEach(d => {
                d.classList.add('hidden');
            });
        });
    });

    window.addEventListener('popstate', (event) => {
        if (terminalContainer && typeof handleHashChange === 'function') {
            handleHashChange();
        }
        // Ensure menu is closed on back/forward
        document.querySelectorAll('.menu-dropdown').forEach(d => {
            d.classList.add('hidden');
        });
    });

    // Initial check
    if (terminalContainer && typeof handleHashChange === 'function') {
        handleHashChange();
    }

    // Gallery Logic
    function initGallery() {
        const container = document.getElementById('photosContainer');
        const photos = document.querySelectorAll('.gallery-photo');
        const modal = document.getElementById('lightboxModal');
        const modalImg = document.getElementById('lightboxImage');
        const closeBtn = document.querySelector('.lightbox-close');

        if (!container || photos.length === 0) return;

        const containerWidth = container.offsetWidth;

        // Diagonal Cascade Configuration
        let currentX = 20; // Start with some left padding
        let currentY = 50; // Start with some top padding

        photos.forEach((photo, index) => {
            // Random dimensions
            const width = Math.floor(Math.random() * 200) + 300;
            const height = 400; // Fixed height

            photo.style.width = `${width}px`;
            photo.style.height = `${height}px`;

            // Check Bounds (Wrap) BEFORE placing
            // If the current position + width exceeds container width, wrap to left
            if (currentX + width > containerWidth) {
                currentX = Math.floor(Math.random() * 50) + 20; // Reset to left with slight random
                currentY += 150; // Move down when wrapping
            }

            // Apply Position
            photo.style.left = `${currentX}px`;
            photo.style.top = `${currentY}px`;

            // Calculate Step for NEXT photo

            // Horizontal Step: User Request
            // Starting point X of the next photo can fluctuate randomly
            // between half and ending point of X of the previous photo
            const minStepX = width / 2;
            const maxStepX = width;
            const stepX = Math.floor(Math.random() * (maxStepX - minStepX)) + minStepX;

            // Vertical Step: Restore previous rules
            // Probabilistic Overlap: 50% chance to overlap vertically
            const overlapChance = Math.random();
            let stepY;

            if (overlapChance > 0.5) {
                // Overlap: We want the NEXT photo to start such that it overlaps THIS photo vertically by 5-20%
                // This means we move DOWN by (height - overlap)
                const overlapFractionY = (Math.random() * 0.15) + 0.05; // 0.05 to 0.20
                stepY = height - (height * overlapFractionY);
            } else {
                // No Overlap: Move down significantly
                stepY = height * 0.5; // Move down by half height (cascading down)
            }

            currentX += stepX;
            currentY += stepY;

            photo.style.zIndex = Math.floor(Math.random() * 10);

            requestAnimationFrame(() => {
                photo.classList.remove('fade-in-hidden');
                photo.classList.add('fade-in-visible');
            });

            // Click to open lightbox
            photo.onclick = function () {
                modal.style.display = "flex";
                const img = this.querySelector('img');
                modalImg.src = img.dataset.full || img.src;
            }
        });

        // Set container height
        // Add last image height + padding
        container.style.height = `${currentY + 600}px`;

        // Lightbox Close Logic
        if (closeBtn) {
            closeBtn.onclick = function () {
                modal.style.display = "none";
            }
        }

        if (modal) {
            modal.onclick = function (e) {
                if (e.target === modal) {
                    modal.style.display = "none";
                }
            }
        }
    }

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    window.addEventListener('resize', debounce(() => {
        if (document.getElementById('page-gallery') && !document.getElementById('page-gallery').classList.contains('hidden')) {
            initGallery();
        }
    }, 250));
});
