import { eq, and, desc, like, inArray, or } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, markets, products, brands, productCategories, blogPosts, statistics, locations, contactSubmissions, articles, reports, processes, techniques, books, tools, courses, sections, contentLinks } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Markets queries
export async function getActiveMarkets() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(markets).where(eq(markets.isActive, true)).orderBy(markets.order);
}

export async function getMarketBySlug(slug: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(markets).where(eq(markets.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : null;
}

// Products queries
export async function getActiveProducts(limit?: number) {
  const db = await getDb();
  if (!db) return [];
  let query = db.select().from(products).where(eq(products.isActive, true)).orderBy(products.order);
  if (limit) {
    query = query.limit(limit) as any;
  }
  return query;
}

export async function getProductBySlug(slug: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getProductsByCategory(categoryId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(products).where(and(eq(products.categoryId, categoryId), eq(products.isActive, true))).orderBy(products.order);
}

export async function getProductsByBrand(brandId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(products).where(and(eq(products.brandId, brandId), eq(products.isActive, true))).orderBy(products.order);
}

export async function filterProducts(filters: {
  categoryIds?: number[];
  brandIds?: number[];
  searchQuery?: string;
  limit?: number;
  offset?: number;
}) {
  const db = await getDb();
  if (!db) return [];

  try {
    let whereConditions: any[] = [eq(products.isActive, true)];

    if (filters.categoryIds && filters.categoryIds.length > 0) {
      whereConditions.push(inArray(products.categoryId, filters.categoryIds));
    }

    if (filters.brandIds && filters.brandIds.length > 0) {
      whereConditions.push(inArray(products.brandId, filters.brandIds));
    }

    if (filters.searchQuery) {
      whereConditions.push(
        or(
          like(products.nameEn, `%${filters.searchQuery}%`),
          like(products.nameAr, `%${filters.searchQuery}%`),
          like(products.descriptionEn, `%${filters.searchQuery}%`),
          like(products.descriptionAr, `%${filters.searchQuery}%`)
        )
      );
    }

    let query = db.select().from(products).where(and(...whereConditions)).orderBy(products.order);
    
    const limit = filters.limit || 12;
    const offset = filters.offset || 0;

    return query.limit(limit).offset(offset);
  } catch (error) {
    console.error("[Database] Filter products error:", error);
    return [];
  }
}

export async function searchProducts(query: string) {
  const db = await getDb();
  if (!db) return [];
  const searchPattern = `%${query}%`;
  return db.select().from(products).where(
    and(
      eq(products.isActive, true),
      like(products.nameEn, searchPattern)
    )
  ).limit(20);
}

// Brands queries
export async function getActiveBrands() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(brands).where(eq(brands.isActive, true)).orderBy(brands.order);
}

export async function getBrandBySlug(slug: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(brands).where(eq(brands.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : null;
}

// Product Categories queries
export async function getActiveProductCategories() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(productCategories).where(eq(productCategories.isActive, true)).orderBy(productCategories.order);
}

// Blog Posts queries
export async function getPublishedBlogPosts(limit?: number) {
  const db = await getDb();
  if (!db) return [];
  let query = db.select().from(blogPosts).where(eq(blogPosts.isPublished, true)).orderBy(desc(blogPosts.publishedAt));
  if (limit) {
    query = query.limit(limit) as any;
  }
  return query;
}

export async function getBlogPostBySlug(slug: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getBlogPostsByCategory(category: string) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(blogPosts).where(and(eq(blogPosts.category, category), eq(blogPosts.isPublished, true))).orderBy(desc(blogPosts.publishedAt));
}

// Statistics queries
export async function getActiveStatistics() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(statistics).where(eq(statistics.isActive, true)).orderBy(statistics.order);
}

// Locations queries
export async function getActiveLocations() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(locations).where(eq(locations.isActive, true));
}

// Contact Submissions
export async function createContactSubmission(data: typeof contactSubmissions.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(contactSubmissions).values(data);
}

// Site Settings
export async function getSiteSetting(key: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(require("../drizzle/schema").siteSettings).where(eq(require("../drizzle/schema").siteSettings.key, key)).limit(1);
  return result.length > 0 ? result[0] : null;
}

// Sections queries (v2.1)
export async function getActiveSections() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(sections).where(eq(sections.isActive, true)).orderBy(sections.order);
}

