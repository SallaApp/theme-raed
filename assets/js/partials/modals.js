/**
 * Popup Modals
 * Used in:
 *  1- Lanuage/Currency Modal
 *  2- 
 */

export default function () {
	const modalTriggers = document.querySelectorAll('[data-modal-trigger]');
	modalTriggers.forEach(trigger => {
		trigger.addEventListener('click', () => {
      const 
        modal = document.getElementById(trigger.dataset.modalTrigger),
        modalBody = modal.querySelector('.modal__body'),
        modalOverlay = modal.querySelector('.modal__overlay');

      modal.classList.remove('hidden');
      setTimeout(()=> openModal(modalBody, modalOverlay));
		})
	})

	document.querySelectorAll("[data-close-modal]").forEach(
		closeToggle => {
			closeToggle.addEventListener('click', () => {
				closeModal(closeToggle.dataset.closeModal);
		  })
	  }
  )
}

window.openModal = function (modalBody, modalOverlay) {
  modalOverlay.classList.add('ease-out','duration-300','opacity-100');
  modalOverlay.classList.remove('opacity-0');

	modalBody.classList.add('ease-out','duration-300','opacity-100','translate-y-0','sm:scale-100');
	modalBody.classList.remove('opacity-0','translate-y-4','sm:translate-y-0','sm:scale-95');

	document.body.classList.add('modal-is-open');
}

window.closeModal = function(modalName) {
  const 
    modal = document.getElementById(modalName),
    modalBody = modal.querySelector('.modal__body'),
    modalOverlay = modal.querySelector('.modal__overlay');

	modalBody.classList.remove('ease-out','duration-300','opacity-100','translate-y-0','sm:scale-100');
	modalBody.classList.add('opacity-0','translate-y-4','sm:translate-y-0','sm:scale-95');

  modalOverlay.classList.remove('ease-out','duration-300','opacity-100');
  modalOverlay.classList.add('opacity-0');

	document.body.classList.remove('modal-is-open');
  setTimeout(()=> modal.classList.add('hidden'), 300);
}
