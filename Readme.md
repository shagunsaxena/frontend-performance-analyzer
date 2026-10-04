# Frontend Performance Analyzer

## Technical Documentation, Architecture Guide

---

## 1. Project Overview

**Frontend Performance Analyzer** is a full-stack web application that accepts a website URL and returns a Lighthouse-based performance analysis.

The application presents:

- Overall performance score
- LCP, INP, CLS and FCP metrics
- Performance visualization
- Actionable optimization recommendations
- Loading and error states

The project demonstrates practical senior-frontend skills including React, TypeScript, REST API integration, asynchronous state management, component architecture, Node.js/Express, Lighthouse integration, error handling, responsive UI and Playwright end-to-end testing.

---

## 2. Problem Statement

Raw performance audit output can be difficult to interpret quickly.

The goal of this project is to provide a focused dashboard that allows a developer to submit a URL and quickly understand:

1. How well the website performs
2. Which important metrics need attention
3. What optimization opportunities are available

---

## 3. Objectives

- Accept and validate a website URL.
- Run a Lighthouse performance audit.
- Expose a clean JSON API for performance data.
- Display the performance score and key metrics.
- Handle unavailable metrics such as lab INP safely.
- Generate actionable recommendations.
- Provide clear loading, success and error states.
- Test critical user journeys with Playwright.
- Maintain separation between UI, API, routing and Lighthouse logic.

---

## 4. Key Features

- URL analyzer with native URL validation.
- Lottie loading animation during analysis.
- Lighthouse performance score from 0–100.
- LCP, INP, CLS and FCP metric cards.
- Graceful handling of unavailable INP.
- Chart.js performance visualization.
- Dynamic Lighthouse recommendations.
- Clickable Lighthouse documentation links.
- Backend validation for missing and invalid URLs.
- Handling for unreachable websites and Lighthouse runtime errors.
- Responsive dashboard.
- Playwright browser testing.

---

# 5. Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React + TypeScript | Dashboard and UI state |
| Build | Vite | Development and build tooling |
| Backend | Node.js + Express + TypeScript | REST API and orchestration |
| Performance | Lighthouse + Chrome | Website analysis |
| Charts | Chart.js + react-chartjs-2 | Performance visualization |
| Animation | @lottiefiles/dotlottie-react | Loading experience |
| Testing | Playwright | End-to-end browser testing |

---

# 6. Architecture

The application follows a layered full-stack architecture.


                         ┌─────────────────┐
                         │      User       │
                         └────────┬────────┘
                                  │
                                  ▼
                    ┌─────────────────────────┐
                    │     React Client        │
                    │                         │
                    │      UrlAnalyzer        │
                    │           │             │
                    │           ▼             │
                    │        App.tsx          │
                    └────────────┬────────────┘
                                 │
                            HTTP Request
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │    Express Server       │
                    │                         │
                    │  performance.routes.ts  │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │   Performance Service   │
                    │                         │
                    │ performance.service.ts  │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │  Lighthouse + Chrome    │
                    └────────────┬────────────┘
                                 │
                          Performance Data
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │     React Dashboard     │
                    │                         │
                    │ Performance Score       │
                    │ Metrics Grid            │
                    │ Performance Chart       │
                    │ Recommendations         │
                    └─────────────────────────┘