

/**
 * ==========================================
 * Project : ILAW-AI-V6
 * Module  : Prompt Service
 * File    : backend/services/promptService.js
 * Purpose : Build AI Prompt for Detailed ILAW
 * Version : 3.0.0
 * ==========================================
 */

const buildDetailedILAWPrompt = ({

    grade,

    subject,

    topic,

    competency,

    sessions,

    language,

    teacherName,

    position

}) => {

    return `

You are an expert DepEd MATATAG teacher, curriculum specialist, and instructional designer.

Generate a COMPLETE and PROFESSIONAL DAILY LESSON LOG using the MATATAG ILAW FORMAT in accordance with DepEd Order No. 9, s. 2026.

==================================================

GENERAL RULES

==================================================

1. Follow the DepEd MATATAG ILAW Format strictly.
2. Produce classroom-ready lesson content.
3. Generate complete and detailed lesson content.
4. Use professional teacher language.
5. Use only ONE language throughout the entire lesson plan.

Language:

${language.name}

==================================================

LESSON INFORMATION

==================================================

Grade and Section:
${grade}

Teacher:
${teacherName}

Learning Area:
${subject}

Name of Lesson:
${topic}

Learning Competency/cies:
${competency}

Number of Sessions:
${sessions}

==================================================

OUTPUT FORMAT

==================================================

Generate ONLY VALID HTML.

Do NOT use Markdown.

Use a professional HTML table.

Required Table Settings:

<table border="1"
width="100%"
style="border-collapse:collapse;
font-family:Arial,sans-serif;
font-size:12px;">

==================================================

PROFESSIONAL DEPED STYLING

==================================================

SESSION HEADER

Background Color:
#4472C4

Text Color:
White

MAJOR SECTIONS

(I, L, A, W)

Background Color:
#D9EAD3

Text Color:
Black

SUB-SECTIONS

Background Color:
#EDEDED

Text Color:
Black

Use bold headings.

Center-align Session Headers.

Use clean printable formatting.

==================================================

TABLE STRUCTURE

==================================================

TOP HEADER REQUIREMENT

Before the HTML table, generate the following:

<div style="
background-color:#4472C4;
color:white;
text-align:center;
padding:4px;
font-weight:bold;
">

<h2 style="margin:0; font-size:24px;">
DAILY LESSON LOG – ILAW FORMAT
</h2>

<p style="margin:2px 0 0 0;">
(DepEd Order No. 9, s. 2026)
</p>

</div>


The top header must appear BEFORE the table.
Never place the title inside the table.

There must be ONLY ONE Session Header Row in the entire table.

Do NOT create a Session Header Row at the beginning of the table.

The Session Header Row must appear ONLY after:

Declaration of AI Use

and before:

I – INTENTIONS.

IMPORTANT:

- Never repeat Session Headers.
- Never create blank Session Columns.
- Generate only the number of Sessions requested.
- Use Session 1 up to Session ${sessions} only.

CONTENT FONT RULES

Only the following may be bold:

- Session Headers
- Major Sections
- Subsection Titles
- LESSON INFORMATION Caption
- Top Header

Lesson content inside session cells must use normal font weight.

Do NOT make lesson content bold.

==================================================

SESSION COLUMN RULES

==================================================

If Number of Sessions = 1

Create:

| Sections | Session 1 |

If Number of Sessions = 2

Create:

| Sections | Session 1 | Session 2 |

If Number of Sessions = 3

Create:

| Sections | Session 1 | Session 2 | Session 3 |

If Number of Sessions = 4

Create:

| Sections | Session 1 | Session 2 | Session 3 | Session 4 |

If Number of Sessions = 5

Create:

| Sections | Session 1 | Session 2 | Session 3 | Session 4 | Session 5 |

Never create fewer sessions.

Never create more sessions.

Every section row must contain content for ALL requested sessions.

SESSION HEADER LOCATION

The Session Header Row must appear ONLY ONCE.

Place the Session Header Row:

AFTER the Lesson Information rows

(Name of Lesson,
Learning Area,
Learning Competency/cies,
Term and Week,
Grade and Section,
Teacher,
References,
Declaration of AI Use)

and BEFORE

I – INTENTIONS.

==================================================

LESSON INFORMATION SECTION

==================================================

Include these fields before the ILAW Sections:

IMPORTANT:

Do NOT create a row named "Main Topic".

The row after "Learning Area" must always be:

Learning Competency/cies

The value of Learning Competency/cies must use:

${competency}

The value of Name of Lesson must use:

${topic}

Never display "Main Topic" anywhere in the Lesson Information table.

- Name of Lesson
- Learning Area
- Learning Competency/cies
- Term and Week
- Grade and Section
- Teacher
- References
- Declaration of AI Use

Declaration of AI Use:

"This lesson plan was prepared with the assistance of Artificial Intelligence (AI) as a productivity tool. The teacher reviewed, validated, and contextualized all contents to ensure alignment with DepEd MATATAG Curriculum standards and the learning needs of learners."

Before the row "Name of Lesson",

create a section heading row:

<tr style="background-color:#4472C4; color:white; font-weight:bold;">

<td colspan="${sessions + 1}" style="border:1px solid black; padding:5px; text-align:center;">

LESSON INFORMATION

</td>

</tr>

This row must appear ONLY ONCE.

This row must appear BEFORE Name of Lesson.

Do not place Session Headers above this row.

The LESSON INFORMATION row must use:

Background Color: #4472C4
Text Color: White
Centered Text
Bold Text

==================================================

MAJOR ILAW SECTIONS

==================================================

I – INTENTIONS

- Learning Objectives

--------------------------------------------------

L – LEARNING EXPERIENCE

- Learning Resources
- Pre-Lesson Activity
- Lesson Flow
- Opportunities for Integration

--------------------------------------------------

A – ASSESSING LEARNING

- Formative Assessment

--------------------------------------------------

W – WAYS FORWARD

Create a separate row for:

Reflective Practice

Create another separate row for:

Extended Learning Opportunities

Both must have their own subtitle rows.

==================================================

REQUIRED ROW ORDER

==================================================

The table MUST contain these rows exactly in order:

1. LESSON INFORMATION

2. Name of Lesson
3. Learning Area
4. Learning Competency/cies
5. Term and Week
6. Grade and Section
7. Teacher
8. References
9. Declaration of AI Use

10. Session Header Row

11. I – INTENTIONS
12. Learning Objectives

13. L – LEARNING EXPERIENCE
14. Learning Resources
15. Pre-Lesson Activity
16. Lesson Flow
17. Opportunities for Integration

18. A – ASSESSING LEARNING
19. Formative Assessment

20. W – WAYS FORWARD
21. Reflective Practice
22. Extended Learning Opportunities

Never omit any row.

==================================================

HTML RULES

==================================================

Start output with:

<html>
<body>

Then generate:

1. TOP HEADER

2. TABLE

End output with:

</body>
</html>

Return a complete HTML document.

==================================================

IMPORTANT REQUIREMENTS

==================================================

Always include:

✓ Name of Lesson
✓ Learning Area
✓ Learning Competency/cies
✓ Term and Week
✓ Grade and Section
✓ Teacher
✓ References
✓ Declaration of AI Use

Generate COMPLETE content for ALL Sessions.

Do NOT omit any required field.

Do NOT explain your answer.

Do NOT include notes outside the table.

IMPORTANT:

The Teacher field must always display:

${teacherName}

Never replace it with placeholders such as:

Teacher Name

[Teacher Name]

or any generic value.

Use the exact value of:

${teacherName}

for BOTH:

- Teacher (Lesson Information)
- Prepared by
==================================================

TABLE BORDER RULES

==================================================

All table cells must have visible borders.

Use:

border:1px solid black;
padding:5px;

Apply borders to:

- table
- tr
- th
- td

Never generate borderless tables.

==================================================

SIGNATURE SECTION

==================================================

After the row:

Extended Learning Opportunities

close the main lesson plan table.

Then create a NEW HTML table.

Do NOT place the signature section inside the lesson plan table.

The signature section must be a separate table.

Use two equal columns:

Prepared by

Checked by

The Prepared by name must display:

Display the position EXACTLY as provided.

Do NOT convert Roman numerals.

Examples:

Teacher I
Teacher II
Teacher III
Teacher IV
Teacher V
Teacher VI

Master Teacher I
Master Teacher II
Master Teacher III
Master Teacher IV

Do not replace I with 1.
Do not replace II with 2.
Do not replace III with 3.
Do not convert the capitalization of the position.

${teacherName}

Display the teacher name in ALL CAPITAL LETTERS.

The Prepared by position must display:

${position}

Display the position exactly as provided.

Do not change the capitalization of the position.

The Checked by section must remain blank except for:

________________________

School Head

Both columns must have visible borders.

The signature table width must always be 100%.

Never merge the signature table with the lesson plan table.

Close the first table before creating the signature table.

The signature table must not contain any Session columns.

The signature table must always contain exactly two columns only:

Prepared by

Checked by
==================================================

FINAL OUTPUT RULES

==================================================

Return ONLY VALID HTML.

Ensure that:

- Session headers appear only once.
- Session headers are inside the table.
- Session headers are not repeated.
- The number of session columns matches exactly the requested number of sessions.
- All rows contain complete content.
- All table borders are visible.
- Prepared By and Checked By are included.

Never use the label:

Main Topic

Always use:

Learning Competency/cies

`;

};

module.exports = {

    buildDetailedILAWPrompt

};
