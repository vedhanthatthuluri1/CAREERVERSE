
/**
 * ============================================================
 * CAREERVERSE API — VERSION 3.4.1
 * Google Apps Script + Google Sheets
 * ============================================================
 *
 * Features:
 * - Admin authentication
 * - Google Forms registration capture from a separate spreadsheet
 * - Admin registration approval/rejection
 * - Batch 1 and Batch 2 access codes
 * - Global capacity of 100 participants
 * - Approved access-code-only student login
 * - Student progress and assessments
 * - Admin dashboard, student list and profiles
 * - Activity logging
 *
 * IMPORTANT:
 * - Keep the v3.3.2 deployment as your rollback version.
 * - Existing spreadsheet records are not deleted.
 * - Do not share administrator passwords or Script Properties.
 */


/* ============================================================
   1. CONFIGURATION
============================================================ */

const CONFIG = {
  VERSION: "3.4.1",

  SHEETS: {
    STUDENTS: "Students",
    ASSESSMENTS: "Assessments",
    PROGRESS: "Progress",
    LIVE: "LIVE_Registrations",
    LOGS: "Admin_Logs",
    ACCESS_CODES: "Access_Codes"
  },

  SESSION_DURATION: 21600,
  ADMIN_LOGIN_ATTEMPT_LIMIT: 20,
  ADMIN_LOGIN_LOCK_DURATION: 900,
  MAX_ACTIVITY_DATA_LENGTH: 45000,
  MAX_PARTICIPANTS: 100,
  TOTAL_CHAPTERS: 9
};


/**
 * Separate Google Forms response spreadsheet.
 * The Apps Script account must have Editor access.
 */
const REGISTRATION_SOURCE_SPREADSHEET_ID =
  "1aQbDVA8HBVL4bJqsNOJpTPStWbvBaafhhqWcsB--r_Q";

const REGISTRATION_SOURCE_SHEET_ID = 1079074791;


/* ============================================================
   2. DATABASE CONNECTION
============================================================ */

function getDatabase_() {
  const properties = PropertiesService.getScriptProperties();
  let id = properties.getProperty("DATABASE_SPREADSHEET_ID");

  if (!id) {
    const active = SpreadsheetApp.getActiveSpreadsheet();

    if (!active) {
      throw new Error("Database spreadsheet is not configured.");
    }

    id = active.getId();
    properties.setProperty("DATABASE_SPREADSHEET_ID", id);
  }

  return SpreadsheetApp.openById(id);
}


function getSheet_(name) {
  const sheet = getDatabase_().getSheetByName(name);

  if (!sheet) {
    throw new Error("Database sheet not found: " + name);
  }

  return sheet;
}


/* ============================================================
   3. DATABASE HEADERS
============================================================ */

function getRequiredHeaders_() {
  return {
    Students: [
      "studentId",
      "studentName",
      "email",
      "phone",
      "registrationNumber",
      "eventCode",
      "status",
      "createdAt",
      "updatedAt",
      "department",
      "section"
    ],

    Assessments: [
      "submissionId",
      "studentId",
      "chapter",
      "assessmentType",
      "score",
      "totalQuestions",
      "percentage",
      "responseData",
      "submittedAt"
    ],

    Progress: [
      "progressId",
      "studentId",
      "chapter",
      "completed",
      "completedAt",
      "updatedAt",
      "activityData"
    ],

    LIVE_Registrations: [
      "registrationId",
      "studentName",
      "email",
      "phone",
      "year",
      "session",
      "status",
      "registeredAt",
      "registrationNumber",
      "department",
      "section",
      "sourceRowKey"
    ],

    Admin_Logs: [
      "logId",
      "adminId",
      "action",
      "description",
      "createdAt"
    ],

    Access_Codes: [
      "accessCode",
      "studentId",
      "registrationId",
      "studentName",
      "email",
      "phone",
      "batch",
      "status",
      "issuedAt",
      "approvedBy",
      "createdAt",
      "updatedAt"
    ]
  };
}


function setupCareerverseDatabase() {
  const ss = getDatabase_();
  const definitions = getRequiredHeaders_();
  const results = [];

  Object.keys(definitions).forEach(function(name) {
    let sheet = ss.getSheetByName(name);

    if (!sheet) {
      sheet = ss.insertSheet(name);
    }

    const required = definitions[name];
    const lastColumn = sheet.getLastColumn();

    const existing = lastColumn
      ? sheet.getRange(1, 1, 1, lastColumn).getValues()[0]
      : [];

    const existingSet = new Set(
      existing.filter(String)
    );

    const missing = required.filter(function(header) {
      return !existingSet.has(header);
    });

    if (existingSet.size === 0) {
      sheet.getRange(1, 1, 1, required.length)
        .setValues([required]);
    } else if (missing.length) {
      sheet.getRange(
        1,
        lastColumn + 1,
        1,
        missing.length
      ).setValues([missing]);
    }

    sheet.setFrozenRows(1);

    results.push({
      sheet: name,
      addedHeaders: missing
    });
  });

  const report = {
    success: true,
    version: CONFIG.VERSION,
    sheets: results
  };

  Logger.log(JSON.stringify(report, null, 2));
  return report;
}


