import { useLocalStorage } from "../../../hooks/useLocalStorage/useLocalStorage"

export const useDisplayedIngredients = (ingredients, setIngredients) => {
    const { setValue } = useLocalStorage()

    const generateIngredients = () => {
        setIngredients((prevIngredients) => {
            // Filtra gli ingredienti per ottenere gli id degli ingredienti non selezionati e non in blacklist
            const ingredientIds = prevIngredients.filtered
                .filter((ing) => !ing.isSelected && !ing.isBlackListed)
                .map((item) => item.id);
    
            // Genera 5 ID casuali senza duplicati
            const randomIds = [];
            while (randomIds.length < 5) {
                const randomId = ingredientIds[Math.floor(Math.random() * ingredientIds.length)];
                if (ingredientIds.includes(randomId) && !randomIds.includes(randomId)) {
                    randomIds.push(randomId);
                }
            }
    
            // Filtra gli ingredienti per ottenere gli ingredienti corrispondenti agli ID casuali generati
            const randomIngs = prevIngredients.filtered.filter((item) => randomIds.includes(item.id));
    
            // Crea il nuovo stato degli ingredienti
            const newIngredients = { ...prevIngredients, displayed: randomIngs };
    
            // Aggiorna il valore degli ingredienti
            setValue("ingredients", newIngredients);
    
            return newIngredients;
        });
    };
    
const shuffleIng = () => {
    setIngredients((prevIngredients) => {
        const newData = [];
        let availableIngs = prevIngredients.filtered.filter((item) => !item.isSelected && !item.isBlackListed);

        prevIngredients.displayed.forEach((ingredient) => {
            if (!ingredient.isSelected) {
                const ingredientIds = availableIngs.map((item) => item.id);
                let newRandomIng = null; // L'ingrediente che sostituirà quello non selezionato

                while (!newRandomIng) {
                    const randomId = ingredientIds[Math.floor(Math.random() * ingredientIds.length)];
                    const isUnique = prevIngredients.displayed.find((ing) => ing.id === randomId);

                    if (ingredient.id !== randomId && !isUnique) {
                        newRandomIng = prevIngredients.all.find((ing) => ing.id === randomId);
                        newData.push(newRandomIng);
                        availableIngs = availableIngs.filter((ing) => ing.id !== newRandomIng.id);
                    }
                }
            } else {
                newData.push(ingredient);
            }
        });

        return { ...prevIngredients, displayed: newData };
    });
};


const handleIngIncrement = () => {
    setIngredients((prevIngredients) => {
        // Copia dell'array displayed e filtered per lavorarci in modo sicuro
        const currentDisplayed = [...prevIngredients.displayed];
        const currentFiltered = [...prevIngredients.filtered];

        // Filtraggio degli ingredienti disponibili che non sono selezionati o in blacklist
        let availableIngs = currentFiltered.filter((ingredient) => !ingredient.isSelected && !ingredient.isBlackListed);

        // Verifica che ci siano meno di 8 ingredienti a schermo
        if (currentDisplayed.length < 8) {
            // Rimuovi gli ingredienti già presenti a schermo dalla lista degli ingredienti disponibili
            const displayedIds = currentDisplayed.map((ing) => ing.id);

            // Filtra gli ingredienti disponibili escludendo quelli già visualizzati
            availableIngs = availableIngs.filter((ing) => !displayedIds.includes(ing.id));

            // Trova il primo ingrediente disponibile rimasto
            const newIng = availableIngs.find((ingredient) => ingredient);

            // Ritorna il nuovo stato aggiornato in modo immutabile
            return {
                ...prevIngredients,
                displayed: [...currentDisplayed, newIng],
            };
        }

        // Se non si verificano modifiche, ritorna lo stato corrente
        return prevIngredients;
    });
};


    const handleIngDecrement = (id, e) => {
        e.stopPropagation()
        if (ingredients.displayed.length > 3) {
            setIngredients((prev) => ({ ...prev, displayed: prev.displayed.filter((ing) => ing.id !== id) }))
        }
    }

    return { generateIngredients, handleIngDecrement, handleIngIncrement, shuffleIng }
}
