export enum ProductPages {
  PAGE_YouthHome = "youthHome",
  PAGE_Details = "youthDetails",
  PAGE_Build = "youthBuild",
  PAGE_Activity = "youthActivity",
  PAGE_StaticContent = "youthStaticActivity",
  PAGE_MyActivities = "youthMyActivities",

  PAGE_PracticeHome = "practiceHome",
  PAGE_Topic = "practiceTopic",
  PAGE_Quiz = "practiceQuiz",

  PAGE_WordsHome = "wordsHome",
  PAGE_WordsVocab = "wordsVocab",
  PAGE_WordsQuiz = "wordsQuiz"
}

// Map of allowed transitions: from which pages each page can be entered
export const allowedTransitions: Record<ProductPages, ProductPages[]> = {
  [ProductPages.PAGE_YouthHome]:
    [
    ],
  [ProductPages.PAGE_Details]:
    [
      ProductPages.PAGE_YouthHome,
      ProductPages.PAGE_Build,
      ProductPages.PAGE_Activity,
      ProductPages.PAGE_StaticContent,
      ProductPages.PAGE_MyActivities
    ],
  [ProductPages.PAGE_Build]:
    [
      ProductPages.PAGE_Details,
      ProductPages.PAGE_Activity
    ],
  [ProductPages.PAGE_Activity]:
    [
      ProductPages.PAGE_Build
    ],
  [ProductPages.PAGE_StaticContent]:
    [
    ],
  [ProductPages.PAGE_MyActivities]:
    [
      ProductPages.PAGE_YouthHome,
      ProductPages.PAGE_Details,
      ProductPages.PAGE_Build,
      ProductPages.PAGE_Activity,
      ProductPages.PAGE_StaticContent,
      ProductPages.PAGE_MyActivities
    ],

  [ProductPages.PAGE_PracticeHome]:
    [
    ],
  [ProductPages.PAGE_Topic]:
    [
      ProductPages.PAGE_PracticeHome,
      ProductPages.PAGE_Quiz
    ],
  [ProductPages.PAGE_Quiz]:
    [
      ProductPages.PAGE_Topic
    ],


  [ProductPages.PAGE_WordsHome]:
    [
    ],
  [ProductPages.PAGE_WordsVocab]:
    [
      ProductPages.PAGE_WordsHome,
      ProductPages.PAGE_WordsQuiz
    ],
  [ProductPages.PAGE_WordsQuiz]:
    [
      ProductPages.PAGE_WordsVocab
    ]

};