function verifyDatabase() {
  const ss = getDatabase_();
  const names = Object.keys(getRequiredHeaders_());

  const checked = names.map(function(name) {
    return {
      sheet: name,
      exists: ss.getSheetByName(name) !== null
    };
  });

  const missing = checked
    .filter(function(item) {
      return !item.exists;
    })
    .map(function(item) {
      return item.sheet;
    });

  const result = {
    success: missing.length === 0,
    spreadsheet: ss.getName(),
    checkedSheets: checked,
    missingSheets: missing
  };

  Logger.log(JSON.stringify(result, null, 2));
  return result;
}


function testDatabaseConnection() {
  const ss = getDatabase_();

  const result = {
    success: true,
    spreadsheet: ss.getName(),
    spreadsheetId: ss.getId(),
    version: CONFIG.VERSION
  };

  Logger.log(JSON.stringify(result, null, 2));
  return result;
}


/* ============================================================
   4. GOOGLE SHEETS MENU
============================================================ */

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("CAREERVERSE")
    .addItem("Configure Admin Login", "configureAdminLogin")
    .addItem("Verify Database", "verifyDatabase")
    .addItem("Test Database Connection", "testDatabaseConnection")
    .addSeparator()
    .addItem("Install Registration Trigger", "installRegistrationTrigger")
    .addItem("Check Participant Capacity", "checkCapacity")
    .addToUi();
}


/* ============================================================
   5. API ENTRY POINTS
============================================================ */

function doGet() {
  return jsonResponse_({
    success: true,
    application: "CAREERVERSE",
    message: "CAREERVERSE API is running.",
    version: CONFIG.VERSION
  });
}


function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error("Request body is missing.");
    }

    const request = JSON.parse(e.postData.contents);

    if (!request.action) {
      throw new Error("API action is required.");
    }

    const data = routeRequest_(request);

    return jsonResponse_({
      success: true,
      data: data
    });

  } catch (error) {
    console.error(error.stack || error.message);

    return jsonResponse_({
      success: false,
      message: error.message || "Unexpected API error."
    });
  }
}


/* ============================================================
   6. API ROUTER
============================================================ */

function routeRequest_(request) {
  switch (request.action) {

    case "admin.login":
      return adminLogin_(request);

    case "admin.dashboard":
      requireAdmin_(request.token);
      return getDashboard_();

    case "admin.students":
      requireAdmin_(request.token);
      return getStudents_();

    case "admin.student.profile":
      requireAdmin_(request.token);
      return getStudentProfile_(request.studentId);

    case "admin.registrations":
      requireAdmin_(request.token);
      return getRegistrations_();

    case "admin.registration.approve":
      return approveRegistration_(request);

    case "admin.registration.reject":
      return rejectRegistration_(request);

    case "admin.capacity":
      requireAdmin_(request.token);
      return getCapacity_();

    case "student.login":
      return studentLogin_(request);

    case "student.progress.save":
      requireStudent_(request.token, request.studentId);
      return saveProgress_(request);

    case "student.assessment.save":
      requireStudent_(request.token, request.studentId);
      return saveAssessment_(request);

    case "student.logout":
      requireStudent_(request.token, request.studentId);
      CacheService.getScriptCache().remove(
        "STUDENT_" + request.token
      );
      return { message: "Student session ended." };

    case "admin.logout":
      requireAdmin_(request.token);
      CacheService.getScriptCache().remove(
        "ADMIN_" + request.token
      );
      return { message: "Admin session ended." };

    default:
      throw new Error("Unknown API action: " + request.action);
  }
}


/* ============================================================
   7. ADMINISTRATOR CONFIGURATION
============================================================ */

function configureAdminLogin() {
  const ui = SpreadsheetApp.getUi();
  const properties = PropertiesService.getScriptProperties();

  const usernameResult = ui.prompt(
    "CAREERVERSE Administrator Setup",
    "Enter administrator username:",
    ui.ButtonSet.OK_CANCEL
  );

  if (usernameResult.getSelectedButton() !== ui.Button.OK) {
    return;
  }

  const username = usernameResult.getResponseText().trim();

  if (!username) {
    ui.alert("Username cannot be empty.");
    return;
  }

  const passwordResult = ui.prompt(
    "CAREERVERSE Administrator Setup",
    "Enter administrator password (minimum 12 characters):",
    ui.ButtonSet.OK_CANCEL
  );

  if (passwordResult.getSelectedButton() !== ui.Button.OK) {
    return;
  }

  const password = passwordResult.getResponseText();

  if (password.length < 12) {
    ui.alert("Password must contain at least 12 characters.");
    return;
  }

  const salt = Utilities.getUuid();
  const hash = hashPassword_(password, salt);

  properties.setProperties({
    ADMIN_USERNAME: username,
    ADMIN_PASSWORD_HASH: hash,
    ADMIN_PASSWORD_SALT: salt
  });

  ui.alert("CAREERVERSE administrator credentials configured.");
}


/* ============================================================
   8. ADMIN AUTHENTICATION
============================================================ */

