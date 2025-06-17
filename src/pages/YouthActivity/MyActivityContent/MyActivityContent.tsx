//
// This is the My Saved Activity page
// It displays a previously saved activity by subject
// If the activity is not found or loading, it shows loading states or fallback text
//
import styles from "./MyActivityContent.module.css"
import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import "../../../components/ActivityOutput/Markdown.css";
import PageLayout from "../../../components/Layout/PageLayout/PageLayout"
import route from "../../../router/route.json"
import { MY_ACTIVITIES_AD_SLOT } from "../../../models/constants/adsSlot"
import PageLoading from "../../../components/Loading/PageLoading/PageLoading"
import SmallLoading from "../../../components/Loading/SmallLoading/SmallLoading"
import { useAuthContext } from "../../../context/AuthContext"
import { Activity } from "../../../models/types/activity"
import { useSaveContext } from "../../../context/SavedContext"
import { compareNormalizedStrings } from "../../../utils/format"
import ActivityArticle from "../../../components/ActivityArticle/ActivityArticle"
import RichTextEditor from "../../../components/RichTextEditor/RichTextEditor"
import { useEditorContext } from "../../../context/EditorContext"
import { useContentContext } from "../../../context/ContentContext"
import { useLanguage } from "../../../i18n/useLanguage"
import { ProductType } from "../../../context/ProductType"

const SavedActivity: React.FC = () => {
  const { subject } = useParams<{ subject: string }>()
  const { updateMainActivity, mainActivity } = useContentContext()
  const { lang } = useLanguage()
  const navigate = useNavigate()
  const { currentUser } = useAuthContext()
  const { isEdit, readOnlyMode } = useEditorContext()
  const { savedActivity, isLoading } = useSaveContext()
  const [foundActivity, setFoundActivity] = useState<Activity | null>(null)

  // Determine language-specific routes
  const youthMyActivitiesPath = route[`youthMyActivities${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.youthMyActivitiesEn;

  const goBack = () => {
    if (isEdit) {
      readOnlyMode()
    } else {
      navigate(youthMyActivitiesPath)
    }
  }

  useEffect(() => {
    if (savedActivity?.length > 0 && currentUser) {
      const founded = savedActivity.find((act) =>
        compareNormalizedStrings(act.subject, subject)
      )
      if (founded) {
        setFoundActivity(founded)
        updateMainActivity(founded)
      }
    }
  }, [savedActivity, currentUser, subject, updateMainActivity])

  return (
    <PageLayout
      id="savedActivity"
      productType={ProductType.Youth}
      hasGreenBackground
      hasHeader={{ goBack, hasTitle: foundActivity?.subject || undefined }}
      hasAds={MY_ACTIVITIES_AD_SLOT}
      title={foundActivity?.subject}
      hasNavBar
      index={false}
    >
      {isLoading && !foundActivity ? (
        <section className={styles.activity_data_container_loading}>
          <PageLoading />
        </section>
      ) : foundActivity && foundActivity.activity ? (
        isEdit ? (
          <RichTextEditor activity={mainActivity} />
        ) : (
          <ActivityArticle activity={mainActivity} hasEdit hasCopy hasShare />
        )
      ) : (
        <section className={styles.activity_data_container}>
          <SmallLoading />
        </section>
      )}
    </PageLayout>
  )
}

export default SavedActivity
