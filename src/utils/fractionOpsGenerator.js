/**
 * Generates fraction addition/subtraction problems.
 */

function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) {
        [a, b] = [b, a % b];
    }
    return a;
}

function lcm(a, b) {
    return (a * b) / gcd(a, b);
}

function simplify(num, den) {
    if (den < 0) {
        num = -num;
        den = -den;
    }
    const g = gcd(Math.abs(num), den);
    return { num: num / g, den: den / g };
}

export const generateFractionOps = (config) => {
    const { operations, denominatorMode, count, maxDenominator, isInteractive } = config;

    const problems = [];

    for (let i = 0; i < count; i++) {
        // Pick operation
        const operation = operations[Math.floor(Math.random() * operations.length)];

        // Decide denominator mode for this problem
        let mode = denominatorMode;
        if (mode === 'BOTH') {
            mode = Math.random() > 0.5 ? 'SAME' : 'DIFFERENT';
        }

        let denA, denB, numA, numB;

        if (mode === 'SAME') {
            denA = Math.floor(Math.random() * (maxDenominator - 1)) + 2; // 2..maxDenominator
            denB = denA;
        } else {
            // DIFFERENT — ensure denominators are actually different
            denA = Math.floor(Math.random() * (maxDenominator - 1)) + 2;
            do {
                denB = Math.floor(Math.random() * (maxDenominator - 1)) + 2;
            } while (denB === denA);
        }

        // Generate numerators (1..denominator-1 to keep fractions proper-ish)
        numA = Math.floor(Math.random() * (denA - 1)) + 1;
        numB = Math.floor(Math.random() * (denB - 1)) + 1;

        // Compute answer
        let answerNum, answerDen;

        if (operation === '+') {
            const commonDen = lcm(denA, denB);
            answerNum = numA * (commonDen / denA) + numB * (commonDen / denB);
            answerDen = commonDen;
        } else {
            // subtraction — ensure result >= 0
            const commonDen = lcm(denA, denB);
            const expandedA = numA * (commonDen / denA);
            const expandedB = numB * (commonDen / denB);

            if (expandedA < expandedB) {
                // Swap fractions so result is non-negative
                [numA, denA, numB, denB] = [numB, denB, numA, denA];
            }

            answerNum = numA * (lcm(denA, denB) / denA) - numB * (lcm(denA, denB) / denB);
            answerDen = lcm(denA, denB);
        }

        const answer = simplify(answerNum, answerDen);

        problems.push({
            id: i,
            fractionA: { num: numA, den: denA },
            fractionB: { num: numB, den: denB },
            operation,
            answer
        });
    }

    return problems;
};
