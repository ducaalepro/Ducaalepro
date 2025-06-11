let language = 'en';
let calories = {
  'rice': 130,
  'pasta': 158,
  'fish': 206,
};
let translations = {};
async function loadTranslations() {
  const res = await fetch('lang-' + language + '.json');
  translations = await res.json();
}
async function toggleLanguage() {
  language = (language === 'en') ? 'so' : 'en';
  await loadTranslations();
  document.querySelector('h1').textContent = translations.title;
  document.querySelector('p').textContent = translations.instructions;
}
document.getElementById('imageInput').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const img = document.getElementById('preview');
  img.src = URL.createObjectURL(file);
  img.style.display = 'block';
  const resultDiv = document.getElementById('result');
  const mobilenet = await mobilenetLoad();
  const prediction = await mobilenet.classify(img);
  const food = prediction[0]?.className.toLowerCase().split(',')[0];
  const kcal = calories[food] || 'unknown';
  resultDiv.textContent = `${food}: ${kcal} kcal per 100g`;
});
async function mobilenetLoad() {
  const module = await import('https://cdn.jsdelivr.net/npm/@tensorflow-models/mobilenet');
  return await module.load();
}
loadTranslations();