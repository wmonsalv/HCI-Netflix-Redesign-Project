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
    const simplifyWrapper = document.querySelector('.simplify-wrapper');
    const simplifyLabel = document.querySelector('.simplify-label');
    const caret = document.querySelector('.caret');
    const simplifyMenu = document.querySelector('.simplify-menu');
    const menuItems = simplifyMenu.querySelectorAll('li');

    let simplifyActive = false;
    const activeFilters = new Set();

    // Toggle simplify mode when clicking the label
    simplifyLabel.addEventListener('click', (e) => {
        e.stopPropagation();
        
        if (!simplifyActive) {
            // Activate simplify with default filters
            activeFilters.clear();
            activeFilters.add('my-list');
            activeFilters.add('continue-watching');

            // Highlight default selections
            menuItems.forEach(item => {
                if (activeFilters.has(item.dataset.filter)) {
                    item.style.backgroundColor = '#333';
                } else {
                    item.style.backgroundColor = '';
                }
            });

            applySimplifyFilters(activeFilters);
            simplifyLabel.textContent = 'De-Simplify';
            simplifyActive = true;
        } else {
            // Deactivate simplify mode
            activeFilters.clear();
            menuItems.forEach(item => item.style.backgroundColor = '');
            applySimplifyFilters(activeFilters);
            simplifyLabel.textContent = 'Simplify';
            simplifyActive = false;
            simplifyMenu.style.display = 'none';
        }
    });

    // Toggle menu when clicking caret
    caret.addEventListener('click', (e) => {
        e.stopPropagation();
        simplifyMenu.style.display = simplifyMenu.style.display === 'block' ? 'none' : 'block';
    });

    // Handle menu item clicks
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
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

            // Update button text and state
            if (activeFilters.size > 0) {
                simplifyLabel.textContent = 'De-Simplify';
                simplifyActive = true;
            } else {
                simplifyLabel.textContent = 'Simplify';
                simplifyActive = false;
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!simplifyWrapper.contains(e.target)) {
            simplifyMenu.style.display = 'none';
        }
    });

    function applySimplifyFilters(filters) {
        const sections = document.querySelectorAll('.content-section');
        const hero = document.querySelector('.hero');

        // If no filters, show everything
        if (filters.size === 0) {
            sections.forEach(sec => sec.style.display = 'block');
            if (hero) hero.style.display = 'flex';
            document.body.style.paddingTop = '0';
            return;
        }

        // Hide everything first when filters are active
        sections.forEach(sec => sec.style.display = 'none');
        if (hero) hero.style.display = 'none';

        // Show sections based on active filters
        filters.forEach(filter => {
            switch(filter) {
                case 'banner':
                    if (hero) hero.style.display = 'flex';
                    break;
                case 'recently-watched':
                    sections.forEach(sec => {
                        const title = sec.querySelector('.section-title')?.textContent || '';
                        if (title.includes("Recently Watched")) {
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
                        if (title.includes("Top Searches")) {
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
        document.body.style.paddingTop = hero && hero.style.display !== 'none' ? '0' : '70px';
    }
});