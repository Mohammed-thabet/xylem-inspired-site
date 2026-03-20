import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import {
  getSectionBySlug,
  getArticlesBySection,
  getReportsBySection,
  getProcessesBySection,
  getTechniquesBySection,
  getBooksBySection,
  getToolsBySection,
  getCoursesBySection,
} from "./db";

export const sectionsRouter = router({
  // Sections procedures
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      return getSectionBySlug(input.slug);
    }),

  // Articles procedures
  articles: router({
    getBySection: publicProcedure
      .input(z.object({ sectionId: z.number() }))
      .query(async ({ input }) => {
        return getArticlesBySection(input.sectionId);
      }),
  }),

  // Reports procedures
  reports: router({
    getBySection: publicProcedure
      .input(z.object({ sectionId: z.number() }))
      .query(async ({ input }) => {
        return getReportsBySection(input.sectionId);
      }),
  }),

  // Processes procedures
  processes: router({
    getBySection: publicProcedure
      .input(z.object({ sectionId: z.number() }))
      .query(async ({ input }) => {
        return getProcessesBySection(input.sectionId);
      }),
  }),

  // Techniques procedures
  techniques: router({
    getBySection: publicProcedure
      .input(z.object({ sectionId: z.number() }))
      .query(async ({ input }) => {
        return getTechniquesBySection(input.sectionId);
      }),
  }),

  // Books procedures
  books: router({
    getBySection: publicProcedure
      .input(z.object({ sectionId: z.number() }))
      .query(async ({ input }) => {
        return getBooksBySection(input.sectionId);
      }),
  }),

  // Tools procedures
  tools: router({
    getBySection: publicProcedure
      .input(z.object({ sectionId: z.number() }))
      .query(async ({ input }) => {
        return getToolsBySection(input.sectionId);
      }),
  }),

  // Courses procedures
  courses: router({
    getBySection: publicProcedure
      .input(z.object({ sectionId: z.number() }))
      .query(async ({ input }) => {
        return getCoursesBySection(input.sectionId);
      }),
  }),
});
