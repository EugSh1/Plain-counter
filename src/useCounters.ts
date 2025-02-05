import { useEffect, useState } from "react";
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
        setCounters([...counters, newCounter]);
    }

    function updateCounter(id: number, delta: number) {
        setCounters(
            counters.map((counter) => (counter.id === id ? { ...counter, value: counter.value + delta } : counter))
        );
    }

    function increaseCounter(id: number) {
        updateCounter(id, 1);
    }

    function decreaseCounter(id: number) {
        updateCounter(id, -1);
    }

    function renameCounter(id: number, newName: string) {
        setCounters(counters.map((counter) => (counter.id === id ? { ...counter, name: newName } : counter)));
    }

    function resetCounter(id: number) {
        setCounters(counters.map((counter) => (counter.id === id ? { ...counter, value: 0 } : counter)));
    }

    function deleteCounter(id: number) {
        setCounters(counters.filter((counter) => counter.id !== id));
    }

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
