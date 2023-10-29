export const getMovies = async (apiKey) => {
    const response = await fetch(`https://www.omdbapi.com/?s=happy&apikey=${apiKey}&page=1`);
    if (response.ok){
        const {Search} = await response.json();
        return Search
    }

    const errMessage = await response.text()
    throw new Error(errMessage)
}