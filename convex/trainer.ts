import { action, internalMutation, internalQuery, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";

export const signUpTrainer = action({
    args: {
        email: v.string(),
        name: v.string(),
    },
    handler: async (ctx, args) => {
        const trainers = await ctx.runQuery(internal.trainer.internalGetTrainer, {email: args.email})
        if (!trainers.length) {
            await ctx.runMutation(internal.trainer.addTrainer, {email: args.email, name: args.name})
        }
    }
})


export const internalGetTrainer = internalQuery({
    args: {
        email: v.string(),
    },
    handler: async (ctx, args) => {
       const result =  await ctx.db.query("trainer").filter((q) => q.eq(q.field("email"), args.email)).collect()
       return result
    }
})

export const addTrainer = internalMutation({
    args: {
        email: v.optional(v.string()),
        name: v.string()
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("trainer", {
            email: args.email,
            name: args.name
        })
    }
})

export const setupTrainer = mutation({
    args: {
        id: v.id('trainer'),
        phoneNumber: v.string(),
        companyName: v.string(),
    },
    handler: async(ctx, { id, phoneNumber, companyName}) => {
        await ctx.db.patch(id, { phoneNumber, companyName })
    }
})

export const getTrainer = query({
    args: {
        email: v.string()
    },
    handler: async(ctx, { email }) => {
        return await ctx.db.query("trainer").filter((q) => q.eq(q.field("email"), email)).first()
    }
})

export const getTrainerById = query({
    args: {
        id: v.id("trainer")
    },
    handler: async (ctx, { id }) => {
        return await ctx.db.query("trainer").filter((q) => q.eq(q.field("_id"), id)).first()
    }
})
