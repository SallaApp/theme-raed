
/**
 * ADD Comment Validations & Loading
 */

 document.addEventListener('DOMContentLoaded', () => {
  var add_btn = document.getElementById('add-new-comment-btn'),
     
  ask_textarea = document.querySelector('textarea[name="ask_textarea"]');

  if (add_btn) {
      add_btn.addEventListener('click', function(){
          if(ask_textarea.value !== '' && ask_textarea.value.length >= 3 ){
              add_btn.classList.add('btn--has-loading');
              add_btn.classList.add('pointer-events-none');
          }
          else {
              ask_textarea.classList.add('!border-red-400');
          }
      })
  }

  if (ask_textarea) {
      ask_textarea.addEventListener('keyup', function(){
          ask_textarea.classList.remove('!border-red-400');
      });
  } 

  salla.comment.event.onAdded((...data) => {
    // salla.log(data)
    add_btn.classList.remove('btn--is-loading');
    add_btn.classList.remove('pointer-events-none');
  })

  salla.comment.event.onAdditionFailed((...data) => {
    // salla.log(data)
    add_btn.classList.remove('btn--is-loading');
    add_btn.classList.remove('pointer-events-none');
  })

}); 