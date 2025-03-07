const onRequestGet = async (context: { request: Request }) => {
    // 提取测试数据大小
    const size = new URL(context.request.url).searchParams.get('size') || '1024'; // 单位是字节

    // 生成数据
    const data = new ArrayBuffer(parseInt(size));

    // MD5
    let start = Date.now();
    await crypto.subtle.digest('MD5', data);
    const md5Time = Date.now() - start;

    // SHA-1
    start = Date.now();
    await crypto.subtle.digest('SHA-1', data);
    const sha1Time = Date.now() - start;

    // SHA-2 256 bits
    start = Date.now();
    await crypto.subtle.digest('SHA-256', data);
    const sha256Time = Date.now() - start;

    // SHA-2 384 bits
    start = Date.now();
    await crypto.subtle.digest('SHA-384', data);
    const sha384Time = Date.now() - start;

    // SHA-2 512 bits
    start = Date.now();
    await crypto.subtle.digest('SHA-512', data);
    const sha512Time = Date.now() - start;

    // 生成返回数据
    const resp = JSON.stringify({
        size: size + ' bytes',
        md5: md5Time + ' ms',
        sha1: sha1Time + ' ms',
        sha2_256: sha256Time + ' ms',
        sha2_384: sha384Time + ' ms',
        sha2_512: sha512Time + ' ms'
    })
    return new Response(resp, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    });
}

const onRequestOptions = async () => {
    return new Response(null, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
        }
    });
}

export { onRequestGet, onRequestOptions };
