// ImageContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

// Crea il contesto
const ImageContext = createContext([]);

// Provider per il contesto delle immagini
export const ImageProvider = ({ children }) => {
    const [imageArray, setImageArray] = useState([]);
    const [cardImage, setCardImage] = useState()

    useEffect(() => {
        // Carica le immagini dalla cartella specificata
        const images = import.meta.glob('../../assets/images/food/*.svg', { eager: true });
        const loadedImages = Object.values(images).map(module => module.default);
        setImageArray(loadedImages);
    }, []); // Eseguito solo al montaggio del componente

    useEffect(() => {
        if(cardImage) return
        const randomIndex = Math.floor(Math.random() * imageArray.length).toFixed(0)
        const newImage = imageArray[randomIndex]
        setCardImage(newImage)
    }, [imageArray])

    return (
        <ImageContext.Provider value={cardImage}>
            {children}
        </ImageContext.Provider>
    );
};

// Hook personalizzato per utilizzare il contesto delle immagini
export const useImagesContext = () => useContext(ImageContext);
