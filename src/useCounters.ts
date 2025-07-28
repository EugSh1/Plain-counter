import { useCallback, useEffect, useState } from "react";
import type { ICounter } from "./types";

function getInitialCounters(): ICounter[] {
    try {
        const savedCounters = localStorage.getItem("counters");
        return savedCounters ? JSON.parse(savedCounters) : [];
    } catch (error) {
        console.error("Error when retrieving data from localStorage:", error);
        return [];
    }
}

export function useCounters() {
    const [counters, setCounters] = useState<ICounter[]>(getInitialCounters);

    useEffect(() => {
        localStorage.setItem("counters", JSON.stringify(counters));
    }, [counters]);

    function addCounter(name: string) {
        const id = Date.now();
        const newCounter: ICounter = { name, id, value: 0 };
        setCounters((prevCounters) => [...prevCounters, newCounter]);
    }

    function updateCounter(id: number, delta: number) {
        setCounters((prevCounters) =>
            prevCounters.map((counter) =>
                counter.id === id ? { ...counter, value: counter.value + delta } : counter
            )
        );
    }

    const increaseCounter = useCallback((id: number) => {
        updateCounter(id, 1);
    }, []);

    const decreaseCounter = useCallback((id: number) => {
        updateCounter(id, -1);
    }, []);

    const renameCounter = useCallback((id: number, newName: string) => {
        setCounters((prevCounters) =>
            prevCounters.map((counter) =>
                counter.id === id ? { ...counter, name: newName } : counter
            )
        );
    }, []);

    const resetCounter = useCallback((id: number) => {
        setCounters((prevCounters) =>
            prevCounters.map((counter) => (counter.id === id ? { ...counter, value: 0 } : counter))
        );
    }, []);

    const deleteCounter = useCallback((id: number) => {
        setCounters((prevCounters) => prevCounters.filter((counter) => counter.id !== id));
    }, []);

    return [
        counters,
        addCounter,
        increaseCounter,
        decreaseCounter,
        renameCounter,
        resetCounter,
        deleteCounter
    ] as const;
}
