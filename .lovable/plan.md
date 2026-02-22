

# Category Section Redesign — Pricing Tiers Visible on Page

## Problem
Currently pricing tiers (Basic, Standard, Pro) are hidden inside a modal that only appears after clicking a category card. Many visitors won't click, so they'll never see the packages.

## Solution
Each category card will become an expandable section. When a user clicks a category, the 3 pricing tiers (Basic, Standard, Pro) will expand/slide down directly below that category card on the page itself — no modal needed for pricing.

## How It Will Work

1. **Category cards stay as-is** visually, but clicking one will expand/collapse the pricing tiers inline below it
2. **Accordion-style behavior**: Only one category's pricing is visible at a time. Clicking another category closes the previous one and opens the new one
3. **Pricing tier cards** (Basic, Standard, Pro) will appear in a row below the selected category with smooth animation
4. **"Order" button** on each tier still opens the Order Flow modal as before

## Technical Details

### Files to Modify

**`src/components/CategoryGrid.tsx`**
- Add state to track which category is currently expanded (`expandedCategory`)
- When a category card is clicked, toggle its expanded state
- Below each category card (or below the grid row containing it), render the 3 pricing tier cards with an animated expand/collapse
- Move the pricing tiers data (from PricingModal) into a shared constant or import it
- The "Order" button on each tier calls `onCategorySelect` with both category and tier info

**`src/components/PricingModal.tsx`**
- Extract the `tiers` data to be reusable (or just duplicate it in CategoryGrid since it's small)
- Keep the modal component available as a fallback but it won't be the primary flow anymore

**`src/pages/Index.tsx`**
- Update the flow: category click no longer opens pricing modal
- Instead, the tier selection from the inline cards directly opens the OrderFlow
- Simplify state management accordingly

### Visual Layout
When a category is clicked, a full-width panel slides down below the category grid row showing:

```text
[Category Cards Row]
 ┌──────────────────────────────────────────────────┐
 │  Basic        |  Standard (Popular) |  Pro       │
 │  Features...  |  Features...        |  Features  │
 │  [Order Btn]  |  [Order Btn]        |  [Order]   │
 └──────────────────────────────────────────────────┘
[Next Category Cards Row]
```

- Smooth height animation using framer-motion's `AnimatePresence`
- The expanded panel spans the full width of the grid container
- Gold highlight on the "Popular" Standard tier
- Clicking the same category again collapses it

