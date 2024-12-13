import {Router, Request, Response} from "express";
import {db} from "../db";
import {availableResolutionsFieldValidator, titleValidator} from "../validation/field-validator";

export const videosRouter = Router();

export const videoController = {
    getVideos(req: Request, res: Response) {
        const videos = db.videos
        res.status(200).json(videos)
    },
    createVideo(req: Request, res: Response) {
        const title = req.body.title
        const availableResolution = req.body.availableResolution

        const errorsArray: Array<{ field: string, message: string }> = []
        titleValidator(title, errorsArray)
        availableResolutionsFieldValidator(availableResolution, errorsArray)

    },
    updateVideo(req: Request, res: Response) {

    }
}


videosRouter.get('/', videoController.getVideos);
videosRouter.post('/', videoController.createVideo);
videosRouter.put('/:id', videoController.updateVideo);

