<p align="center">
  <img src="./logo.png" alt="Hash Humanity logo" width="112">
</p>

<h1 align="center">HumanKey</h1>

<p align="center">
  <strong>Proof of Personhood for a Human Internet</strong>
</p>

<p align="center">
  One living human. One persistent identity. One account.
</p>

<p align="center">
  <em>You are the proof, not the product.</em>
</p>

---

## What HumanKey Is

HumanKey is the proof-of-personhood protocol behind **Hash Humanity**, a human-verified social network designed around a simple principle:

> An account should represent a real, living human, and that human should not be able to cheaply multiply themselves into dozens, hundreds, or thousands of apparent people.

Traditional authentication proves control of a credential. A password proves knowledge of a password. A phone number proves access to a phone number. An email proves access to an inbox. A passkey proves control of a cryptographic authenticator.

None of those things, by themselves, prove that the account represents one unique human.

HumanKey is designed to move the uniqueness boundary from the credential to the person.

---

## Why It Exists

The modern internet has an identity problem.

Automated systems now represent a majority of measured global web traffic, while increasingly capable AI systems can write, translate, argue, maintain synthetic personalities, generate profile imagery, react to current events, and operate continuously.

The problem is not automation itself.

The problem is **synthetic participation**: one operator, organization, account farm, or government creating the appearance of a crowd.

That can distort:

- follower counts
- likes and reactions
- polls
- comment sections
- trending topics
- perceived public sentiment
- political enthusiasm
- product popularity
- harassment campaigns
- mass reporting
- reputation systems
- community governance

HumanKey does not attempt to decide what is true or what people are allowed to believe.

It attempts to establish something more fundamental:

**Is there a real human behind this participation identity, and is that human already represented?**

---

## Core Principle

```text
ONE HUMAN
ONE IDENTITY
ONE ACCOUNT
```

HumanKey is designed so that creating another email address, browser profile, phone number, device, or IP address does not automatically create another person.

A credential is replaceable.

A human is not.

---

## How HumanKey Works

HumanKey separates proof of humanity, uniqueness, participation, authentication, and recovery into distinct security layers.

```text
Human
  ↓
Consent
  ↓
AWS Face Liveness
  ↓
Biometric Uniqueness Search
  ↓
Existing Human?
  ├─ Yes → Existing HumanKey / Recovery
  └─ No  → New HumanKey
              ↓
       ZK Membership
              ↓
        Passkey Binding
              ↓
       Active Identity
```

### 1. Consent

Biometric processing begins only after the user receives disclosure and provides consent.

The camera and liveness flow are not intended to begin before that boundary is crossed.

### 2. Liveness

HumanKey currently uses **AWS Face Liveness** to establish that the enrolling or recovering participant is physically present during the ceremony.

The production implementation uses a liveness confidence threshold of **85**.

Liveness does not prove uniqueness by itself. It proves presence.

### 3. Biometric Uniqueness

After successful liveness, HumanKey compares the participant against the existing enrolled population.

The production AWS Rekognition path uses biometric search to determine whether the human already has an identity.

The current similarity threshold is **90.0**.

If a match is found, HumanKey does not create another participation identity.

If no existing match is found, the enrollment can continue.

### 4. Zero-Knowledge Membership

HumanKey separates enrollment from participation.

The biometric layer establishes that a unique human exists.

The zero-knowledge layer allows that enrolled human to later prove valid membership without publicly exposing the biometric process or requiring public legal identity.

HumanKey uses Semaphore components for zero-knowledge membership and scoped nullifiers.

### 5. Passkeys

After enrollment, routine authentication is handled with passkeys.

The face establishes the human.

The passkey authenticates the already-established human.

Biometrics are not intended to be required every time the user signs in.

---

## Recovery Without Creating a Second Identity

Recovery is a critical part of the protocol.

A person may lose a phone, computer, authenticator, or passkey.

They should not lose their human identity.

HumanKey recovery is designed around this rule:

> **Recover the human. Do not recreate the human.**

```text
Recovery Request
  ↓
Consent
  ↓
Single AWS Face Liveness Ceremony
  ↓
Existing Biometric Identity Search
  ↓
Existing HumanKey Resolved
  ↓
New Passkey Ceremony
  ↓
Same Account Restored
```

The current recovery design uses **one live biometric ceremony**, not two.

A previous development issue that caused redundant facial verification was investigated and corrected so successful liveness continues through identity resolution without forcing a second scan.

---

## Security Model

HumanKey is intentionally layered because no single control solves the entire problem.

