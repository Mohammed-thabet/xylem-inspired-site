import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

vi.mock("./db", () => ({
  getActiveMarkets: vi.fn().mockResolvedValue([
    {
      id: 1,
      slug: "agriculture",
      nameEn: "Agriculture",
      nameAr: "الزراعة",
      descriptionEn: "Agricultural solutions",
      descriptionAr: "حلول زراعية",
      imageUrl: "https://example.com/agriculture.jpg",
      order: 1,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  getMarketBySlug: vi.fn().mockResolvedValue({
    id: 1,
    slug: "agriculture",
    nameEn: "Agriculture",
    nameAr: "الزراعة",
    descriptionEn: "Agricultural solutions",
    descriptionAr: "حلول زراعية",
    imageUrl: "https://example.com/agriculture.jpg",
    order: 1,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
  getActiveProducts: vi.fn().mockResolvedValue([
    {
      id: 1,
      slug: "pump-system",
      nameEn: "Pump System",
      nameAr: "نظام الضخ",
      descriptionEn: "Advanced pump system",
      descriptionAr: "نظام ضخ متقدم",
      categoryId: 1,
      brandId: 1,
      imageUrl: "https://example.com/pump.jpg",
      specifications: { power: "10kW" },
      order: 1,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  getProductBySlug: vi.fn().mockResolvedValue({
    id: 1,
    slug: "pump-system",
    nameEn: "Pump System",
    nameAr: "نظام الضخ",
    descriptionEn: "Advanced pump system",
    descriptionAr: "نظام ضخ متقدم",
    categoryId: 1,
    brandId: 1,
    imageUrl: "https://example.com/pump.jpg",
    specifications: { power: "10kW" },
    order: 1,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
  getProductsByCategory: vi.fn().mockResolvedValue([]),
  getProductsByBrand: vi.fn().mockResolvedValue([]),
  searchProducts: vi.fn().mockResolvedValue([]),
  getActiveBrands: vi.fn().mockResolvedValue([
    {
      id: 1,
      slug: "flygt",
      nameEn: "Flygt",
      nameAr: "فليجت",
      descriptionEn: "Flygt brand",
      descriptionAr: "علامة فليجت",
      logoUrl: "https://example.com/flygt.png",
      order: 1,
      isActive: true,
      createdAt: new Date(),
    },
  ]),
  getBrandBySlug: vi.fn().mockResolvedValue({
    id: 1,
    slug: "flygt",
    nameEn: "Flygt",
    nameAr: "فليجت",
    descriptionEn: "Flygt brand",
    descriptionAr: "علامة فليجت",
    logoUrl: "https://example.com/flygt.png",
    order: 1,
    isActive: true,
    createdAt: new Date(),
  }),
  getActiveProductCategories: vi.fn().mockResolvedValue([
    {
      id: 1,
      slug: "pumps",
      nameEn: "Pumps",
      nameAr: "المضخات",
      descriptionEn: "Pump products",
      descriptionAr: "منتجات المضخات",
      order: 1,
      isActive: true,
      createdAt: new Date(),
    },
  ]),
  getPublishedBlogPosts: vi.fn().mockResolvedValue([
    {
      id: 1,
      slug: "water-innovation",
      titleEn: "Water Innovation",
      titleAr: "ابتكار المياه",
      contentEn: "Content about water innovation",
      contentAr: "محتوى حول ابتكار المياه",
      excerptEn: "Excerpt",
      excerptAr: "مقتطف",
      featuredImageUrl: "https://example.com/blog.jpg",
      category: "article",
      authorId: 1,
      isPublished: true,
      publishedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  getBlogPostBySlug: vi.fn().mockResolvedValue({
    id: 1,
    slug: "water-innovation",
    titleEn: "Water Innovation",
    titleAr: "ابتكار المياه",
    contentEn: "Content about water innovation",
    contentAr: "محتوى حول ابتكار المياه",
    excerptEn: "Excerpt",
    excerptAr: "مقتطف",
    featuredImageUrl: "https://example.com/blog.jpg",
    category: "article",
    authorId: 1,
    isPublished: true,
    publishedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
  getBlogPostsByCategory: vi.fn().mockResolvedValue([]),
  getActiveStatistics: vi.fn().mockResolvedValue([
    {
      id: 1,
      labelEn: "Colleagues",
      labelAr: "الزملاء",
      value: "23000",
      unit: "+",
      description: "Colleagues worldwide",
      order: 1,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  getActiveLocations: vi.fn().mockResolvedValue([
    {
      id: 1,
      nameEn: "New York",
      nameAr: "نيويورك",
      country: "USA",
      city: "New York",
      address: "123 Water Street",
      phone: "+1-212-555-0100",
      email: "ny@xylem.com",
      latitude: 40.7128,
      longitude: -74.006,
      isActive: true,
      createdAt: new Date(),
    },
  ]),
  createContactSubmission: vi.fn().mockResolvedValue({ success: true }),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("tRPC Routers", () => {
  let caller: ReturnType<typeof appRouter.createCaller>;

  beforeEach(() => {
    const ctx = createPublicContext();
    caller = appRouter.createCaller(ctx);
  });

  describe("markets", () => {
    it("should list active markets", async () => {
      const markets = await caller.markets.list();
      expect(markets).toHaveLength(1);
      expect(markets[0]?.nameEn).toBe("Agriculture");
    });

    it("should get market by slug", async () => {
      const market = await caller.markets.getBySlug({ slug: "agriculture" });
      expect(market).toBeDefined();
      expect(market?.nameEn).toBe("Agriculture");
    });
  });

  describe("products", () => {
    it("should list active products", async () => {
      const products = await caller.products.list({ limit: 10 });
      expect(products).toHaveLength(1);
      expect(products[0]?.nameEn).toBe("Pump System");
    });

    it("should get product by slug", async () => {
      const product = await caller.products.getBySlug({ slug: "pump-system" });
      expect(product).toBeDefined();
      expect(product?.nameEn).toBe("Pump System");
    });

    it("should search products", async () => {
      const results = await caller.products.search({ query: "pump" });
      expect(Array.isArray(results)).toBe(true);
    });
  });

  describe("brands", () => {
    it("should list active brands", async () => {
      const brands = await caller.brands.list();
      expect(brands).toHaveLength(1);
      expect(brands[0]?.nameEn).toBe("Flygt");
    });

    it("should get brand by slug", async () => {
      const brand = await caller.brands.getBySlug({ slug: "flygt" });
      expect(brand).toBeDefined();
      expect(brand?.nameEn).toBe("Flygt");
    });
  });

  describe("productCategories", () => {
    it("should list active product categories", async () => {
      const categories = await caller.productCategories.list();
      expect(categories).toHaveLength(1);
      expect(categories[0]?.nameEn).toBe("Pumps");
    });
  });

  describe("blog", () => {
    it("should list published blog posts", async () => {
      const posts = await caller.blog.list({ limit: 10 });
      expect(posts).toHaveLength(1);
      expect(posts[0]?.titleEn).toBe("Water Innovation");
    });

    it("should get blog post by slug", async () => {
      const post = await caller.blog.getBySlug({ slug: "water-innovation" });
      expect(post).toBeDefined();
      expect(post?.titleEn).toBe("Water Innovation");
    });
  });

  describe("statistics", () => {
    it("should list active statistics", async () => {
      const stats = await caller.statistics.list();
      expect(stats).toHaveLength(1);
      expect(stats[0]?.labelEn).toBe("Colleagues");
    });
  });

  describe("locations", () => {
    it("should list active locations", async () => {
      const locations = await caller.locations.list();
      expect(locations).toHaveLength(1);
      expect(locations[0]?.nameEn).toBe("New York");
    });
  });

  describe("contact", () => {
    it("should submit contact form", async () => {
      const result = await caller.contact.submit({
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phone: "+1-555-0100",
        company: "Tech Corp",
        subject: "Inquiry",
        message: "I have a question",
        language: "en",
      });

      expect(result.success).toBe(true);
      expect(result.message).toBe("Contact form submitted successfully");
    });

    it("should validate required fields", async () => {
      try {
        await caller.contact.submit({
          firstName: "",
          lastName: "Doe",
          email: "john@example.com",
          phone: "",
          company: "",
          subject: "Inquiry",
          message: "I have a question",
          language: "en",
        });
        expect.fail("Should have thrown validation error");
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});
