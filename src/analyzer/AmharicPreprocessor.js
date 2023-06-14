/**
 * Class representing an Amharic preprocessor.
 * @class
 */
export default class AmharicPreprocessor {
  /**
   * Remove punctuation marks from the text.
   * @param {string} text - The input text.
   * @returns {string} The text with punctuation marks removed.
   */
  static removePunctuation(text) {
    const punctuations = ['!', '@', '#', '\\$', '%', '\\^', '&', '\\*', '\\(', '\\)', '\\[', '\\]', '\\{', '\\}', ';', ':', '\\.', ',', '<', '>', '\\?', '/', '\\|', '~', '=', '\\+', '«', '»', '“', '”', '›', '’', '‘', "'", '\\"', '፡', '።', '፤', '፥', '፦', '፧', '፨', '…','፣', '-'];

    const cleanedText = text.replace(new RegExp(`[${punctuations.join("")}]`, "g"), ""); 
    const result = this.removeExtraSpaces(cleanedText);
    return result;
  }

  /**
   * Remove non-Amharic characters from the text.
   * @param {string} text - The input text.
   * @returns {string} The text with non-Amharic characters removed.
   */
  static removeNonAmharicChars(text) {
    const cleanedText = text.replace(/[a-zA-Z0-9]/g, "");
    return this.removeExtraSpaces(cleanedText);
  }

  /**
   * Remove extra spaces from the text.
   * @param {string} text - The input text.
   * @returns {string} The text with extra spaces removed.
   */
  static removeExtraSpaces(text) {
    const cleanedText = text.replace(/\s+/g, " ").trim();
    return cleanedText;
  }

  /**
   * Remove stop words from the text.
   * @param {string} text - The input text.
   * @returns {string} The text with stop words removed.
   */
  static removeStopWords(text) {
      const stopwords = [
        "ህ-ን", "እንደ", "የ", "አል", "ው", "ኡ", "በ", "ተ", "ለ", "ን", "ኦች", "ኧ", "ና", "ከ", "እን", "አንድ", "አይ", "አዎ",
          "አቸው", "ት", "መ", "አ", "አት", "ዎች", "ም", "አስ", "ኡት", "ላ", "ይ", "ማ", "ያ", "አ", "ቶ", "እንዲ", 
         "የሚ", "ኦ", "ይ", "እየ", "ሲ", "ብ", "ወደ", "ሌላ", "ጋር", "ኡ", "እዚህ", "አንድ", "ውስጥ", "እንድ", "እ-ል", "ን-ብ-ር", 
         "በኩል", "ል", "እስከ", "እና", "ድ-ግ-ም", "መካከል", "ኧት", "ሊ", "አይ", "ምክንያት", "ይህ", "ኧች", "ኢት", "ዋና", "አን", 
         "እየ", "ስለ", "ች", "ስ", "ቢ", "ብቻ", "በየ", "ባለ", "ጋራ", "ኋላ", "እነ", "አም", "ሽ", "አዊ", "ዋ", "ያለ", "ግን", "ምን", 
         "አችን", "ወይዘሮ", "ወዲህ", "ማን", "ዘንድ", "የት", "ናቸው", "ላ", "ይሁን", "ወይም", "ታች", "እዚያ", "እጅግ", "እንጅ", "በጣም", 
         "ወዘተ", "ጅ-ም-ር", "አሁን", "ከነ", "ተራ", "ም-ል", "ጎሽ", "አዎ", "እሽ", "ጉዳይ", "ረገድ", "ያህል", "ይልቅ", "ዳር", "እንኳ", 
         "አዎን", "ብ-ዝ", "ጥቂት", "እኔ", "አንተ", "እርስዎ", "እሳቸው", "እሱ", "አንች", "እኛ", "እነሱ", "እናንተ", "ይኸ", "የቱ", "መቼ", 
         "ወይዘሪት", "ትናንት", "ይኽ", "ኤል", "ኦቸ", "ኢዋ", "የለ", "ሰሞን", "ፊት", "ምንጊዜ", "አቸን", "ኧም", "አወ", "ኢያ", "ነገ", 
         "ትላንት", "ኣት", "እንጃ", "ድ-ር-ግ", "መልክ"
      ];

      const cleanedText = text.split(" ").filter(word => !stopwords.includes(word)).join(" ");
      return this.removeExtraSpaces(cleanedText);
    }

