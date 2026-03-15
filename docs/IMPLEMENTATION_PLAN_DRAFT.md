# Vamo Lead Intake Funnel Prototype

## Summary
Build the prototype as a staged lead-intake funnel in `React`, `NestJS`, `MongoDB`, and `TypeScript`.

The product model will use:

- `formStep`: the questionnaire step the customer is currently on
- `leadStage`: the highest business stage the lead has reached
- `feasibilityStatus`: whether the home appears serviceable for a heat pump

The frontend and backend will share the same staged questionnaire structure, derived from the flow chart, while the backend remains the source of truth for feasibility and final stage evaluation.

The prototype will support:

- progressive question flow
- draft save/resume
- business feasibility checks
- lead stage progression up to `qualification` and `discovery`
- persistence and CRM-ready forwarding via an adapter

## Tech Stack

### Frontend
- `React`
- `TypeScript`
- `Vite`

### Backend
- `NestJS`
- `TypeScript`

### Database
- `MongoDB`

### Why React instead of Vue
- React is the more practical choice here because implementation speed and confidence matter more than framework alignment for the prototype.
- The multi-step form, conditional question paths, autosave, and draft resume features are all straightforward to build in React.
- This keeps more time available for the harder parts of the assignment: business rules, backend correctness, and infrastructure reasoning.
- In the interview, this can be explained as a deliberate tradeoff: optimize for delivery quality while keeping the architecture portable to Vue later.

## Stage Model

### Lead stages
These are business stages, not raw UI steps.

- `lead_capture`
  - contact data exists, but business evaluation has not started
- `qualification`
  - enough validated data exists to start or continue feasibility assessment, but not enough to classify as discovery
- `discovery`
  - lead is feasible and has sufficient richer technical/property context for the next stage
- `selling`
  - intentionally out of scope for v1, but reserved in the model for API compatibility

### Feasibility status
This remains separate from `leadStage`.

- `unknown`
  - not enough gating information yet
- `feasible`
  - current answers indicate the home can proceed
- `infeasible`
  - explicit business rule blocks progression

### Form steps
These are the user-facing questionnaire steps and will exist in both frontend and backend.

- `lead_contact`
- `home_type`
- `current_heating`
- `property_details`
- `technical_details`
- `review_submit`

### Mapping form steps to lead stages
- `lead_contact` -> `lead_capture`
- `home_type` -> `qualification`
- `current_heating` -> `qualification`
- `property_details` -> `qualification`
- `technical_details` -> `discovery`
- `review_submit` -> final submission of whichever stage has been reached

Important rule:
`formStep` can move forward before `leadStage` advances. For example, a user may enter `technical_details`, but the lead remains at `qualification` until enough valid discovery data exists.

## Question Structure and Path Rules

### Step 1: `lead_contact`
Questions:
- first name
- last name
- phone
- email
- newsletter opt-in

Path rules:
- all required contact fields valid -> create draft and move to `home_type`
- invalid/missing required fields -> stay on step with inline validation

### Step 2: `home_type`
Questions:
- building type `immoType`
- if `immoType = Wohnung`: apartment gating question for independent heating / ground-floor suitability
- owner-occupied `ownerOccupiedHousing`
- residential units `residentialUnits` where relevant

Path rules:
- `Wohnung` + no own heating system -> mark `feasibilityStatus = infeasible`, block normal progression, show waitlist / not-serviceable message
- supported building path + enough gating answers -> continue to `current_heating`
- insufficient answers -> remain in step, `feasibilityStatus = unknown`

### Step 3: `current_heating`
Questions:
- current heating system `systemType`
- heating system location `locationHeating`
- apartment heating system question if still unresolved
- basic heating context required by feasibility path

Path rules:
- `systemType = Erdgas` or `Heizöl` -> supported path, continue
- `systemType = Sonstiges` -> keep `feasibilityStatus = unknown` unless an explicit exclusion rule applies
- if answers complete enough for base business assessment -> `leadStage = qualification`

### Step 4: `property_details`
Questions:
- building address
- heritage protection
- construction year or range
- heated area / living space
- persons in household
- type of heat distribution

Path rules:
- if qualification-required fields are complete and no infeasible rule triggered -> remain or confirm `leadStage = qualification`
- if user skips optional richer fields, still allow progression with partial qualification
- continue to `technical_details`

### Step 5: `technical_details`
Questions:
- boiler room size
- installation ceiling height
- width/height pathway
- rooms between heating room and outdoor unit
- meter closet location
- electricity connection location
- grounding type
- solar thermal system
- heating consumption and unit
- heating system age
- full replacement planned
- project timeline

