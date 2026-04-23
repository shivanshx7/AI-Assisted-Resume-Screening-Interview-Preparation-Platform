import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { getStudents, getStudentById } from "../data/firebaseService";

// ─── Helpers ─────────────────────────────────────────────────────────────────

const COLORS = {
  primary: [99, 102, 241],       // indigo
  success: [16, 185, 129],       // emerald
  warning: [245, 158, 11],       // amber
  danger: [239, 68, 68],         // red
  dark: [10, 10, 10],
  darkCard: [20, 20, 20],
  text: [226, 232, 240],
  muted: [100, 116, 139],
  border: [34, 34, 34],
  white: [255, 255, 255],
  bg: [5, 5, 5],
};

const getCategoryColor = (category) => {
  if (category === "High") return COLORS.success;
  if (category === "Medium") return COLORS.warning;
  return COLORS.danger;
};

const getScoreColor = (score) => {
  if (score >= 80) return COLORS.success;
  if (score >= 50) return COLORS.warning;
  return COLORS.danger;
};

const rgb = (arr) => ({ r: arr[0], g: arr[1], b: arr[2] });

// ─── Page Header ─────────────────────────────────────────────────────────────

const addPageHeader = (doc, title, subtitle, reportType, dateRange) => {
  const W = doc.internal.pageSize.getWidth();

  // Header bar
  doc.setFillColor(...COLORS.dark);
  doc.rect(0, 0, W, 38, "F");

  // Accent line
  doc.setFillColor(...COLORS.primary);
  doc.rect(0, 38, W, 2.5, "F");

  // Brand
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...COLORS.primary);
  doc.text("COGNITRACK", 14, 14);

  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...COLORS.muted);
  doc.text("AI Student Engagement & Attention Tracker", 14, 20);

  // Report Badge
  const badge = reportType === "Weekly" ? "WEEKLY REPORT" : "MONTHLY REPORT";
  doc.setFillColor(...COLORS.primary);
  doc.roundedRect(W - 55, 8, 41, 10, 2, 2, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(...COLORS.white);
  doc.text(badge, W - 34.5, 14.5, { align: "center" });

  // Date range
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(...COLORS.muted);
  doc.text(dateRange, W - 14, 26, { align: "right" });

  // Title block
  doc.setFillColor(...COLORS.darkCard);
  doc.rect(0, 40.5, W, 28, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(...COLORS.white);
  doc.text(title, 14, 53);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...COLORS.muted);
  doc.text(subtitle, 14, 62);

  return 78; // return Y position after header
};

// ─── Section Heading ─────────────────────────────────────────────────────────

