// Static knowledge base — ported from the agent's tools.py, sourced from
// library.nitk.ac.in (June 2026). Kept in sync manually with the Python
// agent's knowledge base so voice (Ritu) and text (Aria) give the same
// answers.

export const LIBRARY_HOURS = {
  e_library_complex: {
    monday_to_saturday: "08:45 AM – 01:00 AM (next day)",
    sunday: "09:00 AM – 04:00 PM",
    public_holidays: "08:45 AM – 05:30 PM",
  },
  remodelled_library: {
    monday_to_saturday: "09:00 AM – 05:30 PM",
    sunday_and_public_holidays: "Closed",
  },
};

export type DatabaseEntry = {
  name: string;
  url: string;
  coverage: string;
  subject: string;
};

export const FULLTEXT_DATABASES: DatabaseEntry[] = [
  { name: "IEEE Xplore", url: "https://ieeexplore.ieee.org", coverage: "234 IEEE journals, 1200+ conference proceedings, 3800+ technical standards, 1000+ eBooks. ~25,000 new docs/month.", subject: "Electrical, Electronics, Computer Science, Engineering" },
  { name: "ScienceDirect (Elsevier)", url: "https://www.sciencedirect.com", coverage: "1700+ peer-reviewed journals, 59M+ abstracts, 2M+ full-text articles.", subject: "Science, Technology, Medicine, Engineering" },
  { name: "Springer Link", url: "https://link.springer.com", coverage: "1400+ journals. Backlist access included.", subject: "Mathematics, Computer Science, Physics, Astronomy, Geosciences, Chemistry, Engineering, Medicine" },
  { name: "ACM Digital Library", url: "https://dl.acm.org", coverage: "103,000+ full-text articles from ACM journals, magazines, and conference proceedings.", subject: "Computing, Information Technology, Software Engineering" },
  { name: "Taylor & Francis Online", url: "https://www.tandfonline.com", coverage: "364 titles.", subject: "Physics, Chemistry, Mathematics, Statistics, Engineering, Computing, Technology" },
  { name: "Emerald Full Text", url: "https://www.emeraldinsight.com", coverage: "310 journals. Backfiles from 1994.", subject: "Management, Business Strategy, HR, Operations, Logistics, Engineering, Quality, Finance, Marketing, LIS, Education" },
  { name: "Oxford University Press Journals", url: "https://academic.oup.com/journals", coverage: "Access generally from 1996 onwards.", subject: "Multidisciplinary — Science, Medicine, Humanities, Social Sciences" },
  { name: "Cambridge University Press Journals", url: "http://cambridge.org/core/publications/journals", coverage: "157 titles.", subject: "Multidisciplinary — Science, Technology, Humanities" },
  { name: "ACS Publications", url: "https://pubs.acs.org", coverage: "65+ peer-reviewed journals. Most-cited chemistry journals.", subject: "Chemistry, Chemical Engineering, Materials Science" },
  { name: "RSC Gold Journals", url: "http://pubs.rsc.org/en/journals", coverage: "51 peer-reviewed journals.", subject: "Chemistry, Biochemistry, Materials" },
  { name: "American Physical Society (APS)", url: "https://journals.aps.org/browse.html", coverage: "13 journals including Physical Review Letters, Physical Review X, Reviews of Modern Physics.", subject: "Physics" },
  { name: "ASCE Journals", url: "https://ascelibrary.org/journals", coverage: "35 journals, 7000+ papers/year.", subject: "Civil Engineering" },
  { name: "ASME Journals", url: "http://asmedigitalcollection.asme.org/journals.aspx", coverage: "Journals from the American Society of Mechanical Engineers.", subject: "Mechanical Engineering" },
  { name: "ASTM Standards & Journals", url: "https://compass.astm.org", coverage: "13,000+ ASTM standards used worldwide.", subject: "Materials Testing, Engineering Standards, Quality" },
  { name: "IOP Science Journals", url: "http://iopscience.iop.org/journalList", coverage: "72 full-text journals. 10-year rolling backfile.", subject: "Physics, Engineering, Environmental Science" },
  { name: "JSTOR", url: "http://www.jstor.org", coverage: "2500+ titles across multiple collections.", subject: "Multidisciplinary — Humanities, Social Sciences, Sciences, Business" },
  { name: "SIAM Journals", url: "https://www.siam.org/publications/journals", coverage: "17 peer-reviewed research journals.", subject: "Applied Mathematics, Computational Science" },
  { name: "Project Euclid Journals", url: "https://projecteuclid.org/browse", coverage: "High-impact publications in theoretical and applied mathematics and statistics.", subject: "Mathematics, Statistics" },
  { name: "Sage Journals", url: "http://journals.sagepub.com", coverage: "Engineering & Computing, Material Science, Management, Social Sciences & Humanities.", subject: "Engineering, Computing, Materials, Management, Social Sciences, Humanities" },
  { name: "EBSCO Business Source Elite", url: "http://search.ebscohost.com", coverage: "1110+ business publications, 150+ title backfiles, 10,150 company profiles.", subject: "Business, Management, Economics, Finance, Marketing" },
  { name: "Access Engineering (McGraw-Hill)", url: "https://www.accessengineeringlibrary.com", coverage: "614 titles, 3500+ interactive tables/graphs, 830 instructional videos.", subject: "All branches of Engineering" },
  { name: "Begell House Journals", url: "https://www.begellhouse.com", coverage: "31 journals in thermal sciences, fluid dynamics, biomedical engineering.", subject: "Thermal Engineering, Fluid Sciences, Biomedical Engineering" },
  { name: "SciFinder-n (CAS)", url: "https://scifinder-n.cas.org", coverage: "Chemical Abstracts Service — largest curated database of chemistry literature.", subject: "Chemistry, Chemical Engineering" },
  { name: "IOP ECS Plus", url: "http://iopscience.iop.org/partner/ecs", coverage: "5 electrochemical society journals.", subject: "Electrochemistry, Solid State Science" },
];

