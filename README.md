# Smart Watch Landing Page

A premium Apple Watch inspired landing page built with React, Vite, Tailwind CSS, and GSAP. The page focuses on cinematic product presentation, smooth scroll animation, and modern iOS-style feature cards.

## Project Overview

This website was created as a smart watch product showcase. The main hero section uses a scroll-controlled image sequence so the watch can smoothly unfold into internal layers as the user scrolls down, then reassemble when the user scrolls back up.

The rest of the page presents watch features in clean setup-style cards with a black, white, and gray Apple-inspired theme.

## What I Built

- A React + Vite landing page for a smart watch website.
- A cinematic scroll-based Apple Watch animation using canvas frames.
- A pinned hero section controlled by GSAP ScrollTrigger.
- Smooth card pop-up and fade-in animations for the feature section.
- Responsive desktop and mobile layouts.
- Premium dark Apple-style UI using Tailwind CSS.
- Feature cards for fitness, focus, water resistance, and Mac unlock.
- Custom visual assets created with Google Flow and image generation tools.

## Features

- Scroll-controlled watch animation
- Canvas-based frame sequence for smoother performance
- GSAP ScrollTrigger animation
- iOS-style rounded feature cards
- Smooth fade, blur, scale, and pop-up card effects
- Responsive mobile-friendly design
- Apple-inspired typography using Oswald and Poppins
- Dark luxury product theme
- Feature card for unlocking Mac with Apple Watch
- Clean navigation with section links

## Tech Stack

- React
- Vite
- Tailwind CSS
- GSAP
- GSAP ScrollTrigger
- @gsap/react
- JavaScript
- HTML5 Canvas
- Google Flow for visual asset generation

## Main Sections

### Hero Animation

The hero section uses 240 image frames placed in `public/watch-frames`. These frames are drawn onto a canvas and controlled by scroll progress. Scrolling down plays the watch disassembly animation, and scrolling up reverses it.

### Feature Cards

The feature section includes iOS-style cards for:

- Fitness tracking
- Daily focus and productivity
- Water resistance
- Unlocking Mac with Apple Watch

Each card uses GSAP animations for a smooth pop-up and fade-in effect.

## Installation

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Lint

```bash
npm run lint
```

## Notes

This project is designed as a visual portfolio-style landing page. The watch animation frames and feature images are stored in the `public` folder so they can be loaded directly by the Vite app.
