import {Router, Request, Response} from "express";
import {db} from "../db";
import {availableResolutionsFieldValidator, titleValidator} from "../validation/field-validator";
import {errorResponse} from "../validation/errorResponse";

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

        if (errorsArray.length > 0) {
            const errors_ = errorResponse(errorsArray)
            res.status(400).send(errors_)
            return
        }
        const video = {
            ...req.body,
            id: Date.now() + Math.random(),
        }
        db.videos = [...db.videos, video]
        res.status(201).json(video)

    },
    updateVideo(req: Request, res: Response) {

    }
}


videosRouter.get('/', videoController.getVideos);
videosRouter.post('/', videoController.createVideo);
videosRouter.put('/:id', videoController.updateVideo);

