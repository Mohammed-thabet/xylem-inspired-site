import { eq, and, desc, like } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, markets, products, brands, productCategories, blogPosts, statistics, locations, contactSubmissions } from "../drizzle/schema";
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
