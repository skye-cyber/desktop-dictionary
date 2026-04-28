interface DictionaryEntry {
    word: string;
    phonetic?: string;
    part_of_speech?: string;
    definition: string;
    example?: string;
}
declare class DictionaryService {
    private data;
    init(): void;
    getJsonPath(): string;
    getBundledJsonPath(): string;
    createEmptyJson(jsonPath: string): void;
    search(query: string): DictionaryEntry[];
    getDetails(word: string): DictionaryEntry[];
    close(): void;
}
export default DictionaryService;
//# sourceMappingURL=dictionaryService.d.ts.map