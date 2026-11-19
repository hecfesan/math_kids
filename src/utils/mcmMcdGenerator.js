/**
 * Utility functions and generator for m.c.m. (LCM) and m.c.d. (GCD) problems.
 */

// Greatest Common Divisor of two numbers (Euclid's algorithm)
export function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) {
        [a, b] = [b, a % b];
    }
    return a;
}

// GCD of multiple numbers
export function gcdMultiple(numbers) {
    return numbers.reduce((acc, curr) => gcd(acc, curr));
}

// Least Common Multiple of two numbers
export function lcm(a, b) {
    if (a === 0 || b === 0) return 0;
    return Math.abs(a * b) / gcd(a, b);
}

// LCM of multiple numbers
export function lcmMultiple(numbers) {
    return numbers.reduce((acc, curr) => lcm(acc, curr));
}

// Prime factorization of a number
export function getPrimeFactorization(n) {
    const factors = {};
    let d = 2;
    let temp = n;
    while (d * d <= temp) {
        while (temp % d === 0) {
            factors[d] = (factors[d] || 0) + 1;
            temp /= d;
        }
        d++;
    }
    if (temp > 1) {
        factors[temp] = (factors[temp] || 0) + 1;
    }
    return factors;
}

// Format number in prime factors with superscripts (e.g. 12 = 2² · 3)
const SUPERSCRIPTS = {
    '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
    '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹'
};

export function toSuperscript(num) {
    return String(num).split('').map(d => SUPERSCRIPTS[d] || d).join('');
}

export function formatFactorization(n) {
    const factors = getPrimeFactorization(n);
    const keys = Object.keys(factors).map(Number).sort((a, b) => a - b);
    if (keys.length === 0) return `${n}`;
    const parts = keys.map(prime => {
        const exp = factors[prime];
        return exp > 1 ? `${prime}${toSuperscript(exp)}` : `${prime}`;
    });
    return `${n} = ${parts.join(' · ')}`;
}

// Build detailed step-by-step factorization breakdown
export function getStepByStepExplanation(numbers) {
    const factorizations = numbers.map(n => ({
        number: n,
        text: formatFactorization(n),
        factors: getPrimeFactorization(n)
    }));

    // Find all primes involved
    const allPrimes = new Set();
    factorizations.forEach(item => {
        Object.keys(item.factors).forEach(p => allPrimes.add(Number(p)));
    });
    const sortedPrimes = Array.from(allPrimes).sort((a, b) => a - b);

    // GCD terms: primes present in ALL numbers, taken with minimum exponent
    const gcdTerms = [];
    let gcdVal = 1;
    sortedPrimes.forEach(p => {
        const exps = factorizations.map(item => item.factors[p] || 0);
        const minExp = Math.min(...exps);
        if (minExp > 0) {
            gcdVal *= Math.pow(p, minExp);
            gcdTerms.push(minExp > 1 ? `${p}${toSuperscript(minExp)}` : `${p}`);
        }
    });
    if (gcdTerms.length === 0) {
        gcdTerms.push('1 (no tienen factores comunes)');
    }

    // LCM terms: primes present in ANY number, taken with maximum exponent
    const lcmTerms = [];
    let lcmVal = 1;
    sortedPrimes.forEach(p => {
        const exps = factorizations.map(item => item.factors[p] || 0);
        const maxExp = Math.max(...exps);
        if (maxExp > 0) {
            lcmVal *= Math.pow(p, maxExp);
            lcmTerms.push(maxExp > 1 ? `${p}${toSuperscript(maxExp)}` : `${p}`);
        }
    });

    return {
        factorizations: factorizations.map(f => f.text),
        gcdFormula: gcdTerms.join(' · '),
        gcdValue: gcdVal,
        lcmFormula: lcmTerms.join(' · '),
        lcmValue: lcmVal
    };
}

