/* -------------------------------
 *  BASIC-LIGHTBOX + GALLERY
 * ------------------------------*/
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.gallery-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const imageUrl = link.getAttribute('href');
      
      // Check if we're on mobile (768px or less)
      const isMobile = window.innerWidth <= 768;
      
      let modalContent;
      
      if (isMobile) {
        // On mobile: show title and description in modal
        const figcaption = link.querySelector('figcaption');
        const title = figcaption?.querySelector('h3')?.textContent || '';
        const description = figcaption?.querySelector('p')?.textContent || '';

        modalContent = `
          <div class="lightbox-content">
            <img src="${imageUrl}" alt="${title}">
            ${title || description ? `
              <div class="lightbox-info">
                ${title ? `<h3>${title}</h3>` : ''}
                ${description ? `<p>${description}</p>` : ''}
              </div>
            ` : ''}
          </div>
        `;
      } else {
        // On desktop: show only image (clean, minimal)
        modalContent = `<img src="${imageUrl}" alt="">`;
      }

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
        .create(modalContent, options)
        .show();
    });
  });
});
