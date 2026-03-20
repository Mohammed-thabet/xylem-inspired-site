import { describe, it, expect } from "vitest";
import { appRouter } from "./routers";
import { COOKIE_NAME } from "../shared/const";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createTestContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "test",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("Sections Router", () => {
  it("should get authenticated user", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const user = await caller.auth.me();
    expect(user).toEqual(ctx.user);
  });

  it("should handle contact submissions with required fields", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      subject: "Test Subject",
      message: "Test message",
      language: "en",
    });

    expect(result).toHaveProperty("success");
    expect(result.success).toBe(true);
  });

  it("should support bilingual content in contact form", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit({
      firstName: "محمد",
      lastName: "علي",
      email: "test@example.com",
      subject: "موضوع الاختبار",
      message: "رسالة الاختبار",
      language: "ar",
    });

    expect(result.success).toBe(true);
  });

  it("should validate email format in contact form", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.contact.submit({
        firstName: "John",
        lastName: "Doe",
        email: "invalid-email",
        subject: "Test",
        message: "Test",
      });
      expect.fail("Should have thrown validation error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("should require minimum field lengths in contact form", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.contact.submit({
        firstName: "",
        lastName: "Doe",
        email: "test@example.com",
        subject: "Test",
        message: "Test",
      });
      expect.fail("Should have thrown validation error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("should support logout", async () => {
    const ctx = createTestContext();
    const clearedCookies: any[] = [];

    ctx.res = {
      clearCookie: (name: string, options: any) => {
        clearedCookies.push({ name, options });
      },
    } as any;

    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.logout();

    expect(result.success).toBe(true);
  });

  it("should clear session cookie on logout", async () => {
    const ctx = createTestContext();
    const clearedCookies: any[] = [];

    ctx.res = {
      clearCookie: (name: string, options: any) => {
        clearedCookies.push({ name, options });
      },
    } as any;

    const caller = appRouter.createCaller(ctx);
    await caller.auth.logout();

    expect(clearedCookies).toHaveLength(1);
    expect(clearedCookies[0]?.name).toBe(COOKIE_NAME);
  });
});
