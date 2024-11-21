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

// Hamburger menu toggle
let hamberger = document.querySelector('.hamberger');
let mobileNav = document.querySelector('.mobile .nav-list');
let bars = document.querySelectorAll('.hamberger span');
let isActive = false;

hamberger.addEventListener('click', function() {
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

// Dynamic heading for registration Form
document.addEventListener("DOMContentLoaded", () => {
	const formSections = document.querySelectorAll(".form-section");
	const heading = document.getElementById("dynamic-heading");
	const form = document.getElementById("registration-form");

	form.addEventListener("scroll", () => {
		formSections.forEach((section) => {
			const sectionTop = section.offsetTop - form.scrollTop;
			const sectionHeight = section.offsetHeight;

			if (sectionTop <= 20 && sectionTop + sectionHeight > 20) {
				heading.textContent = section.getAttribute("data-title");
			}
		});
	});
});

		

		
		