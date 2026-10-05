
/* =========================================================
   ART OF FITNESS — STRATOS DIGITAL BUSINESS CARD
   ========================================================= */

const CONFIG = {
  name: 'Stratos Papaporfyriou',
  role: 'Personal Trainer',
  company: 'Art of Fitness',

  phone: '+306988411924',
  phoneDisplay: '+30 698 841 1924',

  website: 'https://www.artoffitness.gr/',
  whatsapp: '306988411924',
  linkedin: 'https://gr.linkedin.com/in/stratos-papaporfyriou-bb326b244',

  photo: 'https://www.artoffitness.gr/images/stratos.jpg',
  cover: 'https://www.artoffitness.gr/images/1.jpg',

  vcard: 'contact.vcf'
};

const $ = (selector) => document.querySelector(selector);

function setText(selector, value) {
  const element = $(selector);

  if (element && value) {
    element.textContent = value;
  }
}

function setHref(selector, value) {
  const element = $(selector);

  if (element && value) {
    element.href = value;
  }
}

function setupImage(selector, source, alt = '') {
  const image = $(selector);

  if (!image) {
    return;
  }

  image.src = source;

  if (alt) {
    image.alt = alt;
  }

  image.addEventListener(
    'error',
    () => {
      image.classList.add('is-missing');
    },
    {
      once: true
    }
  );
}

function initCard() {
  /* Identity */

  setText(
    '#cardName',
    CONFIG.name
  );

  setText(
    '#cardRole',
    CONFIG.role
  );


  /* Phone */

  setHref(
    '#callAction',
    `tel:${CONFIG.phone}`
  );


  /* SMS */

  setHref(
    '#smsAction',
    `sms:${CONFIG.phone}`
  );


  /* Save contact */

  setHref(
    '#saveAction',
    CONFIG.vcard
  );


  /* Website */

  setHref(
    '#websiteAction',
    CONFIG.website
  );


  /* WhatsApp */

  const whatsapp =
    $('#whatsappAction');

  if (whatsapp) {
    if (CONFIG.whatsapp) {
      whatsapp.href =
        `https://wa.me/${CONFIG.whatsapp}`;

      whatsapp.hidden =
        false;
    } else {
      whatsapp.hidden =
        true;
    }
  }


  /* LinkedIn */

  const linkedin =
    $('#linkedinAction');

  if (linkedin) {
    if (CONFIG.linkedin) {
      linkedin.href =
        CONFIG.linkedin;

      linkedin.hidden =
        false;
    } else {
      linkedin.hidden =
        true;
    }
  }


  /* Images */

  setupImage(
    '#profilePhoto',
    CONFIG.photo,
    CONFIG.name
  );

  setupImage(
    '#coverPhoto',
    CONFIG.cover
  );


  /* Share */

  const shareButton =
    $('#shareAction');

  if (shareButton) {
    shareButton.addEventListener(
      'click',
      shareCard
    );
  }
}


/* =========================================================
   SHARE
   ========================================================= */

async function shareCard() {
  const shareData = {
    title:
      `${CONFIG.name} | ${CONFIG.company}`,

    text:
      `${CONFIG.name}
${CONFIG.role}
${CONFIG.company}`,

    url:
      window.location.href
  };

  try {
    if (navigator.share) {
      await navigator.share(
        shareData
      );

      return;
    }

    await copyCardLink();
  } catch (error) {
    if (
      error?.name !==
      'AbortError'
    ) {
      await copyCardLink();
    }
  }
}


/* =========================================================
   COPY LINK FALLBACK
   ========================================================= */

async function copyCardLink() {
  try {
    await navigator.clipboard.writeText(
      window.location.href
    );

    showToast(
      'Το link της κάρτας αντιγράφηκε.'
    );
  } catch (error) {
    const textarea =
      document.createElement(
        'textarea'
      );

    textarea.value =
      window.location.href;

    textarea.setAttribute(
      'readonly',
      ''
    );

    textarea.style.position =
      'fixed';

    textarea.style.left =
      '-9999px';

    textarea.style.opacity =
      '0';

    document.body.appendChild(
      textarea
    );

    textarea.select();

    document.execCommand(
      'copy'
    );

    textarea.remove();

    showToast(
      'Το link της κάρτας αντιγράφηκε.'
    );
  }
}


/* =========================================================
   TOAST
   ========================================================= */

let toastTimer;

function showToast(message) {
  const toast =
    $('#toast');

  if (!toast) {
    return;
  }

  toast.textContent =
    message;

  toast.classList.add(
    'is-visible'
  );

  clearTimeout(
    toastTimer
  );

  toastTimer =
    setTimeout(
      () => {
        toast.classList.remove(
          'is-visible'
        );
      },
      2200
    );
}


/* =========================================================
   START
   ========================================================= */

document.addEventListener(
  'DOMContentLoaded',
  initCard
);