const addSection = (doc, title, yPos) => {
  const W = doc.internal.pageSize.getWidth();
  doc.setFillColor(...COLORS.darkCard);
  doc.rect(0, yPos, W, 10, "F");
  doc.setFillColor(...COLORS.primary);
  doc.rect(0, yPos, 3, 10, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(...COLORS.primary);
  doc.text(title.toUpperCase(), 10, yPos + 6.5);
  return yPos + 16;
};

// ─── KPI Row ─────────────────────────────────────────────────────────────────

const addKpiRow = (doc, kpis, yPos) => {
  const W = doc.internal.pageSize.getWidth();
  const margin = 14;
  const gap = 6;
  const cardW = (W - margin * 2 - gap * (kpis.length - 1)) / kpis.length;

  kpis.forEach((kpi, i) => {
    const x = margin + i * (cardW + gap);
    doc.setFillColor(...COLORS.darkCard);
    doc.roundedRect(x, yPos, cardW, 22, 2, 2, "F");
    doc.setDrawColor(...COLORS.border);
    doc.setLineWidth(0.3);
    doc.roundedRect(x, yPos, cardW, 22, 2, 2, "S");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(...COLORS.muted);
    doc.text(kpi.label.toUpperCase(), x + cardW / 2, yPos + 8, { align: "center" });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(...(kpi.color || COLORS.white));
    doc.text(kpi.value, x + cardW / 2, yPos + 18, { align: "center" });
  });
  return yPos + 30;
};

// ─── Spark bar ───────────────────────────────────────────────────────────────

const addSparkBar = (doc, label, value, maxValue, yPos, startX, barWidth, color) => {
  const H = 4;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(...COLORS.muted);
  doc.text(label, startX, yPos + 3);

  const filled = (value / (maxValue || 100)) * barWidth;
  doc.setFillColor(...COLORS.border);
  doc.roundedRect(startX + 40, yPos, barWidth, H, 1, 1, "F");
  doc.setFillColor(...color);
  doc.roundedRect(startX + 40, yPos, filled, H, 1, 1, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(...color);
  doc.text(`${value}%`, startX + 40 + barWidth + 3, yPos + 3);
  return yPos + 8;
};

// ─── Footer ──────────────────────────────────────────────────────────────────

const addFooter = (doc, pageNum, totalPages) => {
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();
  doc.setFillColor(...COLORS.dark);
  doc.rect(0, H - 12, W, 12, "F");
  doc.setFillColor(...COLORS.primary);
  doc.rect(0, H - 12, W, 0.5, "F");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  doc.setTextColor(...COLORS.muted);
  doc.text("CogniTrack AI · Confidential Student Report · For Educator Use Only", 14, H - 5);
  doc.text(`Page ${pageNum} of ${totalPages}`, W - 14, H - 5, { align: "right" });
};

// ─── STUDENT REPORT ──────────────────────────────────────────────────────────

export const generateStudentReport = async (studentId, reportType = "Weekly") => {
  const student = await getStudentById(studentId);
  if (!student) throw new Error("Student not found");

  const now = new Date();
  const dateRange =
    reportType === "Weekly"
      ? `Week of ${now.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${new Date(now.getTime() + 6 * 86400000).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`
      : `${now.toLocaleDateString("en-US", { month: "long", year: "numeric" })}`;

  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  let y = addPageHeader(
    doc,
    student.name,
    `Student ID: ${student.id}  ·  ${reportType} Performance Report`,
    reportType,
    dateRange
  );

  // KPI Row
  y = addSection(doc, "Performance Summary", y);
  y = addKpiRow(doc, [
    { label: "Engagement", value: `${student.engagementScore}%`, color: getScoreColor(student.engagementScore) },
    { label: "Participation", value: `${student.participation}%`, color: getScoreColor(student.participation) },
    { label: "Quiz Score", value: `${student.quizScore}%`, color: getScoreColor(student.quizScore) },
    { label: "Status", value: student.category.toUpperCase(), color: getCategoryColor(student.category) },
  ], y);

  // Weekly History Table
  if (student.weeklyHistory && student.weeklyHistory.length > 0) {
    y = addSection(doc, "Engagement Trend (Weekly History)", y);
    const rows = student.weeklyHistory.map((val, i) => [
      `Week ${i + 1}`,
      `${val}%`,
      val >= 80 ? "Optimal" : val >= 50 ? "Nominal" : "Critical",
    ]);
    autoTable(doc, {
      startY: y,
      head: [["Period", "Engagement Score", "Status"]],
      body: rows,
      theme: "plain",
      styles: {
        fillColor: COLORS.darkCard,
        textColor: COLORS.text,
        fontSize: 8,
        cellPadding: 4,
        lineColor: COLORS.border,
        lineWidth: 0.3,
      },
      headStyles: {
        fillColor: COLORS.dark,
        textColor: COLORS.muted,
        fontStyle: "bold",
        fontSize: 7,
        cellPadding: 4,
      },
      alternateRowStyles: { fillColor: [15, 15, 15] },
      margin: { left: 14, right: 14 },
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 60 },
        2: { cellWidth: "auto" },
      },
    });
    y = doc.lastAutoTable.finalY + 10;
  }

  // Sentiment Section
  if (student.sentimentHistory && student.sentimentHistory.length > 0) {
    y = addSection(doc, "Sentiment Analysis", y);
    const positive = student.sentimentHistory.filter((s) => s === "Positive").length;
    const neutral = student.sentimentHistory.filter((s) => s === "Neutral").length;
    const negative = student.sentimentHistory.filter((s) => s === "Negative").length;

    autoTable(doc, {
      startY: y,
      head: [["Sentiment", "Count", "Percentage"]],
      body: [
        ["Positive", positive, `${Math.round((positive / student.sentimentHistory.length) * 100)}%`],
        ["Neutral", neutral, `${Math.round((neutral / student.sentimentHistory.length) * 100)}%`],
        ["Negative", negative, `${Math.round((negative / student.sentimentHistory.length) * 100)}%`],
      ],
      theme: "plain",
      styles: { fillColor: COLORS.darkCard, textColor: COLORS.text, fontSize: 8, cellPadding: 4, lineColor: COLORS.border, lineWidth: 0.3 },
      headStyles: { fillColor: COLORS.dark, textColor: COLORS.muted, fontStyle: "bold", fontSize: 7, cellPadding: 4 },
      alternateRowStyles: { fillColor: [15, 15, 15] },
      margin: { left: 14, right: 14 },
    });
    y = doc.lastAutoTable.finalY + 10;
  }

  // At-Risk Alert
  if (student.atRisk) {
    y = addSection(doc, "⚠ At-Risk Alert", y);
    doc.setFillColor(80, 20, 20);
    doc.roundedRect(14, y, doc.internal.pageSize.getWidth() - 28, 14, 2, 2, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...COLORS.danger);
    doc.text(`${student.name} has been flagged as AT-RISK. Immediate teacher intervention is recommended.`, 20, y + 9);
    y += 22;
  }

  // Feedback Logs
  if (student.feedback && student.feedback.length > 0) {
    y = addSection(doc, "Feedback & Notes Log", y);
    autoTable(doc, {
      startY: y,
      head: [["Date", "Feedback Note"]],
      body: student.feedback.map((f) => [f.date, f.text]),
      theme: "plain",
      styles: { fillColor: COLORS.darkCard, textColor: COLORS.text, fontSize: 8, cellPadding: 4, lineColor: COLORS.border, lineWidth: 0.3 },
      headStyles: { fillColor: COLORS.dark, textColor: COLORS.muted, fontStyle: "bold", fontSize: 7, cellPadding: 4 },
      alternateRowStyles: { fillColor: [15, 15, 15] },
      margin: { left: 14, right: 14 },
      columnStyles: { 0: { cellWidth: 35 }, 1: { cellWidth: "auto" } },
    });
    y = doc.lastAutoTable.finalY + 10;
  }

  // AI Recommendation block
  y = addSection(doc, "AI Recommendation", y);
  const recText =
    student.engagementScore >= 80
      ? `${student.name} is performing at an optimal level. Continue current engagement strategies and consider assigning advanced supplementary materials.`
      : student.engagementScore >= 50
      ? `${student.name} shows moderate engagement. Consider one-on-one check-ins, targeted quiz review, and increased participation activities.`
      : `${student.name} requires immediate attention. Schedule a counseling session, review attendance patterns, and notify parents/guardians.`;

  doc.setFillColor(...COLORS.darkCard);
  doc.roundedRect(14, y, doc.internal.pageSize.getWidth() - 28, 18, 2, 2, "F");
  doc.setDrawColor(...COLORS.primary);
  doc.setLineWidth(0.4);
  doc.roundedRect(14, y, doc.internal.pageSize.getWidth() - 28, 18, 2, 2, "S");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...COLORS.text);
  const lines = doc.splitTextToSize(recText, doc.internal.pageSize.getWidth() - 40);
  doc.text(lines, 20, y + 8);

  // Footer on all pages
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    addFooter(doc, i, pageCount);
  }

  const filename = `CogniTrack_${reportType}_${student.name.replace(/\s+/g, "_")}_${now.getFullYear()}.pdf`;
  doc.save(filename);
  return filename;
};

