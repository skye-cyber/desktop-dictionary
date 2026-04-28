import fs from 'fs';
import path from 'path';
import { app } from 'electron';

interface DictionaryEntry {
    word: string;
    phonetic?: string;
    part_of_speech?: string;
    definition: string;
    example?: string;
}

class DictionaryService {
    private data: DictionaryEntry[] = [];

    init() {
        const jsonPath = this.getJsonPath();

        // Ensure directory exists
        const jsonDir = path.dirname(jsonPath);
        if (!fs.existsSync(jsonDir)) {
            fs.mkdirSync(jsonDir, { recursive: true });
        }

        // Copy bundled JSON if user JSON doesn't exist
        if (!fs.existsSync(jsonPath)) {
            const bundledJson = this.getBundledJsonPath();
            if (fs.existsSync(bundledJson)) {
                fs.copyFileSync(bundledJson, jsonPath);
            } else {
                // Create empty JSON structure
                this.createEmptyJson(jsonPath);
            }
        }

        // Load JSON data
        const jsonData = fs.readFileSync(jsonPath, 'utf-8');
        this.data = JSON.parse(jsonData);
    }

    getJsonPath() {
        const userData = app.getPath('userData');
        return path.join(userData, 'dictionary.json');
    }

    getBundledJsonPath() {
        return path.join(process.resourcesPath, 'dictionary.json');
    }

    createEmptyJson(jsonPath: string) {
        const emptyData = [];
        fs.writeFileSync(jsonPath, JSON.stringify(emptyData, null, 2));
    }

    search(query: string): DictionaryEntry[] {
        if (!query || query.trim().length === 0) return [];

        const searchTerm = query.trim().toLowerCase();
        
        return this.data
            .filter(entry => 
                entry.word.toLowerCase().includes(searchTerm)
            )
            .sort((a, b) => {
                // Exact matches first
                if (a.word.toLowerCase() === searchTerm) return -1;
                if (b.word.toLowerCase() === searchTerm) return 1;
                
                // Then starts with
                if (a.word.toLowerCase().startsWith(searchTerm)) return -1;
                if (b.word.toLowerCase().startsWith(searchTerm)) return 1;
                
                // Then alphabetical
                return a.word.localeCompare(b.word);
            })
            .slice(0, 20);
    }

    getDetails(word: string): DictionaryEntry[] {
        return this.data.filter(entry => 
            entry.word.toLowerCase() === word.toLowerCase()
        );
    }

    close() {
        // No cleanup needed for JSON
    }
}

export default DictionaryService;