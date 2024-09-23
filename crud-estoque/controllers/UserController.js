const express = require('express');
const router = express.Router();
const UserService = require('../domain/services/UserService')


/**
 * @swagger
 * /usuario/:
 *   get:
 *     summary: Retorna uma lista de usuários
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 66ecafd0be031f5ab155b2d0
 *                   nome:
 *                     type: string
 *                     example: John Doe
 *                   email:
 *                     type: string
 *                     example: email@email.com
 *                   senha:
 *                     type: string
 *                     example: senha123
*/
router.get('/',async (req,res) => {
    return res.json(await UserService.findAll())
})

/**
 * @swagger
 * /usuario/{id}:
 *   get:
 *     summary: Retorna um usuário específico
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 __id:
 *                   type: string
 *                   example: 66ecafd0be031f5ab155b2d0
 *                 nome:
 *                   type: string
 *                   example: "John Doe"
 *                 email:
 *                   type: string
 *                   example: "john@example.com"
 *                 senha:
 *                   type: string
 *                   example: senha123
*/
router.get('/:id', async (req, res) =>{
    const id = parseInt(req.params.id)
    res.json(await UserService.findById(id))
})
/**
 * @swagger
 * /usuario/:
 *   post:
 *     summary: Retorna um usuário criado
 *     tags: [Users]
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "john@example.com"
 *               senha:
 *                 type: string
 *                 example: senha123 
 *     responses:
 *       200:
 *         description: Usuário Criado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 __id:
 *                   type: string
 *                   example: 66ecafd0be031f5ab155b2d0
 *                 nome:
 *                   type: string
 *                   example: "John Doe"
 *                 email:
 *                   type: string
 *                   example: "john@example.com"
 *                 senha:
 *                   type: string
 *                   example: senha123
 *                 
 *       404:
 *         description: Usuário não criado
*/
router.post('/', async (req, res) =>{
    let user = req.body
    return res.json(await UserService.create(user))
})

router.post('/login', async (req, res) =>{
    let credenciais = req.body
    return res.json(await UserService.login(credenciais))
})

module.exports = router;