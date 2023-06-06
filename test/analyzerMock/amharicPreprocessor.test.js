import AmharicNormalizer from '../../src/analyzer/AmharicPreprocessor';  // import class

describe('AmharicPreprocessor', () => {
  const normalizationTestcases = [
    {input: 'ሀሐሓኅኻኃ', expected: 'ሃሃሃሃሃሃ'},
    {input: 'ዅሗኁኂ', expected: 'ሁኋሁሂ'},
    {input: 'ኄዄኅኆ', expected: 'ሄሄሃሆ'},
    {input: 'ሠሡሢሣሤሥሦ', expected: 'ሰሱሲሳሴስሶ'},
    {input: 'ዐዑዒዓኣዔዕዖ', expected: 'አኡኢአአኤእኦ'},
    {input: 'ፀፁጺጻጼፅፆ', expected: 'ጸጹፂፃፄጽጾ'}
  ];

  const punctuationRemovalTestcases = [
    {input: '።።።', expected: ''},
    {input: 'እንደ : እንደ!', expected: 'እንደ እንደ'},
    {input: 'መልካም ጊዜ ነው።', expected: 'መልካም ጊዜ ነው'},
    {input: 'በለትተለት !እንቅስቃሴያችን @ውስጥ በድንገትና + ባላሰብነው ሁኔታ ከመለስተኛ አደጋዎች እስከ ከባድ የአጥንት መሰባበር ሊደርስብን #ይችላል፡፡', 
      expected: 'በለትተለት እንቅስቃሴያችን ውስጥ በድንገትና ባላሰብነው ሁኔታ ከመለስተኛ አደጋዎች እስከ ከባድ የአጥንት መሰባበር ሊደርስብን ይችላል'}, 
    {input: '።፣፤፥፦፧፨', expected: ''}
  ];

  const stopwordRemovalTestcases = [
    {input: 'እንደ እንደ', expected: ''},
    {input: 'አዲስ አበባ እንደ', expected: 'አዲስ አበባ'},
    {input: 'አዲስ አበባ', expected: 'አዲስ አበባ'},
    {input: 'አዲስ አበባ እና አዲስ አበባ', expected: 'አዲስ አበባ ተማ እና አዲስ አበባ ተማ'}
  ];
  const extraSpaceRemovalTestcases = [
      {input: 'አዲስ  አበባ', expected: 'አዲስ አበባ'},
      {input: '  አዲስ አበባ  ', expected: 'አዲስ አበባ'},
      {input: 'አዲስ   አበባ', expected: 'አዲስ አበባ'},
      {input: 'አዲስ አበባ   እና   አዲስ አበባ', expected: 'አዲስ አበባ እና አዲስ አበባ'},
      {input: 'አዲስ አበባ', expected: 'አዲስ አበባ'},
      {input: 'አዲስ አበባ እና አዲስ አበባ', expected: 'አዲስ አበባ እና አዲስ አበባ'}
    ];

  const mixedCharsTestCases = [
    {input: 'አዲስ and አበባ 123', expected: 'አዲስ አበባ'},
    {input: 'አዲስ 1 አበባ 2', expected: 'አዲስ አበባ'},
    {input: 'አዲስ 123 አበባ', expected: 'አዲስ አበባ'},
    {input: 'hello አዲስ 123 world', expected: 'አዲስ አበባ'},
    {input: 'አዲስ 123 አበባ hello world', expected: 'አዲስ አበባ'}
  ];

  normalizationTestcases.forEach(({ input, expected }) => {
    it(`should normalize "${input}" to "${expected}"`, () => {
      const result = AmharicNormalizer.normalize(input);
      expect(result).toBe(expected);
    });
  });

  punctuationRemovalTestcases.forEach(({ input, expected }) => {
    it(`should remove punctuation from "${input}" to "${expected}"`, () => {
      const result = AmharicNormalizer.removePunctuation(input);
      expect(result).toBe(expected);
    });
  });

  stopwordRemovalTestcases.forEach(({ input, expected }) => {
    it(`should remove stopwords from "${input}" to "${expected}"`, () => {
      const result = AmharicNormalizer.removeStopwords(input);
      expect(result).toBe(expected);
    });
  });

  extraSpaceRemovalTestcases.forEach(({ input, expected }) => {
    it(`should remove extra spaces from "${input}" to "${expected}"`, () => {
      const result = AmharicNormalizer.removeExtraSpaces(input);
      expect(result).toBe(expected);
    });
  });    

  mixedCharsTestCases.forEach(({ input, expected }) => {
    it(`should remove mixed chars from "${input}" to "${expected}"`, () => {
      const result = AmharicNormalizer.removeMixedChars(input);
      expect(result).toBe(expected);
    });
  });

});
