import { number_images } from '../assets/images-numbers';

function Time({ secondsRemaining }) {
    const minutes = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;

    const minuteString = `${minutes.toString().padStart(2, '0')}`;
    const minuteImage1 = number_images[minuteString.charAt(0)];
    const minuteImage2 = number_images[minuteString.charAt(1)];

    const secondString = `${seconds.toString().padStart(2, '0')}`;
    const secondImage1 = number_images[secondString.charAt(0)];
    const secondImage2 = number_images[secondString.charAt(1)];

    return (
        <div id='timer-numbers'>
            <img className="timer-number" src={minuteImage1} />
            <img className="timer-number" src={minuteImage2} />
            <img className="timer-number" src={number_images[':']} />
            <img className="timer-number" src={secondImage1} />
            <img className="timer-number" src={secondImage2} />
        </div>
    )
};

export { Time };