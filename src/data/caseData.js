// The Last Trace — Aarohan 2026 | FACE Club Internal Event
// Fictional Asterion Institute for Clinical Systems Case Archive

export const EVENT_INFO = {
  title: "The Last Trace",
  edition: "Aarohan 2026",
  club: "FACE Club",
  audience: "Grades 11–12",
  teamSize: "2–3 participants",
  durationMinutes: 120,
  round1Duration: 45,
  round2Duration: 45,
  scoring: {
    round1Max: 100,
    round2Max: 100,
    hintPenalty: 5,
    round2CulpritMarks: 60,
    round2MotiveMarks: 40,
  },
  codeword: "THELASTTRACEKEY",
  incidentId: "AST-2026-0950",
  institute: "Asterion Institute for Clinical Systems",
  incidentTime: "Thursday, 21:50 IST",
  victim: "Dr. Adrian John, Director of Research",
  location: "Sealed Archive Room 4B, Level -1",
};

export const STORYLINE = {
  briefing: `At 9:50 p.m. on a stormy Thursday, Dr. Adrian John, Research Director at the Asterion Institute for Clinical Systems, was discovered dead inside the hermetically sealed Archive Room. 

The next morning at 10:00 a.m., he was scheduled to deliver an unredacted disclosure to the Institute's Ethics Oversight Board demonstrating that the Institute's flagship study—Project LANTERN (an automated cardiac telemetry algorithm)—had been fraudulently manipulated. Three raw patient observations were deleted and baseline parameters shifted to report 99.4% efficacy.

Before the scheduled review, the archive database index was corrupted, the primary tape backup disappeared, and an export audit log surfaced pointing directly at a junior data analyst.

Ten individuals within Asterion had motive, clearance, or proximity. As independent digital forensic investigators, your team must solve the Round 1 technical codes to recover the Archive Access Key, then dissect the digital records, logs, and cryptographic anomalies to indict the true culprit and prove the underlying motive.`,
  rules: [
    "Round 1 consists of 15 technical and cryptographic tasks. Each task yields one character of the 15-letter master key: THELASTTRACEKEY.",
    "Round 2 unlocks upon entering the valid 15-character key. Your 45-minute investigation timer begins on first entry into Round 2.",
    "Each hint accessed deducts 5 marks from your team total. Score floor is zero.",
    "All suspect profiles, network logs, badge records, and codebooks are fictional and self-contained within this portal. Do not scan external networks.",
    "Final submission requires identifying the primary culprit, the exact decoded motive phrase, and connecting at least 3 supporting evidence files.",
  ],
  schedule: [
    { time: "00:00 – 00:10", activity: "Welcome & Briefing", notes: "Storyline context, rules, timer mechanics, hint deductions." },
    { time: "00:10 – 00:55", activity: "Round 1 — The Code Breaker", notes: "15 forensic reasoning tasks. Target: Recover THELASTTRACEKEY." },
    { time: "00:55 – 01:00", activity: "Transition & Verification", notes: "Enter master codeword to breach archive lockdown." },
    { time: "01:00 – 01:45", activity: "Round 2 — The Investigation", notes: "Examine 10 suspects, 8 interconnected evidence files, motive decoder." },
    { time: "01:45 – 01:50", activity: "Final Submissions", notes: "Lock accusation, motive phrase, and evidence justification." },
    { time: "01:50 – 02:00", activity: "Solution Reveal & Closing", notes: "Live walkthrough of timeline anomalies, false leads, and indictment." },
  ],
};

