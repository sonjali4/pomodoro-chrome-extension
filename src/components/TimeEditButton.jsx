import { useState } from "react";

import { TimerButton } from './TimerButton';
import { TimeEditForm } from "./TimeEditForm";

function TimeEditButton({ modes }) {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(prev => !prev);
    };

    return (
        <div id="edit-btn-container">
            <TimerButton buttonId="edit-btn" buttonText="edit" onClick={toggleVisibility} />

            {isVisible && (
                <div id="modal-overlay" onClick={toggleVisibility}>
                    <div id="modal-content" onClick={(e) => e.stopPropagation()}>
                        <TimeEditForm modes={modes} onClose={toggleVisibility} />
                    </div>
                </div>
                )}
        </div>
    );
}

export { TimeEditButton }