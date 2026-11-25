import { prisma } from "../../utils/prisma";

const getAllReports = async () => {
  const reports = await prisma.Report.all();
  return reports;
};

const createReport = async (reportData) => {};

export const reportService = {
  getAllReports,
  createReport,
};