function adminLogin_(request) {
  const props = PropertiesService.getScriptProperties();

  const username = String(request.username || "").trim();
  const password = String(request.password || "");

  const savedUsername = props.getProperty("ADMIN_USERNAME");
  const savedHash = props.getProperty("ADMIN_PASSWORD_HASH");
  const salt = props.getProperty("ADMIN_PASSWORD_SALT");

  if (!savedUsername || !savedHash || !salt) {
    throw new Error("Administrator credentials are not configured.");
  }

  const cache = CacheService.getScriptCache();
  const attemptKey = "ADMIN_LOGIN_" + username.toLowerCase();
  const attempts = Number(cache.get(attemptKey) || 0);

  if (attempts >= CONFIG.ADMIN_LOGIN_ATTEMPT_LIMIT) {
    throw new Error("Too many login attempts. Try again later.");
  }

  const submittedHash = hashPassword_(password, salt);

  if (
    username !== savedUsername ||
    !constantTimeEqual_(submittedHash, savedHash)
  ) {
    cache.put(
      attemptKey,
      String(attempts + 1),
      CONFIG.ADMIN_LOGIN_LOCK_DURATION
    );

    throw new Error(
      "Invalid administrator credentials. Failed attempt " +
      (attempts + 1) + " of " +
      CONFIG.ADMIN_LOGIN_ATTEMPT_LIMIT + "."
    );
  }

  cache.remove(attemptKey);

  const token = Utilities.getUuid() + Utilities.getUuid();

  cache.put(
    "ADMIN_" + token,
    savedUsername,
    CONFIG.SESSION_DURATION
  );

  logActionSafe_(
    savedUsername,
    "ADMIN_LOGIN",
    "Administrator logged in."
  );

  return {
    token: token,
    username: savedUsername,
    expiresIn: CONFIG.SESSION_DURATION
  };
}


function requireAdmin_(token) {
  if (!token) {
    throw new Error("Administrator authentication required.");
  }

  const username = CacheService.getScriptCache().get(
    "ADMIN_" + token
  );

  if (!username) {
    throw new Error("Admin session expired. Please log in again.");
  }

  return username;
}


/* ============================================================
   9. REGISTRATION CAPTURE
============================================================ */

/**
 * Handles new Google Forms submissions.
 * The trigger is attached to the separate Registrations spreadsheet.
 */

function handleRegistrationSubmit(e) {
  if (!e || !e.range || !e.namedValues) {
    throw new Error("Invalid Google Forms submission event.");
  }

  const sourceSheet = e.range.getSheet();
  const sourceSpreadsheet = e.source;

  if (
    !sourceSpreadsheet ||
    sourceSpreadsheet.getId() !== REGISTRATION_SOURCE_SPREADSHEET_ID
  ) {
    throw new Error("Submission came from an unexpected spreadsheet.");
  }

  if (sourceSheet.getSheetId() !== REGISTRATION_SOURCE_SHEET_ID) {
    throw new Error("Submission came from an unexpected response sheet.");
  }

  const values = e.namedValues;

  const studentName = getFormValue_(values, [
    "Student Full Name"
  ]);

  const email = getFormValue_(values, [
    "Email Id"
  ]);

  const phone = getFormValue_(values, [
    "Mobile Number"
  ]);

  const registrationNumber = getFormValue_(values, [
    "Register Number"
  ]);

  const department = getFormValue_(values, [
    "Department"
  ]);

  const year = getFormValue_(values, [
    "Academic year"
  ]);

  const section = getFormValue_(values, [
    "Section"
  ]);

  const session = getFormValue_(values, [
    "Select Your CAREERVERSE LIVE Session"
  ]);

  if (!studentName) {
    throw new Error("Student Full Name is missing.");
  }

  if (!email && !phone) {
    throw new Error("Email Id or Mobile Number is required.");
  }

  const sourceRowKey = [
    sourceSpreadsheet.getId(),
    sourceSheet.getSheetId(),
    e.range.getRow()
  ].join(":");

  const result = createRegistration_({
    studentName: studentName,
    email: email,
    phone: phone,
    registrationNumber: registrationNumber,
    department: department,
    year: year,
    section: section,
    session: session,
    sourceRowKey: sourceRowKey
  });

  Logger.log(JSON.stringify(result));
  return result;
}


/**
 * Normalizes form headings to handle leading/trailing spaces,
 * capitalization and repeated spaces.
 */

function normalizeFormKey_(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}


function getFormValue_(namedValues, possibleNames) {
  const keys = Object.keys(namedValues || {});

  for (let i = 0; i < possibleNames.length; i++) {
    const wanted = normalizeFormKey_(possibleNames[i]);

    const matchedKey = keys.find(function(key) {
      return normalizeFormKey_(key) === wanted;
    });

    if (matchedKey !== undefined) {
      const value = namedValues[matchedKey];

      return Array.isArray(value)
        ? String(value[0] || "").trim()
        : String(value || "").trim();
    }
  }

  return "";
}


/**
 * Creates a pending registration.
 * Repeated delivery of the same source row is idempotent.
 * This function never approves a student.
 */

