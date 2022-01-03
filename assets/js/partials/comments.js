export default function () {
    //infiniteScroll (Load more comments)
    salla.infiniteScroll.initiate('.comments-container', '.comment-block', {history: false, scrollThreshold: false});

    //Add Loading when adding new comment
    let btn = document.getElementById('add-new-comment-btn');
    if (!btn) {
        return;
    }
    let input = document.querySelector('textarea[name="ask_textarea"]');
    let removeLoading = () => btn.classList.remove('btn--is-loading', 'pointer-events-none');

    btn.addEventListener('click', function () {
        if (input.value.length >= 3) {
            btn.classList.add('btn--has-loading', 'pointer-events-none');
        } else {
            input.classList.add('!border-red-400');
        }
    });

    input.addEventListener('keyup', () => input.classList.remove('!border-red-400'));
    salla.comment.event.onAdded(removeLoading)
    salla.comment.event.onAdditionFailed(removeLoading)
}