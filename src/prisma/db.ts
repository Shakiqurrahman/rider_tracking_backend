import "dotenv/config";

import postgres from "@prisma/orm-postgres/runtime";
import { contractFromJson } from "@prisma/orm-postgres/static";

import type { Contract } from "./contract.d";

import contractJson from "./contract.json" with { type: "json" };

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required");
}

const contract = contractFromJson<Contract>(contractJson);

const client = postgres({
  contract,
  url: databaseUrl,
});

export { client as db };