// 15 Tasks for Round 1 corresponding to THELASTTRACEKEY
export const ROUND1_TASKS = [
  {
    id: 1,
    character: "T",
    title: "The Shifted Transponder",
    difficulty: "Easy",
    domain: "Cipher / Coding",
    timeEstimate: "2-3 mins",
    prompt: `A communication snippet intercepted from Dr. John's desktop was scrambled using a classic Caesar shift (+3 forward in the Latin alphabet). 
Decipher the scrambled text below to find the target word:

Scrambled: "WDUJHW"`,
    artifactType: "code",
    artifact: `// Intercepted Packet #01
CIPHERTEXT: WDUJHW
ALGORITHM : CAESAR_SHIFT(K = +3)
CHARSET   : A-Z (Uppercase)`,
    hints: [
      "Caesar cipher shifts each letter forward by 3. To decode, shift backwards by 3 (e.g., D -> A).",
      "W - 3 = T; D - 3 = A; U - 3 = R; J - 3 = G; H - 3 = E; W - 3 = T.",
    ],
    acceptedAnswer: "TARGET",
    solution: "Applying a Caesar shift of -3 to 'WDUJHW' yields 'TARGET'. This unlocks the first character: T.",
  },
  {
    id: 2,
    character: "H",
    title: "Binary Telemetry Stream",
    difficulty: "Easy",
    domain: "Binary / ASCII",
    timeEstimate: "2-3 mins",
    prompt: `Asterion's Level -1 environmental sensor logged this 8-bit binary ASCII byte immediately prior to the door lock failure. Convert the binary byte to its ASCII character representation:

Binary: 01001000`,
    artifactType: "code",
    artifact: `// Environmental Monitor Log
SENSOR_ID : ENV-B1-ARCHIVE
TIMESTAMP : 21:49:12
RAW_BITS  : 01001000
FORMAT    : 8-BIT UNSIGNED ASCII`,
    hints: [
      "Break down powers of 2: 0*128 + 1*64 + 0*32 + 0*16 + 1*8 + 0*4 + 0*2 + 0*1 = 64 + 8 = 72 in decimal.",
      "Decimal 72 corresponds to uppercase letter 'H' in the ASCII table (A=65, B=66, ... H=72).",
    ],
    acceptedAnswer: "H",
    solution: "01001000 in binary equals decimal 72. ASCII character 72 is 'H'.",
  },
  {
    id: 3,
    character: "E",
    title: "Pulse Wave Calibration",
    difficulty: "Easy",
    domain: "Mathematics & Physics",
    timeEstimate: "3 mins",
    prompt: `The telemetry sensor measures an optical calibration pulse with a wavelength λ = 500 nm (500 × 10⁻⁹ m) traveling through a specialized optical fibre with propagation speed v = 2.0 × 10⁸ m/s. 

Calculate the frequency of the pulse in TeraHertz (THz, 1 THz = 10¹² Hz). Enter the numerical integer value:`,
    artifactType: "formula",
    artifact: `WAVE_EQUATION : v = f * λ
PROBING_SPEED : v = 2.0 × 10^8 m/s
WAVELENGTH    : λ = 500 nm = 500 × 10^-9 m = 5.0 × 10^-7 m
TARGET_UNIT   : THz (10^12 Hz)`,
    hints: [
      "Use f = v / λ. Substitute (2.0 × 10⁸) / (5.0 × 10⁻⁷).",
      "(2.0 / 5.0) × 10¹⁵ = 0.4 × 10¹⁵ Hz = 400 × 10¹² Hz = 400 THz.",
    ],
    acceptedAnswer: "400",
    solution: "f = v / λ = (2.0 × 10⁸ m/s) / (5.0 × 10⁻⁷ m) = 4.0 × 10¹⁴ Hz = 400 THz. Answer is 400.",
  },
  {
    id: 4,
    character: "L",
    title: "Archive Sequence Anomaly",
    difficulty: "Easy",
    domain: "Pattern Recognition",
    timeEstimate: "2 mins",
    prompt: `The archive system auto-generates sequential backup partition identifiers according to a specific hex increment pattern:

0x10, 0x18, 0x20, 0x28, 0x30, [ ? ]

What is the next hex identifier in the sequence? (Enter in format 0x.. or hex value)`,
    artifactType: "table",
    artifact: `PARTITION_ID | OFFSET (HEX) | OFFSET (DEC)
PART-01      | 0x10         | 16
PART-02      | 0x18         | 24
PART-03      | 0x20         | 32
PART-04      | 0x28         | 40
PART-05      | 0x30         | 48
PART-06      | [ ? ]        | 56`,
    hints: [
      "Observe the decimal difference: 16, 24, 32, 40, 48... each step adds 8.",
      "48 + 8 = 56 decimal. In hexadecimal, 56 = (3 × 16) + 8 = 0x38.",
    ],
    acceptedAnswer: "0x38",
    solution: "The series increments by 8 (0x08). 0x30 + 0x08 = 0x38.",
  },
  {
    id: 5,
    character: "A",
    title: "Telemetry Checksum Loop",
    difficulty: "Easy",
    domain: "Programming Trace",
    timeEstimate: "3 mins",
    prompt: `A data processing routine in the LANTERN pipeline computes an accumulator value before exporting logs. Determine the final value printed by this code:

\`\`\`python
acc = 12
for k in range(1, 5):
    if k % 2 == 0:
        acc += k * 3
    else:
        acc -= k
print(acc)
\`\`\`
What is the final integer value of acc?`,
    artifactType: "code",
    artifact: `# LANTERN Raw Validator Fragment
acc = 12
for k in range(1, 5): # k = 1, 2, 3, 4
    if k % 2 == 0:
        acc += k * 3
    else:
        acc -= k
print(acc)`,
    hints: [
      "Trace each iteration: k=1 (odd: acc = 12 - 1 = 11); k=2 (even: acc = 11 + 6 = 17).",
      "Continue: k=3 (odd: acc = 17 - 3 = 14); k=4 (even: acc = 14 + 12 = 26).",
    ],
    acceptedAnswer: "26",
    solution: "Initial acc=12. k=1: 12-1=11; k=2: 11+6=17; k=3: 17-3=14; k=4: 14+12=26. Result is 26.",
  },
  {
    id: 6,
    character: "S",
    title: "Modular Authentication Key",
    difficulty: "Medium",
    domain: "Modular Arithmetic / Crypto",
    timeEstimate: "3-4 mins",
    prompt: `The archive gateway enforces a modular verification check using public modulo n = 37.
Calculate the value of:
R = (7³ + 15) mod 37

Enter the integer result:`,
    artifactType: "formula",
    artifact: `GATEWAY_AUTH_PARAM : n = 37
CHALLENGE_SEED     : a = 7, exp = 3, b = 15
VERIFICATION_EQ    : R = (a^3 + b) mod n`,
    hints: [
      "Calculate 7³ = 343.",
      "343 + 15 = 358. Now compute 358 mod 37: 37 × 9 = 333; 358 - 333 = 25.",
    ],
    acceptedAnswer: "25",
    solution: "7³ = 343. 343 + 15 = 358. 358 = 9 × 37 + 25. Thus 358 mod 37 = 25.",
  },
  {
    id: 7,
    character: "T",
    title: "Steganographic Header Leak",
    difficulty: "Medium",
    domain: "Steganography",
    timeEstimate: "3-4 mins",
    prompt: `An emergency telemetry snapshot bitmap header had least significant bits (LSB) embedded into the byte stream of the header metadata:

Bytes (hex): 0x46, 0x4C, 0x41, 0x47
Extract the ASCII string decoded directly from these four ASCII hex bytes:`,
    artifactType: "hex",
    artifact: `OFFSET    | 00 01 02 03 | ASCII
00000000  | 46 4C 41 47 | FLAG`,
    hints: [
      "0x46 in ASCII is 'F', 0x4C is 'L'.",
      "0x41 is 'A', 0x47 is 'G'. Combine them together.",
    ],
    acceptedAnswer: "FLAG",
    solution: "0x46 = 'F', 0x4C = 'L', 0x41 = 'A', 0x47 = 'G'. Decoded string is 'FLAG'.",
  },
  {
    id: 8,
    character: "T",
    title: "Fictional OSINT Domain Audit",
    difficulty: "Medium",
    domain: "Fictional OSINT",
    timeEstimate: "3-4 mins",
    prompt: `Investigating an outbound DNS query in the gateway log at 21:05, you find a reverse DNS PTR record:

\`18.44.204.10.in-addr.arpa -> ops-relay.internal.asterion-clinical.org\`

The investigation team needs the exact hostname prefix of the server (the first subdomain label before .internal):`,
    artifactType: "table",
    artifact: `DNS_QUERY_LOG #49102
CLIENT_IP   : 10.204.44.18
LOOKUP_TYPE : PTR
RECORD_DATA : ops-relay.internal.asterion-clinical.org
STATUS      : NOERROR (TTL 300)`,
    hints: [
      "Look at the full domain: ops-relay.internal.asterion-clinical.org.",
      "The first label (the hostname component before .internal) is 'ops-relay'.",
    ],
    acceptedAnswer: "ops-relay",
    solution: "The host component of 'ops-relay.internal.asterion-clinical.org' is 'ops-relay'.",
  },
  {
    id: 9,
    character: "R",
    title: "Spectrometry Calibration Ratio",
    difficulty: "Medium",
    domain: "Chemistry / Data Analysis",
    timeEstimate: "3-4 mins",
    prompt: `In the lab toxicology screen, a compound absorbance reading at 280 nm is A = 0.84. 
Given the molar extinction coefficient ε = 4200 L/(mol·cm) and path length l = 1 cm:

According to Beer-Lambert Law: A = ε · c · l
Calculate the concentration c in micromoles per liter (μmol/L or μM).
Enter the integer value:`,
    artifactType: "formula",
    artifact: `BEER_LAMBERT_LAW : A = ε * c * l
ABSORBANCE (A)   : 0.84
MOLAR_EXTINCTION : 4200 L/(mol*cm)
PATH_LENGTH (l)  : 1.0 cm
CONVERSION       : 1 mol/L = 1,000,000 μmol/L`,
    hints: [
      "c = A / (ε × l) = 0.84 / 4200 = 0.0002 mol/L.",
      "Convert 0.0002 mol/L to μmol/L: 0.0002 × 1,000,000 = 200.",
    ],
    acceptedAnswer: "200",
    solution: "c = 0.84 / (4200 × 1) = 0.0002 M. 0.0002 × 10⁶ = 200 μmol/L.",
  },
  {
    id: 10,
    character: "A",
    title: "Forensic Timestamp Skew Cross-Check",
    difficulty: "Medium-Hard",
    domain: "Logic / Forensic Log Cross-Check",
    timeEstimate: "4 mins",
    prompt: `Forensic audit log #904 shows an index export occurred at 21:31 according to workstation N-04's local clock. 
However, an NTP server diagnostic reveals that N-04's hardware RTC clock is running exactly 7 minutes FAST (+00:07:00).

What was the TRUE wall-clock time of the export?
(Enter in 24-hour format HH:MM, e.g. 21:00)`,
    artifactType: "table",
    artifact: `AUDIT_EVENT_LOG #904
RECORDED_TIME : 21:31:00
TERMINAL_ID   : WORKSTATION_N-04
NTP_METRIC    : CLOCK_SKEW_OFFSET = +00:07:00 (FAST)
CORRECTION    : TRUE_TIME = RECORDED_TIME - CLOCK_SKEW`,
    hints: [
      "If the terminal clock is 7 minutes FAST, the real time is 7 minutes EARLIER than what is displayed.",
      "21:31 minus 7 minutes = 21:24.",
    ],
    acceptedAnswer: "21:24",
    solution: "21:31 - 7 minutes = 21:24. The export actually occurred at 21:24.",
  },
  {
    id: 11,
    character: "C",
    title: "Memory Allocation Traversal",
    difficulty: "Medium-Hard",
    domain: "Programming / Algorithm Reasoning",
    timeEstimate: "4-5 mins",
    prompt: `Analyze the following linked-node pointer jumps from the archive indexer memory dump:

Nodes:
Node(10) -> Node(30)
Node(20) -> Node(50)
Node(30) -> Node(40)
Node(40) -> Node(20)
Node(50) -> Node(10)

If a traversal starts at Node(10), what is the value of the node visited on the 4th step?
(Step 0 = 10, Step 1 = 30, Step 2 = 40, etc.)`,
    artifactType: "code",
    artifact: `NODE_MAP = {
  10: 30,
  20: 50,
  30: 40,
  40: 20,
  50: 10
}
START = 10`,
    hints: [
      "Step 0: 10; Step 1: 30; Step 2: 40.",
      "Step 3: Node 40 points to 20; Step 4: Node 20 points to 50.",
    ],
    acceptedAnswer: "50",
    solution: "10 -> 30 (step 1) -> 40 (step 2) -> 20 (step 3) -> 50 (step 4). The value is 50.",
  },
  {
    id: 12,
    character: "E",
    title: "Multi-Stage XOR Permutation",
    difficulty: "Hard",
    domain: "Multi-Stage Cipher",
    timeEstimate: "5 mins",
    prompt: `A secure transmission packet header was masked using bitwise XOR with single-byte key K = 0xAA (10101010 in binary).
The masked byte retrieved from the buffer is 0xFE (11111110 in binary).

Compute the original unmasked byte:
Byte = Masked XOR K
Enter the result as a 2-character uppercase Hex value (e.g. 54):`,
    artifactType: "hex",
    artifact: `BUFFER_DATA : 0xFE = 1111 1110 (bin)
XOR_KEY     : 0xAA = 1010 1010 (bin)
OPERATION   : 11111110 XOR 10101010`,
    hints: [
      "Bitwise XOR: 1 XOR 1 = 0; 1 XOR 0 = 1; 0 XOR 0 = 0.",
      "11111110 XOR 10101010 = 01010100 in binary. Convert 0101 0100 to hex.",
      "0101 = 5, 0100 = 4. Hex value is 54.",
    ],
    acceptedAnswer: "54",
    solution: "0xFE ^ 0xAA = 0x54 (Decimal 84). The hex result is 54.",
  },
  {
    id: 13,
    character: "K",
    title: "Doppler Velocity Discrepancy",
    difficulty: "Hard",
    domain: "Physics / Mathematical Clue",
    timeEstimate: "5 mins",
    prompt: `The archive HVAC airflow sensor uses an acoustic Doppler monitor. The emitted frequency is f₀ = 40,000 Hz. Speed of sound in room air is c = 340 m/s. 
A moving ventilation shutter reflects the sound, creating a measured frequency shift Δf = +800 Hz.

Using the Doppler reflection formula for reflection from a moving surface (v << c):
Δf ≈ 2 · v · f₀ / c

Calculate the speed v of the shutter in meters per second (m/s).
Enter the numerical value (integer or decimal):`,
    artifactType: "formula",
    artifact: `DOPPLER_FORMULA : Δf = (2 * v * f0) / c
EMITTED_FREQ    : f0 = 40,000 Hz
SOUND_SPEED     : c = 340 m/s
SHIFT_MEASURED  : Δf = 800 Hz`,
    hints: [
      "Rearrange formula: v = (Δf × c) / (2 × f₀).",
      "Substitute values: v = (800 × 340) / (2 × 40,000) = 272,000 / 80,000 = 3.4 m/s.",
    ],
    acceptedAnswer: "3.4",
    solution: "v = (800 × 340) / (2 × 40000) = 272,000 / 80,000 = 3.4 m/s.",
  },
  {
    id: 14,
    character: "E",
    title: "Cross-Artefact Registry Hash Match",
    difficulty: "Very Hard",
    domain: "Forensic Cross-Reference",
    timeEstimate: "5-6 mins",
    prompt: `Examine the two forensic extracts below:
Extract A contains server access tokens and their corresponding MD5 hash prefixes.
Extract B shows the last authenticated session before the archive room was sealed:

Extract A:
• Token 'OPS-ALPHA' -> MD5: 9a8b7c...
• Token 'OPS-BETA'  -> MD5: d41d8c...
• Token 'OPS-GAMMA' -> MD5: 7c2bee...
• Token 'OPS-DELTA' -> MD5: e2fc71...

Extract B:
The session used a token whose MD5 hash prefix matched the corrupted archive copy checksum prefix (7c2b).

Which token was used? Enter the token string:`,
    artifactType: "table",
    artifact: `EXTRACT_A: TOKEN REGISTRY
[ID: 101] OPS-ALPHA | HASH: 9a8b7c42
[ID: 102] OPS-BETA  | HASH: d41d8cd9
[ID: 103] OPS-GAMMA | HASH: 7c2bee90
[ID: 104] OPS-DELTA | HASH: e2fc7149

EXTRACT_B: CORRUPTED ARCHIVE ARTIFACT
FILE_NAME: lantern_raw.csv (archive copy)
CHECKSUM_PREFIX: 7c2b`,
    hints: [
      "Compare the checksum prefix '7c2b' with the hashes listed in Extract A.",
      "OPS-GAMMA has hash prefix '7c2bee...', exactly matching the 7c2b prefix.",
    ],
    acceptedAnswer: "OPS-GAMMA",
    solution: "OPS-GAMMA's MD5 prefix is 7c2bee..., matching the archive copy's 7c2b prefix. Token is OPS-GAMMA.",
  },
  {
    id: 15,
    character: "Y",
    title: "Cryptographic Synthesis Check",
    difficulty: "Very Hard",
    domain: "Multi-Step Synthesis",
    timeEstimate: "6 mins",
    prompt: `To unlock the final character of the key, synthesize three parameters extracted from previous forensic tasks:
1. P1 = Wavelength from Task 3 (in hundreds of nm: 500 nm -> 5)
2. P2 = Modular result from Task 6 (25)
3. P3 = Hex value from Task 12 converted to decimal (0x54 = 84)

Compute the final checksum value:
Z = (P1 × P2) + P3

Enter the integer value:`,
    artifactType: "formula",
    artifact: `SYNTHESIS_EQUATION : Z = (P1 * P2) + P3
PARAM_1 : 5 (from 500 nm / 100)
PARAM_2 : 25 (from Task 6 modulo)
PARAM_3 : 84 (from Task 12 0x54 in dec)`,
    hints: [
      "P1 = 5, P2 = 25, P3 = 84.",
      "Calculate: (5 × 25) = 125. Then 125 + 84 = 209.",
    ],
    acceptedAnswer: "209",
    solution: "(5 × 25) + 84 = 125 + 84 = 209. The final synthesis integer is 209, giving the last character 'Y'.",
  },
];