export const BIBLIOGRAPHIC_DATABASES: DatabaseEntry[] = [
  { name: "Scopus", url: "https://www.scopus.com", coverage: "Largest abstract and citation database. Covers 22,000+ peer-reviewed journals.", subject: "Science, Technology, Medicine, Social Sciences, Arts & Humanities" },
  { name: "Web of Science (WoS)", url: "https://www.webofscience.com", coverage: "Core Collection with citation indexing. Tracks research impact.", subject: "Multidisciplinary — Science, Social Sciences, Arts & Humanities" },
  { name: "MathSciNet", url: "https://mathscinet.ams.org", coverage: "Mathematical Reviews database from the American Mathematical Society.", subject: "Mathematics, Statistics" },
  { name: "SciFinder-n", url: "https://scifinder-n.cas.org", coverage: "Full CAS bibliographic database for chemistry literature.", subject: "Chemistry, Chemical Engineering" },
];

export const EBOOK_COLLECTIONS = [
  { name: "Springer e-Books", url: "https://link.springer.com", coverage: "Large collection of Springer e-books across engineering and sciences." },
  { name: "McGraw-Hill Access Engineering", url: "https://www.accessengineeringlibrary.com", coverage: "614 engineering reference titles with interactive content." },
  { name: "e-ShodhSindu / INFLIBNET", url: "https://ess.inflibnet.ac.in", coverage: "10,000+ qualitative e-resources through the national consortium." },
];

