# Ultracode - AI-Powered App Builder

Build full-stack applications through natural language conversations. Ultracode enables developers and non-developers alike to create production-ready web applications using AI-powered code generation.

## 🚀 Features

- **Natural Language Development**: Describe what you want to build in plain English
- **Real-time Code Generation**: Watch your app come to life as you chat
- **Full-Stack Capabilities**: Frontend, backend, database - all included
- **Live Preview**: See changes instantly in the browser
- **One-Click Deployment**: Deploy to Netlify, Vercel, or custom domains
- **GitHub Integration**: Version control and collaboration built-in
- **Supabase Powered**: Authentication, database, and real-time features

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Node.js, Express, PostgreSQL, Redis
- **AI**: OpenAI GPT-4, Claude 3.5 Sonnet
- **Infrastructure**: Docker, AWS, Cloudflare
- **Deployment**: Netlify, Vercel

## 📋 Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Redis 6+
- npm or yarn
- Docker (optional)

## 🏁 Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/ultracode.git
cd ultracode
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env
# Edit .env with your configuration
```

### 4. Set up the database

```bash
npm run db:setup
npm run db:migrate
```

### 5. Start development servers

```bash
npm run dev
```

This will start:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- WebSocket server: ws://localhost:3000

## 🏗️ Project Structure

```
ultracode/
├── apps/
│   ├── web/                 # React frontend application
│   ├── api/                 # Express backend API
│   ├── preview/             # Preview server for generated apps
│   └── worker/              # Background job processor
├── packages/
│   ├── ui/                  # Shared UI components
│   ├── database/            # Database models and migrations
│   ├── code-gen/            # AI code generation engine
│   └── shared/              # Shared utilities and types
├── docs/
│   ├── claude.md            # Development plan
│   ├── ARCHITECTURE.md      # System architecture
│   ├── PROMPTS.md          # Prompt engineering guide
│   └── TECH_SPECS.md       # Technical specifications
└── infrastructure/          # Docker and deployment configs
```

## 🔧 Development

### Running tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run E2E tests
npm run test:e2e
```

### Code quality

```bash
# Run linter
npm run lint

# Run type checking
npm run type-check

# Format code
npm run format
```

### Database management

```bash
# Create a new migration
npm run db:migrate:create <migration-name>

# Run migrations
npm run db:migrate

# Rollback migrations
npm run db:migrate:rollback

# Seed database
npm run db:seed
```

## 🚀 Deployment

### Using Docker

```bash
# Build Docker images
docker-compose build

# Start services
docker-compose up -d

# View logs
docker-compose logs -f
```

### Manual deployment

See [deployment guide](docs/deployment.md) for detailed instructions.

## 📦 Available Scripts

- `npm run dev` - Start all development servers
- `npm run build` - Build all applications
- `npm run start` - Start production servers
- `npm run test` - Run test suite
- `npm run lint` - Lint code
- `npm run format` - Format code
- `npm run type-check` - Check TypeScript types

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Environment Variables

See [.env.example](.env.example) for all required environment variables.

Key variables:
- `OPENAI_API_KEY` - Required for AI code generation
- `DATABASE_URL` - PostgreSQL connection string
- `REDIS_URL` - Redis connection string
- `JWT_SECRET` - Secret for JWT tokens

## 🐛 Troubleshooting

### Common issues

**Port already in use**
```bash
# Find process using port 3000
lsof -i :3000
# Kill the process
kill -9 <PID>
```

**Database connection failed**
- Ensure PostgreSQL is running
- Check DATABASE_URL in .env
- Run `npm run db:setup`

**AI generation not working**
- Verify OPENAI_API_KEY is set
- Check API rate limits
- Ensure sufficient credits

## 📚 Documentation

- [Architecture Overview](ARCHITECTURE.md)
- [API Documentation](docs/api.md)
- [Prompt Engineering Guide](PROMPTS.md)
- [Technical Specifications](TECH_SPECS.md)
- [Development Plan](claude.md)

## 🔒 Security

- All data is encrypted in transit and at rest
- Authentication uses JWT with refresh tokens
- API rate limiting prevents abuse
- Input validation on all endpoints
- Regular security audits

Report security vulnerabilities to: security@ultracode.dev

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by Lovable.dev
- Built with React, TypeScript, and Tailwind CSS
- Powered by OpenAI and Anthropic Claude
- UI components from shadcn/ui

## 📞 Support

- Documentation: [docs.ultracode.dev](https://docs.ultracode.dev)
- Email: support@ultracode.dev
- Discord: [Join our community](https://discord.gg/ultracode)
- Twitter: [@ultracode_dev](https://twitter.com/ultracode_dev)

---

Built with ❤️ by the Ultracode team