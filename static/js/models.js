class Education {
    constructor(school, url, degree, field, startdate, enddate, description, courses) {
        this.school = school;
        this.url = url;
        this.degree = degree;
        this.field = field;
        this.startdate = startdate;
        this.enddate = enddate;
        this.description = description;
        this.courses = courses;
    }
};

class Award {
    constructor(title, issuer, url, date, description) {
        this.title = title;
        this.issuer = issuer;
        this.url = url;
        this.startdate = date;
        this.description = description;
    }
};

class Skill {
    constructor(skill, level) {
        this.skill = skill;
        if (level > 3) { this.level = 3; }
        else if (level < 1) { this.level = 1 }
        else { this.level = level; }
    }
};

class Work {
    constructor(position, company, url, location, startdate, enddate, description, images) {
        this.position = position;
        this.company = company;
        this.url = url;
        this.location = location;
        this.startdate = startdate;
        this.enddate = enddate;
        this.description = description;
        this.images = images;
    }
};

class Project {
    constructor(name, url, startdate, enddate, description, images) {
        this.name = name;
        this.url = url;
        this.startdate = startdate;
        this.enddate = enddate;
        this.description = description;
        this.images = images;
    }
};

class Exhibit {
    constructor(title, authors, eevent, url, location, date, description, images) {
        this.title = title;
        this.authors = authors;
        this.event = eevent;
        this.url = url;
        this.location = location;
        this.startdate = date;
        this.description = description;
        this.images = images;
    }
};

class ExtracurricularVolunteer {
    constructor(role, organization, url, eevent, startdate, enddate, description, images) {
        this.role = role;
        this.organization = organization;
        this.url = url;
        this.event = eevent;
        this.startdate = startdate;
        this.enddate = enddate;
        this.description = description;
        this.images = images;
    }
};

class Language {
    constructor(language, level) {
        this.language = language;
        if (level > 3) { this.level = 3; }
        else if (level < 1) { this.level = 1 }
        else { this.level = level; }
    }
};
