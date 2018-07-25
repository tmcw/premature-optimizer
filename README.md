# premature-optimizer

I've long over-optimized [macwright.org](https://macwright.org). It already has
[pretty feather-light](https://macwright.org/2016/05/03/the-featherweight-website.html)
webpages. One optimization choice, though, has been annoying me just a little: the
approach to CSS inlining. It inlines the site CSS on every page.

Now, the CSS is only about 3kb, but knowing that a significant number of those bytes
are being wasted on every pageload annoys me. It could be around 1 or 2 kilobytes,
or about 40% lighter.

This tool pushes performance just a bit more: it runs [purifycss](https://github.com/purifycss/purifycss),
combines `<style>` tags, and then runs [html-minifier](https://www.npmjs.com/package/html-minifier)
on the re-generated HTML. It's a separate tool because purifycss doesn't support
inline `<style>` elements and because I want to keep macwright.org's package.json
tidy.

It's a work-in-progress and likely will never be something I want to promote
and maintain vigorously: if your website uses lots of JavaScript, for example, this
tool is not what you want.
