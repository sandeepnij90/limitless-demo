import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    trainer: defineTable({
    name: v.string(),
    email: v.optional(v.string()),
    companyName: v.optional(v.string()),
    phoneNumber: v.optional(v.string()),
  }),

});