| Threat | HumanKey Control |
|---|---|
| Automated bot | Liveness, server-side state, identity controls |
| One-human Sybil attack | Biometric uniqueness |
| Account farm | Liveness, uniqueness, rate limits |
| Presentation attack | AWS Face Liveness |
| Credential theft | Passkeys |
| Replay attack | Expiration, consumption, server-side transitions |
| Ban evasion | Persistent human uniqueness |
| Synthetic influence operation | Scarcity shifts from accounts to enrolled humans |

Proof of personhood does not make a human honest.

A verified human can still lie, spread misinformation, propagandize, harass, or behave badly.

HumanKey addresses a narrower and more measurable problem:

**one human should not be able to cheaply become one hundred apparent humans.**

---

## Server Authority

The browser is treated as untrusted.

Security-sensitive state transitions are enforced server-side.

The server determines whether:

- consent exists
- a liveness result is valid
- a result has already been consumed
- a biometric match exists
- enrollment may continue
- recovery may continue
- a passkey ceremony is authorized

This reduces the value of manipulating client-side state.

---

## Replay Protection

Security results are designed to be consumable.

Once a sensitive result has been used for the authorized state transition, replay is rejected.

This prevents a previously valid result from being reused as though a new ceremony had occurred.

---

## Rate Limiting

Proof of personhood limits **identity multiplication**.

Rate limiting limits **action multiplication**.

The HumanKey architecture includes:

- liveness attempt controls
- cooldown periods
- HTTP `429` responses
- idempotency protections
- provider ceilings
- blocked-attempt tests
- administrative kill-switch controls

These controls help reduce abuse even when the participant is a real person.

---

## Current Validation

At the time of the HumanKey v1.0 white paper:

### Recovery regression suite

```text
Tests executed: 10
Passed:         10
Failed:          0
Result:       PASS
```

### Broader security suite

```text
Passed:  182
Skipped:   1
Result:  PASS
```

The broader suite covers areas including:

- consent gating
- AWS liveness gating
- invalid sessions
- capture state
- recovery
- duplicate detection
- provider response handling
- biometric search
- passkey authorization
- replay protection
- state transitions
- calibration
- multi-template behavior
- rate limiting
- blocked attempts

Passing tests are evidence of the current implementation state. They are not a claim that security work is permanently finished.

---

## Technology

### HumanKey security and biometric services

- Python
- FastAPI
- Pydantic
- AWS Face Liveness
- AWS Rekognition
- Semaphore
- Passkeys / WebAuthn
- automated regression and security testing

### Hash Humanity application

- React
- JavaScript / JSX
- HTML
- CSS
- Firebase

The biometric/security authority is intentionally separated from the social application's presentation layer.

---

## Privacy Direction

HumanKey is designed to verify humanity and uniqueness without requiring users to publicly disclose legal identity.

The protocol's design direction is:

- prove humanity without turning identity into public profile data
- use mathematical biometric representations for uniqueness comparison
- separate enrollment from routine participation
- use zero-knowledge proofs for membership
- use passkeys for routine authentication
- keep recovery tied to the existing human identity
- minimize unnecessary biometric processing

Biometric representations remain sensitive data and must be treated accordingly.

---

## What HumanKey Does Not Do

HumanKey does **not** determine:

- whether a statement is true
- whether an opinion is good
- whether someone is politically correct
- whether a user agrees with the majority
- whether a human is kind
- whether a human is intelligent

It establishes a stronger foundation for online participation:

**the participant is a real human, and the system has a technical basis for believing that human is not already represented by another active identity.**

---

## The Goal

If 1,000 apparently independent people are participating in a conversation, there should be a meaningful technical reason to believe those accounts represent roughly 1,000 actual enrolled humans.

Not:

- one operator with 1,000 accounts
- an account farm
- a bot network
- a synthetic government influence operation
- an AI-managed crowd of fake citizens

Actual people.

---

## HumanKey White Paper

The full technical white paper documents the architecture, threat model, biometric uniqueness process, zero-knowledge layer, passkey model, recovery process, validation results, rate limiting, and security philosophy behind HumanKey.

**Version:** 1.0  
**Published:** September 2026  
**Organization:** Hash Humanity

---

## Philosophy

The objective is not to eliminate disagreement.

It is to restore confidence that the disagreement is actually happening between people.

**Let humans argue with humans.**

---

<p align="center">
  <strong>ONE HUMAN. ONE ACCOUNT.</strong>
</p>

<p align="center">
  HumanKey · Hash Humanity
</p>
