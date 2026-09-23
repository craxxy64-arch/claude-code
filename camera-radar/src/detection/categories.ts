/** Groups the 80 COCO classes into display categories with a colour each. */
export type Category = 'person' | 'vehicle' | 'animal' | 'electronics' | 'furniture' | 'carry' | 'kitchen' | 'other';

const MAP: Record<string, Category> = {
  person: 'person',
  bicycle: 'vehicle', car: 'vehicle', motorcycle: 'vehicle', airplane: 'vehicle', bus: 'vehicle',
  train: 'vehicle', truck: 'vehicle', boat: 'vehicle',
  bird: 'animal', cat: 'animal', dog: 'animal', horse: 'animal', sheep: 'animal', cow: 'animal',
  elephant: 'animal', bear: 'animal', zebra: 'animal', giraffe: 'animal',
  tv: 'electronics', laptop: 'electronics', mouse: 'electronics', remote: 'electronics',
  keyboard: 'electronics', 'cell phone': 'electronics', microwave: 'electronics', oven: 'electronics',
  toaster: 'electronics', refrigerator: 'electronics', clock: 'electronics', 'hair drier': 'electronics',
  chair: 'furniture', couch: 'furniture', bed: 'furniture', 'dining table': 'furniture', toilet: 'furniture',
  bench: 'furniture', 'potted plant': 'furniture', sink: 'furniture',
  backpack: 'carry', umbrella: 'carry', handbag: 'carry', tie: 'carry', suitcase: 'carry',
  bottle: 'kitchen', 'wine glass': 'kitchen', cup: 'kitchen', fork: 'kitchen', knife: 'kitchen',
  spoon: 'kitchen', bowl: 'kitchen', banana: 'kitchen', apple: 'kitchen', sandwich: 'kitchen',
  orange: 'kitchen', broccoli: 'kitchen', carrot: 'kitchen', 'hot dog': 'kitchen', pizza: 'kitchen',
  donut: 'kitchen', cake: 'kitchen',
};

export const CATEGORY_COLORS: Record<Category, string> = {
  person: '#5cf2b0',
  vehicle: '#7aa7ff',
  animal: '#ffb547',
  electronics: '#b99bff',
  furniture: '#8fb8c9',
  carry: '#ff8fb1',
  kitchen: '#f5e27a',
  other: '#9fe6ff',
};

export const categoryOf = (label: string): Category => MAP[label] ?? 'other';
export const colorFor = (label: string): string => (label === 'motion' ? '#ffb547' : CATEGORY_COLORS[categoryOf(label)]);
