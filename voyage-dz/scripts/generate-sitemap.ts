import { db } from "@/lib/db";
import fs from "fs";
import path from "path";

const BASE_URL = "https://www.voyage-dz.com";

async function generateSitemap() {
  const packages = await db.package.findMany({ select: { id: true, createdAt: true } });
  const agencies = await db.agency.findMany({ select: { id: true, createdAt: true } });

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${BASE_URL}/packages</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${BASE_URL}/agencies</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  ${packages
    .map(
      (pkg) => `
  <url>
    <loc>${BASE_URL}/packages/${pkg.id}</loc>
    <lastmod>${pkg.createdAt.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
  `
    )
    .join("")}
  ${agencies
    .map(
      (agency) => `
  <url>
    <loc>${BASE_URL}/agency/${agency.id}</loc>
    <lastmod>${agency.createdAt.toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  `
    )
    .join("")}
</urlset>`;

  fs.writeFileSync(path.join(__dirname, "../public/sitemap.xml"), sitemapContent);
  console.log("Sitemap generated successfully!");
}

generateSitemap().catch((err) => console.error(err));
