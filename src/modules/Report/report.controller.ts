import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { reportService } from "./report.service";

const getAllReports = catchAsync(async (req, res) => {
  const reports = await reportService.getAllReports();

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Reports retrieved successfully",
    data: reports,
  });
});

const createReport = catchAsync(async (req, res) => {
  const reportData = req.body;
  const newReport = await reportService.createReport(reportData);
  
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Report created successfully",
    data: newReport,
  });
});

export const reportController = {
  getAllReports,
  createReport,
};
