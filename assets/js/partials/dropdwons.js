/**
 * Dropdown Menus
 * used in:
 *  1- user menu
 *  2- 
 */
export default function () {
    document.querySelectorAll('.dropdown__trigger').forEach(btn => {
      btn.addEventListener('click', (event)=>{
        btn.parentElement.classList.toggle('is-opened');
        document.body.classList.toggle('dropdown--is-opened');
      })

      // Click Outside || Click on close btn
      window.addEventListener('click', function(e){
        if (e.target.closest('.dropdown__menu') === null && e.target !== btn || 
            e.target.classList.contains('dropdown__close')) {
          btn.parentElement.classList.remove('is-opened');
          document.body.classList.remove('dropdown--is-opened');
        }
      });
    });
}; 