// Generate realistic number pairs or triplets
function pickDistinctNumbers(count, difficulty) {
    let baseGcdList;
    let multiplierPairs;
    let multiplierTriplets;

    if (difficulty === 'EASY') {
        // Numbers roughly between 4 and 30
        baseGcdList = [2, 3, 4, 5, 6, 7];
        multiplierPairs = [
            [2, 3], [2, 5], [3, 4], [3, 5], [4, 5], [2, 7], [3, 7]
        ];
        multiplierTriplets = [
            [2, 3, 4], [2, 3, 5], [2, 4, 5], [3, 4, 5]
        ];
    } else if (difficulty === 'MEDIUM') {
        // Numbers roughly between 12 and 80
        baseGcdList = [3, 4, 5, 6, 8, 9, 10, 12, 14, 15];
        multiplierPairs = [
            [2, 3], [2, 5], [3, 4], [3, 5], [4, 5], [5, 6], [3, 7], [4, 7], [5, 7], [2, 9]
        ];
        multiplierTriplets = [
            [2, 3, 4], [2, 3, 5], [2, 4, 5], [3, 4, 5], [2, 5, 6]
        ];
    } else {
        // HARD: numbers between 24 and 150
        baseGcdList = [6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 24, 30];
        multiplierPairs = [
            [2, 3], [2, 5], [3, 4], [3, 5], [4, 5], [5, 6], [3, 7], [4, 7], [5, 7], [6, 7]
        ];
        multiplierTriplets = [
            [2, 3, 4], [2, 3, 5], [3, 4, 5], [2, 4, 5], [3, 5, 6]
        ];
    }

    // 15% chance to pick coprime numbers (gcd = 1) for 2 numbers
    const isCoprime = Math.random() < 0.15;
    if (isCoprime && count === 2) {
        if (difficulty === 'EASY') {
            const coprimes = [[5, 6], [7, 8], [8, 9], [9, 10], [4, 9], [7, 9], [5, 8], [6, 7]];
            return coprimes[Math.floor(Math.random() * coprimes.length)];
        } else if (difficulty === 'MEDIUM') {
            const coprimes = [[11, 12], [14, 15], [15, 16], [16, 21], [20, 21], [18, 25], [21, 25]];
            return coprimes[Math.floor(Math.random() * coprimes.length)];
        } else {
            const coprimes = [[24, 25], [25, 27], [32, 35], [35, 36], [45, 49], [40, 49]];
            return coprimes[Math.floor(Math.random() * coprimes.length)];
        }
    }

    const g = baseGcdList[Math.floor(Math.random() * baseGcdList.length)];

    if (count === 3) {
        const mults = multiplierTriplets[Math.floor(Math.random() * multiplierTriplets.length)];
        return mults.map(m => m * g).sort((a, b) => a - b);
    } else {
        const mults = multiplierPairs[Math.floor(Math.random() * multiplierPairs.length)];
        return mults.map(m => m * g).sort((a, b) => a - b);
    }
}

/**
 * Main generator function
 * @param {Object} config
 * @returns {Array} problems
 */
export function generateMcmMcd(config) {
    const {
        operationType = 'MIXED', // 'MCM' | 'MCD' | 'MIXED' | 'BOTH'
        numberCount = '2',       // '2' | '3' | 'RANDOM'
        difficulty = 'EASY',     // 'EASY' | 'MEDIUM' | 'HARD'
        count = 12,
        includeWorkspace = true
    } = config;

    const problems = [];
    const usedCombos = new Set();

    let attempts = 0;
    while (problems.length < count && attempts < count * 20) {
        attempts++;

        // Determine number count for this problem
        let nNums = 2;
        if (numberCount === '3') {
            nNums = 3;
        } else if (numberCount === 'RANDOM') {
            nNums = Math.random() > 0.5 ? 3 : 2;
        }

        const numbers = pickDistinctNumbers(nNums, difficulty);
        const comboKey = numbers.join(',');

        if (usedCombos.has(comboKey) && attempts < count * 15) {
            continue;
        }
        usedCombos.add(comboKey);

        // Determine problem type
        let probType = operationType;
        if (probType === 'MIXED') {
            probType = Math.random() > 0.5 ? 'MCM' : 'MCD';
        }

        const mcdValue = gcdMultiple(numbers);
        const lcmValue = lcmMultiple(numbers);
        const explanation = getStepByStepExplanation(numbers);

        problems.push({
            id: problems.length + 1,
            numbers,
            type: probType, // 'MCM' | 'MCD' | 'BOTH'
            mcd: mcdValue,
            mcm: lcmValue,
            explanation,
            includeWorkspace
        });
    }

    return problems;
}
