function TimerButton({ buttonText, className, onClick }) {
    return (
        <button className={className} onClick={onClick}>
            {buttonText}
        </button>
    );
}

export { TimerButton };