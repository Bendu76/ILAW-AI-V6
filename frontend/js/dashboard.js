

document.addEventListener("DOMContentLoaded", () => {

    const generateForm =
        document.getElementById("generateForm");

    const previewContainer =
        document.getElementById("previewContainer");

    if (!generateForm) return;

    generateForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();

            try {

                const token =
                    localStorage.getItem("token");

                if (!token) {

                    alert("Please login first.");
                    return;

                }

                const grade =
                    document.getElementById("grade").value;

                const subject =
                    document.getElementById("subject").value;

                const topic =
                    document.getElementById("topic").value;

                const competency =
                    document.getElementById("competency").value;

                const sessions =
                    document.getElementById("sessions").value;

                previewContainer.innerHTML =
                    "<p>Generating ILAW...</p>";

                const response =
                    await fetch(
                        `${window.location.origin}/generate`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${token}`
                            },
                            body: JSON.stringify({
                                grade,
                                subject,
                                topic,
                                competency,
                                sessions
                            })
                        }
                    );

                const result =
                    await response.json();

                if (!result.success) {

                    if (
                        result.message &&
                        result.message.includes(
                            "No remaining free generations"
                        )
                    ) {

                        alert(
                            "Free generation consumed. Redirecting to payment page..."
                        );

                        window.location.href =
                            "/payment.html";

                        return;

                    }

                    throw new Error(
                        result.message || "Failed to generate ILAW."
                    );

                }

                previewContainer.innerHTML =
                    result.data.html;

            } catch (error) {

                console.error(error);

                alert(
                    error.message || "Failed to connect to the server."
                );

            }

        }
    );

});

/**
 * ==========================================
 * Print ILAW
 * ==========================================
 */

document
    .getElementById("printBtn")
    ?.addEventListener("click", () => {

        const content =
            document.getElementById(
                "previewContainer"
            ).innerHTML;

        const printWindow =
            window.open(
                "",
                "_blank"
            );

        printWindow.document.write(`
            <html>
            <head>
                <title>ILAW Lesson Plan</title>
            </head>
            <body>
                ${content}
            </body>
            </html>
        `);

        printWindow.document.close();

        printWindow.print();

    });