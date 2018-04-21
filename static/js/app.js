let levelBar = $("<div class=\"level-bar\"><div class=\"bar-fill\"></div></div>")

$(document).ready(function() {
    let resumeContent = "content.json";
    $.getJSON(resumeContent, function(data) {

        // page/tag title
        $("title").html(data.name);

        // name and personal information in the header
        $("#header p.name").append(data.name);
        $("#header p#github").append("<a target=\"_blank\" href=\"https://github.com/" + data.github + "\"</a>" + data.github);
        $("#header p#email").append("<a target=\"_top\" href=\"mailto:" + data.email + "\"</a>" + data.email);
        $("#header p#linkedin").append("<a target=\"_blank\" href=\"https://www.linkedin.com/in/" + data.linkedin + "\"</a>" + data.linkedin);

        // plug-in counts for each section
        $("#sections #education-section count").html(data.education.length);
        $("#sections #honours-awards-section count").html(data.honoursawards.length);
        $("#sections #skills-section count").html(data.skills.length);
        $("#sections #work-experience-section count").html(data.workexperience.length);
        $("#sections #projects-section count").html(data.projects.length);
        $("#sections #posters-exhibits-section count").html(data.postersexhibits.length);
        $("#sections #extracurricular-activities-section count").html(data.extracurricularactivities.length);
        $("#sections #volunteer-work-section count").html(data.volunteerwork.length);
        $("#sections #languages-section count").html(data.languages.length);

        // ---------- populate education section ----------
        let educationList = [];
        data.education.forEach(function(elem, i) {
            let educationElem = new Education(elem.school, elem.url, elem.degree, elem.field, elem.startdate, elem.enddate, elem.description, elem.courses);
            educationList.push(educationElem);
        });
        let educationHtml = generateEducation(educationList);
        $("div#education-section").find("div.section-content").html(educationHtml);

        // ---------- populate honours and awards section ----------
        let awardsList = [];
        data.honoursawards.forEach(function(elem, i) {
            let awardElem = new Award(elem.title, elem.issuer, elem.url, elem.startdate, elem.description);
            awardsList.push(awardElem);
        });
        let awardsHtml = generateAwards(awardsList);
        $("div#honours-awards-section").find("div.section-content").html(awardsHtml);

        // ---------- populate skills section ----------
        let skillsList = [];
        data.skills.forEach(function(elem, i) {
            let skillElem = new Skill(elem.skill, elem.level);
            skillsList.push(skillElem);
        });
        let skillsHtml = generateSkills(skillsList);
        $("div#skills-section").find("div.section-content").html(skillsHtml);

        // ---------- populate work experience section ----------
        let workList = [];
        data.workexperience.forEach(function(elem, i) {
            let workElem = new Work(elem.position, elem.company, elem.url, elem.location, elem.startdate, elem.enddate, elem.description, elem.images);
            workList.push(workElem);
        });
        let workHtml = generateWork(workList);
        $("div#work-experience-section").find("div.section-content").html(workHtml);

        // ---------- populate projects section ----------
        let projectsList = [];
        data.projects.forEach(function(elem, i) {
            let projectElem = new Project(elem.name, elem.url, elem.startdate, elem.enddate, elem.description, elem.images);
            projectsList.push(projectElem);
        });
        let projectsHtml = generateProjects(projectsList);
        $("div#projects-section").find("div.section-content").html(projectsHtml);

        // ---------- populate posters and exhibits section ----------
        let exhibitsList = [];
        data.postersexhibits.forEach(function(elem, i) {
            let exhibitElem = new Exhibit(elem.title, elem.authors, elem.event, elem.url, elem.location, elem.startdate, elem.description, elem.images);
            exhibitsList.push(exhibitElem);
        });
        let exhibitsHtml = generateExhibits(exhibitsList);
        $("div#posters-exhibits-section").find("div.section-content").html(exhibitsHtml);

        // ---------- populate extracurricular activities section ----------
        let extracurrList = [];
        data.extracurricularactivities.forEach(function(elem, i) {
            let extracurrElem = new ExtracurricularVolunteer(elem.role, elem.organization, elem.url, elem.event, elem.startdate, elem.enddate, elem.description, elem.images);
            extracurrList.push(extracurrElem);
        });
        let extracurrHtml = generateExtracurricularVolunteer(extracurrList);
        $("div#extracurricular-activities-section").find("div.section-content").html(extracurrHtml);

        // ---------- populate volunteer work section ----------
        let volunteerList = [];
        data.volunteerwork.forEach(function(elem, i) {
            let volunteerElem = new ExtracurricularVolunteer(elem.role, elem.organization, elem.url, elem.event, elem.startdate, elem.enddate, elem.description, elem.images);
            volunteerList.push(volunteerElem);
        });
        let volunteerHtml = generateExtracurricularVolunteer(volunteerList);
        $("div#volunteer-work-section").find("div.section-content").html(volunteerHtml);

        // ---------- populate languages section ----------
        let languagesList = [];
        data.languages.forEach(function(elem, i) {
            let languagesElem = new Language(elem.language, elem.level);
            languagesList.push(languagesElem);
        });
        let languagesHtml = generateLanguages(languagesList);
        $("div#languages-section").find("div.section-content").html(languagesHtml);
    });
});

