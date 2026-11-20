/**
 * Utility functions for generating multiplication table exercises.
 */

// Shuffles an array in place using Fisher-Yates algorithm
function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

/**
 * Generates multiplication problems based on configuration.
 *
 * @param {Object} config
 * @param {number[]} config.selectedTables - Array of table numbers (e.g. [8] or [2, 3, 5])
 * @param {'ORDERED'|'RANDOM'} config.order - Whether questions are in order (1..10) or shuffled
 * @param {number} config.count - Number of questions (used when order is RANDOM)
 * @param {number} [config.maxMultiplier=10] - Highest multiplier (typically 10)
 * @returns {Array} Array of problem objects
 */
export function generateMultiplicationTables(config) {
    const {
        selectedTables = [8],
        order = 'ORDERED',
        count = 10,
        maxMultiplier = 10
    } = config;

    // Ensure we have at least one valid table
    const tables = selectedTables.length > 0 ? [...selectedTables].sort((a, b) => a - b) : [1];

    const problems = [];

    if (order === 'ORDERED') {
        // Generate full sequential tables (1 to maxMultiplier for each selected table)
        let idCounter = 1;
        tables.forEach(table => {
            for (let m = 1; m <= maxMultiplier; m++) {
                problems.push({
                    id: idCounter++,
                    table,
                    multiplier: m,
                    question: `${table} × ${m} =`,
                    answer: table * m
                });
            }
        });
    } else {
        // RANDOM / SHUFFLED
        // Build the complete pool of possible problems from the selected tables
        const pool = [];
        tables.forEach(table => {
            for (let m = 1; m <= maxMultiplier; m++) {
                pool.push({
                    table,
                    multiplier: m,
                    question: `${table} × ${m} =`,
                    answer: table * m
                });
            }
        });

        // Shuffle the pool
        let shuffled = shuffleArray(pool);

        // If requested count is greater than the pool, we cycle through repeated shuffled sets
        const targetCount = Math.max(1, count || pool.length);
        const selected = [];

        while (selected.length < targetCount) {
            if (shuffled.length === 0) {
                shuffled = shuffleArray(pool);
            }
            selected.push(shuffled.pop());
        }

        selected.forEach((item, index) => {
            problems.push({
                id: index + 1,
                table: item.table,
                multiplier: item.multiplier,
                question: item.question,
                answer: item.answer
            });
        });
    }

    return problems;
}
