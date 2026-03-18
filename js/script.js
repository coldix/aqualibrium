/*
Website: https://aqualibrium.oze.au/
Author: Colin Dixon
Version: 26.03.001
Date: Wednesday, 18/03/2026 | 10:12 PM AEDT
Description: Interactions for Aqualibrium Ocean Adventures
*/

document.addEventListener('DOMContentLoaded', () => {
    
    /* -------------------------------------------------------------------------- */
    /* Theme Toggle Logic */
    /* -------------------------------------------------------------------------- */
    const themeToggleButton = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const THEME_STORAGE_KEY = 'aqualibrium_theme';

    // 1. Initial State Setup
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    } else {
        // Fallback to system preference if no saved preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            htmlElement.setAttribute('data-theme', 'dark');
        } else {
            htmlElement.setAttribute('data-theme', 'light');
        }
    }

    // 2. Click Handler
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem(THEME_STORAGE_KEY, newTheme);
        });
    }

    /* -------------------------------------------------------------------------- */
    /* Dynamic Footer Metadata Injection */
    /* -------------------------------------------------------------------------- */
    
    // 1. Current Year
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Meta tag extraction for Version and Timestamp
    const versionMeta = document.querySelector('meta[name="version"]');
    const timestampMeta = document.querySelector('meta[name="timestamp"]');
    
    const versionOutput = document.getElementById('meta-version');
    const timestampOutput = document.getElementById('meta-timestamp');

    if (versionMeta && versionOutput) {
        versionOutput.textContent = versionMeta.getAttribute('content');
    }

    if (timestampMeta && timestampOutput) {
        timestampOutput.textContent = timestampMeta.getAttribute('content');
    }

    /* -------------------------------------------------------------------------- */
    /* Smooth Scrolling Offset for Sticky Header */
    /* -------------------------------------------------------------------------- */
    
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    const siteHeader = document.querySelector('.site-header');

    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Ignore if it's just "#"
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Keep it lightweight. Get header height to calculate accurate offset
                const headerHeight = siteHeader ? siteHeader.offsetHeight : 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Manage focus for accessibility
                targetElement.setAttribute('tabindex', '-1');
                targetElement.focus();
            }
        });
    });
});
