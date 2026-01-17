# 🛡️ Sentinel: AI-Driven Debt Recovery Governance

**Sentinel** is a centralized, AI-orchestrated platform designed to transform fragmented debt collection into a transparent, meritocratic, and governed ecosystem. By integrating **Master-Agent AI**, Sentinel replaces manual spreadsheets with real-time auditability and intelligent prioritization.

---

## 📑 Table of Contents
- [Problem Statement](#-problem-statement)
- [Proposed Solution](#-proposed-solution)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Economic Impact](#-economic-impact)
- [Installation & Setup](#-installation--setup)
- [Future Roadmap](#-future-roadmap)
- [The Team](#-the-team)

---

## ❓ Problem Statement
FedEx currently manages overdue accounts through manual, siloed processes (emails/spreadsheets), leading to:
* **"Black Box" Operations:** Minimal visibility into DCA (Debt Collection Agency) agent behavior.
* **Weak Governance:** Lack of audit trails for interaction compliance.
* **Inefficiency:** Slow feedback loops and delayed recovery cycles exceeding 25 days.

---

## 💡 Proposed Solution
Sentinel provides a single, AI-driven platform that automates the end-to-end debt recovery process.
* **Intelligent Ingestion:** Single repository for case data via CSV or ERP sync, eliminating silos.
* **Propensity Prioritization:** AI scores payment likelihood to focus efforts on high-value accounts.
* **Automated Compliance:** NLP-based monitoring ensures ethical collections and immediate breach alerts.

---

## ✨ Key Features
* **🧠 AI Scoring Engine:** Utilizes Scikit-learn for Propensity-to-Pay and Complexity scoring.
* **⚖️ Meritocratic Allocation:** Auto-assigns cases to DCAs based on performance leaderboards and SLA capacity.
* **🕵️ AI Sentinel Auditor:** Continuous real-time NLP monitoring for policy compliance and sentiment analysis.
* **📊 Tri-Party Portals:** Specialized interfaces for FedEx Managers, DCA Agents, and Strategic Management.

---

## 🛠️ Tech Stack
* **Frontend:** React.js, Tailwind CSS (Deployed as a Progressive Web App).
* **Backend:** Node.js, Express.js with JWT-based Role-Based Access Control (RBAC).
* **AI & Intelligence:** Python, Scikit-learn, Pandas, NLP (BERT), and LangChain (Master-Agent architecture).
* **Database:** PostgreSQL (Financials/Audit) and MongoDB (Unstructured Interaction Logs).
* **Integration:** Future RPA interface for SAP/Oracle synchronization.

---

## 🏗️ System Architecture
Sentinel follows a **three-tier, deployment-ready native architecture**.

1.  **Access Layer:** Dedicated portals for clients, managers, and DCA partners.
2.  **Orchestration Layer:** Node.js backend managing data streams and SLA rules.
3.  **Intelligence Layer:** Python-based AI agents for scoring and sentiment auditing.

---

## 📈 Economic Impact
| Metric | Pre-Sentinel (Manual) | Post-Sentinel (AI-Driven) | Impact |
| :--- | :--- | :--- | :--- |
| **Recovery Rate** | ~45%  | **60–75%**  | Higher Liquidity |
| **Allocation Time** | 1–2 Days | **<5 Minutes** | Reduced Labor Costs |
| **Audit Coverage** | <20% (Sample) | **100% (Real-time)** | Risk Mitigation |
| **Case Cycle Time** | 25+ Days | **12–15 Days** | Optimized Efficiency |

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account

### Quick Start

1. **Clone the repository**
```bash
git clone <repository-url>
cd FedEx_iitmadras
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment**

Create `.env.local` file:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Environment Configuration:** Configure .env files for the Node.js backend and Python AI services with your database credentials and API keys.

4. **Launch development server**
```bash
npm run dev
```

5. **Access the platform**
```
http://localhost:5173
```

### Build for Production
```bash
npm run build
npm run preview
```

---

## 🔮 Future Roadmap

**Short-Term:**
* Integration of Generative AI for personalized, empathetic outreach and live voice analytics
* RPA integration with SAP/Oracle ERP systems
* Advanced ML models for debtor segmentation

**Long-Term:**
* Development of agentic AI-driven workflows and blockchain-based security for immutable records
* Multi-language NLP support for global operations
* Blockchain-based audit trail for immutable compliance records

---

## 👥 The Team: Aegis

**Harsh Sharma:** Backend Development and API  
**Karan Singh:** Frontend Development & AI ML  
**Ankit Kumar Jha:** Research & UI/UX Design

Built by a dedicated team of AI engineers, full-stack developers, and domain experts committed to revolutionizing debt recovery operations for FedEx.

**Project Status:** Production-ready MVP with active development

---

**Last Updated**: January 10, 2026

For questions or support, please contact the development team.
