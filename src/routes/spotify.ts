import express, { Router, Response } from 'express';

const spotify_router: Router = express.Router();

spotify_router
  .get('/search_track', (req: SaveTrackRequestType, res: Response) =>
    save_track(req, res)
  )