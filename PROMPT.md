# IMPLEMENTATION PROMPT — Expert (Trainer) System for Business Plans

## CONTEXT

You have already analyzed this project. Here is a summary of key findings and decisions made by the project owner. Implement everything described below step by step. After each step, briefly report what was done.

**Stack reminder:** Next.js 15 (App Router), TypeScript, MongoDB/Mongoose, custom JWT auth (jose), Resend + Nodemailer email, SCSS Modules, MUI Joy/Material, Formik + Yup.

---

## CRITICAL RULES

1. **DO NOT break AI generation.** The existing AI plan flow (universalService.createOrder with planType "default") must continue working exactly as before.
2. **DO NOT touch CV orders or training plans.** We are only working with Universal Orders (business plans).
3. **DO NOT create a separate admin panel.** The expert gets a personal profile page (like a regular user profile but with different content).
4. **Match the existing code style** — SCSS modules, Formik forms, same patterns as existing components.
5. **Test that existing flows still work** after each change.

---

## BUSINESS DECISIONS (answers to your questions)

1. **Expert earnings = token-to-currency conversion.** However many tokens the user spent on the order — the expert receives the equivalent in currency. Define a conversion rate constant (e.g., `TOKENS_TO_CURRENCY_RATE` in constants or env). Example: if 1 token = 0.1 USD, and user spent 5000 tokens, expert earns 500 USD equivalent. Store expert balance as a number in currency units.

2. **Specializations are business-plan focused.** These are NOT fitness/training specializations. Examples: "Startup Business Plan", "Restaurant Business Plan", "E-commerce Business Plan", "SaaS Business Plan", "Real Estate Business Plan", "Marketing Strategy", "Financial Planning", "Franchise Business Plan", "Non-Profit Business Plan", "Import/Export Business Plan". The expert picks their specializations during registration. The user picks a specialization/category when ordering. The system matches them.

3. **PDF storage: local for now.** Store uploaded PDFs in `public/uploads/expert-pdfs/`. Yes, this won't persist on Vercel redeploys — that's acceptable for MVP. We'll migrate to S3 later.

4. **Expert profile, NOT admin panel.** The expert's profile page shows: their orders (open/closed), balance, withdrawal button. When they request withdrawal → email to admin (ADMIN_EMAIL env var) with expert details and amount. Email to expert confirming the request is being processed.

