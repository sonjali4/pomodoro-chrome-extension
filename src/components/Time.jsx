import { number_images } from '../assets/images-numbers';

function Time() {
    return (
        <div id='timer-numbers'>
            <img className="timer-number" src={number_images['0']} />
            <img className="timer-number" src={number_images['1']} />
            <img className="timer-number" src={number_images[':']} />
            <img className="timer-number" src={number_images['2']} />
            <img className="timer-number" src={number_images['3']} />
        </div>
    )
};

export { Time };