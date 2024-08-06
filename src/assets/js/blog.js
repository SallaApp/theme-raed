import BasePage from './base-page';
class Blog extends BasePage {
    onReady() {
        let likeBtn = document.querySelector('#blog-like');
        if (likeBtn) {
            likeBtn.addEventListener('click', (event) => {
                event.preventDefault();

                const originalContent = likeBtn.innerHTML;

                likeBtn.querySelector('i').outerHTML = '<span class="loader loader--small"></span>';

                setTimeout(() => {
                    likeBtn.innerHTML = originalContent;
                    likeBtn.classList.add("liked");
                    const countSpan = likeBtn.querySelector('span');
                    const currentCount = parseInt(countSpan?.innerText);

                    anime({
                        targets: countSpan,
                        innerHTML: currentCount + 1,
                        duration: 400,
                        round: 1,
                        easing: 'easeOutExpo',
                        update: function(anim) {
                            countSpan.innerHTML = Math.round(currentCount + 1);
                        },
                        complete: function() {
                            countSpan.removeAttribute('style');
                        }
                    });

                    anime({
                        targets: countSpan,
                        scale: [1, 1.2],
                        duration: 300,
                        easing: 'easeInOutQuad',
                    });
                }, 2000);
            });
        }
    }
}
Blog.initiateWhenReady(['blog.single', 'blog.index']);