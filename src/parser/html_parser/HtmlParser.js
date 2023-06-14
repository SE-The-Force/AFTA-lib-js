import { link } from 'fs';

const { parse } = require('node-html-parser');
const axios = require('axios');
const { URL } = require('url');

export default class HtmlParser {
  constructor(domain, depth=1) {
    this.domain = domain;
    this.depth = depth;
    this.visited = new Set();
    this.robotsCache = new Map();
  }

    /**
   * Check if the header is stored.
   * @param {string} header - The header to check.
   * @returns {boolean} `true` if the header is stored, `false` otherwise.
   */
  isStored(header) {
    switch (header) {
      case "Content":
        return true;
      case "url":
        return true;
      default:
        return false;
    }
  }

  /**
   * Check if the header is indexable.
   * @param {string} header - The header to check.
   * @returns {boolean} `true` if the header is indexable, `false` otherwise.
   */
  isIndexable(header) {
    switch (header) {
      case "Content":
        return true;
      case "url":
        return false;
      default:
        return false;
    }
  }

   /**
   * Check if the header is analyzed.
   * @param {string} header - The header to check.
   * @returns {boolean} `true` if the header is analyzed, `false` otherwise.
   */
  isAnalyzed(header) {
    switch (header) {
      case "Content":
        return true;
      case "url":
        return false;
      default:
        return false;
    }
  }

  async isCrawlable(url) {
    try {
        const domain = new URL(url).hostname;
        if (this.domain.includes(domain) && !this.visited.has(url)) {
          let robotsContent;
          const robotsUrl = `${this.domain}/robots.txt`;
          if (this.robotsCache.has(robotsUrl)) {
            robotsContent = this.robotsCache.get(robotsUrl);
          } else {
            const robotsResponse = await axios.get(robotsUrl, {
              headers: {
                'User-Agent': 'Googlebot',
              },
            });
            robotsContent = robotsResponse.data;
            this.robotsCache.set(robotsUrl, robotsContent);
          }
          const disallow = `Disallow: ${new URL(url).pathname}`;
          const isAllowed = !robotsContent.includes();
          if(disallow == 'Disallow: /') return true;
          return isAllowed;
        }
      
    } catch (error) {
        console.log("error: ", error.message);
      return false;
    }
    return false;
  }

    async crawl() {
      const stack = [{ url: this.domain, depth: 0 }];
      const results = [];
      while (stack.length > 0) {
        const { url, depth } = stack.pop();
        console.log("visiting: ", url, " depth: ", depth);
        if (!this.visited.has(url)) {
          if (await this.isCrawlable(url)) {
            try {
              const response = await axios.get(url, {
                headers: {
                  'User-Agent': 'Googlebot',
                  'Content-Type':'html/text'
                },
              });
                const parsedHtml = parse(response.data);
                const domain = new URL(url).hostname;
                const links = parsedHtml.querySelectorAll('a');
                const Content = parsedHtml.querySelector('html').text;
                results.push([Content, url]);
                for (let i = 0; i < links.length; i++) {
                    let linkUrl = links[i].getAttribute('href');
                    if (linkUrl) {
                    if (!linkUrl.startsWith('http') && !linkUrl.startsWith('www')) {
                        linkUrl = new URL(linkUrl, url).href;
                    }
                    if (new URL(linkUrl).hostname === domain && depth + 1 < this.depth) {
                        stack.push({ url: linkUrl, depth: depth + 1 });
                    }
                    }
                }
              
            } catch (error) {
              console.error(`Error crawling ${url}: ${error.message}`);
            }
            this.visited.add(url);
          }
        }
      }
      return results;
    }


}



