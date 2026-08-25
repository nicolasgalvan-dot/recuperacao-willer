import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })
const router = Router()

// POST /medicos
router.post('/medicos', async (req, res) => {
  try {
    const { nome, crm } = req.body
    const medico = await prisma.medico.create({
      data: { nome, crm }
    })
    res.status(201).json(medico)
  } catch (error) {
    res.status(400).json({ erro: error.message })
  }
})

// GET /medicos
router.get('/medicos', async (req, res) => {
  try {
    const medicos = await prisma.medico.findMany({
      include: {
        especialidades: {
          include: {
            especialidade: true
          }
        }
      }
    })
    res.json(medicos)
  } catch (error) {
    res.status(500).json({ erro: error.message })
  }
})

// POST /especialidades
router.post('/especialidades', async (req, res) => {
  try {
    const { nome, descricao } = req.body
    const especialidade = await prisma.especialidade.create({
      data: { nome, descricao }
    })
    res.status(201).json(especialidade)
  } catch (error) {
    res.status(400).json({ erro: error.message })
  }
})

// POST /medicos/vincular
router.post('/medicos/vincular', async (req, res) => {
  try {
    const { medicoId, especialidadeId } = req.body
    const vinculo = await prisma.medicoEspecialidade.create({
      data: { medicoId, especialidadeId }
    })
    res.status(201).json(vinculo)
  } catch (error) {
    res.status(400).json({ erro: error.message })
  }
})

// GET /medicos/:id/especialidades
router.get('/medicos/:id/especialidades', async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const medico = await prisma.medico.findUnique({
      where: { id },
      include: {
        especialidades: {
          include: {
            especialidade: true
          }
        }
      }
    })
    if (!medico) {
      return res.status(404).json({ erro: 'Médico não encontrado' })
    }
    res.json(medico.especialidades.map(e => e.especialidade))
  } catch (error) {
    res.status(500).json({ erro: error.message })
  }
})

// PUT /medicos
router.put('/medicos', async (req, res) => {
  try {
    const { id, nome, crm } = req.body
    const medico = await prisma.medico.update({
      where: { id },
      data: { nome, crm }
    })
    res.json(medico)
  } catch (error) {
    res.status(400).json({ erro: error.message })
  }
})

// PUT /especialidades
router.put('/especialidades', async (req, res) => {
  try {
    const { id, nome, descricao } = req.body
    const especialidade = await prisma.especialidade.update({
      where: { id },
      data: { nome, descricao }
    })
    res.json(especialidade)
  } catch (error) {
    res.status(400).json({ erro: error.message })
  }
})

// DELETE /medicos/:id/especialidades/:especialidadeId
router.delete('/medicos/:id/especialidades/:especialidadeId', async (req, res) => {
  try {
    const medicoId = parseInt(req.params.id)
    const especialidadeId = parseInt(req.params.especialidadeId)
    await prisma.medicoEspecialidade.deleteMany({
      where: { medicoId, especialidadeId }
    })
    res.json({ mensagem: 'Vínculo removido com sucesso' })
  } catch (error) {
    res.status(400).json({ erro: error.message })
  }
})

// DELETE /medicos/:id
router.delete('/medicos/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    await prisma.medicoEspecialidade.deleteMany({ where: { medicoId: id } })
    await prisma.medico.delete({ where: { id } })
    res.json({ mensagem: 'Médico deletado com sucesso' })
  } catch (error) {
    res.status(400).json({ erro: error.message })
  }
})

export default router
