const getStorageItem = (key: string, options?: { default: any }) => {
  const value = localStorage.getItem(key);

  if (value === null) return options?.default;

  try {
    const parsed = JSON.parse(value);

    return parsed;
  } catch {
    return options?.default;
  }
};

export default getStorageItem;
