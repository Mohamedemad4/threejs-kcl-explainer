# deployment is weird and manual because docsify + vercel + vite

- uncomment three.js part in `/index.html` and comment out the docisfy
- run `npx vite build` 
- copy `assets/` and `index.html` in dist to public  
- rename `index.html` to `animation.html`
- comment out three.js part nad uncomment out the docsify
- run `vercel` in the root directory to deploy everything
` 