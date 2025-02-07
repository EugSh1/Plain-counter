import { useState } from "react";
import { useCounters } from "./useCounters";
import type { ICounter } from "./types";
import { Plus } from "lucide-react";
import CounterCard from "./components/CounterCard";
import CreateCounterMenu from "./components/CreateCounterMenu";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function App() {
    const [counters, addCounter, increaseCounter, decreaseCounter, renameCounter, resetCounter, deleteCounter] =
        useCounters();
    const [isCreateCounterMenuOpen, setIsCreateCounterMenuOpen] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const [animationParent] = useAutoAnimate();

    return (
        <>
            <input
                className="search-bar"
                type="text"
                placeholder="Search"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchQuery(event.currentTarget.value.trim().toLowerCase())
                }
                aria-label="Search counters"
            />

            <button
                className="button-create-counter"
                title="Create a new counter"
                onClick={() => setIsCreateCounterMenuOpen(true)}
                aria-label="Create a new counter"
            >
                <Plus />
            </button>

            <CreateCounterMenu
                isOpen={isCreateCounterMenuOpen}
                createCounterFn={addCounter}
                closeMenuFn={() => setIsCreateCounterMenuOpen(false)}
            />

            <div className="counters-container" ref={animationParent}>
                {counters
                    .filter((counter: ICounter) => counter.name.toLowerCase().includes(searchQuery))
                    .map((counter: ICounter) => (
                        <CounterCard
                            key={String(counter.id)}
                            counter={counter}
                            increaseCounterFn={increaseCounter}
                            decreaseCounterFn={decreaseCounter}
                            renameCounterFn={renameCounter}
                            resetCounterFn={resetCounter}
                            deleteCounterFn={deleteCounter}
                        />
                    ))}
            </div>
        </>
    );
}
