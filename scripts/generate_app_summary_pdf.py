from pathlib import Path

import fitz
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.platypus import Frame, FrameBreak, ListFlowable, ListItem, PageTemplate, Paragraph, SimpleDocTemplate, Spacer


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "output" / "pdf"
TMP_DIR = ROOT / "tmp" / "pdfs"
PDF_PATH = OUTPUT_DIR / "conc-app-summary.pdf"
PNG_PATH = TMP_DIR / "conc-app-summary-page-1.png"


def build_pdf() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    TMP_DIR.mkdir(parents=True, exist_ok=True)

    page_width, page_height = A4
    left = 16 * mm
    right = 16 * mm
    top = 14 * mm
    bottom = 13 * mm
    gutter = 8 * mm
    content_width = page_width - left - right
    column_width = (content_width - gutter) / 2

    base_styles = getSampleStyleSheet()
    styles = {}
    styles["title"] = ParagraphStyle(
        "title",
        parent=base_styles["Title"],
        fontName="Helvetica-Bold",
        fontSize=20,
        leading=23,
        textColor=colors.HexColor("#9f2d20"),
        alignment=TA_LEFT,
        spaceAfter=5,
    )
    styles["section"] = ParagraphStyle(
        "section",
        parent=base_styles["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=10.5,
        leading=12,
        textColor=colors.HexColor("#9f2d20"),
        spaceBefore=4,
        spaceAfter=4,
    )
    styles["body"] = ParagraphStyle(
        "body",
        parent=base_styles["BodyText"],
        fontName="Helvetica",
        fontSize=8.5,
        leading=10.6,
        textColor=colors.HexColor("#1f2933"),
        spaceAfter=3,
    )
    styles["small"] = ParagraphStyle(
        "small",
        parent=base_styles["BodyText"],
        fontName="Helvetica",
        fontSize=7.8,
        leading=9.4,
        textColor=colors.HexColor("#334155"),
        spaceAfter=2,
    )
    styles["bullet"] = ParagraphStyle(
        "bullet",
        parent=base_styles["BodyText"],
        fontName="Helvetica",
        fontSize=8.2,
        leading=9.8,
        textColor=colors.HexColor("#1f2933"),
        spaceAfter=0,
    )

    story = [
        Paragraph("CONC Website App Summary", styles["title"]),
        Paragraph(
            "Evidence-based summary generated from this repo on March 26, 2026. "
            "Architecture notes below are limited to what the codebase and README explicitly support.",
            styles["small"],
        ),
        Spacer(1, 4),
        Paragraph("What It Is", styles["section"]),
        Paragraph(
            "Static Astro frontend for the CONC website. It consumes a Strapi API for page and listing content, "
            "and falls back to bundled content when API requests fail.",
            styles["body"],
        ),
        Paragraph("Who It's For", styles["section"]),
        Paragraph(
            "Primary persona: prospective learners and organizations looking for CONC programs, consulting services, "
            "news updates, and contact or registration entry points.",
            styles["body"],
        ),
        Paragraph("What It Does", styles["section"]),
        ListFlowable(
            [
                ListItem(Paragraph(item, styles["bullet"]), bulletColor=colors.HexColor("#9f2d20"))
                for item in [
                    "Publishes home, about, contact, services, programs, projects, news, and event-related routes.",
                    "Builds slug-based detail pages for services, programs, projects, and news.",
                    "Supports dedicated program registration pages under `/programs/register/[slug]`.",
                    "Loads global site settings plus structured CMS sections such as hero, stats, FAQ, gallery, and CTA blocks.",
                    "Resolves Strapi media paths into absolute frontend URLs.",
                    "Uses local fallback content when the CMS is unavailable.",
                    "Ships smoke tests for required Strapi endpoints and closed-registration handling.",
                ]
            ],
            bulletType="bullet",
            leftPadding=10,
            bulletFontName="Helvetica-Bold",
            bulletFontSize=8,
        ),
        FrameBreak(),
        Paragraph("How It Works", styles["section"]),
        Paragraph(
            "<b>Frontend:</b> Astro is configured for static output with Tailwind and `astro-icon`; "
            "pages under `src/pages/` render through shared layouts and components.",
            styles["body"],
        ),
        Paragraph(
            "<b>Data layer:</b> `src/lib/api.ts` reads `PUBLIC_STRAPI_URL`, fetches Strapi JSON for pages, "
            "site settings, services, projects, programs, and news, normalizes media URLs, and sorts collections.",
            styles["body"],
        ),
        Paragraph(
            "<b>Fallback path:</b> Non-OK or failed fetches return bundled data from `src/lib/fallback-content.ts`.",
            styles["body"],
        ),
        Paragraph(
            "<b>Flow:</b> Astro pages call the API helpers during page generation, render listing/detail routes, "
            "and expose program registration entry points; `scripts/smoke-endpoints.mjs` validates the dependent API surface.",
            styles["body"],
        ),
        Paragraph(
            "<b>External services:</b> Strapi backend is required. Main backend database and storage details are "
            "Not found in repo.",
            styles["body"],
        ),
        Paragraph("How To Run", styles["section"]),
        ListFlowable(
            [
                ListItem(Paragraph(item, styles["bullet"]), bulletColor=colors.HexColor("#9f2d20"))
                for item in [
                    "If dependencies are missing, run `npm install` in this repo.",
                    "Start the sibling backend at `/home/saton/mynew-project-strapi` with `npm run develop`.",
                    "Use `PUBLIC_STRAPI_URL=http://127.0.0.1:1337/api` (the local `.env` already points there per README).",
                    "Run `npm run dev` here, then open `localhost:4321`.",
                    "Optional checks: `npm run smoke:endpoints` or `npm run smoke:local`.",
                ]
            ],
            bulletType="bullet",
            leftPadding=10,
            bulletFontName="Helvetica-Bold",
            bulletFontSize=8,
        ),
    ]

    doc = SimpleDocTemplate(
        str(PDF_PATH),
        pagesize=A4,
        leftMargin=left,
        rightMargin=right,
        topMargin=top,
        bottomMargin=bottom,
    )

    left_frame = Frame(left, bottom + 5 * mm, column_width, page_height - top - bottom - 36, showBoundary=0)
    right_frame = Frame(left + column_width + gutter, bottom + 5 * mm, column_width, page_height - top - bottom - 36, showBoundary=0)

    def draw_page(canvas, _doc):
        canvas.saveState()
        canvas.setStrokeColor(colors.HexColor("#d6d3d1"))
        canvas.setLineWidth(0.7)
        x = left + column_width + gutter / 2
        canvas.line(x, bottom + 5 * mm, x, page_height - top - 22)
        canvas.setFillColor(colors.HexColor("#64748b"))
        canvas.setFont("Helvetica", 7)
        footer = "Sources: README.md, package.json, astro.config.mjs, src/lib/api.ts, src/pages/, scripts/smoke-endpoints.mjs"
        while stringWidth(footer, "Helvetica", 7) > content_width and ", " in footer:
            footer = footer.rsplit(", ", 1)[0]
        canvas.drawString(left, 8 * mm, footer)
        canvas.restoreState()

    doc.addPageTemplates([PageTemplate(id="two-col", frames=[left_frame, right_frame], onPage=draw_page)])
    doc.build(story)


def render_preview() -> None:
    pdf = fitz.open(PDF_PATH)
    page = pdf.load_page(0)
    pixmap = page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)
    pixmap.save(PNG_PATH)
    pdf.close()


if __name__ == "__main__":
    build_pdf()
    render_preview()
    print(PDF_PATH)
    print(PNG_PATH)
