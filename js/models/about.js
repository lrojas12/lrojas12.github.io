class About {

    static build = (data) => {

        console.log(data)

        let $name = this.createTitle(data.name);
        let $role = this.createRole(data.currentPosition);

        let $about = $('<div></div>').attr('id', 'headerWrapper')
                                    .append(this.buildImage(data.profileImage))
                                    .append($name)
                                    .append($role)
                                    .append($('<hr>'))
                                    .append(this.buildContact(data.contact))
                                    .append(this.buildDownload(data.resume));
        return $about;
    }

    static buildImage = (profileImage) => {

        let $img = $('<img>').attr('id', 'profile-image')
                            .attr('src', `${IMGS_DIR_PATH}${profileImage}`)
                            .attr('alt', 'Profile image')
                            .addClass('img-circle')
        return $img;        
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

            let $email = this.buildSingleContact(`${ICONS_DIR_PATH}email.png`, `mailto:${contactInfo.email}`, contactInfo.email)
                        .addClass('email');
            $email.find('a').attr('target', '');
            $contactSection.append($email);
        }

        // GitHub
        if ((contactInfo.github) && (contactInfo.github !== '')) {

            let $github = this.buildSingleContact(`${ICONS_DIR_PATH}github.png`, `https://github.com/${contactInfo.github}`, contactInfo.github)
                        .addClass('github');
            $contactSection.append($github);
        }

        // GitHub
        if ((contactInfo.linkedin) && (contactInfo.linkedin !== '')) {

            let $linkedin = this.buildSingleContact(`${ICONS_DIR_PATH}linkedin.png`, `https://linkedin.com/in/${contactInfo.linkedin}`, contactInfo.linkedin)
                        .addClass('linkedin');
            $contactSection.append($linkedin);
        }

        return $contactSection;
    }

    static buildDownload = (resumeFileName) => {

        console.log(resumeFileName)

        let $downloadButton = $('<a></a>').addClass('btn btn-outline-primary btn-sm')
                                                    .attr('id', 'downloadButton')
                                                    .attr('href', `${PDFS_DIR_PATH}${resumeFileName}`)
                                                    .attr('target', '_blank')
                                                    .html('Download PDF');

        return $downloadButton;
    }
}