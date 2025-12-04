// Carrossel de notícias
const slides = document.querySelectorAll(".slide");
let currentIndex = 0;

function showSlide(index) {
  slides.forEach((slide, i) => slide.classList.toggle("active", i === index));
}

document.querySelector(".next").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
});

document.querySelector(".prev").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
});

// FAQ interativo
const faqItems = document.querySelectorAll(".faq-item");
faqItems.forEach(item => {
  item.querySelector(".faq-question").addEventListener("click", () => {
    item.classList.toggle("active");
  });
});