// ─── CLASS REPORT ─────────────────────────────────────────────────────────────

export const generateClassReport = async (reportType = "Weekly") => {
  const students = await getStudents();
  if (!students || students.length === 0) throw new Error("No student data found");

  const now = new Date();
  const dateRange =
    reportType === "Weekly"
      ? `Week of ${now.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${new Date(now.getTime() + 6 * 86400000).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`
      : `${now.toLocaleDateString("en-US", { month: "long", year: "numeric" })}`;

  const avgEng = Math.round(students.reduce((a, s) => a + (s.engagementScore || 0), 0) / students.length);
  const avgPart = Math.round(students.reduce((a, s) => a + (s.participation || 0), 0) / students.length);
  const avgQuiz = Math.round(students.reduce((a, s) => a + (s.quizScore || 0), 0) / students.length);
  const atRiskCount = students.filter((s) => s.atRisk).length;
  const highCount = students.filter((s) => s.category === "High").length;
  const medCount = students.filter((s) => s.category === "Medium").length;
  const lowCount = students.filter((s) => s.category === "Low").length;

  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  let y = addPageHeader(
    doc,
    "CS101 — Class Report",
    `${reportType} Performance Overview  ·  ${students.length} Students`,
    reportType,
    dateRange
  );

  // Class KPIs
  y = addSection(doc, "Class Performance Summary", y);
  y = addKpiRow(doc, [
    { label: "Students", value: `${students.length}`, color: COLORS.white },
    { label: "Avg Engagement", value: `${avgEng}%`, color: getScoreColor(avgEng) },
    { label: "Avg Participation", value: `${avgPart}%`, color: getScoreColor(avgPart) },
    { label: "At-Risk", value: `${atRiskCount}`, color: atRiskCount > 0 ? COLORS.danger : COLORS.success },
  ], y);

  // Category breakdown
  y = addSection(doc, "Performance Distribution", y);
  y = addKpiRow(doc, [
    { label: "High Performers", value: `${highCount}`, color: COLORS.success },
    { label: "Moderate", value: `${medCount}`, color: COLORS.warning },
    { label: "Critical", value: `${lowCount}`, color: COLORS.danger },
    { label: "Avg Quiz", value: `${avgQuiz}%`, color: getScoreColor(avgQuiz) },
  ], y);

  // Full Student Table
  y = addSection(doc, "Individual Student Breakdown", y);
  const rows = [...students]
    .sort((a, b) => b.engagementScore - a.engagementScore)
    .map((s, i) => [
      i + 1,
      s.name,
      s.id,
      `${s.engagementScore}%`,
      `${s.participation}%`,
      `${s.quizScore}%`,
      s.category,
      s.atRisk ? "⚠ YES" : "No",
    ]);

  autoTable(doc, {
    startY: y,
    head: [["#", "Name", "ID", "Engagement", "Participation", "Quiz", "Status", "At Risk"]],
    body: rows,
    theme: "plain",
    styles: {
      fillColor: COLORS.darkCard,
      textColor: COLORS.text,
      fontSize: 7.5,
      cellPadding: 3.5,
      lineColor: COLORS.border,
      lineWidth: 0.3,
    },
    headStyles: {
      fillColor: COLORS.dark,
      textColor: COLORS.muted,
      fontStyle: "bold",
      fontSize: 7,
      cellPadding: 3.5,
    },
    alternateRowStyles: { fillColor: [15, 15, 15] },
    margin: { left: 14, right: 14 },
    columnStyles: {
      0: { cellWidth: 8 },
      1: { cellWidth: 40 },
      2: { cellWidth: 22 },
      3: { cellWidth: 22 },
      4: { cellWidth: 22 },
      5: { cellWidth: 16 },
      6: { cellWidth: 20 },
      7: { cellWidth: 16 },
    },
    didDrawCell: (data) => {
      // Color "At Risk" column
      if (data.section === "body" && data.column.index === 7 && data.cell.raw === "⚠ YES") {
        doc.setTextColor(...COLORS.danger);
      }
    },
  });
  y = doc.lastAutoTable.finalY + 10;

  // At-Risk list
  const atRiskStudents = students.filter((s) => s.atRisk);
  if (atRiskStudents.length > 0) {
    y = addSection(doc, "⚠ At-Risk Student Alerts", y);
    autoTable(doc, {
      startY: y,
      head: [["Name", "ID", "Engagement", "Recommended Action"]],
      body: atRiskStudents.map((s) => [
        s.name,
        s.id,
        `${s.engagementScore}%`,
        s.engagementScore < 50
          ? "Immediate counseling + parent notification"
          : "Schedule one-on-one check-in",
      ]),
      theme: "plain",
      styles: { fillColor: [40, 10, 10], textColor: [239, 68, 68], fontSize: 8, cellPadding: 4, lineColor: [80, 20, 20], lineWidth: 0.3 },
      headStyles: { fillColor: COLORS.dark, textColor: COLORS.muted, fontStyle: "bold", fontSize: 7 },
      margin: { left: 14, right: 14 },
    });
    y = doc.lastAutoTable.finalY + 10;
  }

  // AI Class Summary
  y = addSection(doc, "AI Class Summary", y);
  const summary = `Class CS101 ${reportType.toLowerCase()} performance: Average engagement is ${avgEng}%, participation at ${avgPart}%, and quiz scores at ${avgQuiz}%. ${atRiskCount} student(s) are flagged at-risk and require immediate attention. ${highCount} students are operating at optimal performance. ${lowCount > 0 ? `${lowCount} student(s) in the critical zone should be prioritized for intervention this ${reportType === "Weekly" ? "week" : "month"}.` : "No critical-zone students detected."}`;

  doc.setFillColor(...COLORS.darkCard);
  doc.roundedRect(14, y, doc.internal.pageSize.getWidth() - 28, 22, 2, 2, "F");
  doc.setDrawColor(...COLORS.primary);
  doc.setLineWidth(0.4);
  doc.roundedRect(14, y, doc.internal.pageSize.getWidth() - 28, 22, 2, 2, "S");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...COLORS.text);
  const lines = doc.splitTextToSize(summary, doc.internal.pageSize.getWidth() - 40);
  doc.text(lines, 20, y + 9);

  // Footer
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    addFooter(doc, i, pageCount);
  }

  const filename = `CogniTrack_Class_${reportType}_Report_${now.getFullYear()}.pdf`;
  doc.save(filename);
  return filename;
};
