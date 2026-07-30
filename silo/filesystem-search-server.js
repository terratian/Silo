const http = require('http');
const { exec } = require('child_process');
const path = require('path');

const PORT = 8000;

const server = http.createServer((req, res) => {
    const urlParams = new URL(req.url, `http://${req.headers.host}`);
    
    if (urlParams.pathname === '/api/search') {
        const query = urlParams.searchParams.get('q') || '';
        
        // Clean query to prevent command injection
        const sanitizedQuery = query.replace(/["\$\`]/g, '');
        
        // Using macOS mdfind to search local files
        exec(`mdfind "${sanitizedQuery}"`, { maxBuffer: 1024 * 1024 * 10 }, (error, stdout, stderr) => {
            res.writeHead(200, { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            });

            if (error) {
                res.end(JSON.stringify({ results: [], error: 'Search execution failed' }));
                return;
            }

            const files = stdout.split('\n').filter(Boolean).slice(0, 50); // Limit to top 50 results
            res.end(JSON.stringify({ results: files }));
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Silo backend server running at http://localhost:${PORT}`);
});
