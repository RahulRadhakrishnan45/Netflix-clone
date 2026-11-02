import { useContext, createContext, useEffect, useState } from "react";

const WatchlistContext = createContext();

export const WatchlistProvider = ({children}) => {

    const [watchlist, setWatchlist] = useState(() => {
        const savedWatchlist = localStorage.getItem('watchlist')

        return savedWatchlist?
        JSON.parse(savedWatchlist) : []
    })

    const addToWatchlist = (movie) => {
        setWatchlist((prev) => {
            const alreadyExists = prev.some((item) => item.id === movie.id)
            if(alreadyExists){
                return prev;
            }else{
                return [...prev, movie]
            }
        })
    }

    const removeFromWatchlist = (movieId) => {
        setWatchlist((prev) => 
            prev.filter((movie) => movie.id !== movieId)
        )
    }

    const isInWatchlist = (movieId) => {
        return watchlist.some((movie) => movie.id === movieId)
    }

    useEffect(() => {
        localStorage.setItem('watchlist', JSON.stringify(watchlist))
    },[watchlist])

    return(
        <WatchlistContext.Provider value={{watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist}}>
            {children}
        </WatchlistContext.Provider>
    )
} 

export const useWatchlist = () => {
    return useContext(WatchlistContext);
}

export default WatchlistContext;