const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { loadSource, sourceData } = require('./gallery-test-utils.cjs');
const data = sourceData();
const Dialog = loadSource('src/components/LashStyles/LashPhotoDialog.tsx', name => name === '../../data/site' ? data : require(name)).default;
const render = model => renderToStaticMarkup(React.createElement(Dialog, { model, onClose() {} }));

test('all five models retain their own exact original-photo lists', () => {
  const expected = [
    ['Modelofox.jpeg', 'ModeloFox2.jpeg', 'modelofox3.jpeg'],
    ['VolumeBrasileiro.jpeg', 'VolumeBrasileiro2.jpeg'],
    ['VolumeClass.jpeg', 'VolumeClass2.jpg'],
    ['VolumeEgipcio.jpeg', 'VolumeEgipcio2.jpeg', 'VolumeEgipcio3.jpg'],
    ['VolumeGlamuor.jpeg', 'VolumeGlamuor2.jpeg', 'VolumeGlamour3.jpg'],
  ];
  const seen = new Set();
  assert.equal(data.LASH_STYLES.models.length, 5);
  for (const [index, model] of data.LASH_STYLES.models.entries()) {
    assert.equal(JSON.stringify(Array.from(model.photos, photo => photo.source)), JSON.stringify(expected[index]));
    for (const photo of model.photos) {
      assert(!seen.has(photo.id)); seen.add(photo.id);
      assert(fs.readdirSync('src/assets/gallery').includes(photo.source));
      assert(fs.existsSync(require('node:path').resolve('src/data', photo.src)));
      if (photo.fullSrc) assert(fs.existsSync(require('node:path').resolve('src/data', photo.fullSrc)));
    }
    const html = render(model);
    assert(html.includes(model.photos[0].fullSrc));
    assert(html.includes(`1 de ${model.photos.length}`));
  }
  assert.equal(seen.size, 13);
});
test('photos[] renders without the removed model.image field', () => {
  assert.equal(data.LASH_STYLES.models[0].image, undefined);
  assert(render(data.LASH_STYLES.models[0]).includes('<dialog'));
});
for (const [name, photos] of [['empty', []], ['undefined entry', [undefined]], ['missing URL', [{ id: 'missing', alt: '', src: '' }]], ['missing array', undefined]]) {
  test(`${name}: the dialog stays renderable with an error and close control`, () => {
    const html = render({ ...data.LASH_STYLES.models[0], photos });
    assert(html.includes(data.LASH_STYLES.photoDialog.errorLabel));
    assert(html.includes(data.LASH_STYLES.photoDialog.closeLabel));
    assert(!html.includes('<img'));
  });
}
test('a single photo keeps a counter without navigation arrows', () => {
  const html = render({ ...data.LASH_STYLES.models[0], photos: [data.LASH_STYLES.models[0].photos[0]] });
  assert(html.includes('1 de 1'));
  assert.equal((html.match(/<button/g) || []).length, 1);
});
test('a preview is used if the full-size URL is absent', () => {
  const photo = { ...data.LASH_STYLES.models[0].photos[0], fullSrc: undefined };
  assert(render({ ...data.LASH_STYLES.models[0], photos: [photo] }).includes(`src="${photo.src}"`));
});
