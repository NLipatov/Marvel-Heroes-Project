import {useParams, Link} from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import { useEffect, useState } from 'react';
import '../pages/singleComicPage.scss';
import {Helmet} from 'react-helmet';


const SingleChar = () => {
    const {id} = useParams();

    const [character, setCharacter] = useState(null);
    const {loading, error, getCharacter, clearError} = useMarvelService();


    useEffect(() => {
        updateChar(id);
    }, [id])


    const updateChar = (id)=>{

        if(id === null){
            return;
        }

        clearError();
        getCharacter(id)
            .then(onCharLoaded)
    }


    const onCharLoaded = (char) => {
        setCharacter(char);
    }

    const renderCharInfo = (character) => {
        if(character != null){
            return(
                <div className="single-comic">
                    <Helmet>
                        <meta
                            name="description"
                            content={`${character.name} character page`}
                            />
                        <title>{`${character.name} page`}</title>
                    </Helmet>
                    <img src={character.thumbnail} alt={character.name} className="single-comic__img" style={{objectFit: `${character.objectFit}`}}/>
                    <div className="single-comic__info">
                        <h2 className="single-comic__name">{character.name}</h2>
                        <p className="single-comic__descr">{character.description}</p>
                    </div>
                    <Link to="/" className="single-comic__back">Back to all</Link>
                </div>
            )
        }
    }

    const charInfo = renderCharInfo(character);

    return(
        <>
            {charInfo}
        </>
    )
}

export default SingleChar;