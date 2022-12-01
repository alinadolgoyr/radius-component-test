import './autolayout.scss'
import illustration from '../assets/illustration.png'

const AutoLayout = () => {
    return (
        <div className='container'> 
            <div className="image">
                <img src={illustration} alt="illustration" />
            </div>
            <div className="text-container">
                <div className="title white">How will it help?</div>
                <div className="text1 white">Shrink your timelines</div>
                <div className="text2 white"> Reduce the risk and effort required to get started on a design system. You can build a new digital product and a design system, with no delays in bringing it to market. Customer focus is the only focus. </div>
            </div>    
        </div>
    )
}

export default AutoLayout;