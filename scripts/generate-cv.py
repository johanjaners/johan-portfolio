from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import BaseDocTemplate, Frame, PageTemplate, Paragraph, KeepTogether

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "johan-janers-cv.pdf"
PAGE_W, PAGE_H = A4
MARGIN = 12 * mm
SIDEBAR_W = 50 * mm
GAP = 8 * mm
ACCENT = colors.HexColor("#0EA5E9")
TEXT = colors.HexColor("#1F2937")
MUTED = colors.HexColor("#6B7280")
DARK_BG = colors.HexColor("#111827")
SIDE_TEXT = colors.HexColor("#D1D5DB")
FONT_REG = "Helvetica"
FONT_BOLD = "Helvetica-Bold"

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="Name", fontName=FONT_BOLD, fontSize=23, leading=25, textColor=TEXT, spaceAfter=2))
styles.add(ParagraphStyle(name="Role", fontName=FONT_BOLD, fontSize=9.6, leading=11.4, textColor=ACCENT, spaceAfter=5))
styles.add(ParagraphStyle(name="Contact", fontName=FONT_REG, fontSize=7.7, leading=9.3, textColor=MUTED, spaceAfter=7))
styles.add(ParagraphStyle(name="Summary", fontName=FONT_REG, fontSize=8.05, leading=10.0, textColor=TEXT, spaceAfter=5))
styles.add(ParagraphStyle(name="Section", fontName=FONT_BOLD, fontSize=10.0, leading=12.0, textColor=TEXT, spaceBefore=6, spaceAfter=5))
styles.add(ParagraphStyle(name="ItemTitle", fontName=FONT_BOLD, fontSize=8.4, leading=9.8, textColor=TEXT, spaceBefore=1.5, spaceAfter=0.8))
styles.add(ParagraphStyle(name="Meta", fontName=FONT_REG, fontSize=7.15, leading=8.3, textColor=ACCENT, spaceAfter=2.2))
styles.add(ParagraphStyle(name="Body", fontName=FONT_REG, fontSize=7.35, leading=8.9, textColor=TEXT, spaceAfter=4.2))


def esc(text):
    return text.replace("&", "&amp;")


def p(text, style):
    return Paragraph(esc(text), styles[style])


def section(title):
    return p(title.upper(), "Section")


def item(title, meta, body, url=None):
    if url:
        title = f"<a href='{url}' color='#1F2937'>{title}</a>"
    return KeepTogether([p(title, "ItemTitle"), p(meta, "Meta"), p(body, "Body")])