// 10 Suspect Placards for Round 2
export const SUSPECTS = [
  {
    id: "voss",
    name: "Dr. Mira Voss",
    role: "Operations Lead",
    badgeId: "M-VOSS",
    clearance: "Level 4 (Archive & Infrastructure)",
    summary: "Oversees research computing operations and repository integrity. Has direct administrative control over physical archive access and backup retention.",
    relationship: "Dr. John's peer and former co-investigator on Project LANTERN. Voss was responsible for clinical deployment milestones that tied directly to institutional funding.",
    statement: "I was in my fourth-floor office finalizing the quarterly operations summary until 10:15 p.m. I heard the alarm sound around 9:55 p.m. but assumed it was the scheduled server reboot.",
    alibi: "Claims she stayed in her office all evening. However, badge records show her access card M-VOSS was used at 21:14 at the Level -1 restricted corridor entrance.",
    redHerring: "Controlled archive permissions; the pending ethics review would expose her direct involvement in manipulating the baseline study records to meet grant milestones.",
    isCulprit: true,
    evidenceLinks: ["E-01", "E-02", "E-04", "E-05", "E-07", "E-08"],
    statusNotes: "PRIMARY CULPRIT. Badge entry matches time window (21:14); printed checklist under OPS-MV (21:22); authored suppressed checksum warning ticket OPS-447.",
  },
  {
    id: "reed",
    name: "Noah Reed",
    role: "Junior Data Analyst",
    badgeId: "N-REED",
    clearance: "Level 2 (Data Processing)",
    summary: "Joined Asterion eight months ago. Responsible for executing automated ETL scripts and compiling preliminary telemetry graphs for Project LANTERN.",
    relationship: "Had a heated dispute with Dr. John on Wednesday afternoon regarding anomalous data points in the trial output.",
    statement: "Dr. John shouted at me on Wednesday about missing records, but I swear I only ran the pipelines I was given! I was in the testing pod until 9:30 p.m., then left to grab coffee at the kiosk across the avenue.",
    alibi: "Badge N-REED shows a 21:28 event marked 'retry / denied' at the archive door. He never actually gained entry.",
    redHerring: "Argued intensely with Dr. John, and his username 'nreed' appears in a suspicious index export log at 21:08.",
    isCulprit: false,
    evidenceLinks: ["E-01", "E-02", "E-06"],
    statusNotes: "FALSE LEAD / FRAMED. The export log under 'nreed' used a test-environment token, a spoofed MAC address not matching his laptop, and workstation N-04 had a +7-minute clock offset.",
  },
  {
    id: "park",
    name: "Dr. Celia Park",
    role: "Senior Clinical Researcher",
    badgeId: "C-PARK",
    clearance: "Level 3 (Clinical Trials)",
    summary: "Lead author on the impending multi-centre LANTERN trial publication. Her career trajectory depended heavily on the study results being accepted.",
    relationship: "Long-standing colleague of Dr. John. Disagreed with him on publishing speed but shared his clinical philosophy.",
    statement: "I knew Adrian was uneasy about the baseline discrepancies. We spoke at 6:00 p.m. I told him we should delay publication until we re-ran the cohort. I had nothing to hide.",
    alibi: "Left the institute at 7:30 p.m. Security gate records and her home smart-lock confirm she was at home during the incident window.",
    redHerring: "Her prestigious clinical paper relied completely on the published study figures.",
    isCulprit: false,
    evidenceLinks: ["E-05"],
    statusNotes: "EXONERATED. Personal handwritten memos confirm she advocated delaying the paper, not destroying records or covering up discrepancies.",
  },
  {
    id: "menon",
    name: "Ravi Menon",
    role: "Systems Administrator",
    badgeId: "R-MENON",
    clearance: "Level 5 (Full SysAdmin Root)",
    summary: "Senior network and infrastructure engineer. Manages server maintenance, network security, and automated database backups across Asterion.",
    relationship: "Provided Dr. John with custom database extraction scripts last week at Dr. John's private request.",
    statement: "I was running an approved scheduled remote-maintenance sync on the central SAN storage array between 21:00 and 22:00 from the Level 2 NOC.",
    alibi: "Remained in the Network Operations Centre with two junior technicians throughout the maintenance window. Terminal sessions logged.",
    redHerring: "Possessed broad root privileges and approved the scheduled maintenance window that coincided with the camera pause.",
    isCulprit: false,
    evidenceLinks: ["E-01", "E-02"],
    statusNotes: "EXONERATED. Remote maintenance activity was officially scheduled two weeks in advance; verified no source file edit originated from his terminal.",
  },
  {
    id: "shaw",
    name: "Elena Shaw",
    role: "Ethics & Compliance Officer",
    badgeId: "E-SHAW",
    clearance: "Level 3 (Compliance & Legal)",
    summary: "Appointed by the Board of Trustees to oversee research ethics, patient data protection, and regulatory submissions.",
    relationship: "Was scheduled to receive Dr. John's whistleblower report and raw evidence dossier at 10:00 a.m. on Friday morning.",
    statement: "Adrian called me at 8:00 p.m. to confirm our 10:00 a.m. meeting. He told me he had proof of intentional manipulation. I was on a Zoom call with regional counsel from 21:15 to 22:00.",
    alibi: "Logged in on an encrypted conference call with legal counsel between 21:15 and 22:00; IP records and video recording confirm attendance.",
    redHerring: "Was due to initiate the formal investigation that would freeze all institute research grants.",
    isCulprit: false,
    evidenceLinks: ["E-01"],
    statusNotes: "EXONERATED. Verified third-party video call log places her off the archive floor continuously throughout the incident.",
  },
  {
    id: "bell",
    name: "Marcus Bell",
    role: "Security Supervisor",
    badgeId: "M-BELL",
    clearance: "Level 4 (Physical Security & CCTV)",
    summary: "Directs facility access, physical guard patrols, and digital surveillance camera systems at Asterion Institute.",
    relationship: "Dr. John had filed an internal grievance against Bell three months prior over slow badge credential revocations.",
    statement: "The archive corridor camera was offline between 21:40 and 21:46 due to a scheduled firmware patch cycle approved last Tuesday.",
    alibi: "Logged into the primary security control console on Level 1 during the entire shift. Patrol logs verified by automated NFC checkpoints.",
    redHerring: "Had the authority and technical capability to trigger camera pauses and suppress door breach alerts.",
    isCulprit: false,
    evidenceLinks: ["E-01"],
    statusNotes: "EXONERATED. Camera reboot was verified as an automated manufacturer patch; zero access logs to archive database or index files.",
  },
  {
    id: "lin",
    name: "Tessa Lin",
    role: "Senior Lab Technician",
    badgeId: "T-LIN",
    clearance: "Level 2 (Laboratory & Cold Storage)",
    summary: "Oversees physical sample intake, telemetry sensor tagging, and specimen barcode registries in Lab 3.",
    relationship: "Exchanged tense emails with Dr. John regarding overtime compensation and sample logging backlogs.",
    statement: "I finished cataloguing the 20:00 sample batch, logged out of the lab terminal at 21:05, and took the 21:20 metro train from the station.",
    alibi: "Metro smart-card swipe at Central Station confirmed at 21:19.",
    redHerring: "Complained bitterly about unpaid overtime and had access to physical sample barcoding machines.",
    isCulprit: false,
    evidenceLinks: [],
    statusNotes: "EXONERATED. Departed the facility before the key window; laboratory records show no correlation to digital LANTERN telemetry data.",
  },
  {
    id: "hale",
    name: "Omar Hale",
    role: "Finance & Grants Manager",
    badgeId: "O-HALE",
    clearance: "Level 3 (Administration & Accounts)",
    summary: "Monitors research budget disbursements, federal healthcare grants, and sponsor commercial milestones.",
    relationship: "Dr. John's planned ethics disclosure threatened to trigger immediate clawback of a $4.2M federal grant.",
    statement: "I was at a dinner meeting with institutional benefactors downtown from 19:30 to 22:30. Receipts and valet parking slips have been handed over.",
    alibi: "Verified by restaurant CCTV and multiple independent dinner guests downtown from 19:30 to 22:30.",
    redHerring: "Significant financial discrepancy existed on his ledger if grant funds were forced to be repaid.",
    isCulprit: false,
    evidenceLinks: [],
    statusNotes: "EXONERATED. Geographically off-site; no digital archive access permissions or technical ability to manipulate database hashes.",
  },
  {
    id: "cole",
    name: "Iris Cole",
    role: "Journalist-in-Residence",
    badgeId: "I-COLE",
    clearance: "Level 1 (Visitor / Press Room)",
    summary: "Independent health-tech investigative journalist on a 6-month fellowship documenting clinical trial data management.",
    relationship: "Had requested an on-the-record interview with Dr. John regarding anonymous tips she received about study reproducibility.",
    statement: "Adrian sent me a brief email at 18:30 saying 'Tomorrow you will have the real story.' I left the press room at 20:30 to draft my article in my hotel room.",
    alibi: "Hotel keycard log and lobby CCTV verify arrival at the Downtown Hyatt at 20:52.",
    redHerring: "Was actively hunting for a whistleblower scoop on Asterion's flagship clinical algorithm.",
    isCulprit: false,
    evidenceLinks: [],
    statusNotes: "EXONERATED. Remained at hotel; visitor badge access was deactivated at 20:30 by security desk.",
  },
  {
    id: "saye",
    name: "Prof. Victor Saye",
    role: "External Scientific Adviser",
    badgeId: "V-SAYE",
    clearance: "Level 2 (Advisory / Reports)",
    summary: "Eminent biostatistician who served on the design committee for the original Project LANTERN protocol.",
    relationship: "Dr. John's former PhD mentor. Saye was concerned that any scandal would permanently tarnish his academic legacy.",
    statement: "Adrian and I argued over statistical smoothing models two weeks ago. I sent him a critical draft review, but I want scientific truth, not violence.",
    alibi: "Participated in an academic symposium panel in Cambridge until 21:00; flight records confirm he did not arrive in the city until Friday noon.",
    redHerring: "Draft review severely criticized LANTERN's statistical claims and feared personal reputational harm.",
    isCulprit: false,
    evidenceLinks: [],
    statusNotes: "EXONERATED. In Cambridge during the incident; no credential or remote connection trace on Asterion internal networks.",
  },
];

