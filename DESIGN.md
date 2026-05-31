---
name: Chicago Urban Streetwear
colors:
  surface: '#fbf9f9'
  surface-dim: '#dbdad9'
  surface-bright: '#fbf9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f3'
  surface-container: '#efeded'
  surface-container-high: '#e9e8e7'
  surface-container-highest: '#e3e2e2'
  on-surface: '#1b1c1c'
  on-surface-variant: '#4c4546'
  inverse-surface: '#303031'
  inverse-on-surface: '#f2f0f0'
  outline: '#7e7576'
  outline-variant: '#cfc4c5'
  surface-tint: '#5e5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1b1b1b'
  on-primary-container: '#848484'
  inverse-primary: '#c6c6c6'
  secondary: '#ba0037'
  on-secondary: '#ffffff'
  secondary-container: '#e0244c'
  on-secondary-container: '#fffbff'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1a1c1c'
  on-tertiary-container: '#838484'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c6'
  on-primary-fixed: '#1b1b1b'
  on-primary-fixed-variant: '#474747'
  secondary-fixed: '#ffdadb'
  secondary-fixed-dim: '#ffb2b7'
  on-secondary-fixed: '#40000d'
  on-secondary-fixed-variant: '#920029'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#fbf9f9'
  on-background: '#1b1c1c'
  surface-variant: '#e3e2e2'
typography:
  display-xl:
    fontFamily: Space Grotesk
    fontSize: 80px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-bold:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '700'
    lineHeight: '1.0'
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  section-gap: 120px
---

## Brand & Style

This design system is built on the intersection of high-fashion minimalism and the raw, rhythmic energy of Chicago’s urban landscape. The visual narrative is unapologetically bold, utilizing high-contrast layouts to mirror the confidence of streetwear culture. The style is **Modern Minimalism** infused with **High-Contrast Bold** elements, ensuring that the product is the hero while the interface provides a structured, premium backdrop. 

The target audience seeks exclusivity and authenticity. To evoke this, the UI remains lean and utilitarian, avoiding unnecessary decoration. Every element serves a purpose: to drive conversion through clarity and to establish brand authority through a visual language inspired by the legendary "Bulls" era—power, precision, and dominance.

## Colors

The color palette is restricted to a tight, high-impact trio: **Deep Black**, **Stark White**, and **Bulls Red**. 

- **Primary (Black):** Used for typography, navigation, and primary CTAs to ground the design in authority.
- **Secondary (Red):** Reserved for high-conversion moments—sale tags, "Add to Cart" buttons, and active hover states. It acts as a visual "siren" to draw the eye.
- **Tertiary (White):** The canvas. Used to create expansive negative space that elevates the product photography.
- **Neutrals:** Mid-tone grays are used sparingly for secondary metadata and borders to maintain hierarchy without cluttering the high-contrast aesthetic.

## Typography

The typographic system relies on a heavy-duty visual hierarchy. 

**Space Grotesk** is used for all headlines and labels. Its technical, geometric character provides an "industrial-chic" vibe that feels both futuristic and grounded in Chicago’s architectural heritage. Large display sizes should use tight letter spacing to increase the sense of impact.

**Inter** is utilized for body text and long-form descriptions. Its utilitarian design ensures maximum readability across all devices, facilitating a frictionless shopping experience. Labels and tactical UI elements (like prices and size selectors) revert to Space Grotesk Bold to maintain a consistent brand voice in functional areas.

## Layout & Spacing

The layout follows a **Fixed Grid** model for desktop, centered within a 1440px container to ensure product imagery remains sharp and structured. A 12-column system is used with generous 24px gutters.

The spacing rhythm is based on an **8px base unit**. Significant vertical breathing room (Section Gaps) is essential to the "Premium" feel; products should never feel crowded. On product listing pages (PLP), use asymmetrical grid placements or oversized margins to break the monotony and lean into a "lookbook" editorial style.

## Elevation & Depth

This design system rejects traditional shadows in favor of **Tonal Layers** and **Bold Borders**. 

Visual depth is achieved through:
1.  **Hard-Edged Overlays:** Elements like drawers and modals do not use blurs; they use solid white or black surfaces with 1px or 2px solid borders.
2.  **High-Contrast Stacking:** Using a "Black surface on White surface" approach creates immediate hierarchy without the need for light-source simulation.
3.  **Flat 2D Layering:** When an element is "raised" (like a card hover), use a solid 4px black offset border rather than a soft shadow to maintain the urban/brutalist influence.

## Shapes

The shape language is strictly **Sharp (0)**. 

To communicate "Urban" and "Confident," all buttons, input fields, image containers, and cards feature 90-degree angles. This rejection of softness differentiates the brand from standard "friendly" eCommerce and aligns it with architectural and high-fashion aesthetics. Sharp corners evoke a sense of precision and structural integrity.

## Components

### Buttons
Primary buttons are solid Black with White text. On **hover**, the background transitions instantly to Red (#CE1141). Secondary buttons use a 2px Black outline. The transition timing is a crisp `200ms cubic-bezier(0.4, 0, 0.2, 1)` for a snappy, high-performance feel.

### Cards
Product cards are minimal. Images fill the container entirely. Product titles and prices are placed below in Space Grotesk. On hover, the image should subtly scale (1.05x) to create a sense of depth within the sharp frame.

### Input Fields
Inputs are defined by a bottom-border only (2px Black) to maintain a clean, "editorial" look. When focused, the border transitions to Red.

### Chips & Tags
Used for "New Arrival" or "Limited Edition." These are rectangular with solid black backgrounds and small, uppercase white text.

### Navigation
The header is sticky with a 1px bottom border. Hover states on text links utilize a Red strike-through or a Red color change to signal interactivity without shifting the layout.