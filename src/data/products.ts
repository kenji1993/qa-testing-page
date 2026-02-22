import type { Product } from '../types';

export const PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'Ojo de Bife',
        description:
            'Corte premium de 400g, cocción a la parrilla con leña de quebracho. Jugoso, tierno y con el sabor inconfundible de la parrilla argentina.',
        price: 4200,
        imageUrl: 'https://images.unsplash.com/photo-1558030006-450675393462?w=600&q=80',
        category: 'Carnes',
    },
    {
        id: '2',
        name: 'Matambre a la Pizza',
        description:
            'Matambre a la parrilla cubierto con salsa de tomate, mozzarella derretida, morrones y aceitunas. Un clásico de bodegón bonaerense.',
        price: 2800,
        imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80',
        category: 'Carnes',
    },
    {
        id: '3',
        name: 'Choripán Artesanal',
        description:
            'Chorizo criollo artesanal en pan de campo recién horneado, con chimichurri de la casa y salsa criolla. El rey de la picada.',
        price: 1200,
        imageUrl: 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?w=600&q=80',
        category: 'Sándwiches',
    },
    {
        id: '4',
        name: 'Provoleta con Romero',
        description:
            'Queso provolone madurado grillado en sartén de hierro, con romero fresco, ají molido y un hilo de oliva. Perfecta entrada para compartir.',
        price: 1800,
        imageUrl: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=600&q=80',
        category: 'Entradas',
    },
    {
        id: '5',
        name: 'Vacío a la Parrilla',
        description:
            'Corte de vacío 350g con cocción lenta a fuego bajo. Piel crocante, centro rosado. Acompañado de papas rústicas al horno.',
        price: 3500,
        imageUrl: 'https://images.unsplash.com/photo-1529694157872-4e0c0f3b238b?w=600&q=80',
        category: 'Carnes',
    },
    {
        id: '6',
        name: 'Empanadas de Carne (x4)',
        description:
            'Empanadas criollas horneadas, rellenas con carne cortada a cuchillo, aceitunas, huevo duro y especias de la abuela. Sellado repulgue tucumano.',
        price: 1600,
        imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80',
        category: 'Entradas',
    },
];

export const WHATSAPP_NUMBER = '5491100000000';
export const RESTAURANT_NAME = 'La Parrilla del Gaucho';
