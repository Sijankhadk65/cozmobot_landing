# CLAUDE.md

## Project Overview

This project is the landing page and product showcase website for an advanced AI-powered industrial robotics platform focused on autonomous welding and adaptive industrial automation.

The core platform provides an end-to-end autonomous welding pipeline using:

- Computer Vision
- Smart Welding Parameter Prediction
- Trajectory Planning
- Seam Detection & Optimization
- Zero-Code Robot Programming

The same core system can later extend into:
- Drilling
- Buffing
- Grinding
- Cutting
- Surface Finishing
- Other unstructured industrial robotic workflows

The website should communicate:
- Technical sophistication
- Industrial reliability
- Modern AI-first robotics
- Simplicity of operation
- Scalability across industries

The design language should feel:
- Minimal
- Clean
- Premium
- Futuristic but understandable
- Engineering-focused
- Light-mode first

---

# Tech Stack

## Framework
- Next.js (latest App Router)
- TypeScript

## Styling
- TailwindCSS
- shadcn/ui components where useful

## Animations
Use:
- Framer Motion

Animations must be:
- Smooth
- Minimal
- Purposeful
- Fast
- Clean
- Not distracting

Avoid:
- Overly flashy transitions
- Heavy parallax
- Excessive scroll hijacking
- Dark cyberpunk aesthetics
- Over-animated sections

---

# Core Website Goals

The landing page must clearly explain:

1. What the robotic platform does
2. Why it matters
3. How it works
4. Why it is different
5. How industries can adopt it

The website should make advanced robotics understandable to:
- Factory owners
- Manufacturing engineers
- Industrial automation teams
- Investors
- Technical partners

---

# Brand Personality

The brand should feel:

- Intelligent
- Innovative
- Industrial
- Precise
- Trustworthy
- Modern
- Autonomous
- Efficient

Think:
- NVIDIA robotics
- Boston Dynamics
- ABB Robotics
- Tesla AI
- Figure AI
- Palantir industrial software

But with:
- Simpler messaging
- Cleaner layout
- Better readability

---

# Design Principles

## Visual Style

### Use
- White/light gray backgrounds
- Thin borders
- Soft shadows
- Large typography
- Plenty of whitespace
- Industrial imagery
- Technical diagrams
- Clean grids

### Avoid
- Neon glow
- Overly saturated colors
- Dense text walls
- Heavy gradients
- Cluttered dashboards
- Gaming aesthetics

---

# Color Palette

Use a restrained industrial palette.

Primary:
- White
- Neutral grays
- Soft Baltic Blue accents

Accent:
- Subtle industrial orange OR electric blue

Background:
- Mostly white

Text:
- Dark gray / near black

---

# Typography

Use modern readable fonts.

Recommended:
- Inter
- Geist
- Plus Jakarta Sans

Typography should feel:
- Technical
- Premium
- Clean
- Easy to scan

---

# Website Structure

## 1. Hero Section

Goal:
Immediately explain the product.

Headline examples:
- "Autonomous Industrial Robotics for Unstructured Work"
- "End-to-End AI Welding Automation"
- "Robots That Understand Industrial Tasks"
- "Zero-Code Robotic Welding"

Subheadline should explain:
Computer vision + AI parameter prediction + robotic trajectory planning.

Hero CTA:
- Book Demo
- Watch System
- See Pipeline

Hero visual ideas:
- Robotic arm welding pipe
- Real-time seam tracking
- Vision overlay
- Trajectory visualization
- Clean industrial render

Animations:
- Subtle floating motion
- Animated trajectory paths
- Slow scanning lines
- Smooth fade-ins

---

## 2. Problem Section

Explain industrial challenges:
- Skilled labor shortages
- Inconsistent welding quality
- Difficult robot programming
- Unstructured environments
- Expensive downtime

Use concise cards/icons.

---

## 3. Solution Section

Break down the autonomous pipeline.

Suggested flow:

### Step 1 — Computer Vision
Robot detects seam geometry and workpiece orientation.

### Step 2 — Smart Parameter Prediction
AI predicts optimal welding parameters automatically.

