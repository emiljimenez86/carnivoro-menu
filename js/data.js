const menuData = {
  restaurant: "Carnívoro",
  tagline: "Asados al carbón",
  categories: [
    {
      id: "parrilla",
      name: "Carnes a la Parrilla",
      short: "Incluye acompañamientos",
      accent: "fire",
      note: "Patacón, guacamole, papa, yuca y&nbsp;ensalada.<br>Salsas de la casa y chimichurri.",
      items: [
        { name: "Chuleta", price: 32000 },
        { name: "Costilla", price: 37000 },
        { name: "Churrasco", price: 38000 },
        { name: "Punta", price: 40000 },
        { name: "Solomito", price: 37000 },
      ],
    },
    {
      id: "pinchos",
      name: "Pinchos",
      short: "Res, cerdo o mixto",
      accent: "gold",
      note: "Papa, patacones, guacamole y ensalada.",
      items: [
        { name: "Pincho de res", price: 23000 },
        { name: "Pincho de cerdo", price: 23000 },
        { name: "Pincho mixto", price: 23000 },
      ],
    },
    {
      id: "chuzo",
      name: "Chuzo de pollo",
      short: "Con tocineta",
      accent: "red",
      note: "Papa, patacones, ensalada y guacamole.",
      items: [
        {
          name: "Chuzo de pollo con tocineta",
          price: 23000,
        },
      ],
    },
    {
      id: "chorizos",
      name: "Chorizos",
      short: "Seis variedades",
      accent: "brown",
      note: "Patacón, ensalada y guacamole.",
      items: [
        { name: "Chorizo de chicharrón", price: 18000 },
        { name: "Chorizo llanero", price: 18000 },
        { name: "Chorizo argentino", price: 18000 },
        { name: "Chorizo santarrosano", price: 18000 },
        { name: "Chorizo brasilero", price: 18000 },
        { name: "Chorizo antioqueño", price: 18000 },
      ],
    },
    {
      id: "adiciones",
      name: "Adiciones",
      short: "Para completar",
      accent: "ember",
      items: [
        { name: "Adición de chorizo", price: 10000 },
        { name: "Adición de patacones", price: 5000 },
        { name: "Adición de yuca o papa", price: 5000 },
      ],
    },
    {
      id: "jugos",
      name: "Jugos naturales",
      short: "En leche o agua",
      accent: "gold",
      items: [
        { name: "Mora", price: 10000, bases: ["leche", "agua"] },
        { name: "Maracuyá", price: 10000, bases: ["leche", "agua"] },
        { name: "Mango", price: 10000, bases: ["leche", "agua"] },
      ],
    },
    {
      id: "bebidas",
      name: "Bebidas",
      short: "Gaseosa y agua",
      accent: "red",
      items: [
        { name: "Gaseosa", priceLabel: "$5.000 / $10.000" },
        { name: "Agua", price: 4000 },
      ],
    },
  ],
};

const contactData = {
  title: "Contáctanos",
  hours: {
    label: "Horario de atención",
    time: "6:00 p.m. a 11:00 p.m.",
    days: "Lunes, martes, jueves, viernes, sábado y domingo",
    closed: "Cerrado los miércoles",
  },
  address: {
    label: "Nuestra dirección",
    lines: [
      "Calle 22 # 08-115 Apto 301",
      "Barrio Kennedy",
      "Caucasia - Antioquia",
    ],
    href: "https://maps.app.goo.gl/6if82UQ7iAXWfKPZA",
  },
  links: [
    {
      id: "phone",
      name: "Llamar",
      href: "tel:+573217947907",
      icon: "image/redes/llamadas.png",
    },
    {
      id: "whatsapp",
      name: "WhatsApp",
      href: "https://wa.me/573217947907",
      icon: "image/redes/whatsApp.png",
    },
    {
      id: "instagram",
      name: "Instagram",
      href: "https://www.instagram.com/carnivoro_caucasia/",
      icon: "image/redes/instagram.png",
    },
    {
      id: "facebook",
      name: "Facebook",
      href: "",
      icon: "image/redes/facebook.png",
    },
  ],
  whatsappOrder: {
    phone: "573217947907",
    icon: "image/redes/whatsApp.png",
    label: "Pedir Domicilio Por WhatsApp",
  },
};

function formatPrice(value) {
  return `$${value.toLocaleString("es-CO")}`;
}
