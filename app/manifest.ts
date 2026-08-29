import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'EV Stay - EV Charging Solutions for Hospitality',
    short_name: 'EV Stay',
    description: 'Electric mobility connected with hospitality. EV charging solutions for hotels, resorts, restaurants, and highway destinations.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#16a34a',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
