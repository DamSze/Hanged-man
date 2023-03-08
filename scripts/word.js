

const getWord = async() =>{
    const base = 'https://random-word-api.herokuapp.com/word';
    const response = await fetch(base);
    const data = await response.json();
    return data;
};