
/**
 * Wishlist
 * save items in localstorage
 */
 document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('.wishlist-btn').forEach( btn =>{
    btn.addEventListener('click', (event)=>{
      btn.classList.add('is--loading');
    })
  })

  let wishlist = JSON.parse(localStorage.getItem("salla-wishlist"));
  wishlist?.forEach((id)=>{
    setFavorites(id);
  })

  salla.event.on("wishlist::added", (event, id) => {
    const storeWishlist = JSON.parse(localStorage.getItem("salla-wishlist") || "[]");
    storeWishlist.push(id);
    localStorage.setItem('salla-wishlist', JSON.stringify(storeWishlist));
    setFavorites(id);
  })

  salla.event.on("wishlist::removed", (event, id) => {

    const storeWishlist = JSON.parse(localStorage.getItem("salla-wishlist") || "[]");
    const index = storeWishlist.indexOf(id);
    storeWishlist.splice(index, 1);
    localStorage.setItem('salla-wishlist', JSON.stringify(storeWishlist));

    const btns = document.querySelectorAll('.wishlist-btn[data-id="'+id+'"]');
    btns.forEach((btn)=>{
      const icon = btn.querySelector('i');
      btn.classList.remove('text-primary');
      btn.classList.remove('pulse');
      icon.classList.add('sicon-heart'); icon.classList.remove('sicon-heart-off');
      btn.dataset.onClick = 'wishlist::add';
      btn.classList.remove('is--loading');
    })
  })
});

function setFavorites(id){
  const btns = document.querySelectorAll('.wishlist-btn[data-id="'+id+'"]');
  btns.forEach((btn)=>{
    const icon = btn.querySelector('i');
    btn.classList.add('text-primary');
    btn.classList.add('pulse');
    icon.classList.add('sicon-heart-off'); icon.classList.remove('sicon-heart');
    btn.dataset.onClick = 'wishlist::remove';
    btn.classList.remove('is--loading');
  })
}