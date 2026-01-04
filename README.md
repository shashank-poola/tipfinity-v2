<div align="center">
  <img src="./public/logo/whitelogo.png" alt="Tipfinity Logo" width="200"/>

  **The fastest way to tip creators on Solana**

  [![Next.js](https://img.shields.io/badge/Next.js-16.1-black?logo=next.js)](https://nextjs.org/)
  [![Solana](https://img.shields.io/badge/Solana-Web3-9945FF?logo=solana)](https://solana.com/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)

</div>

---

## 🚀 What is Tipfinity?

Tipfinity is a web2 tipping platform, built on Solana that enables creators to receive instant tips with near-zero fees.no waiting periods—tips arrive directly in your wallet in under 1 second.

### Why Tipfinity?

- ⚡ **Instant Settlements** - Tips arrive immediately, not in 7-14 days
- 💰 **Ultra-Low Fees** - Less than $0.01 per transaction (vs 5-10% on traditional platforms)
- 🔐 **Non-Custodial** - Your wallet, your funds. We never hold your money
- 💬 **Personal Messages** - Supporters can attach messages to their tips
- 🌍 **Global Access** - Anyone with a Solana wallet can participate

---

![tipfinitydemo](public/demo.png)


## 🛠️ Tech Stack

- **Frontend**: Next.js 16, ReactJS, TypeScript, Tailwind CSS
- **Blockchain**: Solana Web3.js, Wallet Adapter
- **Backend**: Next.js API Routes, Prisma
- **Database**: PostgreSQL
- **Email**: Resend API

## 📁 Project Structure

```
tipfinity/
├── app/              # Next.js App Router
│   ├── api/         # API endpoints
│   ├── creator/     # Creator setup page
│   ├── explore/     # Browse creators
│   └── profile/     # User profile
├── components/       # React components
├── prisma/          # Database schema & migrations
├── lib/             # Utilities
└── public/          # Static assets
```

---
## 📦 Quick Start

### Prerequisites

- Node.js 20+
- PostgreSQL 14+ (or Docker)
- A Solana wallet ([Phantom](https://phantom.app/) or [Solflare](https://solflare.com/))

### Installation

```bash
# Clone the repository
git clone https://github.com/shashank-poola/tipfinity-v2.git
cd tipfinity-v2/tipfinity

# Install dependencies
bun install

# Set up environment variables
# Create a .env file with:
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/tipfinity?schema=public"
RESEND_API_KEY="your_resend_api_key_here"
NEXT_PUBLIC_SOLANA_NETWORK="devnet"

# Start PostgreSQL with Docker (or use your local instance)
docker-compose up -d

# Run database migrations
bunx prisma migrate dev

# Start the development server
bun run dev
```

Visit [http://localhost:3000](http://localhost:3000) 🎉

---

## 📖 How to Use

### For Creators

1. **Connect your Solana wallet** at [tipfinity.xyz](https://tipfinity.xyz)
2. **Create your profile** - Connect wallet, add name, bio, email, and set your tip amount
3. **Share your link** - Post your unique `tipfinity.xyz/creatorprofile/[id]` everywhere
4. **Receive tips instantly** - Get notified by email, funds arrive in your wallet immediately

### For Supporters

1. **Visit a creator's Tipfinity link**
2. **Connect your wallet** (make sure you have SOL in it)
3. **Write a message** and confirm the transaction
4. **Done!** Your tip arrives instantly and the creator sees your message

---

## 👨‍💻 Author

**Shashank Poola**

- Portfolio: [shasha.ink](https://shasha.ink)
- Twitter: [@shashankpoola](https://x.com/shashankpoola)
- LinkedIn: [shashank-poola](https://linkedin.com/in/shashank-poola)

---

<div align="center">

Made with ❤️ and Solana

⭐ Star this repo if you find it helpful!

</div>
