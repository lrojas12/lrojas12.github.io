class About {

    static build = (data) => {

        let $name = this.createTitle(data.name);
        let $role = this.createRole(data.currentPosition);

        let $about = $('<div></div>').attr('id', 'headerWrapper')
                                    .append($name)
                                    .append($role)
                                    .append($('<hr>'))
                                    .append(this.buildContact(data.contact))
                                    .append(this.buildDownload(data.resumePath));
        return $about;
    }

    static createTitle = (name) => {

        let $firstName = $('<p></p>').attr('id', 'first')
                                        .html(name.first);

        let $lastName = $('<p></p>').attr('id', 'last')
                                        .html(name.last);

        let $name = $('<div></div>').attr('id', 'name')
                                    .append($firstName)
                                    .append($lastName);
        let $link = $('<a></a>').attr('href', `${WEBSITE_LINK}`)
                                .append($name);
        return $link;
    }

    static createRole = (position) => {
        let $position = $('<p></p>').attr('id', 'role')
                                    .html(position);

        return $position;
    }

    static buildSingleContact = (iconPath, url, text) => {

        let $icon = $('<img>').attr('src', iconPath);
        let $url = $('<a></a>').attr('href', url)
                                .attr('target', '_blank')
                                .html(text);
        let $contact = $('<div></div>').append($icon)
                                        .append($url);

        return $contact;
    }

    static buildContact = (contactInfo) => {

        let $contactSection = $('<div></div>').attr('id', 'contact');

        // E-mail
        if ((contactInfo.email) && (contactInfo.email !== '')) {

            let $email = this.buildSingleContact('assets/img/icons/email.png', `mailto:${contactInfo.email}`, contactInfo.email)
                        .addClass('email');
            $email.find('a').attr('target', '');
            $contactSection.append($email);
        }

        if ((contactInfo.github) && (contactInfo.github !== '')) {

            let $github = this.buildSingleContact('assets/img/icons/github.png', `https://github.com/${contactInfo.github}`, contactInfo.github)
                        .addClass('github');
            $contactSection.append($github);
        }

        if ((contactInfo.linkedin) && (contactInfo.linkedin !== '')) {

            let $linkedin = this.buildSingleContact('assets/img/icons/linkedin.png', `https://linkedin.com/in/${contactInfo.linkedin}`, contactInfo.linkedin)
                        .addClass('linkedin');
            $contactSection.append($linkedin);
        }



        return $contactSection;
    }

    static buildDownload = (resumePath) => {

        let $downloadButton = $('<button></button>').addClass('btn btn-outline-primary btn-sm')
                                                    .attr('id', 'downloadButton')
                                                    .html('Download PDF');

        return $downloadButton;
    }
}