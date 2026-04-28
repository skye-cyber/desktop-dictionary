# Create a sample JSON database for testing
import json
import os

os.makedirs('assets', exist_ok=True)

json_path = 'assets/dictionary.json'
sample_data = [
    {
        "word": "abandon",
        "phonetic": "/əˈbændən/",
        "part_of_speech": "verb",
        "definition": "To give up completely (a course of action, a practice, or a way of thinking)",
        "example": "They had to abandon their car in the snow."
    },
    {
        "word": "ability",
        "phonetic": "/əˈbɪləti/",
        "part_of_speech": "noun",
        "definition": "Possession of the means or skill to do something",
        "example": "The manager had lost his ability to motivate the players."
    },
    {
        "word": "absolute",
        "phonetic": "/ˈæbsəluːt/",
        "part_of_speech": "adjective",
        "definition": "Not qualified or diminished in any way; total",
        "example": "The policy is an absolute disaster."
    },
    {
        "word": "abstract",
        "phonetic": "/ˈæbstrækt/",
        "part_of_speech": "adjective",
        "definition": "Existing in thought or as an idea but not having a physical or concrete existence",
        "example": "Abstract concepts like love and beauty are hard to define."
    },
    {
        "word": "abundant",
        "phonetic": "/əˈbʌndənt/",
        "part_of_speech": "adjective",
        "definition": "Existing or available in large quantities; plentiful",
        "example": "The region is abundant in wildlife."
    },
    {
        "word": "academic",
        "phonetic": "/ˌækəˈdemɪk/",
        "part_of_speech": "adjective",
        "definition": "Relating to education and scholarship",
        "example": "The university offers various academic programs."
    },
    {
        "word": "accelerate",
        "phonetic": "/əkˈseləreɪt/",
        "part_of_speech": "verb",
        "definition": "Begin to move more quickly",
        "example": "The car accelerated down the highway."
    },
    {
        "word": "access",
        "phonetic": "/ˈækses/",
        "part_of_speech": "noun",
        "definition": "The means or opportunity to approach or enter a place",
        "example": "The only access to the village is by boat."
    },
    {
        "word": "accommodate",
        "phonetic": "/əˈkɒmədeɪt/",
        "part_of_speech": "verb",
        "definition": "Provide lodging or sufficient space for",
        "example": "The hotel can accommodate up to 500 guests."
    },
    {
        "word": "accomplish",
        "phonetic": "/əˈkʌmplɪʃ/",
        "part_of_speech": "verb",
        "definition": "Achieve or complete successfully",
        "example": "She accomplished her mission."
    },
    {
        "word": "accurate",
        "phonetic": "/ˈækjʊrət/",
        "part_of_speech": "adjective",
        "definition": "Especially of information, measurements, or predictions) correct in all details; exact",
        "example": "The forecast turned out to be accurate."
    },
    {
        "word": "achieve",
        "phonetic": "/əˈtʃiːv/",
        "part_of_speech": "verb",
        "definition": "Successfully bring about or reach (a desired objective or result) by effort, skill, or courage",
        "example": "He achieved his goal of becoming a doctor."
    },
    {
        "word": "acknowledge",
        "phonetic": "/əkˈnɒlɪdʒ/",
        "part_of_speech": "verb",
        "definition": "Accept or admit the existence or truth of",
        "example": "The government acknowledged the problem."
    },
    {
        "word": "acquire",
        "phonetic": "/əˈkwaɪə/",
        "part_of_speech": "verb",
        "definition": "Buy or obtain (an asset or object) for oneself",
        "example": "The company has acquired a new office building."
    },
    {
        "word": "adapt",
        "phonetic": "/əˈdæpt/",
        "part_of_speech": "verb",
        "definition": "Make (something) suitable for a new use or purpose; modify",
        "example": "The building was adapted for wheelchair access."
    },
    {
        "word": "adequate",
        "phonetic": "/ˈædɪkwət/",
        "part_of_speech": "adjective",
        "definition": "Satisfactory or acceptable in quality or quantity",
        "example": "The food was adequate but not outstanding."
    },
    {
        "word": "adjust",
        "phonetic": "/əˈdʒʌst/",
        "part_of_speech": "verb",
        "definition": "Alter or move (something) slightly in order to achieve the desired fit, appearance, or result",
        "example": "He adjusted his tie before the interview."
    },
    {
        "word": "administer",
        "phonetic": "/ədˈmɪnɪstə/",
        "part_of_speech": "verb",
        "definition": "Manage and be responsible for the running of (a business, organization, etc.)",
        "example": "The agency administers the federal loan program."
    },
    {
        "word": "adopt",
        "phonetic": "/əˈdɒpt/",
        "part_of_speech": "verb",
        "definition": "Legally take (another's child) and bring it up as one's own",
        "example": "They decided to adopt a child from overseas."
    },
    {
        "word": "advance",
        "phonetic": "/ədˈvɑːns/",
        "part_of_speech": "verb",
        "definition": "Move forwards in a purposeful way",
        "example": "The troops advanced towards the enemy lines."
    },
]

with open(json_path, 'w') as f:
    json.dump(sample_data, f, indent=2)

print(f"Created sample JSON database with {len(sample_data)} entries at assets/dictionary.json")