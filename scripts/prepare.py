import json
import glob
from pathlib import Path
from enum import Enum
from tqdm.auto import tqdm


class PhraseType(str, Enum):
    Noun = "Noun"
    Adjective = "Adjective"
    Verb = "Verb"
    Adverb = "Adverb"


class MeaningStructure:
    type: PhraseType | str
    meaning: str
    other: [str | None]  # Other illustrative meaning
    synonyms: [str | None]
    examples: [str | None]


class WordType:
    meanings: [MeaningStructure]
    synonyms: [str | None]
    antonyms: [str | None]


class SkeletonType(str, WordType):
    str = WordType


class PrepareDictionary:
    def runAll(self, files: [str | Path], outdir: str | Path):
        out_directory = Path(outdir).absolute()
        out_directory.mkdir(parents=True, exist_ok=True)

        for file in tqdm(files):
            input_path = Path(file).absolute()
            if not input_path.exists():
                continue
            with open(input_path.as_posix(), "r") as f:
                input_data = json.load(f)
            if not input_data:
                continue
            skeleton_data = self.prepare(input_data)

            if not skeleton_data:
                continue
            self.save(
                skeleton_data, (out_directory / f"{input_path.stem}.json").as_posix()
            )

    def prepare(self, data: str) -> SkeletonType:
        if data:
            Skeleton: SkeletonType = {}
            for key, value in data.items():
                MEANINGS = value["MEANINGS"]
                SYNONYMS = value["SYNONYMS"]
                ANTONYMS = value["ANTONYMS"]
                Word: WordType = {}
                Meanings = []
                for subkey, subvalue in MEANINGS.items():
                    TYPE = subvalue[0]
                    MEANING: str = str(subvalue[1]).title()
                    OTHER: [str | None] = subvalue[2]
                    EXAMPLES: [str | None] = subvalue[3]
                    # Prep meaning and populate content
                    Meaning: MeaningStructure = {}
                    Meaning["type"] = TYPE
                    Meaning["meaning"] = MEANING
                    Meaning["other"] = OTHER
                    Meaning["examples"] = EXAMPLES

                    # Append to word
                    Meanings.append(Meaning)
                # Prep Word content
                Word["meanings"] = Meanings
                Word["synonyms"] = SYNONYMS
                Word["antonyms"] = ANTONYMS
                Skeleton[key] = Word

        return Skeleton

    def save(self, data, fpath: str | Path, create: bool = True) -> bool:
        if not data:
            return False

        try:
            full_path = Path(fpath).absolute()

            if full_path.parent.is_dir() and not full_path.parent.exists():
                if not create:
                    print("Prent directory not found")
                    return False
                # Creating directory structure
                full_path.parent.mkdir(parents=True, exist_ok=True)

            with open(full_path.as_posix(), "w") as fd:
                json.dump(data, fd)  # indent=2 no indent to reduce file size
            return True
        except Exception as e:
            print(e)
            return False


if __name__ == "__main__":
    # Reads all the files in /data and merges them into "processed/merged.json"
    data_path = Path(__file__).parent / "data"
    files = glob.glob((data_path / "*.json").as_posix())
    # Save to assets/dictionary
    PrepareDictionary().runAll(
        files=files, outdir=data_path.parent.parent / "src/assets/dictionary"
    )