// 8 Interconnected Evidence Files for Round 2
export const EVIDENCE_FILES = [
  {
    id: "E-01",
    code: "E-01",
    title: "Incident Timeline & Room-Access Summary",
    category: "Chronology & Telemetry",
    summary: "Establishes the chronological sequence of physical and digital events between 20:55 and 21:50, including a known terminal clock skew discrepancy.",
    content: `ASTERION INSTITUTE FOR CLINICAL SYSTEMS
INCIDENT CHRONOLOGY LOG — ARCHIVE CORRIDOR B-1
DATE: 29-OCT-2026 (THURSDAY) | ANALYST: FORENSIC UNIT 4

TIMELINE OF RECORDED EVENTS:
---------------------------------------------------------------------------------
20:55:10 — Dr. Adrian John enters Archive Corridor B-1 using Badge A-JOHN.
21:08:42 — Workstation N-04 records export request for 'lantern_archive_index'.
           [CRITICAL NOTE: Workstation N-04 hardware RTC has a documented +00:07:00 clock skew]
           [Actual corrected server timestamp of this request: 21:01:42]
21:14:05 — Badge M-VOSS is swiped at the Level -1 Archive Security Portal.
           DOOR LOCK: OPENED (Restricted access granted).
21:17:33 — Internal SQLite index database 'lantern_index.db' modified on SAN volume.
           Index hash changed; audit trigger suppressed.
21:22:15 — Network print job 'OPS-MV_TRANS_CHECK.prn' sent to Room B-12 network printer.
           Job Owner: OPS-MV. File printed: 'Archive Transfer Checklist'.
21:28:50 — Badge N-REED swiped at Archive door.
           DOOR LOCK: RETRY / DENIED (Insufficient clearance). Door was NOT opened.
21:31:00 — Workstation N-04 logs session close (Actual wall-clock time: 21:24:00).
21:40:00 — Corridor Camera CAM-B1-04 pauses video feed for automated firmware reboot.
21:46:12 — Camera CAM-B1-04 resumes normal video recording.
21:50:00 — Night shift security guard discovers Dr. Adrian John unresponsive inside Archive Room.
---------------------------------------------------------------------------------`,
    keyTakeaway: "Dr. Mira Voss entered at 21:14, immediately before the index modification at 21:17 and the OPS-MV printer job at 21:22. Noah Reed was denied entry at 21:28.",
  },
  {
    id: "E-02",
    code: "E-02",
    title: "Badge-Reader Access Export",
    category: "Physical Security",
    summary: "Raw access logs from the restricted Level -1 corridor card reader. Distinguishes successful entries from denied retries and remote windows.",
    content: `READER_ID: RDR-B1-ARCHIVE-SECURE
LOCATION: LEVEL -1, RESTRICTED ARCHIVE CORRIDOR
GATEWAY CONTROLLER: HID-EDGE-9080

EVENT_ID | TIMESTAMP | BADGE_ID | HOLDER_NAME     | CLEARANCE | STATUS
--------------------------------------------------------------------------------
#884102  | 20:55:10  | A-JOHN   | John, Adrian    | LEVEL 5   | GRANTED (ENTRY)
#884119  | 21:02:44  | G-GUARD1 | Santos, Diego   | LEVEL 2   | GRANTED (PATROL PASS)
#884135  | 21:14:05  | M-VOSS   | Voss, Mira      | LEVEL 4   | GRANTED (ENTRY)
#884152  | 21:28:50  | N-REED   | Reed, Noah      | LEVEL 2   | DENIED (CLEARANCE)
#884153  | 21:28:54  | N-REED   | Reed, Noah      | LEVEL 2   | DENIED (RETRY)
#884180  | 21:50:02  | G-GUARD1 | Santos, Diego   | LEVEL 2   | GRANTED (EMERGENCY)

DOOR STATUS SENSORS:
- Manual Override Lever: NOT ENGAGED (Seals intact)
- Magnetic Reed Contact: Opened at 20:55, Opened at 21:14, Remained latched until 21:50.
- Remote SysAdmin Window: Ravi Menon (R-MENON) conducted remote SAN telemetry from Level 2 NOC. Badge was not swiped at physical corridor.`,
    keyTakeaway: "Only two individuals physically entered Archive Corridor B-1 during the incident window: Dr. Adrian John (20:55) and Dr. Mira Voss (21:14). Noah Reed was repeatedly denied.",
  },
  {
    id: "E-03",
    code: "E-03",
    title: "File-Integrity & Checksum Verification Report",
    category: "Digital Forensics",
    summary: "Cryptographic hash audit comparing the author's trusted baseline dataset against the corrupted archive repository copy.",
    content: `ASTERION FORENSIC COMPUTING LAB — INTEGRITY AUDIT
TARGET OBJECT: dataset/project_lantern/lantern_raw.csv
ALGORITHM: SHA-256 (FIPS 180-4)

SOURCE REPOSITORY COMPARISON:
---------------------------------------------------------------------------------
[A] TRUSTED BASELINE COPY (Recovered from Dr. John's encrypted thumb-drive):
    Path: /vault/dr_john_secure/lantern_raw.csv
    Size: 42,918,204 bytes (Row count: 18,400 observations)
    SHA-256: 4e82b091fca3401189d2a67e0081d5fbc829140a790184b237c093a1297e7C2A
    Checksum Suffix: ...7C2A

[B] ACTIVE ARCHIVE COPY (Retrieved from SAN Archive Volume 4B):
    Path: /archive/volume4/study_lantern/lantern_raw.csv
    Size: 42,904,112 bytes (Row count: 18,397 observations)
    SHA-256: 91fa04c82b047a284e91028401827401aa8402914802847103948172901a7C2B
    Checksum Suffix: ...7C2B
    DISCREPANCY: Exactly THREE (3) clinical observations deleted (IDs #1042, #1043, #1109).
    These 3 deleted records contained adverse arrhythmia events!

AUDIT TRAIL METADATA:
    File 'lantern_raw.csv' has metadata attribute 'VERIFIED_OK = TRUE'.
    Forensic Hex Inspection: The 'VERIFIED_OK' flag was manually flipped via hex editor
    at 21:17:33 IST, precisely when the archive index was modified.`,
    keyTakeaway: "Trusted copy ends in 7C2A; archive copy ends in 7C2B. Exactly 3 adverse arrhythmia cases were purged to artificially inflate trial success, and the verification flag was faked at 21:17.",
  },
  {
    id: "E-04",
    code: "E-04",
    title: "Printer Queue & Physical Transfer Checklist",
    category: "Operational Evidence",
    summary: "Recovered physical print job spool from Room B-12 network printer, queued under account OPS-MV at 21:22.",
    content: `PRINT SPOOL LOG DUMP — QUEUE: PRN-ROOM-B12-LASER
PRINT JOB ID : #004921
TIMESTAMP    : 21:22:15 IST
USER ACCOUNT : OPS-MV (Associated with Dr. Mira Voss)
DOCUMENT     : ARCHIVE_TRANSFER_CHECKLIST_CONFIDENTIAL.pdf
PAGES        : 1 Page

RECOVERED PRINT BUFFER TEXT:
================================================================================
ASTERION RESEARCH OPERATIONS — LEVEL -1 ARCHIVE TRANSFER PROTOCOL
Author: M. Voss [Operations Lead]
Date: 29-Oct-2026

STEP 1: Load temporary suppression profile into gateway ticket OPS-447.
STEP 2: In archive terminal, export current index to staging buffer.
STEP 3: OVERWRITE 'lantern_raw.csv' with sanitized cohort (18,397 rows).
STEP 4: CRITICAL DIRECTIVE: "Copy index first; replace source only after checksum warning clears."
STEP 5: Zero-fill intermediate staging caches on workstation N-04.
STEP 6: Purge tape mirror backup 4B.
================================================================================
NOTE FROM INVESTIGATORS: Standard Asterion operating procedures strictly prohibit replacing 
or modifying raw clinical telemetry source data under any circumstances.`,
    keyTakeaway: "Directly connects user OPS-MV (Mira Voss) to the document outlining how to overwrite the raw study file and suppress the checksum warning.",
  },
  {
    id: "E-05",
    code: "E-05",
    title: "Dr. John's Private Laboratory Diary Fragment",
    category: "Victim Statements",
    summary: "Handwritten laboratory diary fragment recovered from Dr. John's briefcase inside Archive Room 4B.",
    content: `RECOVERED NOTEBOOK PAGE — DR. ADRIAN JOHN
FOUND IN SEALED BRIEFCASE, ARCHIVE ROOM LEVEL -1

"29 October, 19:15 IST

The summary report released to the executive board is far too clean. 
When I audited the raw telemetry arrays this afternoon, three critical cardiac 
arrest observations had vanished from Cohort 3, and the baseline mortality 
threshold was quietly adjusted from 12% to 4%.

M.V. came to my office at 18:00. She was visibly agitated. She pleaded that 
re-opening the trial data would destroy the institute's Series-C commercialization 
grant and claimed the audit could 'wait until after the board meets next month.'

I told her plainly: scientific integrity is not negotiable. I will not sign off 
on the LANTERN dossier tomorrow morning unless the raw source log is restored in full. 
I am going down to Archive Room 4B tonight with my trusted flash drive to lock down 
the original immutable database partition before anyone can touch the SAN repository."`,
    keyTakeaway: "Dr. John confirms 'M.V.' (Mira Voss) confronted him, begged him to delay the audit until after the board meets, and that he refused to sign off.",
  },
  {
    id: "E-06",
    code: "E-06",
    title: "Account Anomaly Forensic Report",
    category: "Digital Forensics",
    summary: "Detailed workstation and session token analysis resolving the suspicious export log attributed to Noah Reed.",
    content: `ASTERION CYBER-INCIDENT RESPONSE TEAM
TECHNICAL FORENSIC ANALYSIS OF WORKSTATION N-04 LOGS

REPORT TARGET: User account 'nreed' appearing in export log at 21:08:42

FINDINGS:
1. HARDWARE MISMATCH:
   - Noah Reed's officially registered institute laptop is: THINKPAD-T14-NR (MAC: e4:54:e8:11:09:aa).
   - The export query was launched from physical terminal: DESKTOP-N04-ARCHIVE (MAC: 00:1a:2b:88:ef:41)
     located physically inside the Archive corridor staging pod.

2. AUTHENTICATION TOKEN ANALYSIS:
   - The session token used was 'AUTH-DEV-MOCK-90', an insecure test-environment bearer token 
     provisioned for operations QA testing.
   - Operations Lead M. Voss held administrator delegation rights to issue and invoke DEV-MOCK tokens 
     without requiring secondary password verification.

3. HARDWARE CLOCK SKEW:
   - Workstation N-04's BIOS clock was set 7 minutes fast (+00:07:00).
   - Time reported in log: 21:31:00.
   - Actual atomic NTP time: 21:24:00.

CONCLUSION:
The presence of 'nreed' in the log was an intentional artifact crafted using a shared test token 
from inside the corridor to frame the junior analyst. Noah Reed was physically at the corridor door 
at 21:28, but could not enter.`,
    keyTakeaway: "Proves conclusively that Noah Reed was framed: wrong laptop, test token controlled by Operations, and shifted terminal clock.",
  },
  {
    id: "E-07",
    code: "E-07",
    title: "Operations Change Ticket OPS-447",
    category: "System Administration",
    summary: "Audit trail for internal ticket OPS-447 submitted by M. Voss requesting temporary suppression of archive checksum alarms.",
    content: `ASTERION SERVICEDESK — CHANGE MANAGEMENT RECORD
TICKET ID : OPS-447
CATEGORY  : INFRASTRUCTURE / STORAGE INTEGRITY
OWNER     : Dr. Mira Voss [Operations Lead]
SUBMITTED : 29-OCT-2026, 17:45 IST

ORIGINAL TICKET DESCRIPTION (From Database WAL History):
"Request temporary suppression of checksum warning on Volume 4B while data migration completes. 
Bypass automated alert relay to Research Director Dr. John until Friday 12:00."

REVISED TICKET DESCRIPTION (Edited at 21:35:10 IST):
"Standard archive maintenance: volume defragmentation and routine parity index scrub."

APPROVAL STATUS:
- Approver: [BLANK / UNAPPROVED]
- Security Sign-off: NOT OBTAINED
- Override Flag: EXECUTED UNDER OPERATIONS LEAD PRIVILEGED EXEMPTION

AUDIT LOG NOTE:
The revision history proves that M. Voss retroactively altered the description of the ticket 
to conceal that she had suppressed the checksum warnings for the LANTERN dataset.`,
    keyTakeaway: "M. Voss created ticket OPS-447 to suppress checksum warnings, bypassed approvals, and retroactively disguised it as 'standard archive maintenance' after tampering with the dataset.",
  },
  {
    id: "E-08",
    code: "E-08",
    title: "Encoded Motive Note & Codebook",
    category: "Decryption & Motive",
    summary: "A recovered encrypted handwritten operations note alongside an internal operations codebook. Decodes into the true motive statement.",
    content: `RECOVERED NOTE FROM OPERATIONS TRASH COMPACTOR
TAG: INCIDENT-MOTIVE-SLIP-08

RECOVERED OPERATIONS CODEBOOK (GLOSSARY):
---------------------------------------------------------------------------------
TOKEN    | ENGLISH EQUIVALENT
---------------------------------------------------------------------------------
VAK      | STOP
TOR      | THE
KORAN    | AUDIT
ZEL      | BEFORE
MITH     | BOARD
LUR      | MEETS
PEL      | DELETE
FEN      | ALTER
SEN      | HIDE
DRA      | DISCREPANCY
VAL      | ARCHIVE
NIX      | PATIENT
MOR      | REPORT
---------------------------------------------------------------------------------

RECOVERED ENCODED MOTIVE LINE:
"VAK TOR KORAN ZEL TOR MITH LUR"

CANDIDATE PHRASES EVALUATED BY INVESTIGATORS:
1. "DELETE THE ARCHIVE BEFORE BOARD MEETS"       -> (PEL TOR VAL ZEL MITH LUR)
2. "STOP THE AUDIT BEFORE THE BOARD MEETS"        -> (VAK TOR KORAN ZEL TOR MITH LUR)  <-- MATCHES RECOVERED NOTE!
3. "ALTER THE REPORT BEFORE PATIENT ARRIVES"     -> (FEN TOR MOR ZEL NIX ...)
4. "HIDE THE DISCREPANCY FROM ETHICS BOARD"      -> (SEN TOR DRA ...)
5. "STOP THE MIGRATION UNTIL DIRECTOR APPROVES"  -> (...)`,
    keyTakeaway: "Decoding 'VAK TOR KORAN ZEL TOR MITH LUR' using the codebook produces: 'STOP THE AUDIT BEFORE THE BOARD MEETS'. This is the exact motive connecting Dr. John's diary, Voss's ticket, and the cover-up.",
  },
];