    /**
   * Normalize the text by applying character substitutions.
   * @param {string} norm - The normalized text.
   * @returns {string} The text with character substitutions applied.
   */
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


  /**
   * Transliterate the text from one script to another (Amharic to English or vice versa).
   * @param {string} text - The text to be transliterated.
   * @param {string} lang - Accepts either "en" or "am" to transliterate the given text to either English or Amharic, respectively.
   * @returns {string} The transliteration text.
   */
  static transliterate(text, lang) {
    let unorm_transliterationPairs = [
      ["chwa", "ቿ"], ["chua", "ቿ"], ["chie", "ቼ"], ["che", "ቸ"], ["chu", "ቹ"], ["chi", "ቺ"], 
      ["cha", "ቻ"], ["cho", "ቾ"], ["hwa", "ኋ"], ["hua", "ኋ"], ["hie", "ሄ"], ["shwa", "ሿ"], 
      ["shua", "ሿ"], ["she", "ሸ"], ["shu", "ሹ"], ["shi", "ሺ"], ["sha", "ሻ"], ["sho", "ሾ"], 
      ["sh", "ሺ"], ["ha", "ሀ"], ["hu", "ሁ"], ["hi", "ሂ"], ["he", "ሄ"], ["ho", "ሆ"], ["lwa", "ሏ"], 
      ["lua", "ሏ"], ["le", "ለ"], ["lu", "ሉ"], ["li", "ሊ"], ["la", "ላ"], ["le", "ሌ"], ["lo", "ሎ"], 
      ["ll", "ል"], ["l", "ል"], ["mwa", "ሟ"], ["mua", "ሟ"], ["mie", "ሜ"], ["me", "መ"], ["mu", "ሙ"], 
      ["mi", "ሚ"], ["ma", "ማ"], ["mo", "ሞ"], ["m", "ም"], ["rwa", "ሯ"], ["rua", "ሯ"], ["rie", "ሬ"], 
      ["re", "ረ"], ["ru", "ሩ"], ["ri", "ሪ"], ["ra", "ራ"], ["ro", "ሮ"], ["rr", "ር"], ["r", "ር"], 
      ["swa", "ሷ"], ["sua", "ሷ"], ["sie", "ሴ"], ["se", "ሰ"], ["su", "ሱ"], ["si", "ሲ"], ["sa", "ሳ"], 
      ["so", "ሶ"], ["qwa", "ቋ"], ["qua", "ቋ"], ["qie", "ቄ"], ["qe", "ቀ"], ["qu", "ቁ"], ["qi", "ቂ"], 
      ["qa", "ቃ"], ["qo", "ቆ"], ["q", "ቅ"], ["bwa", "ቧ"], ["bua", "ቧ"], ["bie", "ቤ"], ["be", "በ"], 
      ["bu", "ቡ"], ["bi", "ቢ"], ["ba", "ባ"], ["bo", "ቦ"], ["b", "ብ"], ["vwa", "ቯ"], ["vua", "ቯ"], 
      ["vie", "ቬ"], ["ve", "ቨ"], ["vu", "ቩ"], ["vi", "ቪ"], ["va", "ቫ"], ["vo", "ቮ"], ["v", "ቭ"],
      ["twa", "ቷ"], ["tua", "ቷ"], ["tie", "ቴ"], ["te", "ተ"], ["tu", "ቱ"], ["ti", "ቲ"], ["ta", "ታ"], 
      ["to", "ቶ"], ["gnwa", "ኟ"], ["gnua", "ኟ"], ["gne", "ኘ"], ["gnu", "ኙ"], ["gni", "ኚ"], 
      ["gna", "ኛ"], ["gno", "ኞ"], ["gn", "ኝ"], ["nwa", "ኗ"], ["nua", "ኗ"], ["nie", "ኔ"], ["ne", "ነ"], 
      ["nu", "ኑ"], ["ni", "ኒ"], ["na", "ና"], ["no", "ኖ"], ["n", "ን"], ["kwa", "ኳ"], ["kua", "ኳ"], 
      ["kie", "ኬ"], ["ke", "ከ"], ["ku", "ኩ"], ["ki", "ኪ"], ["ka", "ካ"], ["ko", "ኮ"], ["k", "ክ"],
      ["wie", "ዌ"], ["we", "ወ"], ["wu", "ው"], ["wi", "ዊ"], ["wa", "ዋ"], ["wo", "ወ"], ["w", "ው"],
      ["zwa", "ዟ"], ["zua", "ዟ"], ["zie", "ዜ"], ["ze", "ዘ"], ["zu", "ዙ"], ["zi", "ዚ"], ["za", "ዛ"], 
      ["zo", "ዞ"], ["zhwa", "ዧ"], ["zhua", "ዧ"], ["zhie", "ዤ"], ["zhe", "ዠ"], ["zhu", "ዡ"], 
      ["zhi", "ዢ"], ["zha", "ዣ"], ["zho", "ዦ"], ["zh", "ዥ"], ["z", "ዝ"], ["ye", "የ"], ["yu", "ዩ"], 
      ["yi", "ዪ"], ["ya", "ያ"], ["yo", "ዮ"], ["y", "ይ"], ["dwa", "ዷ"], ["dua", "ዷ"], ["die", "ዴ"], 
      ["de", "ደ"], ["du", "ዱ"], ["di", "ዲ"], ["da", "ዳ"], ["do", "ዶ"], ["d", "ድ"], ["jwa", "ጇ"], 
      ["jua", "ጇ"], ["je", "ጀ"], ["ju", "ጁ"], ["ji", "ጂ"], ["ja", "ጃ"], ["jo", "ጆ"], ["j", "ጅ"],
      ["gwa", "ጓ"], ["gua", "ጓ"], ["gie", "ጌ"], ["ge", "ገ"], ["gu", "ጉ"], ["gi", "ጊ"], ["ga", "ጋ"], 
      ["go", "ጎ"], ["g", "ግ"], ["chwa", "ጯ"], ["chua", "ጯ"], ["che", "ጨ"], ["chu", "ጩ"], 
      ["chi", "ጪ"], ["cha", "ጫ"], ["cho", "ጮ"], ["ch", "ች"], ["h", "ህ"], ["tswa", "ጿ"], 
      ["tsua", "ጿ"], ["tsie", "ፄ"], ["tse", "ፀ"], ["tsu", "ፁ"], ["tsi", "ፂ"], ["tsa", "ፃ"], 
      ["tso", "ፆ"], ["ts", "ፅ"], ["t", "ት"], ["ss", "ስ"], ["fwa", "ፏ"], ["fua", "ፏ"], ["fie", "ፌ"], 
      ["fe", "ፈ"], ["fu", "ፉ"], ["fi", "ፊ"], ["fa", "ፋ"], ["fo", "ፎ"], ["f", "ፍ"], ["pwa", "ፗ"], 
      ["pua", "ፗ"], ["pie", "ፔ"], ["pe", "ፐ"], ["pu", "ፑ"], ["pi", "ፒ"], ["pa", "ፓ"], ["po", "ፖ"], 
      ["p", "ፕ"], ["ca", "ካ"], ["ci", "ሲ"], ["ce", "ሰ"], ["cu", "ኩ"], ["c ", "ክ"], [" gn ", "ግን"], 
      ["c", "ች"], ["xe", "ዘ"], ["xu", "ዙ"], ["xi", "ዚ"], ["xa", "ዛ"], ["xo", "ዞ"], ["x", "ክስ"], 
      ["xs", "ክስ"], ["s", "ስ"], ["uh", "ኧ"], ["a", "አ"], ["ē","ኤ"], ["u", "ኡ"], ["i", "ኢ"], ["e", "እ"], ["o", "ኦ"],
      [". ", "፡፡"], [";", "፤"], [": ", "፥"], [",", "፣"]];
      
      const transliterationPairs = [];
      unorm_transliterationPairs.forEach(([enChar, amChar]) => {
        transliterationPairs.push([enChar, this.normalize(amChar)]);
      });

      if (lang === "en") {
        transliterationPairs.forEach(([enChar, amChar]) => {
          for (let i = 0; i < text.length; i++) {
            text = text.replace(amChar, enChar);
          }
        });
      } else if (lang === "am") {
        text = this.normalize(text);
        transliterationPairs.forEach(([enChar, amChar]) => {
          text = text.replace(enChar, amChar);
        });
      } else {
        console.error("Invalid language! Please choose either 'en' or 'am' for the second argument.");
      }
      return text;
  }

