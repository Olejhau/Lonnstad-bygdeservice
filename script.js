const heroImages = [
  "assets/hero/hero-1.jpg",
  "assets/hero/hero-2.jpg",
  "assets/hero/hero-3.jpg"
];

const galleryImages = [
  { src: "assets/gallery/arbeid-1.jpg", text: "Transport" },
  { src: "assets/gallery/arbeid-2.jpg", text: "Leiekjøring" },
  { src: "assets/gallery/arbeid-3.jpg", text: "Graving" },
  { src: "assets/gallery/arbeid-4.jpg", text: "Veivedlikehold" },
  { src: "assets/gallery/arbeid-5.jpg", text: "Landbruk" },
  { src: "assets/gallery/arbeid-6.jpg", text: "Anleggsarbeid" },
  { src: "assets/gallery/arbeid-7.jpg", text: "Reparasjoner" }
];

const heroSlides = document.getElementById("heroSlides");
const heroDots = document.getElementById("heroDots");
let heroIndex = 0;

function makeHero() {
  heroImages.forEach((src, index) => {
    const slide = document.createElement("div");
    slide.className = `hero-slide ${index === 0 ? "active" : ""}`;
    slide.style.backgroundImage = `url('${src}')`;
    const img = new Image();
    img.onerror = () => slide.classList.add("placeholder");
    img.src = src;
    heroSlides.appendChild(slide);

    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = index === 0 ? "active" : "";
    dot.setAttribute("aria-label", `Vis forsidebilde ${index + 1}`);
    dot.addEventListener("click", () => showHero(index));
    heroDots.appendChild(dot);
  });
}

function showHero(index) {
  heroIndex = index;
  [...heroSlides.children].forEach((slide, i) => slide.classList.toggle("active", i === index));
  [...heroDots.children].forEach((dot, i) => dot.classList.toggle("active", i === index));
}

const galleryTrack = document.getElementById("galleryTrack");
const galleryDots = document.getElementById("galleryDots");
let galleryPage = 0;
let runtimeUploads = [];

function visibleCount() {
  if (window.innerWidth <= 760) return 1;
  if (window.innerWidth <= 1100) return 3;
  return 5;
}

function allGalleryImages() {
  return [...runtimeUploads, ...galleryImages];
}

function galleryPages() {
  return Math.max(1, Math.ceil(allGalleryImages().length / visibleCount()));
}

function renderGallery() {
  const count = visibleCount();
  const images = allGalleryImages();
  galleryPage = Math.min(galleryPage, galleryPages() - 1);
  galleryTrack.innerHTML = "";
  galleryTrack.style.gridTemplateColumns = `repeat(${count}, 1fr)`;

  images.slice(galleryPage * count, galleryPage * count + count).forEach((item) => {
    const card = document.createElement("div");
    card.className = "gallery-card";
    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.text || "Bilde fra utført arbeid";
    img.onerror = () => {
      card.classList.add("placeholder");
      card.innerHTML = `<span>${item.text || "Bilde kommer"}</span>`;
    };
    card.appendChild(img);
    galleryTrack.appendChild(card);
  });

  galleryDots.innerHTML = "";
  for (let i = 0; i < galleryPages(); i++) {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = i === galleryPage ? "active" : "";
    dot.setAttribute("aria-label", `Vis bildeside ${i + 1}`);
    dot.addEventListener("click", () => { galleryPage = i; renderGallery(); });
    galleryDots.appendChild(dot);
  }
}

document.querySelector(".gallery .prev").addEventListener("click", () => {
  galleryPage = (galleryPage - 1 + galleryPages()) % galleryPages();
  renderGallery();
});
document.querySelector(".gallery .next").addEventListener("click", () => {
  galleryPage = (galleryPage + 1) % galleryPages();
  renderGallery();
});

document.getElementById("imageUpload").addEventListener("change", (event) => {
  runtimeUploads = [...event.target.files].map((file) => ({
    src: URL.createObjectURL(file),
    text: file.name.replace(/\.[^.]+$/, "")
  }));
  galleryPage = 0;
  renderGallery();
});

if (window.emailjs) {
  emailjs.init({
    publicKey: "rMLcYfRxvLAxe13ur"
  });
}

const form = document.getElementById("contactForm");
const statusText = document.getElementById("formStatus");
const submitButton = document.getElementById("submitButton");

if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    statusText.textContent = "";
    statusText.className = "form-status";

    submitButton.disabled = true;
    submitButton.textContent = "Sender...";

    if (!window.emailjs) {
      statusText.textContent =
        "Beklager, skjemaet kunne ikke lastes. Kontakt oss direkte på e-post.";
      statusText.classList.add("error");
      submitButton.disabled = false;
      submitButton.textContent = "Send melding";
      return;
    }

    emailjs
      .sendForm("service_r2q8u3s", "template_zo1skyk", form)
      .then(function () {
        statusText.textContent =
          "Takk! Meldingen er sendt. Vi tar kontakt med deg så snart som mulig.";
        statusText.classList.add("success");

        form.reset();
      })
      .catch(function (error) {
        console.error("EmailJS-feil:", error);

        statusText.textContent =
          "Beklager, noe gikk galt. Prøv igjen eller kontakt oss direkte på e-post.";
        statusText.classList.add("error");
      })
      .finally(function () {
        submitButton.disabled = false;
        submitButton.textContent = "Send melding";
      });
  });
}

document.querySelector(".menu-toggle").addEventListener("click", (event) => {
  const menu = document.getElementById("main-menu");
  const isOpen = menu.classList.toggle("open");
  event.currentTarget.setAttribute("aria-expanded", String(isOpen));
});

document.getElementById("year").textContent = new Date().getFullYear();
makeHero();
renderGallery();
setInterval(() => showHero((heroIndex + 1) % heroImages.length), 6000);
window.addEventListener("resize", renderGallery);
