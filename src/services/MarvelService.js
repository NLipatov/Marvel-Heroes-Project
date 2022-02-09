import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();

    //https://developer.marvel.com/docs#!/public/getCharacterIndividual_get_1
    const _apiBase =  'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=57154446fbcdf91835c754d178644ecb';
    const _baseOffset = 210;

    const getEightComics = async(offset=0) => {
        const res = await request(`${_apiBase}comics?format=comic&formatType=comic&noVariants=true&hasDigitalIssue=true&limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const getAllCharacters = async(offset = _baseOffset) => {
       const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
       return res.data.results.map(_transformCharacter);
    }
   
    const getCharacter = async(id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const _transformCharacter = (char) => {
        let OF = '';
        if(`${char.thumbnail.path}.${char.thumbnail.extension}`  === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"){
            OF = 'contain';
        }
        else{
            OF = 'cover';
        }


        return {
            name: char.name,
            description: (char.description.length !== 0) ? char.description : "There is no description for this character",
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            id: char.id,
            objectFit: OF,
            comics: char.comics.items
        }
    }

    const _transformComics = (comics) => {
        return{
            thumbnail: `${comics.thumbnail.path}.${comics.thumbnail.extension}`,
            price: comics.prices[0].price,
            title: comics.title
        }
    }

    return {loading, error, getAllCharacters, getCharacter, clearError, getEightComics}

}

export default useMarvelService;