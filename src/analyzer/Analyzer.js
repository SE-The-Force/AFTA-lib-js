import { PythonShell } from 'python-shell';

class AnalyzerMock {
  constructor() {}

  tokens(text) {
    return text.split(' ');
  }

  async analyze(text) {
    text = AmharicNormalizer.normalize(text); // Normalize the text
    const tokens = this.tokens(text);
    const options = {
      mode: 'text',
      pythonOptions: ['-u'], // Python unbuffered output
      scriptPath: '../', // Replace with the path to your Python script
      args: tokens,
    };

    return new Promise((resolve, reject) => {
      PythonShell.run('root_extract.py', options, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }
}

class AmharicNormalizer {
  static normalize(norm) {
    const substitutions = [
      ["ሀ", "ሃ"], ["ሐ", "ሃ"], ["ሓ", "ሃ"], ["ኅ", "ሃ"], ["ኻ", "ሃ"], ["ኃ", "ሃ"], ["ዅ", "ሁ"], ["ሗ", "ኋ"], ["ኁ", "ሁ"], ["ኂ", "ሂ"],
      ["ኄ", "ሄ"], ["ዄ", "ሄ"], ["ኅ", "ህ"], ["ኆ", "ሆ"], ["ሑ", "ሁ"], ["ሒ", "ሂ"], ["ሔ", "ሄ"], ["ሕ", "ህ"], ["ሖ", "ሆ"], ["ኾ", "ሆ"],
      ["ሠ", "ሰ"], ["ሡ", "ሱ"], ["ሢ", "ሲ"], ["ሣ", "ሳ"], ["ሤ", "ሴ"], ["ሥ", "ስ"], ["ሦ", "ሶ"], ["ዐ", "አ"], ["ዑ", "ኡ"], ["ዒ", "ኢ"],
      ["ዓ", "አ"], ["ኣ", "አ"], ["ዔ", "ኤ"], ["ዕ", "እ"], ["ዖ", "ኦ"], ["ፀ", "ጸ"], ["ፁ", "ጹ"], ["ጺ", "ፂ"], ["ጻ", "ፃ"], ["ጼ", "ፄ"],
      ["ፅ", "ጽ"], ["ፆ", "ጾ"], ["ሼ", "ሸ"], ["ሺ", "ሽ"], ["ዲ", "ድ"], ["ጄ", "ጀ"], ["ጂ", "ጅ"], ["ዉ", "ው"], ["ዎ", "ወ"], ["ዴ", "ደ"],
      ["ቼ", "ቸ"], ["ቺ", "ች"], ["ዬ", "የ"], ["ዪ", "ይ"], ["ጬ", "ጨ"], ["ጪ", "ጭ"], ["ኜ", "ኘ"], ["ኚ", "ኝ"], ["ዤ", "ዠ"], ["ዢ", "ዥ"],
    ];
    const reSubstitutions = [
      [/ሉ[ዋአ]/g, "ሏ"], [/ሙ[ዋአ]/g, "ሟ"], [/ቱ[ዋአ]/g, "ቷ"], [/ሩ[ዋአ]/g, "ሯ"], [/ሱ[ዋአ]/g, "ሷ"], [/ሹ[ዋአ]/g, "ሿ"],
      [/ቁ[ዋአ]/g, "ቋ"], [/ቡ[ዋአ]/g, "ቧ"], [/ቹ[ዋአ]/g, "ቿ"], [/ሁ[ዋአ]/g, "ኋ"], [/ኑ[ዋአ]/g, "ኗ"], [/ኙ[ዋአ]/g, "ኟ"],
      [/ኩ[ዋአ]/g, "ኳ"], [/ዙ[ዋአ]/g, "ዟ"], [/ጉ[ዋአ]/g, "ጓ"], [/ደ[ዋአ]/g, "ዷ"], [/ጡ[ዋአ]/g, "ጧ"], [/ጩ[ዋአ]/g, "ጯ"],
      [/ጹ[ዋአ]/g, "ጿ"], [/ፉ[ዋአ]/g, "ፏ"], [/ቊ/g, "ቁ"], [/ኵ/g, "ኩ"], [/\s+/g, " "]
    ];

    substitutions.forEach(([oldChar, newChar]) => {
      norm = norm.split(oldChar).join(newChar);
    });

    reSubstitutions.forEach(([oldChar, newChar]) => {
      norm = norm.replace(oldChar, newChar);
    });

    return norm;
  }
}


const analyzer = new AnalyzerMock();
const text = 'ስራዎች';
const result = await analyzer.analyze(text);