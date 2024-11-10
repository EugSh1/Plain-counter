import { useEffect, useState } from "react";

export interface Counter {
    name: string;
    id: number;
    value: number;
}

export function useCounters() {
    function getInitialCounters(): Counter[] {
        try {
            const savedCounters = localStorage.getItem("counters");
            return savedCounters ? JSON.parse(savedCounters) : [];
        } catch (error) {
            console.error("Error when retrieving data from localStorage:", error);
            return [];
        }
    }

    const [counters, setCounters] = useState<Counter[]>(getInitialCounters());

    useEffect(() => {
        localStorage.setItem("counters", JSON.stringify(counters));
    }, [counters]);

    function addCounter(name: string): void {
        const id = Date.now();
        const newCounter: Counter = { name, id, value: 0 };
        setCounters([...counters, newCounter]);
    }

    function updateCounter(id: number, delta: number): void {
        const countersCopy = [...counters];
        const selectedCounter = countersCopy.find((counter) => counter.id === id);
        if (selectedCounter) selectedCounter.value += delta;
        setCounters(countersCopy);
    }

    function increaseCounter(id: number): void {
        updateCounter(id, 1);
    }

    function decreaseCounter(id: number): void {
        updateCounter(id, -1);
    }

    function renameCounter(id: number, newName: string) {
        const countersCopy = [...counters];
        const selectedCounter = countersCopy.find((counter) => counter.id === id);
        if (selectedCounter) selectedCounter.name = newName;
        setCounters(countersCopy);
    }

    function resetCounter(id: number): void {
        const countersCopy = [...counters];
        const selectedCounter = countersCopy.find((counter) => counter.id === id);
        if (selectedCounter) selectedCounter.value = 0;
        setCounters(countersCopy);
    }

    function deleteCounter(id: number): void {
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
