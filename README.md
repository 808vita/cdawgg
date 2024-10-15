# CDAWGG:

## Customer Data Anlytics Weighted By Geospatial & Using GenAI

![v2 cover image cdawgg](https://github.com/user-attachments/assets/4757bff0-5e53-4aab-9f45-5865e77dfe6d)

[`CDAWGG Demo Video`](https://drive.google.com/file/d/1scRXFMOxK1mjKi938ZdaijKhMRynr_5P/view?usp=sharing)

### Deployed link : [`Live Site`](https://cdawgg.oofdev.com/)


- Note For Judges: Gemini API free tier is used - limits of RPM can be reached at times.

## Getting Started

Please run `npm install` to install all project required dependencies.

Make sure to creare a ".env.local" file in root level . (same level as .env.example). Follow the format mentioned in the .env.example file.

## Phase 2 Setup Instructions:

Phase 2 requires Vertex AI for Google Search grounding (preview feature). To run locally:

1. **Create/Select Project:** Create a new Google Cloud project or select an existing one.
2. **Enable APIs:** Enable the necessary Vertex AI APIs.
3. **Service Account:** Create a service account.
4. **Credentials:** Generate a JSON key file for the service account.
5. **Environment Variables:** Make use of the json file and fill environment variables (refer env.example)

**Note for Judges:** Google Search grounding is a preview feature with API call limits. Avoid triggering multiple searches simultaneously.

After installation & env setup - run the development server:

```bash

npm run dev
npm run build
npm run start
npm run docs

```

- use `npm run dev` to start the local server.
- use `npm run build` to start the production build files.
- use `npm run start` to start the local server using production build files (run npm build first!).
- use `npm run docs` to reupdate the typedoc generated docs.
