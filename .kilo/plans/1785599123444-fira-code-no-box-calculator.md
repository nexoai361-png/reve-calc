# Plan: Fira Code font + Remove calculator box

## Changes to `index.html`

### 1. Use Fira Code for numbers
- Add `font-family: 'Fira Code', monospace` to `.display-current` and `.display-previous`
- Keep the existing Inter/system-ui font for the rest of the UI (buttons, body)
- Fira Code is a monospace font ideal for numeric display — ensures digits align vertically

### 2. Remove the box around the calculator
- Remove `border-radius`, `box-shadow`, and `border` from `.calculator`
- Remove `background` from `.calculator` (make it transparent)
- Remove `padding` from `.calculator` or reduce to 0
- The calculator should blend into the page background — no visible container
- Keep the display and buttons as the only visual elements
- On mobile full-screen mode, ensure no border or shadow remains

## Verification
- Open `index.html` in a browser and confirm:
  - Numbers in the display use Fira Code (monospace, distinct from button text)
  - No visible box/border/shadow surrounds the calculator
  - Dark mode and mobile full-screen still work correctly