// Fictional Codebook and Motive Challenge Items for Interactive Workbench
export const MOTIVE_CODEBOOK = [
  { token: "VAK", meaning: "STOP" },
  { token: "TOR", meaning: "THE" },
  { token: "KORAN", meaning: "AUDIT" },
  { token: "ZEL", meaning: "BEFORE" },
  { token: "MITH", meaning: "BOARD" },
  { token: "LUR", meaning: "MEETS" },
  { token: "PEL", meaning: "DELETE" },
  { token: "FEN", meaning: "ALTER" },
  { token: "SEN", meaning: "HIDE" },
  { token: "DRA", meaning: "DISCREPANCY" },
  { token: "VAL", meaning: "ARCHIVE" },
  { token: "NIX", meaning: "PATIENT" },
  { token: "MOR", meaning: "REPORT" },
  { token: "RAK", meaning: "RECORD" },
];

export const MOTIVE_CANDIDATE_SENTENCES = [
  { id: 1, text: "DELETE THE ARCHIVE BEFORE THE BOARD MEETS", encoded: "PEL TOR VAL ZEL TOR MITH LUR" },
  { id: 2, text: "STOP THE AUDIT BEFORE THE BOARD MEETS", encoded: "VAK TOR KORAN ZEL TOR MITH LUR", isCorrect: true },
  { id: 3, text: "ALTER THE REPORT BEFORE THE BOARD MEETS", encoded: "FEN TOR MOR ZEL TOR MITH LUR" },
  { id: 4, text: "HIDE THE DISCREPANCY BEFORE THE AUDIT MEETS", encoded: "SEN TOR DRA ZEL TOR KORAN LUR" },
  { id: 5, text: "STOP THE PATIENT RECORD BEFORE AUDIT", encoded: "VAK TOR NIX RAK ZEL KORAN" },
  { id: 6, text: "ALTER THE ARCHIVE BEFORE PATIENT REPORT", encoded: "FEN TOR VAL ZEL NIX MOR" },
  { id: 7, text: "DELETE THE DISCREPANCY BEFORE THE BOARD", encoded: "PEL TOR DRA ZEL TOR MITH" },
  { id: 8, text: "HIDE THE PATIENT RECORD FROM THE AUDIT", encoded: "SEN TOR NIX RAK TOR KORAN" },
  { id: 9, text: "STOP THE REPORT BEFORE THE ARCHIVE MEETS", encoded: "VAK TOR MOR ZEL TOR VAL LUR" },
  { id: 10, text: "ALTER THE DISCREPANCY BEFORE THE BOARD MEETS", encoded: "FEN TOR DRA ZEL TOR MITH LUR" },
];

export const INTENDED_SOLUTION = {
  culpritId: "voss",
  culpritName: "Dr. Mira Voss, Operations Lead",
  motivePhrase: "STOP THE AUDIT BEFORE THE BOARD MEETS",
  keyEvidence: ["E-01", "E-02", "E-03", "E-04", "E-05", "E-07", "E-08"],
  summary: `Dr. Mira Voss orchestrated the manipulation of Project LANTERN clinical data (purging 3 adverse patient cardiac observations) to ensure approval of a $4.2M commercial research grant. When Dr. Adrian John discovered the discrepancy and declared he would blow the whistle to the Ethics Board at 10:00 a.m. Friday, Voss acted to silence him and cover her tracks.

She entered the Level -1 Archive at 21:14 (E-02), altered the raw dataset to checksum ...7C2B (E-03), printed the transfer checklist under OPS-MV (E-04), retroactively disguised her warning suppression ticket OPS-447 (E-07), and framed junior analyst Noah Reed by executing an export from terminal N-04 using a test token (E-06). The decoded motive phrase 'STOP THE AUDIT BEFORE THE BOARD MEETS' (E-08) precisely matches Dr. John's diary entry (E-05).`,
};

