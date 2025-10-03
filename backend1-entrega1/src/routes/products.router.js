import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const router = Router();
const productManager = new ProductManager("./src/data/products.json");

router.get("/", async (req, res) => {
  res.json(await productManager.getProducts());
});

router.get("/:pid", async (req, res) => {
  const product = await productManager.getProductById(parseInt(req.params.pid));
  product
    ? res.json(product)
    : res.status(404).json({ error: "Producto no encontrado" });
});

router.post("/", async (req, res) => {
  const newProduct = await productManager.addProduct(req.body);
  res.status(201).json(newProduct);
});

router.put("/:pid", async (req, res) => {
  const updated = await productManager.updateProduct(
    parseInt(req.params.pid),
    req.body
  );
  updated
    ? res.json(updated)
    : res.status(404).json({ error: "Producto no encontrado" });
});

router.delete("/:pid", async (req, res) => {
  const deleted = await productManager.deleteProduct(parseInt(req.params.pid));
  deleted
    ? res.json({ success: "Producto eliminado" })
    : res.status(404).json({ error: "No encontrado" });
});

export default router;
