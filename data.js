// Virtual File System & Portfolio Data for Windows 2000 Portfolio
// Profile: Raja Rawat - Informatica Administrator

const PORTFOLIO_DATA = {
    personal: {
        name: "Raja Rawat",
        title: "Informatica Administrator • PowerCenter • CDIPC • IICS / IDMC",
        location: "Chennai, Tamil Nadu, India",
        email: "rajarawat262000@gmail.com",
        phone: "+91 8449925779",
        linkedin: "https://www.linkedin.com/in/raja-rawat-etl/",
        website: "https://www.linkedin.com/in/raja-rawat-etl/",
        bio: `Results-driven Informatica Administrator with 3+ years of enterprise experience administering, configuring, and optimizing high-availability data integration platforms with deep expertise in Informatica PowerCenter 10.x, CDIPC (Cloud Data Integration for PowerCenter), and IICS / IDMC.

Proven expertise in engineering automated operations using Python and Unix Shell Scripting integrated with Jenkins CI/CD pipelines, ServiceNow APIs, and CyberArk PAM for vaulting credentials.

Track record of zero-downtime upgrades, IICS Secure Agent clustering, rapid Root Cause Analysis (RCA), and leveraging AI productivity tools (Informatica CLAIRE AI, GitHub Copilot) to maintain 99.9% platform availability across mission-critical healthcare client environments.`
    },
    skills: {
        informatica: [
            "Informatica PowerCenter (10.x / 9.x)",
            "CDIPC (Cloud Data Integration for PowerCenter)",
            "IICS / IDMC (Cloud Data & Application Integration)",
            "IICS Secure Agent Clustering & Failover",
            "Managed MDM Systems",
            "Grid & Repository Services (RS / IS)"
        ],
        automation: [
            "Python Automation Scripting",
            "Unix Shell Scripting (Bash / ksh)",
            "Jenkins CI/CD Pipelines",
            "ServiceNow REST APIs (Incident / Change)",
            "CyberArk PAM (Privileged Access Management)",
            "IDMC REST APIs",
            "Informatica CLI (pmcmd, pmrep, infacmd)"
        ],
        platforms: [
            "Linux (RHEL, CentOS)",
            "AIX",
            "Windows Server",
            "AWS (EC2, S3)",
            "Azure",
            "Databricks"
        ],
        databases: [
            "Oracle (12c / 19c)",
            "Teradata",
            "MySQL",
            "SQL Server",
            "PL/SQL & Advanced SQL",
            "ODBC & TNS Configuration"
        ],
        governance: [
            "High Availability (HA) & Disaster Recovery (DR)",
            "DTM Buffer & Performance Tuning",
            "Tier-3 Root Cause Analysis (RCA)",
            "LDAP / Active Directory & RBAC Security",
            "SSL/TLS & SAML Integration",
            "EBFs, Service Packs & Hotfixes"
        ],
        ai_tools: [
            "Informatica CLAIRE AI",
            "GitHub Copilot",
            "Generative AI & Prompt Engineering"
        ]
    },
    experience: [
        {
            role: "Associate Systems Engineer - Informatica Administrator",
            company: "Cognizant Technology Solutions | Chennai, India (Client: Horizon Blue NJ | US HealthCare)",
            period: "Feb 2023 – Present",
            description: "Administer enterprise Informatica PowerCenter 10.x domains, multi-node grids, Repository (RS), and Integration Services (IS), sustaining 99.9% platform availability. Lead cloud modernization to CDIPC and IICS/IDMC with clustered Secure Agents on AWS EC2. Architect end-to-end automation via Python, Shell, Jenkins, and ServiceNow APIs. Enforce zero-trust security using CyberArk PAM. Provide Tier-3 RCA cutting MTTR by 35%."
        },
        {
            role: "Programmer Analyst Intern – ETL & Data Management",
            company: "Cognizant Technology Solutions | Chennai / Dehradun, India",
            period: "Feb 2022 – Sep 2022",
            description: "Developed and maintained small-scale ETL mappings, workflows, sessions, and reusable transformations for data integration. Gained end-to-end expertise in source analysis, data extraction, transformation logic, loading, and post-load validation using SQL and PL/SQL."
        }
    ],
    projects: [
        {
            id: "admin-automation",
            title: "Enterprise Admin Automation & Self-Healing Framework",
            category: "Enterprise Automation & DevOps",
            tech: ["Python", "Unix Shell", "Jenkins", "ServiceNow REST API", "CyberArk PAM"],
            summary: "Automated operations suite orchestrating platform health checks, automated ticket resolution via ServiceNow REST API, and CyberArk credential injection with zero hardcoded credentials.",
            details: "Designed modular Python & Bash daemons integrated with Jenkins pipelines to monitor PowerCenter domains and IICS Secure Agents. Includes automatic hung thread detection, automated ServiceNow incident logging, and self-healing daemon restarts with CyberArk credential retrieval.",
            link: "https://www.linkedin.com/in/raja-rawat-etl/",
            demo: "resume.html"
        },
        {
            id: "cloud-modernization",
            title: "PowerCenter to CDIPC & IICS/IDMC Cloud Modernization",
            category: "Cloud Migration & Architecture",
            tech: ["CDIPC", "IICS / IDMC", "AWS EC2", "Linux RHEL", "Secure Agent Clustering"],
            summary: "Migrated legacy on-premise PowerCenter workloads into hybrid IICS/IDMC cloud runtime environments; architected multi-node Secure Agent clusters on AWS EC2 with automated failover.",
            details: "Configured resilient Secure Agent groups across distributed AWS EC2 instances, setup custom runtime environments, validated repository connectivity, and ensured zero downtime for business-critical ETL batch cycles.",
            link: "https://www.linkedin.com/in/raja-rawat-etl/",
            demo: "resume.html"
        },
        {
            id: "ha-dr-testing",
            title: "PowerCenter 10.x Multi-Node Grid Upgrade & DR Testing",
            category: "High Availability & Disaster Recovery",
            tech: ["PowerCenter 10.x", "HA / DR", "Oracle 19c", "Linux", "Grid Services"],
            summary: "Orchestrated infrastructure validation, repository backup/restoration, and failover drills across multi-node grids, ensuring seamless disaster recovery across 150+ developer workstations.",
            details: "Conducted planned failover drills across node boundaries, tuned DTM buffer pools to prevent memory exhaustion, and executed seamless In-place/Parallel upgrades with EBF patches.",
            link: "https://www.linkedin.com/in/raja-rawat-etl/",
            demo: "resume.html"
        }
    ],
    certifications: [
        "Informatica IDMC Foundation – Informatica",
        "Databricks Certified Generative AI Engineer",
        "Informatica CLAIRE AI Foundation – Informatica",
        "Databricks Certified Associate Data Analyst",
        "GitHub Copilot Certified",
        "IBM Cloud App Developer & Data Science Mastery"
    ],
    education: {
        degree: "Bachelor of Technology (B.Tech) in Computer Science & Engineering",
        institution: "Graphic Era Hill University, Dehradun",
        period: "Aug 2018 – Jun 2022",
        gpa: "GPA: 8.4 / 10.0",
        specialization: "Specialization in Data Science (IBM)"
    }
};

