import {Router, Request, Response} from "express";
import {db} from "../db";
import {
    ageRestructionValidator,
    authorValidator,
    availableResolutionsFieldValidator,
    canBeDownloadedValidator, publicationDateValidator,
    titleValidator
} from "../validation/field-validator";
import {errorResponse} from "../validation/errorResponse";
import {APIErrorResultType, errorType, videoInputType, videoViewModule} from "../types/types";

export const videosRouter = Router();

export const videoController = {

    getVideos(req: Request, res: Response) {
        const videos = db.videos
        res.status(200).json(videos)
    },

    getVideoById(req: Request<{ id: string }, {}, {}>,
                 res: Response<videoViewModule>) {
        const id = +req.params.id;
        const findVideo = db.videos.find((video) => video.id === id);
        if (!findVideo) {
            res.sendStatus(404)
            return
        }
        res.status(200).json(findVideo)
    },


    createVideo(req: Request<{}, {}, videoInputType>,
                res: Response<videoViewModule | APIErrorResultType>) {
        const title = req.body.title
        const availableResolution = req.body.availableResolutions
        const author = req.body.author
        const canBeDownloaded = req.body.canBeDownloaded

        const errorsArray: Array<{ field: string, message: string }> = []

        titleValidator(title, errorsArray)
        availableResolutionsFieldValidator(availableResolution, errorsArray)
        authorValidator(author, errorsArray)

        if (errorsArray.length > 0) {
            const errors_ = errorResponse(errorsArray)
            res.status(400).send(errors_)
            return
        }

        let body = req.body;

        const createdAt = new Date();
        const publicationDate = new Date(createdAt);
        publicationDate.setDate(createdAt.getDate() + 1);

        let id: number = (Date.now() + Math.random()) as number;

        let newVideo = {
            id: parseInt(String(id)),
            title: body.title,
            author: body.author,
            canBeDownloaded: body?.canBeDownloaded ?? false,
            availableResolutions: body.availableResolutions ?? null,
            minAgeRestriction: body.minAgeRestriction ?? null,
            createdAt: createdAt.toISOString(),
            publicationDate: publicationDate.toISOString()
        }

        db.videos = [...db.videos, newVideo]

        res.status(201).json(newVideo)

    },


    updateVideo(req: Request<{ id: string }, {}, videoInputType>,
                res: Response<APIErrorResultType>) {
        let body = req.body;

        let title = body.title;
        let author = body.author;
        let availableResolutions = body?.availableResolutions;
        let canBeDownloaded = body?.canBeDownloaded
        let minAgeRestriction = body.minAgeRestriction || undefined;
        let publicationDate = body.publicationDate;

        let errorsArray: errorType[] = []  //res.locals.errors //????
        let videoId = +req.params.id;

        titleValidator(title, errorsArray)
        authorValidator(author, errorsArray)
        canBeDownloadedValidator(canBeDownloaded, errorsArray)
        availableResolutionsFieldValidator(availableResolutions, errorsArray)
        ageRestructionValidator(minAgeRestriction, errorsArray)
        publicationDateValidator(publicationDate , errorsArray)

        if (errorsArray.length) {
            res.status(400).json({errorsMessages: errorsArray})
            return
        }

        let updatedVideo = db.videos.find((video) => video.id === videoId);

        if (updatedVideo) {
            updatedVideo.title = title
            updatedVideo.author = author
            updatedVideo.canBeDownloaded = canBeDownloaded || true
            updatedVideo.availableResolutions = availableResolutions
            updatedVideo.minAgeRestriction = minAgeRestriction || null
            updatedVideo.publicationDate = publicationDate
        }
        if (!updatedVideo) {
            res.sendStatus(404)
            return
        }
        res.sendStatus(204)
    },
    deleteVideo(req: Request<{ id: string }, any, any>,
                res: Response) {
        const id = +req.params.id;
        ssss
        let findVideo = db.videos.find(video => video.id === id);
        if (!findVideo) {
            res.sendStatus(404)
            return
        }
        db.videos = db.videos.filter(video => video.id !== id);
        res.sendStatus(204)
        return
    }
}


videosRouter.get('/', videoController.getVideos);
videosRouter.get('/:id', videoController.getVideoById)
videosRouter.post('/', videoController.createVideo);
videosRouter.put('/:id', videoController.updateVideo);
videosRouter.delete('/:id', videoController.deleteVideo);