Path rules:
- if discovery field threshold is met and lead is feasible -> `leadStage = discovery`
- if still missing discovery fields -> keep `leadStage = qualification`, but allow user to continue to review
- explicit blocking rule discovered here -> set `feasibilityStatus = infeasible` and stop submission flow

### Step 6: `review_submit`
Questions/UI:
- summary of answers
- edit links to previous steps
- final confirmation / consent if needed

Path rules:
- if `feasibilityStatus = infeasible` -> do not submit as normal lead; store blocked outcome and show user-friendly message
- if `leadStage = qualification` -> submit as qualification lead
- if `leadStage = discovery` -> submit as discovery lead

## Backend Development Plan

### Backend implementation priority
Start with the draft mechanism first. In this product, drafts are not a side feature; they are the foundation for:

- staged form progression
- save/resume
- step-level validation
- feasibility recalculation
- final submission

If we skip drafts and start with final lead submission, we will likely need to rework the backend once the frontend starts saving step-by-step progress.

### Core backend modules
Build the backend around explicit modules rather than one large controller/service.

- `LeadDraftsModule`
  - draft creation
  - draft updates
  - draft retrieval for resume
- `LeadSubmissionModule`
  - final submission endpoint
  - submission snapshot persistence
- `LeadValidationModule`
  - DTO/schema validation for incoming payload fragments and final payload
- `LeadFeasibilityModule`
  - business rules from the flow chart
  - infeasible / unknown / feasible decisioning
- `LeadStageModule`
  - determine highest reached stage from valid answers
- `LeadPersistenceModule`
  - MongoDB schemas/repositories
- `CrmModule`
  - adapter interface and placeholder implementation
- `ConfigObservabilityModule`
  - env validation
  - structured logs
  - health check

### Backend implementation sequence
1. Project foundation
   - connect NestJS to MongoDB
   - add config/env validation
   - keep the health endpoint working
   - define shared enums/types:
     - `formStep`
     - `leadStage`
     - `feasibilityStatus`
2. Draft persistence
   - create the `LeadDraft` schema/model
   - store:
     - contact info and partial answers
     - `currentStep`
     - `leadStage`
     - `feasibilityStatus`
     - timestamps
3. Draft APIs
   - implement:
     - `POST /lead-drafts`
     - `PATCH /lead-drafts/:id`
     - `GET /lead-drafts/:id`
4. Step-level validation
   - validate payloads per form step, not only final submission
   - keep DTOs aligned to the frontend step/question map
5. Feasibility engine
   - implement flow-chart-driven rules in one dedicated service
   - return:
     - `unknown`
     - `feasible`
     - `infeasible`
6. Lead-stage evaluator
   - derive the highest valid business stage from draft data plus feasibility result
7. Draft update pipeline
   - for every draft update:
     - validate payload
     - merge into draft
     - recalculate feasibility
     - recalculate lead stage
     - persist updated draft
     - return next state to frontend
8. Final submission flow
   - implement `POST /lead-drafts/:id/submit`
   - persist a submitted snapshot separately from the mutable draft
9. CRM adapter abstraction
   - add the interface first
   - initial implementation can store sync status or log outbound payloads
10. Tests
   - validation tests
   - pathing tests
   - stage transition tests
   - blocked/waitlist tests
   - submit flow tests

### Backend submit pipeline
The backend pipeline should be:

1. validate payload for current step or final submission
2. normalize data
3. evaluate feasibility
4. evaluate lead stage
5. persist draft/submission state
6. return next-step or final outcome
7. enqueue or invoke CRM adapter if submitting

### Recommended first NestJS implementation milestone
The first usable backend milestone should be:

- MongoDB connected
- `LeadDraft` model created
- `POST /lead-drafts`
- `PATCH /lead-drafts/:id`
- `GET /lead-drafts/:id`
- placeholder feasibility/stage recalculation hook

That gives the frontend a working draft/save/resume backbone before deeper business rules are added.

### Public APIs / Interfaces / Types
Recommended prototype API:

- `POST /lead-drafts`
  - create draft after `lead_contact`
  - returns `draftId`, `formStep`, `leadStage`, `feasibilityStatus`
- `PATCH /lead-drafts/:id`
  - update answers for the current step
  - returns recalculated `formStep`, `leadStage`, `feasibilityStatus`
- `GET /lead-drafts/:id`
  - resume draft
- `POST /lead-drafts/:id/evaluate`
  - optional explicit evaluation endpoint if frontend-controlled step transitions are preferred
