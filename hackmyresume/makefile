.PHONY: clean themes change public private all

node_modules_theme=node_modules/jsonresume-theme-
theme=stackoverflow

resume-private=resume-private.JSON
out-private=out-private

resume-public=resume.JSON
out-public=out

all: private public

private:
	hackmyresume BUILD $(resume-private) TO $(out-private)/resume-original.html -t $(node_modules_theme)$(theme)
	find . -name "resume-original.html" -exec sed -i '' 's/Publications/Projects/g' {} +
	find . -name "resume-original.html" -exec sed -i '' 's/Awards/Extracurricular Activities/g' {} +

public:
	hackmyresume BUILD $(resume-public) TO $(out-public)/resume-original.html -t $(node_modules_theme)$(theme)
	find . -name "resume-original.html" -exec sed -i '' 's/Publications/Projects/g' {} +
	find . -name "resume-original.html" -exec sed -i '' 's/Awards/Extracurricular Activities/g' {} +

open:
	open $(out-private)/resume.pdf

list:
	find node_modules/ -name *theme*

pdf-private:
	wkhtmltopdf $(out-private)/resume.html $(out-private)/resume.pdf
	open $(out-private)/resume.pdf
	
pdf-public:
	wkhtmltopdf $(out)/resume-short.html $(out)/resume.pdf
	open $(out)/resume.pdf

clean:
	rm out/*
	rm out-private/*
