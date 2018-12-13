$(document).ready(function() {
    let resumeContent = "content.json";

    $.getJSON(resumeContent, function(data) {

        // page/tag title
        $("title").html(data.name.first + " " + data.name.last);

        // page header: full name
        $("#header p#first").append(data.name.first + "&nbsp;");
        $("#header p#last").append(data.name.last);

        if (data.currentposition) { $("div#currentposition").append("<p>" + data.currentposition + "</p>"); }
        else { $("div#currentposition").remove(); }

        if (data.resumepdf) { $("div#download-pdf-button a").prop("href", data.resumepdf); }
        else { $("div#download-pdf-button").remove(); }

        if (data.phone) { $("div#contact").append("<div><img class=\"contact-icon\" src=\"./static/img/phone-icon.png\"></div><div><p>" + data.phone + "</p></div>"); }
        if (data.email) { $("div#contact").append("<div><img class=\"contact-icon\" src=\"./static/img/email-icon.png\" style=\"margin-top:5px;\"></div><div><p><a href=\"mailto:" + data.email + "\"" + ">" + data.email + "</a></p></div>"); }
        if (data.github) {
            $("div#contact").append("<div><img class=\"contact-icon\" src=\"./static/img/github-icon.png\"></div><div><p><a target=\"_blank\" href=\"https://github.com/" + data.github + "\"" + ">" + data.github + "</a></p></div>");
        }
        if (data.linkedin) { $("div#contact").append("<div><img class=\"contact-icon\" src=\"./static/img/linkedin-icon.png\"></div><div><p><a target=\"_blank\" href=\"https://linkedin.com/in/" + data.linkedin + "\"" + ">" + data.linkedin + "</a></p></div>"); }

        if (data.summary) { $("div#summary").html("<p>" + data.summary + "</p>"); }

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
            let awardElem = new Award(elem.title, elem.issuer, elem.url, elem.date, elem.description);
            awardsList.push(awardElem);
        });
        let awardsHtml = generateAwards(awardsList);
        $("div#honours-awards-section").find("div.section-content").html(awardsHtml);

        // ---------- populate skills section ----------
        let skillsList = [];
        data.skills.forEach(function(elem, i) {
            let skillElem = new Skill(elem.skill, elem.frameworks);
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
            let projectElem = new Project(elem.name, elem.url, elem.startdate, elem.enddate, elem.description, elem.technologies, elem.images);
            projectsList.push(projectElem);
        });
        let projectsHtml = generateProjects(projectsList);
        $("div#projects-section").find("div.section-content").html(projectsHtml);

        // ---------- populate posters and exhibits section ----------
        let exhibitsList = [];
        data.postersexhibits.forEach(function(elem, i) {
            let exhibitElem = new Exhibit(elem.title, elem.authors, elem.event, elem.url, elem.location, elem.date, elem.description, elem.images, elem.pdfpath);
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

        // ---------- last-updated date ----------
        $("p#last-update-date").append(data.lastupdatedate);

        addCursorsToSubtitles();
    });
});

