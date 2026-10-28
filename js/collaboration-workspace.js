
```javascript
/* =========================================
   COLLABORATION WORKSPACE
   Shared frontend demo connection
========================================= */


document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadWorkspace();

    }
);



/* =========================================
   COLLABORATION DATA
========================================= */

const collaborationData = {

    "smart-waste": {

        challengeName:
            "Smart Waste Management",

        government:
            "Government of Jharkhand",

        university:
            "NIT Jamshedpur",

        industry:
            "Tata Consultancy Services",

        status:
            "Active",

        objective:
            "Development of a smart and technology-enabled waste management solution.",

        solutionTitle:
            "Smart Waste Management Solution",

        solutionDescription:
            "Technology-based waste collection, monitoring and route optimization system.",

        universityTechnology:
            "IoT Sensors, Web Dashboard, Data Analytics",

        industryTechnology:
            "Cloud Infrastructure, AI Analytics and Deployment",

        progress:
            65,

        currentStatus:
            "Testing & Validation",

        latestUpdate:
            "Prototype testing has started with industry technical support."

    },


    "rural-digital-learning": {

        challengeName:
            "Rural Digital Learning",

        government:
            "Government of Jharkhand",

        university:
            "BIT Mesra",

        industry:
            "Tech Solutions India",

        status:
            "Active",

        objective:
            "Development of an accessible digital learning platform for rural students.",

        solutionTitle:
            "Rural Digital Learning Platform",

        solutionDescription:
            "A digital learning platform providing educational content and learning support to students in rural areas.",

        universityTechnology:
            "Web Application, Learning Management System",

        industryTechnology:
            "Cloud Hosting, Mobile Support and Deployment",

        progress:
            45,

        currentStatus:
            "Prototype Development",

        latestUpdate:
            "University prototype is under development with industry technical guidance."

    }

};



/* =========================================
   LOAD WORKSPACE
========================================= */

function loadWorkspace() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const collaborationId =
        params.get("collaboration")
        || "smart-waste";


    const data =
        collaborationData[collaborationId]
        || collaborationData["smart-waste"];


    /*
       Load common collaboration data
    */

    setText(
        "challengeName",
        data.challengeName
    );

    setText(
        "collaborationObjective",
        data.objective
    );

    setText(
        "collaborationStatus",
        data.status
    );

    setText(
        "governmentDepartment",
        data.government
    );

    setText(
        "universityName",
        data.university
    );

    setText(
        "industryName",
        data.industry
    );


    /*
       Challenge Overview
    */

    setText(
        "overviewChallenge",
        data.challengeName
    );

    setText(
        "overviewGovernment",
        data.government
    );

    setText(
        "overviewUniversity",
        data.university
    );

    setText(
        "overviewIndustry",
        data.industry
    );

    setText(
        "overviewStatus",
        data.status
    );

    setText(
        "overviewObjective",
        data.objective
    );


    /*
       Solution
    */

    setText(
        "solutionTitle",
        data.solutionTitle
    );

    setText(
        "solutionDescription",
        data.solutionDescription
    );

    setText(
        "universityTechnology",
        data.universityTechnology
    );

    setText(
        "industryTechnology",
        data.industryTechnology
    );


    /*
       Progress
    */

    updateProgress(
        data.progress
    );

    setText(
        "currentStatus",
        data.currentStatus
    );

    setText(
        "latestUpdate",
        data.latestUpdate
    );


    /*
       Load university team
    */

    loadUniversityTeam(
        data
    );

}



/* =========================================
   UNIVERSITY TEAM
========================================= */

function loadUniversityTeam(data) {

    const teamContainer =
        document.getElementById(
            "universityTeam"
        );


    if (!teamContainer) {
        return;
    }


    /*
       First try to read team added
       from University Dashboard.
    */

    let savedTeam =
        JSON.parse(
            localStorage.getItem(
                "universityProjectTeam"
            )
        );


    /*
       If no team is available,
       use demo team.
    */

    if (
        !Array.isArray(savedTeam)
        ||
        savedTeam.length === 0
    ) {

        savedTeam = [

            {
                name: "Rahul Kumar",
                department:
                    "Computer Science & Engineering",
                role: "Student"
            },

            {
                name: "Priya Kumari",
                department:
                    "Computer Science & Engineering",
                role: "Student"
            },

            {
                name: "Aman Kumar",
                department:
                    "Information Technology",
                role: "Student"
            },

            {
                name: "Dr. Anjali Singh",
                department:
                    "Computer Science & Engineering",
                role: "Faculty Mentor"
            }

        ];

    }


    /*
       Separate faculty from students
    */

    const students =
        savedTeam.filter(
            member =>
                member.role !==
                "Faculty Mentor"
        );


    const faculty =
        savedTeam.find(
            member =>
                member.role ===
                "Faculty Mentor"
        );


    /*
       Display students
    */

    teamContainer.innerHTML = "";


    if (students.length === 0) {

        teamContainer.innerHTML = `
            <div class="team-card">
                <div>
                    <strong>
                        No student members added
                    </strong>
                    <span>
                        University Dashboard se
                        team members add karein.
                    </span>
                </div>
            </div>
        `;

    } else {

        students.forEach(
            member => {

                const card =
                    document.createElement(
                        "div"
                    );

                card.className =
                    "team-card";


                const firstLetter =
                    member.name
                    ? member.name
                        .charAt(0)
                        .toUpperCase()
                    : "S";


                card.innerHTML = `

                    <div class="member-avatar">
                        ${firstLetter}
                    </div>

                    <div>

                        <strong>
                            ${escapeHTML(member.name)}
                        </strong>

                        <span>
                            ${escapeHTML(
                                member.department
                            )}
                        </span>

                        <span>
                            ${escapeHTML(
                                member.role || "Student"
                            )}
                        </span>

                    </div>

                `;


                teamContainer.appendChild(
                    card
                );

            }
        );

    }


    /*
       Faculty
    */

    if (faculty) {

        setText(
            "facultyMentor",
            faculty.name
        );

    }

}



/* =========================================
   PROGRESS
========================================= */

function updateProgress(progress) {

    const safeProgress =
        Math.max(
            0,
            Math.min(
                100,
                Number(progress) || 0
            )
        );


    const progressFill =
        document.getElementById(
            "progressFill"
        );


    const progressPercentage =
        document.getElementById(
            "progressPercentage"
        );


    const overallProgressText =
        document.getElementById(
            "overallProgressText"
        );


    if (progressFill) {

        progressFill.style.width =
            safeProgress + "%";

    }


    if (progressPercentage) {

        progressPercentage.textContent =
            safeProgress + "%";

    }


    if (overallProgressText) {

        overallProgressText.textContent =
            safeProgress + "%";

    }

}



/* =========================================
   HELPER
========================================= */

function setText(
    elementId,
    value
) {

    const element =
        document.getElementById(
            elementId
        );


    if (element) {

        element.textContent =
            value || "";

    }

}



/* =========================================
   HTML SAFETY
========================================= */

function escapeHTML(value) {

    return String(value || "")
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}
```
