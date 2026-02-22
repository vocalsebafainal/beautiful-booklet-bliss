
# Category Cards -- Hover Preview Hint

## Problem
Currently, when a user clicks a category card, the pricing tiers expand below the entire grid. But there's no visual hint on hover that clicking will reveal packages -- users may not realize the cards are interactive.

## Solution
Add a hover preview tooltip/overlay on each category card that shows a mini summary of the 3 tiers (Basic, Standard, Pro) as a small hint. This gives users an instant signal: "click to see full packages."

## How It Will Look

When hovering over a category card:
- A small semi-transparent overlay slides up from the bottom of the card
- Shows 3 mini tier badges in a row: "🎙 বেসিক", "⭐ স্ট্যান্ডার্ড", "👑 প্রো"
- Below that, a subtle text: "ক্লিক করে প্যাকেজ দেখুন >"
- Smooth fade-in/slide-up animation (200ms)
- When the category is already expanded, the hover overlay shows "প্যাকেজ দেখা হচ্ছে" instead

## Technical Changes

### `src/components/CategoryGrid.tsx`
- Add a `hoveredCategory` state to track which card is being hovered
- Add `onMouseEnter` / `onMouseLeave` handlers to each category card
- Inside each card, add a conditional overlay div that appears on hover with:
  - 3 small tier name badges (Basic/Standard/Pro) in a horizontal row
  - A "ক্লিক করে প্যাকেজ দেখুন" call-to-action text
  - CSS: absolute positioned at bottom, backdrop-blur, gradient background from transparent to dark
- Use `framer-motion` `AnimatePresence` for the overlay entrance/exit animation
- No other files need to change
