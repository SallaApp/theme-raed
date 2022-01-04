export default function () {
    /**
     * Sticky Menu  ---------------------------------
     */
    var headerWrapper = document.getElementById('site-header-outer'),
        headerContent = document.querySelector('.site-header'),
        headerHeight = headerContent.clientHeight;
    headerWrapper.style.height = headerHeight + 'px';

    // window.addEventListener('resize', function () {
    //     headerHeight = headerContent.clientHeight;
    //     headerWrapper.style.height = headerHeight + 'px';
    // });

    window.addEventListener('scroll', function () {
        var headerOffsetTop = headerWrapper.offsetTop;
        var scrollY = window.scrollY;

        if (scrollY >= headerOffsetTop + headerHeight) {
            headerWrapper.classList.add('fixed-pinned', 'animated');
        } else {
            headerWrapper.classList.remove('fixed-pinned');
        }

        if (scrollY >= 200) {
            headerWrapper.classList.add('fixed-header');
        } else {
            headerWrapper.classList.remove('fixed-header', 'animated');
        }
    }, {
        passive: true
    });
}