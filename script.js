/* -------------------------------
 *  BASIC-LIGHTBOX + GALLERY
 * ------------------------------*/
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.gallery-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const imageUrl = link.getAttribute('href');

      const options = {
        onShow(instance) {
          /* close button */
          const btn = document.createElement('button');
          btn.className = 'basicLightbox__close-btn';
          btn.textContent = '×';
          btn.addEventListener('click', instance.close);
          instance.element().appendChild(btn);

          /* keyboard support (escape key closes modal)*/
          const handleKeydown = (e) => {
            if (e.key === 'Escape') {
              instance.close();
            }
          };
          document.addEventListener('keydown', handleKeydown);
          
          /* store cleanup function */
          instance._keydownHandler = handleKeydown;

          /* lock scroll */
          document.body.style.overflow = 'hidden';
        },
        onClose(instance) {
          /* cleanup keyboard listener */
          if (instance._keydownHandler) {
            document.removeEventListener('keydown', instance._keydownHandler);
          }
          document.body.style.overflow = '';
        }
      };

      basicLightbox
        .create(`<img src="${imageUrl}" alt="">`, options)
        .show();
    });
  });
});
