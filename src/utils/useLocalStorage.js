import React from 'react';


export function useLocalStorage(key, intialValue) {
const [value, setValue] = React.useState(
  () => JSON.parse(localStorage.getItem(key)) || intialValue
);

const setLocalStorageValue = (value) => {
  setValue(() => {
    if (value) localStorage.setItem(key, JSON.stringify(value));

    return value;
  });
};

/**
 * Listen to changes on the local storage value from
 * external of our app.
 * For example, updating the local * storage value from the browser
 */
React.useEffect(() => {
  setLocalStorageValue(value);

  const refreshStorageFunc = (event) => {
    if (event.key === key) {
      setValue(event.newValue);
    }
  };
  window.addEventListener("storage", refreshStorageFunc);

  return () => {
    window.removeEventListener("storage", refreshStorageFunc);
  };
}, [key]);

return { value, setValue: setLocalStorageValue };
}

const ProfileContext = React.createContext()
export const ProfileProvider = ProfileContext.Provider;

export const useProfile = () => {
  return React.useContext(ProfileContext)
}