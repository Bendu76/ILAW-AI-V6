
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

                console.log("");
                console.log("========== FRONTEND DEBUG ==========");
                console.log("TOKEN:", token);
                console.log("GRADE:", grade);
                console.log("SUBJECT:", subject);
                console.log("TOPIC:", topic);
                console.log("COMPETENCY:", competency);
                console.log("SESSIONS:", sessions);
                console.log("====================================");
                console.log("");

                const response =
                    await fetch(
                        "http://localhost:3000/generate",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type":
                                    "application/json",
                                "Authorization":
                                    "Bearer " + token
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

                console.log("");
                console.log("========== API RESPONSE ==========");
                console.log(result);
                console.log("==================================");
                console.log("");
/*
                if (!result.success) {

                    throw new Error(
                        result.message
                    );

                }
*/
if (!result.success) {

    if (
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
        result.message
    );

}

                previewContainer.innerHTML =
                    result.data.html;

            } catch (error) {

                console.error(error);

                alert(error.message);

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