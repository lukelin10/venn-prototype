# Venn.ai Design System Guidelines for LLM Implementation

## Brand Identity Foundation

### Logo & Brand Elements
- **Primary logo**: Purple overlapping circles forming Venn diagram with "Venn.ai" wordmark
- **Logo treatment**: Clean, geometric circles with modern sans-serif typography
- **Icon usage**: Simplified circle overlap symbol for compact spaces
- **Brand positioning**: Data connectivity and AI-powered insights

### Typography System
```css
/* Primary font stack - modern, clean sans-serif */
--font-primary: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
--font-weight-light: 300;
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;

/* Font sizing scale */
--text-xs: 0.75rem;    /* 12px - small labels */
--text-sm: 0.875rem;   /* 14px - body text, buttons */
--text-base: 1rem;     /* 16px - primary text */
--text-lg: 1.125rem;   /* 18px - subheadings */
--text-xl: 1.25rem;    /* 20px - headings */
--text-2xl: 1.5rem;    /* 24px - section titles */
--text-3xl: 1.875rem;  /* 30px - page titles */
```

## Color System

### Primary Brand Colors
```css
/* Venn.ai purple palette */
--purple-primary: #7c3aed;    /* Main brand purple */
--purple-dark: #5b21b6;       /* Button hover, active states */
--purple-light: #a78bfa;      /* Accent, highlights */
--purple-bg: #f3f0ff;         /* Light background tints */

/* Neutral foundation */
--white: #ffffff;
--gray-50: #f9fafb;           /* Page backgrounds */
--gray-100: #f3f4f6;          /* Card backgrounds */
--gray-200: #e5e7eb;          /* Borders, dividers */
--gray-400: #9ca3af;          /* Placeholder text */
--gray-600: #4b5563;          /* Secondary text */
--gray-800: #1f2937;          /* Primary text */
--gray-900: #111827;          /* Headings */

/* Semantic colors */
--success: #10b981;           /* Success states */
--warning: #f59e0b;           /* Warning states */
--error: #ef4444;             /* Error states */
--info: #3b82f6;              /* Info states */
```

### Color Usage Rules
1. **Purple primary** for all interactive elements (buttons, links, active states)
2. **Gray scale** for text hierarchy and backgrounds
3. **White** for cards and elevated surfaces
4. **Semantic colors** only for status indicators and alerts

## Layout & Spacing System

### Grid & Container Rules
```css
/* Container system */
--container-padding: 1.5rem;  /* 24px standard padding */
--container-max-width: 1200px;
--sidebar-width: 280px;       /* Fixed sidebar width */

/* Spacing scale (8px base) */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
```

### Layout Principles
1. **Consistent 8px grid** for all spacing decisions
2. **24px container padding** on mobile, scales up on desktop
3. **Fixed sidebar approach** following your current pattern
4. **Card-based content** with subtle elevation

## Component Specifications

### Buttons
```css
/* Primary button (Venn.ai style) */
.btn-primary {
  background: var(--purple-primary);
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: var(--space-3) var(--space-6);
  font-size: var(--text-sm);
  font-weight: var(--font-weight-medium);
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background: var(--purple-dark);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
}

/* Secondary button */
.btn-secondary {
  background: white;
  color: var(--purple-primary);
  border: 1px solid var(--gray-200);
  border-radius: 0.5rem;
  padding: var(--space-3) var(--space-6);
  font-size: var(--text-sm);
  font-weight: var(--font-weight-medium);
}

.btn-secondary:hover {
  border-color: var(--purple-primary);
  box-shadow: 0 0 0 3px var(--purple-bg);
}
```

### Cards & Surfaces
```css
/* Standard card component */
.card {
  background: white;
  border: 1px solid var(--gray-200);
  border-radius: 0.75rem;
  padding: var(--space-6);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: var(--gray-300);
}

/* Chat interface styling */
.chat-container {
  background: var(--gray-50);
  border-radius: 0.75rem;
  padding: var(--space-4);
  border: 1px solid var(--gray-200);
}

.chat-input {
  background: white;
  border: 1px solid var(--gray-200);
  border-radius: 0.5rem;
  padding: var(--space-3) var(--space-4);
  font-size: var(--text-sm);
  width: 100%;
}

.chat-input:focus {
  outline: none;
  border-color: var(--purple-primary);
  box-shadow: 0 0 0 3px var(--purple-bg);
}
```

