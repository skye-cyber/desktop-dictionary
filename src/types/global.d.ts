declare module '*.css' {
    const content: string;
    export default content;
}

declare module '*.scss' {}
declare module '*.sass' {}
declare module '*.less' {}
declare module '*.svg' {
    const content: string;
    export default content;
}
declare module '*.png' {
    const content: string;
    export default content;
}

export enum PhraseType{
    Noun = "Noun",
    Adjective = "Adjective",
    Verb = "Verb",
    Adverb = "Adverb"
}


export interface MeaningStructureType{
    type: PhraseType | string
    meaning: string
    other: string | null[]  // Other illustrative meaning
    synonyms: string | null[]
    examples: string | null[]
}

export interface DictionaryEntry{
    meanings: MeaningStructureType[]
    synonyms: string | null[]
    antonyms: string | null[]
}