5. **Expert CANNOT be a regular user.** Roles are mutually exclusive. If role === "expert", they cannot access /dashboard (order creation) or place orders. If role === "user", they cannot access /expert/* routes.

6. **Specialization matching:** When user creates an order and picks a specialization, find experts whose `specializations` array includes that value. Pick the one with the fewest active (non-completed) orders. **If NO expert matches the specialization — assign to ANY expert with the fewest active orders.** There must always be an assignment.

7. **Only Universal Orders (business plans).** Ignore CVOrder, AiOrder, training categories entirely. The expert system applies only to UniversalOrder with planType "reviewed".

8. **Redesign the order creation form** — make it visually better and larger, but DO NOT change the underlying generation logic. Just improve the UI/UX of ManualGenerator.tsx.

---

## IMPLEMENTATION STEPS

### STEP 1: Extend User Model for Expert Role

**Modify:**
- `src/backend/models/user.model.ts` — add `"expert"` to role enum. Add fields:
  - `specializations: [String]` (default: [])
  - `expertBio: String` (default: "")
  - `expertBalance: Number` (default: 0)
  - `expertAvatar: String` (default: "")
  - `isExpertVerified: Boolean` (default: false)
  - `paymentDetails: String` (default: "" — IBAN or card number for withdrawals)
- `src/backend/types/user.types.ts` — update IUserSchema and UserType with new fields
- `src/types/user.types.ts` — update IUser interface and UserRole type to include "expert"

**Create:**
- `src/resources/specializations.ts` — export array of business plan specializations:
```typescript
export const EXPERT_SPECIALIZATIONS = [
  "Startup Business Plan",
  "Restaurant & Food Business Plan",
  "E-commerce Business Plan",
  "SaaS & Tech Business Plan",
  "Real Estate Business Plan",
  "Marketing Strategy Plan",
  "Financial & Investment Plan",
  "Franchise Business Plan",
  "Non-Profit Organization Plan",
  "Import/Export Business Plan",
  "Retail Business Plan",
  "Healthcare Business Plan",
] as const;
```

Also add token-to-currency rate constant:
- In `src/resources/constants.ts` or create `src/resources/pricing.ts`:
```typescript
export const TOKENS_TO_CURRENCY_RATE = 0.1; // 1 token = 0.1 USD → 5000 tokens = 500 USD
```

---

### STEP 2: Expert Registration & Login

**Modify:**
- `src/components/widgets/sign-up/SignUp.tsx` — add a toggle/tab at the top: "Sign Up as User" / "Sign Up as Expert". When "Expert" is selected, show additional fields:
  - Specializations multi-select (checkboxes or MUI multi-select) from the EXPERT_SPECIALIZATIONS list
  - Bio textarea
  - Payment details (IBAN/card) — optional at registration, can be filled later
- `src/validationSchemas/sign-up/schema.ts` — add conditional validation: if role === "expert", specializations must have at least 1 item
- `src/backend/services/auth.service.ts` — accept role and specializations in register(). If role === "expert", save them to the user document
- `src/backend/controllers/auth.controller.ts` — pass role/specializations from request body to register()
- `src/app/api/auth/register/route.ts` — if needed, update to pass new fields

**Modify login redirect:**
- `src/validationSchemas/sign-in/schema.ts` — in signInOnSubmit(), after successful login, check user.role:
  - If "expert" → redirect to `/expert`
  - If "user" → redirect to `/` (existing behavior)

**Modify:**
- `src/components/widgets/sign-in/SignIn.tsx` — add a subtle note or toggle: "Login as Expert" (can just be text or link). The actual login API doesn't change — the redirect logic handles it based on role in the response.

---

### STEP 3: Expert Route Protection

**Modify:**
- `src/components/features/protected-route/authRoutes.ts` — add expert routes to protected list
- `src/components/features/protected-route/ProtectedRoute.tsx` — add role-based checks:
  - If path starts with `/expert` and user.role !== "expert" → redirect to `/`
  - If path is `/dashboard` and user.role === "expert" → redirect to `/expert`
  - If path is `/profile` and user.role === "expert" → redirect to `/expert`

**Modify:**
- `src/components/layout/header/Header.tsx` (or wherever navigation links are) — show different nav items based on role:
  - User: Dashboard, Profile (existing)
  - Expert: "My Orders", "Profile" → pointing to /expert routes

---

### STEP 4: Expert Profile Page

**Create the expert profile area under `/expert`:**

- `src/app/expert/page.tsx` — main expert profile page
- `src/components/features/expert-profile/ExpertProfile.tsx` — main component with tabs:
  - **Orders tab**: list of all orders assigned to this expert
  - **Balance tab**: current balance + withdrawal form
  - **Profile tab**: edit bio, specializations, avatar, payment details

- `src/components/widgets/expert-orders-list/ExpertOrdersList.tsx` — table/cards of orders with:
  - Order ID, client name, specialization, date, status
  - Status badges: `pending` (yellow), `in_progress` (blue), `done` (green)
  - Action buttons:
    - "Take Order" (pending → in_progress)
    - "Upload PDF & Complete" (in_progress → done) — opens file upload dialog

- `src/components/widgets/expert-balance/ExpertBalance.tsx` — shows:
  - Current balance (in currency)
  - Total earned
  - Withdrawal button → opens WithdrawalForm

- `src/components/widgets/withdrawal-form/WithdrawalForm.tsx` — Formik form:
  - Amount to withdraw (max = current balance)
  - Payment details (IBAN/card) — pre-filled from profile if available
  - Submit → POST /api/expert/withdrawals
  - On submit: deduct 20% commission, show net amount

- `src/components/widgets/expert-profile-edit/ExpertProfileEdit.tsx` — edit form:
  - Name, bio, specializations (multi-select), payment details, avatar upload

**Create SCSS modules for each component** — match existing design patterns (blue palette, Poppins font, card-based layout).

---

### STEP 5: Expert API Routes

**Create:**
- `src/app/api/expert/orders/route.ts` — GET: fetch all orders assigned to the logged-in expert (query UniversalOrder where expertId === user._id). Protected by auth middleware + role check.

- `src/app/api/expert/orders/[id]/take/route.ts` — PATCH: expert takes order (status: pending → in_progress). Validate that the order belongs to this expert.

- `src/app/api/expert/orders/[id]/complete/route.ts` — POST: expert uploads PDF and completes order.
  - Accept multipart/form-data with PDF file
  - Save PDF to `public/uploads/expert-pdfs/`
  - Update order: status → "done", pdfUrl → file path
  - Update expert: expertBalance += (order.totalTokens * TOKENS_TO_CURRENCY_RATE)
  - Send email to user: "Your business plan is ready! Download it from your profile."
  - Send email to admin: "Order #X completed by expert Y."

- `src/app/api/expert/profile/route.ts` — GET: fetch expert profile. PUT: update bio, specializations, paymentDetails, avatar.

- `src/app/api/expert/withdrawals/route.ts`:
  - GET: fetch withdrawal history for this expert
  - POST: create withdrawal request
    - Validate: amount <= expertBalance
    - Calculate: commission = amount * 0.2, netAmount = amount * 0.8
    - Deduct amount from expertBalance
    - Create Withdrawal record
    - Send email to ADMIN_EMAIL: "Expert [Name] ([email]) requests withdrawal of [amount]. Commission: [20%]. Net payout: [netAmount]. Payment details: [IBAN/card]."
    - Send email to expert: "Your withdrawal request for [amount] is being processed. Commission: 20%. You will receive [netAmount]. We'll notify you when it's done."

**Create:**
- `src/backend/models/withdrawal.model.ts`:
```typescript
{
  expertId: ObjectId (ref: "User"),
  amount: Number,
  commission: Number,
  netAmount: Number,
  paymentDetails: String,
  status: "pending" | "processed" | "rejected" (default: "pending"),
  createdAt: Date,
  processedAt: Date (optional)
}
```

**Create:**
- `src/backend/services/expert.service.ts` — business logic:
  - `getExpertOrders(expertId)` — fetch assigned orders
  - `takeOrder(orderId, expertId)` — validate + update status
  - `completeOrder(orderId, expertId, pdfFile)` — upload PDF, update order, credit balance
  - `getBalance(expertId)` — return current balance
  - `requestWithdrawal(expertId, amount, paymentDetails)` — create withdrawal, deduct balance, send emails
  - `updateProfile(expertId, data)` — update expert fields
  - `assignOrderToExpert(specialization)` — find best matching expert (see Step 6)

---

### STEP 6: Modify Order Creation for Expert Plans

**Modify `src/backend/services/universal.service.ts` — `createOrder()` method:**

When `planType === "reviewed"`:
1. DO NOT call OpenAI. DO NOT generate any AI content.
2. DO NOT set readyAt to +24h.
3. Instead:
   - Find the best expert: call `expertService.assignOrderToExpert(category)`
     - Query: `User.find({ role: "expert", specializations: { $elemMatch: category } })`
     - If results found → pick the one with fewest active orders (count UniversalOrder where expertId = X and status !== "done")
     - If NO results → pick ANY expert with fewest active orders
     - If NO experts at all → throw error / create order with expertId = null and status "unassigned" (edge case)
   - Save order with: `expertId`, `status: "pending"`, `pdfUrl: null`, `response: null`
   - Send email to assigned expert: "You have a new order! Specialization: [X]. Log in to your profile to view details."
   - Send email to admin: "New expert order #[ID]. Expert: [Name]. Client: [Client Name]. Specialization: [X]."
   - Send email to user: "Your order has been placed! An expert will prepare your business plan. You'll be notified when it's ready."
4. Return the order (without response/PDF — those come later when expert completes it).

**Modify `src/backend/models/universalOrder.model.ts`:**
- Add field: `expertId: { type: Schema.Types.ObjectId, ref: "User", default: null }`
- Add field: `pdfUrl: { type: String, default: null }`
- Expand status enum: keep existing "pending" and "ready", add "in_progress" and "done"
  - "pending" = waiting for expert to take it
  - "in_progress" = expert is working on it
  - "done" = expert uploaded PDF, order complete
  - "ready" = AI-generated order (keep for backward compatibility)

**Modify `src/backend/types/universal.types.ts`** — update interfaces with new fields.

**IMPORTANT:** The `planType === "default"` (AI) path must remain COMPLETELY UNCHANGED. Only the `planType === "reviewed"` path changes.

---

### STEP 7: User-Side Order Tracking

**Modify `src/components/widgets/all-orders/AllOrders.tsx`:**
- For orders where `planType === "reviewed"` (expert orders):
  - Show status as: "Pending" / "In Progress" / "Completed" with colored badges
  - When status === "done" and pdfUrl exists → show "Download PDF" button linking to pdfUrl
  - When status !== "done" → show "Your plan is being prepared by an expert" message
  - Do NOT try to generate PDF client-side for expert orders (no downloadUniversalPDF call)
- For orders where `planType === "default"` (AI orders):
  - Keep existing behavior exactly as is (client-side PDF generation from response text)

---

### STEP 8: Email Notifications

**Modify `src/backend/services/mail.service.ts`** — add these methods:

1. `sendExpertOrderAssignedEmail(expertEmail, orderDetails)` — "You have a new order assigned"
2. `sendUserOrderCompletedByExpertEmail(userEmail, orderDetails)` — "Your business plan is ready"
3. `sendAdminNewExpertOrderEmail(adminEmail, orderDetails, expertDetails)` — "New expert order created"
4. `sendExpertWithdrawalRequestToAdminEmail(adminEmail, expertDetails, withdrawalDetails)` — "Expert requests withdrawal"
5. `sendExpertWithdrawalConfirmationEmail(expertEmail, withdrawalDetails)` — "Your withdrawal is being processed"
6. `sendExpertWelcomeEmail(expertEmail, expertName)` — "Welcome! You registered as an expert"
7. `sendAdminNewExpertRegisteredEmail(adminEmail, expertDetails)` — "New expert registered"

Use the same HTML template pattern as existing `sendOrderConfirmationEmail`. All emails in **English** (matching the current site language).

**Add to `.env` and `src/backend/config/env.ts`:**
- `ADMIN_EMAIL` — the corporate email that receives admin notifications
- `TOKENS_TO_CURRENCY_RATE` — conversion rate (or keep in constants.ts)

---

### STEP 9: "Join as Expert" CTA Component

**Create:**
- `src/components/constructor/expert-cta/ExpertCTA.tsx` — reusable banner:
  - Headline: "Are You a Business Expert?"
  - Subtext: "Join our platform, help entrepreneurs build their business plans, and earn money for your expertise."
  - CTA button: "Become an Expert" → links to `/sign-up?role=expert`
  - Design: full-width section, blue gradient background (matching site palette), white text, centered content

- `src/components/constructor/expert-cta/ExpertCTA.module.scss`

**Modify:**
- Register the new block type in the constructor/PageRender system so it can be added to page schemas
- Add it to `src/pageSchemas/home/homePage.en.ts` — place it between existing sections
- Optionally add to services page schema

**Modify `src/components/widgets/sign-up/SignUp.tsx`:**
- Read `?role=expert` from URL query params
- If present, auto-select the "Expert" registration tab

---

### STEP 10: Redesign Order Creation Form

**Modify `src/components/widgets/manual-generator/ManualGenerator.tsx`:**

Improve the UI without changing the generation logic:
- Make the form larger and more spacious (wider container, bigger padding)
- Better visual step indicators (numbered steps with progress bar)
- Clearer plan type selection: "AI-Generated Plan (Instant)" vs "Expert-Written Plan (1-3 days)"
- When "Expert-Written" is selected, show a specialization picker from the same EXPERT_SPECIALIZATIONS list
- Better field styling — larger inputs, clearer labels, helper text
- Improved summary/review step before submission
- Better loading state during generation
- Rename "Human-written" to "Expert-Written" everywhere

**DO NOT change:**
- The form field names or values sent to the API
- The token calculation logic
- The API endpoint or request format
- The AI generation flow

Only change the visual presentation and add the specialization picker for expert orders.

---

## AFTER ALL STEPS

1. List ALL files that were created or modified
2. Verify that:
   - Regular user registration still works
   - Regular user login still works
   - AI plan generation still works end-to-end
   - Expert registration works
   - Expert login redirects to /expert
   - Expert can see assigned orders
   - The order creation form looks improved
3. Note any env variables that need to be added to .env
