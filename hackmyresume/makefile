all:
	hackmyresume BUILD resume.JSON TO out/resume.html -t jsonresume-theme-stackoverflow
	find . -name "resume.html" -exec sed -i '' 's/Publications/Projects/g' {} +
	wkhtmltopdf out/resume.html out/resume.pdf
