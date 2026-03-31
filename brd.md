# Business Requirements Document (BRD)

## Generic Mobile Onboarding Journey

## 1. Introduction

This BRD defines business requirements for onboarding field users in a mobile application so they can start working after completing required verification and approvals.

The onboarding journey includes:
- Mobile sign-up and OTP verification
- Device security setup (biometric/passcode)
- Identity verification
- Organization/program association
- Consent and agreement acceptance
- Payout account verification (where applicable)
- Risk screening
- Supervisor selection and approval
- User account creation

## 2. Business Objectives

- Provide a compliant, easy-to-follow self-onboarding journey.
- Reduce onboarding turnaround time while maintaining control checks.
- Ensure only verified users can access operational features.
- Capture required approvals before account activation.
- Support interruption and resume from the last completed stage.

## 3. Scope

### In Scope

- End-to-end mobile onboarding flow from app launch to account creation.
- Multi-step verification, consent capture, and approval workflow.
- Conditional payout account validation when direct payouts apply.
- Resume capability for partially completed onboarding sessions.

### Out of Scope

- Core business transaction processing after onboarding.
- Actual payout disbursement processing.
- Admin-initiated or invite-only onboarding flows.

## 4. Stakeholders

- Business Owner
- Product Owner
- Engineering Team
- Compliance and Risk Team
- Operations Team

## 5. Assumptions and Constraints

### Assumptions

- Users onboard using personal mobile devices.
- Required master/reference data is available to the app.
- Supervisor approval is captured through a system-supported approval channel.
- Account creation is triggered only after mandatory checks pass.

### Constraints

- Mandatory verification stages must be completed before activation.
- Some checks depend on external systems and may have temporary failures.
- Security controls (OTP and passcode, with optional biometrics) are required.
- Risk screening failure blocks onboarding.

## 6. Use Case Requirements

### UC-01 - App Launch and Splash Screen

**Description:** User opens the app and sees the splash screen before onboarding continues.  
**Primary Actor:** User  
**Preconditions:** App is installed on the device.  
**Postconditions:** User lands on sign-up/start screen.

**Main Flow**
1. User launches the app.
2. Splash screen is displayed.
3. System navigates to onboarding start.

**Alternate Flows**
1. If user exited earlier, system resumes from the last completed stage.

**Exception Flows**
1. App initialization fails; user sees retry/exit options.

---

### UC-02 - Mobile Sign-up and OTP Verification

**Description:** User verifies mobile number using OTP.  
**Primary Actor:** User  
**Preconditions:** App launched; user not fully onboarded.  
**Postconditions:** Verified session is established.

**Main Flow**
1. User enters mobile number.
2. System sends OTP.
3. User submits OTP.
4. System validates OTP and proceeds.

**Alternate Flows**
1. OTP not received; user requests resend (rate-limited).
2. OTP expired; user requests new OTP.

**Exception Flows**
1. Maximum invalid attempts reached; temporary lock applied.
2. Network/service failure; retry option shown.

---

### UC-03 - Device Security Setup

**Description:** User sets required passcode and optional biometric login.  
**Primary Actor:** User  
**Preconditions:** OTP verification completed.  
**Postconditions:** Device-level access controls are configured.

**Main Flow**
1. System prompts for passcode creation.
2. User sets and confirms passcode.
3. User optionally enables biometrics.
4. System stores settings securely and proceeds.

**Alternate Flows**
1. Biometric unsupported; passcode-only flow continues.
2. User skips biometric setup; can enable later.

**Exception Flows**
1. Device security setup fails; show guidance and retry.

---

### UC-04 - Identity Data Capture and Primary Verification

**Description:** User enters identity details for primary verification.  
**Primary Actor:** User  
**Preconditions:** Device security setup completed.  
**Postconditions:** Primary identity check passes.

**Main Flow**
1. User enters required identity details.
2. System validates input format.
3. System submits data to verification service.
4. Verification result is stored; flow proceeds.

**Alternate Flows**
1. Minor data mismatch; user corrects and resubmits.
2. Temporary provider error; retry is allowed.

**Exception Flows**
1. Verification failure blocks progression.

---

### UC-05 - Secondary Identity Verification and Linking

**Description:** User completes a second-factor identity check and identity linking status is recorded.  
**Primary Actor:** User  
**Preconditions:** Primary verification completed.  
**Postconditions:** Secondary verification status stored.

**Main Flow**
1. User initiates secondary verification.
2. System sends OTP/challenge through the provider.
3. User submits response.
4. System verifies and stores linking status.

**Alternate Flows**
1. OTP/challenge expired or not received; resend available.
2. Existing verified link found; system proceeds.

**Exception Flows**
1. Verification/linking failure blocks progression.

---

### UC-06 - Organization Selection and Compensation Applicability

