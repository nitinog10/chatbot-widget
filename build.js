```js
const fs = require('fs');
const path = require('path');
const { minifyJS } = require('./utils');
const { execSync } = require('child_process');

// Build function
function build() {
    console.log('🔨 Building chatbot widget...');
    
    const srcPath = path.join(__dirname, 'src', 'chatbot-widget.js');
    const distPath = path.join(__dirname, 'dist', 'chatbot-widget.js');
    const minDistPath = path.join(__dirname, 'dist', 'chatbot-widget.min.js');
    
    try {
        const sourceCode = fs.readFileSync(srcPath, 'utf8');
        
        if (!fs.existsSync(path.join(__dirname, 'dist'))) {
            fs.mkdirSync(path.join(__dirname, 'dist'));
        }
        
        fs.writeFileSync(distPath, sourceCode);
        console.log('✅ Created dist/chatbot-widget.js');
        
        const minifiedCode = minifyJS(sourceCode);
        fs.writeFileSync(minDistPath, minifiedCode);
        console.log('✅ Created dist/chatbot-widget.min.js');
        
        const originalSize = Math.round(fs.statSync(srcPath).size / 1024 * 100) / 100;
        const distSize = Math.round(fs.statSync(distPath).size / 1024 * 100) / 100;
        const minSize = Math.round(fs.statSync(minDistPath).size / 1024 * 100) / 100;
        
        console.log(`📊 File sizes:`);
        console.log(`   Source: ${originalSize}KB`);
        console.log(`   Dist: ${distSize}KB`);
        console.log(`   Minified: ${minSize}KB (${Math.round((1 - minSize / originalSize) * 100)}% reduction)`);
        
        console.log('🎉 Build completed successfully!');
        
    } catch (error) {
        console.error('❌ Build failed:', error.message);
        process.exit(1);
    }
}

function runTests() {
    try {
        execSync('mocha test/build.test.js');
        execSync('mocha test/chatbot-widget.test.js');
        console.log('✅ All tests passed!');
    } catch (error) {
        console.error('❌ Tests failed:', error.message);
        process.exit(1);
    }
}

if (require.main === module) {
    build();
    runTests();
}

module.exports = { build };
```

```js
// utils.js

function minifyJS(code) {
    return code
        .replace(/\/\/.*$/gm, '')
       .replace(/\/\*[\s\S]*?\*\//g, '')
       .replace(/\s+/g, ' ')
       .replace(/\s*([{}();,:])\s*/g, '$1')
       .trim();
}

module.exports = { minifyJS };
```

```js
// test/build.test.js

const { build } = require('../build');
const fs = require('fs');
const path = require('path');

describe('build function', () => {
    it('should create dist files', () => {
        build();
        const distPath = path.join(__dirname, '..', 'dist', 'chatbot-widget.js');
        const minDistPath = path.join(__dirname, '..', 'dist', 'chatbot-widget.min.js');
        
        assert.isTrue(fs.existsSync(distPath));
        assert.isTrue(fs.existsSync(minDistPath));
    });
    
    it('should minify the source code', () => {
        build();
        const srcPath = path.join(__dirname, '..','src', 'chatbot-widget.js');
        const minDistPath = path.join(__dirname, '..', 'dist', 'chatbot-widget.min.js');
        
        const sourceCode = fs.readFileSync(srcPath, 'utf8');
        const minifiedCode = fs.readFileSync(minDistPath, 'utf8');
        
        assert.isBelow(minifiedCode.length, sourceCode.length);
    });
});
```

```js
// test/chatbot-widget.test.js

const { expect } = require('chai');
const ChatbotWidget = require('../src/chatbot-widget');

describe('ChatbotWidget', () => {
    it('should initialize correctly', () => {
        const widget = new ChatbotWidget();
        expect(widget).to.be.an.instanceOf(ChatbotWidget);
    });
    
    // Add more tests as needed
});
```