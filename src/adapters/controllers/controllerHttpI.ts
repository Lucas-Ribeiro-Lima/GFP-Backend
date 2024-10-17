import { Request, Response } from "express"

export interface ControllerHttpI {
  handleHttpGet(req: Request, res: Response): Promise<Response>
  handleHttpPost(req: Request, res: Response): Promise<Response>
  handleHttpPatch(req: Request, res: Response): Promise<Response>
  handleHttpDelete(req: Request, res: Response): Promise<Response>
}