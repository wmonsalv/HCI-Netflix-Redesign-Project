// Navbar scroll effect
window.addEventListener('scroll', () => {
    const nav = document.getElementById('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const simplifyLabel = document.querySelector('.simplify-label');
    const caret = document.querySelector('.caret');
    const menu = document.querySelector('.simplify-menu');
    const menuItems = document.querySelectorAll('.simplify-menu li');
    let activeFilters = new Set();
    let simplified = false;

    function applySimplifyFilters(filters) {
        const sections = document.querySelectorAll('.content-section, .hero');
        sections.forEach(section => {
            // Only show "My List" and "Continue Watching" by default
            const title = section.querySelector('.section-title');
            if (simplified && title) {
                if (filters.has(title.textContent.toLowerCase()) || title.textContent.includes('My List') || title.textContent.includes('Continue Watching')) {
                    section.style.display = '';
                } else {
                    section.style.display = 'none';
                }
            } else {
                section.style.display = '';
            }
        });

        // Hide hero if simplified
        const hero = document.querySelector('.hero');
        if (simplified && hero) hero.style.display = 'none';
        if (!simplified && hero) hero.style.display = '';
    }

    function selectDefaultFilters() {
        activeFilters.clear();
        activeFilters.add('recently-watched');
        activeFilters.add('continue-watching');

        menuItems.forEach(item => {
            if (activeFilters.has(item.dataset.filter)) {
                item.style.backgroundColor = '#333';
            } else {
                item.style.backgroundColor = '';
            }
        });
    }

    // Toggle simplify / de-simplify
    simplifyLabel.addEventListener('click', () => {
        simplified = !simplified;

        if (simplified) {
            selectDefaultFilters();
            simplifyLabel.textContent = 'De-Simplify';
        } else {
            activeFilters.clear();
            menuItems.forEach(item => item.style.backgroundColor = '');
            simplifyLabel.textContent = 'Simplify';
        }

        applySimplifyFilters(activeFilters);
    });

    // Show/hide menu when clicking caret
    caret.addEventListener('click', (e) => {
        e.stopPropagation(); // prevent toggling simplify
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    });

    // Filter selection
    menuItems.forEach(item => {
        item.addEventListener('click', e => {
            e.stopPropagation();
            const filter = item.dataset.filter;

            if (activeFilters.has(filter)) {
                activeFilters.delete(filter);
                item.style.backgroundColor = '';
            } else {
                activeFilters.add(filter);
                item.style.backgroundColor = '#333';
            }

            applySimplifyFilters(activeFilters);

            simplifyLabel.textContent = activeFilters.size > 0 ? 'De-Simplify' : 'Simplify';
        });
    });

    // Close menu if clicking outside
    document.addEventListener('click', () => {
        menu.style.display = 'none';
    });
});





document.addEventListener('DOMContentLoaded', () => {
    const simplifyWrapper = document.querySelector('.simplify-wrapper');
    const simplifyText = simplifyWrapper.querySelector('.simplify-text');
    const simplifyMenu = document.querySelector('.simplify-menu');

    let simplifyActive = false; // track whether simplify mode is active
    const activeFilters = new Set();

    const menuItems = simplifyMenu.querySelectorAll('li');

    // Toggle menu visibility
    simplifyWrapper.addEventListener('click', (e) => {
        if (e.target === simplifyText) {

            // First click: activate default filters
            if (!simplifyActive) {
                activeFilters.add('recently-watched');
                activeFilters.add('continue-watching');

                menuItems.forEach(item => {
                    if (activeFilters.has(item.dataset.filter)) {
                        item.style.backgroundColor = '#333'; // highlight selection
                    }
                });

                applySimplifyFilters(activeFilters);

                simplifyText.textContent = 'De-Simplify';
                simplifyActive = true;
            } else {
                // If menu is open/closed toggle visibility
                simplifyMenu.style.display = simplifyMenu.style.display === 'block' ? 'none' : 'block';
            }
        }
    });

    // Close menu if clicked outside
    document.addEventListener('click', (e) => {
        if (!simplifyWrapper.contains(e.target)) {
            simplifyMenu.style.display = 'none';
        }
    });

    // Handle menu item clicks
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const filter = item.dataset.filter;

            if (activeFilters.has(filter)) {
                activeFilters.delete(filter);
                item.style.backgroundColor = '';
            } else {
                activeFilters.add(filter);
                item.style.backgroundColor = '#333';
            }

            applySimplifyFilters(activeFilters);

            // Update button text
            simplifyText.textContent = activeFilters.size > 0 ? 'De-Simplify' : 'Simplify';
        });
    });
});



function applySimplifyFilters(filters) {
    const sections = document.querySelectorAll('.content-section');
    const hero = document.querySelector('.hero');

    // Hide everything first
    sections.forEach(sec => sec.style.display = 'none');
    if (hero) hero.style.display = 'none';

    filters.forEach(filter => {
        switch(filter) {
            case 'banner':
                if (hero) hero.style.display = 'flex';
                break;
            case 'recently-watched':
                sections.forEach(sec => {
                    const title = sec.querySelector('.section-title')?.textContent || '';
                    if (title.includes("Because you added") || title.includes("Continue Watching")) {
                        sec.style.display = 'block';
                    }
                });
                break;
            case 'continue-watching':
                sections.forEach(sec => {
                    const title = sec.querySelector('.section-title')?.textContent || '';
                    if (title.includes("Continue Watching")) {
                        sec.style.display = 'block';
                    }
                });
                break;
            case 'top-tv-shows':
                sections.forEach(sec => {
                    const title = sec.querySelector('.section-title')?.textContent || '';
                    if (title.includes("We Think You'll Love These") || title.includes("Critically Acclaimed")) {
                        sec.style.display = 'block';
                    }
                });
                break;
            case 'my-list':
                sections.forEach(sec => {
                    const title = sec.querySelector('.section-title')?.textContent || '';
                    if (title.includes("My List")) {
                        sec.style.display = 'block';
                    }
                });
                break;
        }
    });

    // Add padding to body if hero is hidden
    const container = document.body;
    container.style.paddingTop = hero && hero.style.display !== 'none' ? '0' : '70px';
}
