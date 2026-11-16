// Conteúdo central do site.

import gallery1 from "../assets/gallery/gallery-1.jpg";
import gallery2 from "../assets/gallery/gallery-2.jpg";
import gallery3 from "../assets/gallery/gallery-3.jpg";
import gallery4 from "../assets/gallery/gallery-4.jpg";
import gallery5 from "../assets/gallery/gallery-5.jpg";
import gallery6 from "../assets/gallery/gallery-6.jpg";
import gallery7 from "../assets/gallery/gallery-7.jpg";
import gallery8 from "../assets/gallery/gallery-8.jpg";
import foxEyesSmall from "../assets/gallery/optimized/fox-eyes-480.webp";
import foxEyes from "../assets/gallery/optimized/fox-eyes-960.webp";
import foxEyesLarge from "../assets/gallery/optimized/fox-eyes-1440.webp";
import volumeBrasileiroSmall from "../assets/gallery/optimized/volume-brasileiro-480.webp";
import volumeBrasileiro from "../assets/gallery/optimized/volume-brasileiro-960.webp";
import volumeBrasileiroLarge from "../assets/gallery/optimized/volume-brasileiro-1440.webp";
import volumeClassSmall from "../assets/gallery/optimized/volume-class-480.webp";
import volumeClass from "../assets/gallery/optimized/volume-class-960.webp";
import volumeClassLarge from "../assets/gallery/optimized/volume-class-1440.webp";
import volumeEgipcioSmall from "../assets/gallery/optimized/volume-egipcio-480.webp";
import volumeEgipcio from "../assets/gallery/optimized/volume-egipcio-960.webp";
import volumeEgipcioLarge from "../assets/gallery/optimized/volume-egipcio-1440.webp";
import volumeGlamourSmall from "../assets/gallery/optimized/volume-glamour-480.webp";
import volumeGlamour from "../assets/gallery/optimized/volume-glamour-960.webp";
import volumeGlamourLarge from "../assets/gallery/optimized/volume-glamour-1440.webp";
import foxEyesFull from "../assets/gallery/optimized/fox-eyes-1920.webp";
import volumeBrasileiroFull from "../assets/gallery/optimized/volume-brasileiro-1920.webp";
import volumeClassFull from "../assets/gallery/optimized/volume-class-1920.webp";
import volumeEgipcioFull from "../assets/gallery/optimized/volume-egipcio-1920.webp";
import volumeGlamourFull from "../assets/gallery/optimized/volume-glamour-1920.webp";
import fox2Preview from "../assets/gallery/optimized/fox-eyes-2-480.webp";
import fox2Full from "../assets/gallery/optimized/fox-eyes-2-894.webp";
import fox3Preview from "../assets/gallery/optimized/fox-eyes-3-480.webp";
import fox3Full from "../assets/gallery/optimized/fox-eyes-3-720.webp";
import brasileiro2Preview from "../assets/gallery/optimized/volume-brasileiro-2-480.webp";
import brasileiro2Full from "../assets/gallery/optimized/volume-brasileiro-2-720.webp";
import class2Preview from "../assets/gallery/optimized/volume-class-2-480.webp";
import class2Full from "../assets/gallery/optimized/volume-class-2-1920.webp";
import egipcio2Preview from "../assets/gallery/optimized/volume-egipcio-2-480.webp";
import egipcio2Full from "../assets/gallery/optimized/volume-egipcio-2-1920.webp";
import egipcio3Preview from "../assets/gallery/optimized/volume-egipcio-3-480.webp";
import egipcio3Full from "../assets/gallery/optimized/volume-egipcio-3-1920.webp";
import glamour2Preview from "../assets/gallery/optimized/volume-glamour-2-480.webp";
import glamour2Full from "../assets/gallery/optimized/volume-glamour-2-900.webp";
import glamour3Preview from "../assets/gallery/optimized/volume-glamour-3-480.webp";
import glamour3Full from "../assets/gallery/optimized/volume-glamour-3-1920.webp";
export const BOOKING_URL = "https://online.maapp.com.br/darclashdesigne";

export const CONTACT = {
  whatsapp: "https://wa.me/5579996450657",
  instagram: "https://www.instagram.com/d.kalline/",
  tiktok: "https://tiktok.com/@dkalline",
  location: "https://maps.app.goo.gl/8JgDjXFqvcrKtoN5A",
  locationLabel: "Poço Redondo, SE",
  email: "martinsdarc9@gmail.com",
  hours: [
    { days: "Segunda a Sábado", time: "8:30h às 20:30h" },
    { days: "Domingo", time: "Fechado" },
  ],
};

export const HERO = {
  title: " Darc Kaline - Lash Designer",
  subtitle: "Realce sua beleza com cílios que valorizam o seu olhar.",
  subtitleHighlight: "seu olhar",
  caption: "Descubra o estilo de cílios que valoriza a singularidade do seu olhar.",
  captionLink: "Conheça nossos modelos ↓"
};

