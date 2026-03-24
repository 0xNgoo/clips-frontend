# Implementation Plan: Social Account Cards

## Overview

Implement interactive social account cards for TikTok, Instagram, and YouTube as a responsive three-column grid in the clips-frontend Next.js app. The feature is purely presentational with a callback prop for connection actions.

## Tasks

- [x] 1. Create brand icon SVG components
  - Create `app/components/icons/TikTokIcon.tsx` with inline SVG and `IconProps` interface
  - Create `app/components/icons/InstagramIcon.tsx` with inline SVG and `IconProps` interface
  - Create `app/components/icons/YouTubeIcon.tsx` with inline SVG and `IconProps` interface
  - Each icon accepts `className` and `aria-hidden` props
  - _Requirements: 2.1_

- [x] 2. Implement `SocialAccountCard` component
  - [x] 2.1 Create `app/components/SocialAccountCard.tsx`
    - Add `"use client"` directive
    - Implement `SocialAccountCardProps` interface (`platform`, `label`, `subtext`, `icon`, `onConnect`)
    - Render icon slot with fallback to label text when icon is null/undefined
    - Apply `transition-all duration-200 ease-in-out` with `hover:` border/background variants
    - Add `role="button"`, `tabIndex={0}`, and `aria-label` containing the platform name
    - Handle `onClick` and `onKeyDown` (Enter / Space) to invoke `onConnect`
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 3.1, 3.2, 3.3, 3.4, 4.1, 4.2, 4.3_

  - [ ]* 2.2 Write property test for `SocialAccountCard` label and subtext rendering
    - **Property 2: Each card displays its platform label and subtext**
    - **Validates: Requirements 2.2, 2.3**

  - [ ]* 2.3 Write property test for icon fallback behavior
    - **Property 3: Icon fallback on missing icon**
    - **Validates: Requirements 2.4**

  - [ ]* 2.4 Write property test for click firing `onConnect`
    - **Property 4: onConnect fires with correct platform on click**
    - **Validates: Requirements 4.1**

  - [ ]* 2.5 Write property test for keyboard activation
    - **Property 5: Keyboard activation fires onConnect**
    - **Validates: Requirements 4.2**

  - [ ]* 2.6 Write property test for `aria-label` containing platform name
    - **Property 6: aria-label contains platform name**
    - **Validates: Requirements 4.3**

  - [ ]* 2.7 Write property test for hover transition duration
    - **Property 7: Hover transition duration is 200ms**
    - **Validates: Requirements 3.2, 3.3**

  - [ ]* 2.8 Write property test for hover layout stability
    - **Property 8: Hover does not shift layout dimensions**
    - **Validates: Requirements 3.4**

- [x] 3. Implement `SocialAccountCardGrid` component
  - [x] 3.1 Create `app/components/SocialAccountCardGrid.tsx`
    - Add `"use client"` directive
    - Define `PLATFORMS` config array with TikTok, Instagram, YouTube entries (platform, label, subtext, icon)
    - Render a `div` with `grid grid-cols-1 md:grid-cols-3 gap-4`
    - Map `PLATFORMS` to `SocialAccountCard` instances, passing `onConnect`
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.1, 2.2, 2.3_

  - [ ]* 3.2 Write property test for grid rendering exactly three cards
    - **Property 1: Grid renders exactly three cards**
    - **Validates: Requirements 1.1, 1.4**

- [x] 4. Set up test infrastructure
  - Install dev dependencies: `vitest`, `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`, `fast-check`, `jsdom`
  - Create or update `vitest.config.ts` with `jsdom` environment, globals, and setup file
  - Create `vitest.setup.ts` importing `@testing-library/jest-dom`
  - Create `app/components/__tests__/` directory
  - _Requirements: (test infrastructure)_

- [x] 5. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Wire `SocialAccountCardGrid` into a page
  - [x] 6.1 Import and render `SocialAccountCardGrid` in the appropriate page or parent component
    - Pass an `onConnect` handler that receives the platform string
    - _Requirements: 4.1_

- [x] 7. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Property tests use `fast-check` with a minimum of 100 iterations each
- Each property test file should include a comment: `// Feature: social-account-cards, Property N: <property_text>`
- Hover styling is handled entirely via Tailwind utility classes — no JS state required
- The `onConnect` prop is TypeScript-required, preventing runtime errors from missing handlers
