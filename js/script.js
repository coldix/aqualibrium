/*
Website: https://aqualibrium.oze.au/
Author: Colin Dixon
Version: 26.03.014
Date: Thursday, 19/03/2026 | 02:40 AM AEDT
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

    /* -------------------------------------------------------------------------- */
    /* Booking Form Pricing Calculation */
    /* -------------------------------------------------------------------------- */
    
    const tourSelect = document.getElementById('tour');
    const groupSizeInput = document.getElementById('group-size');
    const neutralMsg = document.getElementById('pricing-neutral');
    const invalidMsg = document.getElementById('pricing-invalid');
    const detailsBlock = document.getElementById('pricing-details');
    
    const summaryPp = document.getElementById('summary-pp');
    const summarySize = document.getElementById('summary-size');
    const summaryTotal = document.getElementById('summary-total');
    
    const formPricePp = document.getElementById('form-price-pp');
    const formPriceTotal = document.getElementById('form-price-total');
    
    const tourPricing = {
        kayak_snorkel: { 2: 520, 3: 395, 4: 320, 5: 275, 6: 240 },
        ebike_swim: { 2: 420, 3: 310, 4: 260, 5: 225, 6: 195 },
        easy_water: { 4: 200, 5: 170, 6: 150 }
    };
    
    function updatePricing() {
        if (!tourSelect || !groupSizeInput) return;
        
        const tour = tourSelect.value;
        const sizeStr = groupSizeInput.value;
        const size = parseInt(sizeStr, 10);
        
        neutralMsg.classList.add('hidden');
        invalidMsg.classList.add('hidden');
        detailsBlock.classList.add('hidden');
        
        formPricePp.value = "";
        formPriceTotal.value = "";
        
        if (!tour || !sizeStr || isNaN(size) || size < 1) {
            neutralMsg.classList.remove('hidden');
            return;
        }
        
        const prices = tourPricing[tour];
        if (!prices || !prices[size]) {
            invalidMsg.classList.remove('hidden');
            return;
        }
        
        const pricePp = prices[size];
        const total = pricePp * size;
        
        summaryPp.textContent = '$' + pricePp;
        summarySize.textContent = size;
        summaryTotal.textContent = '$' + total;
        
        formPricePp.value = '$' + pricePp;
        formPriceTotal.value = '$' + total;
        
        detailsBlock.classList.remove('hidden');
    }
    
    if (tourSelect && groupSizeInput) {
        tourSelect.addEventListener('change', updatePricing);
        groupSizeInput.addEventListener('input', updatePricing);
    }
    
    /* -------------------------------------------------------------------------- */
    /* Form Submit to Mailto Logic */
    /* -------------------------------------------------------------------------- */
    
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            
            const tourSelectBox = document.getElementById('tour');
            const tourName = tourSelectBox.options[tourSelectBox.selectedIndex].text;
            
            const groupSize = document.getElementById('group-size').value;
            const preferredDate = document.getElementById('preferred-date').value;
            const notes = document.getElementById('notes').value;
            
            const formPriceTotal = document.getElementById('form-price-total').value;
            
            const subject = encodeURIComponent(`Booking Request - ${tourName}`);
            
            const bodyLines = [
                `Name: ${name}`,
                `Email: ${email}`,
                `Phone: ${phone}`,
                `Preferred Tour: ${tourName}`,
                `Group Size: ${groupSize}`,
                `Preferred Date: ${preferredDate}`,
                `Estimated Total: ${formPriceTotal || 'Pending'}`,
                ``,
                `Message:`,
                notes
            ];
            
            const body = encodeURIComponent(bodyLines.join('\n'));
            
            window.location.href = `mailto:inspire@aqualibrium.com.au?subject=${subject}&body=${body}`;
        });
    }
});