### Service Integration Icons
```css
/* Service icon containers (like your Notion, Salesforce, etc.) */
.service-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gray-100);
  border: 1px solid var(--gray-200);
  transition: all 0.2s ease;
}

.service-icon:hover {
  background: var(--purple-bg);
  border-color: var(--purple-light);
}

.service-icon.active {
  background: var(--purple-primary);
  border-color: var(--purple-primary);
  color: white;
}
```

## LLM Implementation Rules

### 1. Color Application Rules
- **ALWAYS use `var(--purple-primary)` for primary actions and brand elements**
- **NEVER use blues or greens as primary colors - stick to purple + neutrals**
- **Use gray-600 for secondary text, gray-800 for primary text**
- **White backgrounds for cards, gray-50 for page backgrounds**

### 2. Typography Hierarchy Rules
- **Page titles**: `text-3xl`, `font-weight-bold`, `gray-900`
- **Section headings**: `text-xl`, `font-weight-semibold`, `gray-800`
- **Body text**: `text-base`, `font-weight-normal`, `gray-600`
- **Button text**: `text-sm`, `font-weight-medium`
- **Labels/captions**: `text-xs`, `font-weight-medium`, `gray-400`

### 3. Layout Pattern Rules
- **Always use 8px grid spacing** (multiples of 0.5rem)
- **Card padding**: minimum `var(--space-6)` (24px)
- **Button padding**: `var(--space-3)` vertical, `var(--space-6)` horizontal
- **Border radius**: 0.5rem for buttons, 0.75rem for cards
- **Container max-width**: 1200px with auto margins

### 4. Interactive Element Rules
- **All buttons must have hover states with subtle transforms**
- **Focus states use purple ring**: `box-shadow: 0 0 0 3px var(--purple-bg)`
- **Transitions**: 0.2s ease for all interactive elements
- **Active states use `var(--purple-dark)`**

### 5. Data Visualization Rules
- **Primary data color**: `var(--purple-primary)`
- **Secondary data color**: `var(--purple-light)`
- **Neutral data**: `var(--gray-400)`
- **Success metrics**: `var(--success)`
- **Charts should use purple gradient: from purple-primary to purple-light**

### 6. Chat Interface Specific Rules
- **Chat bubbles**: User = purple background, AI = gray-100 background
- **Input fields**: Always white background with purple focus ring
- **Suggestion chips**: Gray-100 background, purple text, hover to purple background**
- **Loading states**: Purple animated spinner or skeleton**

### 7. Service Integration Display Rules
- **Service icons in rounded squares** (0.5rem radius)
- **Selected services**: Purple background with white icon
- **Unselected services**: Gray-100 background with original icon colors
- **Service grid**: 4-column layout on desktop, 2-column on mobile

### 8. Accessibility Requirements
- **Minimum contrast ratios**: AA compliant (4.5:1 for normal text)
- **Focus indicators**: Always visible and purple-themed
- **Text sizing**: rem units only, supports 200% zoom
- **Touch targets**: Minimum 44px (2.75rem) for mobile

### 9. Responsive Behavior Rules
- **Mobile-first approach**: Base styles for mobile, scale up
- **Breakpoints**: 
  - sm: 640px
  - md: 768px  
  - lg: 1024px
  - xl: 1280px
- **Sidebar**: Overlay on mobile, fixed on desktop
- **Typography**: Scale up by 1-2 steps on larger screens

### 10. Animation & Micro-interaction Rules
- **Hover elevations**: 1px translateY with enhanced shadow
- **Button press**: Slight scale down (0.98) for tactile feedback
- **Page transitions**: Fade in with 0.3s ease
- **Loading animations**: Purple-themed, subtle bounce or pulse
- **Success animations**: Brief green check with scale animation

## Implementation Prompt for LLMs

When creating Venn.ai interfaces, follow these rules:

1. **Brand consistency**: Use purple (#7c3aed) as primary color, never blues or other brand colors
2. **Typography**: Inter font family, clear hierarchy with defined weights
3. **Layout**: 8px grid system, card-based design with subtle shadows
4. **Interactions**: Purple focus rings, gentle hover animations, tactile feedback
5. **Services**: Icon grid layout with purple selection states
6. **Chat**: White input fields, purple user bubbles, gray AI responses
7. **Spacing**: Generous whitespace using the defined spacing scale
8. **Accessibility**: High contrast, proper focus indicators, scalable text

Always prioritize clean, professional aesthetics that reflect the data analysis and AI focus of the Venn.ai brand while maintaining the sophisticated enterprise feel demonstrated by Glean and Writer.