**Description:** User selects organization/program; system determines compensation applicability.  
**Primary Actor:** User  
**Preconditions:** Identity checks completed.  
**Postconditions:** Selection and derived eligibility flag are stored.

**Main Flow**
1. User searches and selects organization/program.
2. System derives compensation applicability.
3. System routes to the correct agreement variant.

**Alternate Flows**
1. Organization not found; user refreshes search or seeks support.
2. User changes selection; system recalculates applicability.

**Exception Flows**
1. Reference data fetch fails; user sees retry option.

---

### UC-07 - Agreement and Consent Capture

**Description:** System shows the correct agreement variant and captures user consent.  
**Primary Actor:** User  
**Preconditions:** Organization selection completed.  
**Postconditions:** Consent is saved with metadata.

**Main Flow**
1. System displays applicable agreement.
2. User reviews and accepts terms.
3. System stores consent record and proceeds.

**Alternate Flows**
1. User defers review; progression remains blocked until consent.

**Exception Flows**
1. Consent save fails; retry required before proceeding.

---

### UC-08 - Payout Account Capture and Verification (Conditional)

**Description:** If direct payout applies, user provides payout details and system verifies ownership match.  
**Primary Actor:** User  
**Preconditions:** Agreement accepted and direct payout applicable.  
**Postconditions:** Payout destination is verified.

**Main Flow**
1. User selects payout method.
2. User enters required account identifiers.
3. System validates destination and ownership/name match.
4. On success, flow proceeds.

**Alternate Flows**
1. User switches payout method if first method fails.
2. Minor variance handling follows provider rules (if available).

**Exception Flows**
1. Invalid destination or ownership mismatch blocks progression.

---

### UC-09 - Risk Screening

**Description:** System performs risk and duplication checks before supervisor submission.  
**Primary Actor:** System  
**Preconditions:** Required verification stages completed.  
**Postconditions:** Risk outcome recorded.

**Main Flow**
1. System runs configured risk checks.
2. System runs duplicate detection checks.
3. If checks pass, system proceeds.

**Alternate Flows**
1. Inconclusive result due to temporary error; retry later.

**Exception Flows**
1. Risk failure blocks onboarding and notifies user.

---

### UC-10 - Supervisor Selection and Location Mapping

**Description:** User selects supervisor and maps allowed work locations.  
**Primary Actor:** User  
**Preconditions:** Risk screening passed.  
**Postconditions:** Approval request is submitted.

**Main Flow**
1. User searches and selects supervisor.
2. User selects region/city.
3. User selects one or more mapped work locations (up to configured limit).
4. User submits request for approval.

**Alternate Flows**
1. User edits mapping before submission.
2. Unknown supervisor identifier; user corrects and retries.

**Exception Flows**
1. Data fetch/submission failure; retry with error details.

---

### UC-11 - Supervisor Approval Decision

**Description:** Supervisor reviews and approves/rejects onboarding request.  
**Primary Actor:** Supervisor  
**Preconditions:** Approval request submitted.  
**Postconditions:** Approval status is stored.

**Main Flow**
1. Supervisor reviews user and mapping details.
2. Supervisor submits approve/reject decision.
3. System records decision and updates mapping status.

**Alternate Flows**
1. No response in configured time; reminder is sent.
2. Rejection allows user to correct details and resubmit.

**Exception Flows**
1. Approval channel delivery failure triggers resend logic.
2. Status update failure remains pending until retry succeeds.

---

### UC-12 - User Account Creation and Confirmation

**Description:** After approval, system creates user account and confirms outcome.  
**Primary Actor:** System  
**Preconditions:** Supervisor approval granted.  
**Postconditions:** Onboarding is complete and account is active.

**Main Flow**
1. System creates user account and persists profile.
2. System displays success confirmation.
3. User is redirected to home/dashboard.

**Alternate Flows**
1. If user returns later, system resumes at confirmation once approval exists.

**Exception Flows**
1. Account creation fails; failure state and retry guidance are shown.

## 7. Non-Functional Requirements

- **Security and Privacy:** Sensitive data encrypted in transit and at rest; audited consent and verification events.
- **Reliability:** Retry and fallback handling for external dependencies.
- **Usability:** Clear step-by-step flow, searchable selections, and understandable errors.
- **Performance:** Responsive screens and bounded response times for critical actions.
- **Resilience:** Session resume from the last successful stage.
- **Auditability:** End-to-end event logs for compliance review.

## 8. Acceptance Criteria

- Mandatory onboarding stages are enforced before activation.
- Users can resume from their last successfully completed stage.
- Agreement variant is selected by system-derived applicability.
- Conditional payout verification is enforced when direct payout applies.
- Risk failure blocks onboarding.
- Account creation occurs only after supervisor approval.

## 9. Sign-Off

- **Business Owner:** ____________________
- **Product Owner:** _____________________
- **Compliance Lead:** ___________________
- **Date:** ______________________________
