<div align="center">
  <img src="https://pub-8612282489694303a75db33076c8a071.r2.dev/dark-Ddj2CDlw.png" alt="xKAF Logo" width="100" />
  <h1>xKAF Proxy & Mirror</h1>
  <p><strong>Deploy your own permanent, unblockable mirror of xKAF in seconds — for FREE!</strong></p>
  <p>
    Bypass ISP blocks and help the community by hosting your own private proxy. We support 1-click deployments to the world's best serverless platforms.
  </p>
</div>

---

## 🚀 1-Click Deployments

Choose your favorite free hosting provider below to deploy instantly.

| Platform | 1-Click Deploy | Setup Time | Performance |
| :--- | :--- | :--- | :--- |
| **Cloudflare** | [![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/kafelanetwork/xKAF-Proxy) | 1 min | ⚡️⚡️⚡️ (Global Edge) |
| **Vercel** | [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fkafelanetwork%2FxKAF-Proxy) | 1 min | ⚡️⚡️⚡️ (Fast) |
| **Deno Deploy** | [![Deploy to Deno](https://shield.io/badge/Deploy_to-Deno-black?logo=deno)](https://dash.deno.com/new?repo=https://github.com/kafelanetwork/xKAF-Proxy) | 1 min | ⚡️⚡️⚡️ (V8 Edge) |
| **Netlify** | [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/kafelanetwork/xKAF-Proxy) | 1 min | ⚡️⚡️ (Reliable) |
| **Render** | [![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/kafelanetwork/xKAF-Proxy) | 2 mins | ⚡️⚡️ (Static Edge) |

> **Note:** If you want to deploy manually, the code for each platform is provided below.

---

## 🛠 Manual Configuration & Code

If you prefer to configure your proxy manually or want to understand how it works under the hood, here are the configurations for each platform.

### 1. Cloudflare Workers / Pages
Cloudflare provides the best edge performance. We use a lightweight JS worker (`_worker.js`) to intercept and forward requests.

**File: `_worker.js`**
```javascript
export default {
  async fetch(request) {
    const url = new URL(request.url);
    const targetUrl = 'https://xkaf.org' + url.pathname + url.search;

    const modifiedRequest = new Request(targetUrl, {
      method: request.method,
      headers: request.headers,
      body: request.method !== 'GET' && request.method !== 'HEAD' ? await request.arrayBuffer() : null,
      redirect: 'follow',
    });

    const response = await fetch(modifiedRequest);

    const newHeaders = new Headers(response.headers);
    newHeaders.set('Access-Control-Allow-Origin', '*');
    newHeaders.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    newHeaders.set('Access-Control-Allow-Headers', '*');

    return new Response(response.body, { status: response.status, headers: newHeaders });
  }
}
```

### 2. Vercel
Vercel allows zero-code proxies using their built-in rewrite engine. 

**File: `vercel.json`**
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "https://xkaf.org/$1"
    }
  ]
}
```

### 3. Deno Deploy
Deno Deploy runs TypeScript natively at the edge. It's incredibly fast and developer-friendly.

**File: `deno.ts`**
```typescript
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
```

### 4. Netlify
Similar to Vercel, Netlify handles proxies at the edge via a simple configuration file.

**File: `netlify.toml`**
```toml
[[redirects]]
  from = "/*"
  to = "https://xkaf.org/:splat"
  status = 200
  force = true
```

### 5. Render
Render's Static Site feature supports direct rewrites to external URLs without waking up a server.

**File: `render.yaml`**
```yaml
services:
  - type: web
    name: xkaf-proxy
    env: static
    staticPublishPath: ./
    routes:
      - type: rewrite
        source: /*
        destination: https://xkaf.org/*
```

---

## 🤝 Contribute to the Community!

Once you have successfully deployed your proxy, help others bypass ISP blocks by adding your URL to the public xKAF directory!

👉 **[Submit your Proxy URL via Telegram](https://t.me/hexdebora?text=Hi%20Please%20Add%20My%20Proxy%20Server)**

<br/>
<div align="center">
  <sub>Built with ❤️ by the xKAF Community</sub>
</div>
