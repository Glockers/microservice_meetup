import * as fontkit from '@pdf-lib/fontkit';
import { Injectable } from '@nestjs/common';
import { PDFDocument, rgb } from 'pdf-lib';
import { MeetupService } from '../meetup/meetup.service';
import { serializeUint8Array } from '@app/common';
import { unparse } from 'papaparse';
import { RU_URL_FONT } from '../constants/ru-font';

@Injectable()
export class ReportService {
  constructor(private meetupService: MeetupService) {}

  async getPdfMeetups() {
    const pdfDoc = await PDFDocument.create();
    const customFont = await this.loadFonts(pdfDoc);
    const page = pdfDoc.addPage();
    const { width } = page.getSize();
    const textTitle = 'Митапы';
    const textTitleFontSize = 30;
    const textTitleWidth = customFont.widthOfTextAtSize(
      textTitle,
      textTitleFontSize
    );

    let height = page.getHeight();
    height = height - 50;

    page.drawText(textTitle, {
      x: (width - textTitleWidth) / 2,
      y: height,
      size: 30,
      font: customFont,
      color: rgb(0, 0.53, 0.71)
    });

    const meetups = await this.meetupService.getMeetups();
    height -= 30;
    meetups.forEach((meetup, index) => {
      page.drawText(`${index + 1}.${meetup.title}`, {
        x: 50,
        y: height,
        size: 10,
        font: customFont,
        color: rgb(0, 0.53, 0.71)
      });
      height -= 15;
    });
    const pdfBytes = await pdfDoc.save();

    return serializeUint8Array(pdfBytes);
  }

  async getCsvMeetups() {
    const meetups = await this.meetupService.getMeetups();
    return unparse({
      fields: ['Список митапов'],
      data: meetups.map((meetup) => [meetup.title])
    });
  }

  async loadFonts(pdfDoc: PDFDocument) {
    const fontsBytes = await fetch(RU_URL_FONT).then((res) =>
      res.arrayBuffer()
    );
    pdfDoc.registerFontkit(fontkit);
    await pdfDoc.embedFont(fontsBytes);
    return await pdfDoc.embedFont(fontsBytes);
  }
}
