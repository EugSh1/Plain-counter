import { useEffect, useRef, useState } from "react";

interface CreateCounterMenuProps {
    isOpen: boolean;
    createCounterFn: (newCounterName: string) => void;
    closeMenuFn: () => void;
}

export default function CreateCounterMenu({ isOpen, createCounterFn, closeMenuFn }: CreateCounterMenuProps) {
    const [newCounterName, setNewCounterName] = useState<string>("");
    const counterMenuRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (counterMenuRef.current && !counterMenuRef.current.contains(event.target as Node)) {
                setNewCounterName("");
                closeMenuFn();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        inputRef.current?.focus();
    }, [isOpen]);

    function handleCreateCounter() {
        if (newCounterName.trim() === "") return;

        createCounterFn(newCounterName);
        setNewCounterName("");
        closeMenuFn();
    }

    return (
        <div className={`counter-menu ${isOpen ? "counter-menu-open" : "counter-menu-closed"}`} ref={counterMenuRef}>
            <h1>Create counter</h1>
            <input
                type="text"
                placeholder="Name"
                value={newCounterName}
                ref={inputRef}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNewCounterName(event.currentTarget.value)}
                onKeyDown={(event: React.KeyboardEvent) => event.key === "Enter" && handleCreateCounter()}
                aria-label="Enter the name for a new counter"
            />

            <button onClick={handleCreateCounter}>Create</button>
        </div>
    );
}
