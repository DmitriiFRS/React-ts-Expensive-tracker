import { useState, useEffect } from 'react';

export function useLocalStorage<T>(initialValue: T, key: string) {

   function getValue() {
      const storage = localStorage.getItem(key)
      if (storage) {
         return JSON.parse(storage)
      }
      else return initialValue;
   }
   const [value, setValue] = useState(getValue);
   useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value))
   }, [value, key])
   return [value, setValue];
}