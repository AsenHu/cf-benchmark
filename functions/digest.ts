const onRequestGet = async (context: { request: Request }) => {
    // 提取测试数据大小
    const times = new URL(context.request.url).searchParams.get('times') || '1000';
    const timesInt = parseInt(times);
    if (isNaN(timesInt) || timesInt < 1) {
        return new Response('Invalid times', {
            status: 400,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'text/plain'
            }
        });
    }

    // 生成数据
    const data = new ArrayBuffer(134217727); // 128 MiB

    // MD5
    let start = Date.now();
    for (let i = 0; i < timesInt; i++) {
        await crypto.subtle.digest('MD5', data);
    }
    const md5Time = Date.now() - start;

    // SHA-1
    start = Date.now();
    for (let i = 0; i < timesInt; i++) {
        await crypto.subtle.digest('SHA-1', data);
    }
    const sha1Time = Date.now() - start;

    // SHA-2 256 bits
    start = Date.now();
    for (let i = 0; i < timesInt; i++) {
        await crypto.subtle.digest('SHA-256', data);
    }
    const sha256Time = Date.now() - start;

    // SHA-2 384 bits
    start = Date.now();
    for (let i = 0; i < timesInt; i++) {
        await crypto.subtle.digest('SHA-384', data);
    }
    const sha384Time = Date.now() - start;

    // SHA-2 512 bits
    start = Date.now();
    for (let i = 0; i < timesInt; i++) {
        await crypto.subtle.digest('SHA-512', data);
    }
    const sha512Time = Date.now() - start;

    // 生成返回数据
    const resp = JSON.stringify({
        times: timesInt,
        md5: md5Time,
        sha1: sha1Time,
        sha2_256: sha256Time,
        sha2_384: sha384Time,
        sha2_512: sha512Time
    });
    return new Response(resp, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    });
}

const onRequestOptions = async () => {
    return new Response(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
        }
    });
}

export { onRequestGet, onRequestOptions };
