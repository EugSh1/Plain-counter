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
        setCounters(
            counters.map((counter) => (counter.id === id ? { ...counter, value: counter.value + delta } : counter))
        );
    }

    function increaseCounter(id: number): void {
        updateCounter(id, 1);
    }

    function decreaseCounter(id: number): void {
        updateCounter(id, -1);
    }

    function renameCounter(id: number, newName: string) {
        setCounters(counters.map((counter) => (counter.id === id ? { ...counter, name: newName } : counter)));
    }

    function resetCounter(id: number): void {
        setCounters(counters.map((counter) => (counter.id === id ? { ...counter, value: 0 } : counter)));
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
