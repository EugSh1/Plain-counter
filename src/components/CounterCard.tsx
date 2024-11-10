import { useEffect, useState } from "react";
import type { Counter } from "../useCounters";
import { Plus, Minus, RotateCcw, Trash2 } from "lucide-react";

interface CounterCardProps {
    counter: Counter;
    increaseCounterFunction: (id: number) => void;
    decreaseCounterFunction: (id: number) => void;
    renameCounterFunction: (id: number, newName: string) => void;
    resetCounterFunction: (id: number) => void;
    deleteCounterFunction: (id: number) => void;
}

export default function CounterCard({
    counter,
    increaseCounterFunction,
    decreaseCounterFunction,
    renameCounterFunction,
    resetCounterFunction,
    deleteCounterFunction
}: CounterCardProps) {
    const [counterName, setCounterName] = useState<string>(counter.name);

    useEffect(() => {
        if (counterName === counter.name) return;
        renameCounterFunction(counter.id, counterName);
    }, [counterName]);

    return (
        <div className="counter-card">
            <div className="title-and-controls-container">
                <input
                    className="counter-name"
                    type="text"
                    value={counterName}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCounterName(event.currentTarget.value)}
                />
                <div className="counter-options">
                    <button onClick={() => resetCounterFunction(counter.id)} title="Reset counter">
                        <RotateCcw />
                    </button>
                    <button onClick={() => deleteCounterFunction(counter.id)} title="Delete counter">
                        <Trash2 />
                    </button>
                </div>
            </div>

            <div className="counter-card-controls">
                <button onClick={() => increaseCounterFunction(counter.id)} title="Increase counter">
                    <Plus />
                </button>
                <h1>{counter.value}</h1>
                <button onClick={() => decreaseCounterFunction(counter.id)} title="Decrease counter">
                    <Minus />
                </button>
            </div>
        </div>
    );
}
