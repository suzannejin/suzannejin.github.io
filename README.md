# Minimalist Terminal Theme

A minimalist, terminal-style Jekyll theme for personal websites and portfolios. It features a typing animation, a command-line interface feel, and a clean, dark aesthetic.
Check out the [demo](https://suzannejin.github.io/minimalist-terminal-theme/)!

![alt text](/assets/images/screenshot.png)

## Features

- 🖥️ **Terminal Interface**: A realistic terminal look with typing animations.
- 📄 **Single Page Application Feel**: Smooth transitions between sections (About, Projects, Blog, Contact) without page reloads.
- 🌗 **Dark/Light Mode**: Toggle between dark and light themes.
- 📱 **Responsive Design**: Works great on desktop and mobile.
- 📝 **Easy Configuration**: Customize your info in `_config.yml`.

## Installation

### GitHub Pages (Recommended)

1.  **Fork this repository**.
2.  Go to **Settings** > **Pages**.
3.  Select the **Source** as `main` branch (or `master`).
4.  Your site should be live at `https://yourusername.github.io/minimalist-terminal-theme/` (or just `https://yourusername.github.io` if you renamed the repo).

### Local Development

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/minimalist-terminal-theme.git
    cd minimalist-terminal-theme
    ```
2.  Install dependencies:
    ```bash
    bundle install
    ```
3.  Run the server:
    ```bash
    bundle exec jekyll serve
    ```
4.  Open `http://localhost:4000` in your browser.

## Configuration

Open `_config.yml` to customize your site.

### Basic Info

Update the following fields with your information:

```yaml
title: Your Name
description: Personal website and portfolio
url: "https://yourusername.github.io"
username: yourusername
intro_text: "Hi, I am Your Name 👋"
```

### Social Links

Add your social media links in the `links` section. Leave them empty or remove them if you don't want them to appear.

```yaml
links:
  github: https://github.com/yourusername
  linkedin: https://linkedin.com/in/yourusername
  x: https://x.com/yourusername
  scholar: https://scholar.google.com/citations?user=YOUR_ID&hl=en
  email: your.email[at]example[dot]com
  cv: "#" # Link to your CV PDF
```

## Adding Content

### About Me

Edit `_includes/about-content.md`. This file supports standard Markdown. You can add your bio, skills, education, and experience here.

### Projects

To add a project, create a new Markdown file in the `_projects` directory (e.g., `_projects/my-cool-app.md`).

Front Matter format:

```yaml
---
layout: page
title: "My Cool App"
description: "A brief description of the project."
---

# Project Details

Write more about your project here...
```

### Blog Posts

To add a blog post, create a new Markdown file in the `_posts` directory using the format `YYYY-MM-DD-title.md`.

Front Matter format:

```yaml
---
layout: post
title: "My First Post"
date: 2023-11-22 12:00:00 +0100
---

# Hello World

Write your post content here...
```

### Contact

The contact section uses the email defined in `_config.yml`. You can customize the `_includes/pages/contact.html` file if you want to add a form or other contact methods.

## Customization

### Colors

You can customize the colors in `_sass/_variables.scss` (if it exists) or directly in `assets/css/style.css`.

### Terminal Animation

The terminal animation logic is in `assets/js/script.js`. You can adjust the typing speed or the commands shown there.

## License

MIT License. Feel free to use and modify this theme for your personal website.
