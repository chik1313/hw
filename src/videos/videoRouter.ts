import  {Router , Request , Response} from "express";
import {db} from "../db";

export const videosRouter = Router();

export const videoController = {
    getVideos(req: Request, res: Response) {
        const videos = db.videos
        res.status(200).json(videos)
    },
    createVideo(req: Request, res: Response) {

    },
    updateVideo(req: Request, res: Response) {

    }
}


videosRouter.get('/', videoController.getVideos);
videosRouter.post('/', videoController.createVideo);
videosRouter.put('/:id', videoController.updateVideo);
