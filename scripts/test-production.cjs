// Run after npm run build and npm run preview. Playwright is an optional QA tool,
// supplied by name or an existing installation path; it is not shipped to users.
const { chromium } = require(process.argv[2] || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { sourceData, assetUrl } = require('./gallery-test-utils.cjs');
const data = sourceData();
const models = Array.from(data.LASH_STYLES.models);
const base = process.argv[3] || 'http://127.0.0.1:4173';
const artifacts = '.landing-validation.local/production-review';
fs.mkdirSync(artifacts, { recursive: true });
const zoomOnly = process.argv.includes('--zoom-only');
const results = zoomOnly && fs.existsSync(path.join(artifacts, 'results.json'))
  ? JSON.parse(fs.readFileSync(path.join(artifacts, 'results.json'), 'utf8')).filter(result => !result.mode)
  : [];
const save = () => fs.writeFileSync(path.join(artifacts, 'results.json'), JSON.stringify(results, null, 2));

async function loaded(page, model, index) {
  const dialog = page.getByRole('dialog', { name: model.name, exact: true });
  await dialog.locator('[aria-live]').filter({ hasText: `${index + 1} de ${model.photos.length}` }).waitFor();
  await page.waitForFunction(() => {
    const img = document.querySelector('dialog img');
    return img?.complete && img.naturalWidth > 0 && getComputedStyle(img).visibility === 'visible';
  });
  const photo = model.photos[index];
  assert.equal(await dialog.locator('img').evaluate(img => img.currentSrc), assetUrl(photo.fullSrc || photo.src, base));
  assert.equal(await dialog.locator('img').evaluate(img => img.naturalWidth), photo.fullWidth ?? photo.width);
  assert.equal(await page.locator('#root main').count(), 1);
  assert(await dialog.evaluate(d => d.matches(':modal')));
  const fits = await dialog.locator('img').evaluate(img => {
    const r = img.getBoundingClientRect();
    return r.left >= 0 && r.top >= 0 && r.right <= innerWidth && r.bottom <= innerHeight && getComputedStyle(img).objectFit === 'contain';
  });
  assert(fits);
}
async function closeChecked(page, opener, before, method) {
  if (method === 'button') await page.getByRole('button', { name: data.LASH_STYLES.photoDialog.closeLabel }).click();
  else if (method === 'backdrop') await page.mouse.click(3, 3);
  else await page.keyboard.press('Escape');
  await page.waitForFunction(() => !document.querySelector('dialog'));
  await page.waitForFunction(button => document.activeElement === button, await opener.elementHandle());
  assert.equal(await page.evaluate(() => document.documentElement.style.overflow), before.overflow);
  assert.equal(await page.evaluate(() => document.documentElement.style.paddingRight), before.padding);
  assert(Math.abs(await page.evaluate(() => scrollY) - before.y) <= 1);
}
async function open(page, opener) {
  await opener.scrollIntoViewIfNeeded(); await page.waitForTimeout(400); await opener.focus();
  const before = await page.evaluate(() => ({ y: scrollY, overflow: document.documentElement.style.overflow, padding: document.documentElement.style.paddingRight }));
  await page.keyboard.press('Enter'); return before;
}
async function swipe(page, direction) {
  const r = await page.locator('dialog img').boundingBox();
  const cdp = await page.context().newCDPSession(page);
  const x = r.x + r.width / 2, y = r.y + r.height / 2;
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y, id: 0 }] });
  for (let i = 1; i <= 5; i++) await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: x + direction * 100 * i / 5, y, id: 0 }] });
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] }); await cdp.detach();
}
function clipping(page) {
  return page.evaluate(() => [...document.querySelectorAll('a,button,h1,h2,h3,p,figcaption')].filter(el => {
    const r = el.getBoundingClientRect(), style = getComputedStyle(el);
    if (!r.width || !r.height || style.visibility === 'hidden' || el.closest('.swiper') || el.classList.contains('sr-only')) return false;
    return r.left < -1 || r.right > innerWidth + 1 || el.scrollWidth > el.clientWidth + 2 || (['A', 'BUTTON'].includes(el.tagName) && el.scrollHeight > el.clientHeight + 2);
  }).map(el => ({ tag: el.tagName, text: el.textContent.trim().slice(0, 80), width: el.clientWidth, content: el.scrollWidth })));
}
(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    for (const width of zoomOnly ? [] : [360, 390, 768, 1440]) {
      const context = await browser.newContext({ viewport: { width, height: 900 }, isMobile: width < 768, hasTouch: width < 768 });
      const page = await context.newPage();
      const errors = [], consoleErrors = [], failures = [], requests = [], badResponses = [];
      page.on('pageerror', e => errors.push(e.message));
      page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text()); });
      page.on('requestfailed', r => failures.push(r.url()));
      page.on('request', r => requests.push(r.url()));
      page.on('response', r => { if (r.status() >= 400) badResponses.push({ url: r.url(), status: r.status() }); });
      assert.equal((await page.goto(base, { waitUntil: 'networkidle' })).status(), 200);
      await page.evaluate(() => document.fonts.ready);
      const markup = await page.evaluate(() => {
        const ids = [...document.querySelectorAll('[id]')].map(el => el.id);
        return {
          brokenAnchors: [...document.querySelectorAll('a[href^="#"]')].filter(a => !document.getElementById(a.hash.slice(1))).map(a => a.hash),
          duplicateIds: ids.filter((id, i) => ids.indexOf(id) !== i),
          unsafeLinks: [...document.querySelectorAll('a[target="_blank"]')].filter(a => !a.rel.includes('noopener')).map(a => a.href),
          missingAlt: [...document.images].filter(img => !img.hasAttribute('alt')).length,
          language: document.documentElement.lang,
          title: document.title,
        };
      });
      assert.deepEqual(markup.brokenAnchors, []); assert.deepEqual(markup.duplicateIds, []); assert.deepEqual(markup.unsafeLinks, []); assert.equal(markup.missingAlt, 0); assert.equal(markup.language, 'pt-BR'); assert(markup.title.includes('Darc Kaline'));
      for (const model of models) for (const photo of model.photos) assert(!requests.includes(assetUrl(photo.fullSrc, base)), 'Enlarged image downloaded before opening');
      const heroes = requests.filter(url => /\/hero-(mobile|desktop)-/.test(url));
      assert.equal(heroes.length, 1); assert(heroes[0].includes(width >= 1024 ? 'desktop' : 'mobile'));
      assert.equal(await page.locator('#top img').getAttribute('loading'), null);
      assert.equal(await page.locator('#top img').getAttribute('fetchpriority'), 'high');
      if (width < 1024) {
        const menu = page.locator('header button'); await menu.focus(); await page.keyboard.press('Enter');
        assert.equal(await menu.getAttribute('aria-expanded'), 'true'); assert(await menu.evaluate(b => document.activeElement === b));
        await page.keyboard.press('Tab'); await page.keyboard.press('Escape');
        assert.equal(await menu.getAttribute('aria-expanded'), 'false'); assert(await menu.evaluate(b => document.activeElement === b));
      }
      await page.locator('#top a[href="#estilos"]').click(); await page.waitForTimeout(900);
      assert.equal(new URL(page.url()).hash, '#estilos');
      for (const [i, model] of models.entries()) {
        const opener = page.locator('#estilos article').nth(i).getByRole('button');
        for (const method of ['button', 'escape', 'backdrop']) {
          const before = await open(page, opener); await loaded(page, model, 0);
          const controls = page.getByRole('dialog').getByRole('button');
          const close = controls.first(); await close.focus();
          await page.keyboard.press('Shift+Tab'); assert(await controls.last().evaluate(b => document.activeElement === b));
          await page.keyboard.press('Tab'); assert(await close.evaluate(b => document.activeElement === b));
          for (let index = 1; index < model.photos.length; index++) {
            await page.getByRole('button', { name: data.LASH_STYLES.photoDialog.nextLabel }).click(); await loaded(page, model, index);
          }
          await page.keyboard.press('ArrowRight'); await loaded(page, model, 0);
          await page.keyboard.press('ArrowLeft'); await loaded(page, model, model.photos.length - 1);
          await page.getByRole('button', { name: data.LASH_STYLES.photoDialog.previousLabel }).click(); await loaded(page, model, model.photos.length - 2);
          if (width < 768 && i === 0 && method === 'button') { await swipe(page, -1); await loaded(page, model, 2); await swipe(page, 1); await loaded(page, model, 1); }
          if (i === 0 && method === 'button') await page.screenshot({ path: path.join(artifacts, `dialog-${width}.png`), scale: 'css' });
          await closeChecked(page, opener, before, method);
        }
      }
      await page.locator('#galeria').scrollIntoViewIfNeeded(); await page.waitForTimeout(900);
      const carousel = page.getByRole('region', { name: 'Galeria de trabalhos' });
      assert.equal(await page.locator('#galeria button').count(), 0);
      await carousel.hover();
      const position = await page.locator('.swiper').evaluate(el => ({ running: el.swiper.autoplay.running, position: el.swiper.getTranslate() }));
      await page.waitForTimeout(600);
      const pausedPosition = await page.locator('.swiper').evaluate(el => el.swiper.getTranslate());
      assert(!position.running); assert(Math.abs(pausedPosition - position.position) < 1);
      await page.mouse.move(3, 3);
      await page.waitForTimeout(100);
      assert(await page.locator('.swiper').evaluate(el => el.swiper.autoplay.running));
      await carousel.focus();
      await page.waitForTimeout(100);
      assert(!await carousel.evaluate(el => el.swiper.autoplay.running));
      await carousel.evaluate(el => el.blur());
      await page.waitForTimeout(100);
      await page.locator('footer').scrollIntoViewIfNeeded(); await page.waitForTimeout(400);
      assert(!await page.locator('.swiper').evaluate(el => el.swiper.autoplay.running));
      await page.locator('#galeria').scrollIntoViewIfNeeded(); await page.waitForTimeout(400);
      assert(await page.locator('.swiper').evaluate(el => el.swiper.autoplay.running));
      for (const id of ['diferenciais', 'estilos', 'galeria', 'depoimentos', 'conecte-se']) { await page.locator('#' + id).scrollIntoViewIfNeeded(); await page.waitForTimeout(800); }
      await page.locator('footer').scrollIntoViewIfNeeded();
      assert.deepEqual(await clipping(page), []);
      await page.screenshot({ path: path.join(artifacts, `page-${width}.png`), fullPage: true, scale: 'css' });
      assert.deepEqual(errors, []); assert.deepEqual(consoleErrors, []); assert.deepEqual(failures, []); assert.deepEqual(badResponses, []);
      results.push({ width, models: 5, photos: 13, openings: 15, closeMethods: ['button', 'escape', 'backdrop'], focusAndScroll: true, noEarlyFullImages: true, galleryPauseResume: true, errors, consoleErrors, failures }); save();
      console.log(`PASS production ${width}px: 5 models, 13 photos, 15 openings, keyboard, focus, scroll, pause/resume`);
      await context.close();
    }
    // Fail each model's first full-size image; the other photos and close remain usable.
    for (const width of zoomOnly ? [] : [390, 1440]) {
      const context = await browser.newContext({ viewport: { width, height: 900 } });
      const page = await context.newPage(); const errors = []; page.on('pageerror', e => errors.push(e.message));
      await page.goto(base, { waitUntil: 'networkidle' });
      for (const [i, model] of models.entries()) {
        const url = assetUrl(model.photos[0].fullSrc, base);
        await context.route(url, route => route.fulfill({ status: 404, body: 'Simulated missing photo' }));
        const opener = page.locator('#estilos article').nth(i).getByRole('button');
        const before = await open(page, opener);
        await page.getByRole('status').filter({ hasText: data.LASH_STYLES.photoDialog.errorLabel }).waitFor();
        await page.getByRole('button', { name: data.LASH_STYLES.photoDialog.nextLabel }).click(); await loaded(page, model, 1);
        await closeChecked(page, opener, before, 'escape');
        await context.unroute(url);
      }
      assert.deepEqual(errors, []); results.push({ width, failedImagesRecovered: 5, errors }); save(); await context.close();
    }
    for (const mode of ['reduced', '200-percent-reflow', '200-percent-text']) {
      const page = await browser.newPage({ viewport: { width: mode === '200-percent-reflow' ? 720 : 390, height: 900 }, deviceScaleFactor: mode === '200-percent-reflow' ? 2 : 1, reducedMotion: mode === 'reduced' ? 'reduce' : 'no-preference' });
      await page.goto(base, { waitUntil: 'networkidle' });
      if (mode === '200-percent-text') await page.evaluate(() => {
        const elements = [...document.querySelectorAll('h1,h2,h3,p,a,button,span,blockquote,figcaption')];
        const sizes = elements.map(el => getComputedStyle(el).fontSize);
        elements.forEach((el, i) => el.style.fontSize = `${parseFloat(sizes[i]) * 2}px`);
      });
      for (const id of ['diferenciais', 'estilos', 'galeria', 'depoimentos', 'conecte-se']) { await page.locator('#' + id).scrollIntoViewIfNeeded(); await page.waitForTimeout(850); }
      if (mode === 'reduced') { assert(!await page.locator('.swiper').evaluate(el => el.swiper.autoplay.running)); assert.equal(await page.getByRole('button', { name: 'Pausar animação da galeria' }).count(), 0); }
      await page.locator('footer').scrollIntoViewIfNeeded();
      await page.screenshot({ path: path.join(artifacts, `${mode}.png`), fullPage: true, scale: 'css' });
      assert.deepEqual(await clipping(page), []);
      assert(await page.locator('#diferenciais h3').evaluateAll(headings => headings.every(heading => {
        const r = heading.getBoundingClientRect(), parent = heading.parentElement.getBoundingClientRect();
        return r.left >= parent.left - 1 && r.right <= parent.right + 1;
      })));
      if (mode === '200-percent-text') {
        await page.locator('footer').screenshot({ path: path.join(artifacts, 'zoom-footer.png'), scale: 'css' });
        await page.locator('#diferenciais').screenshot({ path: path.join(artifacts, 'zoom-benefits.png'), scale: 'css' });
        await page.locator('#top').screenshot({ path: path.join(artifacts, 'zoom-hero.png'), scale: 'css' });
      }
      const opener = page.locator('#estilos article').first().getByRole('button'); const before = await open(page, opener); await loaded(page, models[0], 0); await closeChecked(page, opener, before, 'escape');
      await page.screenshot({ path: path.join(artifacts, `${mode}.png`), fullPage: true, scale: 'css' });
      results.push({ mode, passed: true }); save(); await page.close();
    }
    // Direct hash navigation and refresh exercise the only public route, '/'.
    const page = await browser.newPage();
    await page.goto(base + '/#estilos', { waitUntil: 'networkidle' }); await page.reload({ waitUntil: 'networkidle' });
    assert.equal(await page.locator('#estilos article').count(), 5); await page.close();
    console.log(zoomOnly ? 'PASS reduced motion, 200% reflow/text, direct URL and refresh' : 'PASS network-error recovery, reduced motion, 200% reflow/text, direct URL and refresh');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); save(); process.exitCode = 1; });