export const LIBRARY_SERVICES: Record<string, any> = {
  remote_access: {
    description: "Off-campus access to all subscribed e-databases and e-journals is available through Knimbus.",
    url: "https://nitks.new.knimbus.com",
    note: "Login with your NITK credentials.",
  },
  opac_catalogue: {
    description: "Online catalogue for physical books. Search by title, author, or subject. Also supports online book renewal.",
    url: "http://opac.nitk.ac.in",
  },
  institutional_repository: {
    description: "IDR@NITK hosts faculty publications, PhD and MTech theses, conference papers, book chapters, and annual reports by NITK authors.",
    url: "http://idr.nitk.ac.in/jspui",
    sub_collections: {
      faculty_publications: "http://idr.nitk.ac.in/jspui/handle/1/5",
      theses_and_dissertations: "http://idr.nitk.ac.in/jspui/handle/1/10",
    },
  },
  plagiarism_check: {
    description: "Plagiarism detection tool available for NITK users through the library.",
    url: "https://library.nitk.ac.in/joomla/index.php/research-assistance/plagiarism-check",
  },
  grammarly: {
    description: "Grammarly access is available to NITK users through the library's research support.",
    url: "https://library.nitk.ac.in/joomla/index.php/research-assistance/grammarly",
  },
  article_request: {
    description: "Cannot find a paper? Submit an article request and the library will source it for you.",
    url: "https://library.nitk.ac.in/joomla/index.php/research-assistance/article-request",
  },
  writing_and_citation_tools: {
    description: "Tools for reference management and academic writing (Zotero, Mendeley guidance, etc.).",
    url: "https://library.nitk.ac.in/joomla/index.php/research-assistance/writing-citation-tools",
  },
  group_study_rooms: {
    description: "Group study rooms available on the second floor. Booking through the library services portal.",
    url: "https://library.nitk.ac.in/joomla/index.php/services/group-study-rooms",
  },
  borrowing: {
    description: "Book borrowing and returns at the issue counter on the ground floor. Renewal available online via OPAC.",
    url: "http://opac.nitk.ac.in",
  },
  membership: {
    description: "Library membership for all NITK students, faculty, and staff. Visit the issue counter on the ground floor with your institute ID card.",
  },
  pay_fine: {
    description: "Library fines can be paid online.",
    url: "https://library.nitk.ac.in/joomla/index.php/services/pay-fine-online",
  },
  irins: {
    description: "IRINS is a web-based Research Information Management portal by INFLIBNET that showcases faculty profiles and scholarly output at NITK.",
    url: "https://irins.inflibnet.ac.in/nitk",
  },
};

export const FLOOR_LAYOUT = {
  ground_floor: "Issue and return counter, reference section, periodicals, newspapers, Remodelled Library section.",
  first_floor: "Main stack area with books, reading rooms.",
  second_floor: "Digital library, online database terminals, group study rooms.",
};

export const COLLECTION_STATS = {
  print_books: "1.9 lakh+",
  print_journals: "100+ subscribed titles",
  e_journals: "12,045",
  e_databases: "25",
  e_books: "11,202",
  e_shodhsindu_resources: "10,000+ through INFLIBNET consortium",
};

const KEYWORD_MAP: Record<string, string[]> = {
  computer: ["IEEE Xplore", "ACM Digital Library", "ScienceDirect (Elsevier)", "Springer Link", "Sage Journals"],
  software: ["ACM Digital Library", "IEEE Xplore", "Springer Link"],
  "machine learning": ["IEEE Xplore", "ACM Digital Library", "ScienceDirect (Elsevier)", "Springer Link"],
  ai: ["IEEE Xplore", "ACM Digital Library", "ScienceDirect (Elsevier)"],
  electrical: ["IEEE Xplore", "ScienceDirect (Elsevier)", "Springer Link"],
  electronics: ["IEEE Xplore", "IOP Science Journals", "Springer Link"],
  mechanical: ["ASME Journals", "ScienceDirect (Elsevier)", "Springer Link", "Begell House Journals"],
  civil: ["ASCE Journals", "ScienceDirect (Elsevier)", "Springer Link"],
  chemistry: ["ACS Publications", "RSC Gold Journals", "SciFinder-n (CAS)", "ScienceDirect (Elsevier)"],
  chemical: ["ACS Publications", "RSC Gold Journals", "SciFinder-n (CAS)", "Begell House Journals"],
  physics: ["American Physical Society (APS)", "IOP Science Journals", "ScienceDirect (Elsevier)", "Springer Link"],
  math: ["SIAM Journals", "Project Euclid Journals", "MathSciNet", "Springer Link"],
  statistics: ["SIAM Journals", "Project Euclid Journals", "MathSciNet"],
  management: ["Emerald Full Text", "EBSCO Business Source Elite", "Sage Journals"],
  business: ["EBSCO Business Source Elite", "Emerald Full Text", "JSTOR"],
  economics: ["EBSCO Business Source Elite", "JSTOR"],
  materials: ["ScienceDirect (Elsevier)", "Sage Journals", "ACS Publications", "ASTM Standards & Journals"],
  biomedical: ["ScienceDirect (Elsevier)", "Springer Link", "Begell House Journals"],
  environmental: ["ScienceDirect (Elsevier)", "IOP Science Journals", "Springer Link"],
  standards: ["ASTM Standards & Journals", "IEEE Xplore"],
  humanities: ["JSTOR", "Oxford University Press Journals", "Sage Journals"],
};

