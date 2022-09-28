<!-- {
    "title": "Hello World: The suffering of modern web development.",
    "creationDate": "1664329953541",
    "description": "My experience building this site and how modern web development is."
} -->

Finally, after coding for hours non-stop, and reading a lot of blogs while wishing to have my own, I can start mine. It's been a while since I have a website... probably around 10 years.

I enjoy lurking, it's how I am, creating text-based content was not something that I really had in mind in the last years.

Blogs are probably an overused type for a personal site, but who cares? Writing about random stuff sounds really fun!

[![Cup filled with coffee near book](/image/0)](https://www.pexels.com/photo/black-and-white-blog-business-coffee-261579/)

# Programming

I started coding this site around two weeks days ago, giving it about 2 to 4 hours of coding every day, looking back its really over-engineered and probably not a great idea, but I really wanted to do an SPA [(Single-page-App)](https://en.wikipedia.org/wiki/Single-page_application) there are a lot of tools to easily get a blog running, but I just didn't wanted to take the easy path.

My own hand-crafted site, my original idea was to even create a JavaScript framework, but I ditched it inmediately after
realizing it wasn't that easy: state management, know when to re-render components. I wanted all. Of course, I gave up.

[React](https://reactjs.org/) is a really popular library, and it was my first components experience, it changed my way of thinking about UI completely but It has a big problem: over-head and bundle size.

For a while I was absent from web development and refused to use Node or Npm while just using Vanilla JavaScript for interaction code, having bad experiences with big libraries like [JQuery](https://jquery.com/) and poor architecture.

Right now, the world is full of alternatives, [pnpm](https://pnpm.io/) as a package manager that doesn't create giant
node_modules folders, light frameworks that prove to be mature keep the bundle small and lean, [Vite](https://vitejs.dev/) instead of the tedious and slow webpack.

[![Gray Scale Photo of Gears](/image/2)](https://www.pexels.com/photo/gray-scale-photo-of-gears-159298/)

[TypeScript](https://www.typescriptlang.org/) also changed my mind, as it turned the unpredictible mess that JavaScript is into something that I can rely on.

The back-end is just a simple [Express](https://expressjs.com/) server wrote with TypeScript, using express.static for the SPA, on the initial load markdown files will be loaded to memory as Arrays of resources, to respond faster to requests. For routes that load files from the disk on demand, I took special care to protect it against [directory transversal attack](https://en.wikipedia.org/wiki/Directory_traversal_attack).

Today I finished writing the cache module: it would save the response on [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), while appending an expiry date, when a fetch from the backend is requested, the cache module would respond while first checking the expiry date, if its expired, it will make the fetch request but with an special flag to just get the sha-256 hash of the response, if the hash is the same, the cached resource will be returned, if it differs it will be deleted.

The site works, it loads articles from the server that are Markdown text and renders them on the screen using my custom Svelte components with all the carefully added styling. It was great! Or so I thought..

# Reflection and conclusion

As I stated on the first section of this article, I enjoy lurking, and that's what I did a lot of times while developing this project, taking those breaks and reading made a lot of things start clicking in my head.

Single page application for a blog was too much! It was re-inventing the wheel, creating requests, simulating routing, simulating load status, error status, not found page, a cache?!.

Wake up myself! Any web browser had this already built-in!

[![Elephant Calf](/image/3)](https://www.pexels.com/photo/elephant-calf-133394/)

Programming is really fun for me, and I got the original focus for the project lost over how entertained I was re-inventing everything I needed.

I was reading the phrases server-side rendering, "MPA" (multi-page-application, or server-side routing) a lot of times, I was looking new frameworks emerge based on pure server-side routing.

It was like a joke to me, I was finally trying to be more modern and accept complex code run on the client as a normal thing, while all the world was turning back to the PHP era, but this time using JavaScript.

I decided to turn this site into a traditional website in the near future, breaking with all the unnecessary client-side code, Who knows? I might even use PHP.

Regardless of what I do, I learned a lot from this experience and in the end that is what I wanted.

# Recommended reading

Thank you for reading my article! Feel free to share it, print it, download it, archive it.

-   [The new wave of Javascript web frameworks](https://frontendmastery.com/posts/the-new-wave-of-javascript-web-frameworks/)
-   [SPAs were a mistake](https://gomakethings.com/spas-were-a-mistake/)
