import { string, z } from "zod";
import { drawingSlideSchema, quizQuestionSchema, textQuestionSchema, wsSlide } from "~/server/api/routers/arabic/arabicTexts";
import { transliterate } from "transliteration";
import { arabicLetters, symbolObjects } from "~/constants/arabic/writing-system";
import { TRPCError } from "@trpc/server";
import { generateSimilarStrings } from "./text-processing";
import { generateWSQuizOptions } from "./arabic";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3API } from "aws-config";


type DrawingSlide = z.infer<typeof drawingSlideSchema>
export const getDrawingSlides  = (slidesCount : number , symbol : typeof arabicLetters[number], previousSymbols : string[]) : DrawingSlide[]=> {
  if(slidesCount === 0) throw new Error ('slidesCount cannot be 0')

  const basicDrawing  =     {
    type: `drawing` as 'drawing',
    symbol: symbol.symbol,
    audioURL:  symbol.audioURL,
    transliteration: symbol.transliteration,
  }
  let drawingSlides: DrawingSlide[] =[
    basicDrawing
  ] 

  previousSymbols.forEach((symbol)=> {
    if(Math.random() >= 0.05 || drawingSlides.length >= slidesCount) return 
    const randomCharacters: string[] = [symbol]
    while(Math.random() <= 0.7){
      const randomIndex = Math.floor(Math.random() * previousSymbols.length);
      const randLetter = previousSymbols[randomIndex];
      if(randLetter === undefined) break
      randomCharacters.push(randLetter)
    }

    const word = generateRandomArabicWord(randomCharacters)

    drawingSlides.push( {
      type: `drawing` as 'drawing',
      symbol: word,
      audioURL:  undefined,
      transliteration: transliterate(word),
    })


  })

  if(drawingSlides.length > slidesCount){
    drawingSlides =   drawingSlides.slice(0, slidesCount - 1)
   } 
   if(drawingSlides.length < slidesCount){
     while(drawingSlides.length < slidesCount) drawingSlides.push(basicDrawing)
   }
return drawingSlides
}

type QuizQuestion = z.infer<typeof quizQuestionSchema>
type TextQuestion = z.infer<typeof textQuestionSchema>

export const getQuizSlides = (symbol  :  typeof arabicLetters[number]): (QuizQuestion |
  TextQuestion)[]=> {
  let symbolWords = symbolObjects[symbol.symbol as string]
  if(!symbolWords) throw new  TRPCError({code : 'INTERNAL_SERVER_ERROR' , message : `Cannot find the symbol obj for this symbol, ${symbol.symbol}`})
  symbolWords = shuffleArray(symbolWords)
    const questions : (QuizQuestion |TextQuestion)[] = symbolWords.map((wordObj)=> {
      if(Math.random() < 0.5){
        const similarWords = generateSimilarStrings(wordObj.ar, 3);
        const options = generateWSQuizOptions(wordObj.ar, similarWords);

        const question: QuizQuestion = {
          symbol : wordObj.ar,
          type : 'quiz-question',
          translation : wordObj.transliteration, 
          audioURL:  wordObj.audioURL         ,
          ...options
        }
        return question
      } else {
        const rightAnswerIndex =  wordObj.ar.indexOf(symbol.symbol)
        if(rightAnswerIndex === -1) return null
        const question : TextQuestion = {
          rightAnswerIndex,
          text : wordObj.ar,
          symbol: symbol.symbol,
          type: "text-question",
          audioURL:  wordObj.audioURL         ,
          translation: wordObj.ar
        }
        return question
      }
    }).filter((el): el is QuizQuestion | TextQuestion => el !== null);
  return questions
}
function generateRandomArabicWord(characters: string[]): string {
  const shuffledCharacters = shuffleArray(characters);
  const word = shuffledCharacters.join('');
  return word;
}

function shuffleArray(array: any[]): any[] {
  const length = array.length;
  for (let i = length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}



export const addURLToSlide= async(obj :wsSlide): Promise<wsSlide>=>{
  const Bucket = "zeraphis-arabic-audio";
  const Key = `learn-writing-system/${obj.symbol}.mp3`;



  const presignCommand = new GetObjectCommand({ Bucket, Key });
  const audioURL = await getSignedUrl(s3API, presignCommand, {
    expiresIn: 3600,
  });

  return {...obj, audioURL}

}