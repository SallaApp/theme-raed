
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

// document.querySelectorAll(".close-mobile-menu").forEach((elem) => {
//     elem.addEventListener("click", (evnt) => {
//         evnt.preventDefault();
//         drawer.close();
//     });
// })