export async function getSectionBySlug(slug: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(sections).where(eq(sections.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : null;
}

// Articles queries (v2.1)
export async function getPublishedArticles(limit?: number) {
  const db = await getDb();
  if (!db) return [];
  let query = db.select().from(articles).where(eq(articles.isPublished, true)).orderBy(desc(articles.publishedAt));
  if (limit) {
    query = query.limit(limit) as any;
  }
  return query;
}

export async function getArticleBySlug(slug: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(articles).where(eq(articles.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getArticlesBySection(sectionId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(articles).where(and(eq(articles.sectionId, sectionId), eq(articles.isPublished, true))).orderBy(desc(articles.publishedAt));
}

// Reports queries (v2.1)
export async function getPublishedReports(limit?: number) {
  const db = await getDb();
  if (!db) return [];
  let query = db.select().from(reports).where(eq(reports.isPublished, true)).orderBy(desc(reports.publishedAt));
  if (limit) {
    query = query.limit(limit) as any;
  }
  return query;
}

export async function getReportBySlug(slug: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(reports).where(eq(reports.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getReportsBySection(sectionId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(reports).where(and(eq(reports.sectionId, sectionId), eq(reports.isPublished, true))).orderBy(desc(reports.publishedAt));
}

// Processes queries (v2.1)
export async function getPublishedProcesses(limit?: number) {
  const db = await getDb();
  if (!db) return [];
  let query = db.select().from(processes).where(eq(processes.isPublished, true)).orderBy(desc(processes.createdAt));
  if (limit) {
    query = query.limit(limit) as any;
  }
  return query;
}

export async function getProcessBySlug(slug: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(processes).where(eq(processes.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getProcessesBySection(sectionId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(processes).where(and(eq(processes.sectionId, sectionId), eq(processes.isPublished, true))).orderBy(desc(processes.createdAt));
}

// Techniques queries (v2.1)
export async function getPublishedTechniques(limit?: number) {
  const db = await getDb();
  if (!db) return [];
  let query = db.select().from(techniques).where(eq(techniques.isPublished, true)).orderBy(desc(techniques.createdAt));
  if (limit) {
    query = query.limit(limit) as any;
  }
  return query;
}

export async function getTechniqueBySlug(slug: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(techniques).where(eq(techniques.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getTechniquesBySection(sectionId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(techniques).where(and(eq(techniques.sectionId, sectionId), eq(techniques.isPublished, true))).orderBy(desc(techniques.createdAt));
}

// Books queries (v2.1)
export async function getPublishedBooks(limit?: number) {
  const db = await getDb();
  if (!db) return [];
  let query = db.select().from(books).where(eq(books.isPublished, true)).orderBy(desc(books.publishedYear));
  if (limit) {
    query = query.limit(limit) as any;
  }
  return query;
}

export async function getBookBySlug(slug: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(books).where(eq(books.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getBooksBySection(sectionId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(books).where(and(eq(books.sectionId, sectionId), eq(books.isPublished, true))).orderBy(desc(books.publishedYear));
}

// Tools queries (v2.1)
export async function getPublishedTools(limit?: number) {
  const db = await getDb();
  if (!db) return [];
  let query = db.select().from(tools).where(eq(tools.isPublished, true)).orderBy(desc(tools.createdAt));
  if (limit) {
    query = query.limit(limit) as any;
  }
  return query;
}

export async function getToolBySlug(slug: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(tools).where(eq(tools.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getToolsBySection(sectionId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(tools).where(and(eq(tools.sectionId, sectionId), eq(tools.isPublished, true))).orderBy(desc(tools.createdAt));
}

// Courses queries (v2.1)
export async function getPublishedCourses(limit?: number) {
  const db = await getDb();
  if (!db) return [];
  let query = db.select().from(courses).where(eq(courses.isPublished, true)).orderBy(desc(courses.createdAt));
  if (limit) {
    query = query.limit(limit) as any;
  }
  return query;
}

export async function getCourseBySlug(slug: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(courses).where(eq(courses.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getCoursesBySection(sectionId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(courses).where(and(eq(courses.sectionId, sectionId), eq(courses.isPublished, true))).orderBy(desc(courses.createdAt));
}

// Content linking (v2.1)
export async function getRelatedContent(sourceType: string, sourceId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(contentLinks).where(and(eq(contentLinks.sourceType, sourceType), eq(contentLinks.sourceId, sourceId)));
}

export async function linkContent(sourceType: string, sourceId: number, targetType: string, targetId: number, relationshipType?: string) {
  const db = await getDb();
  if (!db) return null;
  try {
    await db.insert(contentLinks).values({
      sourceType,
      sourceId,
      targetType,
      targetId,
      relationshipType,
    });
    return true;
  } catch (error) {
    console.error("[Database] Link content error:", error);
    return false;
  }
}
