# Chatbot Widget

A production-ready JavaScript embeddable chatbot widget that can integrate custom chatbot APIs into any website.

## Features

- 🚀 Lightweight vanilla JavaScript (no dependencies)
- 💬 Floating chat button with smooth animations
- 🎨 Clean, modern styling with customizable themes
- 📱 Responsive design for mobile and desktop
- 🔌 Easy one-line integration
- 🤖 Support for multiple chatbot personalities
- 📜 Message history and scrollable chat interface
- ⚡ Fast loading and minimal footprint

## Quick Start

Add this single line to your HTML:

```html
<script src="https://mydomain.com/chatbot-widget.js" async></script>
```

## Advanced Usage

For multiple chatbot personalities:

```html
<my-chatbot agent-id="career_bot"></my-chatbot>
<script src="https://mydomain.com/chatbot-widget.js" async></script>
```

## Configuration

The widget automatically configures itself, but you can customize:

- API endpoint
- Agent ID for different personalities
- Styling and colors
- Position and behavior

## Development

1. Clone the repository
2. Run `npm run serve` to start development server
3. Open `example.html` to test the widget
4. Run `npm run build` to create production build

## API Integration

The widget expects your backend to handle POST requests to `/chat` with:

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

## License

MIT License - see LICENSE file for details.
