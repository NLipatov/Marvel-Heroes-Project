import { useEffect, useState } from 'react';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import { Transition } from 'react-transition-group';


const RandomChar =() => {
    const {loading, getCharacter, clearError} = useMarvelService();
    const [showRandom, setShowRandom] = useState(false);

    useEffect(()=>{
        updateChar();
    }, [])

    const [char, setChar] = useState({});


    const updateChar = () => {
        setShowRandom(false);
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharacter(id)
            .then(onCharLoaded, updateChar)
    }

    const onCharLoaded = (char) => {
        if(char.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"){
            char.objectFit = 'contain';
        }
        else{
            char.objectFit = 'cover';
        }

        setChar(char);
        setShowRandom(true);
    }

        return (
            <div className="randomchar">
                <View char={char} show={showRandom}/>
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner"
                        onClick={updateChar}>try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
}

const View = (props) => {
    const {char} = props;

    const duration = 300;

    const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
    }

    const transitionStyles = {
    entering: { opacity: 1 },
    entered:  { opacity: 1 },
    exiting:  { opacity: 0 },
    exited:  { opacity: 0 },
    };

    return (
        <Transition in={props.show} timeout={duration}>
            {state => (
                <div className="randomchar__block" style={
                    {
                        ...defaultStyle,
                        ...transitionStyles[state]
                    }
                }>
                    <img style={{objectFit: char.objectFit}} src={char.thumbnail} alt="Random character" className="randomchar__img"/>
                    <div className="randomchar__info">
                        <p className="randomchar__name">{char.name}</p>
                        <p className="randomchar__descr" style={{height: "fit-content"}}>
                            {char.description}
                        </p>
                        <div className="randomchar__btns">
                            <a href={char.homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={char.wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </Transition>
    )

}

export default RandomChar;