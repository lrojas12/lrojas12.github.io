.PHONY: clean themes change public private all

node_modules_theme=node_modules/jsonresume-theme-

resume-private=resume-private.JSON
out-private=out-private

resume-public=resume.JSON
out-public=out

all: private public

private:
	hackmyresume BUILD $(resume-private) TO $(out-private)/resume.html -t $(node_modules_theme)$(theme)
	find . -name "resume.html" -exec sed -i '' 's/Publications/Projects/g' {} +
	wkhtmltopdf $(out-private)/resume.html $(out-private)/resume.pdf
	open $(out-private)/resume.pdf

public:
	hackmyresume BUILD $(resume-public) TO $(out-public)/resume.html -t $(node_modules_theme)$(theme)
	find . -name "resume.html" -exec sed -i '' 's/Publications/Projects/g' {} +

open:
	open $(out-private)/resume.pdf

list:
	find node_modules/ -name *theme*

clean:
	rm out/*
	rm out-private/*
