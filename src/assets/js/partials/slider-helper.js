
export function handleSliderNavigation(slider) {
    let prevBtn = slider?.querySelector('.slider-prev');
    let nextBtn = slider?.querySelector('.slider-next');
    prevBtn?.addEventListener('click', () => {
        slider?.slidePrev();
    });
    nextBtn?.addEventListener('click', () => {
        slider?.slideNext();
    });
}
