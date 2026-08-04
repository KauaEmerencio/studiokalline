// Conteúdo central do site.
// Edite os valores abaixo para atualizar textos, links e contatos
// sem precisar mexer nos componentes.

import gallery1 from "../assets/gallery/gallery-1.jpg";
import gallery2 from "../assets/gallery/gallery-2.jpg";
import gallery3 from "../assets/gallery/gallery-3.jpg";
import gallery4 from "../assets/gallery/gallery-4.jpg";
import gallery5 from "../assets/gallery/gallery-5.jpg";
import gallery6 from "../assets/gallery/gallery-6.jpg";
import gallery7 from "../assets/gallery/gallery-7.jpg";
export const BOOKING_URL = "https://online.maapp.com.br/darclashdesigne";

export const CONTACT = {
  whatsapp: "https://wa.me/5579996450657",
  instagram: "https://instagram.com/d.kaline",
  tiktok: "https://tiktok.com/@dkalline",
  location: "https://maps.app.goo.gl/8JgDjXFqvcrKtoN5A",
  locationLabel: "Poço Redondo, SE",
  email: "contato@studiokaline.com.br",
  hours: [
    { days: "Segunda a Sábado", time: "09h às 19h" },
    { days: "Domingo", time: "Fechado" },
  ],
};

export const HERO = {
  eyebrow: "Bem-vinda ao",
  title: "STUDIO KALINE",
  subtitle: "Realce sua beleza com cílios que valorizam o seu olhar.",
  subtitleHighlight: "seu olhar",
  caption: "Escolha o melhor dia e horário na nossa",
  captionLink: "agenda online.",
  indicators: [
    { icon: "Users", label: "+300 clientes atendidas" },
    { icon: "Sparkles", label: "Atendimento personalizado" },
    { icon: "Clock", label: "Agendamento online em menos de 1 minuto" },
  ],
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

export const GALLERY_IMAGES = [
  { id: 1, src: gallery1, label: "Trabalho realizado no Studio Kaline" },
  { id: 2, src: gallery2, label: "Trabalho realizado no Studio Kaline" },
  { id: 3, src: gallery3, label: "Trabalho realizado no Studio Kaline" },
  { id: 4, src: gallery4, label: "Trabalho realizado no Studio Kaline" },
  { id: 5, src: gallery5, label: "Trabalho realizado no Studio Kaline" },
  { id: 6, src: gallery6, label: "Trabalho realizado no Studio Kaline" },
  { id: 7, src: gallery7, label: "Trabalho realizado no Studio Kaline" },
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

export const SOCIAL_LINKS = [
  { key: "whatsapp", href: CONTACT.whatsapp, label: "Fale comigo" },
  { key: "tiktok", href: CONTACT.tiktok, label: "Acompanhe" },
  { key: "instagram", href: CONTACT.instagram, label: "Veja mais" },
  { key: "location", href: CONTACT.location, label: "Como chegar" },
] as const;
