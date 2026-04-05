import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { 
  getActiveMarkets, 
  getMarketBySlug, 
  getActiveProducts, 
  getProductBySlug, 
  getProductsByCategory, 
  getProductsByBrand,
  filterProducts,
  searchProducts,
  getActiveBrands,
  getBrandBySlug,
  getActiveProductCategories,
  getPublishedBlogPosts,
  getBlogPostBySlug,
  getBlogPostsByCategory,
  getActiveStatistics,
  getActiveLocations,
  createContactSubmission,
  getActiveSections,
  getSectionBySlug,
  getArticlesBySection,
  getReportsBySection,
  getProcessesBySection,
  getTechniquesBySection,
  getBooksBySection,
  getToolsBySection,
  getCoursesBySection
} from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Markets procedures
  markets: router({
    list: publicProcedure.query(async () => {
      return getActiveMarkets();
    }),
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return getMarketBySlug(input.slug);
      }),
  }),

  // Products procedures
  products: router({
    list: publicProcedure
      .input(z.object({ limit: z.number().optional() }))
      .query(async ({ input }) => {
        return getActiveProducts(input.limit);
      }),
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return getProductBySlug(input.slug);
      }),
    getByCategory: publicProcedure
      .input(z.object({ categoryId: z.number() }))
      .query(async ({ input }) => {
        return getProductsByCategory(input.categoryId);
      }),
    getByBrand: publicProcedure
      .input(z.object({ brandId: z.number() }))
      .query(async ({ input }) => {
        return getProductsByBrand(input.brandId);
      }),
    search: publicProcedure
      .input(z.object({ query: z.string() }))
      .query(async ({ input }) => {
        return searchProducts(input.query);
      }),
    filter: publicProcedure
      .input(z.object({
        categoryIds: z.array(z.number()).optional(),
        brandIds: z.array(z.number()).optional(),
        searchQuery: z.string().optional(),
        limit: z.number().optional(),
        offset: z.number().optional(),
      }))
      .query(async ({ input }) => {
        return filterProducts({
          categoryIds: input.categoryIds,
          brandIds: input.brandIds,
          searchQuery: input.searchQuery,
          limit: input.limit,
          offset: input.offset,
        });
      }),
  }),

  // Brands procedures
  brands: router({
    list: publicProcedure.query(async () => {
      return getActiveBrands();
    }),
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return getBrandBySlug(input.slug);
      }),
  }),

  // Product Categories procedures
  productCategories: router({
    list: publicProcedure.query(async () => {
      return getActiveProductCategories();
    }),
  }),

  // Blog procedures
  blog: router({
    list: publicProcedure
      .input(z.object({ limit: z.number().optional() }))
      .query(async ({ input }) => {
        return getPublishedBlogPosts(input.limit);
      }),
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return getBlogPostBySlug(input.slug);
      }),
    getByCategory: publicProcedure
      .input(z.object({ category: z.string() }))
      .query(async ({ input }) => {
        return getBlogPostsByCategory(input.category);
      }),
  }),

  // Sections procedures
  sections: router({
    list: publicProcedure.query(async () => {
      return getActiveSections();
    }),
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return getSectionBySlug(input.slug);
      }),
    getContent: publicProcedure
      .input(z.object({ sectionId: z.number() }))
      .query(async ({ input }) => {
        const [articles, reports, processes, techniques, books, tools, courses] = await Promise.all([
          getArticlesBySection(input.sectionId),
          getReportsBySection(input.sectionId),
          getProcessesBySection(input.sectionId),
          getTechniquesBySection(input.sectionId),
          getBooksBySection(input.sectionId),
          getToolsBySection(input.sectionId),
          getCoursesBySection(input.sectionId),
        ]);
        return {
          articles,
          reports,
          processes,
          techniques,
          books,
          tools,
          courses,
        };
      }),
  }),

  // Statistics procedures
  statistics: router({
    list: publicProcedure.query(async () => {
      return getActiveStatistics();
    }),
  }),

  // Locations procedures
  locations: router({
    list: publicProcedure.query(async () => {
      return getActiveLocations();
    }),
  }),

  // Contact procedures
  contact: router({
    submit: publicProcedure
      .input(z.object({
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        email: z.string().email(),
        phone: z.string().optional(),
        company: z.string().optional(),
        subject: z.string().min(1),
        message: z.string().min(1),
        language: z.string().default("en"),
      }))
      .mutation(async ({ input }) => {
        try {
          await createContactSubmission(input);
          return { success: true, message: "Contact form submitted successfully" };
        } catch (error) {
          console.error("Contact submission error:", error);
          throw new Error("Failed to submit contact form");
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
