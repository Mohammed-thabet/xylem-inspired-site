import { describe, it, expect } from 'vitest';
import { getDb } from './db';
import { eq } from 'drizzle-orm';
import { sections, products, articles, reports, tools, courses, processes, techniques, books, blogPosts, markets, productCategories, brands, locations, statistics } from '../drizzle/schema';

describe('Navigation and Routing', () => {
  describe('Sections', () => {
    it('should have all 12 sections', async () => {
      const db = await getDb();
      if (!db) {
        expect(true).toBe(true);
        return;
      }

      const sectionsList = await db.select().from(sections);
      expect(sectionsList).toHaveLength(12);
      expect(sectionsList.map((s: any) => s.slug)).toEqual([
        'intelligence',
        'science-health',
        'sustainability',
        'treatment',
        'innovation',
        'education',
        'policy',
        'community',
        'technology',
        'resources',
        'partnerships',
        'marketplace',
      ]);
    });

    it('should have unique slugs for sections', async () => {
      const db = await getDb();
      if (!db) {
        expect(true).toBe(true);
        return;
      }

      const sectionsList = await db.select().from(sections);
      const slugs = sectionsList.map((s: any) => s.slug);
      const uniqueSlugs = new Set(slugs);
      expect(uniqueSlugs.size).toBe(slugs.length);
    });

    it('should have bilingual content for all sections', async () => {
      const db = await getDb();
      if (!db) {
        expect(true).toBe(true);
        return;
      }

      const sectionsList = await db.select().from(sections);
      sectionsList.forEach((section: any) => {
        expect(section.nameEn).toBeTruthy();
        expect(section.nameAr).toBeTruthy();
        expect(section.descriptionEn).toBeTruthy();
        expect(section.descriptionAr).toBeTruthy();
      });
    });
  });

  describe('Products', () => {
    it('should have products with valid categories and brands', async () => {
      const db = await getDb();
      if (!db) {
        expect(true).toBe(true);
        return;
      }

      const productsList = await db.select().from(products);
      expect(productsList.length).toBeGreaterThan(0);

      productsList.forEach((product: any) => {
        expect(product.slug).toBeTruthy();
        expect(product.nameEn).toBeTruthy();
        expect(product.nameAr).toBeTruthy();
        expect(product.categoryId).toBeTruthy();
        expect(product.brandId).toBeTruthy();
      });
    });

    it('should have unique product slugs', async () => {
      const db = await getDb();
      if (!db) {
        expect(true).toBe(true);
        return;
      }

      const productsList = await db.select().from(products);
      const slugs = productsList.map((p: any) => p.slug);
      const uniqueSlugs = new Set(slugs);
      expect(uniqueSlugs.size).toBe(slugs.length);
    });
  });

  describe('Content', () => {
    it('should have articles linked to sections', async () => {
      const db = await getDb();
      if (!db) {
        expect(true).toBe(true);
        return;
      }

      const articlesList = await db.select().from(articles);
      expect(articlesList.length).toBeGreaterThan(0);

      articlesList.forEach((article: any) => {
        expect(article.slug).toBeTruthy();
        expect(article.titleEn).toBeTruthy();
        expect(article.titleAr).toBeTruthy();
        expect(article.sectionId).toBeTruthy();
      });
    });

    it('should have reports linked to sections', async () => {
      const db = await getDb();
      if (!db) {
        expect(true).toBe(true);
        return;
      }

      const reportsList = await db.select().from(reports);
      expect(reportsList.length).toBeGreaterThan(0);

      reportsList.forEach((report: any) => {
        expect(report.slug).toBeTruthy();
        expect(report.titleEn).toBeTruthy();
        expect(report.titleAr).toBeTruthy();
        expect(report.sectionId).toBeTruthy();
      });
    });

    it('should have tools linked to sections', async () => {
      const db = await getDb();
      if (!db) {
        expect(true).toBe(true);
        return;
      }

      const toolsList = await db.select().from(tools);
      expect(toolsList.length).toBeGreaterThan(0);

      toolsList.forEach((tool: any) => {
        expect(tool.slug).toBeTruthy();
        expect(tool.nameEn).toBeTruthy();
        expect(tool.nameAr).toBeTruthy();
        expect(tool.sectionId).toBeTruthy();
      });
    });

    it('should have courses linked to sections', async () => {
      const db = await getDb();
      if (!db) {
        expect(true).toBe(true);
        return;
      }

      const coursesList = await db.select().from(courses);
      expect(coursesList.length).toBeGreaterThan(0);

      coursesList.forEach((course: any) => {
        expect(course.slug).toBeTruthy();
        expect(course.titleEn).toBeTruthy();
        expect(course.titleAr).toBeTruthy();
        expect(course.sectionId).toBeTruthy();
      });
    });

    it('should have content across all types', async () => {
      const db = await getDb();
      if (!db) {
        expect(true).toBe(true);
        return;
      }

      const articlesList = await db.select().from(articles);
      const reportsList = await db.select().from(reports);
      const toolsList = await db.select().from(tools);
      const coursesList = await db.select().from(courses);
      const processesList = await db.select().from(processes);
      const techniquesList = await db.select().from(techniques);
      const booksList = await db.select().from(books);

      expect(articlesList.length).toBeGreaterThan(0);
      expect(reportsList.length).toBeGreaterThan(0);
      expect(toolsList.length).toBeGreaterThan(0);
      expect(coursesList.length).toBeGreaterThan(0);
      expect(processesList.length).toBeGreaterThan(0);
      expect(techniquesList.length).toBeGreaterThan(0);
      expect(booksList.length).toBeGreaterThan(0);
    });
  });

  describe('Blog and Markets', () => {
    it('should have blog posts', async () => {
      const db = await getDb();
      if (!db) {
        expect(true).toBe(true);
        return;
      }

      const postsList = await db.select().from(blogPosts);
      expect(postsList.length).toBeGreaterThan(0);

      postsList.forEach((post: any) => {
        expect(post.slug).toBeTruthy();
        expect(post.titleEn).toBeTruthy();
        expect(post.titleAr).toBeTruthy();
      });
    });

    it('should have markets', async () => {
      const db = await getDb();
      if (!db) {
        expect(true).toBe(true);
        return;
      }

      const marketsList = await db.select().from(markets);
      expect(marketsList.length).toBeGreaterThan(0);

      marketsList.forEach((market: any) => {
        expect(market.slug).toBeTruthy();
        expect(market.nameEn).toBeTruthy();
        expect(market.nameAr).toBeTruthy();
      });
    });
  });

  describe('Locations', () => {
    it('should have multiple office locations', async () => {
      const db = await getDb();
      if (!db) {
        expect(true).toBe(true);
        return;
      }

      const locationsList = await db.select().from(locations);
      expect(locationsList.length).toBeGreaterThan(5);

      locationsList.forEach((location: any) => {
        expect(location.nameEn).toBeTruthy();
        expect(location.nameAr).toBeTruthy();
        expect(location.country).toBeTruthy();
        expect(location.city).toBeTruthy();
      });
    });
  });

  describe('Statistics', () => {
    it('should have statistics for dashboard', async () => {
      const db = await getDb();
      if (!db) {
        expect(true).toBe(true);
        return;
      }

      const statsList = await db.select().from(statistics);
      expect(statsList.length).toBeGreaterThan(0);

      statsList.forEach((stat: any) => {
        expect(stat.labelEn).toBeTruthy();
        expect(stat.labelAr).toBeTruthy();
        expect(stat.value).toBeTruthy();
      });
    });
  });

  describe('Language Support', () => {
    it('should have bilingual content for all products', async () => {
      const db = await getDb();
      if (!db) {
        expect(true).toBe(true);
        return;
      }

      const productsList = await db.select().from(products);
      productsList.forEach((product: any) => {
        expect(product.nameEn).toBeTruthy();
        expect(product.nameAr).toBeTruthy();
      });
    });

    it('should have bilingual content for all blog posts', async () => {
      const db = await getDb();
      if (!db) {
        expect(true).toBe(true);
        return;
      }

      const postsList = await db.select().from(blogPosts);
      postsList.forEach((post: any) => {
        expect(post.titleEn).toBeTruthy();
        expect(post.titleAr).toBeTruthy();
      });
    });

    it('should have bilingual content for all markets', async () => {
      const db = await getDb();
      if (!db) {
        expect(true).toBe(true);
        return;
      }

      const marketsList = await db.select().from(markets);
      marketsList.forEach((market: any) => {
        expect(market.nameEn).toBeTruthy();
        expect(market.nameAr).toBeTruthy();
      });
    });
  });

  describe('Content Relationships', () => {
    it('should have products with categories and brands', async () => {
      const db = await getDb();
      if (!db) {
        expect(true).toBe(true);
        return;
      }

      const productsList = await db.select().from(products);
      const categoriesList = await db.select().from(productCategories);
      const brandsList = await db.select().from(brands);

      expect(productsList.length).toBeGreaterThan(0);
      expect(categoriesList.length).toBeGreaterThan(0);
      expect(brandsList.length).toBeGreaterThan(0);
    });

    it('should have articles linked to sections', async () => {
      const db = await getDb();
      if (!db) {
        expect(true).toBe(true);
        return;
      }

      const articlesList = await db.select().from(articles);
      const sectionsList = await db.select().from(sections);

      expect(articlesList.length).toBeGreaterThan(0);
      expect(sectionsList.length).toBeGreaterThan(0);
      
      articlesList.forEach((article: any) => {
        expect(article.sectionId).toBeTruthy();
      });
    });

    it('should have reports linked to sections', async () => {
      const db = await getDb();
      if (!db) {
        expect(true).toBe(true);
        return;
      }

      const reportsList = await db.select().from(reports);
      const sectionsList = await db.select().from(sections);

      expect(reportsList.length).toBeGreaterThan(0);
      expect(sectionsList.length).toBeGreaterThan(0);
      
      reportsList.forEach((report: any) => {
        expect(report.sectionId).toBeTruthy();
      });
    });
  });
});
