import React from 'react';
import { Person } from '../App';
import getStorageItem from '../lib/getStorageItem';

export interface StorageControls {
  append: (person: Person) => void;
  currentSort: SortTypes['types'];
  edit: (edited: Person) => void;
  filtered: Person[];
  get: (id: number) => Person | undefined;
  isSearch: boolean;
  remove: (id: number) => void;
  search: (value: string) => void;
  set: (value: any) => void;
  sort: (type: SortTypes['types']) => void;
  storage: Person[];
}

export interface SortTypes {
  types: 'alphabetically'
    | 'alphabeticallyReverse'
    | 'newestFirst'
    | 'oldestFirst';
}

const getPeopleStorage = (key: string): Person[] => {
  const value = getStorageItem(key);
  
  if(!(value instanceof Array)) {
    localStorage.setItem(key, '[]');
    return [];
  }

  return value as Person[];
};

const usePeopleStorage = (key: string): StorageControls => {
  const [storage, setStorage] = React.useState<Person[]>(
    getPeopleStorage('people')
  );
  const [filtered, setFiltered] = React.useState<Person[]>(getPeopleStorage('people'));

  const [currentSort, setCurrentSort] = React.useState<SortTypes['types']>(
    getStorageItem('sort') || 'alphabetically'
  );

  const [isSearch, setIsSearch] = React.useState(false);

  const sorts = React.useMemo(() => ({
    alphabetically: (a: Person, b: Person): number => {
      if(a.name < b.name) return -1;
      if(a.name > b.name) return 1;
      return b.timestamp - a.timestamp;
    },
    alphabeticallyReverse: (a: Person, b: Person): number => {
      if(a.name > b.name) return -1;
      if(a.name < b.name) return 1;
      return b.timestamp - a.timestamp;
    },
    newestFirst: (a: Person, b: Person): number => b.timestamp - a.timestamp,
    oldestFirst: (a: Person, b: Person): number => a.timestamp - b.timestamp,
  }), []);

  const set = React.useCallback((value: any) => {
    const string = JSON.stringify(value);

    localStorage.setItem(key, string);
    setStorage(value);
  }, [key]);

  const remove = (id: number): void => {
    const filteredPeople = storage.filter((person) => person.id !== id);
    set(filteredPeople);
  };

  const append = (person: Person) => {
    const newPeople = [...storage, person].sort(sorts[currentSort]);
    set(newPeople);
  };

  const sort = (type: SortTypes['types']) => {
    setCurrentSort(type);
    const sorted = storage.sort(sorts[type]);
    set(sorted);
  };

  const get = (id: number): Person | undefined => {
    return storage.find((person: Person) => person.id === id);
  };

  const edit = (edited: Person) => {
    const updated = storage
      .map((person: Person) => person.id === edited.id ? edited : person)
      .sort(sorts[currentSort]);

    set(updated);
  };

  const search = React.useCallback((value: string): void => {
    if(value === '') {
      setFiltered(storage.sort(sorts[currentSort]));
      setIsSearch(false);
      return;
    }

    const filteredPeople = storage.filter((person) => new RegExp(value, 'gi').test(person.name));

    setIsSearch(true);
    setFiltered(filteredPeople.sort(sorts[currentSort]));
  }, [storage, currentSort, sorts]);

  return {
    append,
    currentSort,
    edit,
    filtered,
    get,
    isSearch,
    remove,
    search,
    set,
    sort,
    storage,
  };
};

export default usePeopleStorage;
