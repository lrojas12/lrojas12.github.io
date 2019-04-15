class Section {

    static build = (sectionCamelCase, content) => {

        // Generate what would be the actual section name
        let sectionName = camelCaseToSpaced(sectionCamelCase);
        let $sectionTitle = $('<div></div>').addClass('title')
                                            .html(sectionName);

        // Generate section wrapper div element
        let $sectionDiv = $('<div></div>').addClass('section')
                .attr('id', sectionCamelCase)
                .append($sectionTitle);

        let sortedContent = this.sortSectionByDate(content);

        // Assign corresponding builders
        if (sectionCamelCase === 'skills') {
            let $skillsSubsection = Subsection.buildSkills(sortedContent);
            $sectionDiv.append($skillsSubsection);
        } else if (sectionCamelCase === 'languages') {
            let $languagesSubsection = Subsection.buildLanguages(sortedContent);
            $sectionDiv.append($languagesSubsection);
        } else {
            // Generic builder
            for (let subsection of sortedContent) {
                let $subsection = Subsection.build(sectionCamelCase, subsection)
                $sectionDiv.append($subsection);
            }
        }

        return $sectionDiv;
    }

    static sortSectionByDate = (content) => {

        // Check if the element has a "date" property. If not, return the original.
        if (typeof content[0].date === 'undefined')
            return content;

        // Put aside elements with "present" as end date.
        let present = []
        let past = []

        content.forEach(function(elem, i) {
            (elem.date.end === "Present") ? present.push(elem) : past.push(elem)
        })

        // Sort the "present" elements using the start date (descending order)
        present.sort(function(a, b) {
            if (moment(a.date.start, "MMMM YYYY").isSame(moment(b.date.start, "MMMM YYYY"))) {
                return 0;
            } else if (moment(a.date.start, "MMMM YYYY").isBefore(moment(b.date.start, "MMMM YYYY"))) {
                return 1;
            } else if (moment(a.date.start, "MMMM YYYY").isAfter(moment(b.date.start, "MMMM YYYY"))) {
                return -1;
            }
        })

        // Sort elements with a set end date (descending order)
        past.sort(function(a, b) {

            // If the end date is available for both elements, use that to sort. descending order.
            if ((a.date.end !== '') && (b.date.end !== '')) {
                if (moment(a.date.end, "MMMM YYYY").isSame(moment(b.date.end, "MMMM YYYY"))) {
                    return 0;
                } else if (moment(a.date.end, "MMMM YYYY").isBefore(moment(b.date.end, "MMMM YYYY"))) {
                    return 1;
                } else if (moment(a.date.end, "MMMM YYYY").isAfter(moment(b.date.end, "MMMM YYYY"))) {
                    return -1;
                }
            // Otherwise, use the start date. descending order.
            } else {
                if (moment(a.date.start, "MMMM YYYY").isSame(moment(b.date.start, "MMMM YYYY"))) { return 0; }
                else if (moment(a.date.start, "MMMM YYYY").isBefore(moment(b.date.start, "MMMM YYYY"))) { return 1; }
                else if (moment(a.date.start, "MMMM YYYY").isAfter(moment(b.date.start, "MMMM YYYY"))) { return -1; }
            }
        });

        return present.concat(past);
    }
}

class Subsection {

    static build = (sectionType, data) => {

        let $content;

        switch(sectionType) {
            case "education":
                $content = this.buildEducation(data);
                break;
            case "projects":
                $content = this.buildProject(data);
                break;
            case "workExperience":
                $content = this.buildWorkdExperience(data);
                break;
            case "postersAndExhibits":
                $content = this.buildPosterOrExhibit(data);
                break;
            case "extracurricularActivities":
                $content = this.buildExtracurricularActivity(data);
                break;
            case "volunteering":
                $content = this.buildVolunteerWork(data);
                break;
            case "honoursAndAwards":
                $content = this.buildHonourOrAward(data);
                break;
            default:
                displayError(`File <code>${CONFIG_FILE_PATH}</code> contains a section type that is not supported: "<b>${sectionType}</b>".`);
        }

        // For all sections: If the body is NOT empty, then change the title cursor to 'pointer'.
        let $titleElement = $content.find('div.subsection-head div.title');
        let $bodyElement = $content.find('div.subsection-body');
        if ($bodyElement.html() !== '') {
            $titleElement.css('cursor', 'pointer');
        }

        return $content;
    }

