# 🏠 Home Automation RAG Chatbot

A intelligent chatbot powered by Retrieval-Augmented Generation (RAG) that provides latest expert guidance and DIY solutions on home automation systems, smart devices, and IoT solutions. Built with JavaScript to help users make informed decisions about their smart home setups.

## ✨ Features

- **🤖 Intelligent Q&A**: Get accurate answers about home automation devices, protocols, and best practices
- **📚 Knowledge Retrieval**: RAG-powered responses using a curated database of home automation documentation
- **💬 Interactive Chat**: Real-time conversational interface for seamless user experience
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **⚡ Fast Response**: Optimized retrieval and generation for quick answers
- **🎯 Context-Aware**: Maintains conversation context for follow-up questions

## 🛠️ Tech Stack

- **Frontend**: HTML5, TailwindCSS, TypeScript
- **Backend**: NodeJS (NextJS)
- **Vector Database**: [DataStax] for document embeddings
- **AI/ML**: OpenAI API  for text generation
- **Embeddings**: Sentence Transformers for document vectorization
- **UI Framework**: [Tailwind CSS ] for styling

## 🚀 Quick Start

### Prerequisites

- Node.js (v22 or higher)
- npm or yarn
- API keys for your chosen LLM provider

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dprof-in-tech/home_automation_RAG-chatbot.git
   cd home_automation_RAG-chatbot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your environment variables:
   ```env
   # API Keys
   OPENAI_API_KEY=your_openai_api_key
    other keys
   

   ```

4. **Initialize Knowledge Base**
   ```bash
   npm run seed
   ```

5. **Start the application**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`


## 💻 Usage

### Basic Chat

1. Type your home automation question in the chat input
2. Press Enter or click Send
3. The bot will retrieve relevant information and generate a helpful response

### Example Queries

- "What's the difference between Zigbee and Z-Wave?"
- "How do I set up a smart lighting system?"
- "Best practices for home security automation"
- "Which smart thermostat works with Google Home?"
- "How to troubleshoot WiFi connectivity issues with smart devices"

### Advanced Features

- **Follow-up Questions**: The bot maintains context for multi-turn conversations
- **Source Citations**: Responses include references to source documents

## ⚙️ Configuration

### Knowledge Base

Add your own links it should scrape in the loadDB.ts


### Customizing Responses

Modify the system prompt in `loadDB.ts`:

```javascript
const SYSTEM_PROMPT = `
You are a helpful home automation expert. Provide accurate, 
practical advice based on the retrieved context. Always 
prioritize user safety and recommend certified devices.
`;
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow ESLint configuration for code style
- Update documentation for API changes

## 📚 Knowledge Base Sources

The chatbot's knowledge base includes information from:

- Device manufacturer documentation
- Home automation protocol specifications
- Best practices guides
- Troubleshooting manuals
- Community-contributed tutorials

## 🐛 Troubleshooting

### Common Issues

**Chat not responding**
- Check API keys in `.env` file
- Verify vector database connection
- Check browser console for errors

**Slow responses**
- Optimize embedding model
- Implement response caching
- Check vector database performance

**Inaccurate answers**
- Review knowledge base quality
- Adjust retrieval parameters
- Fine-tune system prompt

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for GPT models
- Pinecone for vector database
- Home automation community for knowledge sharing
- Contributors and testers

## 📞 Support

- 📧 Email: amaechiisaac450@gmail.com
- 💬 Issues: [GitHub Issues](https://github.com/dprof-in-teche/home_automation_RAG-chatbot/issues)

---

⭐ If you find this project helpful, please give it a star on GitHub!

Built with ❤️ for the smart home community