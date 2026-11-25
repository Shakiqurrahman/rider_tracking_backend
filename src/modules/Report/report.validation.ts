import z from "zod";

const createReportSchema = z.object({
  deliverDate: z.coerce.date(),
  ordersDelivered: z.number().int().nonnegative(),
  cancelledOrders: z.number().int().nonnegative(),
  totalHours: z.number().int().positive(),
  notes: z.string().optional(),
  status: z.enum(["PENDING", "COMPLETED", "REJECTED"]).default("PENDING"),
//   riderId: z.string().uuid(),
});

const updateReportSchema = createReportSchema.partial();

export const reportValidation = {
  createReport: createReportSchema,
  updateReport: updateReportSchema,
};