function createRegistration_(input) {
  const name = String(input.studentName || "").trim();
  const email = String(input.email || "").trim().toLowerCase();
  const phone = String(input.phone || "").trim();

  const registrationNumber = String(
    input.registrationNumber || ""
  ).trim();

  const department = String(input.department || "").trim();
  const year = String(input.year || "").trim();
  const section = String(input.section || "").trim();
  const session = String(input.session || "").trim();
  const sourceRowKey = String(input.sourceRowKey || "").trim();

  if (!name) {
    throw new Error("Student name is required.");
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Invalid email address.");
  }

  if (!email && !phone) {
    throw new Error("Email or phone number is required.");
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const existing = getAllRowsUnlocked_(
      CONFIG.SHEETS.LIVE
    );

    // Prevent importing the same Google Forms response twice.
    if (sourceRowKey) {
      const sameSourceRow = existing.find(function(row) {
        return String(row.sourceRowKey || "") === sourceRowKey;
      });

      if (sameSourceRow) {
        return {
          success: true,
          duplicate: true,
          registrationId: sameSourceRow.registrationId,
          status: sameSourceRow.status,
          message: "This form response was already imported."
        };
      }
    }

    // Prevent another pending/approved registration
    // for the same email address or phone number.
    const duplicate = existing.find(function(row) {
      const status = String(row.status || "").toLowerCase();

      const sameEmail = email &&
        String(row.email || "").trim().toLowerCase() === email;

      const samePhone = phone &&
        String(row.phone || "").trim() === phone;

      return status !== "rejected" &&
        (sameEmail || samePhone);
    });

    if (duplicate) {
      throw new Error(
        "A registration already exists for this email or phone."
      );
    }

    const id = "CVREG-" + Utilities.getUuid();
    const now = new Date().toISOString();

    const record = {
      registrationId: id,
      studentName: name,
      email: email,
      phone: phone,
      registrationNumber: registrationNumber,
      department: department,
      year: year,
      section: section,
      session: session,
      sourceRowKey: sourceRowKey,
      status: "Pending",
      registeredAt: now
    };

    appendRowUnlocked_(
      CONFIG.SHEETS.LIVE,
      record
    );

    return {
      success: true,
      registrationId: id,
      status: "Pending",
      message: "Registration submitted for administrator review."
    };

  } finally {
    lock.releaseLock();
  }
}


/**
 * Installs exactly one handleRegistrationSubmit trigger
 * on the separate Google Forms response spreadsheet.
 */

function installRegistrationTrigger() {
  const source = SpreadsheetApp.openById(
    REGISTRATION_SOURCE_SPREADSHEET_ID
  );

  const sourceSheet = source.getSheetById(
    REGISTRATION_SOURCE_SHEET_ID
  );

  if (!sourceSheet) {
    throw new Error("Google Forms response sheet was not found.");
  }

  const triggers = ScriptApp.getProjectTriggers();

  // Remove old copies of this handler, including the old
  // trigger attached to CAREERVERSE_DATABASE.
  triggers.forEach(function(trigger) {
    if (
      trigger.getHandlerFunction() === "handleRegistrationSubmit"
    ) {
      ScriptApp.deleteTrigger(trigger);
    }
  });

  ScriptApp.newTrigger("handleRegistrationSubmit")
    .forSpreadsheet(source)
    .onFormSubmit()
    .create();

  const result = {
    success: true,
    version: CONFIG.VERSION,
    sourceSpreadsheet: source.getName(),
    sourceSheet: sourceSheet.getName(),
    sourceSheetId: sourceSheet.getSheetId(),
    message: "Registration trigger installed on the form response spreadsheet."
  };

  Logger.log(JSON.stringify(result, null, 2));

  try {
    SpreadsheetApp.getUi().alert(
      "CAREERVERSE registration trigger installed.\n\n" +
      "Source: " + source.getName() + "\n" +
      "Sheet: " + sourceSheet.getName()
    );
  } catch (error) {
    // The function can also be run directly from the Apps Script editor.
  }

  return result;
}


/**
 * Checks the installed trigger configuration.
 */

function verifyRegistrationTrigger() {
  const triggers = ScriptApp.getProjectTriggers();

  const matching = triggers.filter(function(trigger) {
    return trigger.getHandlerFunction() === "handleRegistrationSubmit";
  });

  const result = {
    success: matching.length === 1,
    matchingTriggerCount: matching.length,
    expectedSourceSpreadsheetId: REGISTRATION_SOURCE_SPREADSHEET_ID,
    expectedSourceSheetId: REGISTRATION_SOURCE_SHEET_ID,
    triggers: matching.map(function(trigger) {
      return {
        handler: trigger.getHandlerFunction(),
        eventType: String(trigger.getEventType()),
        source: String(trigger.getTriggerSource())
      };
    })
  };

  Logger.log(JSON.stringify(result, null, 2));
  return result;
}


/* ============================================================
   10. REGISTRATION ADMINISTRATION
============================================================ */

function getRegistrations_() {
  return getAllRows_(CONFIG.SHEETS.LIVE);
}


