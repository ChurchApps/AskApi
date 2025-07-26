# AskApi Playground

This is a development-only React application for testing the AskApi endpoints.

## ⚠️ Development Only

This playground is **NOT** intended for production use. It's a local development tool for testing API endpoints.

## Features

- 🔐 **Authentication Testing** - Test with different church IDs and JWT tokens
- 📋 **Questions API** - Full CRUD operations for questions
- 🤖 **Natural Language Query** - Test AI-powered query functionality
- 📡 **Response Viewer** - Pretty-printed JSON responses with status codes

## Getting Started

### Prerequisites

1. Make sure the AskApi server is running on `http://localhost:8097`
2. Have valid church credentials (church ID and JWT token)
3. For AI queries, ensure OpenAI or OpenRouter API keys are configured

### Running the Playground

From the main AskApi directory:

```bash
# Run just the playground
npm run playground

# Run both API and playground together
npm run dev:with-playground
```

Or from the playground directory:

```bash
npm start
```

The playground will open at `http://localhost:3000` and connect to the configured API endpoints based on the environment.

## API Endpoints Tested

### Questions API
- `GET /questions` - Get all questions
- `GET /questions/:id` - Get specific question
- `GET /questions?userId=` - Get questions by user
- `POST /questions` - Create new question
- `PUT /questions/:id` - Update question
- `DELETE /questions/:id` - Delete question

### Query API
- `POST /query/questions` - Natural language query processing

## Authentication

The playground features full ChurchApps login integration using the official `@churchapps/apphelper-login` package:

### Login Process

1. Click "Login with ChurchApps"
2. Enter your email and password using the official ChurchApps LoginPage
3. Select your church (if you have multiple)
4. The playground automatically manages your JWT tokens

### How it Works

- **Official LoginPage**: Uses the real `LoginPage` component from `@churchapps/apphelper-login`
- **Automatic Token Management**: The playground handles JWT tokens for you
- **Church Selection**: If you have multiple churches, you can select which one to use
- **Session Persistence**: Your login is saved locally, so you stay logged in between sessions
- **Secure Headers**: Tokens are automatically sent with all API requests:
  - `Authorization: Bearer <token>`
  - `churchid: <churchId>`

### Implementation Details

The playground uses:

- **Official ChurchApps Authentication**: Direct integration with `@churchapps/apphelper-login`
- **CommonEnvironmentHelper**: Leverages shared environment configuration from `@churchapps/helpers`
- **Church Selection**: Multi-tenant users can select their active church
- **JWT Token Management**: Automatic token refresh and management
- **UserContext Integration**: Proper interface compatibility with official components

### Security Note

The playground stores your authentication tokens in browser localStorage for convenience. Always use this tool on trusted devices only.

## Environment Configuration

The playground supports multiple environments using the shared `CommonEnvironmentHelper` from `@churchapps/helpers`:

### Default Environments

The playground automatically configures API URLs based on the environment:

- **Development**: Uses staging URLs by default, with optional localhost overrides
- **Staging**: Uses `https://membershipapi.staging.churchapps.org` for MembershipApi and `https://askapi.staging.churchapps.org` for AskApi  
- **Production**: Uses `https://membershipapi.churchapps.org` for MembershipApi and `https://askapi.churchapps.org` for AskApi

### CommonEnvironmentHelper Integration

The playground leverages the same environment configuration patterns used across all ChurchApps services, ensuring consistency with other applications in the ecosystem.

### Environment Variables

Create a `.env` file in the playground directory to customize:

```bash
# Set the stage
REACT_APP_STAGE=staging

# Override specific APIs (optional)
REACT_APP_MEMBERSHIP_API=https://membershipapi.staging.churchapps.org
REACT_APP_ASK_API=http://localhost:8097
```

### Current Configuration

The playground displays the current environment and API URLs in the header for transparency.

## Natural Language Queries

Example queries you can test:
- "Show me all questions about baptism"
- "Find answered questions from this month"
- "Questions with more than 100 input tokens"
- "Unanswered questions"
- "Questions that took more than 5 seconds to answer"

## Development Notes

- The playground uses Create React App with TypeScript
- API requests are proxied through the React dev server
- All styling is contained within the components
- Responses are formatted as pretty-printed JSON