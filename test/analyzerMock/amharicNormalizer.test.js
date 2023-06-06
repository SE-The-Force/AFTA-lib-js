import AmharicNormalizer from '../../src/analyzer/AmharicNormalizer';  // import class

describe('AmharicNormalizer', () => {
  const tests = [
    {input: 'ሀሐሓኅኻኃ', expected: 'ሃሃሃሃሃሃ'},
    {input: 'ዅሗኁኂ', expected: 'ሁኋሁሂ'},
    {input: 'ኄዄኅኆ', expected: 'ሄሄሃሆ'},
    {input: 'ሠሡሢሣሤሥሦ', expected: 'ሰሱሲሳሴስሶ'},
    {input: 'ዐዑዒዓኣዔዕዖ', expected: 'አኡኢአአኤእኦ'},
    {input: 'ፀፁጺጻጼፅፆ', expected: 'ጸጹፂፃፄጽጾ'}
  ];

  tests.forEach(({ input, expected }) => {
    it(`should normalize "${input}" to "${expected}"`, () => {
      const result = AmharicNormalizer.normalize(input);
      expect(result).toBe(expected);
    });
  });
});
