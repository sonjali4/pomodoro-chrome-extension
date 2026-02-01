function TimerButton({ buttonText, className, buttonId, onClick }) {
    return (
        <button className={className} id={buttonId} onClick={onClick}>
            {buttonText}
        </button>
    );
}

export { TimerButton };