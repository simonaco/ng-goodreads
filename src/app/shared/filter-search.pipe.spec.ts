import { FilterSearchPipe } from './filter-search.pipe';

describe('FilterSearchPipe', () => {
  let searchPipe: FilterSearchPipe;

  beforeEach(() => {
    searchPipe = new FilterSearchPipe();
  });

  it('create an instance', () => {
    expect(searchPipe).toBeTruthy();
  });

  it('returns empty list if list is not defined', () => {
    expect(searchPipe.transform(undefined, 'test')).toEqual([]);
  });

  it('if no string provided it returns same list', () => {
    expect(
      searchPipe.transform([
        { originalTitle: 'firststring' },
        { originalTitle: 'secondstring' },
        { originalTitle: 'firstone' },
      ], ''))
        .toEqual([
          { originalTitle: 'firststring' },
          { originalTitle: 'secondstring' },
          { originalTitle: 'firstone' },
        ]);
  });

  it('filters an array of objects on originalTitle by provided string', () => {
    expect(
      searchPipe.transform([
        { originalTitle: 'firststring' },
        { originalTitle: 'secondstring' },
        { originalTitle: 'firstone' },
      ], 'first'))
        .toEqual([
          { originalTitle: 'firststring' },
          { originalTitle: 'firstone' },
        ]);
  });

  it('filters an array of objects on originalTitle by provided string case insensitive', () => {
    expect(
      searchPipe.transform([
        { originalTitle: 'firStstring' },
        { originalTitle: 'secondstring' },
        { originalTitle: 'firSTone' },
      ], 'first'))
        .toEqual([
          { originalTitle: 'firStstring' },
          { originalTitle: 'firSTone' },
        ]);
  });
});