    static getChevron = (hasBody)  => {

        // let rightChevronImgPath = 'assets/img/icons/chevron-right.png';
        let emptyImgPath = 'assets/img/icons/empty-img.gif';

        let $chevron = $('<div></div>').addClass('chevron');
        let $chevronImg = $('<img>');

        if (hasBody) {
            $chevronImg.addClass('right');
        } else {
            $chevronImg.attr('src', emptyImgPath)
                        .addClass('empty');
        }

        $chevron.append($chevronImg);

        return $chevron;
    }

    static getIcon = (iconFileName)  => {

        let $icon = $('<div></div>');

        if ((iconFileName) && (iconFileName !== '')) {
            let $iconImg = $('<img>').attr('src', `assets/img/icons/${iconFileName}`);
            $icon = $('<div></div>').addClass('icon')
                                    .append($iconImg);
        }

        return $icon;
    }

    static generateDates = (dates) => {

        let datesStr = `${dates.start}`;
        if ((dates.end) && (dates.end !== "")) {
            datesStr += ` - ${dates.end}`;
        }

        return datesStr;
    }

    static generateSubsectionHead = (title, date, subtitle='', subsubtitle='')  => {

        let $subsectionTitle = $('<div></div>').addClass('title')
                                                .html(title);

        let $subsectionDate = $('<div></div>').addClass('date')
                                                .html(this.generateDates(date));

        let $titleDate = $('<div></div>').addClass('title-date')
                                        .append($subsectionTitle)
                                        .append($subsectionDate);

        let $subtitle = $('<div></div>').addClass('subtitle');
        if (subtitle !== '') {
            if ((subtitle.url) && (subtitle.url !== '')) {
                let $link = $('<a></a>').attr('href', subtitle.url)
                                        .attr('target', '_blank')
                                        .html(subtitle.name);
                $subtitle.append($link);
            } else {
                $subtitle.html(subtitle.name);
            }
        }

        let $subsubtitle = $('<div></div>').addClass('subsubtitle');
        if (subsubtitle !== '') {
            if ((subsubtitle.url) && (subsubtitle.url !== '')) {
                let $link = $('<a></a>').attr('href', subsubtitle.url)
                                        .attr('target', '_blank')
                                        .html(subsubtitle.name);
                $subsubtitle.append($link);
            } else {
                $subsubtitle.html(subsubtitle.name);
            }
        }

        let $subsectionHead = $('<div></div>').addClass('subsection-head')
                                                .append($titleDate)
                                                .append($subtitle)
                                                .append($subsubtitle);

        return $subsectionHead;

    }

    static buildSkills = (data) => {

        // Sort skills alphabetically by tool
        data.sort(function(a, b) {
            if ((a.tool) > (b.tool)) { return 1; }
            if ((a.tool) < (b.tool)) { return -1; }
            return 0;
        });

        let $subsection = $('<div></div>').addClass('subsection');

        let $ul = $('<ul></ul>');
        for (let skill of data) {

            let $tool = $('<p></p>').html(skill.tool);
            let $frameworks = $('<p></p>').addClass('frameworks');

            if (skill.frameworks.length > 0) {
                $frameworks.append('(');
                for (let framework of skill.frameworks) {
                    $frameworks.append(framework)
                    if (framework !== skill.frameworks[skill.frameworks.length-1]) {
                        $frameworks.append(', ');
                    }
                }
                $frameworks.append(')');
            }

            let $li = $('<li></li>').append($tool)
                                    .append($frameworks);
            $ul.append($li);
        }

        $subsection.append($ul);
        return $subsection;
    }

    static buildLanguages = (data) => {

        let levels = ["Basic", "Intermediate", "Fluent", "Native"]

        // Sort skills alphabetically by tool
        data.sort(function(a, b) {
            if ((a.level) > (b.level)) { return 1; }
            if ((a.level) < (b.level)) { return -1; }
            return 0;
        });

        let $subsection = $('<div></div>').addClass('subsection');

        for (let set of data) {

            let $language = $('<p></p>').addClass('language')
                                        .html(set.language);
            let $level = $('<p></p>').addClass('level')
                                    .html(` (${levels[set.level-1]})`);
            if (set.language !== data[data.length-1].language) {
                $level.append(",&nbsp;")
            }

            let $languageEntry = $('<span></span>').append($language)
                                                .append($level);
            $subsection.append($languageEntry);
        }

        return $subsection;
    }