- `POST /lead-drafts/:id/submit`
  - final submission
  - returns final `leadStage`, `feasibilityStatus`, user next-step payload

Core internal types:
- `FormStep`
- `LeadStage`
- `FeasibilityStatus`
- `LeadDraft`
- `SubmittedLead`
- `FeasibilityDecision`
- `StageEvaluationResult`
- `CrmAdapter`

Response contract should include:
- `draftId`
- `formStep`
- `leadStage`
- `feasibilityStatus`
- `nextAction`
- optional `blockingReason`
- optional `dataAcquisitionLink`
- optional `appointmentBookingLink`

## Stage Evaluation Rules

### Stage advancement
- after `lead_contact`, set `leadStage = lead_capture`
- once gating answers begin arriving, move into `qualification`
- only promote to `discovery` when:
  - `feasibilityStatus = feasible`
  - discovery-level technical/property fields meet the defined threshold
- do not implement `selling` logic in v1

### Stage downgrade / recalculation
- every draft update triggers recalculation
- if user changes an earlier answer to an unsupported path, downgrade stage and update feasibility accordingly
- stage is always derived from current valid data, not only from history

### Blocking rules
Prototype v1 should encode explicit or near-explicit rules from the flow chart:
- apartment without own heating system -> blocked / waitlist path
- supported house types proceed
- `Erdgas` and `Heizöl` are safe supported heating paths
- ambiguous cases like `Sonstiges` default to `unknown`, not hard reject, unless explicit business rule says otherwise

## Frontend Development Plan

### Frontend architecture
- single-page React app with step-driven state
- centralized step/question map used to render the form
- backend-driven draft state and recalculated lead state
- local draft cache for interruption recovery

### Question map / stage table
Create one shared configuration table that powers the frontend.

Each step entry should define:
- `formStep`
- title / user-facing copy
- questions in display order
- field keys
- validation rules
- visibility rules
- next-step rules
- mapping to business `leadStage`

The path rule style should be explicit, for example:
- if `immoType = Wohnung` -> show apartment gating question
- if apartment gating answer is unsupported -> stop progression and show blocked state
- if `systemType = Erdgas` or `Heizöl` -> proceed normally
- if `systemType = Sonstiges` -> continue with caution / unknown feasibility messaging

### Frontend step behavior
- render only questions relevant to the current step and prior answers
- save on step completion
- optionally autosave on debounce
- show friendly text mapped from backend state, not raw enum labels

### Draft and resume strategy
Prototype implementation:
- create backend draft after `lead_contact`
- store `draftId` and latest local answers in `localStorage`
- restore draft automatically if `draftId` exists
- fetch backend draft on load and reconcile with local cache
- same-device resume is the primary prototype path

Longer-term extension:
- add magic-link resume for cross-device continuation

## Infrastructure and Scalability Strategy

### Stage A: 5,000 leads/month
- frontend on Vercel or Netlify
- backend as one Dockerized Nest service on Render, Fly, or Heroku-style hosting
- MongoDB Atlas entry tier
- store drafts and submissions in the same cluster with clean collections
- add:
  - structured logging
  - health endpoint
  - error tracking
  - daily backup via provider features

### Stage B: 500,000 leads/month
- keep the same product flow, but harden operations
- split write path and async processing if needed
- add queue for CRM sync and retry handling
- upgrade Mongo cluster and indexes
- add:
  - centralized logs
  - metrics by `formStep`, `leadStage`, and `feasibilityStatus`
  - alerting
  - backup/restore runbooks
  - decision audit history

## Test Plan
- step validation tests for each form step
- path rule tests for conditional question visibility
- feasibility tests for supported vs blocked housing paths
- stage evaluation tests:
  - lead capture only
  - qualification reached
  - discovery reached
  - downgrade when earlier answer changes
- draft/resume tests:
  - restore local draft
  - restore backend draft
  - reconcile local and backend versions
- submission tests:
  - qualification submission
  - discovery submission
  - blocked submission path
- integration tests for full happy path and apartment blocked path

## Assumptions
- The visible flow-chart rules are the source of truth for prototype feasibility logic.
- `lead_contact` is treated as a real initial lead stage for internal product flow, even though the external Vamo API mainly emphasizes `qualification`, `discovery`, and `selling`.
- `formStep` and `leadStage` are intentionally separate:
  - many form steps
  - fewer business stages
- Same-device resume is enough for the initial prototype; cross-device resume is a later enhancement.
- `selling` and photo upload remain out of scope for v1 unless time allows.
