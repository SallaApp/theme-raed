// globals
window.copyToClipboard = function (elementId) {
    debugger;
    // icon
    let copyIcon = document.querySelector('.copy-icon');
    // Create an auxiliary hidden input
    var aux = document.createElement("input");
    // Get the text from the element passed into the input
    aux.setAttribute("value", document.getElementById(elementId).innerHTML);
    // Append the aux input to the body
    document.body.appendChild(aux);
    // Highlight the content
    aux.select();
    // Execute the copy command
    document.execCommand("copy");
    // Remove the input from the body
    document.body.removeChild(aux);

    copyIcon.classList.remove('sicon-copy');
    copyIcon.classList.add('sicon-check');

    setTimeout(() => {
        copyIcon.classList.add('sicon-copy');
        copyIcon.classList.remove('sicon-check');
    }, 1000);
}

// tabs animation
window.animateTabsItems = (ItemClass) => {
    let elements = document.querySelectorAll(ItemClass);
    elements.forEach(element => {
        element.style.removeProperty("opacity");
        element.style.removeProperty("transform");
    })

    anime({
        targets: `${ItemClass}`,
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 1200,
        delay: anime.stagger(70),
    });

}