// HTML GENERATOR FOR EDUCATION SUBSECTIONS
function generateEducation(elements, i) {

    // sort elements by start date, in descending order
    let localElements = sortByDate(elements);

    // iterate through each education element, and generating its html object
    let finalHtml = "";
    localElements.forEach(function (element, i) {

        let html = "<div>";

        if (i === 0 ) { html += "<div class=\"chevron down\">"; }
        else { html += "<div class=\"chevron right\">"; }

        if ((element.courses.length > 0) || (element.description)) { html += "<img>"; }

        html += "</div>" +
                "<div class=\"subsection\">" +
                "<div class=\"subsection-header\">";

        if (element.field) { html += "<p class=\"subtitle\">" + element.degree + " in " + element.field + "</p>"; }
        else { html += "<p class=\"subtitle\">" + element.degree + "</p>"; }

        html += "<p class=\"date\">" + element.startdate + " - " + element.enddate + "</p><br>" + "<p>";

        if (element.url) { html += "<a target=\"_blank\" href=\"" + element.url + "\">" + element.school + "</a>"; }
        else { html += element.school }

        html += "</p>" + "</div>";

        // to avoid odd spaces after an empty subsection body. a body should contain a description, courses, or both
        if ((i === 0) && ((element.courses.length > 0) || (element.description))) { html += "<div class=\"subsection-body\">"; }
        else if ((element.courses.length > 0) || (element.description)) { html += "<div class=\"subsection-body\" hidden>"; }
        else { html += "<div>" }

        if (element.description) { html += "<p>" + element.description + "</p>"; }

        if (element.courses.length > 0) {
            html += "<div class=\"courses\">";
            for (course of element.courses) { html += "<p class=\"course\">" + course.code + " - " + course.name + "</p>"; }
            html += "</div></div>";
        }

        html += "</div></div>";
        finalHtml += html;
    });

    return finalHtml;
}