function approveRegistration_(request) {
  const admin = requireAdmin_(request.token);

  const registrationId = String(
    request.registrationId || ""
  ).trim();

  if (!registrationId) {
    throw new Error("Registration ID is required.");
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(15000);

  try {
    const registration = findRowByKeyUnlocked_(
      CONFIG.SHEETS.LIVE,
      "registrationId",
      registrationId
    );

    if (!registration) {
      throw new Error("Registration not found.");
    }

    const status = String(
      registration.status || ""
    ).toLowerCase();

    if (status === "approved") {
      throw new Error("Registration is already approved.");
    }

    if (status === "rejected") {
      throw new Error("Rejected registrations cannot be approved.");
    }

    const batch = normalizeBatch_(
      request.batch || registration.session
    );

    if (!batch) {
      throw new Error(
        "Select Batch 1 or Batch 2 before approving."
      );
    }

    // Recovery protection:
    // If a previous approval wrote the access code but failed
    // before updating the registration status, reuse that ID.
    const existingAccess = getAllRowsUnlocked_(
      CONFIG.SHEETS.ACCESS_CODES
    ).find(function(row) {
      return String(row.registrationId || "") === registrationId;
    });

    if (existingAccess) {
      const existingStudent = findRowByKeyUnlocked_(
        CONFIG.SHEETS.STUDENTS,
        "studentId",
        existingAccess.studentId
      );

      if (!existingStudent) {
        throw new Error(
          "An access-code record exists but its student record is missing. " +
          "Review the database before retrying approval."
        );
      }

      upsertRowUnlocked_(
        CONFIG.SHEETS.LIVE,
        "registrationId",
        Object.assign({}, registration, {
          status: "Approved"
        })
      );

      logActionSafeUnlocked_(
        admin,
        "REGISTRATION_APPROVAL_RECOVERED",
        registrationId + " approval status recovered."
      );

      return {
        message: "Existing approval recovered.",
        registrationId: registrationId,
        studentId: existingAccess.studentId,
        accessCode: existingAccess.accessCode,
        batch: existingAccess.batch,
        capacity: getCapacityUnlocked_()
      };
    }

    const capacity = getCapacityUnlocked_();

    if (capacity.total >= CONFIG.MAX_PARTICIPANTS) {
      throw new Error(
        "CAREERVERSE has reached its total capacity of 100 participants."
      );
    }

    const studentId = generateStudentIdUnlocked_(batch);
    const accessCode = studentId;
    const now = new Date().toISOString();

    const student = {
      studentId: studentId,
      studentName: registration.studentName,
      email: registration.email || "",
      phone: registration.phone || "",
      registrationNumber:
        registration.registrationNumber || registration.registrationId,
      department: registration.department || "",
      section: registration.section || "",
      eventCode: "CAREERVERSE",
      status: "active",
      createdAt: now,
      updatedAt: now
    };

    const accessRecord = {
      accessCode: accessCode,
      studentId: studentId,
      registrationId: registrationId,
      studentName: registration.studentName,
      email: registration.email || "",
      phone: registration.phone || "",
      batch: batch,
      status: "active",
      issuedAt: now,
      approvedBy: admin,
      createdAt: now,
      updatedAt: now
    };

    // All approval writes occur while holding the same script lock.
    upsertRowUnlocked_(
      CONFIG.SHEETS.STUDENTS,
      "studentId",
      student
    );

    appendRowUnlocked_(
      CONFIG.SHEETS.ACCESS_CODES,
      accessRecord
    );

    upsertRowUnlocked_(
      CONFIG.SHEETS.LIVE,
      "registrationId",
      Object.assign({}, registration, {
        status: "Approved"
      })
    );

    logActionSafeUnlocked_(
      admin,
      "REGISTRATION_APPROVED",
      registrationId + " approved; batch " + batch
    );

    return {
      message: "Registration approved and access code issued.",
      registrationId: registrationId,
      studentId: studentId,
      accessCode: accessCode,
      batch: batch,
      capacity: getCapacityUnlocked_()
    };

  } finally {
    lock.releaseLock();
  }
}


function rejectRegistration_(request) {
  const admin = requireAdmin_(request.token);

  const registrationId = String(
    request.registrationId || ""
  ).trim();

  if (!registrationId) {
    throw new Error("Registration ID is required.");
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const registration = findRowByKeyUnlocked_(
      CONFIG.SHEETS.LIVE,
      "registrationId",
      registrationId
    );

    if (!registration) {
      throw new Error("Registration not found.");
    }

    if (
      String(registration.status).toLowerCase() === "approved"
    ) {
      throw new Error(
        "An approved registration cannot be rejected."
      );
    }

    if (
      String(registration.status).toLowerCase() === "rejected"
    ) {
      throw new Error("Registration is already rejected.");
    }

    upsertRowUnlocked_(
      CONFIG.SHEETS.LIVE,
      "registrationId",
      Object.assign({}, registration, {
        status: "Rejected"
      })
    );

    logActionSafeUnlocked_(
      admin,
      "REGISTRATION_REJECTED",
      registrationId + " rejected."
    );

    return {
      message: "Registration rejected.",
      registrationId: registrationId,
      status: "Rejected"
    };

  } finally {
    lock.releaseLock();
  }
}


/* ============================================================
   11. BATCH AND CAPACITY MANAGEMENT
============================================================ */

function normalizeBatch_(value) {
  const text = String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[_-]/g, " ")
    .replace(/\s+/g, " ");

  if (
    text === "1" ||
    text === "b1" ||
    text === "batch1" ||
    text === "batch 1"
  ) {
    return "BATCH1";
  }

  if (
    text === "2" ||
    text === "b2" ||
    text === "batch2" ||
    text === "batch 2"
  ) {
    return "BATCH2";
  }

  return "";
}


function generateStudentIdUnlocked_(batch) {
  const prefix = batch === "BATCH1"
    ? "CVTUB1-"
    : "CVTUB2-";

  const students = getAllRowsUnlocked_(
    CONFIG.SHEETS.STUDENTS
  );

  const codes = getAllRowsUnlocked_(
    CONFIG.SHEETS.ACCESS_CODES
  );

  const usedIds = new Set();

  students.forEach(function(row) {
    if (row.studentId) {
      usedIds.add(String(row.studentId));
    }
  });

  codes.forEach(function(row) {
    if (row.studentId) {
      usedIds.add(String(row.studentId));
    }

    if (row.accessCode) {
      usedIds.add(String(row.accessCode));
    }
  });

  let highest = 0;

  usedIds.forEach(function(id) {
    if (id.indexOf(prefix) === 0) {
      const number = Number(id.substring(prefix.length));

      if (Number.isInteger(number)) {
        highest = Math.max(highest, number);
      }
    }
  });

  return prefix + String(highest + 1).padStart(3, "0");
}


