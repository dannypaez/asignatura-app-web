const fs = require('fs');
const path = require('path');

const plantilla = fs.readFileSync('plantilla.html', 'utf8');
const temas = require('./temas.json');

// Íconos SVG o imágenes para cada tema (personalizables)
const iconos = [
  `<img src="https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/html5.svg" class="w-10 h-10" alt="HTML5"/>`,
  `<img src="https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/javascript.svg" class="w-10 h-10" alt="JavaScript"/>`,
  `<img src="https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/laravel.svg" class="w-10 h-10" alt="Laravel"/>`,
  `<img src="https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/swagger.svg" class="w-10 h-10" alt="Swagger"/>`,
  `<img src="https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/firebase.svg" class="w-10 h-10" alt="Firebase"/>`
];

temas.forEach(({ tema_num, tema_titulo, actividades, link_entrega }, idx) => {
  // Lista de actividades (puede estar vacía)
  const actividadesHtml = actividades && actividades.length
    ? actividades.map(act => `<li>${act}</li>`).join('\n')
    : '<li class="text-gray-400">Sin actividades registradas</li>';

  // Reemplazo de placeholders en la plantilla
  const contenido = plantilla
    .replace(/{{TEMA_NUM}}/g, tema_num)
    .replace(/{{TEMA_TITULO}}/g, tema_titulo)
    .replace(/{{ACTIVIDADES}}/g, actividadesHtml)
    .replace(/{{LINK_ENTREGA}}/g, link_entrega)
    .replace(/{{ICONO}}/g, iconos[idx] || '');

  // Crear directorio y archivo
  const dir = path.join('temas', `tema${tema_num}`);
  fs.mkdirSync(path.join(dir, 'presentacion'), { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), contenido);
  console.log(`✔ Tema ${tema_num} generado en ${dir}/index.html`);
});
