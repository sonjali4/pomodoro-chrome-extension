import { useState } from "react";

import { TimerButton } from './TimerButton';
import { TimeEditForm } from "./TimeEditForm";

function TimeEditButton() {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(prev => !prev);
    };

    return (
        <div>
            <TimerButton buttonText="edit" onClick={toggleVisibility} />

            {isVisible && <TimeEditForm onClose={toggleVisibility} />}
        </div>
    );
}

export { TimeEditButton }