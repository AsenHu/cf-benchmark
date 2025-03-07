const onRequestGet = async (context: { request: Request }) => {
    // 提取测试信息
    const algorithm = new URL(context.request.url).searchParams.get('algorithm');
    const data = new URL(context.request.url).searchParams.get('data');
    const times = new URL(context.request.url).searchParams.get('times') || '1';

    const start = performance.now();
    for (let i = 0; i < parseInt(times); i++) {
        const hash = await crypto.subtle.digest(algorithm, new TextEncoder().encode(data));
        const hashstr = Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
        const spent = performance.now() - start;
        console.log(`[${i + 1}/${times}] ${algorithm}(${data}) = ${hashstr} (${spent}ms)`);
    }

    return new Response(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*'
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