import type { Scalars } from "@prisma/orm-postgres/components";
import type { Models } from "../prisma/contract";

export type User = Scalars<Models.public_User>;
export type Rider = Scalars<Models.public_Rider>;
export type Report = Scalars<Models.public_Report>;
export type RidingAccount = Scalars<Models.public_RidingAccount>;
export type RidingAccountAssignment =
  Scalars<Models.public_RidingAccountAssignment>;
