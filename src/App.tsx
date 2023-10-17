import { useEffect } from "react";
import RootRouter from "./router/RootRouter";
import DevTools from 'mobx-react-devtools';

function App() {
    useEffect(() => {
        const handleTabPress = (event) => {
            if (event.key === "Tab") {
                event.preventDefault(); // Default tab o'zgarishi to'xtatiladi
                const focusableElements = document.querySelectorAll(
                    "input, select, textarea, button"
                );
                const firstElement: any = focusableElements[0];
                const lastElement: any =
                    focusableElements[focusableElements.length - 1];

                if (event.shiftKey) {
                    if (document.activeElement === firstElement) {
                        lastElement.focus(); // O'ng tarafdan tab bosilganda so'ngga focus tushadi
                        event.preventDefault(); // Default tab o'zgarishi to'xtatiladi
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        firstElement.focus(); // Chap tarafdan tab bosilganda boshiga focus tushadi
                        event.preventDefault(); // Default tab o'zgarishi to'xtatiladi
                    }
                }
            }
        };

        document.addEventListener("keydown", handleTabPress);

        return () => {
            document.removeEventListener("keydown", handleTabPress);
        };
    }, []);

    return (
        <div className="App">
            <RootRouter />
        </div>
    );
}

export default App;
