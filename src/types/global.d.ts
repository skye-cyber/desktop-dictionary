declare module '*.css' {
    const content: string;
    export default content;
}

declare module '*.scss' { }
declare module '*.sass' { }
declare module '*.less' { }
declare module '*.svg' {
    const content: string;
    export default content;
}
declare module '*.png' {
    const content: string;
    export default content;
}

export enum PhraseType {
    Noun = "Noun",
    Adjective = "Adjective",
    Verb = "Verb",
    Adverb = "Adverb"
}


export interface MeaningStructureType {
    type: PhraseType | string
    meaning: string
    other: string[]  // Other illustrative meaning
    examples: string[]
}

export interface DictionaryEntry {
    meanings: MeaningStructureType[]
    synonyms: string[]
    antonyms: string[]
}

export type Dictionary = Map<string, DictionaryEntry>
