# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a production-ready JavaScript embeddable chatbot widget built with vanilla JavaScript (no dependencies). The widget provides a floating chat interface that can be embedded into any website with a single line of HTML.

## Common Development Commands

### Building the Project
```bash
# Build distribution files (creates both regular and minified versions)
npm run build
```

### Development Server
```bash
# Start local development server on http://localhost:8000
npm run serve
# Alternative command
npm run dev
```

### Testing the Widget
```bash
# Open example.html in browser after starting the dev server
# Navigate to http://localhost:8000/example.html
```

## Architecture Overview

### Core Components

**ChatbotWidget Class** (`src/chatbot-widget.js`)
- Main widget implementation as an ES6 class
- Handles UI creation, event binding, API communication, and message management
- Self-contained with embedded CSS styles for easy deployment

**Build System** (`build.js`)
- Custom Node.js build script (no webpack/bundlers needed)
- Performs minification by removing comments and excess whitespace
- Creates both regular (`chatbot-widget.js`) and minified (`chatbot-widget.min.js`) versions
- Outputs file size statistics

**Custom Element Support**
- Implements `<my-chatbot>` custom HTML element for multiple chatbot personalities
- Auto-initializes single widget if no custom elements present
- Agent ID support for different chatbot backends

### Key Architecture Patterns

**IIFE Pattern**: Entire widget wrapped in immediately-invoked function expression to avoid global namespace pollution

**Progressive Enhancement**: Widget gracefully degrades if JavaScript fails to load

**Configuration Object**: Centralized CONFIG object for easy customization of API endpoints, positioning, and behavior

**CSS-in-JS**: All styles embedded in JavaScript for single-file deployment

## Integration Patterns

### Basic Integration
```html
<script src="https://mydomain.com/chatbot-widget.js" async></script>
```

### Advanced Integration (Multiple Agents)
```html
<my-chatbot agent-id="career_bot"></my-chatbot>
<script src="https://mydomain.com/chatbot-widget.js" async></script>
```

### API Contract
The widget expects POST requests to `/chat` endpoint with:
```json
{
  "message": "user message text",
  "agent_id": "optional_agent_id"
}
```

Response format:
```json
{
  "response": "chatbot response text"
}
```

## Code Organization

**Configuration Management**: All configurable options are centralized in the CONFIG object at the top of the main file, making it easy to modify API endpoints, styling, and behavior.

**Event Handling**: Uses addEventListener patterns with proper cleanup. Key interactions include chat toggle, message sending, auto-resize textarea, and click-outside-to-close.

**Responsive Design**: Mobile-first CSS with media queries for different screen sizes. Chat window adapts to viewport width on mobile devices.

**Message Management**: Implements message history with automatic cleanup (keeps only last 100 messages by default), typing indicators, and smooth scrolling.

**Error Handling**: Graceful API error handling with user-friendly fallback messages and console logging for debugging.

## File Structure

- `src/chatbot-widget.js` - Main source code (single file contains everything)
- `dist/` - Built distribution files (regular and minified)
- `example.html` - Demo page with mock API for testing
- `build.js` - Custom build script
- `package.json` - Project metadata and scripts

## Development Workflow

1. **Modify Source**: Edit `src/chatbot-widget.js` for feature changes
2. **Test Locally**: Use `npm run serve` and open `example.html`
3. **Build for Production**: Run `npm run build` to generate distribution files
4. **Deploy**: Upload `dist/chatbot-widget.min.js` to your CDN/server

## Configuration Customization

Key areas to modify for different deployments:

**API Endpoint**: Update `CONFIG.apiEndpoint` to point to your chatbot backend
**Styling**: Modify CSS_STYLES constant for visual customization
**Positioning**: Change `CONFIG.position` for different widget placement
**Behavior**: Adjust typing duration, max messages, and other settings in CONFIG

## Widget Features

- Floating chat button with hover animations
- Expandable chat window with smooth transitions
- Message history with custom scrollbar styling
- Typing indicators during API calls
- Auto-resizing textarea input
- Keyboard shortcuts (Enter to send, Shift+Enter for new lines)
- Click-outside-to-close functionality
- Mobile responsive design
- Support for multiple chatbot personalities via agent IDs
- Graceful error handling and fallback messages