function getCapacityUnlocked_() {
  const students = getAllRowsUnlocked_(
    CONFIG.SHEETS.STUDENTS
  );

  const codes = getAllRowsUnlocked_(
    CONFIG.SHEETS.ACCESS_CODES
  );

  // Count unique issued IDs across both sheets.
  // Revoked or inactive IDs remain counted and are never recycled.
  const ids = new Set();

  students.forEach(function(row) {
    if (row.studentId) {
      ids.add(String(row.studentId));
    }
  });

  codes.forEach(function(row) {
    if (row.studentId) {
      ids.add(String(row.studentId));
    }
  });

  const batch1 = new Set();
  const batch2 = new Set();

  codes.forEach(function(row) {
    if (
      String(row.status || "").toLowerCase() !== "active"
    ) {
      return;
    }

    if (row.batch === "BATCH1" && row.studentId) {
      batch1.add(String(row.studentId));
    }

    if (row.batch === "BATCH2" && row.studentId) {
      batch2.add(String(row.studentId));
    }
  });

  const total = ids.size;

  return {
    total: total,
    maximum: CONFIG.MAX_PARTICIPANTS,
    remaining: Math.max(0, CONFIG.MAX_PARTICIPANTS - total),
    batch1: batch1.size,
    batch2: batch2.size,
    full: total >= CONFIG.MAX_PARTICIPANTS
  };
}


function getCapacity_() {
  return getCapacityUnlocked_();
}


function checkCapacity() {
  const result = getCapacity_();

  Logger.log(JSON.stringify(result, null, 2));

  try {
    SpreadsheetApp.getUi().alert(
      "CAREERVERSE capacity\n\n" +
      "Total issued student IDs: " + result.total + "\n" +
      "Maximum: " + result.maximum + "\n" +
      "Remaining: " + result.remaining + "\n" +
      "Batch 1 active: " + result.batch1 + "\n" +
      "Batch 2 active: " + result.batch2
    );
  } catch (error) {
    // Allows this function to run from the Apps Script editor.
  }

  return result;
}


/* ============================================================
   12. STUDENT LOGIN — APPROVED ACCESS CODE ONLY
============================================================ */