/** Mirrors tools.py `search_databases`. */
export function searchDatabases(subject: string) {
  const subjectLower = subject.toLowerCase();
  const matched = new Set<string>();

  for (const [keyword, names] of Object.entries(KEYWORD_MAP)) {
    if (subjectLower.includes(keyword)) names.forEach((n) => matched.add(n));
  }

  const all = [...FULLTEXT_DATABASES, ...BIBLIOGRAPHIC_DATABASES];
  if (matched.size === 0) {
    for (const db of all) {
      if (db.subject.toLowerCase().includes(subjectLower)) matched.add(db.name);
    }
  }

  const byName = new Map(all.map((db) => [db.name, db]));
  const results = [...matched].map((n) => byName.get(n)).filter(Boolean);

  if (results.length === 0) {
    return [
      {
        message: `No specific database match found for "${subject}". Broad multidisciplinary databases like ScienceDirect, Springer Link, and Scopus cover most engineering and science topics.`,
        recommended: [
          { name: "ScienceDirect", url: "https://www.sciencedirect.com" },
          { name: "Springer Link", url: "https://link.springer.com" },
          { name: "Scopus", url: "https://www.scopus.com" },
        ],
      },
    ];
  }
  return results;
}

/** Mirrors tools.py `get_library_info`. */
export function getLibraryInfo(topic: string) {
  const t = topic.toLowerCase();
  const has = (words: string[]) => words.some((w) => t.includes(w));

  if (has(["hour", "time", "open", "close", "timing"])) {
    return { e_library_complex: LIBRARY_HOURS.e_library_complex, remodelled_library: LIBRARY_HOURS.remodelled_library };
  }
  if (has(["floor", "layout", "section", "where", "location", "ground", "first", "second"])) return FLOOR_LAYOUT;
  if (has(["collection", "stat", "how many", "total", "books available"])) return COLLECTION_STATS;
  if (has(["remote", "off campus", "off-campus", "home", "knimbus", "vpn", "outside"])) return LIBRARY_SERVICES.remote_access;
  if (has(["opac", "catalogue", "catalog", "physical book", "borrow", "issue", "return", "renew"]))
    return { ...LIBRARY_SERVICES.opac_catalogue, ...LIBRARY_SERVICES.borrowing };
  if (has(["thesis", "dissertation", "idr", "repository", "faculty publication", "nitk research"]))
    return LIBRARY_SERVICES.institutional_repository;
  if (has(["plagiarism", "turnitin", "similarity"])) return LIBRARY_SERVICES.plagiarism_check;
  if (has(["grammarly", "grammar", "writing", "citation", "mendeley", "zotero", "reference management"]))
    return { ...LIBRARY_SERVICES.grammarly, ...LIBRARY_SERVICES.writing_and_citation_tools };
  if (has(["article request", "cannot find", "can't find", "not available", "interlibrary"])) return LIBRARY_SERVICES.article_request;
  if (has(["group study", "study room", "seminar room"])) return LIBRARY_SERVICES.group_study_rooms;
  if (has(["membership", "register", "card", "enroll"])) return LIBRARY_SERVICES.membership;
  if (has(["fine", "penalty", "pay", "due"])) return LIBRARY_SERVICES.pay_fine;
  if (has(["irins", "faculty profile", "research profile"])) return LIBRARY_SERVICES.irins;
  if (has(["ieee", "acm", "springer", "elsevier", "sciencedirect", "scopus", "web of science", "jstor", "emerald"])) {
    return {
      info: "These databases are accessible on campus from any terminal. Off-campus access is available through Knimbus at nitks.new.knimbus.com using your NITK credentials.",
      terminals_location: "Second floor, digital library section.",
    };
  }
  if (has(["e-book", "ebook", "digital book"])) return { collections: EBOOK_COLLECTIONS };
  if (has(["database", "journal", "e-journal", "online resource", "e-resource"])) {
    return {
      info: `NITK subscribes to ${COLLECTION_STATS.e_databases} databases and ${COLLECTION_STATS.e_journals} e-journals.`,
      access: "On-campus: direct access from any terminal. Off-campus: via Knimbus at nitks.new.knimbus.com.",
      full_list_url: "https://library.nitk.ac.in/joomla/index.php/e-resources/online-databases/full-text-databases",
    };
  }

  return {
    info: `For information about "${topic}", please visit library.nitk.ac.in or ask at the reference desk on the ground floor.`,
    website: "https://library.nitk.ac.in",
    contact_email: "librarian@nitk.ac.in",
  };
}
