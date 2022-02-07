import { useEffect, useState } from 'react';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';


const RandomChar =() => {
    useEffect(()=>{
        updateChar();
    }, [])

    const [char, setChar] = useState({});
    const [loading, setLoading] = useState(true);

    const marvelService = new MarvelService();



    const updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        setLoading(loading => true)
        marvelService
            .getCharacter(id)
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
        setLoading(false);
    }

        return (
            <div className="randomchar">
                {loading ? <Spinner/> : <View char={char}/>}
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
    return (
        <div className="randomchar__block">
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
    )

}

export default RandomChar;