import type { CaseStudy } from './types';

/** Case studies in reading order. Adding one: add an entry here, then a page at
 *  src/pages/<slug>/index.astro that wraps its body in <ArticleLayout>. */
export const caseStudies: CaseStudy[] = [
  {
    "slug": "drawerredesign",
    "num": "01",
    "product": "apodienste",
    "shortTitle": "Modular patient drawer",
    "cardTitle": "One drawer, built from blocks",
    "rowMeta": "Product design · 2024",
    "summary": "Pharmacy services redesigned as modules (appointments, documents, comments) held together by a guided service flow.",
    "thumb": {
      "src": "/public/images/drawer-redesign.png",
      "alt": "Wireframe of the apodienste patient management dashboard, with a sidebar list, patient detail panel and comment thread rendered as generic placeholder content."
    },
    "page": {
      "title": "Improving usability of pharmacy service delivery through a modular patient drawer",
      "metaTitle": "Improving usability of pharmacy service delivery through a modular patient drawer",
      "description": "The patient drawer was originally built for call centres booking appointments, and the pharmacists who delivered the services found it hard to use. I redesigned it as a set of modules (appointments, documents and comments) held together by a guided service flow.",
      "ogImage": "https://yasmnam.github.io/public/images/drawerredesign/fig2-redesign.png",
      "kicker": {
        "discipline": "Product design",
        "org": "apodienste by PharmaBits",
        "year": "2024"
      },
      "meta": [
        {
          "label": "My role",
          "value": "Product designer. I designed the drawer end to end, from research and concept iterations through usability testing, handoff and onboarding."
        },
        {
          "label": "Team",
          "value": "Design team lead, engineers, product stakeholders"
        },
        {
          "label": "Timeline",
          "value": "March 2024 · design handoff July 2024 · release September 2024"
        },
        {
          "label": "Tools",
          "value": "Figma, FigJam, Notion, Maze"
        }
      ],
      "sections": [
        {
          "id": "overview",
          "label": "Overview"
        },
        {
          "id": "the-problem",
          "label": "The problem"
        },
        {
          "id": "opportunity",
          "label": "Opportunity"
        },
        {
          "id": "users",
          "label": "Users"
        },
        {
          "id": "constraints",
          "label": "Constraints"
        },
        {
          "id": "process",
          "label": "Process"
        },
        {
          "id": "testing",
          "label": "Testing"
        },
        {
          "id": "handoff-and-onboarding",
          "label": "Handoff and onboarding"
        },
        {
          "id": "outcomes",
          "label": "Outcomes"
        },
        {
          "id": "what-i-would-do-differently",
          "label": "What I would do differently"
        }
      ],
      "nextStories": [
        "patienthistory",
        "mml"
      ],
      "standfirst": "Redesigning apodienste's patient drawer for pharmacists, analysts and call-centre teams",
      "heroVideo": {
        "src": "/public/images/drawerredesign/hero-motion.mp4",
        "ariaLabel": "Motion overview of the patient drawer redesign",
        "caption": "Motion overview — the patient drawer redesign.",
        "poster": "/public/images/drawerredesign/hero-motion-poster.png"
      }
    }
  },
  {
    "slug": "patienthistory",
    "num": "02",
    "product": "apodienste",
    "shortTitle": "Patient case tracking",
    "cardTitle": "From comment thread to auditable patient record",
    "rowMeta": "Product design · 2024",
    "summary": "Loose comments turned into trackable actions over three releases, designed in partnership with a fellow designer.",
    "thumb": {
      "src": "/public/images/patient-history.png",
      "alt": "Wireframe of the apodienste patient history interface: a comment and action panel on the left with generic placeholder content, and a list of mentions on the right, each marked with a status icon."
    },
    "page": {
      "title": "Increasing tracking and auditability in patient case handling",
      "metaTitle": "Increasing tracking and auditability in patient case handling",
      "description": "Call-centre operators, analysts and pharmacists coordinate each patient across several calls, and all of that communication lived in one free-text comment box. Over three releases, we turned the comment thread into actions the system could track.",
      "ogImage": "https://yasmnam.github.io/public/images/patienthistory/fig1-actionable-mentions.png",
      "kicker": {
        "discipline": "Product design",
        "org": "apodienste by PharmaBits",
        "year": "2024"
      },
      "meta": [
        {
          "label": "My role",
          "value": "Product designer. I worked as an equal partner with the product design lead across discovery, information architecture, interaction design, research and delivery."
        },
        {
          "label": "Team",
          "value": "Product design lead, product owner, engineers"
        },
        {
          "label": "Tools",
          "value": "Figma, FigJam, Notion, Maze, Microsoft Clarity, Grok"
        }
      ],
      "sections": [
        {
          "id": "overview",
          "label": "Overview"
        },
        {
          "id": "the-problem",
          "label": "The problem"
        },
        {
          "id": "opportunity",
          "label": "Opportunity"
        },
        {
          "id": "constraints",
          "label": "Constraints"
        },
        {
          "id": "act-one-actionable-mentions",
          "label": "Act one: actionable mentions"
        },
        {
          "id": "act-two-the-action-panel",
          "label": "Act two: the action panel"
        },
        {
          "id": "act-three-guided-action-modals",
          "label": "Act three: guided action modals"
        },
        {
          "id": "what-i-learnt",
          "label": "What I learnt"
        }
      ],
      "nextStories": [
        "sensecast",
        "mml"
      ],
      "standfirst": "Designing apodienste's patient history feature in three acts"
    }
  },
  {
    "slug": "workflowredesign",
    "num": "03",
    "product": "arkk",
    "shortTitle": "Workflow canvas at ARKK",
    "cardTitle": "Increasing trust in a tax compliance automation platform",
    "rowMeta": "Workflow design · 2026",
    "summary": "The workflow canvas is the core of ARKK's enterprise data platform.",
    "thumb": {
      "src": "/public/images/workflowredesign/drawer-wireframe.png",
      "alt": "Wireframe of the activity configuration drawer, open on its Runtime Settings tab, showing generic placeholder content in place of an ordering field, a description textarea, view-access radio options, and assignee/manager tag fields."
    },
    "page": {
      "title": "Increasing trust in a tax compliance automation platform",
      "metaTitle": "Increasing trust in a tax compliance automation platform",
      "description": "The workflow canvas is the core of ARKK's enterprise data platform. Tax and finance data moves through it as a chain of activities: imports, transformations, checks, approvals and publishing.",
      "ogImage": "https://yasmnam.github.io/public/images/workflowredesign/testing-panel-wireframe.png",
      "kicker": {
        "discipline": "Workflow design",
        "org": "ARKK, enterprise data platform",
        "year": "2026"
      },
      "meta": [
        {
          "label": "My role",
          "value": "Product designer. I designed the convergence phase of the canvas redesign, the activity configuration drawer redesign and the MVP for a new test suite, in collaboration with the design lead."
        },
        {
          "label": "Team",
          "value": "Product manager and an engineering team, with the engineering lead joining design sessions. Stakeholders included the design lead, head of product, CPO and CTO."
        },
        {
          "label": "Timeline",
          "value": "April – July 2026, across three initiatives and more than fifteen design review cycles"
        },
        {
          "label": "Tools",
          "value": "Figma, FigJam"
        }
      ],
      "sections": [
        {
          "id": "impact",
          "label": "Impact"
        },
        {
          "id": "overview",
          "label": "Overview"
        },
        {
          "id": "the-problem",
          "label": "The problem"
        },
        {
          "id": "opportunity",
          "label": "Opportunity"
        },
        {
          "id": "users",
          "label": "Users"
        },
        {
          "id": "constraints",
          "label": "Constraints"
        },
        {
          "id": "initiative-one-canvas-redesign",
          "label": "Initiative one: canvas redesign"
        },
        {
          "id": "initiative-two-activity-configuration-drawer",
          "label": "Initiative two: activity configuration drawer"
        },
        {
          "id": "initiative-three-mvp-design-for-a-workflow-test-",
          "label": "Initiative three: MVP design for a workflow test suite"
        },
        {
          "id": "handoff-and-pilot",
          "label": "Handoff and pilot"
        }
      ],
      "nextStories": [
        "drawerredesign",
        "mml"
      ],
      "standfirst": "Redesigning the canvas and activity configuration, and designing an MVP test suite, in ARKK's workflow builder"
    }
  },
  {
    "slug": "sensecast",
    "num": "04",
    "product": "university",
    "shortTitle": "SenseCast",
    "compact": true,
    "cardTitle": "Turning ambient data into emotional predictability",
    "rowMeta": "Sensory data · 2025",
    "summary": "A sensory data platform that helps people with social anxiety feel emotionally prepared before entering public spaces — transforming real-time ambient data into calming visual previews.",
    "thumb": {
      "src": "/public/images/sensecast.png",
      "alt": "SenseCast across mobile and Apple Watch, showing live crowd and comfort readings for a destination"
    },
    "page": {
      "title": "Turning ambient data into emotional predictability",
      "metaTitle": "Turning ambient data into emotional predictability",
      "description": "Case study: SenseCast, a sensory data visualisation platform helping people feel emotionally prepared before entering public spaces.",
      "ogImage": "https://yasmnam.github.io/public/images/sensecast/fig17-brand-identity.png",
      "kicker": {
        "discipline": "Sensory data",
        "org": "SenseCast, self-directed",
        "year": "2025"
      },
      "meta": [
        {
          "label": "My role",
          "value": "Self-directed project — research, visual language, TouchDesigner prototyping, and UI design across mobile, public screen and wearable concepts."
        },
        {
          "label": "Tools",
          "value": "TouchDesigner / Figma / Figma Make / FigJam"
        }
      ],
      "sections": [
        {
          "id": "problem",
          "label": "Problem"
        },
        {
          "id": "process",
          "label": "Process"
        },
        {
          "id": "research-grounding-in-human-needs",
          "label": "Research — grounding in human needs"
        },
        {
          "id": "concept-development-from-idea-to-vision",
          "label": "Concept development — from idea to vision"
        },
        {
          "id": "design-prototyping-bringing-sensecast-to-life",
          "label": "Design & prototyping — bringing SenseCast to life"
        },
        {
          "id": "testing-future-steps",
          "label": "Testing & future steps"
        },
        {
          "id": "next-time-i-would",
          "label": "Next time, I would…"
        }
      ],
      "nextStories": [
        "mml",
        "drawerredesign"
      ],
      "heroVideo": {
        "src": "/public/images/sensecast/hero-video.mp4",
        "ariaLabel": "SenseCast in motion",
        "caption": "SenseCast in motion: the visual language the rest of this case study builds toward."
      }
    }
  },
  {
    "slug": "mml",
    "num": "05",
    "product": "university",
    "shortTitle": "Marx Memorial Library",
    "compact": true,
    "cardTitle": "Redesigning a historical archive for the digital age",
    "rowMeta": "Archive UX · 2024",
    "summary": "A full UX redesign of the Marx Memorial Library website — improving navigation, accessibility and content discovery for a historical archive serving researchers and the public.",
    "thumb": {
      "src": "/public/images/mml.png",
      "alt": "The redesigned Marx Memorial Library homepage on a laptop, with a historical archive photo, search bar, and Visit Archive, Research and Support Us buttons"
    },
    "page": {
      "title": "Redesigning a historical archive for the digital age",
      "metaTitle": "Redesigning a historical archive for the digital age",
      "description": "Case study: redesigning the Marx Memorial Library's website into a research-focused, accessible digital archive.",
      "ogImage": "https://yasmnam.github.io/public/images/mml/after-new-site.png",
      "kicker": {
        "discipline": "Archive UX",
        "org": "Marx Memorial Library, historical archive",
        "year": "2024"
      },
      "meta": [
        {
          "label": "My role",
          "value": "UX designer, in a mixed team of two graphic designers and three UX designers — led core UX work on information architecture, user flows and the website redesign."
        },
        {
          "label": "Tools",
          "value": "Figma / FigJam"
        }
      ],
      "sections": [
        {
          "id": "context-my-role",
          "label": "Context & my role"
        },
        {
          "id": "problem-framing",
          "label": "Problem framing"
        },
        {
          "id": "insight-strategy",
          "label": "Insight & strategy"
        },
        {
          "id": "process",
          "label": "Process"
        },
        {
          "id": "research-discovery",
          "label": "Research & discovery"
        },
        {
          "id": "define-and-synthesise",
          "label": "Define and synthesise"
        },
        {
          "id": "ideation-and-sitemapping",
          "label": "Ideation and sitemapping"
        },
        {
          "id": "wireframing-and-user-flows",
          "label": "Wireframing and user flows"
        },
        {
          "id": "ui-design-concept",
          "label": "UI design concept"
        },
        {
          "id": "special-pages-features-and-functionalities",
          "label": "Special pages, features and functionalities"
        },
        {
          "id": "style-component-library",
          "label": "Style & component library"
        },
        {
          "id": "solution-proposal-delivery",
          "label": "Solution proposal & delivery"
        },
        {
          "id": "next-time-i-would",
          "label": "Next time, I would…"
        }
      ],
      "nextStories": [
        "drawerredesign",
        "sensecast"
      ],
      "heroVideo": {
        "src": "/public/images/mml/fig24-desktop-prototype-video.mov",
        "ariaLabel": "Desktop prototype of the redesigned Marx Memorial Library website",
        "caption": "Desktop version prototype.",
        "poster": "/public/images/mml/hero-prototype-poster.png"
      }
    }
  }
];

export function getCaseStudy(slug: string): CaseStudy {
  const study = caseStudies.find((c) => c.slug === slug);
  if (!study) throw new Error(`Unknown case study: ${slug}`);
  return study;
}
