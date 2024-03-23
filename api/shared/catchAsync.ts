import express from 'express';

export const catchAsync = (fn: (req: express.Request, res: express.Response) => Promise<void>) => {
  return (req: express.Request, res: express.Response) => {
    fn(req, res).catch((error: any) => {
      console.error(error);
      res.status(500).json(error);
    });
  };
};