// Initial Virtual File System
const INITIAL_VFS = {
    desktop: [
        {
            id: "my-computer",
            name: "My Computer",
            type: "app",
            appType: "my-computer",
            icon: "my-computer",
            x: 20,
            y: 20,
            readOnly: true
        },
        {
            id: "my-documents",
            name: "My Documents",
            type: "app",
            appType: "explorer",
            targetPath: "C:\\My Documents",
            icon: "my-documents",
            x: 20,
            y: 104,
            readOnly: true
        },
        {
            id: "resume-html",
            name: "Printable Resume.html",
            type: "app",
            appType: "resume-viewer",
            icon: "ie",
            x: 20,
            y: 188,
            readOnly: false
        },
        {
            id: "resume-txt",
            name: "Resume.txt",
            type: "file",
            appType: "notepad",
            icon: "notepad-file",
            x: 20,
            y: 272,
            content: `========================================================================
RAJA RAWAT - INFORMATICA ADMINISTRATOR
PowerCenter 10.x | CDIPC | IICS / IDMC | Cloud Integration
Chennai, Tamil Nadu, India | +91 8449925779 | rajarawat262000@gmail.com
LinkedIn: https://www.linkedin.com/in/raja-rawat-etl/
========================================================================

PROFESSIONAL SUMMARY:
Results-driven Informatica Administrator with 3+ years of enterprise
experience administering, configuring, and optimizing high-availability data
integration platforms with deep expertise in Informatica PowerCenter 10.x,
CDIPC (Cloud Data Integration for PowerCenter), and IICS / IDMC. Proven expertise
in engineering automated operations using Python and Unix Shell Scripting
integrated with Jenkins CI/CD pipelines, ServiceNow APIs, and CyberArk PAM for
vaulting credentials. Track record of zero-downtime upgrades, IICS Secure Agent
clustering, rapid Root Cause Analysis (RCA), and leveraging AI productivity tools
(Informatica CLAIRE AI, GitHub Copilot) to maintain 99.9% platform availability.

TECHNICAL SKILLS:
* Informatica & Cloud Integration:
  - Informatica PowerCenter (10.x / 9.x), CDIPC, IICS / IDMC
  - Secure Agent Clustering, Managed MDM Systems, Grid & Repository Services
* Automation, Scripting & Enterprise Tools:
  - Python Scripting, Unix Shell Scripting (Bash/ksh), Jenkins CI/CD
  - ServiceNow (Incident/Change API), CyberArk PAM, IDMC REST APIs
  - Informatica CLI (pmcmd, pmrep, infacmd)
* Platforms & Cloud:
  - Linux (RHEL, CentOS), AIX, Windows Server, AWS (EC2, S3), Azure, Databricks
* Databases & Querying:
  - Oracle (12c/19c), Teradata, MySQL, SQL Server, PL/SQL, Advanced SQL, ODBC/TNS
* Administration & Governance:
  - High Availability (HA) & Disaster Recovery (DR), DTM Buffer Tuning, Tier-3 RCA
  - LDAP / Active Directory / RBAC, SSL/TLS & SAML Integration, EBFs & Hotfixes
* AI & Productivity:
  - Informatica CLAIRE AI, GitHub Copilot, Generative AI & Prompt Engineering

PROFESSIONAL EXPERIENCE:
1. Associate Systems Engineer - Informatica Administrator
   Cognizant Technology Solutions | Chennai, India (Client: Horizon Blue NJ | US HealthCare)
   [Feb 2023 – Present]
   * Administer enterprise Informatica PowerCenter 10.x domains, multi-node grids,
     Repository (RS), and Integration Services (IS), sustaining 99.9% platform availability.
   * Execute cloud modernization from on-prem PowerCenter to CDIPC and IICS / IDMC,
     deploying, clustering, and monitoring IICS Secure Agents on Linux and AWS EC2.
   * Architect end-to-end administrative automation via Python, Unix Shell, Jenkins,
     and ServiceNow APIs to automate health checks, ticket auto-creation, log rotation,
     and self-healing service restarts.
   * Enforce zero-trust security via CyberArk PAM, eliminating hardcoded credentials
     through automated vaulting and secret rotation for service accounts and Oracle 19c /
     Teradata database connections.
   * Provide tier-3 support and rapid Root Cause Analysis (RCA) for hung threads, memory
     allocation bottlenecks, core dumps, and database connection timeouts (MTTR -35%).
   * Oversee platform governance: upgrades, EBFs, hotfixes, LDAP/AD synchronization,
     RBAC provisioning, and operational support for managed Informatica MDM instances.

2. Programmer Analyst Intern – ETL & Data Management
   Cognizant Technology Solutions | Chennai / Dehradun, India
   [Feb 2022 – Sep 2022]
   * Gained hands-on experience in Informatica PowerCenter by developing and maintaining
     small-scale ETL mappings, workflows, sessions, and reusable transformations.
   * Mastered end-to-end ETL processes: source analysis, extraction, transformation logic,
     loading, and post-load validation using SQL and PL/SQL.

KEY ENTERPRISE PROJECTS:
* Enterprise Admin Automation & Self-Healing Framework (Python, Shell, Jenkins, ServiceNow, CyberArk)
* PowerCenter to CDIPC & IICS/IDMC Cloud Modernization (CDIPC, IICS, AWS EC2, Linux)
* PowerCenter 10.x Multi-Node Grid Upgrade & DR Testing (PowerCenter 10.x, HA/DR, Oracle 19c)

CERTIFICATIONS:
* Informatica IDMC Foundation – Informatica
* Databricks Certified Generative AI Engineer
* Informatica CLAIRE AI Foundation – Informatica
* Databricks Certified Associate Data Analyst
* GitHub Copilot Certified
* IBM Cloud App Developer & Data Science Mastery

EDUCATION:
Bachelor of Technology (B.Tech) in Computer Science & Engineering [2018 - 2022]
Graphic Era Hill University, Dehradun | GPA: 8.4 / 10.0
Specialization in Data Science (IBM)`
        },
        {
            id: "internet-explorer",
            name: "Internet Explorer",
            type: "app",
            appType: "ie",
            icon: "ie",
            x: 20,
            y: 356,
            readOnly: true
        },
        {
            id: "portfolio-projects-folder",
            name: "Enterprise Projects",
            type: "app",
            appType: "explorer",
            targetPath: "D:\\Enterprise Projects",
            icon: "folder-projects",
            x: 20,
            y: 440,
            readOnly: false
        },
        {
            id: "cmd-prompt",
            name: "Command Prompt",
            type: "app",
            appType: "cmd",
            icon: "cmd",
            x: 104,
            y: 20,
            readOnly: true
        },
        {
            id: "contact-card",
            name: "Contact Info.txt",
            type: "file",
            appType: "notepad",
            icon: "notepad-file",
            x: 104,
            y: 104,
            content: `CONTACT INFORMATION - RAJA RAWAT
---------------------------------------------
Name:     Raja Rawat
Role:     Informatica Administrator (PowerCenter | CDIPC | IICS/IDMC)
Company:  Cognizant Technology Solutions
Location: Chennai, Tamil Nadu, India
Phone:    +91 8449925779
Email:    rajarawat262000@gmail.com
LinkedIn: https://www.linkedin.com/in/raja-rawat-etl/

STATUS: Open to Senior Informatica / Cloud Data Integration opportunities!`
        },
        {
            id: "certifications-txt",
            name: "Certifications.txt",
            type: "file",
            appType: "notepad",
            icon: "notepad-file",
            x: 104,
            y: 188,
            content: `OFFICIAL INDUSTRY CERTIFICATIONS - RAJA RAWAT
=====================================================
1. Informatica IDMC Foundation (Informatica)
2. Databricks Certified Generative AI Engineer
3. Informatica CLAIRE AI Foundation (Informatica)
4. Databricks Certified Associate Data Analyst
5. GitHub Copilot Certified
6. IBM Cloud App Developer & Data Science Mastery`
        },
        {
            id: "minesweeper",
            name: "Minesweeper",
            type: "app",
            appType: "minesweeper",
            icon: "minesweeper",
            x: 104,
            y: 272,
            readOnly: true
        },
        {
            id: "recycle-bin",
            name: "Recycle Bin",
            type: "app",
            appType: "recycle-bin",
            icon: "recycle-bin-empty",
            x: 104,
            y: 356,
            readOnly: true
        }
    ],

    // File tree for My Computer
    drives: {
        "C:": {
            name: "Local Disk (C:)",
            label: "SYSTEM",
            totalSpace: "40.0 GB",
            freeSpace: "26.4 GB",
            icon: "drive-c",
            items: [
                {
                    name: "About_Me.txt",
                    type: "file",
                    appType: "notepad",
                    icon: "notepad-file",
                    size: "2.1 KB",
                    modified: "10/06/2026 10:15 AM",
                    content: `ABOUT RAJA RAWAT
======================================
Informatica Administrator with 3+ years of specialized enterprise experience
in PowerCenter 10.x, CDIPC, and IICS/IDMC data integration architectures.

Current Position:
Associate Systems Engineer - Informatica Administrator at Cognizant Technology Solutions.
Client: Horizon Blue NJ (US Healthcare).

Highlights:
- Sustaining 99.9% platform availability across mission-critical domains.
- Engineering automated health-checks & self-healing daemons using Python & Shell.
- Zero-trust security enforcement using CyberArk PAM.
- PowerCenter to CDIPC and IICS Secure Agent clustering on AWS EC2.
- 6 Industry Certifications across Informatica IDMC, Databricks AI, and Copilot.`
                },
                {
                    name: "Technical_Skills.txt",
                    type: "file",
                    appType: "notepad",
                    icon: "notepad-file",
                    size: "2.8 KB",
                    modified: "10/06/2026 11:20 AM",
                    content: `TECHNICAL SKILL INVENTORY - RAJA RAWAT
=====================================================
INFORMATICA & CLOUD INTEGRATION:
  * Informatica PowerCenter (10.x / 9.x)
  * CDIPC (Cloud Data Integration for PowerCenter)
  * IICS / IDMC (Cloud Data & Application Integration)
  * Secure Agent Clustering & Load Balancing
  * Grid & Repository Services (RS / IS)
  * Managed MDM Systems

AUTOMATION & SCRIPTING:
  * Python Scripting, Unix Shell Scripting (Bash/ksh)
  * Jenkins CI/CD Pipelines
  * ServiceNow REST API (Incident / Change automation)
  * CyberArk PAM (Credential vaulting & secret injection)
  * Informatica CLI: pmcmd, pmrep, infacmd

PLATFORMS & DATABASES:
  * Linux (RHEL, CentOS), AIX, Windows Server
  * AWS (EC2, S3), Azure, Databricks
  * Oracle (12c/19c), Teradata, MySQL, SQL Server
  * PL/SQL, Advanced SQL, ODBC/TNS Configuration

ADMINISTRATION & GOVERNANCE:
  * High Availability (HA) & Disaster Recovery (DR)
  * DTM Buffer & Session Performance Tuning
  * Tier-3 Root Cause Analysis (RCA) - hung threads, core dumps
  * LDAP / Active Directory & RBAC Security Provisioning
  * SSL/TLS & SAML Integration
  * EBFs, Service Packs & Hotfixes`
                },
                {
                    name: "Experience_Cognizant.txt",
                    type: "file",
                    appType: "notepad",
                    icon: "notepad-file",
                    size: "3.2 KB",
                    modified: "10/06/2026 09:40 AM",
                    content: `PROFESSIONAL EXPERIENCE:
=====================================================
COGNIZANT TECHNOLOGY SOLUTIONS | CHENNAI, INDIA
Client: Horizon Blue NJ (US HealthCare)
Role: Associate Systems Engineer - Informatica Administrator
Period: Feb 2023 – Present

Key Deliverables:
- Administer enterprise PowerCenter 10.x domains, multi-node grids, and Integration Services.
- Maintain 99.9% platform availability across Production, QA, and DEV environments.
- Migrated legacy workloads to CDIPC and IICS/IDMC with clustered Secure Agents on AWS EC2.
- Automated health-checks and self-healing service restarts using Python, Shell, and Jenkins.
- Eliminated hardcoded credentials across service accounts using CyberArk PAM vaulting.
- Conducted Tier-3 RCA for hung threads, memory allocation bottlenecks, and DB timeouts (-35% MTTR).
- Applied EBFs, Hotfixes, and synchronized LDAP/Active Directory user accounts.`
                },
                {
                    name: "Printable_Resume.html",
                    type: "app",
                    appType: "resume-viewer",
                    icon: "ie",
                    size: "14.2 KB",
                    modified: "10/06/2026 09:00 AM"
                },
                {
                    name: "My Documents",
                    type: "folder",
                    appType: "explorer",
                    targetPath: "C:\\My Documents",
                    icon: "folder",
                    size: "--",
                    modified: "10/06/2026 08:00 AM"
                },
                {
                    name: "System32",
                    type: "folder",
                    appType: "explorer",
                    targetPath: "C:\\WINNT\\System32",
                    icon: "folder-system",
                    size: "--",
                    modified: "10/06/2026 08:00 AM"
                }
            ]
        },
        "D:": {
            name: "Work & Projects (D:)",
            label: "PROJECTS",
            totalSpace: "60.0 GB",
            freeSpace: "44.2 GB",
            icon: "drive-d",
            items: [
                {
                    name: "Enterprise Admin Automation",
                    type: "folder",
                    appType: "explorer",
                    targetPath: "D:\\Enterprise Projects\\AdminAutomation",
                    icon: "folder-projects",
                    size: "--",
                    modified: "10/05/2026 02:15 PM"
                },
                {
                    name: "CDIPC & IICS Modernization",
                    type: "folder",
                    appType: "explorer",
                    targetPath: "D:\\Enterprise Projects\\CDIPC_IICS",
                    icon: "folder-projects",
                    size: "--",
                    modified: "10/04/2026 05:30 PM"
                },
                {
                    name: "PowerCenter 10x Grid & DR",
                    type: "folder",
                    appType: "explorer",
                    targetPath: "D:\\Enterprise Projects\\PowerCenter_HA_DR",
                    icon: "folder-projects",
                    size: "--",
                    modified: "10/03/2026 11:10 AM"
                },
                {
                    name: "Projects_Overview.txt",
                    type: "file",
                    appType: "notepad",
                    icon: "notepad-file",
                    size: "2.6 KB",
                    modified: "10/06/2026 10:00 AM",
                    content: `ENTERPRISE PROJECTS OVERVIEW - RAJA RAWAT
=============================================================
1. ENTERPRISE ADMIN AUTOMATION & SELF-HEALING FRAMEWORK
   Stack: Python, Shell, Jenkins, ServiceNow API, CyberArk PAM
   Summary: Automated operations suite for domain health checks, automated
   ticket resolution via ServiceNow, and CyberArk credential injection.

2. POWERCENTER TO CDIPC & IICS/IDMC CLOUD MODERNIZATION
   Stack: CDIPC, IICS, AWS EC2, Linux RHEL, Secure Agent Clustering
   Summary: Migrated legacy on-prem workloads into hybrid IICS/IDMC runtime;
   architected multi-node Secure Agent clusters with automated failover.

3. POWERCENTER 10.x MULTI-NODE GRID UPGRADE & DR TESTING
   Stack: PowerCenter 10.x, HA/DR, Oracle 19c, Linux
   Summary: Orchestrated infrastructure validation, repository backup/restore,
   and failover drills across multi-node grids ensuring seamless DR.`
                }
            ]
        },
        "A:": {
            name: "3½ Floppy (A:)",
            label: "FLOPPY",
            totalSpace: "1.44 MB",
            freeSpace: "0 KB",
            icon: "floppy",
            isFloppy: true,
            items: []
        }
    },

    folders: {
        "C:\\My Documents": [
            {
                name: "Raja_Rawat_Resume.txt",
                type: "file",
                appType: "notepad",
                icon: "notepad-file",
                size: "4.5 KB",
                modified: "10/06/2026 09:12 AM",
                content: `RAJA RAWAT - INFORMATICA ADMINISTRATOR RESUME
=====================================================
Location: Chennai, Tamil Nadu, India
Phone:    +91 8449925779
Email:    rajarawat262000@gmail.com
LinkedIn: https://www.linkedin.com/in/raja-rawat-etl/

See Desktop icon 'Printable Resume.html' for the official A4 formatted version.`
            },
            {
                name: "Certifications.txt",
                type: "file",
                appType: "notepad",
                icon: "notepad-file",
                size: "1.2 KB",
                modified: "10/06/2026 09:15 AM",
                content: `CERTIFICATIONS SUMMARY:
- Informatica IDMC Foundation – Informatica
- Databricks Certified Generative AI Engineer
- Informatica CLAIRE AI Foundation – Informatica
- Databricks Certified Associate Data Analyst
- GitHub Copilot Certified
- IBM Cloud App Developer & Data Science Mastery`
            },
            {
                name: "Education.txt",
                type: "file",
                appType: "notepad",
                icon: "notepad-file",
                size: "1.0 KB",
                modified: "10/05/2026 04:00 PM",
                content: `EDUCATION:
Degree: Bachelor of Technology (B.Tech) in Computer Science & Engineering
Institution: Graphic Era Hill University, Dehradun
Period: Aug 2018 – Jun 2022
GPA: 8.4 / 10.0
Specialization: Data Science (IBM)`
            }
        ],
        "C:\\WINNT\\System32": [
            {
                name: "cmd.exe",
                type: "app",
                appType: "cmd",
                icon: "cmd",
                size: "245 KB",
                modified: "10/06/2026 08:00 AM"
            },
            {
                name: "notepad.exe",
                type: "app",
                appType: "notepad",
                icon: "notepad-file",
                size: "64 KB",
                modified: "10/06/2026 08:00 AM"
            },
            {
                name: "winmine.exe",
                type: "app",
                appType: "minesweeper",
                icon: "minesweeper",
                size: "112 KB",
                modified: "10/06/2026 08:00 AM"
            }
        ],
        "D:\\Enterprise Projects": [
            {
                name: "Enterprise Admin Automation",
                type: "folder",
                appType: "explorer",
                targetPath: "D:\\Enterprise Projects\\AdminAutomation",
                icon: "folder-projects",
                size: "--",
                modified: "10/05/2026 02:15 PM"
            },
            {
                name: "CDIPC & IICS Modernization",
                type: "folder",
                appType: "explorer",
                targetPath: "D:\\Enterprise Projects\\CDIPC_IICS",
                icon: "folder-projects",
                size: "--",
                modified: "10/04/2026 05:30 PM"
            },
            {
                name: "PowerCenter 10x Grid & DR",
                type: "folder",
                appType: "explorer",
                targetPath: "D:\\Enterprise Projects\\PowerCenter_HA_DR",
                icon: "folder-projects",
                size: "--",
                modified: "10/03/2026 11:10 AM"
            }
        ],
        "D:\\Enterprise Projects\\AdminAutomation": [
            {
                name: "Architecture_Spec.txt",
                type: "file",
                appType: "notepad",
                icon: "notepad-file",
                size: "1.8 KB",
                modified: "10/05/2026 02:15 PM",
                content: `ENTERPRISE ADMIN AUTOMATION & SELF-HEALING FRAMEWORK
======================================================
Key Capabilities:
- Automated daily health checks for PowerCenter nodes, RS, and IS services.
- CyberArk PAM integration dynamically injects DB & service credentials without hardcoding.
- ServiceNow REST API integration automatically logs incidents for hung workflows.
- Self-healing cron/Jenkins jobs restart unresponsive daemons, preventing downtime.`
            }
        ],
        "D:\\Enterprise Projects\\CDIPC_IICS": [
            {
                name: "Migration_Strategy.txt",
                type: "file",
                appType: "notepad",
                icon: "notepad-file",
                size: "1.9 KB",
                modified: "10/04/2026 05:30 PM",
                content: `POWERCENTER TO CDIPC & IICS/IDMC MODERNIZATION
======================================================
Key Highlights:
- Deployed and configured IICS Secure Agent clusters on AWS EC2 instances.
- Migrated on-prem PowerCenter mappings and workflows into CDIPC runtime.
- Setup custom load-balancing groups ensuring high availability and seamless failover.`
            }
        ],
        "D:\\Enterprise Projects\\PowerCenter_HA_DR": [
            {
                name: "DR_Playbook.txt",
                type: "file",
                appType: "notepad",
                icon: "notepad-file",
                size: "1.7 KB",
                modified: "10/03/2026 11:10 AM",
                content: `POWERCENTER 10.X MULTI-NODE GRID UPGRADE & DR
======================================================
Key Highlights:
- Multi-node grid setup on RHEL with Oracle 19c repository databases.
- Semi-annual DR failover drill execution with zero data corruption.
- DTM Buffer tuning for memory optimization under heavy batch cycles.`
            }
        ]
    }
};