### Step 3 — Trajectory Planning
Robot generates collision-safe trajectories.

### Step 4 — Seam Optimization
System continuously adapts and optimizes the weld path.

### Step 5 — Autonomous Execution
Zero-code robotic operation.

This section should have:
- Scroll-triggered animations
- Timeline or flow visualization
- Technical but simple explanations

---

## 4. Feature Section

Feature cards:
- Zero-Code Interface
- Adaptive Welding
- Multi-Sensor Vision
- AI Parameter Optimization
- Real-Time Path Correction
- Seam Tracking
- Cross-Robot Compatibility
- Industrial Deployment Ready

Cards should animate lightly on hover.

---

## 5. Expandability Section

Explain that the platform extends beyond welding.

Show future capabilities:
- Drilling
- Buffing
- Grinding
- Inspection
- Surface finishing

Messaging:
"The intelligence layer is task-agnostic."

This section is important.

---

## 6. Technical Architecture Section

Show a clean architecture diagram.

Possible pipeline:
Vision → AI Analysis → Motion Planning → Robot Execution → Feedback Loop

Use:
- Clean SVG diagrams
- Motion animations
- Minimal industrial UI style

---

## 7. Demo / Video Section

Embed:
- Welding demo
- Seam tracking visualization
- Robot motion playback

Video section should feel cinematic but minimal.

---

## 8. Industries Section

Potential industries:
- Energy
- Shipbuilding
- Heavy manufacturing
- Aerospace
- Automotive
- Industrial fabrication

Use clean iconography.

---

## 9. CTA Section

Clear call-to-action:
- Book a Demo
- Partner With Us
- Deploy Autonomous Robotics

Minimal and conversion-focused.

---

# Animation Guidelines

Use Framer Motion carefully.

Recommended animations:
- Fade up
- Slide reveal
- Soft stagger
- Path drawing animations
- Hover elevation
- Scroll-triggered opacity

Avoid:
- Bouncy motion
- Excessive scaling
- Aggressive transitions

Animation duration:
- Fast and subtle

The website should feel:
- Precise
- Engineered
- Professional

---

# Responsiveness

The website must be:
- Mobile responsive
- Tablet optimized
- Ultra-wide monitor friendly

Maintain:
- Large spacing
- Readability
- Clean hierarchy

---

# Performance Requirements

The website should:
- Load fast
- Use optimized assets
- Use Next.js image optimization
- Avoid large JS bundles
- Keep animations GPU-accelerated

Target:
- Excellent Lighthouse score

---

# SEO Requirements

Include:
- Proper metadata
- Structured headings
- Open Graph support
- Semantic HTML

Keywords:
- Autonomous welding
- AI robotics
- Industrial automation
- Robotic welding
- Computer vision robotics
- Zero-code robotics
- Adaptive manufacturing

---

# Component Suggestions

Suggested reusable components:
- SectionWrapper
- AnimatedCard
- TimelineFlow
- ArchitectureDiagram
- HeroCanvas
- CTAButton
- IndustrialGrid
- FeatureCard
- MotionReveal

---

# Folder Structure

/app
/components
/components/ui
/components/sections
/lib
/styles
/public
/hooks

---

# Development Notes

Important:
- Prioritize clarity over complexity
- Explain robotics simply
- Use concise copy
- Maintain premium industrial feel
- Every section should have a clear purpose

The site should feel like:
"Advanced robotics made understandable."

---

# Desired Final Impression

Visitors should leave thinking:

"This is the future of industrial automation."

And also:

"This system looks deployable, reliable, and understandable."

---

# Optional Advanced Ideas

Potential enhancements:
- Interactive robot trajectory visualization
- Seam detection simulation
- Scroll-driven pipeline animation
- WebGL robotic arm visualization
- AI parameter prediction demo
- Before/after weld quality comparison

Only implement these if performance remains excellent.

---

# Final Development Philosophy

Build the website like an industrial AI product:
- precise
- elegant
- understandable
- technically credible
- visually clean

The website should communicate:
"Industrial autonomy without complexity."