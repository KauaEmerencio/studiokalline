# Studio Kaline

Landing page do Studio Kaline para apresentação dos serviços e acesso ao agendamento.

## Desenvolvimento

Requer uma versão do Node compatível com o Vite instalado. Nesta revisão foi usado Node 20.19.2.

```sh
npm ci
npm run dev
```

Stack: React, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide React e Swiper.
Fontes: Cormorant Garamond e Inter, solicitadas ao Google Fonts.

## Validação e produção

```sh
npm run check:integrity
npm test
npm run lint
npm run build
npm run preview
```

O build executa TypeScript e gera a versão estática em `dist/`.
O preview serve esse build; não é um servidor de produção.
A aplicação tem uma rota pública (`/`) e seções acessadas por âncoras.

O teste de navegador é opcional e precisa de uma instalação de Playwright com
Chromium disponível, além do preview em execução:

```sh
node scripts/test-production.cjs playwright http://127.0.0.1:4173
```

O primeiro argumento também pode ser o caminho de uma instalação existente do
Playwright. O roteiro cobre os quatro tamanhos de tela, galerias, erros de rede,
teclado, foco, pausa do carrossel, movimento reduzido e ampliação de texto/reflow.
Resultados e capturas ficam em `.landing-validation.local/production-review/`.

## Conteúdo e imagens

- `src/data/site.ts`: textos, links, contatos, modelos e listas de fotos.
- `tailwind.config.js`: paleta, tipografia e tokens visuais.
- `src/components/Hero/Hero.tsx`: picture responsivo com uma única imagem do hero por largura.
- `src/components/LashStyles/`: cartões e diálogo nativo das galerias.
- `src/components/Gallery/`: carrossel com pausa e respeito a movimento reduzido.
- `src/pages/Home/Home.tsx`: composição das seções.
- `src/styles/globals.css`: estilos globais e componentes utilitários.

Os originais ficam em `src/assets/`. Não os substitua por derivados comprimidos.
Os WebPs existentes das galerias são usados nos cartões e na visualização ampliada.
Consulte [o mapeamento e as instruções das galerias](docs/lash-galleries.md) antes de adicionar fotos.

Para recriar apenas os derivados do hero, com Pillow instalado:

```sh
python scripts/optimize-hero-images.py
```

O script preserva a resolução e os originais. A foto móvel atual tem 302 × 533 px;
uma fonte maior seria necessária para ganhar nitidez em telas densas.

## Publicação

Na Vercel, selecionar Vite, comando `npm run build` e diretório de saída `dist`.
Nenhum domínio definitivo está configurado no projeto. Canonical, sitemap e
imagem absoluta de compartilhamento devem ser definidos quando ele for confirmado.
Não colocar segredos em variáveis `VITE_*`: elas são públicas no bundle.

Veja [o relatório técnico e as limitações da revisão](docs/pre-publication-review.md).
