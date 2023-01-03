import { useState } from "react";

function useLocalStorage(key, defaultValue) {
    const localStorage = window.localStorage;
    const existingValue = localStorage.getItem(key) || JSON.stringify(defaultValue);

    const [itemState, setItemState] = useState(JSON.parse(existingValue));

    function setItem(value) {
        const stringValue = JSON.stringify(value);
        localStorage.setItem(key, stringValue);
        setItemState(value);
    }

    return [itemState, setItem];
}

export default useLocalStorage;