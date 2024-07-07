import { useLocalStorage } from "../../../hooks/useLocalStorage/useLocalStorage"

export const useIngredientUpdate = (ingredients, setIngredients) => {
    const { setValue } = useLocalStorage()

    const handleIngUpdate = (prop, cardState, setCardState) => {
        setIngredients((prev) => {
            // Aggiorna la proprietà specificata per l'ingrediente corrispondente in tutti gli ingredienti
            const updatedIngs = prev.all.map((item) =>
                item.id === cardState.id ? { ...item, [prop]: !cardState[prop] } : item
            );
    
            // Aggiorna la proprietà specificata per l'ingrediente corrispondente negli ingredienti visualizzati
            const updatedDisplayedIngs = prev.displayed.map((item) =>
                item.id === cardState.id ? { ...item, [prop]: !cardState[prop] } : item
            );
    
            // Trova l'ingrediente aggiornato
            const updatedIng = updatedIngs.find((ingredient) => ingredient.id === cardState.id);
    
            // Verifica se l'ingrediente è già visualizzato
            const isDisplayed = prev.displayed.some((ingredient) => ingredient.id === cardState.id);
    
            // Inizializza newDisplayed con gli ingredienti visualizzati aggiornati
            let newDisplayed = updatedDisplayedIngs;
            // Filtra gli ingredienti nella blacklist
            const newBlacklisted = updatedIngs.filter((item) => item.isBlackListed);
    
            if (prop === "isSelected") {
                if (isDisplayed) {
                    newDisplayed = updatedDisplayedIngs;
                } else if (prev.displayed.length === 8) {
                    // Se il numero di ingredienti visualizzati è il massimo (8)
                    newDisplayed = [];
                    let firstUnselected = true;
    
                    // Cerca il primo elemento non selezionato per sostituirlo con il nuovo
                    prev.displayed.forEach((ing) => {
                        if (!ing.isSelected && firstUnselected) {
                            newDisplayed.push(updatedIng);
                            firstUnselected = false;
                        } else {
                            newDisplayed.push(ing);
                        }
                    });
                } else {
                    // Aggiunge il nuovo ingrediente agli ingredienti visualizzati
                    newDisplayed = [updatedIng, ...prev.displayed];
                }
            }
    
            // Crea il nuovo stato degli ingredienti
            const newIngredients = {
                ...prev,
                all: updatedIngs,
                displayed: newDisplayed,
                blacklisted: newBlacklisted,
            };
    
            // Aggiorna il valore degli ingredienti
            setValue("ingredients", newIngredients);
    
            return newIngredients;
        });
    
        // Aggiorna lo stato della carta, se definito
        if (setCardState) {
            setCardState((prevState) => ({ ...prevState, [prop]: !prevState[prop] }));
        }
    };
    

    //deleseziona anche gli elementi blacklistati!!
    const handleDeselectAll = (prop, setCardState, setFilterState) => {
        // Funzione per mappare l'array e impostare il valore della proprietà a false
        const mapArray = (array) => array && array.length > 0 && array.map((item) => ({ ...item, [prop]: false }))

        setIngredients((prev) => {
            const selectedIng = prev.displayed.filter((ing) => ing.isSelected)
            const newIngredients = mapArray(prev.all)
            let newDisplayed = mapArray(prev.displayed)
            let newBlacklisted = prev.blacklisted

            // Gestisce la deselezione degli ingredienti selezionati
            if (prop === "isSelected" && selectedIng.length > 0) {
                if (setCardState) {
                    setCardState((prevData) => ({ ...prevData, [prop]: false }))
                }
                // Gestisce la rimozione degli ingredienti dalla blacklist
            } else if (prop === "isBlackListed") {
                newBlacklisted = []
                if (setFilterState) {
                    setFilterState((prevData) => ({ ...prevData, [prop]: false }))
                }
            }

            // Ritorna il nuovo stato degli ingredienti
            return {
                ...prev,
                all: newIngredients,
                displayed: newDisplayed,
                blacklisted: newBlacklisted,
            }
        })
    }

    return { handleIngUpdate, handleDeselectAll }
}