export const BENEFITS = [
  {
    icon: "Feather",
    title: "Resultado natural",
    text: "Técnicas de fio a fio que respeitam o formato do seu olhar e a harmonia do seu rosto.",
  },
  {
    icon: "Clock",
    title: "Atendimento pontual",
    text: "Respeitamos seu tempo e garantimos uma experiência única, sem pressa.",
  },
  {
    icon: "Heart",
    title: "Durabilidade e conforto",
    text: "Produtos premium para um resultado que dura mais e cuida de você.",
  },
];

export interface LashPhoto {
  id: string;
  source: string;
  src: string;
  srcSet?: string;
  alt: string;
  width: number;
  height: number;
  objectPosition?: string;
  fullSrc?: string;
  fullWidth?: number;
  fullHeight?: number;
}

export interface LashStyle {
  id: string;
  name: string;
  description: string;
  photos: LashPhoto[];
}

export const LASH_STYLES: {
  title: string;
  subtitle: string;
  bookingLabel: string;
  photoDialog: {
    openLabel: string;
    singleOpenLabel: string;
    cardLabel: string;
    singleCardLabel: string;
    closeLabel: string;
    previousLabel: string;
    nextLabel: string;
    counterLabel: string;
    loadingLabel: string;
    errorLabel: string;
  };
  models: LashStyle[];
} = {
  title: "Qual estilo combina com você?",
  subtitle: "Conheça os estilos e inspire-se para o seu próximo atendimento.",
  bookingLabel: "Agendar meu horário",
  photoDialog: {
    openLabel: "Ver {count} fotos de {name}",
    singleOpenLabel: "Ver foto de {name}",
    cardLabel: "Ver {count} fotos",
    singleCardLabel: "Ver foto",
    closeLabel: "Fechar foto ampliada",
    previousLabel: "Foto anterior",
    nextLabel: "Próxima foto",
    counterLabel: "{current} de {total}",
    loadingLabel: "Carregando foto…",
    errorLabel: "Não foi possível carregar esta foto. Você pode continuar navegando ou fechar a galeria.",
  },
  models: [
    {
      id: "fox-eyes",
      name: "Fox Eyes",
      description: "Olhar marcante e alongado, com efeito puxado e sofisticado.",
      // The first photo is the card cover. Keep original filenames for traceability.
      photos: [{
        id: "fox-eyes-1",
        source: "Modelofox.jpeg",
        src: foxEyes,
        srcSet: `${foxEyesSmall} 480w, ${foxEyes} 960w, ${foxEyesLarge} 1440w`,
        alt: "Extensão de cílios no estilo Fox Eyes",
        width: 960,
        height: 1707,
        objectPosition: "50% 46%",
        fullSrc: foxEyesFull,
        fullWidth: 1920,
        fullHeight: 3414,
      }, {
        id: "fox-eyes-2",
        source: "ModeloFox2.jpeg",
        src: fox2Preview,
        alt: "Extensão de cílios no estilo Fox Eyes — foto 2",
        width: 480,
        height: 859,
        fullSrc: fox2Full,
        fullWidth: 894,
        fullHeight: 1600,
      }, {
        id: "fox-eyes-3",
        source: "modelofox3.jpeg",
        src: fox3Preview,
        alt: "Extensão de cílios no estilo Fox Eyes — foto 3",
        width: 480,
        height: 853,
        fullSrc: fox3Full,
        fullWidth: 720,
        fullHeight: 1280,
      }],
    },
    {
      id: "volume-brasileiro",
      name: "Volume Brasileiro",
      description: "Fios em formato de Y que proporcionam um olhar mais preenchido e definido. Ideal para quem deseja destacar os olhos e ter cílios marcantes na medida certa.",
      photos: [{
        id: "volume-brasileiro-1",
        source: "VolumeBrasileiro.jpeg",
        src: volumeBrasileiro,
        srcSet: `${volumeBrasileiroSmall} 480w, ${volumeBrasileiro} 960w, ${volumeBrasileiroLarge} 1440w`,
        alt: "Extensão de cílios no estilo Volume Brasileiro",
        width: 960,
        height: 1707,
        objectPosition: "50% 44%",
        fullSrc: volumeBrasileiroFull,
        fullWidth: 1920,
        fullHeight: 3413,
      }, {
        id: "volume-brasileiro-2",
        source: "VolumeBrasileiro2.jpeg",
        src: brasileiro2Preview,
        alt: "Extensão de cílios no estilo Volume Brasileiro — foto 2",
        width: 480,
        height: 853,
        fullSrc: brasileiro2Full,
        fullWidth: 720,
        fullHeight: 1280,
      }],
    },
    {
      id: "volume-class",
      name: "Volume Class",
      description: "Fios leves que proporcionam um olhar delicado e definido. Ideal para quem deseja realçar os olhos com naturalidade e um toque de elegância.",
      photos: [{
        id: "volume-class-1",
        source: "VolumeClass.jpeg",
        src: volumeClass,
        srcSet: `${volumeClassSmall} 480w, ${volumeClass} 960w, ${volumeClassLarge} 1440w`,
        alt: "Extensão de cílios no estilo Volume Class",
        width: 960,
        height: 1706,
        objectPosition: "50% 38%",
        fullSrc: volumeClassFull,
        fullWidth: 1920,
        fullHeight: 3413,
      }, {
        id: "volume-class-2",
        source: "VolumeClass2.jpg",
        src: class2Preview,
        alt: "Extensão de cílios no estilo Volume Class — foto 2",
        width: 480,
        height: 853,
        fullSrc: class2Full,
        fullWidth: 1920,
        fullHeight: 3413,
      }],
    },
    {
      id: "volume-egipcio",
      name: "Volume Egípcio",
      description: "Efeito profundo, esfumado e uniforme, com elegância e leveza.",
      photos: [{
        id: "volume-egipcio-1",
        source: "VolumeEgipcio.jpeg",
        src: volumeEgipcio,
        srcSet: `${volumeEgipcioSmall} 480w, ${volumeEgipcio} 960w, ${volumeEgipcioLarge} 1440w`,
        alt: "Extensão de cílios no estilo Volume Egípcio",
        width: 960,
        height: 1707,
        objectPosition: "50% 38%",
        fullSrc: volumeEgipcioFull,
        fullWidth: 1920,
        fullHeight: 3413,
      }, {
        id: "volume-egipcio-2",
        source: "VolumeEgipcio2.jpeg",
        src: egipcio2Preview,
        alt: "Extensão de cílios no estilo Volume Egípcio — foto 2",
        width: 480,
        height: 882,
        fullSrc: egipcio2Full,
        fullWidth: 1920,
        fullHeight: 3528,
      }, {
        id: "volume-egipcio-3",
        source: "VolumeEgipcio3.jpg",
        src: egipcio3Preview,
        alt: "Extensão de cílios no estilo Volume Egípcio — foto 3",
        width: 480,
        height: 853,
        fullSrc: egipcio3Full,
        fullWidth: 1920,
        fullHeight: 3413,
      }],
    },
    {
      id: "volume-glamour",
      name: "Volume Glamour",
      description: "Destaque e intensidade com um acabamento leve e sofisticado.",
      photos: [{
        id: "volume-glamour-1",
        source: "VolumeGlamuor.jpeg",
        src: volumeGlamour,
        srcSet: `${volumeGlamourSmall} 480w, ${volumeGlamour} 960w, ${volumeGlamourLarge} 1440w`,
        alt: "Extensão de cílios no estilo Volume Glamour",
        width: 960,
        height: 1707,
        objectPosition: "50% 46%",
        fullSrc: volumeGlamourFull,
        fullWidth: 1920,
        fullHeight: 3413,
      }, {
        id: "volume-glamour-2",
        source: "VolumeGlamuor2.jpeg",
        src: glamour2Preview,
        alt: "Extensão de cílios no estilo Volume Glamour — foto 2",
        width: 480,
        height: 853,
        fullSrc: glamour2Full,
        fullWidth: 900,
        fullHeight: 1600,
      }, {
        id: "volume-glamour-3",
        source: "VolumeGlamour3.jpg",
        src: glamour3Preview,
        alt: "Extensão de cílios no estilo Volume Glamour — foto 3",
        width: 480,
        height: 853,
        fullSrc: glamour3Full,
        fullWidth: 1920,
        fullHeight: 3413,
      }],
    },
  ],
};

