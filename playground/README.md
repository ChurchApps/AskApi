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

The playground will open at `http://localhost:3000` and proxy API requests to `http://localhost:8097`.

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

The playground requires:
- **Church ID**: Your church identifier
- **Auth Token**: Valid JWT token for authentication

These are sent as headers:
- `Authorization: Bearer <token>`
- `churchid: <churchId>` (if provided)

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