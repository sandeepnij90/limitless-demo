import { run } from "node:test";
import { action, internalMutation, internalQuery } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";

export const signUpTrainer = action({
    args: {
        email: v.string(),
        name: v.string(),
    },
    handler: async (ctx, args) => {
        const trainers = await ctx.runQuery(internal.trainer.getTrainer, {email: args.email})
        if (!trainers.length) {
            await ctx.runMutation(internal.trainer.addTrainer, {email: args.email, name: args.name})
        }
    }
})


export const getTrainer = internalQuery({
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

// export const addTrainer = action({
//     args: {
//         email: v.string()
//     },
//     handler: async (ctx, args) => {
//         await ctx.db.insert("trainer", {
//             email: args.email
//         })
//     }
// })


