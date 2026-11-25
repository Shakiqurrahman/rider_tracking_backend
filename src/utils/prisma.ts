import { db } from "../prisma/db";

export const prisma: typeof db.orm.public = db.orm.public;
