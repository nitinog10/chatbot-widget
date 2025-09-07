const fs = require('fs');
const path = require('path');

// Simple minification function (removes comments and excess whitespace)
function minifyJS(code) {
    return code
        // Remove single-line comments
        .replace(/\/\/.*$/gm, '')
        // Remove multi-line comments
        .replace(/\/\*[\s\S]*?\*\//g, '')
        // Remove excess whitespace
        .replace(/\s+/g, ' ')
        // Remove spaces around operators and brackets
        .replace(/\s*([{}();,:])\s*/g, '$1')
        // Remove leading/trailing whitespace
        .trim();
}

// Build function
function build() {
    console.log('🔨 Building chatbot widget...');
    
    // Read source file
    const srcPath = path.join(__dirname, 'src', 'chatbot-widget.js');
    const distPath = path.join(__dirname, 'dist', 'chatbot-widget.js');
    const minDistPath = path.join(__dirname, 'dist', 'chatbot-widget.min.js');
    
    try {
        const sourceCode = fs.readFileSync(srcPath, 'utf8');
        
        // Create dist directory if it doesn't exist
        if (!fs.existsSync(path.join(__dirname, 'dist'))) {
            fs.mkdirSync(path.join(__dirname, 'dist'));
        }
        
        // Copy original file to dist
        fs.writeFileSync(distPath, sourceCode);
        console.log('✅ Created dist/chatbot-widget.js');
        
        // Create minified version
        const minifiedCode = minifyJS(sourceCode);
        fs.writeFileSync(minDistPath, minifiedCode);
        console.log('✅ Created dist/chatbot-widget.min.js');
        
        // Show file sizes
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

// Run build if this script is executed directly
if (require.main === module) {
    build();
}

module.exports = { build, minifyJS };
