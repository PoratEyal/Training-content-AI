import * as functions from "firebase-functions";
import { db } from "../index";
import { Request, Response } from "express";
import cors from "cors";

const corsHandler = cors({ origin: true });

export const getStaticSubjectsHttp = functions.https.onRequest((req: Request, res: Response) => {
  corsHandler(req, res, async () => {
    try {
      const snapshot = await db.collection("staticSubjects").get();

      const subjectsWithActivities = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const docData = doc.data() || {};
          console.log('Subject Document Data:', docData);

          // Resolve the references in the `activities` field
          const activityReferences = docData.activities || [];
          const activities = await Promise.all(
            activityReferences.map(async (activityRef: string) => {
              // Fetch the referenced document
              const activitySnapshot = await db.doc(activityRef).get();

              // Get the data from the activity document
              const activityData = activitySnapshot.data();
              console.log('Activity Document Data:', activityData);

              return {
                name: activityData?.name || '',
                metaTitle: activityData?.metaTitle || '',
                metaDescription: activityData?.metaDescription || '',
                content: activityData?.content || '',
                displayCount: activityData?.displayCount || 0,
                orderId: activityData?.orderId || 0,
              };
            })
          );

          const subjectData = {
            name: docData.name || '',
            metaTitle: docData.metaTitle || '',
            icon: docData.icon || '',
            metaDescription: docData.metaDescription || '',
            orderId: docData?.orderId || 0,
            activities,
          };

          return subjectData;
        })
      );

      console.log('Successfully fetched subjects and activities');
      res.status(200).json({ result: 'success', data: subjectsWithActivities });
    } catch (error) {
      console.error('Error fetching static subjects:', error);
      res.status(500).json({ error: 'Failed to fetch static subjects.' });
    }
  });
});

