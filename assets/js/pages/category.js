
window.initCategory = function () {
    return {
        showMoreLinks: false,
        links: [
            {
                id: 1,
                label: 'رابط جديد'
            }, {
                id: 2,
                label: 'هواوي'
            }, {
                id: 3,
                label: 'سامسونج'
            }
        ],
        girdLayout: 'grid',

        toggleView: function (layout) {

            this.girdLayout = layout;
            this.animateItems()
        },

        animateItems: function () {
            anime({
                targets: '.product-entry',
                opacity: [
                    0, 1
                ],
                duration: 1200,
                translateY: [
                    20, 0
                ],
                delay: function (el, i) {
                    return i * 100;
                }
            })
        }
    }
}

// filters mobile menu
var filtersMenuItem = document.getElementById('filters-menu');
if (filtersMenuItem) {
    const filtersMenu = new MmenuLight(
        document.querySelector("#filters-menu"),
        "(max-width: 1024px)", "( slidingSubmenus: false)"
    );

    const filtersDrawer = filtersMenu.offcanvas({
        position: "right"
    });

    document.querySelector("a[href='#filters-menu']")
        .addEventListener("click", (evnt) => {
            evnt.preventDefault();
            filtersDrawer.close();
            filtersDrawer.open();
        });

    document.querySelectorAll(".close-mobile-menu").forEach((elem) => {
        elem.addEventListener("click", (evnt) => {
            evnt.preventDefault();
            filtersDrawer.close();
        });
    })
}

document.querySelectorAll(".close-mobile-menu").forEach((elem) => {
    elem.addEventListener("click", (evnt) => {
        evnt.preventDefault();
        drawer.close();
    });
});

document.addEventListener('DOMContentLoaded', function () {
    salla.document.event.onChange('[name="sort-opt"]', function (event) {
        let url = window.location.href;
        var regex = new RegExp("([?;&])by[^&;]*[;&]?");
        url = url.replace(regex, "$1").replace(/&$/, '');
        url = (url.includes('?') ? url + "&" : "?") + (event.target.value ? "by=" + event.target.value : '');

        window.location.href = url.replace(/&$|\?$/, '');
    });

    let query = window.location.search.slice(1);
    if (!query || !query.includes('by=')) {
        return;
    }
    query = query.split('&')
        .forEach((parameter) => {
            parameter = parameter.split('=');
            if (parameter[0] == 'by') {
                document.querySelector('option[value="' + parameter[1] + '"]')
                    .setAttribute("selected", "");
                return;
            }
        });

});
