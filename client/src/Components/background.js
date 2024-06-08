import './background.css'
import background from './Media/background.jpeg'

const Background = () => {
    return (
        <div>
            <img src={background} className='background' alt="" />
        </div>
    )
}

export default Background;