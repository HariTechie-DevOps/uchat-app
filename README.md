# UChat - Translation Chat App Intro

A beautiful, animated landing page showcasing UChat's real-time translation messaging features. Built with React, TypeScript, Tailwind CSS, and Motion (Framer Motion).

## 🎯 Features

### Page 1: Chat Conversation Demo
- Real-time translation demonstration
- 6 alternating messages between Japanese and English
- Smooth animations showing message sending and receiving
- Translation appears with original text on top, translation below

### Page 2: App Features Showcase
- Smart Messaging
- AI Translation
- Real-time Sync
- Multi-Language Support (100+ languages)
- Secure & Private (End-to-end encryption)
- Voice Messages with live translation

### Page 3: Logo & Call-to-Action
- Animated UChat logo
- 10 supported language badges
- Interactive "Get Started" button
- Fully responsive design

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or higher
- npm, yarn, or pnpm package manager

### Installation

1. **Clone or download this project**

2. **Install dependencies:**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run development server:**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open your browser:**
Navigate to `http://localhost:5173` (or the port shown in your terminal)

### Build for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

This creates an optimized production build in the `dist/` folder.

## 🌐 Deploy to Web (Free Options)

### Option 1: Deploy to Vercel (Recommended)

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Deploy:**
```bash
vercel
```

3. **Follow the prompts** - Your app will be live in seconds!

**Or use Vercel Dashboard:**
- Go to [vercel.com](https://vercel.com)
- Click "New Project"
- Import your code repository
- Click "Deploy"

### Option 2: Deploy to Netlify

1. **Install Netlify CLI:**
```bash
npm install -g netlify-cli
```

2. **Build the project:**
```bash
npm run build
```

3. **Deploy:**
```bash
netlify deploy --prod --dir=dist
```

**Or use Netlify Dashboard:**
- Go to [netlify.com](https://netlify.com)
- Drag and drop the `dist` folder
- Your site is live!

### Option 3: Deploy to GitHub Pages

1. **Install gh-pages:**
```bash
npm install -g gh-pages
```

2. **Add to package.json:**
```json
{
  "scripts": {
    "deploy": "vite build && gh-pages -d dist"
  },
  "homepage": "https://YOUR_USERNAME.github.io/YOUR_REPO_NAME"
}
```

3. **Deploy:**
```bash
npm run deploy
```

### Option 4: Deploy to Cloudflare Pages

1. Go to [Cloudflare Pages](https://pages.cloudflare.com)
2. Connect your Git repository
3. Build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Click "Deploy"

## 📱 Responsive Design

The app is fully responsive and optimized for:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1920px+)

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Tailwind CSS 4** - Styling
- **Motion (Framer Motion)** - Animations
- **Figma Assets** - Images and graphics

## 📂 Project Structure

```
uchat-intro/
├── src/
│   ├── app/
│   │   ├── App.tsx                    # Main app component
│   │   └── components/
│   │       ├── AnimatedStars.tsx      # Animated background
│   │       ├── FeaturesPage.tsx       # Features showcase
│   │       └── MessageBubble.tsx      # Chat message component
│   ├── styles/
│   │   ├── fonts.css                  # Font imports
│   │   ├── index.css                  # Global styles
│   │   ├── tailwind.css               # Tailwind directives
│   │   └── theme.css                  # Theme configuration
│   └── imports/                       # Figma assets
├── package.json
├── vite.config.ts
└── README.md
```

## ⚙️ Configuration

### Update App Content

**Conversation Messages** (`src/app/App.tsx`):
```typescript
const conversation = [
  {
    originalText: 'Your text here',
    translatedText: 'Translation here',
    // ...
  },
  // Add more messages
];
```

**Features** (`src/app/components/FeaturesPage.tsx`):
```typescript
const features = [
  {
    title: 'Your Feature',
    description: 'Feature description',
    // ...
  },
];
```

**Languages** (`src/app/App.tsx` - Logo page):
```typescript
const languages = [
  "English",
  "Español",
  // Add your languages
];
```

### Timing Configuration

In `src/app/App.tsx`, adjust these values:

```typescript
// Message timing (milliseconds)
setTimeout(() => setMessageStage("receiving"), 2500)  // Sending duration
setTimeout(() => setCurrentMessage(prev => prev + 1), 8500)  // Total message time

// Features page duration
setTimeout(() => setCurrentPage('logo'), 8000)  // 8 seconds
```

## 🎨 Customization

### Colors
Update gradients in components:
- Blue: `from-blue-500 to-blue-600`
- Purple: `from-purple-500 to-purple-600`
- Custom: Use any Tailwind color

### Animations
Adjust Motion animation properties:
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
/>
```

### Fonts
Add custom fonts in `src/styles/fonts.css`

## 🔧 Troubleshooting

### Build fails
```bash
# Clear cache and reinstall
rm -rf node_modules dist
npm install
npm run build
```

### Port already in use
```bash
# Vite will automatically use next available port
# Or specify a port:
vite --port 3000
```

### Images not loading
- Ensure Figma assets are in `src/imports/`
- Check import paths use `figma:asset/` scheme

## 📄 License

This project is built for demonstration purposes.

## 🤝 Support

For issues or questions:
- Check the documentation above
- Review the code comments
- Test in different browsers

## 🌟 Live Demo

After deployment, share your live URL:
- Vercel: `https://your-project.vercel.app`
- Netlify: `https://your-project.netlify.app`
- GitHub Pages: `https://username.github.io/repo-name`

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
