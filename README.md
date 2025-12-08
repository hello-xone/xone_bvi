# BVI Portal

A modern web application built with Remix and React for BVI (Blockchain Virtual Identity) management.

## Tech Stack

- **Framework**: [Remix](https://remix.run/) - Full stack web framework
- **UI Library**: React with Emotion for CSS-in-JS
- **Styling**: TailwindCSS for utility-first CSS
- **State Management**: Custom stores with zustand
- **Internationalization**: i18next for multi-language support
- **Web3 Integration**: Web3 wallet connection and smart contract interaction
- **Font**: Figtree (WOFF2) with system font fallbacks

## Project Structure

```
app/
├── api/              # API endpoints and modules
├── components/       # Reusable React components
│   ├── icon/         # SVG icons and icon components
│   ├── page/         # Page-specific components
│   ├── ui/          # Common UI components
│   └── web3/        # Web3 related components
├── config/          # Configuration files
│   ├── abi/         # Smart contract ABIs
│   ├── data/        # Static data and constants
│   └── theme.ts     # Theme configuration
├── emotion/         # Emotion CSS-in-JS setup
├── hooks/           # Custom React hooks
├── lib/             # Utility libraries
├── pages/           # Page layouts
├── routes/          # Remix route components
├── store/           # Application state management
├── styles/          # Global styles and CSS
└── utils/           # Helper functions and utilities
```

## Key Features

### Web3 Wallet Integration

- Seamless wallet connection with multiple providers support
- Secure authentication flow using wallet signatures
- Transaction management and status tracking
- Smart contract interaction utilities

### Internationalization

- Multi-language support with i18next
- Dynamic language switching
- Locale-specific content and formatting
- Supports: English, Japanese, Korean, Malay, Thai, Vietnamese, Chinese

### Component Architecture

- Modular and reusable component design
- Consistent styling with Emotion and TailwindCSS
- Responsive layouts for all screen sizes
- Optimized font loading and rendering

### State Management

- Custom stores for global state
- React Context for efficient state distribution
- Persistent storage integration
- Real-time data synchronization

## Getting Started

1. Install dependencies:
```bash
pnpm install
```

2. Start development server:
```bash
pnpm dev
```

3. Build for production:
```bash
pnpm build
```

4. Run for production:
```bash
pnpm start
```

## Wallet Integration Guide

### Connecting a Wallet

1. Click the "Connect Wallet" button in the navigation bar
2. Select your preferred wallet provider
3. Approve the connection request in your wallet
4. Sign the authentication message when prompted

### Using Web3 Features

- Access wallet information through `useWallet` hook
- Handle transactions using contract utilities
- Monitor connection status with wallet events
- Manage user authentication state

## Development Guidelines

- Follow the established component structure
- Use provided hooks for common functionality
- Maintain i18n translations for all content
- Optimize for performance and accessibility

## License

MIT License