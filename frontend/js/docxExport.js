

/**
 * ==========================================
 * Project : ILAW-AI-V6
 * File    : frontend/js/docxExport.js
 * Purpose : DOCX Export Placeholder
 * ==========================================
 */
/*
console.log("docxExport.js loaded");

function downloadDOCX() {

    alert(
        "DOCX Export feature coming soon."
    );

}*/
/**
 * ==========================================
 * Download HTML Copy
 * ==========================================
 */
/*
document
    .getElementById("downloadBtn")
    ?.addEventListener("click", () => {

        const html =
            document.getElementById(
                "previewContainer"
            ).innerHTML;

        const blob =
            new Blob(
                [html],
                {
                    type: "text/html"
                }
            );

        const url =
            URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;

        link.download =
            "ILAW-Lesson-Plan.html";

        link.click();

        URL.revokeObjectURL(url);

    });*/
    console.log("docxExport.js loaded");

function downloadDOCX() {

    const previewContainer =
        document.getElementById(
            "previewContainer"
        );

    if (!previewContainer) {

        alert(
            "No lesson plan found."
        );

        return;

    }

    const content =
        previewContainer.innerHTML;

    const html = `
    <html>
    <head>
        <meta charset="utf-8">
        <title>ILAW Lesson Plan</title>
    </head>
    <body>
        ${content}
    </body>
    </html>
    `;

    const blob =
        new Blob(
            [html],
            {
                type:
                    "application/msword"
            }
        );

    const url =
        URL.createObjectURL(blob);

    const link =
        document.createElement("a");

    link.href = url;

    link.download =
        "ILAW-Lesson-Plan.doc";

    document.body.appendChild(
        link
    );

    link.click();

    document.body.removeChild(
        link
    );

    URL.revokeObjectURL(url);

}