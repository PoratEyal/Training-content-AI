import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { db } from '../index';

import { Request, Response } from 'express';
import cors from 'cors';

const corsHandler = cors({ origin: true });

export const incrementActivityDisplayCount = functions.https.onRequest((req: Request, res: Response) => {
  corsHandler(req, res, async () => {
    try {
      // For POST requests, get data from req.body
      const { name } = req.body;

      if (!name) {
        res.status(400).json({
          error: 'The function must be called with a name.',
        });
        return;
      }

      // Query the staticActivities collection for the document with the given name
      const activityQuerySnapshot = await db
        .collection('staticActivities')
        .where('name', '==', name)
        .limit(1)
        .get();

      if (activityQuerySnapshot.empty) {
        res.status(404).json({
          error: 'Activity not found with the provided name.',
        });
        return;
      }

      // Assuming name is unique, get the first matching document
      const activityDoc = activityQuerySnapshot.docs[0];
      const activityRef = activityDoc.ref;

      // Increment the displayCount
      await activityRef.update({
        displayCount: admin.firestore.FieldValue.increment(1),
      });

      // Fetch the updated activity data
      const activitySnapshot = await activityRef.get();
      const activityData = activitySnapshot.data();

      if (!activityData) {
        res.status(404).json({
          error: 'Activity not found after updating displayCount.',
        });
        return;
      }

      const updatedActivity = {
        id: activitySnapshot.id,
        name: activityData.name || '',
        metaTitle: activityData.metaTitle || '',
        metaDescription: activityData.metaDescription || '',
        content: activityData.content || '',
        displayCount: activityData.displayCount || 0,
        orderId: activityData.orderId || 0,
      };

      res.status(200).json({
        result: 'success',
        activity: updatedActivity,
      });
    } catch (error) {
      console.error('Error incrementing display count:', error);
      res.status(500).json({
        error: 'Failed to increment display count.',
      });
    }
  });
});
