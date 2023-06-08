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
}