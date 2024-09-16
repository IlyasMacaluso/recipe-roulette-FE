export function filterChipsArray() {
    const cuisineEthnicityChips = [
        {
            propValue: "all",
            label: "All",
        },
        {
            propValue: "italian",
            label: "Italian",
        },

        {
            propValue: "french",
            label: "French",
        },
        {
            propValue: "chinese",
            label: "Chinese",
        },
        {
            propValue: "japanese",
            label: "Japanese",
        },
        {
            propValue: "indian",
            label: "Indian",
        },
        {
            propValue: "greek",
            label: "Greek",
        },
        {
            propValue: "spanish",
            label: "Spanish",
        },
        {
            propValue: "mexican",
            label: "Mexican",
        },
        {
            propValue: "thai",
            label: "Thai",
        },
        {
            propValue: "middle eastern",
            label: "Middle Eastern",
        },
    ]

    const caloricApportChips = [
        {
            propValue: 9999,
            label: "All",
        },
        {
            propValue: 350,
            label: "350 kcal or less",
        },
        {
            propValue: 450,
            label: "450 kcal of less",
        },
        {
            propValue: 550,
            label: "550 kcal or less",
        },
    ]

    const prepTimeChips = [
        {
            propValue: 9999,
            label: "All",
        },
        {
            propValue: 30,
            label: "30 min or less",
        },
        {
            propValue: 45,
            label: "45 min or less",
        },
        {
            propValue: 60,
            label: "60 min or less",
        },
    ]

    const difficultyChips = [
        {
            propValue: "all",
            label: "All",
        },
        {
            propValue: "easy",
            label: "Easy",
        },
        {
            propValue: "medium",
            label: "Medium",
        },
        {
            propValue: "hard",
            label: "Hard",
        },
    ]

    return { cuisineEthnicityChips, difficultyChips, prepTimeChips, caloricApportChips }
}
