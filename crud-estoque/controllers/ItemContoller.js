const express = require('express');
const router = express.Router();

const ItemService = require('../domain/services/ItemService')


/**
 * @swagger
 * /items/:
 *   get:
 *     summary: Retorna uma lista de items
 *     tags: [items]
 *     responses:
 *       200:
 *         description: Lista de items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   __id:
 *                     type: string
 *                     example: 66ecafd0be031f5ab155b2d0
 *                   nome:
 *                     type: string
 *                     example: "Item A"
 *                   valor:
 *                     type: number
 *                     example: 49.99
 *                   categoria:
 *                     type: string
 *                     example: "Eletrônicos"
 *                   quantidade:
 *                     type: number
 *                     example: 20
 *                   data:
 *                     type: string
 *                     format: date
 *                     example: "2024-09-18T12:34:56Z"
 */
router.get('/', async (req, res) => {
    return res.json(await ItemService.findAll());
});

/**
 * @swagger
 * /items/{id}:
 *   get:
 *     summary: Retorna um items específico
 *     tags: [items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do Item
 *     responses:
 *       200:
 *         description: Item encontrado
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
 *                   example: "Item A"
 *                 valor:
 *                   type: number
 *                   example: 49.99
 *                 categoria:
 *                   type: string
 *                   example: "Eletrônicos"
 *                 quantidade:
 *                   type: number
 *                   example: 20
 *                 data:
 *                   type: string
 *                   format: date
 *                   example: "2024-09-18T12:34:56Z"
 */
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    res.json(await ItemService.findById(id));
});

/**
 * @swagger
 * /items/:
 *   post:
 *     summary: Cria um novo items
 *     tags: [items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "item A"
 *               valor:
 *                 type: number
 *                 example: 49.99
 *               categoria:
 *                 type: string
 *                 example: "Eletrônicos"
 *               quantidade:
 *                 type: number
 *                 example: 20
 *     responses:
 *       200:
 *         description: item criado
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
 *                   example: "item A"
 *                 valor:
 *                   type: number
 *                   example: 49.99
 *                 categoria:
 *                   type: string
 *                   example: "Eletrônicos"
 *                 quantidade:
 *                   type: number
 *                   example: 20
 *       404:
 *         description: item não criado
 */
router.post('/', async (req, res) => {
    let item = req.body;
    return res.json(await ItemService.create(item));
});

/**
 * @swagger
 * /items/{id}:
 *   delete:
 *     summary: Deleta um item
 *     tags: [Item]
 *     responses:
 *       200:
 *         description: Item removido                 
 *       404:
 *         description: Item não encontrado
*/
router.delete('/:id', async(req, res)=>{
    let id = req.params.id
    res.json(await ItemService.delete(id))
})

/**
 * @swagger
 * /item/{id}:
 *   post:
 *     summary: Retorna um usuário criado
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do Item
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                  type:String
 *                  require:true
 *               valor:
 *                  type:Number
 *                  min:0
 *               categoria:
 *                  type:String
 *               quantidade:
 *                  type:Number
 *               data:
 *                  type:Date
 *                  default:Date.now
 *     responses:
 *       200:
 *         description: Item modificiado
 *                 
 *       404:
 *         description: Usuario não encontrador
*/
router.put('/:id', async(req, res)=>{
    let item = req.body
    let id = req.params.id
    res.json(await ItemService.atualizar(id, item))
})


// routes para /items-report 
// routes para /monthly-expenses
module.exports = router;