export const GALLERY_IMAGES = [
  { id: 1, src: gallery1, label: "Trabalho realizado no Studio Kaline" },
  { id: 2, src: gallery2, label: "Trabalho realizado no Studio Kaline" },
  { id: 3, src: gallery3, label: "Trabalho realizado no Studio Kaline" },
  { id: 4, src: gallery4, label: "Trabalho realizado no Studio Kaline" },
  { id: 5, src: gallery5, label: "Trabalho realizado no Studio Kaline" },
  { id: 6, src: gallery6, label: "Trabalho realizado no Studio Kaline" },
  { id: 7, src: gallery7, label: "Trabalho realizado no Studio Kaline" },
  { id: 8, src: gallery8, label: "Trabalho realizado no Studio Kaline" },
];

export const TESTIMONIALS = [
  {
    name: "Daphny",
    text: "Amei demais! Atendimento maravilhoso e o resultado ficou perfeito. Recomendo!",
  },
  {
    name: "Amanda Vieria.",
    text: "Profissional incrível, ambiente acolhedor e cílios lindos e naturais. Não troco por nada!",
  },
  {
    name: "Fatinha",
    text: "Além de talentosa, é super atenciosa. Me sinto linda cada vez que saio de lá.",
  },
];

export const CONNECT_SECTION = {
  label: "CONECTE-SE",
  description: "Venha nos visitar, acompanhe nosso trabalho nas redes sociais e reserve um momento para realçar o seu olhar.",
  links: [
    { key: "booking", label: "Agende seu horário", href: BOOKING_URL },
    { key: "whatsapp", label: "Tire suas dúvidas", href: CONTACT.whatsapp },
    { key: "instagram", label: "Veja mais fotos no Instagram", href: CONTACT.instagram },
    { key: "tiktok", label: "Acompanhe no TikTok", href: CONTACT.tiktok },
    { key: "location", label: "Como chegar", href: CONTACT.location },
  ],
} as const;