// HTML GENERATOR FOR HONOURS AND AWARDS SUBSECTIONS
function generateAwards(elements, i) {

    // sort elements by start date, in descending order
    let localElements = sortByDate(elements);

    // iterate through each education element, and generating its html object
    let finalHtml = "";
    localElements.forEach(function(element, i) {

        let html = "<div>";
        if (i === 0 ) { html += "<div class=\"chevron down\">"; }
        else { html += "<div class=\"chevron right\">"; }

        if (element.description) { html += "<img>"; }

        html += "</div>" +
                "<div class=\"subsection\">" +
                "<div class=\"subsection-header\">" +
                "<p class=\"subtitle\">" + element.title + "</p>" +
                "<p class=\"date\">" + element.startdate + "</p><br>" +
                "<p>";

        if (element.url) { html += "<a target=\"_blank\" href=\"" + element.url + "\">" + element.issuer + "</a>"; }
        else { html += element.issuer }

        html += "</p>" + "</div>";

        // to avoid odd spaces after an empty subsection body. a body should contain a description, courses, or both
        if ((i === 0) && (element.description)) { html += "<div class=\"subsection-body\">"+ "<p>" + element.description + "</p>" + "</div>"; }
        else if (element.description) { html += "<div class=\"subsection-body\" hidden>" + "<p>" + element.description + "</p>" + "</div>"; }

        html += "</div></div>";
        finalHtml += html;
    });
    return finalHtml;
}

function generateSkills(elements) {

    let lvl1 = []; let lvl2 = []; let lvl3 = [];

    elements.forEach(function(elem, i) {
        if (elem.level == 1) { lvl1.push(elem); }
        else if (elem.level == 2) { lvl2.push(elem); }
        else if (elem.level == 3) { lvl3.push(elem); }
    });

    let finalHtml = "";
    if ((lvl1.length > 0) || (lvl2.length > 0) || (lvl3.length > 0)) {

        // level 1 skills
        if (lvl1.length > 0) {
            finalHtml += "<div class=\"subsection\">" + "<p>Beginner</p>" + "<div class=\"level-bar\">" + "<div class=\"bar-fill b\"></div>" +
                                "</div>" + "<div class=\"subsection-body\">"
            lvl1.forEach(function(elem, i) { finalHtml += "<p class=\"course\">" + elem.skill + "</p>" });
            finalHtml += "</div></div>"
        }

        // level 2 skills
        if (lvl2.length > 0) {
            finalHtml += "<div class=\"subsection\">" + "<p>Intermediate</p>" + "<div class=\"level-bar\">" + "<div class=\"bar-fill i\"></div>" +
                                "</div>" + "<div class=\"subsection-body\">"
            lvl2.forEach(function(elem, i) { finalHtml += "<p class=\"course\">" + elem.skill + "</p>" });
            finalHtml += "</div></div>"
        }

        // level 3 skills
        if (lvl3.length > 0) {
            finalHtml += "<div class=\"subsection\">" + "<p>Advanced</p>" + "<div class=\"level-bar\">" + "<div class=\"bar-fill a\"></div>" +
                            "</div>" + "<div class=\"subsection-body\">"
            lvl3.forEach(function(elem, i) { finalHtml += "<p class=\"course\">" + elem.skill + "</p>" });
            finalHtml += "</div></div>"
        }
        finalHtml += "</div>"
    }
    return finalHtml;
}

function generateWork(elements) {

    let localElements = sortByDate(elements);

    let finalHtml = "";
    localElements.forEach(function(element, i) {
        let html = "<div>";
        if (i === 0 ) { html += "<div class=\"chevron down\">"; }
        else { html += "<div class=\"chevron right\">"; }

        if (element.description) { html += "<img>"; }

        html += "</div>" +
                "<div class=\"subsection\">" +
                "<div class=\"subsection-header\">" +
                "<p class=\"subtitle\">" + element.position + "</p>" +
                "<p class=\"date\">" + element.startdate + " - " + element.enddate + "</p><br>" +
                "<p>";

        if (element.url) { html += "<a target=\"_blank\" href=\"" + element.url + "\">" + element.company + "</a>"; }
        else { html += element.company }

        html += "</p>" + "</div>";

        // to avoid odd spaces after an empty subsection body. a body should contain a description, courses, or both
        if ((i === 0) && (element.description)) { html += "<div class=\"subsection-body\">"+ "<p>" + element.description + "</p>" + "</div>"; }
        else if (element.description) { html += "<div class=\"subsection-body\" hidden>" + "<p>" + element.description + "</p>" + "</div>"; }

        html += "</div></div>";
        finalHtml += html;
    });
    return finalHtml;
}