    static buildEducation = (data) => {

        let title = `${data.degree} ${data.major}`;
        if ((data.minor) && (data.minor !== '')) {
            title += `, Minor in ${data.minor}`;
        }

        let $head = this.generateSubsectionHead(title, data.date, data.institution);

        let hasBody = false; // used to determine if should add chevron or not
        let $body = $('<div></div>').addClass('subsection-body')
                                    .css('display', 'none');

        if (data.description !== '') {
            hasBody = true;
            let $description = $('<div></div>').addClass('description')
                                                .html(data.description);
            $body.append($description);
        }

        if (data.courses.length > 0) {
            hasBody = true;
            let $courses = $('<div></div>').addClass('courses');

            for (let course of data.courses) {
                let $course = $('<p></p>').addClass('course')
                                            .html(course);
                $courses.append($course);
                // console.log(course);
            }
            $body.append($courses);
        }

        if ((data.cgpa) && (data.cgpa !== '')) {

            let $gpa = $('<div></div>').html(`Cumulative GPA: ${data.cgpa}`);
            if (hasBody) $gpa.css('margin-bottom', '10px'); // add bottom margin if there is data coming after it

            $body.prepend($gpa);
            hasBody = true;
        }

        let $content = $('<div></div>').addClass('subsection-content')
                                        .append($head)
                                        .append($body);

        let $subsection = $('<div></div>').addClass('subsection')
                                            .append(this.getChevron(hasBody))
                                            .append(this.getIcon(data.icon))
                                            .append($content);
        return $subsection;
    }

    static buildProject = (data) => {

        let $head = this.generateSubsectionHead(data.title, data.date);

        let hasBody = false; // used to determine if should add chevron or not
        let $body = $('<div></div>').addClass('subsection-body')
                                    .css('display', 'none');

        if (data.description !== '') {


            hasBody = true;
            let $description = $('<div></div>').addClass('description')
                                                .html(data.description);
            $body.append($description);
        }

        // TODO: Add images if available

        let $content = $('<div></div>').addClass('subsection-content')
                                        .append($head)
                                        .append($body);

        if (data.tools.length > 0) {

            let $tools = $('<div></div>').addClass('tools');

            data.tools.sort(); // Sort tools alphabetically
            for (let tool of data.tools) {
                let $tool = $('<p></p>').addClass('tool')
                                        .html(tool);
                $tools.append($tool);
            }
            $content.append($tools);
        }

        if ((data.githubUrl) && (data.githubUrl !== '')) {

            let $text = $('<p></p>').html('See on GitHub ');
            let $githubImg = $('<img>').attr('src', 'assets/img/icons/github.png')
                                        .attr('alt', 'GitHub');
            let $githubLink = $('<a></a>').addClass('githubLink')
                                            .attr('href', data.githubUrl)
                                            .attr('target', '_blank')
                                            .append($text)
                                            // .append($githubImg)

            $head.find('div.subtitle').append($githubLink);
        }

        let $subsection = $('<div></div>').addClass('subsection')
                                            .append(this.getChevron(hasBody))
                                            .append($content);
        return $subsection;
    }

    static buildWorkdExperience = (data) => {

        // Generate header information
        let locationInExpectedFormat = {'name': data.company.location};
        let $head = this.generateSubsectionHead(data.position, data.date, data.company, locationInExpectedFormat);

        let hasBody = false; // used to determine if should add chevron or not
        let $body = $('<div></div>').addClass('subsection-body')
                                    .css('display', 'none');

        if (data.description !== '') {
            hasBody = true;
            let $description = $('<div></div>').addClass('description')
                                                .html(data.description);
            $body.append($description);
        }

        let $content = $('<div></div>').addClass('subsection-content')
                                        .append($head)
                                        .append($body);

        let $subsection = $('<div></div>').addClass('subsection')
                                            .append(this.getChevron(hasBody))
                                            .append(this.getIcon(data.icon))
                                            .append($content);
        return $subsection;
    }

