# Studio Kaline — Landing Page

Landing page premium para o Studio Kaline (extensão de cílios), construída para uso como link da bio do Instagram.

## Stack

React + Vite + TypeScript + Tailwind CSS + Framer Motion + Lucide React + Swiper.

## Como rodar

```bash
npm install
npm run dev
```

Abra `http://localhost:5173`.

Build de produção:

```bash
npm run build
npm run preview
```

## O que editar antes de publicar

### 1. Fotos (mais importante)

O projeto foi entregue **sem fotos definitivas** — os espaços de imagem usam o
componente `src/components/shared/PlaceholderPhoto.tsx` (um gradiente suave
com um ícone de câmera) só para você avaliar o layout com fidelidade, sem
usar nenhuma foto de terceiros.

Para trocar por fotos reais:

1. Coloque os arquivos em `src/assets/` (ex: `hero.jpg`, `galeria-1.jpg`).
2. No componente correspondente (`Hero.tsx`, `Gallery.tsx`), troque:
   ```tsx
   <PlaceholderPhoto ... />
   ```
   por:
   ```tsx
   <img src={heroImg} alt="Studio Kaline" className="h-full w-full object-cover" />
   ```
   (importando a imagem no topo do arquivo: `import heroImg from "../../assets/hero.jpg"`).

Recomendação: fotos verticais, em boa luz, estilo ensaio — evite selfies ou
fotos com fundo de carro/casa, conforme o briefing.

### 2. Textos, links e contatos

Tudo fica centralizado em **`src/data/site.ts`**:

- `BOOKING_URL` — link de agendamento (Maapp).
- `CONTACT` — WhatsApp, Instagram, TikTok e localização.
- `HERO`, `BENEFITS`, `GALLERY_IMAGES`, `TESTIMONIALS` — todos os textos da página.

Edite os valores ali; os componentes atualizam automaticamente.

### 3. Cores e tipografia

Definidas em `tailwind.config.js` (paleta `cream`, `ink`, `rose`) e nas fontes
importadas em `index.html` (Cormorant Garamond + Poppins).

## Estrutura

```
src/
├── assets/          → fotos reais entram aqui
├── components/
│   ├── Header/
│   ├── Hero/
│   ├── CTA/          → botão de agendamento reutilizável
│   ├── Benefits/      → "Diferenciais"
│   ├── Gallery/        → carrossel Swiper
│   ├── Testimonials/
│   ├── SocialLinks/
│   ├── StickyCTA/       → botão fixo inferior
│   ├── Footer/
│   └── shared/           → GazeLine (assinatura visual), Reveal, PlaceholderPhoto
├── data/site.ts            → todo o conteúdo editável
├── hooks/
├── pages/Home/
└── styles/globals.css
```

## Assinatura visual: "linha do olhar"

O traço curvo que aparece sob o título do hero, entre seções e no rodapé
(`GazeLine.tsx`) é desenhado como referência direta ao produto — a curva de
um cílio / traço de eyeliner alado — e se anima ao entrar na tela. É o único
elemento decorativo recorrente da página; todo o resto foi mantido deliberadamente
quieto para não competir com ele.