function studentLogin_(request) {
  const accessCode = String(
    request.accessCode || ""
  ).trim().toUpperCase();

  if (!accessCode) {
    throw new Error("Approved access code is required.");
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  let student;

  try {
    const access = findRowByKeyUnlocked_(
      CONFIG.SHEETS.ACCESS_CODES,
      "accessCode",
      accessCode
    );

    if (!access) {
      throw new Error("Invalid access code.");
    }

    if (
      String(access.status || "").toLowerCase() !== "active"
    ) {
      throw new Error("This access code is not active.");
    }

    student = findRowByKeyUnlocked_(
      CONFIG.SHEETS.STUDENTS,
      "studentId",
      access.studentId
    );

    if (!student) {
      throw new Error("Student record not found.");
    }

    if (
      String(student.status || "").toLowerCase() !== "active"
    ) {
      throw new Error("Student account is not active.");
    }

  } finally {
    lock.releaseLock();
  }

  const token = Utilities.getUuid() + Utilities.getUuid();

  CacheService.getScriptCache().put(
    "STUDENT_" + token,
    String(student.studentId),
    CONFIG.SESSION_DURATION
  );

  return {
    student: student,
    token: token,
    expiresIn: CONFIG.SESSION_DURATION
  };
}


function requireStudent_(token, studentId) {
  if (!token || !studentId) {
    throw new Error("Student authentication required.");
  }

  const savedId = CacheService.getScriptCache().get(
    "STUDENT_" + token
  );

  if (
    !savedId ||
    savedId !== String(studentId)
  ) {
    throw new Error("Invalid or expired student session.");
  }

  return savedId;
}


/* ============================================================
   13. STUDENT PROGRESS
============================================================ */

function saveProgress_(request) {
  const studentId = String(request.studentId || "").trim();
  const chapter = Number(request.chapter);
  const completed = request.completed === true;

  if (
    !Number.isInteger(chapter) ||
    chapter < 1 ||
    chapter > CONFIG.TOTAL_CHAPTERS
  ) {
    throw new Error("Invalid chapter number.");
  }

  let activityData = null;

  if (
    request.activityData !== undefined &&
    request.activityData !== null
  ) {
    if (
      typeof request.activityData !== "object" ||
      Array.isArray(request.activityData)
    ) {
      throw new Error("Activity data must be a JSON object.");
    }

    activityData = JSON.stringify(request.activityData);

    if (activityData.length > CONFIG.MAX_ACTIVITY_DATA_LENGTH) {
      throw new Error("Activity data is too large.");
    }
  }

  const id = studentId + "-CH" + chapter;
  const lock = LockService.getScriptLock();

  lock.waitLock(10000);

  try {
    const existing = findRowByKeyUnlocked_(
      CONFIG.SHEETS.PROGRESS,
      "progressId",
      id
    );

    const now = new Date().toISOString();

    const record = {
      progressId: id,
      studentId: studentId,
      chapter: chapter,
      completed: completed,
      completedAt: completed
        ? (existing && existing.completedAt
          ? existing.completedAt
          : now)
        : "",
      updatedAt: now,
      activityData: activityData !== null
        ? activityData
        : (existing ? existing.activityData || "" : "")
    };

    upsertRowUnlocked_(
      CONFIG.SHEETS.PROGRESS,
      "progressId",
      record
    );

    return {
      message: "Chapter progress saved.",
      progress: record
    };

  } finally {
    lock.releaseLock();
  }
}


/* ============================================================
   14. ASSESSMENT SUBMISSIONS
============================================================ */

function saveAssessment_(request) {
  const studentId = String(request.studentId || "").trim();
  const chapter = Number(request.chapter);
  const score = Number(request.score);
  const total = Number(request.totalQuestions);

  if (
    !Number.isInteger(chapter) ||
    chapter < 1 ||
    chapter > CONFIG.TOTAL_CHAPTERS
  ) {
    throw new Error("Invalid chapter number.");
  }

  if (
    !Number.isFinite(score) ||
    !Number.isFinite(total) ||
    total <= 0 ||
    score < 0 ||
    score > total
  ) {
    throw new Error("Invalid assessment score.");
  }

  const record = {
    submissionId: Utilities.getUuid(),
    studentId: studentId,
    chapter: chapter,
    assessmentType: String(request.assessmentType || "quiz"),
    score: score,
    totalQuestions: total,
    percentage: Math.round((score / total) * 100),
    responseData: JSON.stringify(request.responseData || {}),
    submittedAt: new Date().toISOString()
  };

  appendRow_(CONFIG.SHEETS.ASSESSMENTS, record);

  return {
    message: "Assessment result saved.",
    result: record
  };
}


/* ============================================================
   15. ADMIN DASHBOARD
============================================================ */

function getDashboard_() {
  const students = getAllRows_(CONFIG.SHEETS.STUDENTS);
  const assessments = getAllRows_(CONFIG.SHEETS.ASSESSMENTS);
  const progress = getAllRows_(CONFIG.SHEETS.PROGRESS);
  const registrations = getAllRows_(CONFIG.SHEETS.LIVE);

  const completed = progress.filter(function(row) {
    return String(row.completed).toLowerCase() === "true";
  }).length;

  const scores = assessments.map(function(row) {
    return Number(row.percentage) || 0;
  });

  const average = scores.length
    ? Math.round(scores.reduce(function(a, b) {
        return a + b;
      }, 0) / scores.length)
    : 0;

  const capacity = getCapacity_();

  return {
    totalStudents: students.length,
    totalAssessments: assessments.length,
    completedChapters: completed,
    liveRegistrations: registrations.length,
    pendingRegistrations: registrations.filter(function(row) {
      return String(row.status).toLowerCase() === "pending";
    }).length,
    averageScore: average,
    capacity: capacity
  };
}


/* ============================================================
   16. ADMIN STUDENT LIST
============================================================ */

function getStudents_() {
  const students = getAllRows_(CONFIG.SHEETS.STUDENTS);
  const progress = getAllRows_(CONFIG.SHEETS.PROGRESS);
  const assessments = getAllRows_(CONFIG.SHEETS.ASSESSMENTS);

  return students.map(function(student) {
    const id = String(student.studentId);

    return Object.assign({}, student, {
      completedChapters: progress.filter(function(row) {
        return String(row.studentId) === id &&
          String(row.completed).toLowerCase() === "true";
      }).length,

      assessmentCount: assessments.filter(function(row) {
        return String(row.studentId) === id;
      }).length
    });
  });
}


/* ============================================================
   17. ADMIN STUDENT PROFILE
============================================================ */

function getStudentProfile_(studentId) {
  studentId = String(studentId || "").trim();

  if (!studentId) {
    throw new Error("Student ID is required.");
  }

  const student = findRowByKey_(
    CONFIG.SHEETS.STUDENTS,
    "studentId",
    studentId
  );

  if (!student) {
    throw new Error("Student record not found.");
  }

  const progress = getAllRows_(CONFIG.SHEETS.PROGRESS)
    .filter(function(row) {
      return String(row.studentId) === studentId;
    })
    .sort(function(a, b) {
      return Number(a.chapter) - Number(b.chapter);
    });

  const assessments = getAllRows_(CONFIG.SHEETS.ASSESSMENTS)
    .filter(function(row) {
      return String(row.studentId) === studentId;
    });

  const completed = progress.filter(function(row) {
    return String(row.completed).toLowerCase() === "true";
  }).length;

  const scores = assessments.map(function(row) {
    return Number(row.percentage) || 0;
  });

  return {
    student: student,
    progress: progress,
    assessments: assessments,
    summary: {
      totalChapters: CONFIG.TOTAL_CHAPTERS,
      completedChapters: completed,
      remainingChapters: Math.max(
        0,
        CONFIG.TOTAL_CHAPTERS - completed
      ),
      totalAssessments: assessments.length,
      averageScore: scores.length
        ? Math.round(scores.reduce(function(a, b) {
            return a + b;
          }, 0) / scores.length)
        : 0
    }
  };
}


/* ============================================================
   18. DATABASE READ HELPERS
============================================================ */

function getAllRows_(sheetName) {
  return getAllRowsUnlocked_(sheetName);
}


function getAllRowsUnlocked_(sheetName) {
  const sheet = getSheet_(sheetName);
  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();

  if (lastRow <= 1 || lastColumn === 0) {
    return [];
  }

  const values = sheet.getRange(
    1, 1, lastRow, lastColumn
  ).getValues();

  const headers = values[0];

  return values.slice(1)
    .filter(function(row) {
      return row.some(function(value) {
        return value !== "";
      });
    })
    .map(function(row) {
      const result = {};

      headers.forEach(function(header, index) {
        if (header !== "") {
          result[header] = row[index];
        }
      });

      return result;
    });
}


function findRowByKey_(sheetName, keyName, keyValue) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    return findRowByKeyUnlocked_(
      sheetName,
      keyName,
      keyValue
    );
  } finally {
    lock.releaseLock();
  }
}


