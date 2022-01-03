import BasePage from './basePage';

class Order extends BasePage {

    load() {
        this.highlightSelectedStars();
        this.starsRating();
    }


    // for hovered star ---
    highlightSelectedStars() {
        let hoverClasses = ['hovered', 'text-theme-yellow']
        let rateElements = document.querySelectorAll('.rate-element');
        rateElements.forEach(rateElement => {
            let starElements = rateElement.querySelectorAll('.btn--star');
            rateElement.addEventListener('mouseout', () => {

                // remove hovered state from stars ---
                rateElement.querySelectorAll('.btn--star').forEach(star => {
                    star.classList.remove(...hoverClasses);
                })
            })

            starElements.forEach((starElement, index) => {
                starElement.addEventListener('mouseover', () => {
                    starElement.classList.add(...hoverClasses);
                    if (index <= 1) {
                        starElement.previousElementSibling.tagName === 'BUTTON' ? starElement.previousElementSibling.classList.add(...hoverClasses) : null;
                    } else {
                        for (let i = 0; i < index; i++) {
                            starElements[i].classList.add(...hoverClasses);
                        }
                    }
                })
                starElement.addEventListener('mouseout', () => {
                    starElement.classList.contains(...hoverClasses) ? starElement.classList.remove(...hoverClasses) : null;
                })
            })
        })
    }

    starsRating() {
        let selectedClasses = ['selected', 'text-theme-yellow']
        // Listen for form submissions
        salla.document.event.onSubmit('.rate-element', function (event) {
            // Prevent form from submitting
            event.preventDefault();

            // Get the selected star - activeElement is not supported in safari
            var activeStars = event.target.querySelectorAll('.btn--star.hovered');
            var selected = activeStars[activeStars.length - 1];
            if (!selected) return;
            var selectedIndex = parseInt(selected.dataset.star, 10),
                selectedText = selected.dataset.text;
            event.target.nextElementSibling.innerHTML = selectedText;
            event.target.querySelector('.rating_hidden_input').value = selectedIndex;

            // Get all stars in this form (only search in the form, not the whole document)
            // Loop through each star, and add or remove the `.selected` class to toggle highlighting
            event.target
                .querySelectorAll('.btn--star')
                .forEach(function (star, index) {

                    if (index < selectedIndex) {
                        // Selected star or before it, Add highlighting
                        star.classList.add(...selectedClasses);
                        return;
                    }
                    // After selected star, Remove highlight
                    star.classList.remove(...selectedClasses);
                });

            // Remove aria-pressed from any previously selected star
            var previousRating = event.target.querySelector('.star[aria-pressed="true"]');
            if (previousRating) {
                previousRating.removeAttribute('aria-pressed');
            }

            // Add aria-pressed role to the selected button
            selected.setAttribute('aria-pressed', true);
        });
    }

}

new Order;