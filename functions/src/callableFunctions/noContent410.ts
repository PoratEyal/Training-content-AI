import * as functions from "firebase-functions";
import { Request, Response } from "express";

const noContent410 = functions
  .region("us-central1")
  .https.onRequest((req: Request, res: Response) => {
    res.status(410).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Content Removed</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            text-align: center;
            margin-top: 100px;
          }
          h1 {
            font-size: 24px;
            color: #444;
          }
          a {
            font-size: 20px;
            color: #007bff;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <h1>This content has been permanently removed.</h1>
        <p>The correct link is <a href="https://activitywiz.com">activitywiz.com</a></p>
      </body>
      </html>
    `);
  });

export default noContent410;
