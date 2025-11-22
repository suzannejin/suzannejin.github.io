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

    async function typeText(element, text, delay = 100) {
        for (let i = 0; i < text.length; i++) {
            element.textContent += text.charAt(i);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }

    async function runSequence() {
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

        // Show line 4 (final prompt)
        await new Promise(resolve => setTimeout(resolve, 200));
        line4.classList.remove('hidden');
    }

    runSequence();

    // Navigation Logic
    const terminalContainer = document.querySelector('.terminal-container');
    const links = document.querySelectorAll('#output3 .link-item');
    const homeBtns = document.querySelectorAll('.home-btn');
    const pages = document.querySelectorAll('.full-page');

    function showPage(pageId) {
        terminalContainer.style.display = 'none';
        pages.forEach(page => {
            if (page.id === pageId) {
                page.classList.remove('hidden');
            } else {
                page.classList.add('hidden');
            }
        });
    }

    function showTerminal() {
        pages.forEach(page => page.classList.add('hidden'));
        terminalContainer.style.display = 'block';
    }

    function handleHashChange() {
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
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            const hash = targetId.replace('page-', '');
            history.pushState({
                page: targetId
            }, '', '#' + hash);
            showPage(targetId);
        });
    });

    homeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            history.pushState({
                page: 'terminal'
            }, '', window.location.pathname);
            showTerminal();
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
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            const hash = targetId.replace('page-', '');
            history.pushState({
                page: targetId
            }, '', '#' + hash);
            showPage(targetId);
            // Close all dropdowns
            document.querySelectorAll('.menu-dropdown').forEach(d => {
                d.classList.add('hidden');
            });
        });
    });

    window.addEventListener('popstate', (event) => {
        handleHashChange();
        // Ensure menu is closed on back/forward
        document.querySelectorAll('.menu-dropdown').forEach(d => {
            d.classList.add('hidden');
        });
    });

    // Initial check
    handleHashChange();
});
