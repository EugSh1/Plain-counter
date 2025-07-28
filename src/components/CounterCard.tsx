import { memo, useEffect, useState } from "react";
import type { ICounter } from "../types";
import { Plus, Minus, RotateCcw, Trash2 } from "lucide-react";

interface CounterCardProps {
    counter: ICounter;
    increaseCounterFn: (id: number) => void;
    decreaseCounterFn: (id: number) => void;
    renameCounterFn: (id: number, newName: string) => void;
    resetCounterFn: (id: number) => void;
    deleteCounterFn: (id: number) => void;
}

function CounterCard({
    counter,
    increaseCounterFn,
    decreaseCounterFn,
    renameCounterFn,
    resetCounterFn,
    deleteCounterFn
}: Readonly<CounterCardProps>) {
    const [counterName, setCounterName] = useState<string>(counter.name);

    useEffect(() => {
        if (counterName === counter.name) return;
        renameCounterFn(counter.id, counterName);
    }, [counterName]);

    return (
        <div className="counter-card">
            <div className="title-and-controls-container">
                <input
                    className="counter-name"
                    type="text"
                    value={counterName}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setCounterName(event.currentTarget.value)
                    }
                    aria-label={`Enter the new counter name for the "${counterName}" counter`}
                />
                <div className="counter-options">
                    <button
                        onClick={() => resetCounterFn(counter.id)}
                        title="Reset counter"
                        aria-label={`Reset the "${counterName}" counter`}
                    >
                        <RotateCcw />
                    </button>
                    <button
                        onClick={() => deleteCounterFn(counter.id)}
                        title="Delete counter"
                        aria-label={`Delete the "${counterName}" counter`}
                    >
                        <Trash2 />
                    </button>
                </div>
            </div>

            <div className="counter-card-controls">
                <button
                    onClick={() => increaseCounterFn(counter.id)}
                    title="Increase counter"
                    aria-label={`Increase the "${counterName}" counter`}
                >
                    <Plus />
                </button>
                <h1>{counter.value}</h1>
                <button
                    onClick={() => decreaseCounterFn(counter.id)}
                    title="Decrease counter"
                    aria-label={`Decrease the "${counterName}" counter`}
                >
                    <Minus />
                </button>
            </div>
        </div>
    );
}

export default memo(CounterCard);
