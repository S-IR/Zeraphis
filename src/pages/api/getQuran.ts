// import { readFileSync, writeFileSync } from "fs";
// import { NextApiRequest, NextApiResponse } from "next";
// import fetch from "node-fetch";
// import axios from "axios";
// import { transliterateArabic } from "~/utils/backend/arabic";
// import { number, z } from "zod";
// import { transliterate } from "transliteration";
// import {
//   QuranData,
//   QuranVerseData,
//   verseSchema,
// } from "~/constants/arabic/texts";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const enData = JSON.parse(
//     readFileSync("./quran-en-sahih.json", { encoding: "utf-8" })
//   );
//   const arData = JSON.parse(
//     readFileSync("./quran-alafsy.json", { encoding: "utf-8" })
//   );

//   const quranData: QuranData = [];
//   if (typeof enData !== "object" || enData === null)
//     throw new Error("erData is not actually object or is null");
//   for (let i = 0; i < 114; i++) {
//     const arChapterData = arData.data.surahs[i];
//     const enChapterData = enData.data.surahs[i];
//     const chNumber = arChapterData.number;
//     const arChapterName = arChapterData.name;
//     const enChapterName = arChapterData.englishName;
//     const verses: QuranVerseData[] = arChapterData.ayahs.map(
//       (aya: any, ayaIterator: number) => {
//         const verseObj = {
//           chNumber,
//           verseChNumber: aya.numberInSurah,
//           verseQuranNumber: aya.number,
//           arText: aya.text,
//           enText: enChapterData.ayahs[ayaIterator].text,
//           transliteration: transliterate(aya.text as string),
//           audioURL: [aya.audio, ...aya.audioSecondary].filter(
//             (v) => v !== undefined
//           ),
//         };
//         verseSchema.parse(verseObj);
//         return verseObj;
//       }
//     );
//     quranData.push({ arChapterName, enChapterName, verses });
//   }
//   writeFileSync("./quranData.json", JSON.stringify(quranData), "utf8");
//   console.log("quranData", quranData);

//   res.status(200).json(quranData);
// }
