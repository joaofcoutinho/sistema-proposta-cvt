/**
 * Schema do banco de dados (Drizzle ORM / Postgres).
 */

import { relations } from "drizzle-orm";
import { jsonb, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import type { ProposalContent } from "@/types/proposal-content";

// ─── Enums ───────────────────────────────────────────────────────────────

export const themeModeEnum = pgEnum("theme_mode", ["dark", "light"]);

export const proposalTypeEnum = pgEnum("proposal_type", [
  "website",
  "ecommerce",
  "trafego",
  "campanha",
]);

export const proposalStatusEnum = pgEnum("proposal_status", [
  "draft",
  "sent",
  "viewed",
  "accepted",
  "rejected",
  "expired",
]);

// ─── users — admins do painel ────────────────────────────────────────────

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// ─── clients — empresas pra quem enviamos propostas ──────────────────────

export const clients = pgTable("clients", {
  id: uuid("id").primaryKey().defaultRandom(),
  companyName: text("company_name").notNull(),
  contactName: text("contact_name"),
  contactRole: text("contact_role"),
  contactEmail: text("contact_email"),
  contactPhone: text("contact_phone"),
  logoUrl: text("logo_url"),
  primaryColor: text("primary_color").notNull().default("#6C4FE8"),
  accentColor: text("accent_color").notNull().default("#C05BCC"),
  themeMode: themeModeEnum("theme_mode").notNull().default("dark"),
  createdBy: uuid("created_by").references(() => users.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

// ─── proposals — propostas ───────────────────────────────────────────────

export const proposals = pgTable("proposals", {
  id: uuid("id").primaryKey().defaultRandom(),
  clientId: uuid("client_id")
    .notNull()
    .references(() => clients.id, { onDelete: "cascade" }),
  type: proposalTypeEnum("type").notNull(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  status: proposalStatusEnum("status").notNull().default("draft"),
  content: jsonb("content").$type<ProposalContent>().notNull(),
  validUntil: timestamp("valid_until", { withTimezone: true }),
  sentAt: timestamp("sent_at", { withTimezone: true }),
  firstViewedAt: timestamp("first_viewed_at", { withTimezone: true }),
  acceptedAt: timestamp("accepted_at", { withTimezone: true }),
  createdBy: uuid("created_by").references(() => users.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

// ─── proposal_views — tracking de visualizações ──────────────────────────

export const proposalViews = pgTable("proposal_views", {
  id: uuid("id").primaryKey().defaultRandom(),
  proposalId: uuid("proposal_id")
    .notNull()
    .references(() => proposals.id, { onDelete: "cascade" }),
  viewedAt: timestamp("viewed_at", { withTimezone: true }).notNull().defaultNow(),
  ip: text("ip"),
  userAgent: text("user_agent"),
  referrer: text("referrer"),
});

// ─── proposal_acceptances — registros de aceite ──────────────────────────

export const proposalAcceptances = pgTable("proposal_acceptances", {
  id: uuid("id").primaryKey().defaultRandom(),
  proposalId: uuid("proposal_id")
    .notNull()
    .unique()
    .references(() => proposals.id, { onDelete: "cascade" }),
  acceptedByName: text("accepted_by_name").notNull(),
  acceptedByRole: text("accepted_by_role"),
  acceptedAt: timestamp("accepted_at", { withTimezone: true }).notNull().defaultNow(),
  ip: text("ip"),
  userAgent: text("user_agent"),
});

// ─── Relations (para o query builder do Drizzle) ─────────────────────────

export const usersRelations = relations(users, ({ many }) => ({
  clients: many(clients),
  proposals: many(proposals),
}));

export const clientsRelations = relations(clients, ({ one, many }) => ({
  createdBy: one(users, {
    fields: [clients.createdBy],
    references: [users.id],
  }),
  proposals: many(proposals),
}));

export const proposalsRelations = relations(proposals, ({ one, many }) => ({
  client: one(clients, {
    fields: [proposals.clientId],
    references: [clients.id],
  }),
  createdBy: one(users, {
    fields: [proposals.createdBy],
    references: [users.id],
  }),
  views: many(proposalViews),
  acceptance: one(proposalAcceptances),
}));

export const proposalViewsRelations = relations(proposalViews, ({ one }) => ({
  proposal: one(proposals, {
    fields: [proposalViews.proposalId],
    references: [proposals.id],
  }),
}));

export const proposalAcceptancesRelations = relations(
  proposalAcceptances,
  ({ one }) => ({
    proposal: one(proposals, {
      fields: [proposalAcceptances.proposalId],
      references: [proposals.id],
    }),
  }),
);

// ─── Tipos inferidos ─────────────────────────────────────────────────────

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Client = typeof clients.$inferSelect;
export type NewClient = typeof clients.$inferInsert;

export type Proposal = typeof proposals.$inferSelect;
export type NewProposal = typeof proposals.$inferInsert;

export type ProposalView = typeof proposalViews.$inferSelect;
export type NewProposalView = typeof proposalViews.$inferInsert;

export type ProposalAcceptance = typeof proposalAcceptances.$inferSelect;
export type NewProposalAcceptance = typeof proposalAcceptances.$inferInsert;