def draw_sidebar(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(DARK_BG)
    canvas.rect(0, 0, SIDEBAR_W + MARGIN, PAGE_H, fill=1, stroke=0)
    x = MARGIN
    y = PAGE_H - 15 * mm

    canvas.setFont(FONT_BOLD, 11)
    canvas.setFillColor(colors.white)
    canvas.drawString(x, y, "Technical skills")
    y -= 4 * mm
    canvas.setFillColor(ACCENT)
    canvas.rect(x, y, SIDEBAR_W - 10 * mm, 1.1, fill=1, stroke=0)
    y -= 2.5 * mm

    def head(text):
        nonlocal y
        y -= 4.7 * mm
        canvas.setFont(FONT_BOLD, 8.4)
        canvas.setFillColor(colors.white)
        canvas.drawString(x, y, text)
        y -= 3.2 * mm

    def line(text, url=None):
        nonlocal y
        canvas.setFont(FONT_REG, 6.9)
        canvas.setFillColor(SIDE_TEXT)
        canvas.drawString(x, y, text)
        if url:
            canvas.linkURL(url, (x, y - 1, x + (SIDEBAR_W - 10 * mm), y + 7), relative=0, thickness=0, color=ACCENT)
        y -= 3.15 * mm

    groups = [
        ("General", [".NET / C#", "Python", "JavaScript", "TypeScript"]),
        ("Backend", ["ASP.NET Core", "REST APIs", "Entity Framework Core", "SQL Server, PostgreSQL", "Kafka", "Clean Architecture", "Microservices", "JWT Authentication"]),
        ("Frontend", ["Angular", "React", "TanStack Query", "HTML, CSS, Tailwind"]),
        ("Cloud & DevOps", ["Azure", "Azure App Service", "Azure OpenAI", "Azure AI Vision", "Docker", "Bicep", "GitHub Actions", "AWS"]),
        ("Tools", ["Git + GitHub", "Azure DevOps", "VS Code", "xUnit", "TDD", "Agile"]),
        ("Social", ["LinkedIn", "GitHub", "Portfolio"]),
        ("Languages", ["Swedish - Native", "English - Fluent"]),
    ]
    for title, items in groups:
        head(title)
        for item_text in items:
            social_links = {
                "LinkedIn": "https://www.linkedin.com/in/johan-janers/",
                "GitHub": "https://github.com/johanjaners",
                "Portfolio": "https://johanjaners.dev",
                "johanjaners.dev": "https://johanjaners.dev",
                "github.com/johanjaners": "https://github.com/johanjaners",
                "linkedin.com/in/johan-janers": "https://www.linkedin.com/in/johan-janers/",
            }
            line(item_text, social_links.get(item_text))

    canvas.restoreState()


def main():
    main_x = MARGIN + SIDEBAR_W + GAP
    main_w = PAGE_W - main_x - MARGIN
    doc = BaseDocTemplate(str(OUT), pagesize=A4, leftMargin=main_x, rightMargin=MARGIN, topMargin=10*mm, bottomMargin=10*mm)
    main_frame = Frame(main_x, 10*mm, main_w, PAGE_H - 20*mm, leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0, id="main")
    doc.addPageTemplates([PageTemplate(id="one", frames=[main_frame], onPage=draw_sidebar)])

    story = [
        p("Johan Janérs", "Name"),
        p("Backend Developer | .NET / C# | Azure | Applied AI", "Role"),
        p("Stockholm, Sweden | <a href='mailto:johanjaners@gmail.com' color='#6B7280'>johanjaners@gmail.com</a> | +46 761 089 671", "Contact"),
        p("Backend developer with current production .NET experience at Sandvik and hands-on project experience integrating Azure OpenAI and Azure AI Vision. Focused on building reliable backend systems, APIs, and maintainable cloud applications using modern .NET technologies.", "Summary"),
        p("I have 6+ years of broader engineering experience from cross-functional technical environments, now focused on backend development, cloud platforms, and applied AI applications.", "Summary"),
        section("Work experience"),
        item("Backend Developer", "Sandvik (consultant via Infuse Talent) | Jul 2026 - Present", "Developing backend functionality for Toolhive, a cloud based production platform in a .NET, Angular, Azure, Docker, and Bicep environment."),
        item("Consultant .NET Developer", "School of Applied Technology (SALT) | Feb 2026 - Apr 2026", "Delivered backend and AI focused development sprints through SALT's Graduate Program, including microservices architecture, event driven services with Kafka, and AI integrated web applications."),
        item("Performance Data Engineer", "Polestar | 2025", "Developed Python tools for log data processing, KPI reporting, and structured data exports. Built modular processing flows with loaders, extractors, and exporters."),
        item("Test Engineer", "Polestar | 2022 - 2025", "Worked in cross functional technical environments involving software, hardware, validation, data analysis, planning, and documented test execution."),
        item("Design Engineer", "Polestar | 2019 - 2022", "Contributed to technical requirements, system integration, and prototype development in complex engineering projects."),
        section("Projects"),
        item("Note2QuizAI", "ASP.NET Core, React, Azure AI Vision, Azure OpenAI, AWS", "AI powered quiz generator for uploaded notes. Built backend flows for quiz generation, submission, and scoring. Integrated Azure AI Vision and Azure OpenAI, with AWS deployment configuration.", "https://github.com/johanjaners/Note2QuizAI"),
        item("Recipe Search API", "ASP.NET Core, Azure OpenAI, PostgreSQL, EF Core, Azure App Service", "Backend API with multilingual query interpretation using Azure OpenAI, PostgreSQL persistence through EF Core, and deterministic recipe ranking. Deployed to Azure App Service.", "https://github.com/johanjaners/recipe-search-api"),
        item("Event Driven Payment Service", ".NET, Kafka, EF Core, PostgreSQL", "Event driven payment and invoice service. Implemented payment lifecycle flows, asynchronous event handling, persistence, event contract alignment, and integration testing.", "https://github.com/johanjaners/event-driven-payment-service"),
        item("PulseCare", "ASP.NET Core, React, SQL Server, Docker, JWT", "Team built healthcare platform. Owned appointment related APIs, CRUD operations, JWT based authentication, and frontend integration.", "https://github.com/johanjaners/PulseCare-backend"),
        section("Education and training"),
        item("Full-Stack .NET / C#", "School of Applied Technology (SALT) | Oct 2025 - Jan 2026", "Intensive program in fullstack development with C#, .NET, React, TypeScript, TDD, mob programming, and applied learning."),
        item("M.Sc. Mechanical Engineering", "Luleå University of Technology | 2014 - 2019", "Master's degree focused on technical problem solving, simulation, and systems development."),
    ]
    doc.build(story)
    print(OUT)

if __name__ == "__main__":
    main()

