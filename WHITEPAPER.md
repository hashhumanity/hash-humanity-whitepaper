<p align="center">
  <img src="./logo.png" alt="Hash Humanity Logo" width="140">
</p>

# Hash Humanity

### Human-Verified Access Layer for the Modern Internet  
Powered by World ID Zero Knowledge Proofs  

**White Paper — Version 1.1**

---

## Executive Summary

Hash Humanity is a privacy-preserving human verification layer designed to restore trust, authenticity, and integrity to digital interaction. The modern internet has lost the ability to reliably distinguish real human participants from automated agents, AI-generated personas, and synthetic identities. This failure has degraded online discourse, enabled large-scale manipulation, compromised governance systems, and eroded confidence in digital communities.

Existing solutions attempt to solve this problem by identifying users. Hash Humanity takes a fundamentally different approach. Instead of proving who a person is, Hash Humanity proves only that a participant is a unique real human being. This distinction allows platforms to enforce human authenticity without collecting, storing, or processing personal, biometric, or identity data.

Hash Humanity is not a blockchain, not a token, and not a new identity protocol. It is an application-layer access and verification system built on top of World ID’s zero-knowledge Proof of Personhood. Its purpose is to make cryptographic human verification usable, scalable, and privacy-preserving for real-world platforms.

---

## The Problem

Digital systems today cannot reliably distinguish between humans and machines. Automated bots generate content, influence opinions, manipulate markets, and participate in governance systems at scale. AI models can now convincingly imitate human communication. Identity farms create thousands of synthetic accounts. Together, these forces undermine the foundational assumption that a digital participant represents a real person.

Traditional identity-based solutions attempt to address this by requiring government identification, biometric scanning, or centralized identity providers. While these methods can increase confidence in uniqueness, they introduce significant risks. They require users to surrender sensitive personal information, create centralized databases that become high-value attack targets, and enable surveillance, tracking, and long-term profiling.

The core issue is that digital platforms do not need identity. They need authenticity.

---

## Hash Humanity’s Approach

Hash Humanity provides a verification layer that allows a user to prove their humanity without revealing any personal information. The system integrates World ID’s zero-knowledge Proof of Personhood, enabling users to generate cryptographic proofs locally on their device. These proofs demonstrate membership in the global set of verified humans without disclosing identity, biometrics, or any identifying attributes.

Hash Humanity validates these proofs and issues short-lived access tokens that grant entry into human-verified environments. At no point does Hash Humanity store biometric data, identity attributes, or persistent user profiles.

---

## Design Principles

Hash Humanity is built around strict architectural principles:

- Minimize data collection  
- Minimize trust requirements  
- Minimize attack surfaces  
- Eliminate persistent identifiers  
- Prevent cross-session tracking  

Privacy is enforced by architecture, not policy.

---

## System Overview

When a user interacts with Hash Humanity, they authenticate using the World ID widget. This process produces a zero-knowledge proof on the user’s device. The proof demonstrates membership in the verified human set without revealing which member they are.

The proof is submitted to the Hash Humanity backend, where it is validated using Firebase Cloud Functions. The system checks proof integrity and verifies that the associated nullifier has not been previously used. If valid, a short-lived access token is issued.

The backend stores only hashed nullifiers for replay protection.

---

### System Flow Diagram

```mermaid
flowchart TD
    A[User Device] --> B[World ID Proof Generation]
    B --> C[Zero-Knowledge Proof]
    C --> D[Hash Humanity Validation Layer]
    D --> E[Nullifier Replay Check]
    E --> F[Hashed Nullifier Store]
    D --> G[Short-Lived Access Token]
    G --> H[Human-Verified Platform Access]
