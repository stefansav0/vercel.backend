const express = require('express');
const router = express.Router();
const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');

const Job = require('../models/job');      // Adjust path as per your structure
const Blog = require('../models/blog');    // Adjust path as per your structure

const hostname = 'https://finderight.com';

router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().select('_id');
    const blogs = await Blog.find().select('_id');

    const links = [
      { url: '/', changefreq: 'daily', priority: 1.0 },
      { url: '/about', changefreq: 'monthly', priority: 0.7 },
      { url: '/contact', changefreq: 'monthly', priority: 0.7 },
      { url: '/blog', changefreq: 'weekly', priority: 0.8 },
      { url: '/jobs', changefreq: 'daily', priority: 0.9 },
      { url: '/login', changefreq: 'monthly', priority: 0.5 },
      { url: '/register', changefreq: 'monthly', priority: 0.5 },
      { url: '/admit-card', changefreq: 'daily', priority: 0.9 },
      { url: '/results', changefreq: 'daily', priority: 0.9 },
      { url: '/notifications', changefreq: 'daily', priority: 0.9 },
      { url: '/search', changefreq: 'daily', priority: 0.8 },
        { url: '/answer-key', changefreq: 'daily', priority: 0.9 },
        { url: '/admission', changefreq: 'daily', priority: 0.9 },
        { url: '/study-news', changefreq: 'weekly', priority: 0.7 },
        
      // dynamic blog posts
      ...blogs.map(blog => ({
        url: `/blog/${blog._id}`,
        changefreq: 'weekly',
        priority: 0.7
      })),
      // dynamic job posts
      ...jobs.map(job => ({
        url: `/jobs/${job._id}`,
        changefreq: 'daily',
        priority: 0.9
      }))
    ];

    const stream = new SitemapStream({ hostname });
    const xml = await streamToPromise(Readable.from(links).pipe(stream));

    res.header('Content-Type', 'application/xml');
    res.send(xml.toString());
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
});

module.exports = router;
