import express, { Request } from 'express';
import Projects from '../data/projects';
import Project from '../types/project';

type ProjectFormRequest = {
  name: string;
};

type GetProjectDetailsParams = {
  projectId: string;
};

const router = express.Router();

router.get('/', (req, res) => {
  return res.status(200).json({
    projects: Projects,
  });
});

router.get('/:projectId', (req: Request<GetProjectDetailsParams>, res) => {
  const { projectId } = req.params;
  const project = Projects.find((project) => project.id === +projectId);

  if (!project)
    return res.status(404).json({
      message: 'Project not found !',
    });

  return res.status(200).json(project);
});

router.put('/:projectId', (req: Request<GetProjectDetailsParams, {}, ProjectFormRequest>, res) => {
  const { projectId } = req.params;
  const { name } = req.body;
  const project = Projects.find((project) => project.id === +projectId);

  if (!project)
    return res.status(404).json({
      message: 'Project not found !',
    });

  project.name = name;
  project.updated_at = Date.now();

  return res.status(200).json({
    message: 'Project updated!',
  });
});

router.post('/', (req: Request<{}, {}, ProjectFormRequest>, res) => {
  const { name } = req.body;
  const currentTimestamp = Date.now();
  const project: Project = {
    id: currentTimestamp,
    name,
    created_at: currentTimestamp,
    updated_at: currentTimestamp,
    owner_id: 1,
  };

  Projects.push(project);

  return res.status(200).json({
    message: 'Project created',
  });
});

router.delete('/:projectId', (req: Request<GetProjectDetailsParams>, res) => {
  const { projectId } = req.params;
  const projectIndex = Projects.findIndex((project) => project.id === +projectId);

  if (projectIndex === -1)
    return res.status(404).json({
      message: 'Project not found !',
    });

  Projects.splice(projectIndex, 1);

  return res.status(200).json({
    message: 'Project deleted!',
  });
});

export default router;
