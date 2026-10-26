export const initialData = {
  version: "1.0.0",
  lastModified: new Date().toISOString(),
  settings: {
    theme: "dark",
    autoSave: true
  },
  learningPaths: [
    {
      id: "lp-dfir",
      title: "Digital Forensics & Incident Response (DFIR)",
      category: "Cybersecurity",
      status: "In Progress",
      priority: "High",
      targetDate: "2026-12-15",
      description: "Host-based forensics, memory acquisition, and Master File Table timeline reconstruction.",
      topics: [
        {
          id: "top-101",
          title: "NTFS $MFT & USN Journal Artifact Parsing",
          status: "Completed",
          theoryRead: true,
          practiced: true,
          evidence: "Implemented parser script extracting record numbers and MACB timestamps from raw disk images.",
          notes: "Focus on resident vs non-resident data attributes and timestamps."
        },
        {
          id: "top-102",
          title: "Memory Forensics with Volatility 3",
          status: "In Progress",
          theoryRead: true,
          practiced: false,
          evidence: "Extracted process list and injected threads using malfind; requires full lab triage report.",
          notes: "Review windows.netscan and windows.pstree output correlation."
        },
        {
          id: "top-103",
          title: "Linux Evidence Acquisition (dd & LiME kernel module)",
          status: "Not Started",
          theoryRead: false,
          practiced: false,
          evidence: "",
          notes: "Set up target Linux VM with custom compiled LiME module."
        }
      ]
    },
    {
      id: "lp-dsa",
      title: "Data Structures & Algorithmic Complexity",
      category: "Computer Science",
      status: "In Progress",
      priority: "High",
      targetDate: "2026-11-30",
      description: "Asymptotic notation, graph theory, trees, and dynamic programming.",
      topics: [
        {
          id: "top-104",
          title: "Shortest Path Algorithms (Dijkstra, Bellman-Ford)",
          status: "Completed",
          theoryRead: true,
          practiced: true,
          evidence: "Implemented using priority queue and adjacency lists in C++.",
          notes: "Understand edge-weight relaxations and negative cycle handling."
        },
        {
          id: "top-105",
          title: "Trie Data Structures & KMP Pattern Matching",
          status: "In Progress",
          theoryRead: true,
          practiced: false,
          evidence: "",
          notes: "Essential for signature search in payload scanners."
        }
      ]
    }
  ],
  skills: [
    {
      id: "sk-1",
      name: "Memory Analysis",
      category: "Digital Forensics",
      proficiencyLevel: "Intermediate",
      status: "Practicing",
      evidence: "Analyzed LSASS memory injections via Volatility 3 against test Windows images.",
      linkedProjectIds: ["proj-1"],
      linkedPathIds: ["lp-dfir"],
      notes: "Focusing next on direct kernel object manipulation (DKOM) detection."
    },
    {
      id: "sk-2",
      name: "Packet Dissection",
      category: "Networking",
      proficiencyLevel: "Intermediate",
      status: "Practicing",
      evidence: "Extracted TCP streams and cleartext payloads in Wireshark.",
      linkedProjectIds: [],
      linkedPathIds: ["lp-dfir"],
      notes: "Need practice analyzing encrypted TLS handshake metadata."
    }
  ],
  certifications: [
    {
      id: "cert-1",
      name: "CompTIA Security+",
      issuer: "CompTIA",
      status: "Studying",
      targetDate: "2026-11-20",
      completionDate: null,
      officialUrl: "https://www.comptia.org/certifications/security",
      credentialUrl: "",
      objectives: [
        { id: "obj-1", title: "General Security Concepts (12%)", completed: true },
        { id: "obj-2", title: "Threats, Vulnerabilities & Mitigations (22%)", completed: true },
        { id: "obj-3", title: "Security Architecture (18%)", completed: false },
        { id: "obj-4", title: "Security Operations (28%)", completed: false },
        { id: "obj-5", title: "Security Program Management & Oversight (20%)", completed: false }
      ],
      notes: "Prioritize cryptography standards and incident response procedure domains."
    }
  ],
  projects: [
    {
      id: "proj-1",
      name: "HashTrace Forensics Utility",
      description: "Python CLI utility for bulk cryptographic hashing and filesystem MACB timeline logging.",
      status: "Completed",
      priority: "High",
      repoUrl: "https://github.com/example/hashtrace",
      liveUrl: "",
      techStack: ["Python", "Argparse", "SHA256", "SQLite"],
      linkedSkillIds: ["sk-1"],
      milestones: [
        { id: "m-1", title: "CLI argument parser & file walker", completed: true },
        { id: "m-2", title: "SQLite logging engine with write-block verification", completed: true }
      ],
      lessonsLearned: "Always verify target mount flags (read-only) before initiating forensic file hash sweeps."
    }
  ],
  research: [
    {
      id: "res-1",
      title: "Ten-Year Evolution of Host Forensics (2016-2026)",
      status: "Drafting",
      researchQuestion: "How have fileless and memory-resident attack models bypassed traditional acquisition routines?",
      papers: [
        {
          id: "pap-1",
          title: "Memory Forensics in Enterprise Operating Environments",
          authors: "K. Vance, S. Al-Hassan",
          year: 2024,
          venue: "Digital Investigation Journal",
          url: "https://doi.org/10.1016/j.diin.2024.1001",
          readingStatus: "Read",
          summaryNotes: "Comprehensive overview of anti-forensics in kernel space."
        }
      ],
      draftSections: [
        { id: "sec-1", title: "Abstract & Methodology Matrix", completed: true },
        { id: "sec-2", title: "Comparative Paradigms (2016 vs 2026)", completed: true },
        { id: "sec-3", title: "Open Gaps & Live Acquisition Limitations", completed: false }
      ]
    }
  ],
  ideas: [
    {
      id: "idea-1",
      title: "Lightweight Kernel Memory Watcher",
      category: "Cybersecurity",
      description: "Driver utility monitoring unsigned memory writes to common system processes.",
      potentialUse: "Detect unhooking or direct syscall executions by malicious loaders.",
      possibleTech: "C, Windows WDK, x64 Assembly",
      status: "Captured",
      dateAdded: "2026-10-20"
    }
  ],
  notes: [
    {
      id: "note-1",
      title: "Common Volatility 3 Command Reference",
      category: "Forensics Cheatsheet",
      tags: ["DFIR", "Memory", "CLI"],
      content: "python3 vol.py -f dump.raw windows.pslist\npython3 vol.py -f dump.raw windows.malfind --dump\npython3 vol.py -f dump.raw windows.netscan",
      linkedEntityId: "lp-dfir",
      lastUpdated: "2026-10-22"
    }
  ]
};
