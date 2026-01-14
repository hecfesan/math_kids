export const generateFractions = (config) => {
    const { type, count, maxDenominator } = config;
    const fractions = [];

    for (let i = 0; i < count; i++) {
        let numerator, denominator;
        const currentType = type === 'BOTH'
            ? (Math.random() > 0.5 ? 'PROPER' : 'IMPROPER')
            : type;

        if (currentType === 'PROPER') {
            denominator = Math.floor(Math.random() * (maxDenominator - 1)) + 2; // 2 to max
            numerator = Math.floor(Math.random() * (denominator - 1)) + 1; // 1 to denom-1
        } else {
            // IMPROPER
            // Allow full range for denominator
            denominator = Math.floor(Math.random() * (maxDenominator - 1)) + 2;

            const minNumerator = denominator + 1;
            // Limit to max 5 grids to break the "half" pattern and allow more variety
            const maxNumerator = denominator * 5;

            numerator = Math.floor(Math.random() * (maxNumerator - minNumerator + 1)) + minNumerator;
        }

        fractions.push({
            id: i,
            numerator,
            denominator,
            type: currentType
        });
    }

    return fractions;
};
