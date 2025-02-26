# 🌸 I'm Mim

![Svelte](https://img.shields.io/badge/Svelte-5.x-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![LottieFiles](https://img.shields.io/badge/Lottie-animations-9146FF?style=for-the-badge&logo=lottiefiles&logoColor=white)

A beautiful, modern web application featuring secure authentication, elegant animations, and responsive design.

<div align="center">
  <img src="screenshot.webp" alt="Immim Screenshot" width="600px"/>
</div>

## ✨ Features

- **Secure Authentication** - PIN-based passkey system with session management
- **Beautiful Animations** - Lottie-powered rose animation with customizable speed
- **Responsive Design** - Mobile-friendly glass-morphism UI with TailwindCSS
- **Session Management** - Automatic timeout after 10 minutes of inactivity
- **Modern UI Components** - Diamond decorations, gradient buttons, and more

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or pnpm

### Installation

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
