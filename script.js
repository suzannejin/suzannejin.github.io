document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const html = document.documentElement;

    // Check for saved user preference, if any, on load of the website
    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

    if (currentTheme) {
        html.setAttribute('data-theme', currentTheme);
    } else {
        // Default to dark
        html.setAttribute('data-theme', 'dark');
    }

    themeToggleBtn.addEventListener('click', () => {
        let theme = html.getAttribute('data-theme');
        if (theme === 'dark') {
            theme = 'light';
        } else {
            theme = 'dark';
        }
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
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
        await typeText(cmd1, 'cat intro.txt', 100);
        cursor1.classList.remove('typing');
        cursor1.style.display = 'none'; // Hide cursor after typing

        // Show output 1
        await new Promise(resolve => setTimeout(resolve, 300));
        output1.classList.remove('hidden');

        // Show line 2
        await new Promise(resolve => setTimeout(resolve, 300));
        line2.classList.remove('hidden');

        // Type second command
        await new Promise(resolve => setTimeout(resolve, 500));
        cursor2.classList.add('typing');
        await typeText(cmd2, 'ls -la links/', 100);
        cursor2.classList.remove('typing');
        cursor2.style.display = 'none';

        // Show output 2
        await new Promise(resolve => setTimeout(resolve, 300));
        output2.classList.remove('hidden');

        // Show line 3 (final prompt)
        await new Promise(resolve => setTimeout(resolve, 300));
        line3.classList.remove('hidden');
    }

    runSequence();
});
