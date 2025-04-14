const fs = require('fs');
const path = require('path');

const plantilla = fs.readFileSync('plantilla.html', 'utf8');
const temas = require('./temas.json');

temas.forEach(({ tema_num, tema_titulo, actividades, link_entrega }) => {
  const actividadesHtml = actividades.map(act => `<li>${act}</li>`).join('\n        ');
  const contenido = plantilla
    .replace(/{{TEMA_NUM}}/g, tema_num)
    .replace(/{{TEMA_TITULO}}/g, tema_titulo)
    .replace(/{{ACTIVIDADES}}/g, actividadesHtml)
    .replace(/{{LINK_ENTREGA}}/g, link_entrega);

  const dir = path.join('temas', `tema${tema_num}`);
  fs.mkdirSync(path.join(dir, 'presentacion'), { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), contenido);
  console.log(`✔ Tema ${tema_num} generado en ${dir}/index.html`);
});
