# 🏓 King Tracker

Modern Microsoft Fluent Design style Tischtennis game tracker with real-time data persistence to Supabase.

## ✨ Features

- **Track Games**: Record Nicola vs Janis matches with scores
- **Live Statistics**: Win count, game history with timestamps
- **Modern UI**: Microsoft Fluent Design system with gradient headers
- **Dark Mode**: Full dark mode support
- **Real-time Sync**: All data synced to Supabase PostgreSQL
- **Responsive**: Works perfectly on mobile and desktop
- **No Authentication**: Anonymous public access

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Then open `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 🗄️ Database Setup (Supabase)

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Select project **iqfxysimszpncgxuaezn**
3. Go to **SQL Editor** → **New Query**
4. Copy-paste contents of `SUPABASE_SCHEMA.sql`
5. Execute the SQL

This creates the `tischtennis_games` table with indexes and RLS policies.

## 🔑 Environment Variables

The app comes pre-configured with Supabase keys in `.env.local`:

```
VITE_SUPABASE_URL=https://iqfxysimszpncgxuaezn.supabase.co
VITE_SUPABASE_ANON_KEY=...
```

## 📦 Tech Stack

- **Frontend**: React 19 + Vite (fast dev & build)
- **Design**: Microsoft Fluent UI + custom CSS
- **Database**: Supabase (PostgreSQL)
- **Icons**: Fluent UI Icons
- **Deployment**: GitHub Pages / Vercel

## 📱 Usage

1. Enter scores for both players
2. Click "Spiel hinzufügen" (Add Game)
3. Scores update automatically
4. View game history with delete option
5. Toggle dark mode with moon icon

## 🌐 Live URL

(Will be updated after deployment)

## 🤝 Contributing

Pull requests welcome!

## 📄 License

MIT
