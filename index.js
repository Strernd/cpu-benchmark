const getRandomLocations = (n) => {
    let m_w = 123456789;
    let m_z = 987654321;
    let mask = 0xffffffff;

    // Taken from https://stackoverflow.com/a/19301306
    const random = () => {
        m_z = (36969 * (m_z & 65535) + (m_z >> 16)) & mask;
        m_w = (18000 * (m_w & 65535) + (m_w >> 16)) & mask;
        let result = ((m_z << 16) + m_w) & mask;
        result /= 4294967296;
        return result + 0.5;
    }

    const locs = [];
    for (let i = 0; i < n; i++) {
        locs.push({
            x: random() * 100,
            y: random() * 100
        })
    }
    return locs;
}

const distBenchmark = (timeLimit) => {
    const locs = getRandomLocations(10);
    const start = new Date().getTime();
    let ops = 0;
    let curTime = new Date().getTime();
    while (curTime < start + timeLimit) {
        const dists = [];
        locs.forEach(a => locs.forEach(b => {
            const d = Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
            dists.push(d);
        }))
        ops++;
        curTime = new Date().getTime();
    }
    return ops;
}

const fibonacci = i => {
    if (i <= 1) return i;
    return fibonacci(i - 1) + fibonacci(i - 2);
}

const fibBenchmark = i => {
    const start = new Date().getTime();
    fibonacci(i);
    const end = new Date().getTime();
    return end - start;
}

module.exports = { fib: fibBenchmark, dist: distBenchmark }