    /**
   * Reduce the word to its stem form.
   * @param {string} word - The word to be stemmed.
   * @returns {string} The stemmed word.
   */
  static stem(word) {
    // Preprocessing and prechecks 
    word = this.removeExtraSpaces(word);
    word = this.removePunctuation(word);
    word = this.removeStopWords(word);
    word = this.removeNonAmharicChars(word);
    word = this.normalize(word);
    
    if (word.length < 1) {
      return "";
    } else if (word.length <= 3) {
      return word;
    }

    // Setup prefix list
    let unorm_prefixes = [
      "ስልኧምኣይ", "ይኧምኣት", "ዕንድኧ", "ይኧትኧ", "ብኧምኣ", "ብኧትኧ", "ዕኧል", "ስልኧ", "ምኧስ", "ዕይኧ", "ዕኧስ", 
      "ዕኧት", "ዕኧን", "ዕኧይ", "ይኣል", "ስኣት", "ስኣን", "ስኣይ", "ስ ኣል", "ይኣስ", "ይኧ", "ልኧ", "ክኧ", "እን", 
      "ዕን", "ዐል", "ይ", "ት", "አ", "እ"
    ]
    const prefixes = [];
    unorm_prefixes.forEach(prefix => {
      prefixes.push(this.normalize(prefix));
    });


    // Setup suffix list
    let unorm_suffixes = [
      "ኢዕኧልኧሽ", "ኣውኢው", "አዊው", "ኣችኧውኣል", "ኧችኣት", "ኧቻት", "ኧችኣችህኡ", "ኧቻቹ", "ኧችኣችኧው","ኧቻቸው", "ኣልኧህኡ", 
      "አልሁ","ኣውኦች", "ኣልኧህ","አለህ", "ኣልኧሽ","አልሽ","ኣልችህኡ", "ኣልችሁ", "ኣልኣልኧች","ኣላለች", "ብኣችኧውስ", "ባቸውስ", "ብኣችኧው","ባቸው", "ኣችኧውን", "ኣቸውን", "ኣልኧች","አለች", "ኣልኧን", "አለን", "ኣልኧው", "አለው",
      "ኣልኣችህኡ","አላቹ","አላችሁ", "ኣችህኡን","አችሁን","አቹን", "ኣችህኡ", "ኣችሁ","ኣቹ", "ኣችህኡት", "ኣችሁት","ውኦችንንኣ","ዎችና", "ውኦችን","ዋችን", "ኣችኧው","ኣቸው", "ውኦችኡን","ዎችን", "ውኦችኡ", "ዎቹ", "ኧውንኣ","ኧውና", 
      "ኦችኡን", "ኦቹን", "ኦውኦች", "አዎች", "ኧኝኣንኧትም", "ኧኛነትም", "ኧኝኣንኣ","ኧኛና", "ኧኝኣንኧት", "ኧኛነት", "ኧኝኣን","ኘን", "ኧኝኣውም", "ኛውም", "ኧኝኣው", "ኛው", "ኝኣውኣ","ኛዋ", "ብኧትን","በትን", 
      "ኣችህኡም", "ኦውኣ","አዋ", "ኧችው", "ኧችኡ","ኧቹ", "ኤችኡ", "ንኧው","ነው", "ንኧት","ነት", "ኣልኡ", "አሉ", "ኣችን", "ክኡም","ኩም", "ክኡት", "ኩት","ክኧው", "ከው",
      "ኧችን", "ኧችም", "ኧችህ", "ኧችሽ", "ኧችን", "ኧችው", "ይኡሽን", "ይኡሽ","ዩሽ", "ኧውኢ","ኧዊ", "ኦችንንኣ","ኦችና", "ኣውኢ","አዊ", "ብኧት", "በት",
      "ኦች", "ኦችኡ", "ኦቹ", "ውኦን", "ኧኝኣ", "ኝኣውን", "ኝኣው", "ኦችን", "ኣል", "ኧም", "ሽው", "ክም", "ኧው", "ትም", "ውኦ", "ዎ", 
      "ውም", "ውን", "ንም", "ሽን", "ኣች", "ኡት", "ኢት", "ክኡ","ኩ", "ኤ", "ህ", "ሽ", "ኡ", "ሽ", "ክ", "ኧ", "ኧች", 
      "ኡን", "ን", "ም", "ንኣ","ና", "ው"
    ]

    const suffixes = [];
    unorm_suffixes.forEach(suffix => {
      suffixes.push(this.normalize(suffix));
    });

    let unorm_affix_substitutions = [
      ["ዕንድኣ", "ዕኣ"], ["ጭኣል", "ጥኣል"], ["ዕኧልኣ","ዕኣ"]
    ]

    const affix_substitutions = [];
    unorm_affix_substitutions.forEach(substitution => {
      affix_substitutions.push([this.normalize(substitution[0]), this.normalize(substitution[1])]);
    });

    var word_CV_form = this.transliterate(word, "en");
    console.log("transliterated: ", word_CV_form);
    if (word_CV_form.length > 2) {
      affix_substitutions.forEach(substitution => {
        word_CV_form = word_CV_form.replace(this.transliterate(substitution[0], "en"), this.transliterate(substitution[1], "en"));
      }
      );

      if (word_CV_form[word_CV_form.length - 1] === this.transliterate("ኝ", "en")) {
        word_CV_form = word_CV_form.replace(this.transliterate("እኧስ", "en"), this.transliterate("ስ", "en"));
        word_CV_form = word_CV_form.slice(0, -1);
      }

      if (word_CV_form[0] === this.transliterate("ዕ", "en") & word_CV_form[2] === this.transliterate("ኧ", "en")) {
        word_CV_form = word_CV_form.slice(1);
      }
    }

    if (word_CV_form.length > 3) {
      suffixes.forEach(suffix => {
        let transliterated = this.transliterate(suffix, "en");
        if (word_CV_form.endsWith(transliterated)) {
          word_CV_form = word_CV_form.slice(0, -transliterated.length);
        }
      });
    }

    if (word_CV_form.length > 3) {
      prefixes.forEach(prefix => {
        if (word_CV_form.startsWith(this.transliterate(prefix, "en"))) {
          word_CV_form = word_CV_form.slice(prefix.length);
        }
      });
    }
    
    let word_stem = word_CV_form.replace(/[aeiou]/gi, '');
    return this.transliterate(word_stem, "am");
  }
}
