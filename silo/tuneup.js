const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Configuration Profiles
const TARGET_DIR = path.join(process.env.HOME, 'Desktop/Messy_Desktop');
const OUTPUT_DIR = path.join(process.env.HOME, 'Silo_Organized');

// 1. Generate SHA-256 hash to detect true duplicate files
function getFileHash(filePath) {
    const fileBuffer = fs.readFileSync(filePath);
    return crypto.createHash('sha256').update(fileBuffer).digest('hex');
}

// 2. Define semantic segmentation categories by extension
function categorizeFile(ext) {
    const categories = {
        Documents: ['.pdf', '.docx', '.txt', '.md', '.pages', '.xlsx', '.csv'],
        Media: ['.jpg', '.png', '.mp4', '.mov', '.mp3', '.wav', '.flac'],
        Code: ['.js', '.py', '.html', '.css', '.json', '.sh', '.cpp'],
        Archives: ['.zip', '.tar', '.gz', '.rar', '.7z']
    };

    for [category, extensions] of Object.entries(categories)) {
        if (extensions.includes(ext.toLowerCase())) return category;
    }
    return 'Unsorted';
}

// 3. Main Processing & Restructuring Engine
function runSiloTuneUp() {
    console.log('🚀 Starting Silo File System Restructuring...');
    
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
        fs.mkdirSync(path.join(OUTPUT_DIR, 'Duplicates_Quarantine'), { recursive: true });
    }

    const fileRegistry = new Map(); // Hash -> Original Path
    const stats = { processed: 0, duplicates: 0, moved: 0 };

    function walkDirectory(currentDir) {
        const entries = fs.readdirSync(currentDir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(currentDir, entry.name);

            // Skip the output directory itself to avoid infinite loops
            if (fullPath.startsWith(OUTPUT_DIR)) continue;

            if (entry.isDirectory()) {
                walkDirectory(fullPath);
            } else if (entry.isFile()) {
                stats.processed++;
                try {
                    const fileHash = getFileHash(fullPath);
                    const ext = path.extname(entry.name);
                    const category = categorizeFile(ext);

                    if (fileRegistry.has(fileHash)) {
                        // Duplicate detected: Move to quarantine
                        stats.duplicates++;
                        const destPath = path.join(OUTPUT_DIR, 'Duplicates_Quarantine', entry.name);
                        fs.renameSync(fullPath, destPath);
                        console.log(`[DUPLICATE] Quarantined: ${entry.name}`);
                    } else {
                        // Unique file: Register and move to category folder
                        fileRegistry.set(fileHash, fullPath);
                        const categoryDir = path.join(OUTPUT_DIR, category);
                        
                        if (!fs.existsSync(categoryDir)) {
                            fs.mkdirSync(categoryDir, { recursive: true });
                        }

                        const destPath = path.join(categoryDir, entry.name);
                        fs.renameSync(fullPath, destPath);
                        stats.moved++;
                        console.log(`[ORGANIZED] Moved to ${category}: ${entry.name}`);
                    }
                } catch (err) {
                    console.error(`[ERROR] Failed to process ${entry.name}:`, err.message);
                }
            }
        }
    }

    walkDirectory(TARGET_DIR);
    console.log('\n--- Silo Tune-Up Complete ---');
    console.log(`Total Files Scanned: ${stats.processed}`);
    console.log(`Duplicates Quarantined: ${stats.duplicates}`);
    console.log(`Files Cleanly Categorized: ${stats.moved}`);
}

// Execute the routine
runSiloTuneUp();
