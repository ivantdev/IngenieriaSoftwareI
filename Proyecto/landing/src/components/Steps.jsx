import PropTypes from 'prop-types';
import "@/styles/Steps.css";

function Steps({ quantity = 1, completed = 0, current = 0 }) {
    let items = [];
    for (let i = 0; i < quantity; i++) {
        items.push(
            <div key={i} className={i < completed ? "steps__item completed" : "steps__item"}>
                {
                    i === current-1 && i+1 !== quantity ?
                    <div className="steps__item-center completed"></div>
                    : <div className="steps__item-center"></div>
                }
            </div>
        )
    }

    return (
        <div className="steps">
            <div className="steps__line">
                <div />
            </div>
            { items }
        </div>
    );
}

Steps.propTypes = {
    quantity: PropTypes.number,
    completed: PropTypes.number,
    current: PropTypes.number,
};

export default Steps;