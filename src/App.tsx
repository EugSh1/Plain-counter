import { useState } from "react";
import { useCounters } from "./useCounters";
import type { Counter } from "./useCounters";
import { Plus } from "lucide-react";
import CounterCard from "./components/CounterCard";
import CreateCounterMenu from "./components/CreateCounterMenu";

export default function App() {
    const [counters, addCounter, increaseCounter, decreaseCounter, renameCounter, resetCounter, deleteCounter] =
        useCounters();
    const [isCreateCounterMenuOpen, setIsCreateCounterMenuOpen] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");

    return (
        <>
            <input
                className="search-bar"
                type="text"
                placeholder="Search"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchQuery(event.currentTarget.value.trim().toLowerCase())
                }
            />

            <button
                className="button-create-counter"
                title="Create new counter"
                onClick={() => setIsCreateCounterMenuOpen(true)}
            >
                <Plus />
            </button>

            <CreateCounterMenu
                isOpen={isCreateCounterMenuOpen}
                createCounterFunction={addCounter}
                closeMenuFunction={() => setIsCreateCounterMenuOpen(false)}
            />

            <div className="counters-container">
                {counters
                    .filter((counter: Counter) => counter.name.toLowerCase().includes(searchQuery))
                    .map((counter: Counter) => (
                        <CounterCard
                            key={String(counter.id)}
                            counter={counter}
                            increaseCounterFunction={increaseCounter}
                            decreaseCounterFunction={decreaseCounter}
                            renameCounterFunction={renameCounter}
                            resetCounterFunction={resetCounter}
                            deleteCounterFunction={deleteCounter}
                        />
                    ))}
            </div>
        </>
    );
}
