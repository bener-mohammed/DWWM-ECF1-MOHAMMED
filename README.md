# Le Phosphore - ECF DWWM 2026

Le Phosphore is a responsive website project created for the DWWM 2026 ECF assessment.

The website presents a live performance venue offering concerts, theatre, stand-up shows, dance performances and cultural events.

## Project context

This project is part of the DWWM training program.
The main goal is to build a responsive front-end website using HTML, SASS, BEM methodology and JavaScript.

The project follows the graphic identity of Le Phosphore, with a warm and elegant visual atmosphere inspired by theatre curtains, stage lighting and live performance venues.

## Technologies

* HTML5
* SASS / SCSS
* CSS3
* BEM methodology
* JavaScript vanilla
* JSON
* Git and GitHub
* GitHub Pages
* VS Code

## Pages

The website currently contains three main pages:

* Home page: `index.html`
* Programming page: `programmation.html`
* Practical information page: `infos-pratiques.html`

## Current features

* Responsive layout for desktop and mobile
* Shared header on all pages
* Shared hero section with stage and curtain visuals
* Transparent navigation bar over the hero section
* Shared information bar
* Shared booking bar
* Services blocks
* Shared footer
* Static programming page structure
* Static practical information page structure
* SASS architecture with separated files
* BEM class naming convention

## Planned JavaScript features

The following features will be added in the next development steps:

* Mobile burger menu
* Dynamic show cards generated from `spectacles.json`
* Show filters by type
* Show filters by date
* Show filters by availability
* Sorting options
* Seat occupancy progress bars
* More information toggle for show descriptions

## Project structure

```text
DWWM-ECF1-mohammed/
│
├── index.html
├── programmation.html
├── infos-pratiques.html
├── README.md
├── package.json
│
├── assets/
│   ├── css/
│   │   └── main.css
│   ├── img/
│   ├── icons/
│   └── data/
│       └── spectacles.json
│
└── src/
    ├── scss/
    │   ├── main.scss
    │   ├── abstracts/
    │   │   └── _variables.scss
    │   ├── base/
    │   │   └── _base.scss
    │   ├── components/
    │   │   ├── _button.scss
    │   │   ├── _header.scss
    │   │   └── _footer.scss
    │   ├── layout/
    │   │   ├── _hero.scss
    │   │   └── _sections.scss
    │   └── pages/
    │       ├── _programming.scss
    │       └── _practical-info.scss
    │
    └── js/
```

## SASS architecture

The SASS files are organized by responsibility:

* `abstracts/`: global variables such as colors, fonts and layout values
* `base/`: reset and global HTML styles
* `components/`: reusable components such as header, buttons and footer
* `layout/`: shared layout sections such as hero, info bar, booking bar and services
* `pages/`: page-specific styles

The main SASS file is:

```text
src/scss/main.scss
```

It is compiled into:

```text
assets/css/main.css
```

## Graphic charter

The website uses the official color palette:

```text
Burgundy: #6B1D3A
Gold: #D4A843
Anthracite: #2A2D34
Cream: #F5F0E8
```

Pure black and pure white are avoided in order to respect the project brief.

## Typography

The project uses two font families:

* Montagu Slab for headings and important visual text
* Montserrat for body text, navigation, buttons and readable content

## Installation

Clone the repository:

```bash
git clone https://github.com/your-username/DWWM-ECF1-mohammed.git
```

Move into the project folder:

```bash
cd DWWM-ECF1-mohammed
```

Install dependencies:

```bash
npm install
```

Run SASS in watch mode:

```bash
npm run sass
```

Then open the project with Live Server from VS Code.

## Available npm scripts

Compile SASS in watch mode:

```bash
npm run sass
```

Build compressed CSS:

```bash
npm run build
```

Format the project files:

```bash
npm run format
```

Lint JavaScript files:

```bash
npm run lint
```

## Deployment

The website can be deployed with GitHub Pages.

Deployment steps:

1. Push the project to GitHub.
2. Open the repository settings.
3. Go to the Pages section.
4. Select the main branch.
5. Save the configuration.
6. Open the generated HTTPS URL.

The project can also be uploaded to an OVH hosting service using SFTP.

## Accessibility

The project includes accessibility-focused choices:

* Semantic HTML structure
* Descriptive page titles
* Accessible navigation labels
* Decorative icons hidden from screen readers
* Responsive layout for mobile devices
* Sufficient contrast using the official color palette
* Clear interactive elements

## Eco-design choices

The project follows basic eco-design principles:

* No unnecessary framework
* No jQuery dependency
* Lightweight HTML structure
* Organized SASS files
* Optimized assets planned before final deployment
* JavaScript added only when needed

## Git workflow

The project is versioned with Git.

Each important step is committed separately, for example:

```text
Add homepage header and hero
Add homepage services and footer styles
Add static programming page structure
Add static practical information page
```

This makes the project history easier to understand and review.

## Author

Project created by Mohammed as part of the DWWM 2026 ECF assessment.
