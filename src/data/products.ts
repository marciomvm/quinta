export interface Product {
  id: string;
  name: string;
  desc: { en: string; pt: string };
  price: { day1: string; following: string; deposit: string };
  imageUrl: string;
}

export const seedProducts: Product[] = [
  {
    id: '1',
    name: 'Stihl 235 Strimmer',
    desc: {
      en: 'Powerful strimmer for cutting grass and brush. Ideal for clearing overgrown areas around your property.',
      pt: 'Roçadora potente para corte de ervas e silvado. Ideal para limpar áreas com vegetação densa.',
    },
    price: { day1: '35€', following: '30€/day', deposit: '150€' },
    imageUrl: '',
  },
  {
    id: '2',
    name: 'Stihl MH600 Rotavator',
    desc: {
      en: 'Heavy-duty rotavator for soil preparation. Includes furrowing attachment for creating planting rows.',
      pt: 'Motoenxada resistente para preparação de solo. Inclui acessório de sulco para criar linhas de plantação.',
    },
    price: { day1: '50€', following: '45€/day', deposit: '200€' },
    imageUrl: '',
  },
  {
    id: '3',
    name: 'Stihl RE90 Pressure Washer',
    desc: {
      en: '1,800 PSI pressure washer with multiple nozzle attachments. Perfect for cleaning patios, walls, and vehicles.',
      pt: 'Lavadora de alta pressão 1.800 PSI com vários bicos. Perfeita para limpar pátios, paredes e veículos.',
    },
    price: { day1: '25€', following: '20€/day', deposit: '50€' },
    imageUrl: '',
  },
  {
    id: '4',
    name: 'Cement Mixer 150L',
    desc: {
      en: 'Electric 150-litre cement mixer. Compatible with solar/generator power for off-grid locations.',
      pt: 'Betoneira eléctrica de 150 litros. Compatível com energia solar/gerador para locais sem rede.',
    },
    price: { day1: '40€', following: '35€/day', deposit: '100€' },
    imageUrl: '',
  },
  {
    id: '5',
    name: 'DeWalt SDS Max Hammer Drill/Breaker',
    desc: {
      en: 'Combined hammer drill and breaker with vibration control. Ideal for demolition and concrete work.',
      pt: 'Martelo perfurador e demolidor combinado com controlo de vibração. Ideal para demolição e trabalhos em betão.',
    },
    price: { day1: '50€', following: '45€/day', deposit: '300€' },
    imageUrl: '',
  },
  {
    id: '6',
    name: 'DeWalt 230mm Disc Grinder',
    desc: {
      en: 'Large disc grinder for heavy cutting tasks. Suitable for metal and masonry cutting.',
      pt: 'Rebarbadora de disco grande para cortes pesados. Adequada para corte de metal e alvenaria.',
    },
    price: { day1: '20€', following: '15€/day', deposit: '30€' },
    imageUrl: '',
  },
  {
    id: '7',
    name: 'Stanley 2900W 7HP Petrol Generator',
    desc: {
      en: 'Single-phase petrol generator with 2 outlets and wheels. Reliable power anywhere on your site.',
      pt: 'Gerador a gasolina monofásico com 2 tomadas e rodas. Energia fiável em qualquer local da obra.',
    },
    price: { day1: '40€', following: '35€/day', deposit: '100€' },
    imageUrl: '',
  },
  {
    id: '8',
    name: '90KG Whacker Plate/Compactor',
    desc: {
      en: 'Petrol-powered plate compactor for compacting soil, gravel, and paving. Essential for groundwork.',
      pt: 'Placa compactadora a gasolina para compactar solo, gravilha e pavimento. Essencial para terraplanagens.',
    },
    price: { day1: '50€', following: '45€/day', deposit: '300€' },
    imageUrl: '',
  },
  {
    id: '9',
    name: 'SDS Max Breaker Chisel Set',
    desc: {
      en: 'Set of 5 chisel tips for SDS Max breakers. Available for hire or purchase separately.',
      pt: 'Conjunto de 5 ponteiras para martelos SDS Max. Disponível para aluguer ou compra em separado.',
    },
    price: { day1: '10€/day', following: '—', deposit: '—' },
    imageUrl: '',
  },
];
