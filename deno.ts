Deno.serve(async (req) => {
  const url = new URL(req.url);
  const targetUrl = "https://xkaf.org" + url.pathname + url.search;
  
  const modifiedRequest = new Request(targetUrl, {
    method: req.method,
    headers: req.headers,
    body: req.method !== "GET" && req.method !== "HEAD" ? await req.arrayBuffer() : null,
    redirect: "follow",
  });

  const response = await fetch(modifiedRequest);
  
  const newHeaders = new Headers(response.headers);
  newHeaders.set("Access-Control-Allow-Origin", "*");
  
  return new Response(response.body, {
    status: response.status,
    headers: newHeaders,
  });
});