// HTML GENERATOR FOR EDUCATION SUBSECTIONS
function generateEducation(elements, i) {

    // sort elements by start date, in descending order
    let localElements = sortByDate(elements);

    // iterate through each education element, and generating its html object
    let finalHtml = "";
    localElements.forEach(function (element, i) {

        let html = "";

        if (i === 0) {
            html += "<div class=\"subsection-container first\">";
        } else {
            html += "<div class=\"subsection-container\">"
        }

        html += "<div class=\"chevron";
        if ((element.courses.length > 0) || (element.description)) { html += " down"; }
        html += "\">"

        html += "</div>" +
                "<div class=\"subsection\">" +
                "<div class=\"subsection-header\">";

        if (element.field) { html += "<p class=\"subtitle\">" + element.degree + " " + element.field + "</p>"; }
        else { html += "<p class=\"subtitle\">" + element.degree + "</p>"; }

        html += "<p class=\"date\">" + element.startdate + " - " + element.enddate + "</p><br>" + "<p class=\"subsubtitle\">";

        if (element.url) { html += "<a target=\"_blank\" href=\"" + element.url + "\">" + element.school + "</a>"; }
        else { html += element.school }

        html += "</p>" + "</div>";

        // to avoid odd spaces after an empty subsection body. a body should contain a description, courses, or both
        if ((i === 0) && ((element.courses.length > 0) || (element.description))) { html += "<div class=\"subsection-body with-border \">"; }
        else if ((element.courses.length > 0) || (element.description)) { html += "<div class=\"subsection-body with-border\">"; }
        else { html += "<div>" }

        if (element.description) { html += "<p>" + element.description + "</p>"; }

        if (element.courses.length > 0) {
            html += "<div class=\"courses\">";
            for (course of element.courses) { html += "<p class=\"course-or-tech\">" + course.code + " - " + course.name + "</p>"; }
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

        let html = "";

        if (i === 0) {
            html += "<div class=\"subsection-container first\">";
        } else {
            html += "<div class=\"subsection-container\">";
        }

        html += "<div class=\"chevron";
        if (element.description) { html += " down"; }
        html += "\">"

        // if (element.description) { html += "<img>"; }

        html += "</div>" +
                "<div class=\"subsection\">" +
                "<div class=\"subsection-header\">" +
                "<p class=\"subtitle\">" + element.title + "</p>" +
                "<p class=\"date\">" + element.startdate + "</p><br>" +
                "<p class=\"subsubtitle\">";

        if (element.url) { html += "<a target=\"_blank\" href=\"" + element.url + "\">" + element.issuer + "</a>"; }
        else { html += element.issuer }

        html += "</p>" + "</div>";

        // to avoid odd spaces after an empty subsection body. a body should contain a description, courses, or both
        if ((i === 0) && (element.description)) { html += "<div class=\"subsection-body with-border \">"+ "<p>" + element.description + "</p>" + "</div>"; }
        else if (element.description) { html += "<div class=\"subsection-body with-border\">" + "<p>" + element.description + "</p>" + "</div>"; }

        html += "</div></div>";
        finalHtml += html;
    });
    return finalHtml;
}

// Old function
// function generateSkills(elements) {
//
//     let lvl1 = []; let lvl2 = []; let lvl3 = [];
//
//     elements.forEach(function(elem, i) {
//         if (elem.level == 1) { lvl1.push(elem); }
//         else if (elem.level == 2) { lvl2.push(elem); }
//         else if (elem.level == 3) { lvl3.push(elem); }
//     });
//
//     let finalHtml = "";
//     if ((lvl1.length > 0) || (lvl2.length > 0) || (lvl3.length > 0)) {
//
//         // level 1 skills
//         if (lvl1.length > 0) {
//             finalHtml += "<div class=\"subsection\">" + "<p>Beginner</p>" + "<div class=\"level-bar\">" + "<div class=\"bar-fill b\"></div>" +
//                                 "</div>" + "<div class=\"subsection-body\">"
//             lvl1.forEach(function(elem, i) { finalHtml += "<p class=\"course-or-tech\">" + elem.skill + "</p>" });
//             finalHtml += "</div></div>"
//         }
//
//         // level 2 skills
//         if (lvl2.length > 0) {
//             finalHtml += "<div class=\"subsection\">" + "<p>Intermediate</p>" + "<div class=\"level-bar\">" + "<div class=\"bar-fill i\"></div>" +
//                                 "</div>" + "<div class=\"subsection-body\">"
//             lvl2.forEach(function(elem, i) { finalHtml += "<p class=\"course-or-tech\">" + elem.skill + "</p>" });
//             finalHtml += "</div></div>"
//         }
//
//         // level 3 skills
//         if (lvl3.length > 0) {
//             finalHtml += "<div class=\"subsection\">" + "<p>Advanced</p>" + "<div class=\"level-bar\">" + "<div class=\"bar-fill a\"></div>" +
//                             "</div>" + "<div class=\"subsection-body\">"
//             lvl3.forEach(function(elem, i) { finalHtml += "<p class=\"course-or-tech\">" + elem.skill + "</p>" });
//             finalHtml += "</div></div>"
//         }
//         finalHtml += "</div>"
//     }
//     return finalHtml;
// }

function generateSkills(elements) {

    // sort alphabetically
    elements.sort(function(a, b) {
        if ((a.skill) > (b.skill)) { return 1; }
        if ((a.skill) < (b.skill)) { return -1; }
        return 0;
    });

    console.log(elements);

    let finalHtml = "<ul>";
    for (element of elements) {
        finalHtml += "<li>" + element.skill;

        if (element.frameworks.length > 0) {
            finalHtml += " <p style=\"color: #AEAAAA;\">(";

            element.frameworks.forEach(function(framework, index) {
                finalHtml += framework
                if (index !== (element.frameworks.length-1)) {
                    finalHtml += ", "
                }
            });

            finalHtml += ")</p>"
        }
        finalHtml += "</li>"
    }
    finalHtml += "</ul>";

    return finalHtml;
}

function generateWork(elements) {

    let localElements = sortByDate(elements);

    let finalHtml = "";
    localElements.forEach(function(element, i) {

        let html = "";

        if (i === 0) {
            html += "<div class=\"subsection-container first\">";
        } else {
            html += "<div class=\"subsection-container\">";
        }

        html += "<div class=\"chevron";
        if (element.description) { html += " down"; }
        html += "\">"

        html += "</div>" +
                "<div class=\"subsection\">" +
                "<div class=\"subsection-header\">" +
                "<p class=\"subtitle\">" + element.position + "</p>" +
                "<p class=\"date\">" + element.startdate + " - " + element.enddate + "</p><br>" +
                "<p class=\"subsubtitle\">";

        if (element.url) { html += "<a target=\"_blank\" href=\"" + element.url + "\">" + element.company + "</a>"; }
        else { html += element.company }

        html += "</p>" + "</div>";

        // to avoid odd spaces after an empty subsection body. a body should contain a description, courses, or both
        if ((i === 0) && (element.description)) { html += "<div class=\"subsection-body with-border \">"+ "<p>" + element.description + "</p>" + "</div>"; }
        else if (element.description) { html += "<div class=\"subsection-body with-border\">" + "<p>" + element.description + "</p>" + "</div>"; }

        html += "</div></div>";
        finalHtml += html;
    });
    return finalHtml;
}

function generateProjects(elements) {

    let localElements = sortByDate(elements);

    let finalHtml = "";
    localElements.forEach(function(element, i) {

        let html = "";

        if (i === 0) {
            html += "<div class=\"subsection-container first\">";
        } else {
            html += "<div class=\"subsection-container\">";
        }

        html += "<div class=\"chevron";
        if ((element.description) || (element.images.length > 0)) { html += " down"; }
        html += "\">"

        html += "</div>" +
                "<div class=\"subsection\">" +
                "<div class=\"subsection-header\">" +
                "<p class=\"subtitle\">" + element.name + "</p>";

        if (element.url) { html += "<div class=\"see-more-icon github\"><a target=\"_blank\" href=\"" + element.url + "\" title=\"See project on GitHub\"></a></div>"; }

        if (element.enddate) { html += "<p class=\"date\">" + element.startdate + " - " + element.enddate + "</p>" + "<p>"; }
        else { html += "<p class=\"date\">" + element.startdate + "</p>" + "<p>"; }

        html += "</p>" + "</div>";

        // to avoid odd spaces after an empty subsection body. a body should contain a description, courses, or both
        if ((i === 0) && ((element.description) || (element.images.length > 0))) {

            html += "<div class=\"subsection-body with-border \">";
            if (element.description) {
                html += "<p>" + element.description + "</p>"

                // only check for technologies if there is a description included
                if (element.technologies.length > 0) {

                    html += "<div class=\"technologies-wrapper\">"

                    // sort them alphabetically
                    element.technologies.sort();

                    // add them to the DOM
                    for (tech of element.technologies) {
                        html += "<p class=\"course-or-tech\">" + tech + "</p>"
                    }
                    html += "</div>"
                }
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
            html += "<div class=\"subsection-body with-border\">";
            if (element.description) {
                html += "<p>" + element.description + "</p>"

                // only include the technologies and languages used if there is also a description
                if (element.technologies.length > 0) {

                    html += "<div class=\"technologies-wrapper\">"

                    // sort them alphabetically
                    element.technologies.sort();

                    for (tech of element.technologies) {
                        html += "<p class=\"course-or-tech\">" + tech + "</p>"
                    }
                    html += "</div>"
                }
            }

            if (element.images.length > 0) {
                html += "<div class=\"project-images\"><center>"
                for (imagefile of element.images) {
                    html += "<img src=\"static/img/" + imagefile + "\"></img>";
                }
                html += "</center></div>"
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

        let html = "";

        if (i === 0) {
            html += "<div class=\"subsection-container first\">";
        } else {
            html += "<div class=\"subsection-container\">";
        }

        html += "<div class=\"chevron down \">";

        html += "</div>" +
                "<div class=\"subsection\">" +
                "<div class=\"subsection-header\">" +
                "<p class=\"subtitle\">" + element.title + "</p>"

        if (element.pdfpath) { html += "<div class=\"see-more-icon pdf\"><a target=\"_blank\" href=\"" + element.pdfpath + "\" title=\"See PDF file\"></a></div>"}

        html += "<p class=\"date\">" + element.startdate + "</p>";

        if (element.authors.length) {
            html += "<br><p>"
            element.authors.forEach(function(author, i) {
                html += author;
                if (i !== element.authors.length - 1) { html += ", "; }
            });
            html += "</p></div>";
        }

        // add body
        if ((i === 0) && (element.description || element.event || element.location)) {
            html += "<div class=\"subsection-body with-border \">";
            if (element.url) { html += "<p><i><a target=\"_blank\" href=\"" + element.url + "\">" + element.event + "</a></i></p>"; }
            else { html += "<p><i>" + element.event + "</i></p>"}
            if (element.location) { html += "<br><p>" + element.location + "</p>"; }
            if (element.description) { html += "<br><br><p>" + element.description + "</p>"; }
            html += "</div>";
        }
        else if (element.description || element.event || element.location) {
            html += "<div class=\"subsection-body with-border\">";
            if (element.url) { html += "<p><i><a target=\"_blank\" href=\"" + element.url + "\">" + element.event + "</a></i></p>"; }
            else { html += "<p><i>" + element.event + "</i></p>"}
            if (element.location) { html += "<br><p>" + element.location + "</p>"; }
            if (element.description) { html += "<br><br><p>" + element.description + "</p>"; }
            html += "</div>";
        }
        html += "</div></div>";
        finalHtml += html;
    });
    return finalHtml;
}

function generateExtracurricularVolunteer(elements) {

    let localElements = sortByDate(elements);

    let finalHtml = "";
    localElements.forEach(function(element, i) {

        let html = "";

        if (i === 0) {
            html += "<div class=\"subsection-container first\">";
        } else {
            html += "<div class=\"subsection-container\">";
        }

        html += "<div class=\"chevron";
        if ((element.description) || (element.images.length > 0)) { html += " down"; }
        html += "\">"

        html += "</div>" +
                "<div class=\"subsection\">" +
                "<div class=\"subsection-header\">" +
                "<p class=\"subtitle\">" + element.role + "</p>"

        if (element.enddate) { html += "<p class=\"date\">" + element.startdate + " - " + element.enddate + "</p><br>"; }
        else { html += "<p class=\"date\">" + element.startdate + "</p><br>"; }

        if (element.event.name) {
            if (element.event.url) { html +=  "<p><a target=\"_blank\" href=\"" + element.event.url + "\">" + element.event.name + "</a></p><br>"; }
            else { html +=  "<p>" + element.event.name + "</p><br>"; }
        }

        html += "<p class=\"subsubtitle\">";

        if (element.url) { html += "<a target=\"_blank\" href=\"" + element.url + "\">" + element.organization + "</a>"; }
        else { html += element.organization }

        html += "</p>" + "</div>";

        // to avoid odd spaces after an empty subsection body. a body should contain a description, courses, or both
        if ((i === 0) && ((element.description) || (element.images.length > 0))) {

            html += "<div class=\"subsection-body with-border \">"
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

            html += "<div class=\"subsection-body with-border\">"
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

// Old version
// function generateLanguages(elements) {
//
//     // sort alphabetically
//     elements.sort(function(a, b) {
//         if ((a.language) > (b.language)) { return 1; }
//         if ((a.language) < (b.language)) { return -1; }
//         return 0;
//     });
//
//     let finalHtml = "";
//     for (element of elements) {
//
//         let html = "<div class=\"subsection\">" +
//                     "<p><b>" + element.language + "</b></p>";
//
//         if (element.level == 1) { html += " <p>(<i>Basic</i>)</p><div class=\"level-bar\"><div class=\"bar-fill b\"></div></div>"; }
//         else if (element.level == 2) { html += " <p>(<i>Intermediate</i>)</p><div class=\"level-bar\"><div class=\"bar-fill i\"></div></div>"; }
//         else if (element.level == 3) { html += " <p>(<i>Fluent</i>)</p><div class=\"level-bar\"><div class=\"bar-fill a\"></div></div>"; }
//
//         html += "</div>"
//         finalHtml += html;
//     }
//
//     return finalHtml;
// }

function generateLanguages(elements) {

    let finalHtml = "<p>";

    // sort by level
    elements.sort(function(a, b) {
        if ((a.level) > (b.level)) { return -1; }
        if ((a.level) < (b.level)) { return 1; }
        return 0;
    });

    elements.forEach(function(element, index) {

        let languageLevel = ""

        switch (element.level) {
            case 1:
                languageLevel = "Basic"
                break;
            case 2:
                languageLevel = "Intermediate"
                break;
            case 3:
                languageLevel = "Advanced"
                break;
            case 4:
                languageLevel = "Mother language"
                break;
            default:
                break;
        }

        finalHtml += "<p class=\"language\">" + element.language + "</p> <p>(" + languageLevel + ")</p>";

        if (index !== (elements.length - 1)) { finalHtml += ", "; }
    });

    finalHtml += "</p>";

    return finalHtml;
}

// CHEVRON ARROWS LISTENER - EXPAND DETAILS
$("div.section-content").on("click", "div.chevron", function() {

    let bodyElem = $(this).parent().find("div.subsection-body");

    if (bodyElem.length) { // if exists
        // bodyElem.toggleClass("open");
        bodyElem.slideToggle();
        $(this).toggleClass("right").toggleClass("down");
    }

});

// SUBTITLES LISTENER - EXPAND DETAILS
$("div.section-content").on("click", "div.subsection-header p.subtitle", function() {
    let targetChevron = $(this).parent().parent().parent().find(".chevron");
    if (targetChevron.length) { targetChevron.click(); }
});


// sort elements by start and/or end date
function sortByDate(list) {

    // make sure elements with "present" as end date are at the top.
    presentList = []

    // elements with a set end date go after
    olderList = []

    list.forEach(function(elem, i) {
        (elem.enddate === "Present") ? presentList.push(elem) : olderList.push(elem)
    })

    // sort the "present" elements using the start date. descending order.
    presentList.sort(function(a, b) {
        if (moment(a.startdate, "MMMM YYYY").isSame(moment(b.startdate, "MMMM YYYY"))) { return 0; }
        else if (moment(a.startdate, "MMMM YYYY").isBefore(moment(b.startdate, "MMMM YYYY"))) { return 1; }
        else if (moment(a.startdate, "MMMM YYYY").isAfter(moment(b.startdate, "MMMM YYYY"))) { return -1; }
    })

    // sort elements with a set end date
    olderList.sort(function(a, b) {

        // if the end date is available for both elements, use that to sort. descending order.
        if (a.enddate && b.enddate) {
            if (moment(a.enddate, "MMMM YYYY").isSame(moment(b.enddate, "MMMM YYYY"))) { return 0; }
            else if (moment(a.enddate, "MMMM YYYY").isBefore(moment(b.enddate, "MMMM YYYY"))) { return 1; }
            else if (moment(a.enddate, "MMMM YYYY").isAfter(moment(b.enddate, "MMMM YYYY"))) { return -1; }
        // otherwise, use the start date. descending order.
        } else {
            if (moment(a.startdate, "MMMM YYYY").isSame(moment(b.startdate, "MMMM YYYY"))) { return 0; }
            else if (moment(a.startdate, "MMMM YYYY").isBefore(moment(b.startdate, "MMMM YYYY"))) { return 1; }
            else if (moment(a.startdate, "MMMM YYYY").isAfter(moment(b.startdate, "MMMM YYYY"))) { return -1; }
        }

    });

    return presentList.concat(olderList);
}

// iterate through all subtitles. if the overall object contains a chevron, then change its subtitle cursor to a pointer.
function addCursorsToSubtitles() {

    $("div.subsection-container").each(function(i, container) {

        if ($(container).find("div.subsection-body").length) {
            $(container).find("p.subtitle").css("cursor", "pointer");
        }

        // close all but the first in each list
        // if (!($(container).hasClass("first"))) {
        //     ($(container)).find(".chevron").click();
        // }

        // close all
        ($(container)).find(".chevron").click();
    });

}
