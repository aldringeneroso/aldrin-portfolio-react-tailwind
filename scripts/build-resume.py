"""Build the one-page resume using portfolio content and the Jake's Resume layout.

Layout reference: https://github.com/jakegut/resume (MIT).
Requires Python, ReportLab, and Node.js.
"""

import json
import subprocess
from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    HRFlowable,
    KeepTogether,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / 'public/assets/aldrin-generoso-resume.pdf'
payload = subprocess.run(
    ['node', '--input-type=module', '-e',
     "import {profile, projects, timeline, skills} from './src/content.js';"
     'console.log(JSON.stringify({profile, projects, timeline, skills}));'],
    cwd=ROOT, capture_output=True, text=True, encoding='utf-8', check=True,
)
data = json.loads(payload.stdout)
profile, projects = data['profile'], data['projects']


def clean(text):
    return escape(str(text).replace('—', '-').replace('–', '-'))


styles = getSampleStyleSheet()
styles.add(ParagraphStyle('Name', fontName='Times-Bold', fontSize=27, leading=30,
                          alignment=TA_CENTER, textColor=colors.HexColor('#111111')))
styles.add(ParagraphStyle('Role', fontName='Helvetica', fontSize=10.4, leading=15,
                          alignment=TA_CENTER))
styles.add(ParagraphStyle('Contacts', fontName='Helvetica', fontSize=8.8, leading=13,
                          alignment=TA_CENTER))
styles.add(ParagraphStyle('SectionLabel', fontName='Helvetica-Bold', fontSize=10.4,
                          leading=14, spaceBefore=11, spaceAfter=3))
styles.add(ParagraphStyle('ResumeBody', fontName='Helvetica', fontSize=9.6, leading=13))
styles.add(ParagraphStyle('ResumeTitle', fontName='Helvetica-Bold', fontSize=10.2, leading=14))
styles.add(ParagraphStyle('ResumeSmall', fontName='Helvetica', fontSize=8.5, leading=12,
                          textColor=colors.HexColor('#444444')))
styles.add(ParagraphStyle('ResumeDate', parent=styles['ResumeSmall'], alignment=TA_RIGHT))
styles.add(ParagraphStyle('ResumeBullet', parent=styles['ResumeBody'], leftIndent=11,
                          firstLineIndent=-8, spaceBefore=2))

story = []


def paragraph(text, style='ResumeBody'):
    return Paragraph(text, styles[style])


def section(title):
    story.append(paragraph(title.upper(), 'SectionLabel'))
    story.append(HRFlowable(width='100%', thickness=0.55, color=colors.black,
                            spaceAfter=6))


def dated_row(title, dates):
    width = A4[0] - 30 * mm - 12
    row = Table([[paragraph(clean(title), 'ResumeTitle'),
                  paragraph(clean(dates), 'ResumeDate')]],
                colWidths=[width * 0.7, width * 0.3], hAlign='LEFT')
    row.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('ALIGN', (1, 0), (1, 0), 'RIGHT'),
        ('LEFTPADDING', (0, 0), (-1, -1), 0),
        ('RIGHTPADDING', (0, 0), (-1, -1), 0),
        ('TOPPADDING', (0, 0), (-1, -1), 0),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
    ]))
    return row


story.append(paragraph(clean(profile['name']), 'Name'))
story.append(paragraph('Software Engineer | Computer Science Student', 'Role'))
story.append(paragraph(
    f'<link href="mailto:{profile["email"]}">{clean(profile["email"])}</link>'
    ' | +639941383113 | Bacoor, Cavite, Philippines', 'Contacts'))
story.append(paragraph(
    f'<link href="{profile["linkedin"]}">LinkedIn</link> | '
    f'<link href="{profile["github"]}">github.com/aldringeneroso</link>', 'Contacts'))

section('Professional Summary')
story.append(paragraph(
    'Computer Science student at Cavite State University - Bacoor City Campus, '
    'developing web applications and games. Experience includes an MIS internship '
    'at B Hotel and academic projects in software engineering, game development, '
    'and floor-plan analysis.'))

section('Featured Projects')
bullets = {
    '01': [
        'Visual novel and action-RPG hybrid built with Godot 4, with modular systems '
        'for health, economy, affection tracking, and day progression.',
        'JSON-based multi-slot save/load, signal-driven communication, and branching '
        'narrative events using Dialogic 2 and custom game-state management.',
    ],
    '02': [
        'Floor-plan analysis and electrical planning application for VED Electrical '
        'Services, with upload and review of detected rooms, walls, and electrical symbols.',
        'Synchronized 2D/3D layouts, electrical routing, and material-based cost '
        'estimates; project technologies include React, FastAPI, MySQL, OpenCV, and Three.js.',
    ],
}
for project in projects:
    block = [paragraph(clean(project['title']), 'ResumeTitle')]
    block.append(paragraph(clean(' | '.join(project['tools'])), 'ResumeSmall'))
    for bullet in bullets[project['id']]:
        block.append(paragraph(f'- {clean(bullet)}', 'ResumeBullet'))
    block.append(paragraph(
        f'<link href="{project["source"]}"><u>{clean(project["source"].replace("https://", ""))}</u></link>',
        'ResumeSmall'))
    block.append(Spacer(1, 8))
    story.append(KeepTogether(block))

section('Experience')
story.append(paragraph('MIS Intern | B Hotel', 'ResumeTitle'))

section('Education')
for item in data['timeline']:
    if item['dates'].startswith('CERTIFICATION'):
        continue
    story.append(KeepTogether([
        dated_row(item['title'], item['dates']),
        paragraph(clean(item['detail']), 'ResumeBody'),
        Spacer(1, 6),
    ]))

section('Technical Skills')
for group in data['skills']:
    story.append(paragraph(f'<b>{clean(group["title"])}:</b> {clean(", ".join(group["items"]))}'))

section('Certification')
for item in data['timeline']:
    if item['dates'].startswith('CERTIFICATION'):
        story.append(paragraph(
            f'<b>{clean(item["title"])}</b> | {clean(item["detail"])} | Jun 2026'))

document = SimpleDocTemplate(
    str(OUTPUT), pagesize=A4, rightMargin=15 * mm, leftMargin=15 * mm,
    topMargin=13 * mm, bottomMargin=13 * mm,
    title='Aldrin E. Generoso - Software Engineer Resume', author=profile['name'],
)
document.build(story)
print(f'Updated resume: {OUTPUT}')
