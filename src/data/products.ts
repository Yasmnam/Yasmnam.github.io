import type { Product } from './types';

/** Products in the order they appear under "Selected work". */
export const products: Product[] = [
  {
    key: 'apodienste',
    name: 'Apodienste',
    kicker: 'PharmaBits · 2024',
    about:
      'A platform pharmacies use to run patient services, from booking appointments to documentation and follow-up.',
    meta: [
      { label: 'Domain', value: 'Healthcare · Pharmacy SaaS' },
      { label: 'Used by', value: 'Pharmacists and pharmacy teams' },
      { label: 'My role', value: 'Product designer' },
    ],
    thumb: {
      org: 'PharmaBits / apodienste',
      tint: 'apodienste',
      carousel: {
        label: 'apodienste product shots',
        slides: [
          {
            src: '/public/images/apodienste/insight-dashboard.webp',
            alt: "apodienste's insight dashboard on a laptop, showing total and monthly service statistics, a revenue chart, and elderly-house visit stats by status",
            width: 2000,
            height: 1414,
            lazy: false,
          },
          {
            src: '/public/images/apodienste/receipt-signing.webp',
            alt: "apodienste on a tablet: a receipt confirmation for four patients ('Quittung für 4 Patient(en)') being signed with a stylus",
            width: 2000,
            height: 1414,
          },
        ],
      },
    },
    analyticsName: 'product_apodienste',
  },
  {
    key: 'arkk',
    name: 'ARKK platform',
    kicker: 'ARKK · 2026',
    about:
      'An enterprise data platform that helps tax and finance teams in the office of the CFO automate compliance work. Workflows are built on a visual canvas by ARKK’s implementation teams, with the aim of handing that building over to clients and AI agents.',
    thumb: {
      org: 'ARKK',
      tint: 'arkk',
      image: {
        src: '/public/images/arkk/workflow-canvas.webp',
        alt: "ARKK's workflow builder on a desktop monitor: a tree of activity nodes on the canvas, with the activity configuration drawer open on its Runtime settings tab",
        width: 2000,
        height: 1398,
        className: 'thumb-img--arkk',
      },
    },
    analyticsName: 'product_arkk',
  },
  {
    key: 'university',
    name: 'University projects',
    minor: true,
    analyticsName: 'product_university',
  },
];