    static buildPosterOrExhibit = (data) => {

        // Generate header information
        let authors = '';
        for (let author of data.authors) {
            authors += author
            if (author !== data.authors[data.authors.length-1]) {
                authors += ', ';
            }
        }

        let locationInExpectedFormat = {'name': data.event.location}
        let $head = this.generateSubsectionHead(data.title, data.event.date, data.event, locationInExpectedFormat);

        let hasBody = true; // Should always have a body if at least the authors are included.

        let $body = $('<div></div>').addClass('subsection-body')
                                    .css('display', 'none');

        let $description = $('<div></div>').addClass('description')
                                            .append(authors)
                                            .append('<br>');

        if ((data.description) && (data.description !== '')) {
            $description.append(data.description);
        }

        if ((data.pdf) && (data.pdf !== '')) {

            let $link = $("<a></a>").addClass('pdfLink')
                                    .attr('href', `assets/pdf/${data.pdf}`)
                                    .attr('target', '_blank')
                                    .html('View poster PDF');

            $description.append($link);
        }

        $body.append($description);

        let $content = $('<div></div>').addClass('subsection-content')
                                        .append($head)
                                        .append($body);

        let $subsection = $('<div></div>').addClass('subsection')
                                            .append(this.getChevron(hasBody))
                                            .append(this.getIcon(data.icon))
                                            .append($content);
        return $subsection;
    }

    static buildExtracurricularActivity = (data) => {

        // Generate header information
        let $head = this.generateSubsectionHead(data.role, data.date, data.organization);

        let hasBody = false; // used to determine if should add chevron or not
        let $body = $('<div></div>').addClass('subsection-body')
                                    .css('display', 'none');

        if (data.description !== '') {
            hasBody = true;
            let $description = $('<div></div>').addClass('description')
                                                .html(data.description);
            $body.append($description);
        }

        let $content = $('<div></div>').addClass('subsection-content')
                                        .append($head)
                                        .append($body);

        let $subsection = $('<div></div>').addClass('subsection')
                                            .append(this.getChevron(hasBody))
                                            .append(this.getIcon(data.icon))
                                            .append($content);
        return $subsection;
    }

    static buildVolunteerWork = (data) => {

        // Generate header information
        let $head = this.generateSubsectionHead(data.role, data.date, data.organization, data.event);

        let hasBody = false; // used to determine if should add chevron or not
        let $body = $('<div></div>').addClass('subsection-body')
                                    .css('display', 'none');

        if (data.description !== '') {
            hasBody = true;
            let $description = $('<div></div>').addClass('description')
                                                .html(data.description);
            $body.append($description);
        }

        let $content = $('<div></div>').addClass('subsection-content')
                                        .append($head)
                                        .append($body);

        let $subsection = $('<div></div>').addClass('subsection')
                                            .append(this.getChevron(hasBody))
                                            .append(this.getIcon(data.icon))
                                            .append($content);
        return $subsection;
    }

    static buildHonourOrAward = (data) => {

        let $head = this.generateSubsectionHead(data.award.name, data.dates, data.issuer);

        // Sort dates in descending order
        data.dates.sort(function(a, b) {
            if (moment(a, "MMMM YYYY").isSame(moment(b, "MMMM YYYY"))) {
                return 0;
            } else if (moment(a, "MMMM YYYY").isBefore(moment(b, "MMMM YYYY"))) {
                return 1;
            } else if (moment(a, "MMMM YYYY").isAfter(moment(b, "MMMM YYYY"))) {
                return -1;
            }
        })

        let datesStr = '';
        for (let date of data.dates) {
            datesStr += date;
            if (date !== data.dates[data.dates.length-1]) {
                datesStr += ', ';
            }
        }
        $head.find('div.date').html(datesStr);

        let hasBody = false; // used to determine if should add chevron or not
        let $body = $('<div></div>').addClass('subsection-body')
                                    .css('display', 'none');

        if (data.description !== '') {
            hasBody = true;
            let $description = $('<div></div>').addClass('description')
                                                .html(data.description);
            $body.append($description);
        }

        let $content = $('<div></div>').addClass('subsection-content')
                                        .append($head)
                                        .append($body);

        let $subsection = $('<div></div>').addClass('subsection')
                                            .append(this.getChevron(hasBody))
                                            .append(this.getIcon(data.icon))
                                            .append($content);
        return $subsection;
    }
}