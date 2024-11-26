// ------------------------ Responsive menu ----------------

// Ensure 'mobile' class is added on load and resize
window.addEventListener("load", addRequiredClasses);
window.addEventListener("resize", addRequiredClasses);

function addRequiredClasses() {
    if (window.innerWidth < 860) {
        document.body.classList.add('mobile');
    } else {
        document.body.classList.remove('mobile');
    }
}

// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    let hamberger = document.querySelector('.hamberger');
    let mobileNav = document.querySelector('.nav-list'); // Adjusted to avoid dependent selector
    let bars = document.querySelectorAll('.hamberger span');
    let isActive = false;

    if (hamberger && mobileNav) {
        hamberger.addEventListener('click', function () {
            mobileNav.classList.toggle('open');
            if (!isActive) {
                bars[0].style.transform = 'rotate(45deg)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg)';
                isActive = true;
            } else {
                bars[0].style.transform = 'rotate(0deg)';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'rotate(0deg)';
                isActive = false;
            }
        });
    } else {
        console.error('Hamberger menu or nav list element not found.');
    }
});
