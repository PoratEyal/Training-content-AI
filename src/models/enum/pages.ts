export enum ProductPages {
  PAGE_YouthHome = "youthHome",
  PAGE_YouthDetails = "youthDetails",
  PAGE_YouthBuild = "youthBuild",
  PAGE_YouthActivity = "youthActivity",
  PAGE_YouthStaticContent = "youthStaticActivity",
  PAGE_YouthMyActivities = "youthMyActivities",

  PAGE_PracticeHome = "practiceHome",
  PAGE_PracticeTopic = "practiceTopic",
  PAGE_PracticeQuiz = "practiceQuiz",

  PAGE_WordsHome = "wordsHome",
  PAGE_WordsTopic = "wordsTopic",
  PAGE_WordsVocab = "wordsVocab",
  PAGE_WordsQuiz = "wordsQuiz"
}

// Map of allowed transitions: from which pages each page can be entered
export const allowedTransitions: Record<ProductPages, ProductPages[]> = {
  [ProductPages.PAGE_YouthHome]:
    [
    ],
  [ProductPages.PAGE_YouthDetails]:
    [
      ProductPages.PAGE_YouthHome,
      ProductPages.PAGE_YouthBuild,
      ProductPages.PAGE_YouthActivity,
      ProductPages.PAGE_YouthStaticContent,
      ProductPages.PAGE_YouthMyActivities
    ],
  [ProductPages.PAGE_YouthBuild]:
    [
      ProductPages.PAGE_YouthDetails,
      ProductPages.PAGE_YouthActivity
    ],
  [ProductPages.PAGE_YouthActivity]:
    [
      ProductPages.PAGE_YouthBuild
    ],
  [ProductPages.PAGE_YouthStaticContent]:
    [
    ],
  [ProductPages.PAGE_YouthMyActivities]:
    [
      ProductPages.PAGE_YouthHome,
      ProductPages.PAGE_YouthDetails,
      ProductPages.PAGE_YouthBuild,
      ProductPages.PAGE_YouthActivity,
      ProductPages.PAGE_YouthStaticContent,
      ProductPages.PAGE_YouthMyActivities
    ],

  [ProductPages.PAGE_PracticeHome]:
    [
    ],
  [ProductPages.PAGE_PracticeTopic]:
    [
      ProductPages.PAGE_PracticeHome,
      ProductPages.PAGE_PracticeQuiz
    ],
  [ProductPages.PAGE_PracticeQuiz]:
    [
      ProductPages.PAGE_PracticeTopic
    ],


  [ProductPages.PAGE_WordsHome]:
    [
    ],
  [ProductPages.PAGE_WordsTopic]:
    [
      ProductPages.PAGE_WordsHome,
      ProductPages.PAGE_WordsVocab,
      ProductPages.PAGE_WordsQuiz
    ],
  [ProductPages.PAGE_WordsVocab]:
    [
      ProductPages.PAGE_WordsHome,
      ProductPages.PAGE_WordsTopic,
      ProductPages.PAGE_WordsQuiz
    ],
  [ProductPages.PAGE_WordsQuiz]:
    [
      ProductPages.PAGE_WordsHome,
      ProductPages.PAGE_WordsTopic,
      ProductPages.PAGE_WordsVocab
    ]

};