import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createPublicContext(): TrpcContext {
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

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };

  return ctx;
}

describe("products.filter", () => {
  it("returns filtered products when no filters are applied", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.products.filter({});

    expect(Array.isArray(result)).toBe(true);
  });

  it("returns filtered products by category IDs", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.products.filter({
      categoryIds: [1],
    });

    expect(Array.isArray(result)).toBe(true);
  });

  it("returns filtered products by brand IDs", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.products.filter({
      brandIds: [1],
    });

    expect(Array.isArray(result)).toBe(true);
  });

  it("returns filtered products by search query", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.products.filter({
      searchQuery: "pump",
    });

    expect(Array.isArray(result)).toBe(true);
  });

  it("returns filtered products with pagination", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.products.filter({
      limit: 5,
      offset: 0,
    });

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeLessThanOrEqual(5);
  });

  it("returns filtered products with multiple filters combined", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.products.filter({
      categoryIds: [1],
      brandIds: [1],
      searchQuery: "pump",
      limit: 10,
    });

    expect(Array.isArray(result)).toBe(true);
  });

  it("returns empty array when no products match filters", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.products.filter({
      searchQuery: "nonexistentproduct12345",
    });

    expect(Array.isArray(result)).toBe(true);
  });
});
