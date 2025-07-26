# AskApi Deployment Notes

## Production Deployment

When deploying to production environments, the `playground/` directory should be excluded from the deployment package as it's only intended for local development.

### Serverless Framework

The `playground/` directory is automatically excluded from serverless deployments as it's not part of the Lambda function code.

### Manual Deployment

If deploying manually, ensure the `playground/` directory is not included in your deployment package.

### Docker

If using Docker, add the following to your `.dockerignore`:

```
playground/
```

## Development Setup

For local development, the playground provides a React-based interface for testing API endpoints:

```bash
# Run API and playground together
npm run dev:with-playground

# Or run them separately
npm run dev          # API only
npm run playground   # Playground only
```

The playground will be available at `http://localhost:3097` and will proxy API requests to `http://localhost:8097`.