function generateProjects(elements) {

    let localElements = sortByDate(elements);

    let finalHtml = "";
    localElements.forEach(function(element, i) {
        let html = "<div>";
        if (i === 0 ) { html += "<div class=\"chevron down\">"; }
        else { html += "<div class=\"chevron right\">"; }

        if (element.description || element.images.length > 0) { html += "<img>"; }

        html += "</div>" +
                "<div class=\"subsection\">" +
                "<div class=\"subsection-header\">";

        if (element.url) { html += "<p class=\"subtitle\"><a target=\"_blank\" href=\"" + element.url + "\">" + element.name + "</a></p>"; }
        else { html += "<p class=\"subtitle\">" + element.name + "</p>" }

        if (element.enddate) { html += "<p class=\"date\">" + element.startdate + " - " + element.enddate + "</p>" + "<p>"; }
        else { html += "<p class=\"date\">" + element.startdate + "</p>" + "<p>"; }

        html += "</p>" + "</div>";

        // to avoid odd spaces after an empty subsection body. a body should contain a description, courses, or both
        if ((i === 0) && ((element.description) || (element.images.length > 0))) {

            html += "<div class=\"subsection-body\">";
            if (element.description) {
                html += "<p>" + element.description + "</p>"
            }
            if (element.images.length > 0) {
                html += "<center>"
                for (imagefile of element.images) {
                    html += "<img src=\"static/img/" + imagefile + "\"></img>";
                }
                html += "</center>"
            }
            html += "</div>";

        } else if (element.description || element.images.length > 0) {
            html += "<div class=\"subsection-body\" hidden>";
            if (element.description) {
                html += "<p>" + element.description + "</p>"
            }
            if (element.images.length > 0) {
                html += "<center>"
                for (imagefile of element.images) {
                    html += "<img src=\"static/img/" + imagefile + "\"></img>";
                }
                html += "</center>"
            }
            html += "</div>";
        }

        html += "</div></div>";
        finalHtml += html;
    });
    return finalHtml;
}

function generateExhibits(elements) {

    let localElements = sortByDate(elements);

    let finalHtml = "";
    localElements.forEach(function(element, i) {
        let html = "<div>";
        if (i === 0 ) { html += "<div class=\"chevron down\">"; }
        else { html += "<div class=\"chevron right\">"; }

        if (element.description) { html += "<img>"; }

        html += "</div>" +
                "<div class=\"subsection\">" +
                "<div class=\"subsection-header\">" +
                "<p class=\"subtitle\">" + element.title + "</p>" +
                "<p class=\"date\">" + element.startdate + "</p><br>";

        html += "<p>"
        element.authors.forEach(function(author, i) {
            html += author;
            if (i !== element.authors.length-1) { html += ", "; }
        });
        html += "</p><p>"

        if (element.url) { html += "<i><a target=\"_blank\" href=\"" + element.url + "\">" + element.event + "</a></i>"; }
        else { html += "<i>" + element.event + "</i>"}

        html += "</p><br><p>" + element.location + "</p>" + "</p>";

        // to avoid odd spaces after an empty subsection body. a body should contain a description, courses, or both
        if ((i === 0) && (element.description)) { html += "<div class=\"subsection-body\">"+ "<p>" + element.description + "</p>" + "</div>"; }
        else if (element.description) { html += "<div class=\"subsection-body\" hidden>" + "<p>" + element.description + "</p>" + "</div>"; }

        html += "</div></div>";
        finalHtml += html;
    });
    return finalHtml;
}