function findRowByKeyUnlocked_(sheetName, keyName, keyValue) {
  const sheet = getSheet_(sheetName);
  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();

  if (lastRow <= 1 || lastColumn === 0) {
    return null;
  }

  const values = sheet.getRange(
    1, 1, lastRow, lastColumn
  ).getValues();

  const headers = values[0];
  const keyIndex = headers.indexOf(keyName);

  if (keyIndex === -1) {
    throw new Error("Database key not found: " + keyName);
  }

  for (let i = 1; i < values.length; i++) {
    if (String(values[i][keyIndex]) === String(keyValue)) {
      const result = {};

      headers.forEach(function(header, index) {
        if (header !== "") {
          result[header] = values[i][index];
        }
      });

      return result;
    }
  }

  return null;
}


/* ============================================================
   19. DATABASE WRITE HELPERS
============================================================ */

function appendRow_(sheetName, record) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    appendRowUnlocked_(sheetName, record);
  } finally {
    lock.releaseLock();
  }
}


function appendRowUnlocked_(sheetName, record) {
  const sheet = getSheet_(sheetName);
  const lastColumn = sheet.getLastColumn();

  if (lastColumn === 0) {
    throw new Error("Missing headers in sheet: " + sheetName);
  }

  const headers = sheet.getRange(
    1, 1, 1, lastColumn
  ).getValues()[0];

  const row = headers.map(function(header) {
    return Object.prototype.hasOwnProperty.call(record, header)
      ? record[header]
      : "";
  });

  sheet.appendRow(row);
}


function upsertRowUnlocked_(sheetName, keyName, record) {
  const sheet = getSheet_(sheetName);
  const lastColumn = sheet.getLastColumn();

  if (lastColumn === 0) {
    throw new Error("Missing headers in sheet: " + sheetName);
  }

  const headers = sheet.getRange(
    1, 1, 1, lastColumn
  ).getValues()[0];

  const keyIndex = headers.indexOf(keyName);

  if (keyIndex === -1) {
    throw new Error("Database key not found: " + keyName);
  }

  if (
    record[keyName] === undefined ||
    record[keyName] === null ||
    record[keyName] === ""
  ) {
    throw new Error("Record key is required: " + keyName);
  }

  const lastRow = sheet.getLastRow();
  let existingRow = -1;
  let existingValues = [];

  if (lastRow > 1) {
    const keys = sheet.getRange(
      2, keyIndex + 1, lastRow - 1, 1
    ).getValues();

    for (let i = 0; i < keys.length; i++) {
      if (String(keys[i][0]) === String(record[keyName])) {
        existingRow = i + 2;
        existingValues = sheet.getRange(
          existingRow, 1, 1, lastColumn
        ).getValues()[0];
        break;
      }
    }
  }

  const newRow = headers.map(function(header, index) {
    if (Object.prototype.hasOwnProperty.call(record, header)) {
      return record[header] === undefined ? "" : record[header];
    }

    return existingRow === -1 ? "" : existingValues[index];
  });

  if (existingRow === -1) {
    sheet.appendRow(newRow);
  } else {
    sheet.getRange(
      existingRow, 1, 1, newRow.length
    ).setValues([newRow]);
  }

  return {
    success: true,
    row: existingRow === -1 ? sheet.getLastRow() : existingRow
  };
}


/* ============================================================
   20. ACTIVITY LOGGING
============================================================ */

/**
 * Use outside an existing script lock.
 */

function logActionSafe_(adminId, action, description) {
  try {
    appendRow_(CONFIG.SHEETS.LOGS, {
      logId: Utilities.getUuid(),
      adminId: adminId,
      action: action,
      description: description,
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    console.error("Activity logging failed: " + error.message);
  }
}


/**
 * Use only when the caller already holds ScriptLock.
 */

function logActionSafeUnlocked_(adminId, action, description) {
  try {
    appendRowUnlocked_(CONFIG.SHEETS.LOGS, {
      logId: Utilities.getUuid(),
      adminId: adminId,
      action: action,
      description: description,
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    console.error("Activity logging failed: " + error.message);
  }
}


/* ============================================================
   21. SECURITY HELPERS
============================================================ */

function hashPassword_(password, salt) {
  const digest = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    salt + ":" + password,
    Utilities.Charset.UTF_8
  );

  return Utilities.base64Encode(digest);
}


function constantTimeEqual_(a, b) {
  if (a.length !== b.length) {
    return false;
  }

  let difference = 0;

  for (let i = 0; i < a.length; i++) {
    difference |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return difference === 0;
}


/* ============================================================
   22. JSON RESPONSE
============================================================ */

function jsonResponse_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}


/* ============================================================
   23. REGISTRATION SOURCE DIAGNOSTIC
============================================================ */

function inspectRegistrationSource() {
  const source = SpreadsheetApp.openById(
    REGISTRATION_SOURCE_SPREADSHEET_ID
  );

  const result = {
    spreadsheet: source.getName(),
    spreadsheetId: source.getId(),
    sheets: source.getSheets().map(function(sheet) {
      return {
        name: sheet.getName(),
        sheetId: sheet.getSheetId(),
        headers: sheet.getRange(
          1,
          1,
          1,
          sheet.getLastColumn()
        ).getDisplayValues()[0]
      };
    })
  };

  Logger.log(JSON.stringify(result, null, 2));
  return result;
}
