const GITHUB_OWNER = "olejhau";
const GITHUB_REPO = "lonnstad-bygdeservice";
const GITHUB_BRANCH = "main";
const HERO_IMAGE_FOLDER = "bilder/hero";
const GALLERY_IMAGE_FOLDER = "bilder/galleri";

const heroTexts = [
  "Transport, landbruk og anlegg",
  "Veivedlikehold og graving",
  "Praktisk hjelp for private og næring"
];

const services = [
  ["Transport", "bilder/icons/trucking-truck.svg"],
  ["Leiekjøring", "bilder/icons/tractor.svg"],
  ["Landbruk", "bilder/icons/wheat.svg"],
  ["Reparasjoner", "bilder/icons/tools.svg"],
  ["Veivedlikehold", "bilder/icons/dumper-truck.svg"],
  ["Anleggsarbeid", "bilder/icons/dumper-truck.svg"],
  ["Graving", "bilder/icons/excavator.svg"],
  ["Trefelling", "bilder/icons/tree.svg"]
];

let heroImages = [];
let activeHero = 0;
let galleryImages = [];
let galleryIndex = 0;

const yearEl = document.getElementById("year");
const servicesEl = document.getElementById("services");
const subjectSelect = document.getElementById("subjectSelect");
const heroImageEl = document.getElementById("heroImage");
const heroFallbackEl = document.getElementById("heroFallback");
const heroSubtitleEl = document.getElementById("heroSubtitle");
const heroDotsEl = document.getElementById("heroDots");
const galleryGridEl = document.getElementById("galleryGrid");
const prevGalleryButton = document.getElementById("prevGallery");
const nextGalleryButton = document.getElementById("nextGallery");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const submitButton = document.getElementById("submitButton");

yearEl.textContent = new Date().getFullYear();

function renderServices() {
  services.forEach(([title, icon]) => {
    servicesEl.insertAdjacentHTML("beforeend", `
      <article class="border-r border-neutral-200 px-5 py-6 text-center last:border-r-0">
        <div class="mx-auto flex h-16 w-16 items-center justify-center">
          <img src="${icon}" alt="" class="h-11 w-11 object-contain" />
        </div>
        <h3 class="mt-4 text-lg font-black">${title}</h3>
      </article>
    `);

    const option = document.createElement("option");
    option.value = title;
    option.textContent = title;
    subjectSelect.appendChild(option);
  });
}

async function fetchGithubImages(folderPath) {
  const apiUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${folderPath}?ref=${GITHUB_BRANCH}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error(`Kunne ikke hente bilder fra ${folderPath}`);

    const files = await response.json();
    if (!Array.isArray(files)) return [];

    const imageFiles = files
      .filter((file) => file.type === "file")
      .filter((file) => /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(file.name));

    const filesWithDates = await Promise.all(
      imageFiles.map(async (file) => ({
        title: file.name.replace(/\.[^/.]+$/, ""),
        preview: file.download_url,
        updatedAt: await fetchLatestCommitDate(file.path)
      }))
    );

    return filesWithDates.sort((a, b) => b.updatedAt - a.updatedAt);
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function fetchLatestCommitDate(filePath) {
  const apiUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/commits?path=${encodeURIComponent(filePath)}&sha=${GITHUB_BRANCH}&per_page=1`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) return 0;

    const commits = await response.json();
    const date = commits?.[0]?.commit?.committer?.date || commits?.[0]?.commit?.author?.date;
    return date ? new Date(date).getTime() : 0;
  } catch (error) {
    console.error(error);
    return 0;
  }
}

function renderHeroDots() {
  const count = heroImages.length || heroTexts.length;
  heroDotsEl.innerHTML = "";

  for (let i = 0; i < count; i += 1) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `h-3 w-3 rounded-full border border-white ${activeHero % count === i ? "bg-white" : "bg-white/20"}`;
    button.setAttribute("aria-label", `Vis hero-bilde ${i + 1}`);
    button.addEventListener("click", () => {
      activeHero = i;
      updateHero();
    });
    heroDotsEl.appendChild(button);
  }
}

function updateHero() {
  if (heroImages.length) {
    const image = heroImages[activeHero % heroImages.length];
    heroImageEl.src = image.preview;
    heroImageEl.alt = image.title;
    heroImageEl.classList.remove("hidden");
    heroFallbackEl.classList.add("hidden");
  } else {
    heroImageEl.classList.add("hidden");
    heroFallbackEl.classList.remove("hidden");
  }

  heroSubtitleEl.textContent = heroTexts[activeHero % heroTexts.length];
  renderHeroDots();
}

function getVisibleImages(items, start, count) {
  if (!items.length) return [];
  return Array.from({ length: Math.min(count, items.length) }, (_, index) => items[(start + index) % items.length]);
}

function renderGallery() {
  galleryGridEl.innerHTML = "";

  if (!galleryImages.length) {
    for (let i = 0; i < 5; i += 1) {
      galleryGridEl.insertAdjacentHTML("beforeend", `<div class="h-48 rounded-xl border border-neutral-200 bg-gradient-to-br from-neutral-200 to-neutral-400 shadow-sm"></div>`);
    }
    return;
  }

  getVisibleImages(galleryImages, galleryIndex, 5).forEach((image) => {
    galleryGridEl.insertAdjacentHTML("beforeend", `
      <div class="overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100 shadow-sm">
        <img src="${image.preview}" alt="${image.title}" class="h-48 w-full object-cover" />
      </div>
    `);
  });
}

async function initImages() {
  const [hero, gallery] = await Promise.all([
    fetchGithubImages(HERO_IMAGE_FOLDER),
    fetchGithubImages(GALLERY_IMAGE_FOLDER)
  ]);

  heroImages = hero.slice(0, 3);
  galleryImages = gallery.slice(0, 15);

  updateHero();
  renderGallery();
}

prevGalleryButton.addEventListener("click", () => {
  if (!galleryImages.length) return;
  galleryIndex = (galleryIndex - 1 + galleryImages.length) % galleryImages.length;
  renderGallery();
});

nextGalleryButton.addEventListener("click", () => {
  if (!galleryImages.length) return;
  galleryIndex = (galleryIndex + 1) % galleryImages.length;
  renderGallery();
});

setInterval(() => {
  const count = heroImages.length || heroTexts.length;
  activeHero = (activeHero + 1) % count;
  updateHero();
}, 4500);

function initContactForm() {
  if (!window.emailjs) {
    formStatus.textContent = "Kontaktskjemaet kunne ikke lastes. Kontakt oss direkte på e-post.";
    formStatus.className = "mt-4 text-sm font-bold text-red-700";
    return;
  }

  emailjs.init({ publicKey: "rMLcYfRxvLAxe13ur" });

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    formStatus.textContent = "Sender...";
    formStatus.className = "mt-4 text-sm font-bold text-neutral-600";
    submitButton.disabled = true;
    submitButton.textContent = "Sender...";

    try {
      await emailjs.sendForm("service_r2q8u3s", "template_zo1skyk", contactForm);
      formStatus.textContent = "Takk! Meldingen er sendt. Vi tar kontakt med deg så snart som mulig.";
      formStatus.className = "mt-4 text-sm font-bold text-green-700";
      contactForm.reset();
    } catch (error) {
      console.error("EmailJS-feil:", error);
      formStatus.textContent = "Beklager, noe gikk galt. Prøv igjen eller kontakt oss direkte på e-post.";
      formStatus.className = "mt-4 text-sm font-bold text-red-700";
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Send melding";
    }
  });
}

renderServices();
updateHero();
renderGallery();
initImages();
initContactForm();
