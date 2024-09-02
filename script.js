const buttons = document.querySelectorAll('.toggle-button');
buttons.forEach(button=>{
    button.addEventListener('click', () => {
        // Remove 'active' class from the currently active button
        document.querySelector('.toggle-button.active').classList.remove('active');
        
        // Add 'active' class to the clicked button
        button.classList.add('active');
    });
})


// Select the drag button and the carousel container
const dragButton = document.querySelector('.drag');
const carousel = document.querySelector('.carousel');

// Clone the first and last items for infinite looping
const firstItems = Array.from(carousel.children).slice(0, 5); // Adjust to the number of visible items
const lastItems = Array.from(carousel.children).slice(-5);

firstItems.forEach(item => {
    const clone = item.cloneNode(true);
    carousel.appendChild(clone);
});

lastItems.forEach(item => {
    const clone = item.cloneNode(true);
    carousel.insertBefore(clone, carousel.firstChild);
});

// Set initial scroll position to the first real item
carousel.scrollLeft = carousel.clientWidth;

// Function to scroll the carousel to the right
// const scrollRight = () => {
//     const scrollAmount = carousel.clientWidth / 5; // Adjust the scroll amount to move one item at a time
//     carousel.scrollBy({
//         left: scrollAmount,
//         behavior: 'smooth'
//     });

//     // Check if we need to reset to create the infinite loop effect
//     setTimeout(() => {
//         if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth) {
//             carousel.scrollLeft = carousel.clientWidth;
//         }
//         applyActiveClass();
//     }, 300); // Adjust timeout to match the duration of the smooth scroll
// };
// Function to scroll the carousel to the right by one card width
const scrollRight = () => {
    const cardWidth = carousel.querySelector('.card').clientWidth + 16; // Adding the gap (16px) to the card width
    carousel.scrollBy({
        left: cardWidth, // Scroll by one card width
        behavior: 'smooth'
    });

    // Check if we need to reset to create the infinite loop effect
    setTimeout(() => {
        if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth) {
            carousel.scrollLeft = carousel.clientWidth;
        }
        applyActiveClass();
    }, 300); // Adjust timeout to match the duration of the smooth scroll
};
// Add click event listener to the drag button
dragButton.addEventListener('click', scrollRight);

// Function to apply the 'active' class to the middle image based on scroll position
const applyActiveClass = () => {
    const carouselItems = document.querySelectorAll('.carousel-wrapper .card');
    const middlePosition = carousel.scrollLeft + (carousel.clientWidth / 2);
    console.log(middlePosition,carousel.clientWidth/2, "ppp");
    

    carouselItems.forEach(item => {
        const itemCenter = item.offsetLeft + (item.clientWidth / 2);
        if (Math.abs(itemCenter - middlePosition) < item.clientWidth / 2) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
};

// Initial call to set the correct image as active
applyActiveClass();



const menuButton = document.querySelector('.menu-button');
const drawer = document.querySelector('.drawer');
// Apply the active class whenever the carousel is scrolled
carousel.addEventListener('scroll', applyActiveClass);
menuButton.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent the event from bubbling up
    menuButton.classList.toggle('active');
    drawer.classList.toggle('active');
});

window.addEventListener('click', () => {
    menuButton.classList.remove('active');
    drawer.classList.remove('active');
});
// menuButton.addEventListener('click', () => {
//     menuButton.classList.toggle('active');
//     drawer.classList.toggle('active');
// });