function generateExtracurricularVolunteer(elements) {

    let localElements = sortByDate(elements);

    let finalHtml = "";
    localElements.forEach(function(element, i) {
        let html = "<div>";
        if (i === 0 ) { html += "<div class=\"chevron down\">"; }
        else { html += "<div class=\"chevron right\">"; }

        if (element.description || element.images.length > 0) { html += "<img>"; }

        html += "</div>" +
                "<div class=\"subsection\">" +
                "<div class=\"subsection-header\">" +
                "<p class=\"subtitle\">" + element.role + "</p>"

        if (element.enddate) { html += "<p class=\"date\">" + element.startdate + " - " + element.enddate + "</p><br>"; }
        else { html += "<p class=\"date\">" + element.startdate + "</p><br>"; }

        if (element.event.name) {
            if (element.event.url) { html +=  "<p><i><a target=\"_blank\" href=\"" + element.event.url + "\">" + element.event.name + "</a></i></p><br>"; }
            else { html +=  "<i><p>" + element.event.name + "</p></i><br>"; }
        }

        html += "<p>";

        if (element.url) { html += "<a target=\"_blank\" href=\"" + element.url + "\">" + element.organization + "</a>"; }
        else { html += element.organization }

        html += "</p>" + "</div>";

        // to avoid odd spaces after an empty subsection body. a body should contain a description, courses, or both
        if ((i === 0) && ((element.description) || (element.images.length > 0))) {

            html += "<div class=\"subsection-body\">"
            if (element.description) {
                html += "<p>" + element.description + "</p>"
            }
            if (element.images.length > 0) {
                html += "<center>"
                for (imagefile of element.images) {
                    html += "<img src=\"static/img/" + imagefile + "\"></img>";
                }
                html += "</center>"
            }
            html += "</div>"

        } else if (element.description) {
            
            html += "<div class=\"subsection-body\" hidden>"
            if (element.description) {
                html += "<p>" + element.description + "</p>"
            }
            if (element.images.length > 0) {
                html += "<center>"
                for (imagefile of element.images) {
                    html += "<img src=\"static/img/" + imagefile + "\"></img>";
                }
                html += "</center>"
            }
            html += "</div>"
        }

        html += "</div></div>";
        finalHtml += html;
    });
    return finalHtml;
}

function generateLanguages(elements) {

    // sort alphabetically
    elements.sort(function(a, b) {
        if ((a.language) > (b.language)) { return 1; }
        if ((a.language) < (b.language)) { return -1; }
        return 0;
    });

    let finalHtml = "";
    for (element of elements) {

        let html = "<div class=\"subsection\">" +
                    "<p><b>" + element.language + "</b></p>";

        if (element.level == 1) { html += " <p>(<i>Basic</i>)</p><div class=\"level-bar\"><div class=\"bar-fill b\"></div></div>"; }
        else if (element.level == 2) { html += " <p>(<i>Intermediate</i>)</p><div class=\"level-bar\"><div class=\"bar-fill i\"></div></div>"; }
        else if (element.level == 3) { html += " <p>(<i>Fluent</i>)</p><div class=\"level-bar\"><div class=\"bar-fill a\"></div></div>"; }

        html += "</div>"
        finalHtml += html;
    }

    return finalHtml;
}

// CHEVRON ARROWS LISTENER
$("div.section-content").on("click", "div.chevron", function() {
    $(this).parent().find("div.subsection-body").toggle();
    if ($(this).hasClass("right")) {
        $(this).removeClass("right").addClass("down");
    } else if ($(this).hasClass("down")) {
        $(this).removeClass("down").addClass("right");
    }
});

// sort elements by start date, in descending order
function sortByDate(list) {
    list.sort(function(a, b) {
        if (moment(a.startdate, "MMMM YYYY").isSame(moment(b.startdate, "MMMM YYYY"))) { return 0; }
        else if (moment(a.startdate, "MMMM YYYY").isBefore(moment(b.startdate, "MMMM YYYY"))) { return 1; }
        else if (moment(a.startdate, "MMMM YYYY").isAfter(moment(b.startdate, "MMMM YYYY"))) { return -1; }
    });
    return list;
}
