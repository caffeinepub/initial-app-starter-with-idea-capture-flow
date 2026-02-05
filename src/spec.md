# Specification

## Summary
**Goal:** Provide a simple app-idea capture landing page with a guided form, show a confirmation summary, and persist/fetch the latest submitted idea via a backend canister with a coherent non-blue/purple theme.

**Planned changes:**
- Build a default-route landing page containing a guided form with fields: App name, Description, Target users, Must-have features, Nice-to-have features.
- On submit, display an on-page, readable confirmation summary of the entered idea.
- Add backend canister methods (single Motoko actor) to save an app idea and fetch the latest saved idea.
- Connect the frontend to save the idea on submit and load/display the latest saved idea after refresh, with an English empty-state message when none exists.
- Apply consistent UI theming (colors, typography, spacing, component styling) suitable for app-builder onboarding, using a primary palette that is not blue or purple.

**User-visible outcome:** Users can open the landing page, fill out a short guided form describing the app they want to build, submit to see a summary, and later refresh to see the latest saved idea (or an English empty state if nothing is saved yet).
