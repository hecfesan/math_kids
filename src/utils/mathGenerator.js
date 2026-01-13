export const generateProblems = (config) => {
    const { operations, count } = config;
    const problems = [];

    for (let i = 0; i < count; i++) {
        const op = operations[Math.floor(Math.random() * operations.length)];
        let problem;
        let attempts = 0;
        do {
            problem = generateSingleProblem(op, config);
            attempts++;
        } while (!problem && attempts < 100);

        if (problem) {
            problems.push({ ...problem, id: i });
        }
    }

    return problems;
};

const generateSingleProblem = (op, config) => {
    const { digits, allowCarry, allowDecimals } = config;

    switch (op) {
        case '+':
            return generateAddition(digits, allowCarry, allowDecimals);
        case '-':
            return generateSubtraction(digits, allowCarry, allowDecimals);
        case '*':
            return generateMultiplication(digits, allowDecimals);
        case '/':
            return generateDivision(digits, allowDecimals);
        default:
            return null;
    }
};

const getRandomNumber = (digits) => {
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getTwoRandomNumbers = (digits) => {
    return [getRandomNumber(digits), getRandomNumber(digits)];
};

const generateAddition = (digits, allowCarry, allowDecimals) => {
    if (allowDecimals) {
        const a = parseFloat((Math.random() * Math.pow(10, digits)).toFixed(2));
        const b = parseFloat((Math.random() * Math.pow(10, digits)).toFixed(2));
        const answer = parseFloat((a + b).toFixed(2));
        return { operandA: a, operandB: b, operator: '+', answer };
    }

    if (allowCarry) {
        const [a, b] = getTwoRandomNumbers(digits);
        return { operandA: a, operandB: b, operator: '+', answer: a + b };
    } else {
        let strA = '';
        let strB = '';

        for (let i = 0; i < digits; i++) {
            const min = i === 0 ? 1 : 0;
            const digitA = Math.floor(Math.random() * (9 - min + 1)) + min;
            const maxB = 9 - digitA;
            const digitB = Math.floor(Math.random() * (maxB + 1));

            strA += digitA;
            strB += digitB;
        }
        const a = parseInt(strA);
        const b = parseInt(strB);
        return { operandA: a, operandB: b, operator: '+', answer: a + b };
    }
};

const generateSubtraction = (digits, allowCarry, allowDecimals) => {
    if (allowDecimals) {
        let a = parseFloat((Math.random() * Math.pow(10, digits)).toFixed(2));
        let b = parseFloat((Math.random() * Math.pow(10, digits)).toFixed(2));
        if (b > a) [a, b] = [b, a];
        const answer = parseFloat((a - b).toFixed(2));
        return { operandA: a, operandB: b, operator: '-', answer };
    }

    if (allowCarry) {
        let [a, b] = getTwoRandomNumbers(digits);
        if (b > a) [a, b] = [b, a];
        return { operandA: a, operandB: b, operator: '-', answer: a - b };
    } else {
        let strA = '';
        let strB = '';

        for (let i = 0; i < digits; i++) {
            const min = i === 0 ? 1 : 0;
            const digitA = Math.floor(Math.random() * (9 - min + 1)) + min;
            const digitB = Math.floor(Math.random() * (digitA + 1));

            strA += digitA;
            strB += digitB;
        }
        const a = parseInt(strA);
        const b = parseInt(strB);
        return { operandA: a, operandB: b, operator: '-', answer: a - b };
    }
};

const generateMultiplication = (digits, allowDecimals) => {
    if (allowDecimals) {
        const a = parseFloat((Math.random() * Math.pow(10, digits)).toFixed(2));
        const b = parseFloat((Math.random() * Math.pow(10, digits)).toFixed(2));
        const answer = parseFloat((a * b).toFixed(2));
        return { operandA: a, operandB: b, operator: '×', answer };
    }

    const [a, b] = getTwoRandomNumbers(digits);
    return { operandA: a, operandB: b, operator: '×', answer: a * b };
};

const generateDivision = (digits, allowDecimals) => {
    let divisorDigits = 1;
    if (digits > 2) divisorDigits = Math.floor(digits / 2);

    const divisorMax = Math.pow(10, divisorDigits) - 1;
    const divisorMin = Math.pow(10, divisorDigits - 1);

    const divisor = Math.floor(Math.random() * (divisorMax - divisorMin + 1)) + divisorMin;

    if (allowDecimals) {
        const a = getRandomNumber(digits);
        const answer = parseFloat((a / divisor).toFixed(2));
        return { operandA: a, operandB: divisor, operator: '÷', answer };
    } else {
        const dividend = getRandomNumber(digits);
        const remainder = dividend % divisor;
        let finalDividend = dividend - remainder;

        if (finalDividend === 0 || finalDividend.toString().length < digits) {
            finalDividend += divisor;
            if (finalDividend.toString().length > digits) {
                finalDividend -= divisor;
            }
        }
        return { operandA: finalDividend, operandB: divisor, operator: '÷', answer: finalDividend / divisor };
    }
};
